"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeEmailTemplateAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeEmailTemplateAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'create':
            return await createEmailTemplate.call(this, httpClient, i);
        case 'get':
            return await getEmailTemplate.call(this, httpClient, i);
        case 'getAll':
            return await getAllEmailTemplates.call(this, httpClient, paginator, i);
        case 'update':
            return await updateEmailTemplate.call(this, httpClient, i);
        case 'delete':
            return await deleteEmailTemplate.call(this, httpClient, i);
        case 'render':
            return await renderEmailTemplate.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeEmailTemplateAction = executeEmailTemplateAction;
async function createEmailTemplate(httpClient, i) {
    const body = {};
    // Required fields
    const name = this.getNodeParameter('name', i);
    const subject = this.getNodeParameter('subject', i);
    const bodyHtml = this.getNodeParameter('bodyHtml', i);
    body.name = name;
    body.subject = subject;
    body.body_html = bodyHtml;
    // Optional fields
    const additionalFields = this.getNodeParameter('additionalFields', i);
    if (additionalFields.bodyText) {
        body.body_text = additionalFields.bodyText;
    }
    if (additionalFields.isShared !== undefined) {
        body.is_shared = additionalFields.isShared;
    }
    if (additionalFields.isArchived !== undefined) {
        body.is_archived = additionalFields.isArchived;
    }
    const response = await httpClient.makeRequest('POST', '/email_template/', body);
    return [{ json: response }];
}
async function getEmailTemplate(httpClient, i) {
    const templateId = this.getNodeParameter('templateId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/email_template/${templateId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllEmailTemplates(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Filter options
    if (additionalFields.isArchived !== undefined) {
        qs.is_archived = additionalFields.isArchived;
    }
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/email_template/', { returnAll, limit }, qs);
    return response.map((item) => ({ json: item }));
}
async function updateEmailTemplate(httpClient, i) {
    const templateId = this.getNodeParameter('templateId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Update fields
    if (updateFields.name !== undefined) {
        body.name = updateFields.name;
    }
    if (updateFields.subject !== undefined) {
        body.subject = updateFields.subject;
    }
    if (updateFields.bodyHtml !== undefined) {
        body.body_html = updateFields.bodyHtml;
    }
    if (updateFields.bodyText !== undefined) {
        body.body_text = updateFields.bodyText;
    }
    if (updateFields.isShared !== undefined) {
        body.is_shared = updateFields.isShared;
    }
    if (updateFields.isArchived !== undefined) {
        body.is_archived = updateFields.isArchived;
    }
    const response = await httpClient.makeRequest('PUT', `/email_template/${templateId}/`, body);
    return [{ json: response }];
}
async function deleteEmailTemplate(httpClient, i) {
    const templateId = this.getNodeParameter('templateId', i);
    await httpClient.makeRequest('DELETE', `/email_template/${templateId}/`);
    return [{ json: { success: true, id: templateId } }];
}
async function renderEmailTemplate(httpClient, i) {
    const templateId = this.getNodeParameter('templateId', i);
    const renderMode = this.getNodeParameter('renderMode', i);
    const qs = {};
    if (renderMode === 'singleLeadContact') {
        // Single lead/contact mode
        const leadId = this.getNodeParameter('leadId', i);
        const contactId = this.getNodeParameter('contactId', i);
        qs.lead_id = leadId;
        qs.contact_id = contactId;
    }
    else if (renderMode === 'searchQuery') {
        // Search query mode
        const query = this.getNodeParameter('query', i);
        qs.query = query;
        const additionalFields = this.getNodeParameter('additionalFields', i);
        if (additionalFields.entry !== undefined) {
            qs.entry = additionalFields.entry;
        }
        if (additionalFields.mode) {
            qs.mode = additionalFields.mode;
        }
    }
    const response = await httpClient.makeRequest('GET', `/email_template/${templateId}/render/`, undefined, qs);
    return [{ json: response }];
}
