"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMeetingSearchAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeMeetingSearchAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'search':
            return await searchMeetings.call(this, httpClient, paginator, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeMeetingSearchAction = executeMeetingSearchAction;
async function searchMeetings(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Search parameters
    if (additionalFields.query) {
        qs.query = additionalFields.query;
    }
    if (additionalFields.userId) {
        qs.user_id = additionalFields.userId;
    }
    if (additionalFields.leadId) {
        qs.lead_id = additionalFields.leadId;
    }
    if (additionalFields.contactId) {
        qs.contact_id = additionalFields.contactId;
    }
    if (additionalFields.dateFrom) {
        qs.date_from = additionalFields.dateFrom;
    }
    if (additionalFields.dateTo) {
        qs.date_to = additionalFields.dateTo;
    }
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/meeting-search/', { returnAll, limit }, qs);
    return response.map(item => ({ json: item }));
}
