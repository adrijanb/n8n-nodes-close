import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeSmartViewAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'create':
			return await createSmartView.call(this, httpClient, i);
		case 'get':
			return await getSmartView.call(this, httpClient, i);
		case 'getAll':
			return await getAllSmartViews.call(this, httpClient, paginator, i);
		case 'update':
			return await updateSmartView.call(this, httpClient, i);
		case 'delete':
			return await deleteSmartView.call(this, httpClient, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createSmartView(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const name = this.getNodeParameter('name', i) as string;
	const query = this.getNodeParameter('query', i) as string;
	const smartViewType = this.getNodeParameter('smartViewType', i) as string;

	body.name = name;
	body.query = query;

	// Set type based on smartViewType (lead is default, contact needs explicit type)
	if (smartViewType === 'contact') {
		body.type = 'contact';
	}
	// For lead type, we don't need to set it explicitly as it's the default

	// Optional fields
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	if (additionalFields.shared !== undefined) {
		body.shared = additionalFields.shared;
	}

	const response = await httpClient.makeRequest('POST', '/saved_search/', body);

	return [{ json: response }];
}

async function getSmartView(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const smartViewId = this.getNodeParameter('smartViewId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await httpClient.makeRequest(
		'GET',
		`/saved_search/${smartViewId}/`,
		undefined,
		qs,
	);

	return [{ json: response }];
}

async function getAllSmartViews(
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
	if (additionalFields.typeIn) {
		qs.type__in = additionalFields.typeIn;
	}
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await paginator.getAll('/saved_search/', { returnAll, limit }, qs);

	return response.map((item) => ({ json: item }));
}

async function updateSmartView(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const smartViewId = this.getNodeParameter('smartViewId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	// Update fields
	if (updateFields.name !== undefined) {
		body.name = updateFields.name;
	}
	if (updateFields.query !== undefined) {
		body.query = updateFields.query;
	}
	if (updateFields.shared !== undefined) {
		body.shared = updateFields.shared;
	}
	if (updateFields.type !== undefined) {
		body.type = updateFields.type;
	}

	const response = await httpClient.makeRequest('PUT', `/saved_search/${smartViewId}/`, body);

	return [{ json: response }];
}

async function deleteSmartView(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const smartViewId = this.getNodeParameter('smartViewId', i) as string;

	await httpClient.makeRequest('DELETE', `/saved_search/${smartViewId}/`);

	return [{ json: { success: true, id: smartViewId } }];
}
