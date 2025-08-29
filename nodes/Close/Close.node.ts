import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	NodeConnectionType,
} from 'n8n-workflow';

// Import action handlers
import { executeLeadAction } from './actions/lead';
import { executeContactAction } from './actions/contact';
import { executeActivityAction } from './actions/activity';
import { executeMeetingSearchAction } from './actions/meetingSearch';
import { executeOpportunityAction } from './actions/opportunity';
import { executeTaskAction } from './actions/task';
import { executeUserAction } from './actions/user';
import { executeTemplateAction } from './actions/template';
import { executeCustomFieldAction } from './actions/customField';

// Import descriptions
import { leadOperations, leadFields } from './descriptions/LeadDescription';
import { contactOperations, contactFields } from './descriptions/ContactDescription';
import { activityOperations, activityFields } from './descriptions/ActivityDescription';
import { meetingSearchOperations, meetingSearchFields } from './descriptions/MeetingSearchDescription';
import { opportunityOperations, opportunityFields } from './descriptions/OpportunityDescription';
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
			...contactOperations,
			...activityOperations,
			...meetingSearchOperations,
			...opportunityOperations,
			...taskOperations,
			...userOperations,
			...templateOperations,
			...customFieldOperations,

			// Fields
			...leadFields,
			...contactFields,
			...activityFields,
			...meetingSearchFields,
			...opportunityFields,
			...taskFields,
			...userFields,
			...templateFields,
			...customFieldFields,
		],
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
						throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
							itemIndex: i,
						});
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