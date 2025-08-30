import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeEmailTemplateAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'create':
			return await createEmailTemplate.call(this, httpClient, i);
		case 'get':
			return await getEmailTemplate.call(this, httpClient, i);
		case 'getAll':
			return await getAllEmailTemplates.call(this, httpClient, paginator, i);
		case 'update':
			return await updateEmailTemplate.call(this, httpClient, i);
		case 'delete':
			return await deleteEmailTemplate.call(this, httpClient, i);
		case 'render':
			return await renderEmailTemplate.call(this, httpClient, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createEmailTemplate(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const name = this.getNodeParameter('name', i) as string;
	const subject = this.getNodeParameter('subject', i) as string;
	const bodyHtml = this.getNodeParameter('bodyHtml', i) as string;

	body.name = name;
	body.subject = subject;
	body.body_html = bodyHtml;

	// Optional fields
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	if (additionalFields.bodyText) {
		body.body_text = additionalFields.bodyText;
	}
	if (additionalFields.isShared !== undefined) {
		body.is_shared = additionalFields.isShared;
	}
	if (additionalFields.isArchived !== undefined) {
		body.is_archived = additionalFields.isArchived;
	}

	const response = await httpClient.makeRequest('POST', '/email_template/', body);

	return [{ json: response }];
}

async function getEmailTemplate(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const templateId = this.getNodeParameter('templateId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await httpClient.makeRequest(
		'GET',
		`/email_template/${templateId}/`,
		undefined,
		qs,
	);

	return [{ json: response }];
}

async function getAllEmailTemplates(
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
	if (additionalFields.isArchived !== undefined) {
		qs.is_archived = additionalFields.isArchived;
	}
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await paginator.getAll('/email_template/', { returnAll, limit }, qs);

	return response.map((item) => ({ json: item }));
}

async function updateEmailTemplate(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const templateId = this.getNodeParameter('templateId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	// Update fields
	if (updateFields.name !== undefined) {
		body.name = updateFields.name;
	}
	if (updateFields.subject !== undefined) {
		body.subject = updateFields.subject;
	}
	if (updateFields.bodyHtml !== undefined) {
		body.body_html = updateFields.bodyHtml;
	}
	if (updateFields.bodyText !== undefined) {
		body.body_text = updateFields.bodyText;
	}
	if (updateFields.isShared !== undefined) {
		body.is_shared = updateFields.isShared;
	}
	if (updateFields.isArchived !== undefined) {
		body.is_archived = updateFields.isArchived;
	}

	const response = await httpClient.makeRequest('PUT', `/email_template/${templateId}/`, body);

	return [{ json: response }];
}

async function deleteEmailTemplate(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const templateId = this.getNodeParameter('templateId', i) as string;

	await httpClient.makeRequest('DELETE', `/email_template/${templateId}/`);

	return [{ json: { success: true, id: templateId } }];
}

async function renderEmailTemplate(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const templateId = this.getNodeParameter('templateId', i) as string;
	const renderMode = this.getNodeParameter('renderMode', i) as string;

	const qs: any = {};

	if (renderMode === 'singleLeadContact') {
		// Single lead/contact mode
		const leadId = this.getNodeParameter('leadId', i) as string;
		const contactId = this.getNodeParameter('contactId', i) as string;

		qs.lead_id = leadId;
		qs.contact_id = contactId;
	} else if (renderMode === 'searchQuery') {
		// Search query mode
		const query = this.getNodeParameter('query', i) as string;
		qs.query = query;

		const additionalFields = this.getNodeParameter('additionalFields', i) as any;
		if (additionalFields.entry !== undefined) {
			qs.entry = additionalFields.entry;
		}
		if (additionalFields.mode) {
			qs.mode = additionalFields.mode;
		}
	}

	const response = await httpClient.makeRequest(
		'GET',
		`/email_template/${templateId}/render/`,
		undefined,
		qs,
	);

	return [{ json: response }];
}
