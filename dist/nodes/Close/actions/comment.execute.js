"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommentAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeCommentAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'create':
            return await createComment.call(this, httpClient, i);
        case 'get':
            return await getComment.call(this, httpClient, i);
        case 'getAll':
            return await getAllComments.call(this, httpClient, paginator, i);
        case 'getThread':
            return await getCommentThread.call(this, httpClient, i);
        case 'getAllThreads':
            return await getAllCommentThreads.call(this, httpClient, paginator, i);
        case 'update':
            return await updateComment.call(this, httpClient, i);
        case 'delete':
            return await deleteComment.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeCommentAction = executeCommentAction;
async function createComment(httpClient, i) {
    const body = {};
    // Required fields
    const objectId = this.getNodeParameter('objectId', i);
    const commentBody = this.getNodeParameter('body', i);
    body.object_id = objectId;
    body.body = commentBody;
    const response = await httpClient.makeRequest('POST', '/comment/', body);
    return [{ json: response }];
}
async function getComment(httpClient, i) {
    const commentId = this.getNodeParameter('commentId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/comment/${commentId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllComments(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const filterBy = this.getNodeParameter('filterBy', i);
    const qs = {};
    // Filter options - exactly one must be provided
    if (filterBy === 'objectId') {
        const objectId = this.getNodeParameter('objectId', i);
        qs.object_id = objectId;
    }
    else if (filterBy === 'threadId') {
        const threadId = this.getNodeParameter('threadId', i);
        qs.thread_id = threadId;
    }
    const additionalFields = this.getNodeParameter('additionalFields', i);
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/comment/', { returnAll, limit }, qs);
    return response.map((item) => ({ json: item }));
}
async function getCommentThread(httpClient, i) {
    const threadId = this.getNodeParameter('threadId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/comment_thread/${threadId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllCommentThreads(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Filter options
    if (additionalFields.objectIds) {
        qs.object_ids = additionalFields.objectIds;
    }
    if (additionalFields.ids) {
        qs.ids = additionalFields.ids;
    }
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/comment_thread/', { returnAll, limit }, qs);
    return response.map((item) => ({ json: item }));
}
async function updateComment(httpClient, i) {
    const commentId = this.getNodeParameter('commentId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Update fields
    if (updateFields.body !== undefined) {
        body.body = updateFields.body;
    }
    const response = await httpClient.makeRequest('PUT', `/comment/${commentId}/`, body);
    return [{ json: response }];
}
async function deleteComment(httpClient, i) {
    const commentId = this.getNodeParameter('commentId', i);
    await httpClient.makeRequest('DELETE', `/comment/${commentId}/`);
    return [{ json: { success: true, id: commentId } }];
}
