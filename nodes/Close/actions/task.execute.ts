import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeTaskAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

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

async function createTask(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const leadId = this.getNodeParameter('leadId', i) as string;
	const text = this.getNodeParameter('text', i) as string;

	body.lead_id = leadId;
	body.text = text;

	// Optional fields
	const assignedTo = this.getNodeParameter('assignedTo', i, '') as string;
	if (assignedTo) body.assigned_to = assignedTo;

	const dueDate = this.getNodeParameter('dueDate', i, '') as string;
	if (dueDate) body.due_date = dueDate;

	const isComplete = this.getNodeParameter('isComplete', i, false) as boolean;
	body.is_complete = isComplete;

	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	if (additionalFields.contactId) body.contact_id = additionalFields.contactId;
	if (additionalFields.taskType) body.task_type = additionalFields.taskType;

	const response = await httpClient.makeRequest('POST', '/task/', body);
	
	return [{ json: response }];
}

async function getTask(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const taskId = this.getNodeParameter('taskId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await httpClient.makeRequest('GET', `/task/${taskId}/`, undefined, qs);
	
	return [{ json: response }];
}

async function getAllTasks(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	paginator: ClosePaginator,
	i: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};

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

async function updateTask(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const taskId = this.getNodeParameter('taskId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	// Update fields
	if (updateFields.text !== undefined) body.text = updateFields.text;
	if (updateFields.assignedTo !== undefined) body.assigned_to = updateFields.assignedTo;
	if (updateFields.dueDate !== undefined) body.due_date = updateFields.dueDate;
	if (updateFields.isComplete !== undefined) body.is_complete = updateFields.isComplete;
	if (updateFields.taskType !== undefined) body.task_type = updateFields.taskType;

	const response = await httpClient.makeRequest('PUT', `/task/${taskId}/`, body);
	
	return [{ json: response }];
}

async function deleteTask(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const taskId = this.getNodeParameter('taskId', i) as string;

	await httpClient.makeRequest('DELETE', `/task/${taskId}/`);
	
	return [{ json: { success: true, id: taskId } }];
}

async function completeTask(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const taskId = this.getNodeParameter('taskId', i) as string;

	const body = {
		is_complete: true,
	};

	const response = await httpClient.makeRequest('PUT', `/task/${taskId}/`, body);
	
	return [{ json: response }];
}