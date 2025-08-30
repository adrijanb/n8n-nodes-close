"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeOpportunityStatusAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeOpportunityStatusAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'create':
            return await createOpportunityStatus.call(this, httpClient, i);
        case 'get':
            return await getOpportunityStatus.call(this, httpClient, i);
        case 'getAll':
            return await getAllOpportunityStatuses.call(this, httpClient, paginator, i);
        case 'update':
            return await updateOpportunityStatus.call(this, httpClient, i);
        case 'delete':
            return await deleteOpportunityStatus.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeOpportunityStatusAction = executeOpportunityStatusAction;
async function createOpportunityStatus(httpClient, i) {
    const body = {};
    // Required fields
    const label = this.getNodeParameter('label', i);
    const statusType = this.getNodeParameter('statusType', i);
    body.label = label;
    body.status_type = statusType;
    // Optional fields
    const additionalFields = this.getNodeParameter('additionalFields', i);
    if (additionalFields.pipelineId) {
        body.pipeline_id = additionalFields.pipelineId;
    }
    const response = await httpClient.makeRequest('POST', '/status/opportunity/', body);
    return [{ json: response }];
}
async function getOpportunityStatus(httpClient, i) {
    const statusId = this.getNodeParameter('statusId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/status/opportunity/${statusId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllOpportunityStatuses(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Filter options
    if (additionalFields.pipelineId) {
        qs.pipeline_id = additionalFields.pipelineId;
    }
    if (additionalFields.statusType) {
        qs.status_type = additionalFields.statusType;
    }
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/status/opportunity/', { returnAll, limit }, qs);
    return response.map((item) => ({ json: item }));
}
async function updateOpportunityStatus(httpClient, i) {
    const statusId = this.getNodeParameter('statusId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Update fields
    if (updateFields.label !== undefined) {
        body.label = updateFields.label;
    }
    const response = await httpClient.makeRequest('PUT', `/status/opportunity/${statusId}/`, body);
    return [{ json: response }];
}
async function deleteOpportunityStatus(httpClient, i) {
    const statusId = this.getNodeParameter('statusId', i);
    await httpClient.makeRequest('DELETE', `/status/opportunity/${statusId}/`);
    return [{ json: { success: true, id: statusId } }];
}
