import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeOpportunityAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'create':
			return await createOpportunity.call(this, httpClient, i);
		case 'get':
			return await getOpportunity.call(this, httpClient, i);
		case 'getAll':
			return await getAllOpportunities.call(this, httpClient, paginator, i);
		case 'update':
			return await updateOpportunity.call(this, httpClient, i);
		case 'delete':
			return await deleteOpportunity.call(this, httpClient, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createOpportunity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const leadId = this.getNodeParameter('leadId', i) as string;
	const statusId = this.getNodeParameter('statusId', i) as string;

	body.lead_id = leadId;
	body.status_id = statusId;

	// Optional fields
	const note = this.getNodeParameter('note', i, '') as string;
	if (note) body.note = note;

	const value = this.getNodeParameter('value', i, 0) as number;
	if (value) body.value = value;

	const valueFormatted = this.getNodeParameter('valueFormatted', i, '') as string;
	if (valueFormatted) body.value_formatted = valueFormatted;

	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	if (additionalFields.contactId) body.contact_id = additionalFields.contactId;
	if (additionalFields.userId) body.user_id = additionalFields.userId;
	if (additionalFields.expectedValue) body.expected_value = additionalFields.expectedValue;
	if (additionalFields.confidence) body.confidence = additionalFields.confidence;
	if (additionalFields.dateWon) body.date_won = additionalFields.dateWon;

	// Custom fields
	if (additionalFields.customFields) {
		Object.assign(body, additionalFields.customFields);
	}

	const response = await httpClient.makeRequest('POST', '/opportunity/', body);
	
	return [{ json: response }];
}

async function getOpportunity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const opportunityId = this.getNodeParameter('opportunityId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await httpClient.makeRequest('GET', `/opportunity/${opportunityId}/`, undefined, qs);
	
	return [{ json: response }];
}

async function getAllOpportunities(
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
	if (additionalFields.statusId) {
		qs.status_id = additionalFields.statusId;
	}
	if (additionalFields.userId) {
		qs.user_id = additionalFields.userId;
	}
	if (additionalFields.query) {
		qs.query = additionalFields.query;
	}
	if (additionalFields.dateFrom) {
		qs.date_created__gte = additionalFields.dateFrom;
	}
	if (additionalFields.dateTo) {
		qs.date_created__lt = additionalFields.dateTo;
	}
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await paginator.getAll('/opportunity/', { returnAll, limit }, qs);

	return response.map(item => ({ json: item }));
}

async function updateOpportunity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const opportunityId = this.getNodeParameter('opportunityId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	// Update fields
	if (updateFields.note !== undefined) body.note = updateFields.note;
	if (updateFields.value !== undefined) body.value = updateFields.value;
	if (updateFields.valueFormatted !== undefined) body.value_formatted = updateFields.valueFormatted;
	if (updateFields.statusId !== undefined) body.status_id = updateFields.statusId;
	if (updateFields.expectedValue !== undefined) body.expected_value = updateFields.expectedValue;
	if (updateFields.confidence !== undefined) body.confidence = updateFields.confidence;
	if (updateFields.dateWon !== undefined) body.date_won = updateFields.dateWon;

	// Custom fields
	if (updateFields.customFields) {
		Object.assign(body, updateFields.customFields);
	}

	const response = await httpClient.makeRequest('PUT', `/opportunity/${opportunityId}/`, body);
	
	return [{ json: response }];
}

async function deleteOpportunity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const opportunityId = this.getNodeParameter('opportunityId', i) as string;

	await httpClient.makeRequest('DELETE', `/opportunity/${opportunityId}/`);
	
	return [{ json: { success: true, id: opportunityId } }];
}