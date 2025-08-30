import {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	NodeOperationError,
	NodeConnectionType,
} from 'n8n-workflow';

import { CloseHttpClient } from '../transports/httpClient';

export class CloseWebhookTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Close Webhook',
		name: 'closeWebhook',
		icon: 'file:close.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Handle Close.com webhook events',
		defaults: {
			name: 'Close Webhook Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'closeApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'close-webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'Lead Created',
						value: 'lead.created',
					},
					{
						name: 'Lead Updated',
						value: 'lead.updated',
					},
					{
						name: 'Lead Deleted',
						value: 'lead.deleted',
					},
					{
						name: 'Contact Created',
						value: 'contact.created',
					},
					{
						name: 'Contact Updated',
						value: 'contact.updated',
					},
					{
						name: 'Contact Deleted',
						value: 'contact.deleted',
					},
					{
						name: 'Opportunity Created',
						value: 'opportunity.created',
					},
					{
						name: 'Opportunity Updated',
						value: 'opportunity.updated',
					},
					{
						name: 'Opportunity Deleted',
						value: 'opportunity.deleted',
					},
					{
						name: 'Task Created',
						value: 'task.created',
					},
					{
						name: 'Task Updated',
						value: 'task.updated',
					},
					{
						name: 'Task Deleted',
						value: 'task.deleted',
					},
					{
						name: 'Activity Call Created',
						value: 'activity.call.created',
					},
					{
						name: 'Activity Email Created',
						value: 'activity.email.created',
					},
					{
						name: 'Activity Meeting Created',
						value: 'activity.meeting.created',
					},
					{
						name: 'Activity Note Created',
						value: 'activity.note.created',
					},
					{
						name: 'Activity SMS Created',
						value: 'activity.sms.created',
					},
				],
				default: 'lead.created',
				required: true,
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Webhook Name',
						name: 'webhookName',
						type: 'string',
						default: 'n8n-webhook',
						description: 'Name for this webhook subscription',
					},
					{
						displayName: 'Status Filter',
						name: 'statusFilter',
						type: 'string',
						default: '',
						description: 'Only trigger for objects with this status ID',
					},
					{
						displayName: 'User Filter',
						name: 'userFilter',
						type: 'string',
						default: '',
						description: 'Only trigger for objects assigned to this user ID',
					},
				],
			},
		],
	};

	methods = {
		loadOptions: {
			async getEvents(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return [
					{
						name: 'Lead Created',
						value: 'lead.created',
					},
					{
						name: 'Lead Updated',
						value: 'lead.updated',
					},
					{
						name: 'Lead Deleted',
						value: 'lead.deleted',
					},
					{
						name: 'Contact Created',
						value: 'contact.created',
					},
					{
						name: 'Contact Updated',
						value: 'contact.updated',
					},
					{
						name: 'Contact Deleted',
						value: 'contact.deleted',
					},
					{
						name: 'Opportunity Created',
						value: 'opportunity.created',
					},
					{
						name: 'Opportunity Updated',
						value: 'opportunity.updated',
					},
					{
						name: 'Opportunity Deleted',
						value: 'opportunity.deleted',
					},
					{
						name: 'Task Created',
						value: 'task.created',
					},
					{
						name: 'Task Updated',
						value: 'task.updated',
					},
					{
						name: 'Task Deleted',
						value: 'task.deleted',
					},
				];
			},
		},
	};

	// @ts-ignore
	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				if (webhookData.webhookId === undefined) {
					return false;
				}

				const httpClient = new CloseHttpClient(this);
				try {
					await httpClient.makeRequest('GET', `/webhook/${webhookData.webhookId}/`);
				} catch (error) {
					return false;
				}

				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;
				const additionalOptions = this.getNodeParameter('additionalOptions') as IDataObject;

				const body: any = {
					target_url: webhookUrl,
					events: [event],
				};

				if (additionalOptions.webhookName) {
					body.name = additionalOptions.webhookName;
				}

				// Add filters if specified
				const filters: any = {};
				if (additionalOptions.statusFilter) {
					filters.status_id = additionalOptions.statusFilter;
				}
				if (additionalOptions.userFilter) {
					filters.user_id = additionalOptions.userFilter;
				}

				if (Object.keys(filters).length > 0) {
					body.filters = filters;
				}

				const httpClient = new CloseHttpClient(this);
				const response = await httpClient.makeRequest('POST', '/webhook/', body);

				if (response.id === undefined) {
					return false;
				}

				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = response.id as string;

				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId !== undefined) {
					const httpClient = new CloseHttpClient(this);
					try {
						await httpClient.makeRequest('DELETE', `/webhook/${webhookData.webhookId}/`);
					} catch (error) {
						return false;
					}

					delete webhookData.webhookId;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();

		return {
			workflowData: [this.helpers.returnJsonArray([bodyData as IDataObject])],
		};
	}
}
