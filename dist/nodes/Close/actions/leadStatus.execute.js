"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeLeadStatusAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeLeadStatusAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'create':
            return await createLeadStatus.call(this, httpClient, i);
        case 'get':
            return await getLeadStatus.call(this, httpClient, i);
        case 'getAll':
            return await getAllLeadStatuses.call(this, httpClient, paginator, i);
        case 'update':
            return await updateLeadStatus.call(this, httpClient, i);
        case 'delete':
            return await deleteLeadStatus.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeLeadStatusAction = executeLeadStatusAction;
async function createLeadStatus(httpClient, i) {
    const body = {};
    // Required fields
    const label = this.getNodeParameter('label', i);
    body.label = label;
    // Optional fields
    const additionalFields = this.getNodeParameter('additionalFields', i);
    if (additionalFields.color) {
        body.color = additionalFields.color;
    }
    const response = await httpClient.makeRequest('POST', '/status/lead/', body);
    return [{ json: response }];
}
async function getLeadStatus(httpClient, i) {
    const statusId = this.getNodeParameter('statusId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/status/lead/${statusId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllLeadStatuses(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Filter options
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/status/lead/', { returnAll, limit }, qs);
    return response.map((item) => ({ json: item }));
}
async function updateLeadStatus(httpClient, i) {
    const statusId = this.getNodeParameter('statusId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Update fields
    if (updateFields.label !== undefined) {
        body.label = updateFields.label;
    }
    if (updateFields.color !== undefined) {
        body.color = updateFields.color;
    }
    const response = await httpClient.makeRequest('PUT', `/status/lead/${statusId}/`, body);
    return [{ json: response }];
}
async function deleteLeadStatus(httpClient, i) {
    const statusId = this.getNodeParameter('statusId', i);
    await httpClient.makeRequest('DELETE', `/status/lead/${statusId}/`);
    return [{ json: { success: true, id: statusId } }];
}
