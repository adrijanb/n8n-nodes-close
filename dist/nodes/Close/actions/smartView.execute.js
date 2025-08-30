"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSmartViewAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeSmartViewAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
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
exports.executeSmartViewAction = executeSmartViewAction;
async function createSmartView(httpClient, i) {
    const body = {};
    // Required fields
    const name = this.getNodeParameter('name', i);
    const query = this.getNodeParameter('query', i);
    const smartViewType = this.getNodeParameter('smartViewType', i);
    body.name = name;
    body.query = query;
    // Set type based on smartViewType (lead is default, contact needs explicit type)
    if (smartViewType === 'contact') {
        body.type = 'contact';
    }
    // For lead type, we don't need to set it explicitly as it's the default
    // Optional fields
    const additionalFields = this.getNodeParameter('additionalFields', i);
    if (additionalFields.shared !== undefined) {
        body.shared = additionalFields.shared;
    }
    const response = await httpClient.makeRequest('POST', '/saved_search/', body);
    return [{ json: response }];
}
async function getSmartView(httpClient, i) {
    const smartViewId = this.getNodeParameter('smartViewId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/saved_search/${smartViewId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllSmartViews(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
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
async function updateSmartView(httpClient, i) {
    const smartViewId = this.getNodeParameter('smartViewId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
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
async function deleteSmartView(httpClient, i) {
    const smartViewId = this.getNodeParameter('smartViewId', i);
    await httpClient.makeRequest('DELETE', `/saved_search/${smartViewId}/`);
    return [{ json: { success: true, id: smartViewId } }];
}
