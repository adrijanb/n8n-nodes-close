"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeActivityAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeActivityAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'create':
            return await createActivity.call(this, httpClient, i);
        case 'get':
            return await getActivity.call(this, httpClient, i);
        case 'getAll':
            return await getAllActivities.call(this, httpClient, paginator, i);
        case 'update':
            return await updateActivity.call(this, httpClient, i);
        case 'delete':
            return await deleteActivity.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeActivityAction = executeActivityAction;
async function createActivity(httpClient, i) {
    const activityType = this.getNodeParameter('activityType', i);
    const leadId = this.getNodeParameter('leadId', i);
    const body = {
        lead_id: leadId,
    };
    switch (activityType) {
        case 'call':
            return await createCallActivity.call(this, httpClient, body, i);
        case 'email':
            return await createEmailActivity.call(this, httpClient, body, i);
        case 'meeting':
            return await createMeetingActivity.call(this, httpClient, body, i);
        case 'note':
            return await createNoteActivity.call(this, httpClient, body, i);
        case 'sms':
            return await createSmsActivity.call(this, httpClient, body, i);
        default:
            throw new Error(`Unknown activity type: ${activityType}`);
    }
}
async function createCallActivity(httpClient, body, i) {
    const direction = this.getNodeParameter('direction', i);
    const phone = this.getNodeParameter('phone', i, '');
    const note = this.getNodeParameter('note', i, '');
    const duration = this.getNodeParameter('duration', i, 0);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    body.direction = direction;
    if (phone)
        body.phone = phone;
    if (note)
        body.note = note;
    if (duration)
        body.duration = duration;
    if (additionalFields.contactId)
        body.contact_id = additionalFields.contactId;
    if (additionalFields.userId)
        body.user_id = additionalFields.userId;
    if (additionalFields.dateCreated)
        body.date_created = additionalFields.dateCreated;
    const response = await httpClient.makeRequest('POST', '/activity/call/', body);
    return [{ json: response }];
}
async function createEmailActivity(httpClient, body, i) {
    const direction = this.getNodeParameter('direction', i);
    const subject = this.getNodeParameter('subject', i);
    const bodyText = this.getNodeParameter('bodyText', i, '');
    const bodyHtml = this.getNodeParameter('bodyHtml', i, '');
    const to = this.getNodeParameter('to', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    body.direction = direction;
    body.subject = subject;
    body.to = to;
    if (bodyText)
        body.body_text = bodyText;
    if (bodyHtml)
        body.body_html = bodyHtml;
    if (additionalFields.contactId)
        body.contact_id = additionalFields.contactId;
    if (additionalFields.userId)
        body.user_id = additionalFields.userId;
    if (additionalFields.cc)
        body.cc = additionalFields.cc;
    if (additionalFields.bcc)
        body.bcc = additionalFields.bcc;
    if (additionalFields.sender)
        body.sender = additionalFields.sender;
    if (additionalFields.templateId)
        body.template_id = additionalFields.templateId;
    // Schedule email if specified
    if (additionalFields.sendLater && additionalFields.sendAt) {
        body.send_as_user_id = additionalFields.userId;
        body.date_scheduled = additionalFields.sendAt;
    }
    const response = await httpClient.makeRequest('POST', '/activity/email/', body);
    return [{ json: response }];
}
async function createMeetingActivity(httpClient, body, i) {
    const title = this.getNodeParameter('title', i);
    const note = this.getNodeParameter('note', i, '');
    const startsAt = this.getNodeParameter('startsAt', i);
    const endsAt = this.getNodeParameter('endsAt', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    body.title = title;
    body.starts_at = startsAt;
    body.ends_at = endsAt;
    if (note)
        body.note = note;
    if (additionalFields.contactId)
        body.contact_id = additionalFields.contactId;
    if (additionalFields.userId)
        body.user_id = additionalFields.userId;
    if (additionalFields.location)
        body.location = additionalFields.location;
    if (additionalFields.attendees)
        body.attendees = additionalFields.attendees;
    const response = await httpClient.makeRequest('POST', '/activity/meeting/', body);
    return [{ json: response }];
}
async function createNoteActivity(httpClient, body, i) {
    const useHtml = this.getNodeParameter('useHtml', i, false);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    // Use either note or note_html based on checkbox
    if (useHtml) {
        const noteHtml = this.getNodeParameter('noteHtml', i);
        body.note_html = noteHtml;
    }
    else {
        const note = this.getNodeParameter('note', i);
        body.note = note;
    }
    if (additionalFields.contactId)
        body.contact_id = additionalFields.contactId;
    if (additionalFields.userId)
        body.user_id = additionalFields.userId;
    if (additionalFields.dateCreated)
        body.date_created = additionalFields.dateCreated;
    const response = await httpClient.makeRequest('POST', '/activity/note/', body);
    return [{ json: response }];
}
async function createSmsActivity(httpClient, body, i) {
    const direction = this.getNodeParameter('direction', i);
    const text = this.getNodeParameter('text', i);
    const to = this.getNodeParameter('to', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    body.direction = direction;
    body.text = text;
    body.to = to;
    if (additionalFields.contactId)
        body.contact_id = additionalFields.contactId;
    if (additionalFields.userId)
        body.user_id = additionalFields.userId;
    if (additionalFields.from)
        body.from = additionalFields.from;
    if (additionalFields.templateId)
        body.template_id = additionalFields.templateId;
    const response = await httpClient.makeRequest('POST', '/activity/sms/', body);
    return [{ json: response }];
}
async function getActivity(httpClient, i) {
    const activityType = this.getNodeParameter('activityType', i);
    const activityId = this.getNodeParameter('activityId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/activity/${activityType}/${activityId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllActivities(httpClient, paginator, i) {
    const activityType = this.getNodeParameter('activityType', i);
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Filter options
    if (additionalFields.leadId) {
        qs.lead_id = additionalFields.leadId;
    }
    if (additionalFields.contactId) {
        qs.contact_id = additionalFields.contactId;
    }
    if (additionalFields.userId) {
        qs.user_id = additionalFields.userId;
    }
    if (additionalFields.dateFrom) {
        qs.date_created__gte = additionalFields.dateFrom;
    }
    if (additionalFields.dateTo) {
        qs.date_created__lt = additionalFields.dateTo;
    }
    const endpoint = activityType === 'all' ? '/activity/' : `/activity/${activityType}/`;
    const response = await paginator.getAll(endpoint, { returnAll, limit }, qs);
    return response.map(item => ({ json: item }));
}
async function updateActivity(httpClient, i) {
    const activityType = this.getNodeParameter('activityType', i);
    const activityId = this.getNodeParameter('activityId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Common update fields
    if (updateFields.note !== undefined)
        body.note = updateFields.note;
    // Activity type specific updates
    switch (activityType) {
        case 'call':
            if (updateFields.duration !== undefined)
                body.duration = updateFields.duration;
            if (updateFields.direction !== undefined)
                body.direction = updateFields.direction;
            break;
        case 'email':
            if (updateFields.subject !== undefined)
                body.subject = updateFields.subject;
            if (updateFields.bodyText !== undefined)
                body.body_text = updateFields.bodyText;
            if (updateFields.bodyHtml !== undefined)
                body.body_html = updateFields.bodyHtml;
            break;
        case 'meeting':
            if (updateFields.title !== undefined)
                body.title = updateFields.title;
            if (updateFields.startsAt !== undefined)
                body.starts_at = updateFields.startsAt;
            if (updateFields.endsAt !== undefined)
                body.ends_at = updateFields.endsAt;
            if (updateFields.location !== undefined)
                body.location = updateFields.location;
            break;
        case 'sms':
            if (updateFields.text !== undefined)
                body.text = updateFields.text;
            if (updateFields.direction !== undefined)
                body.direction = updateFields.direction;
            break;
    }
    const response = await httpClient.makeRequest('PUT', `/activity/${activityType}/${activityId}/`, body);
    return [{ json: response }];
}
async function deleteActivity(httpClient, i) {
    const activityType = this.getNodeParameter('activityType', i);
    const activityId = this.getNodeParameter('activityId', i);
    await httpClient.makeRequest('DELETE', `/activity/${activityType}/${activityId}/`);
    return [{ json: { success: true, id: activityId } }];
}
