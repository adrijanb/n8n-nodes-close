import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeOpportunityStatusAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'create':
			return await createOpportunityStatus.call(this, httpClient, i);
		case 'get':
			return await getOpportunityStatus.call(this, httpClient, i);
		case 'getAll':
			return await getAllOpportunityStatuses.call(this, httpClient, paginator, i);
		case 'update':
			return await updateOpportunityStatus.call(this, httpClient, i);
		case 'delete':
			return await deleteOpportunityStatus.call(this, httpClient, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createOpportunityStatus(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const label = this.getNodeParameter('label', i) as string;
	const statusType = this.getNodeParameter('statusType', i) as string;

	body.label = label;
	body.status_type = statusType;

	// Optional fields
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	if (additionalFields.pipelineId) {
		body.pipeline_id = additionalFields.pipelineId;
	}

	const response = await httpClient.makeRequest('POST', '/status/opportunity/', body);

	return [{ json: response }];
}

async function getOpportunityStatus(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const statusId = this.getNodeParameter('statusId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await httpClient.makeRequest(
		'GET',
		`/status/opportunity/${statusId}/`,
		undefined,
		qs,
	);

	return [{ json: response }];
}

async function getAllOpportunityStatuses(
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
	if (additionalFields.pipelineId) {
		qs.pipeline_id = additionalFields.pipelineId;
	}
	if (additionalFields.statusType) {
		qs.status_type = additionalFields.statusType;
	}
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await paginator.getAll('/status/opportunity/', { returnAll, limit }, qs);

	return response.map((item) => ({ json: item }));
}

async function updateOpportunityStatus(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const statusId = this.getNodeParameter('statusId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	// Update fields
	if (updateFields.label !== undefined) {
		body.label = updateFields.label;
	}

	const response = await httpClient.makeRequest('PUT', `/status/opportunity/${statusId}/`, body);

	return [{ json: response }];
}

async function deleteOpportunityStatus(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const statusId = this.getNodeParameter('statusId', i) as string;

	await httpClient.makeRequest('DELETE', `/status/opportunity/${statusId}/`);

	return [{ json: { success: true, id: statusId } }];
}
