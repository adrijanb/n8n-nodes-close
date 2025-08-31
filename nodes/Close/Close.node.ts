import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	NodeConnectionType,
} from 'n8n-workflow';

// Import action handlers
import { executeLeadAction } from './actions/lead.execute';
import { executeLeadStatusAction } from './actions/leadStatus.execute';
import { executeContactAction } from './actions/contact.execute';
import { executeActivityAction } from './actions/activity.execute';
import { executeMeetingSearchAction } from './actions/meetingSearch.execute';
import { executeOpportunityAction } from './actions/opportunity.execute';
import { executeOpportunityStatusAction } from './actions/opportunityStatus.execute';
import { executeIntegrationLinkAction } from './actions/integrationLink.execute';
import { executeSmartViewAction } from './actions/smartView.execute';
import { executeCommentAction } from './actions/comment.execute';
import { executePipelineAction } from './actions/pipeline.execute';
import { executeEmailTemplateAction } from './actions/emailTemplate.execute';
import { executeTaskAction } from './actions/task.execute';
import { executeUserAction } from './actions/user.execute';
import { executeTemplateAction } from './actions/template.execute';
import { executeCustomFieldAction } from './actions/customField.execute';

// Import descriptions
import { leadOperations, leadFields } from './descriptions/LeadDescription';
import { leadStatusOperations, leadStatusFields } from './descriptions/LeadStatusDescription';
import { contactOperations, contactFields } from './descriptions/ContactDescription';
import { activityOperations, activityFields } from './descriptions/ActivityDescription';
import {
	meetingSearchOperations,
	meetingSearchFields,
} from './descriptions/MeetingSearchDescription';
import { opportunityOperations, opportunityFields } from './descriptions/OpportunityDescription';
import {
	opportunityStatusOperations,
	opportunityStatusFields,
} from './descriptions/OpportunityStatusDescription';
import {
	integrationLinkOperations,
	integrationLinkFields,
} from './descriptions/IntegrationLinkDescription';
import { smartViewOperations, smartViewFields } from './descriptions/SmartViewDescription';
import { commentOperations, commentFields } from './descriptions/CommentDescription';
import { pipelineOperations, pipelineFields } from './descriptions/PipelineDescription';
import {
	emailTemplateOperations,
	emailTemplateFields,
} from './descriptions/EmailTemplateDescription';
import { taskOperations, taskFields } from './descriptions/TaskDescription';
import { userOperations, userFields } from './descriptions/UserDescription';
import { templateOperations, templateFields } from './descriptions/TemplateDescription';
import { customFieldOperations, customFieldFields } from './descriptions/CustomFieldDescription';

export class Close implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Close',
		name: 'close',
		icon: 'file:close.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Close.com CRM',
		defaults: {
			name: 'Close',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'closeApi',
				required: true,
			},
		],
		properties: [
			// Resource Selection
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Lead',
						value: 'lead',
						description: 'Operations on leads',
					},
					{
						name: 'Lead Status',
						value: 'leadStatus',
						description: 'Operations on lead statuses',
					},
					{
						name: 'Contact',
						value: 'contact',
						description: 'Operations on contacts',
					},
					{
						name: 'Activity',
						value: 'activity',
						description: 'Operations on activities (calls, emails, meetings, notes, SMS)',
					},
					{
						name: 'Meeting Search',
						value: 'meetingSearch',
						description: 'Search for meetings',
					},
					{
						name: 'Opportunity',
						value: 'opportunity',
						description: 'Operations on opportunities',
					},
					{
						name: 'Opportunity Status',
						value: 'opportunityStatus',
						description: 'Operations on opportunity statuses',
					},
					{
						name: 'Integration Link',
						value: 'integrationLink',
						description: 'Operations on integration links',
					},
					{
						name: 'Smart View',
						value: 'smartView',
						description: 'Operations on smart views (saved searches)',
					},
					{
						name: 'Comment',
						value: 'comment',
						description: 'Operations on comments and comment threads',
					},
					{
						name: 'Pipeline',
						value: 'pipeline',
						description: 'Operations on pipelines (opportunity status groups)',
					},
					{
						name: 'Email Template',
						value: 'emailTemplate',
						description: 'Operations on email templates',
					},
					{
						name: 'Task',
						value: 'task',
						description: 'Operations on tasks',
					},
					{
						name: 'User',
						value: 'user',
						description: 'Operations on users',
					},
					{
						name: 'Template',
						value: 'template',
						description: 'Operations on email and SMS templates',
					},
					{
						name: 'Custom Field',
						value: 'customField',
						description: 'Operations on custom fields',
					},
				],
				default: 'lead',
			},

			// Operations
			...leadOperations,
			...leadStatusOperations,
			...contactOperations,
			...activityOperations,
			...meetingSearchOperations,
			...opportunityOperations,
			...opportunityStatusOperations,
			...integrationLinkOperations,
			...smartViewOperations,
			...commentOperations,
			...pipelineOperations,
			...emailTemplateOperations,
			...taskOperations,
			...userOperations,
			...templateOperations,
			...customFieldOperations,

			// Fields
			...leadFields,
			...leadStatusFields,
			...contactFields,
			...activityFields,
			...meetingSearchFields,
			...opportunityFields,
			...opportunityStatusFields,
			...integrationLinkFields,
			...smartViewFields,
			...commentFields,
			...pipelineFields,
			...emailTemplateFields,
			...taskFields,
			...userFields,
			...templateFields,
			...customFieldFields,
		],
	};

	methods = {
		loadOptions: {
			// Load Lead Statuses
			async getLeadStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { CloseHttpClient } = await import('./transports/httpClient');
				const httpClient = new CloseHttpClient(this);

				try {
					const response = await httpClient.makeRequest('GET', '/status/lead/');
					const statuses = response.data || [];

					return statuses.map((status: any) => ({
						name: status.label || status.id,
						value: status.id,
						description: `${status.label} (${status.id})`,
					}));
				} catch (error) {
					return [];
				}
			},

			// Load Custom Fields for Leads
			async getLeadCustomFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { CloseHttpClient } = await import('./transports/httpClient');
				const httpClient = new CloseHttpClient(this);

				try {
					const response = await httpClient.makeRequest('GET', '/custom_field/lead/');
					const fields = response.data || [];

					return fields
						.filter((field: any) => field.type !== 'user') // Exclude user fields
						.map((field: any) => ({
							name: field.name || field.id,
							value: field.id,
							description: `${field.name} (${field.type}) - ${field.id}`,
						}));
				} catch (error) {
					return [];
				}
			},

			// Load User-Type Custom Fields for Leads
			async getLeadUserCustomFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { CloseHttpClient } = await import('./transports/httpClient');
				const httpClient = new CloseHttpClient(this);

				try {
					const response = await httpClient.makeRequest('GET', '/custom_field/lead/');
					const fields = response.data || [];

					return fields
						.filter((field: any) => field.type === 'user') // Only user fields
						.map((field: any) => ({
							name: field.name || field.id,
							value: field.id,
							description: `${field.name} (User Field) - ${field.id}`,
						}));
				} catch (error) {
					return [];
				}
			},

			// Load Custom Fields for Contacts
			async getContactCustomFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { CloseHttpClient } = await import('./transports/httpClient');
				const httpClient = new CloseHttpClient(this);

				try {
					const response = await httpClient.makeRequest('GET', '/custom_field/contact/');
					const fields = response.data || [];

					return fields.map((field: any) => ({
						name: field.name || field.id,
						value: field.id,
						description: `${field.name} (${field.type}) - ${field.id}`,
					}));
				} catch (error) {
					return [];
				}
			},

			// Load Custom Fields for Opportunities
			async getOpportunityCustomFields(
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				const { CloseHttpClient } = await import('./transports/httpClient');
				const httpClient = new CloseHttpClient(this);

				try {
					const response = await httpClient.makeRequest('GET', '/custom_field/opportunity/');
					const fields = response.data || [];

					return fields.map((field: any) => ({
						name: field.name || field.id,
						value: field.id,
						description: `${field.name} (${field.type}) - ${field.id}`,
					}));
				} catch (error) {
					return [];
				}
			},

			// Load Opportunity Statuses
			async getOpportunityStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { CloseHttpClient } = await import('./transports/httpClient');
				const httpClient = new CloseHttpClient(this);

				try {
					const response = await httpClient.makeRequest('GET', '/status/opportunity/');
					const statuses = response.data || [];

					return statuses.map((status: any) => ({
						name: status.label || status.id,
						value: status.id,
						description: `${status.label} (${status.id})`,
					}));
				} catch (error) {
					return [];
				}
			},

			async getUsers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { CloseHttpClient } = await import('./transports/httpClient');
				const httpClient = new CloseHttpClient(this);

				try {
					const response = await httpClient.makeRequest('GET', '/user/');
					const users = response.data || [];

					return users.map((user: any) => ({
						name: `${user.first_name} ${user.last_name}`.trim() || user.email || user.id,
						value: user.id,
						description: `${user.first_name} ${user.last_name} (${user.email})`.trim(),
					}));
				} catch (error) {
					return [];
				}
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: INodeExecutionData[];

				switch (resource) {
					case 'lead':
						responseData = await executeLeadAction.call(this, operation, i);
						break;
					case 'leadStatus':
						responseData = await executeLeadStatusAction.call(this, operation, i);
						break;
					case 'contact':
						responseData = await executeContactAction.call(this, operation, i);
						break;
					case 'activity':
						responseData = await executeActivityAction.call(this, operation, i);
						break;
					case 'meetingSearch':
						responseData = await executeMeetingSearchAction.call(this, operation, i);
						break;
					case 'opportunity':
						responseData = await executeOpportunityAction.call(this, operation, i);
						break;
					case 'opportunityStatus':
						responseData = await executeOpportunityStatusAction.call(this, operation, i);
						break;
					case 'integrationLink':
						responseData = await executeIntegrationLinkAction.call(this, operation, i);
						break;
					case 'smartView':
						responseData = await executeSmartViewAction.call(this, operation, i);
						break;
					case 'comment':
						responseData = await executeCommentAction.call(this, operation, i);
						break;
					case 'pipeline':
						responseData = await executePipelineAction.call(this, operation, i);
						break;
					case 'emailTemplate':
						responseData = await executeEmailTemplateAction.call(this, operation, i);
						break;
					case 'task':
						responseData = await executeTaskAction.call(this, operation, i);
						break;
					case 'user':
						responseData = await executeUserAction.call(this, operation, i);
						break;
					case 'template':
						responseData = await executeTemplateAction.call(this, operation, i);
						break;
					case 'customField':
						responseData = await executeCustomFieldAction.call(this, operation, i);
						break;
					default:
						throw new NodeOperationError(
							this.getNode(),
							`The resource "${resource}" is not known!`,
							{
								itemIndex: i,
							},
						);
				}

				returnData.push(...responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					returnData.push({ json: { error: errorMessage } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
