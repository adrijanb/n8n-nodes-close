"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeLeadAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeLeadAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'create':
            return await createLead.call(this, httpClient, i);
        case 'get':
            return await getLead.call(this, httpClient, i);
        case 'getAll':
            return await getAllLeads.call(this, httpClient, paginator, i);
        case 'update':
            return await updateLead.call(this, httpClient, i);
        case 'delete':
            return await deleteLead.call(this, httpClient, i);
        case 'merge':
            return await mergeLeads.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeLeadAction = executeLeadAction;
async function createLead(httpClient, i) {
    const body = {};
    // Required fields
    const name = this.getNodeParameter('name', i);
    if (name)
        body.name = name;
    // Optional fields
    const description = this.getNodeParameter('description', i, '');
    if (description)
        body.description = description;
    const statusId = this.getNodeParameter('statusId', i, '');
    if (statusId)
        body.status_id = statusId;
    const url = this.getNodeParameter('url', i, '');
    if (url)
        body.url = url;
    // Custom fields
    const additionalFields = this.getNodeParameter('additionalFields', i);
    if (additionalFields.customFields) {
        Object.assign(body, additionalFields.customFields);
    }
    // Contacts
    if (additionalFields.contacts) {
        body.contacts = additionalFields.contacts;
    }
    // Addresses
    if (additionalFields.addresses) {
        body.addresses = additionalFields.addresses;
    }
    const response = await httpClient.makeRequest('POST', '/lead/', body);
    return [{ json: response }];
}
async function getLead(httpClient, i) {
    const leadId = this.getNodeParameter('leadId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/lead/${leadId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllLeads(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Filter options
    if (additionalFields.query) {
        qs.query = additionalFields.query;
    }
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    if (additionalFields.orderBy) {
        qs._order_by = additionalFields.orderBy;
    }
    const response = await paginator.getAll('/lead/', { returnAll, limit }, qs);
    return response.map(item => ({ json: item }));
}
async function updateLead(httpClient, i) {
    const leadId = this.getNodeParameter('leadId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Update basic fields
    if (updateFields.name !== undefined)
        body.name = updateFields.name;
    if (updateFields.description !== undefined)
        body.description = updateFields.description;
    if (updateFields.statusId !== undefined)
        body.status_id = updateFields.statusId;
    if (updateFields.url !== undefined)
        body.url = updateFields.url;
    // Custom fields
    if (updateFields.customFields) {
        Object.assign(body, updateFields.customFields);
    }
    const response = await httpClient.makeRequest('PUT', `/lead/${leadId}/`, body);
    return [{ json: response }];
}
async function deleteLead(httpClient, i) {
    const leadId = this.getNodeParameter('leadId', i);
    await httpClient.makeRequest('DELETE', `/lead/${leadId}/`);
    return [{ json: { success: true, id: leadId } }];
}
async function mergeLeads(httpClient, i) {
    const sourceId = this.getNodeParameter('sourceId', i);
    const destinationId = this.getNodeParameter('destinationId', i);
    const body = {
        source: sourceId,
        destination: destinationId,
    };
    const response = await httpClient.makeRequest('POST', '/lead/merge/', body);
    return [{ json: response }];
}
