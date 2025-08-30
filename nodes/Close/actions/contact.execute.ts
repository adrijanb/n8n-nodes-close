import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeContactAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'create':
			return await createContact.call(this, httpClient, i);
		case 'get':
			return await getContact.call(this, httpClient, i);
		case 'getAll':
			return await getAllContacts.call(this, httpClient, paginator, i);
		case 'update':
			return await updateContact.call(this, httpClient, i);
		case 'delete':
			return await deleteContact.call(this, httpClient, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createContact(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const leadId = this.getNodeParameter('leadId', i) as string;
	body.lead_id = leadId;

	// Optional fields
	const name = this.getNodeParameter('name', i, '') as string;
	if (name) body.name = name;

	const title = this.getNodeParameter('title', i, '') as string;
	if (title) body.title = title;

	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	// Email addresses
	if (additionalFields.emails && additionalFields.emails.email) {
		body.emails = additionalFields.emails.email.map((email: any) => ({
			type: email.type || 'office',
			email: email.email,
		}));
	}

	// Phone numbers
	if (additionalFields.phones && additionalFields.phones.phone) {
		body.phones = additionalFields.phones.phone.map((phone: any) => ({
			type: phone.type || 'office',
			phone: phone.phone,
		}));
	}

	// Custom fields
	if (additionalFields.customFields) {
		Object.assign(body, additionalFields.customFields);
	}

	const response = await httpClient.makeRequest('POST', '/contact/', body);

	return [{ json: response }];
}

async function getContact(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const contactId = this.getNodeParameter('contactId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await httpClient.makeRequest('GET', `/contact/${contactId}/`, undefined, qs);

	return [{ json: response }];
}

async function getAllContacts(
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
	if (additionalFields.leadId) {
		qs.lead_id = additionalFields.leadId;
	}
	if (additionalFields.query) {
		qs.query = additionalFields.query;
	}
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await paginator.getAll('/contact/', { returnAll, limit }, qs);

	return response.map((item) => ({ json: item }));
}

async function updateContact(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const contactId = this.getNodeParameter('contactId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	// Update basic fields
	if (updateFields.name !== undefined) body.name = updateFields.name;
	if (updateFields.title !== undefined) body.title = updateFields.title;

	// Email addresses
	if (updateFields.emails && updateFields.emails.email) {
		body.emails = updateFields.emails.email.map((email: any) => ({
			type: email.type || 'office',
			email: email.email,
		}));
	}

	// Phone numbers
	if (updateFields.phones && updateFields.phones.phone) {
		body.phones = updateFields.phones.phone.map((phone: any) => ({
			type: phone.type || 'office',
			phone: phone.phone,
		}));
	}

	// Custom fields
	if (updateFields.customFields) {
		Object.assign(body, updateFields.customFields);
	}

	const response = await httpClient.makeRequest('PUT', `/contact/${contactId}/`, body);

	return [{ json: response }];
}

async function deleteContact(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const contactId = this.getNodeParameter('contactId', i) as string;

	await httpClient.makeRequest('DELETE', `/contact/${contactId}/`);

	return [{ json: { success: true, id: contactId } }];
}
