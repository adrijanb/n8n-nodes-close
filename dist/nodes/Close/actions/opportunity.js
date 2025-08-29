"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeOpportunityAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeOpportunityAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'create':
            return await createOpportunity.call(this, httpClient, i);
        case 'get':
            return await getOpportunity.call(this, httpClient, i);
        case 'getAll':
            return await getAllOpportunities.call(this, httpClient, paginator, i);
        case 'update':
            return await updateOpportunity.call(this, httpClient, i);
        case 'delete':
            return await deleteOpportunity.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeOpportunityAction = executeOpportunityAction;
async function createOpportunity(httpClient, i) {
    const body = {};
    // Required fields
    const leadId = this.getNodeParameter('leadId', i);
    const statusId = this.getNodeParameter('statusId', i);
    body.lead_id = leadId;
    body.status_id = statusId;
    // Optional fields
    const note = this.getNodeParameter('note', i, '');
    if (note)
        body.note = note;
    const value = this.getNodeParameter('value', i, 0);
    if (value)
        body.value = value;
    const valueFormatted = this.getNodeParameter('valueFormatted', i, '');
    if (valueFormatted)
        body.value_formatted = valueFormatted;
    const additionalFields = this.getNodeParameter('additionalFields', i);
    if (additionalFields.contactId)
        body.contact_id = additionalFields.contactId;
    if (additionalFields.userId)
        body.user_id = additionalFields.userId;
    if (additionalFields.expectedValue)
        body.expected_value = additionalFields.expectedValue;
    if (additionalFields.confidence)
        body.confidence = additionalFields.confidence;
    if (additionalFields.dateWon)
        body.date_won = additionalFields.dateWon;
    // Custom fields
    if (additionalFields.customFields) {
        Object.assign(body, additionalFields.customFields);
    }
    const response = await httpClient.makeRequest('POST', '/opportunity/', body);
    return [{ json: response }];
}
async function getOpportunity(httpClient, i) {
    const opportunityId = this.getNodeParameter('opportunityId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/opportunity/${opportunityId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllOpportunities(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Filter options
    if (additionalFields.leadId) {
        qs.lead_id = additionalFields.leadId;
    }
    if (additionalFields.statusId) {
        qs.status_id = additionalFields.statusId;
    }
    if (additionalFields.userId) {
        qs.user_id = additionalFields.userId;
    }
    if (additionalFields.query) {
        qs.query = additionalFields.query;
    }
    if (additionalFields.dateFrom) {
        qs.date_created__gte = additionalFields.dateFrom;
    }
    if (additionalFields.dateTo) {
        qs.date_created__lt = additionalFields.dateTo;
    }
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/opportunity/', { returnAll, limit }, qs);
    return response.map(item => ({ json: item }));
}
async function updateOpportunity(httpClient, i) {
    const opportunityId = this.getNodeParameter('opportunityId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Update fields
    if (updateFields.note !== undefined)
        body.note = updateFields.note;
    if (updateFields.value !== undefined)
        body.value = updateFields.value;
    if (updateFields.valueFormatted !== undefined)
        body.value_formatted = updateFields.valueFormatted;
    if (updateFields.statusId !== undefined)
        body.status_id = updateFields.statusId;
    if (updateFields.expectedValue !== undefined)
        body.expected_value = updateFields.expectedValue;
    if (updateFields.confidence !== undefined)
        body.confidence = updateFields.confidence;
    if (updateFields.dateWon !== undefined)
        body.date_won = updateFields.dateWon;
    // Custom fields
    if (updateFields.customFields) {
        Object.assign(body, updateFields.customFields);
    }
    const response = await httpClient.makeRequest('PUT', `/opportunity/${opportunityId}/`, body);
    return [{ json: response }];
}
async function deleteOpportunity(httpClient, i) {
    const opportunityId = this.getNodeParameter('opportunityId', i);
    await httpClient.makeRequest('DELETE', `/opportunity/${opportunityId}/`);
    return [{ json: { success: true, id: opportunityId } }];
}
