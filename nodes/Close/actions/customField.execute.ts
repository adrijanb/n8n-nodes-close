import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeCustomFieldAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'create':
			return await createCustomField.call(this, httpClient, i);
		case 'get':
			return await getCustomField.call(this, httpClient, i);
		case 'getAll':
			return await getAllCustomFields.call(this, httpClient, paginator, i);
		case 'update':
			return await updateCustomField.call(this, httpClient, i);
		case 'delete':
			return await deleteCustomField.call(this, httpClient, i);
		case 'getSchema':
			return await getCustomFieldSchema.call(this, httpClient, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createCustomField(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const objectType = this.getNodeParameter('objectType', i) as string;
	const fieldType = this.getNodeParameter('fieldType', i) as string;
	const name = this.getNodeParameter('name', i) as string;

	body.object_type = objectType;
	body.type = fieldType;
	body.name = name;

	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	if (additionalFields.description) body.description = additionalFields.description;
	if (additionalFields.isRequired !== undefined) body.is_required = additionalFields.isRequired;
	if (additionalFields.acceptsMultipleValues !== undefined) {
		body.accepts_multiple_values = additionalFields.acceptsMultipleValues;
	}

	// For choice fields
	if (fieldType === 'choice' && additionalFields.choices) {
		body.choices = additionalFields.choices;
	}

	const response = await httpClient.makeRequest('POST', '/custom_field/', body);
	
	return [{ json: response }];
}

async function getCustomField(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const customFieldId = this.getNodeParameter('customFieldId', i) as string;

	const response = await httpClient.makeRequest('GET', `/custom_field/${customFieldId}/`);
	
	return [{ json: response }];
}

async function getAllCustomFields(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	paginator: ClosePaginator,
	i: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};

	if (additionalFields.objectType) {
		qs.object_type = additionalFields.objectType;
	}
	if (additionalFields.fieldType) {
		qs.type = additionalFields.fieldType;
	}

	const response = await paginator.getAll('/custom_field/', { returnAll, limit }, qs);

	return response.map(item => ({ json: item }));
}

async function updateCustomField(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const customFieldId = this.getNodeParameter('customFieldId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	if (updateFields.name !== undefined) body.name = updateFields.name;
	if (updateFields.description !== undefined) body.description = updateFields.description;
	if (updateFields.isRequired !== undefined) body.is_required = updateFields.isRequired;
	if (updateFields.acceptsMultipleValues !== undefined) {
		body.accepts_multiple_values = updateFields.acceptsMultipleValues;
	}
	if (updateFields.choices !== undefined) body.choices = updateFields.choices;

	const response = await httpClient.makeRequest('PUT', `/custom_field/${customFieldId}/`, body);
	
	return [{ json: response }];
}

async function deleteCustomField(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const customFieldId = this.getNodeParameter('customFieldId', i) as string;

	await httpClient.makeRequest('DELETE', `/custom_field/${customFieldId}/`);
	
	return [{ json: { success: true, id: customFieldId } }];
}

async function getCustomFieldSchema(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const objectType = this.getNodeParameter('objectType', i) as string;

	const response = await httpClient.makeRequest('GET', `/custom_field/schema/${objectType}/`);
	
	return [{ json: response }];
}