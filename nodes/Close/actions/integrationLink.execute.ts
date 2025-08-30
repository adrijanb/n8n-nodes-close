import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeIntegrationLinkAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'create':
			return await createIntegrationLink.call(this, httpClient, i);
		case 'get':
			return await getIntegrationLink.call(this, httpClient, i);
		case 'getAll':
			return await getAllIntegrationLinks.call(this, httpClient, paginator, i);
		case 'update':
			return await updateIntegrationLink.call(this, httpClient, i);
		case 'delete':
			return await deleteIntegrationLink.call(this, httpClient, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createIntegrationLink(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const name = this.getNodeParameter('name', i) as string;
	const url = this.getNodeParameter('url', i) as string;
	const type = this.getNodeParameter('type', i) as string;

	body.name = name;
	body.url = url;
	body.type = type;

	const response = await httpClient.makeRequest('POST', '/integration_link/', body);

	return [{ json: response }];
}

async function getIntegrationLink(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const linkId = this.getNodeParameter('linkId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await httpClient.makeRequest(
		'GET',
		`/integration_link/${linkId}/`,
		undefined,
		qs,
	);

	return [{ json: response }];
}

async function getAllIntegrationLinks(
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
	if (additionalFields.type) {
		qs.type = additionalFields.type;
	}
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await paginator.getAll('/integration_link/', { returnAll, limit }, qs);

	return response.map((item) => ({ json: item }));
}

async function updateIntegrationLink(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const linkId = this.getNodeParameter('linkId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	// Update fields
	if (updateFields.name !== undefined) {
		body.name = updateFields.name;
	}
	if (updateFields.url !== undefined) {
		body.url = updateFields.url;
	}
	if (updateFields.type !== undefined) {
		body.type = updateFields.type;
	}

	const response = await httpClient.makeRequest('PUT', `/integration_link/${linkId}/`, body);

	return [{ json: response }];
}

async function deleteIntegrationLink(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const linkId = this.getNodeParameter('linkId', i) as string;

	await httpClient.makeRequest('DELETE', `/integration_link/${linkId}/`);

	return [{ json: { success: true, id: linkId } }];
}
