import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeLeadAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'create':
			return await createLead.call(this, httpClient, i);
		case 'get':
			return await getLead.call(this, httpClient, i);
		case 'getAll':
			return await getAllLeads.call(this, httpClient, paginator, i);
		case 'update':
			return await updateLead.call(this, httpClient, i);
		case 'delete':
			return await deleteLead.call(this, httpClient, i);
		case 'merge':
			return await mergeLeads.call(this, httpClient, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createLead(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const name = this.getNodeParameter('name', i) as string;
	if (name) body.name = name;

	// Optional fields
	const description = this.getNodeParameter('description', i, '') as string;
	if (description) body.description = description;

	const statusId = this.getNodeParameter('statusId', i, '') as string;
	if (statusId) body.status_id = statusId;

	const url = this.getNodeParameter('url', i, '') as string;
	if (url) body.url = url;

	// Custom fields
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;
	if (additionalFields.customFields) {
		Object.assign(body, additionalFields.customFields);
	}

	// Contacts
	if (additionalFields.contacts) {
		body.contacts = additionalFields.contacts;
	}

	// Addresses
	if (additionalFields.addresses) {
		body.addresses = additionalFields.addresses;
	}

	const response = await httpClient.makeRequest('POST', '/lead/', body);
	
	return [{ json: response }];
}

async function getLead(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const leadId = this.getNodeParameter('leadId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await httpClient.makeRequest('GET', `/lead/${leadId}/`, undefined, qs);
	
	return [{ json: response }];
}

async function getAllLeads(
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
	if (additionalFields.query) {
		qs.query = additionalFields.query;
	}
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}
	if (additionalFields.orderBy) {
		qs._order_by = additionalFields.orderBy;
	}

	const response = await paginator.getAll('/lead/', { returnAll, limit }, qs);

	return response.map(item => ({ json: item }));
}

async function updateLead(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const leadId = this.getNodeParameter('leadId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	// Update basic fields
	if (updateFields.name !== undefined) body.name = updateFields.name;
	if (updateFields.description !== undefined) body.description = updateFields.description;
	if (updateFields.statusId !== undefined) body.status_id = updateFields.statusId;
	if (updateFields.url !== undefined) body.url = updateFields.url;

	// Custom fields
	if (updateFields.customFields) {
		Object.assign(body, updateFields.customFields);
	}

	const response = await httpClient.makeRequest('PUT', `/lead/${leadId}/`, body);
	
	return [{ json: response }];
}

async function deleteLead(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const leadId = this.getNodeParameter('leadId', i) as string;

	await httpClient.makeRequest('DELETE', `/lead/${leadId}/`);
	
	return [{ json: { success: true, id: leadId } }];
}

async function mergeLeads(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const sourceId = this.getNodeParameter('sourceId', i) as string;
	const destinationId = this.getNodeParameter('destinationId', i) as string;

	const body = {
		source: sourceId,
		destination: destinationId,
	};

	const response = await httpClient.makeRequest('POST', '/lead/merge/', body);
	
	return [{ json: response }];
}