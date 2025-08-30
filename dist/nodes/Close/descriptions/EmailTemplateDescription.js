"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplateFields = exports.emailTemplateOperations = void 0;
exports.emailTemplateOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new email template',
                action: 'Create an email template',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Retrieve a single email template',
                action: 'Get an email template',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Retrieve many email templates',
                action: 'Get many email templates',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update an existing email template',
                action: 'Update an email template',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete an email template',
                action: 'Delete an email template',
            },
            {
                name: 'Render',
                value: 'render',
                description: 'Render an email template for a specific lead/contact',
                action: 'Render an email template',
            },
        ],
        default: 'getAll',
    },
];
exports.emailTemplateFields = [
    // Create Email Template
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The name of the email template',
    },
    {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The subject line of the email template',
    },
    {
        displayName: 'Body HTML',
        name: 'bodyHtml',
        type: 'string',
        typeOptions: {
            rows: 6,
        },
        required: true,
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The HTML body of the email template',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Body Text',
                name: 'bodyText',
                type: 'string',
                typeOptions: {
                    rows: 4,
                },
                default: '',
                description: 'The plain text body of the email template',
            },
            {
                displayName: 'Is Shared',
                name: 'isShared',
                type: 'boolean',
                default: false,
                description: 'Whether the template is shared with the organization',
            },
            {
                displayName: 'Is Archived',
                name: 'isArchived',
                type: 'boolean',
                default: false,
                description: 'Whether the template is archived',
            },
        ],
    },
    // Get Email Template
    {
        displayName: 'Template ID',
        name: 'templateId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['get', 'update', 'delete', 'render'],
            },
        },
        default: '',
        description: 'The ID of the email template',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['get'],
            },
        },
        options: [
            {
                displayName: 'Fields',
                name: 'fields',
                type: 'string',
                default: '',
                description: 'Comma-separated list of fields to include in response',
            },
        ],
    },
    // Get All Email Templates
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['getAll'],
            },
        },
        default: false,
        description: 'Whether to return all results or only up to a given limit',
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['getAll'],
                returnAll: [false],
            },
        },
        typeOptions: {
            minValue: 1,
        },
        default: 50,
        description: 'Max number of results to return',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Is Archived',
                name: 'isArchived',
                type: 'boolean',
                default: false,
                description: 'Filter templates by archived status',
            },
            {
                displayName: 'Fields',
                name: 'fields',
                type: 'string',
                default: '',
                description: 'Comma-separated list of fields to include in response',
            },
        ],
    },
    // Update Email Template
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'The new name of the email template',
            },
            {
                displayName: 'Subject',
                name: 'subject',
                type: 'string',
                default: '',
                description: 'The new subject line of the email template',
            },
            {
                displayName: 'Body HTML',
                name: 'bodyHtml',
                type: 'string',
                typeOptions: {
                    rows: 6,
                },
                default: '',
                description: 'The new HTML body of the email template',
            },
            {
                displayName: 'Body Text',
                name: 'bodyText',
                type: 'string',
                typeOptions: {
                    rows: 4,
                },
                default: '',
                description: 'The new plain text body of the email template',
            },
            {
                displayName: 'Is Shared',
                name: 'isShared',
                type: 'boolean',
                default: false,
                description: 'Whether the template is shared with the organization',
            },
            {
                displayName: 'Is Archived',
                name: 'isArchived',
                type: 'boolean',
                default: false,
                description: 'Whether the template is archived',
            },
        ],
    },
    // Render Email Template
    {
        displayName: 'Render Mode',
        name: 'renderMode',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['render'],
            },
        },
        options: [
            {
                name: 'Single Lead/Contact',
                value: 'singleLeadContact',
                description: 'Render template for a specific lead and contact',
            },
            {
                name: 'Search Query',
                value: 'searchQuery',
                description: 'Render template for results from a search query',
            },
        ],
        default: 'singleLeadContact',
        description: 'How to render the email template',
    },
    {
        displayName: 'Lead ID',
        name: 'leadId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['render'],
                renderMode: ['singleLeadContact'],
            },
        },
        default: '',
        description: 'The ID of the lead to render the template for',
    },
    {
        displayName: 'Contact ID',
        name: 'contactId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['render'],
                renderMode: ['singleLeadContact'],
            },
        },
        default: '',
        description: 'The ID of the contact to render the template for',
    },
    {
        displayName: 'Query',
        name: 'query',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['render'],
                renderMode: ['searchQuery'],
            },
        },
        default: '',
        description: 'The search query to use for rendering',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['emailTemplate'],
                operation: ['render'],
                renderMode: ['searchQuery'],
            },
        },
        options: [
            {
                displayName: 'Entry',
                name: 'entry',
                type: 'number',
                typeOptions: {
                    minValue: 0,
                    maxValue: 99,
                },
                default: 0,
                description: 'The index of the lead/contact to render (0-99)',
            },
            {
                displayName: 'Mode',
                name: 'mode',
                type: 'options',
                options: [
                    {
                        name: 'Lead',
                        value: 'lead',
                        description: 'Render for the first contact of the lead at the given entry index',
                    },
                    {
                        name: 'Contact',
                        value: 'contact',
                        description: 'Render for the contact at the given entry index',
                    },
                ],
                default: 'lead',
                description: 'Whether to render for leads or contacts',
            },
        ],
    },
];
