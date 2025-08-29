"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseWebhookTrigger = void 0;
const httpClient_1 = require("../transports/httpClient");
class CloseWebhookTrigger {
    constructor() {
        this.description = {
            displayName: 'Close Webhook Trigger',
            name: 'closeWebhookTrigger',
            icon: 'file:close.svg',
            group: ['trigger'],
            version: 1,
            subtitle: '={{$parameter["event"]}}',
            description: 'Handle Close.com webhook events',
            defaults: {
                name: 'Close Webhook Trigger',
            },
            inputs: [],
            outputs: ["main" /* NodeConnectionType.Main */],
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
        this.methods = {
            loadOptions: {
                async getEvents() {
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
        this.webhookMethods = {
            default: {
                async checkExists() {
                    const webhookData = this.getWorkflowStaticData('node');
                    if (webhookData.webhookId === undefined) {
                        return false;
                    }
                    const httpClient = new httpClient_1.CloseHttpClient(this);
                    try {
                        await httpClient.makeRequest('GET', `/webhook/${webhookData.webhookId}/`);
                    }
                    catch (error) {
                        return false;
                    }
                    return true;
                },
                async create() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const event = this.getNodeParameter('event');
                    const additionalOptions = this.getNodeParameter('additionalOptions');
                    const body = {
                        target_url: webhookUrl,
                        events: [event],
                    };
                    if (additionalOptions.webhookName) {
                        body.name = additionalOptions.webhookName;
                    }
                    // Add filters if specified
                    const filters = {};
                    if (additionalOptions.statusFilter) {
                        filters.status_id = additionalOptions.statusFilter;
                    }
                    if (additionalOptions.userFilter) {
                        filters.user_id = additionalOptions.userFilter;
                    }
                    if (Object.keys(filters).length > 0) {
                        body.filters = filters;
                    }
                    const httpClient = new httpClient_1.CloseHttpClient(this);
                    const response = await httpClient.makeRequest('POST', '/webhook/', body);
                    if (response.id === undefined) {
                        return false;
                    }
                    const webhookData = this.getWorkflowStaticData('node');
                    webhookData.webhookId = response.id;
                    return true;
                },
                async delete() {
                    const webhookData = this.getWorkflowStaticData('node');
                    if (webhookData.webhookId !== undefined) {
                        const httpClient = new httpClient_1.CloseHttpClient(this);
                        try {
                            await httpClient.makeRequest('DELETE', `/webhook/${webhookData.webhookId}/`);
                        }
                        catch (error) {
                            return false;
                        }
                        delete webhookData.webhookId;
                    }
                    return true;
                },
            },
        };
    }
    async webhook() {
        const bodyData = this.getBodyData();
        return {
            workflowData: [this.helpers.returnJsonArray([bodyData])],
        };
    }
}
exports.CloseWebhookTrigger = CloseWebhookTrigger;
