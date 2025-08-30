import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeCommentAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'create':
			return await createComment.call(this, httpClient, i);
		case 'get':
			return await getComment.call(this, httpClient, i);
		case 'getAll':
			return await getAllComments.call(this, httpClient, paginator, i);
		case 'getThread':
			return await getCommentThread.call(this, httpClient, i);
		case 'getAllThreads':
			return await getAllCommentThreads.call(this, httpClient, paginator, i);
		case 'update':
			return await updateComment.call(this, httpClient, i);
		case 'delete':
			return await deleteComment.call(this, httpClient, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createComment(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const objectId = this.getNodeParameter('objectId', i) as string;
	const commentBody = this.getNodeParameter('body', i) as string;

	body.object_id = objectId;
	body.body = commentBody;

	const response = await httpClient.makeRequest('POST', '/comment/', body);

	return [{ json: response }];
}

async function getComment(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const commentId = this.getNodeParameter('commentId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await httpClient.makeRequest('GET', `/comment/${commentId}/`, undefined, qs);

	return [{ json: response }];
}

async function getAllComments(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	paginator: ClosePaginator,
	i: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const filterBy = this.getNodeParameter('filterBy', i) as string;

	const qs: any = {};

	// Filter options - exactly one must be provided
	if (filterBy === 'objectId') {
		const objectId = this.getNodeParameter('objectId', i) as string;
		qs.object_id = objectId;
	} else if (filterBy === 'threadId') {
		const threadId = this.getNodeParameter('threadId', i) as string;
		qs.thread_id = threadId;
	}

	const additionalFields = this.getNodeParameter('additionalFields', i) as any;
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await paginator.getAll('/comment/', { returnAll, limit }, qs);

	return response.map((item) => ({ json: item }));
}

async function getCommentThread(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const threadId = this.getNodeParameter('threadId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await httpClient.makeRequest(
		'GET',
		`/comment_thread/${threadId}/`,
		undefined,
		qs,
	);

	return [{ json: response }];
}

async function getAllCommentThreads(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	paginator: ClosePaginator,
	i: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};

	// Filter options
	if (additionalFields.objectIds) {
		qs.object_ids = additionalFields.objectIds;
	}
	if (additionalFields.ids) {
		qs.ids = additionalFields.ids;
	}
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await paginator.getAll('/comment_thread/', { returnAll, limit }, qs);

	return response.map((item) => ({ json: item }));
}

async function updateComment(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const commentId = this.getNodeParameter('commentId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	// Update fields
	if (updateFields.body !== undefined) {
		body.body = updateFields.body;
	}

	const response = await httpClient.makeRequest('PUT', `/comment/${commentId}/`, body);

	return [{ json: response }];
}

async function deleteComment(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const commentId = this.getNodeParameter('commentId', i) as string;

	await httpClient.makeRequest('DELETE', `/comment/${commentId}/`);

	return [{ json: { success: true, id: commentId } }];
}
