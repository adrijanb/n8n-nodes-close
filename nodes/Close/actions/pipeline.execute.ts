import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executePipelineAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'create':
			return await createPipeline.call(this, httpClient, i);
		case 'get':
			return await getPipeline.call(this, httpClient, i);
		case 'getAll':
			return await getAllPipelines.call(this, httpClient, paginator, i);
		case 'update':
			return await updatePipeline.call(this, httpClient, i);
		case 'delete':
			return await deletePipeline.call(this, httpClient, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createPipeline(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const name = this.getNodeParameter('name', i) as string;

	body.name = name;

	// Optional fields
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	if (additionalFields.statuses) {
		body.statuses = additionalFields.statuses;
	}

	const response = await httpClient.makeRequest('POST', '/pipeline/', body);

	return [{ json: response }];
}

async function getPipeline(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const pipelineId = this.getNodeParameter('pipelineId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await httpClient.makeRequest('GET', `/pipeline/${pipelineId}/`, undefined, qs);

	return [{ json: response }];
}

async function getAllPipelines(
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
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await paginator.getAll('/pipeline/', { returnAll, limit }, qs);

	return response.map((item) => ({ json: item }));
}

async function updatePipeline(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const pipelineId = this.getNodeParameter('pipelineId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	// Update fields
	if (updateFields.name !== undefined) {
		body.name = updateFields.name;
	}
	if (updateFields.statuses !== undefined) {
		body.statuses = updateFields.statuses;
	}

	const response = await httpClient.makeRequest('PUT', `/pipeline/${pipelineId}/`, body);

	return [{ json: response }];
}

async function deletePipeline(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const pipelineId = this.getNodeParameter('pipelineId', i) as string;

	await httpClient.makeRequest('DELETE', `/pipeline/${pipelineId}/`);

	return [{ json: { success: true, id: pipelineId } }];
}
