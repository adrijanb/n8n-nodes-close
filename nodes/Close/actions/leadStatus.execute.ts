import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeLeadStatusAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'create':
			return await createLeadStatus.call(this, httpClient, i);
		case 'get':
			return await getLeadStatus.call(this, httpClient, i);
		case 'getAll':
			return await getAllLeadStatuses.call(this, httpClient, paginator, i);
		case 'update':
			return await updateLeadStatus.call(this, httpClient, i);
		case 'delete':
			return await deleteLeadStatus.call(this, httpClient, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createLeadStatus(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const label = this.getNodeParameter('label', i) as string;

	body.label = label;

	// Optional fields
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	if (additionalFields.color) {
		body.color = additionalFields.color;
	}

	const response = await httpClient.makeRequest('POST', '/status/lead/', body);

	return [{ json: response }];
}

async function getLeadStatus(
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

	const response = await httpClient.makeRequest('GET', `/status/lead/${statusId}/`, undefined, qs);

	return [{ json: response }];
}

async function getAllLeadStatuses(
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

	const response = await paginator.getAll('/status/lead/', { returnAll, limit }, qs);

	return response.map((item) => ({ json: item }));
}

async function updateLeadStatus(
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
	if (updateFields.color !== undefined) {
		body.color = updateFields.color;
	}

	const response = await httpClient.makeRequest('PUT', `/status/lead/${statusId}/`, body);

	return [{ json: response }];
}

async function deleteLeadStatus(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const statusId = this.getNodeParameter('statusId', i) as string;

	await httpClient.makeRequest('DELETE', `/status/lead/${statusId}/`);

	return [{ json: { success: true, id: statusId } }];
}
