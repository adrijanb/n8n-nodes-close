import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeMeetingSearchAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'search':
			return await searchMeetings.call(this, httpClient, paginator, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function searchMeetings(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	paginator: ClosePaginator,
	i: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};

	// Search parameters
	if (additionalFields.query) {
		qs.query = additionalFields.query;
	}
	if (additionalFields.userId) {
		qs.user_id = additionalFields.userId;
	}
	if (additionalFields.leadId) {
		qs.lead_id = additionalFields.leadId;
	}
	if (additionalFields.contactId) {
		qs.contact_id = additionalFields.contactId;
	}
	if (additionalFields.dateFrom) {
		qs.date_from = additionalFields.dateFrom;
	}
	if (additionalFields.dateTo) {
		qs.date_to = additionalFields.dateTo;
	}
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await paginator.getAll('/meeting-search/', { returnAll, limit }, qs);

	return response.map(item => ({ json: item }));
}