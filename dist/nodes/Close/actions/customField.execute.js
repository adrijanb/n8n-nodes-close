"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCustomFieldAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeCustomFieldAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
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
exports.executeCustomFieldAction = executeCustomFieldAction;
async function createCustomField(httpClient, i) {
    const body = {};
    // Required fields
    const objectType = this.getNodeParameter('objectType', i);
    const fieldType = this.getNodeParameter('fieldType', i);
    const name = this.getNodeParameter('name', i);
    body.object_type = objectType;
    body.type = fieldType;
    body.name = name;
    const additionalFields = this.getNodeParameter('additionalFields', i);
    if (additionalFields.description)
        body.description = additionalFields.description;
    if (additionalFields.isRequired !== undefined)
        body.is_required = additionalFields.isRequired;
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
async function getCustomField(httpClient, i) {
    const customFieldId = this.getNodeParameter('customFieldId', i);
    const response = await httpClient.makeRequest('GET', `/custom_field/${customFieldId}/`);
    return [{ json: response }];
}
async function getAllCustomFields(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.objectType) {
        qs.object_type = additionalFields.objectType;
    }
    if (additionalFields.fieldType) {
        qs.type = additionalFields.fieldType;
    }
    const response = await paginator.getAll('/custom_field/', { returnAll, limit }, qs);
    return response.map(item => ({ json: item }));
}
async function updateCustomField(httpClient, i) {
    const customFieldId = this.getNodeParameter('customFieldId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    if (updateFields.name !== undefined)
        body.name = updateFields.name;
    if (updateFields.description !== undefined)
        body.description = updateFields.description;
    if (updateFields.isRequired !== undefined)
        body.is_required = updateFields.isRequired;
    if (updateFields.acceptsMultipleValues !== undefined) {
        body.accepts_multiple_values = updateFields.acceptsMultipleValues;
    }
    if (updateFields.choices !== undefined)
        body.choices = updateFields.choices;
    const response = await httpClient.makeRequest('PUT', `/custom_field/${customFieldId}/`, body);
    return [{ json: response }];
}
async function deleteCustomField(httpClient, i) {
    const customFieldId = this.getNodeParameter('customFieldId', i);
    await httpClient.makeRequest('DELETE', `/custom_field/${customFieldId}/`);
    return [{ json: { success: true, id: customFieldId } }];
}
async function getCustomFieldSchema(httpClient, i) {
    const objectType = this.getNodeParameter('objectType', i);
    const response = await httpClient.makeRequest('GET', `/custom_field/schema/${objectType}/`);
    return [{ json: response }];
}
