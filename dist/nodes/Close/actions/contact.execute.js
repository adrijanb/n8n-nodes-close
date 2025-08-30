"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeContactAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeContactAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'create':
            return await createContact.call(this, httpClient, i);
        case 'get':
            return await getContact.call(this, httpClient, i);
        case 'getAll':
            return await getAllContacts.call(this, httpClient, paginator, i);
        case 'update':
            return await updateContact.call(this, httpClient, i);
        case 'delete':
            return await deleteContact.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeContactAction = executeContactAction;
async function createContact(httpClient, i) {
    const body = {};
    // Required fields
    const leadId = this.getNodeParameter('leadId', i);
    body.lead_id = leadId;
    // Optional fields
    const name = this.getNodeParameter('name', i, '');
    if (name)
        body.name = name;
    const title = this.getNodeParameter('title', i, '');
    if (title)
        body.title = title;
    const additionalFields = this.getNodeParameter('additionalFields', i);
    // Email addresses
    if (additionalFields.emails && additionalFields.emails.email) {
        body.emails = additionalFields.emails.email.map((email) => ({
            type: email.type || 'office',
            email: email.email,
        }));
    }
    // Phone numbers
    if (additionalFields.phones && additionalFields.phones.phone) {
        body.phones = additionalFields.phones.phone.map((phone) => ({
            type: phone.type || 'office',
            phone: phone.phone,
        }));
    }
    // Custom fields
    if (additionalFields.customFields) {
        Object.assign(body, additionalFields.customFields);
    }
    const response = await httpClient.makeRequest('POST', '/contact/', body);
    return [{ json: response }];
}
async function getContact(httpClient, i) {
    const contactId = this.getNodeParameter('contactId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/contact/${contactId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllContacts(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Filter options
    if (additionalFields.leadId) {
        qs.lead_id = additionalFields.leadId;
    }
    if (additionalFields.query) {
        qs.query = additionalFields.query;
    }
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/contact/', { returnAll, limit }, qs);
    return response.map(item => ({ json: item }));
}
async function updateContact(httpClient, i) {
    const contactId = this.getNodeParameter('contactId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Update basic fields
    if (updateFields.name !== undefined)
        body.name = updateFields.name;
    if (updateFields.title !== undefined)
        body.title = updateFields.title;
    // Email addresses
    if (updateFields.emails && updateFields.emails.email) {
        body.emails = updateFields.emails.email.map((email) => ({
            type: email.type || 'office',
            email: email.email,
        }));
    }
    // Phone numbers  
    if (updateFields.phones && updateFields.phones.phone) {
        body.phones = updateFields.phones.phone.map((phone) => ({
            type: phone.type || 'office',
            phone: phone.phone,
        }));
    }
    // Custom fields
    if (updateFields.customFields) {
        Object.assign(body, updateFields.customFields);
    }
    const response = await httpClient.makeRequest('PUT', `/contact/${contactId}/`, body);
    return [{ json: response }];
}
async function deleteContact(httpClient, i) {
    const contactId = this.getNodeParameter('contactId', i);
    await httpClient.makeRequest('DELETE', `/contact/${contactId}/`);
    return [{ json: { success: true, id: contactId } }];
}
