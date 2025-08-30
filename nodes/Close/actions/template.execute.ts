import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeTemplateAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);
	const templateType = this.getNodeParameter('templateType', i) as string;

	switch (operation) {
		case 'create':
			return await createTemplate.call(this, httpClient, templateType, i);
		case 'get':
			return await getTemplate.call(this, httpClient, templateType, i);
		case 'getAll':
			return await getAllTemplates.call(this, httpClient, paginator, templateType, i);
		case 'update':
			return await updateTemplate.call(this, httpClient, templateType, i);
		case 'delete':
			return await deleteTemplate.call(this, httpClient, templateType, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createTemplate(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	templateType: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Common fields
	const name = this.getNodeParameter('name', i) as string;
	body.name = name;

	if (templateType === 'email') {
		const subject = this.getNodeParameter('subject', i) as string;
		const bodyText = this.getNodeParameter('bodyText', i, '') as string;
		const bodyHtml = this.getNodeParameter('bodyHtml', i, '') as string;

		body.subject = subject;
		if (bodyText) body.body_text = bodyText;
		if (bodyHtml) body.body_html = bodyHtml;
	} else if (templateType === 'sms') {
		const text = this.getNodeParameter('text', i) as string;
		body.text = text;
	}

	const additionalFields = this.getNodeParameter('additionalFields', i) as any;
	if (additionalFields.isShared !== undefined) body.is_shared = additionalFields.isShared;

	const endpoint = templateType === 'email' ? '/email_template/' : '/sms_template/';
	const response = await httpClient.makeRequest('POST', endpoint, body);
	
	return [{ json: response }];
}

async function getTemplate(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	templateType: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const templateId = this.getNodeParameter('templateId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const endpoint = templateType === 'email' ? `/email_template/${templateId}/` : `/sms_template/${templateId}/`;
	const response = await httpClient.makeRequest('GET', endpoint, undefined, qs);
	
	return [{ json: response }];
}

async function getAllTemplates(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	paginator: ClosePaginator,
	templateType: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};

	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const endpoint = templateType === 'email' ? '/email_template/' : '/sms_template/';
	const response = await paginator.getAll(endpoint, { returnAll, limit }, qs);

	return response.map(item => ({ json: item }));
}

async function updateTemplate(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	templateType: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const templateId = this.getNodeParameter('templateId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	// Common update fields
	if (updateFields.name !== undefined) body.name = updateFields.name;
	if (updateFields.isShared !== undefined) body.is_shared = updateFields.isShared;

	if (templateType === 'email') {
		if (updateFields.subject !== undefined) body.subject = updateFields.subject;
		if (updateFields.bodyText !== undefined) body.body_text = updateFields.bodyText;
		if (updateFields.bodyHtml !== undefined) body.body_html = updateFields.bodyHtml;
	} else if (templateType === 'sms') {
		if (updateFields.text !== undefined) body.text = updateFields.text;
	}

	const endpoint = templateType === 'email' ? `/email_template/${templateId}/` : `/sms_template/${templateId}/`;
	const response = await httpClient.makeRequest('PUT', endpoint, body);
	
	return [{ json: response }];
}

async function deleteTemplate(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	templateType: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const templateId = this.getNodeParameter('templateId', i) as string;

	const endpoint = templateType === 'email' ? `/email_template/${templateId}/` : `/sms_template/${templateId}/`;
	await httpClient.makeRequest('DELETE', endpoint);
	
	return [{ json: { success: true, id: templateId } }];
}