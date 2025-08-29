"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeUserAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeUserAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'get':
            return await getUser.call(this, httpClient, i);
        case 'getAll':
            return await getAllUsers.call(this, httpClient, paginator, i);
        case 'getCurrent':
            return await getCurrentUser.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeUserAction = executeUserAction;
async function getUser(httpClient, i) {
    const userId = this.getNodeParameter('userId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/user/${userId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllUsers(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Filter options
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/user/', { returnAll, limit }, qs);
    return response.map(item => ({ json: item }));
}
async function getCurrentUser(httpClient, i) {
    const response = await httpClient.makeRequest('GET', '/me/');
    return [{ json: response }];
}
