"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeTemplateAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeTemplateAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    const templateType = this.getNodeParameter('templateType', i);
    switch (operation) {
        case 'create':
            return await createTemplate.call(this, httpClient, templateType, i);
        case 'get':
            return await getTemplate.call(this, httpClient, templateType, i);
        case 'getAll':
            return await getAllTemplates.call(this, httpClient, paginator, templateType, i);
        case 'update':
            return await updateTemplate.call(this, httpClient, templateType, i);
        case 'delete':
            return await deleteTemplate.call(this, httpClient, templateType, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeTemplateAction = executeTemplateAction;
async function createTemplate(httpClient, templateType, i) {
    const body = {};
    // Common fields
    const name = this.getNodeParameter('name', i);
    body.name = name;
    if (templateType === 'email') {
        const subject = this.getNodeParameter('subject', i);
        const bodyText = this.getNodeParameter('bodyText', i, '');
        const bodyHtml = this.getNodeParameter('bodyHtml', i, '');
        body.subject = subject;
        if (bodyText)
            body.body_text = bodyText;
        if (bodyHtml)
            body.body_html = bodyHtml;
    }
    else if (templateType === 'sms') {
        const text = this.getNodeParameter('text', i);
        body.text = text;
    }
    const additionalFields = this.getNodeParameter('additionalFields', i);
    if (additionalFields.isShared !== undefined)
        body.is_shared = additionalFields.isShared;
    const endpoint = templateType === 'email' ? '/email_template/' : '/sms_template/';
    const response = await httpClient.makeRequest('POST', endpoint, body);
    return [{ json: response }];
}
async function getTemplate(httpClient, templateType, i) {
    const templateId = this.getNodeParameter('templateId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const endpoint = templateType === 'email' ? `/email_template/${templateId}/` : `/sms_template/${templateId}/`;
    const response = await httpClient.makeRequest('GET', endpoint, undefined, qs);
    return [{ json: response }];
}
async function getAllTemplates(httpClient, paginator, templateType, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const endpoint = templateType === 'email' ? '/email_template/' : '/sms_template/';
    const response = await paginator.getAll(endpoint, { returnAll, limit }, qs);
    return response.map(item => ({ json: item }));
}
async function updateTemplate(httpClient, templateType, i) {
    const templateId = this.getNodeParameter('templateId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Common update fields
    if (updateFields.name !== undefined)
        body.name = updateFields.name;
    if (updateFields.isShared !== undefined)
        body.is_shared = updateFields.isShared;
    if (templateType === 'email') {
        if (updateFields.subject !== undefined)
            body.subject = updateFields.subject;
        if (updateFields.bodyText !== undefined)
            body.body_text = updateFields.bodyText;
        if (updateFields.bodyHtml !== undefined)
            body.body_html = updateFields.bodyHtml;
    }
    else if (templateType === 'sms') {
        if (updateFields.text !== undefined)
            body.text = updateFields.text;
    }
    const endpoint = templateType === 'email' ? `/email_template/${templateId}/` : `/sms_template/${templateId}/`;
    const response = await httpClient.makeRequest('PUT', endpoint, body);
    return [{ json: response }];
}
async function deleteTemplate(httpClient, templateType, i) {
    const templateId = this.getNodeParameter('templateId', i);
    const endpoint = templateType === 'email' ? `/email_template/${templateId}/` : `/sms_template/${templateId}/`;
    await httpClient.makeRequest('DELETE', endpoint);
    return [{ json: { success: true, id: templateId } }];
}
