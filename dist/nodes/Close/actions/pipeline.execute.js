"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executePipelineAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executePipelineAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'create':
            return await createPipeline.call(this, httpClient, i);
        case 'get':
            return await getPipeline.call(this, httpClient, i);
        case 'getAll':
            return await getAllPipelines.call(this, httpClient, paginator, i);
        case 'update':
            return await updatePipeline.call(this, httpClient, i);
        case 'delete':
            return await deletePipeline.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executePipelineAction = executePipelineAction;
async function createPipeline(httpClient, i) {
    const body = {};
    // Required fields
    const name = this.getNodeParameter('name', i);
    body.name = name;
    // Optional fields
    const additionalFields = this.getNodeParameter('additionalFields', i);
    if (additionalFields.statuses) {
        body.statuses = additionalFields.statuses;
    }
    const response = await httpClient.makeRequest('POST', '/pipeline/', body);
    return [{ json: response }];
}
async function getPipeline(httpClient, i) {
    const pipelineId = this.getNodeParameter('pipelineId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/pipeline/${pipelineId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllPipelines(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Filter options
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/pipeline/', { returnAll, limit }, qs);
    return response.map((item) => ({ json: item }));
}
async function updatePipeline(httpClient, i) {
    const pipelineId = this.getNodeParameter('pipelineId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Update fields
    if (updateFields.name !== undefined) {
        body.name = updateFields.name;
    }
    if (updateFields.statuses !== undefined) {
        body.statuses = updateFields.statuses;
    }
    const response = await httpClient.makeRequest('PUT', `/pipeline/${pipelineId}/`, body);
    return [{ json: response }];
}
async function deletePipeline(httpClient, i) {
    const pipelineId = this.getNodeParameter('pipelineId', i);
    await httpClient.makeRequest('DELETE', `/pipeline/${pipelineId}/`);
    return [{ json: { success: true, id: pipelineId } }];
}
