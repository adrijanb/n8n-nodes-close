"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Close = void 0;
const n8n_workflow_1 = require("n8n-workflow");
// Import action handlers
const lead_1 = require("./actions/lead");
const contact_1 = require("./actions/contact");
const activity_1 = require("./actions/activity");
const meetingSearch_1 = require("./actions/meetingSearch");
const opportunity_1 = require("./actions/opportunity");
const task_1 = require("./actions/task");
const user_1 = require("./actions/user");
const template_1 = require("./actions/template");
const customField_1 = require("./actions/customField");
// Import descriptions
const LeadDescription_1 = require("./descriptions/LeadDescription");
const ContactDescription_1 = require("./descriptions/ContactDescription");
const ActivityDescription_1 = require("./descriptions/ActivityDescription");
const MeetingSearchDescription_1 = require("./descriptions/MeetingSearchDescription");
const OpportunityDescription_1 = require("./descriptions/OpportunityDescription");
const TaskDescription_1 = require("./descriptions/TaskDescription");
const UserDescription_1 = require("./descriptions/UserDescription");
const TemplateDescription_1 = require("./descriptions/TemplateDescription");
const CustomFieldDescription_1 = require("./descriptions/CustomFieldDescription");
class Close {
    constructor() {
        this.description = {
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
            inputs: ["main" /* NodeConnectionType.Main */],
            outputs: ["main" /* NodeConnectionType.Main */],
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
                ...LeadDescription_1.leadOperations,
                ...ContactDescription_1.contactOperations,
                ...ActivityDescription_1.activityOperations,
                ...MeetingSearchDescription_1.meetingSearchOperations,
                ...OpportunityDescription_1.opportunityOperations,
                ...TaskDescription_1.taskOperations,
                ...UserDescription_1.userOperations,
                ...TemplateDescription_1.templateOperations,
                ...CustomFieldDescription_1.customFieldOperations,
                // Fields
                ...LeadDescription_1.leadFields,
                ...ContactDescription_1.contactFields,
                ...ActivityDescription_1.activityFields,
                ...MeetingSearchDescription_1.meetingSearchFields,
                ...OpportunityDescription_1.opportunityFields,
                ...TaskDescription_1.taskFields,
                ...UserDescription_1.userFields,
                ...TemplateDescription_1.templateFields,
                ...CustomFieldDescription_1.customFieldFields,
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < items.length; i++) {
            try {
                let responseData;
                switch (resource) {
                    case 'lead':
                        responseData = await lead_1.executeLeadAction.call(this, operation, i);
                        break;
                    case 'contact':
                        responseData = await contact_1.executeContactAction.call(this, operation, i);
                        break;
                    case 'activity':
                        responseData = await activity_1.executeActivityAction.call(this, operation, i);
                        break;
                    case 'meetingSearch':
                        responseData = await meetingSearch_1.executeMeetingSearchAction.call(this, operation, i);
                        break;
                    case 'opportunity':
                        responseData = await opportunity_1.executeOpportunityAction.call(this, operation, i);
                        break;
                    case 'task':
                        responseData = await task_1.executeTaskAction.call(this, operation, i);
                        break;
                    case 'user':
                        responseData = await user_1.executeUserAction.call(this, operation, i);
                        break;
                    case 'template':
                        responseData = await template_1.executeTemplateAction.call(this, operation, i);
                        break;
                    case 'customField':
                        responseData = await customField_1.executeCustomFieldAction.call(this, operation, i);
                        break;
                    default:
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
                            itemIndex: i,
                        });
                }
                returnData.push(...responseData);
            }
            catch (error) {
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
exports.Close = Close;
