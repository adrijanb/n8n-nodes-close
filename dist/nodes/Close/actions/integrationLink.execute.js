"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeIntegrationLinkAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeIntegrationLinkAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'create':
            return await createIntegrationLink.call(this, httpClient, i);
        case 'get':
            return await getIntegrationLink.call(this, httpClient, i);
        case 'getAll':
            return await getAllIntegrationLinks.call(this, httpClient, paginator, i);
        case 'update':
            return await updateIntegrationLink.call(this, httpClient, i);
        case 'delete':
            return await deleteIntegrationLink.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeIntegrationLinkAction = executeIntegrationLinkAction;
async function createIntegrationLink(httpClient, i) {
    const body = {};
    // Required fields
    const name = this.getNodeParameter('name', i);
    const url = this.getNodeParameter('url', i);
    const type = this.getNodeParameter('type', i);
    body.name = name;
    body.url = url;
    body.type = type;
    const response = await httpClient.makeRequest('POST', '/integration_link/', body);
    return [{ json: response }];
}
async function getIntegrationLink(httpClient, i) {
    const linkId = this.getNodeParameter('linkId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/integration_link/${linkId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllIntegrationLinks(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Filter options
    if (additionalFields.type) {
        qs.type = additionalFields.type;
    }
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/integration_link/', { returnAll, limit }, qs);
    return response.map((item) => ({ json: item }));
}
async function updateIntegrationLink(httpClient, i) {
    const linkId = this.getNodeParameter('linkId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Update fields
    if (updateFields.name !== undefined) {
        body.name = updateFields.name;
    }
    if (updateFields.url !== undefined) {
        body.url = updateFields.url;
    }
    if (updateFields.type !== undefined) {
        body.type = updateFields.type;
    }
    const response = await httpClient.makeRequest('PUT', `/integration_link/${linkId}/`, body);
    return [{ json: response }];
}
async function deleteIntegrationLink(httpClient, i) {
    const linkId = this.getNodeParameter('linkId', i);
    await httpClient.makeRequest('DELETE', `/integration_link/${linkId}/`);
    return [{ json: { success: true, id: linkId } }];
}
