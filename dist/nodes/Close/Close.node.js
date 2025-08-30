"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Close = void 0;
const n8n_workflow_1 = require("n8n-workflow");
// Import action handlers
const lead_execute_1 = require("./actions/lead.execute");
const leadStatus_execute_1 = require("./actions/leadStatus.execute");
const contact_execute_1 = require("./actions/contact.execute");
const activity_execute_1 = require("./actions/activity.execute");
const meetingSearch_execute_1 = require("./actions/meetingSearch.execute");
const opportunity_execute_1 = require("./actions/opportunity.execute");
const opportunityStatus_execute_1 = require("./actions/opportunityStatus.execute");
const integrationLink_execute_1 = require("./actions/integrationLink.execute");
const smartView_execute_1 = require("./actions/smartView.execute");
const comment_execute_1 = require("./actions/comment.execute");
const pipeline_execute_1 = require("./actions/pipeline.execute");
const emailTemplate_execute_1 = require("./actions/emailTemplate.execute");
const task_execute_1 = require("./actions/task.execute");
const user_execute_1 = require("./actions/user.execute");
const template_execute_1 = require("./actions/template.execute");
const customField_execute_1 = require("./actions/customField.execute");
// Import descriptions
const LeadDescription_1 = require("./descriptions/LeadDescription");
const LeadStatusDescription_1 = require("./descriptions/LeadStatusDescription");
const ContactDescription_1 = require("./descriptions/ContactDescription");
const ActivityDescription_1 = require("./descriptions/ActivityDescription");
const MeetingSearchDescription_1 = require("./descriptions/MeetingSearchDescription");
const OpportunityDescription_1 = require("./descriptions/OpportunityDescription");
const OpportunityStatusDescription_1 = require("./descriptions/OpportunityStatusDescription");
const IntegrationLinkDescription_1 = require("./descriptions/IntegrationLinkDescription");
const SmartViewDescription_1 = require("./descriptions/SmartViewDescription");
const CommentDescription_1 = require("./descriptions/CommentDescription");
const PipelineDescription_1 = require("./descriptions/PipelineDescription");
const EmailTemplateDescription_1 = require("./descriptions/EmailTemplateDescription");
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
                ...LeadDescription_1.leadOperations,
                ...LeadStatusDescription_1.leadStatusOperations,
                ...ContactDescription_1.contactOperations,
                ...ActivityDescription_1.activityOperations,
                ...MeetingSearchDescription_1.meetingSearchOperations,
                ...OpportunityDescription_1.opportunityOperations,
                ...OpportunityStatusDescription_1.opportunityStatusOperations,
                ...IntegrationLinkDescription_1.integrationLinkOperations,
                ...SmartViewDescription_1.smartViewOperations,
                ...CommentDescription_1.commentOperations,
                ...PipelineDescription_1.pipelineOperations,
                ...EmailTemplateDescription_1.emailTemplateOperations,
                ...TaskDescription_1.taskOperations,
                ...UserDescription_1.userOperations,
                ...TemplateDescription_1.templateOperations,
                ...CustomFieldDescription_1.customFieldOperations,
                // Fields
                ...LeadDescription_1.leadFields,
                ...LeadStatusDescription_1.leadStatusFields,
                ...ContactDescription_1.contactFields,
                ...ActivityDescription_1.activityFields,
                ...MeetingSearchDescription_1.meetingSearchFields,
                ...OpportunityDescription_1.opportunityFields,
                ...OpportunityStatusDescription_1.opportunityStatusFields,
                ...IntegrationLinkDescription_1.integrationLinkFields,
                ...SmartViewDescription_1.smartViewFields,
                ...CommentDescription_1.commentFields,
                ...PipelineDescription_1.pipelineFields,
                ...EmailTemplateDescription_1.emailTemplateFields,
                ...TaskDescription_1.taskFields,
                ...UserDescription_1.userFields,
                ...TemplateDescription_1.templateFields,
                ...CustomFieldDescription_1.customFieldFields,
            ],
        };
        this.methods = {
            loadOptions: {
                // Load Lead Statuses
                async getLeadStatuses() {
                    const { CloseHttpClient } = await Promise.resolve().then(() => __importStar(require('./transports/httpClient')));
                    const httpClient = new CloseHttpClient(this);
                    try {
                        const response = await httpClient.makeRequest('GET', '/status/lead/');
                        const statuses = response.data || [];
                        return statuses.map((status) => ({
                            name: status.label || status.id,
                            value: status.id,
                            description: `${status.label} (${status.id})`,
                        }));
                    }
                    catch (error) {
                        return [];
                    }
                },
                // Load Custom Fields for Leads
                async getLeadCustomFields() {
                    const { CloseHttpClient } = await Promise.resolve().then(() => __importStar(require('./transports/httpClient')));
                    const httpClient = new CloseHttpClient(this);
                    try {
                        const response = await httpClient.makeRequest('GET', '/custom_field/lead/');
                        const fields = response.data || [];
                        return fields.map((field) => ({
                            name: field.name || field.id,
                            value: field.id,
                            description: `${field.name} (${field.type}) - ${field.id}`,
                        }));
                    }
                    catch (error) {
                        return [];
                    }
                },
                // Load Custom Fields for Contacts
                async getContactCustomFields() {
                    const { CloseHttpClient } = await Promise.resolve().then(() => __importStar(require('./transports/httpClient')));
                    const httpClient = new CloseHttpClient(this);
                    try {
                        const response = await httpClient.makeRequest('GET', '/custom_field/contact/');
                        const fields = response.data || [];
                        return fields.map((field) => ({
                            name: field.name || field.id,
                            value: field.id,
                            description: `${field.name} (${field.type}) - ${field.id}`,
                        }));
                    }
                    catch (error) {
                        return [];
                    }
                },
                // Load Custom Fields for Opportunities
                async getOpportunityCustomFields() {
                    const { CloseHttpClient } = await Promise.resolve().then(() => __importStar(require('./transports/httpClient')));
                    const httpClient = new CloseHttpClient(this);
                    try {
                        const response = await httpClient.makeRequest('GET', '/custom_field/opportunity/');
                        const fields = response.data || [];
                        return fields.map((field) => ({
                            name: field.name || field.id,
                            value: field.id,
                            description: `${field.name} (${field.type}) - ${field.id}`,
                        }));
                    }
                    catch (error) {
                        return [];
                    }
                },
                // Load Opportunity Statuses
                async getOpportunityStatuses() {
                    const { CloseHttpClient } = await Promise.resolve().then(() => __importStar(require('./transports/httpClient')));
                    const httpClient = new CloseHttpClient(this);
                    try {
                        const response = await httpClient.makeRequest('GET', '/status/opportunity/');
                        const statuses = response.data || [];
                        return statuses.map((status) => ({
                            name: status.label || status.id,
                            value: status.id,
                            description: `${status.label} (${status.id})`,
                        }));
                    }
                    catch (error) {
                        return [];
                    }
                },
            },
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
                        responseData = await lead_execute_1.executeLeadAction.call(this, operation, i);
                        break;
                    case 'leadStatus':
                        responseData = await leadStatus_execute_1.executeLeadStatusAction.call(this, operation, i);
                        break;
                    case 'contact':
                        responseData = await contact_execute_1.executeContactAction.call(this, operation, i);
                        break;
                    case 'activity':
                        responseData = await activity_execute_1.executeActivityAction.call(this, operation, i);
                        break;
                    case 'meetingSearch':
                        responseData = await meetingSearch_execute_1.executeMeetingSearchAction.call(this, operation, i);
                        break;
                    case 'opportunity':
                        responseData = await opportunity_execute_1.executeOpportunityAction.call(this, operation, i);
                        break;
                    case 'opportunityStatus':
                        responseData = await opportunityStatus_execute_1.executeOpportunityStatusAction.call(this, operation, i);
                        break;
                    case 'integrationLink':
                        responseData = await integrationLink_execute_1.executeIntegrationLinkAction.call(this, operation, i);
                        break;
                    case 'smartView':
                        responseData = await smartView_execute_1.executeSmartViewAction.call(this, operation, i);
                        break;
                    case 'comment':
                        responseData = await comment_execute_1.executeCommentAction.call(this, operation, i);
                        break;
                    case 'pipeline':
                        responseData = await pipeline_execute_1.executePipelineAction.call(this, operation, i);
                        break;
                    case 'emailTemplate':
                        responseData = await emailTemplate_execute_1.executeEmailTemplateAction.call(this, operation, i);
                        break;
                    case 'task':
                        responseData = await task_execute_1.executeTaskAction.call(this, operation, i);
                        break;
                    case 'user':
                        responseData = await user_execute_1.executeUserAction.call(this, operation, i);
                        break;
                    case 'template':
                        responseData = await template_execute_1.executeTemplateAction.call(this, operation, i);
                        break;
                    case 'customField':
                        responseData = await customField_execute_1.executeCustomFieldAction.call(this, operation, i);
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
