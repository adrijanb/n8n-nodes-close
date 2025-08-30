"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeTaskAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
async function executeTaskAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'create':
            return await createTask.call(this, httpClient, i);
        case 'get':
            return await getTask.call(this, httpClient, i);
        case 'getAll':
            return await getAllTasks.call(this, httpClient, paginator, i);
        case 'update':
            return await updateTask.call(this, httpClient, i);
        case 'delete':
            return await deleteTask.call(this, httpClient, i);
        case 'complete':
            return await completeTask.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeTaskAction = executeTaskAction;
async function createTask(httpClient, i) {
    const body = {};
    // Required fields
    const leadId = this.getNodeParameter('leadId', i);
    const text = this.getNodeParameter('text', i);
    body.lead_id = leadId;
    body.text = text;
    // Optional fields
    const assignedTo = this.getNodeParameter('assignedTo', i, '');
    if (assignedTo)
        body.assigned_to = assignedTo;
    const dueDate = this.getNodeParameter('dueDate', i, '');
    if (dueDate)
        body.due_date = dueDate;
    const isComplete = this.getNodeParameter('isComplete', i, false);
    body.is_complete = isComplete;
    const additionalFields = this.getNodeParameter('additionalFields', i);
    if (additionalFields.contactId)
        body.contact_id = additionalFields.contactId;
    if (additionalFields.taskType)
        body.task_type = additionalFields.taskType;
    const response = await httpClient.makeRequest('POST', '/task/', body);
    return [{ json: response }];
}
async function getTask(httpClient, i) {
    const taskId = this.getNodeParameter('taskId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/task/${taskId}/`, undefined, qs);
    return [{ json: response }];
}
async function getAllTasks(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Filter options
    if (additionalFields.leadId) {
        qs.lead_id = additionalFields.leadId;
    }
    if (additionalFields.assignedTo) {
        qs.assigned_to = additionalFields.assignedTo;
    }
    if (additionalFields.isComplete !== undefined) {
        qs.is_complete = additionalFields.isComplete;
    }
    if (additionalFields.taskType) {
        qs.task_type = additionalFields.taskType;
    }
    if (additionalFields.dueDateFrom) {
        qs.due_date__gte = additionalFields.dueDateFrom;
    }
    if (additionalFields.dueDateTo) {
        qs.due_date__lt = additionalFields.dueDateTo;
    }
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/task/', { returnAll, limit }, qs);
    return response.map(item => ({ json: item }));
}
async function updateTask(httpClient, i) {
    const taskId = this.getNodeParameter('taskId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Update fields
    if (updateFields.text !== undefined)
        body.text = updateFields.text;
    if (updateFields.assignedTo !== undefined)
        body.assigned_to = updateFields.assignedTo;
    if (updateFields.dueDate !== undefined)
        body.due_date = updateFields.dueDate;
    if (updateFields.isComplete !== undefined)
        body.is_complete = updateFields.isComplete;
    if (updateFields.taskType !== undefined)
        body.task_type = updateFields.taskType;
    const response = await httpClient.makeRequest('PUT', `/task/${taskId}/`, body);
    return [{ json: response }];
}
async function deleteTask(httpClient, i) {
    const taskId = this.getNodeParameter('taskId', i);
    await httpClient.makeRequest('DELETE', `/task/${taskId}/`);
    return [{ json: { success: true, id: taskId } }];
}
async function completeTask(httpClient, i) {
    const taskId = this.getNodeParameter('taskId', i);
    const body = {
        is_complete: true,
    };
    const response = await httpClient.makeRequest('PUT', `/task/${taskId}/`, body);
    return [{ json: response }];
}
