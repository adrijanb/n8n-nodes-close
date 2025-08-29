"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityFields = exports.activityOperations = void 0;
exports.activityOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['activity'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new activity',
                action: 'Create an activity',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Retrieve a single activity',
                action: 'Get an activity',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Retrieve many activities',
                action: 'Get many activities',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update an existing activity',
                action: 'Update an activity',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete an activity',
                action: 'Delete an activity',
            },
        ],
        default: 'getAll',
    },
];
exports.activityFields = [
    // Activity Type Selection
    {
        displayName: 'Activity Type',
        name: 'activityType',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
            },
        },
        options: [
            {
                name: 'Call',
                value: 'call',
                description: 'Phone call activity',
            },
            {
                name: 'Email',
                value: 'email',
                description: 'Email activity',
            },
            {
                name: 'Meeting',
                value: 'meeting',
                description: 'Meeting activity',
            },
            {
                name: 'Note',
                value: 'note',
                description: 'Note activity',
            },
            {
                name: 'SMS',
                value: 'sms',
                description: 'SMS activity',
            },
            {
                name: 'All',
                value: 'all',
                description: 'All activity types (for getAll operation)',
            },
        ],
        default: 'note',
    },
    // Lead ID (required for create)
    {
        displayName: 'Lead ID',
        name: 'leadId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The ID of the lead this activity belongs to',
    },
    // Activity ID (for get, update, delete)
    {
        displayName: 'Activity ID',
        name: 'activityId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['get', 'update', 'delete'],
            },
        },
        default: '',
        description: 'The ID of the activity',
    },
    // Call specific fields
    {
        displayName: 'Direction',
        name: 'direction',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['call'],
            },
        },
        options: [
            {
                name: 'Inbound',
                value: 'inbound',
            },
            {
                name: 'Outbound',
                value: 'outbound',
            },
        ],
        default: 'outbound',
        description: 'The direction of the call',
    },
    {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['call'],
            },
        },
        default: '',
        description: 'The phone number that was called',
    },
    {
        displayName: 'Note',
        name: 'note',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['call', 'note'],
            },
        },
        default: '',
        description: 'Notes about the call or note content',
    },
    {
        displayName: 'Duration (seconds)',
        name: 'duration',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['call'],
            },
        },
        default: 0,
        description: 'Duration of the call in seconds',
    },
    // Email specific fields
    {
        displayName: 'Direction',
        name: 'direction',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['email'],
            },
        },
        options: [
            {
                name: 'Inbound',
                value: 'inbound',
            },
            {
                name: 'Outbound',
                value: 'outbound',
            },
        ],
        default: 'outbound',
        description: 'The direction of the email',
    },
    {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['email'],
            },
        },
        default: '',
        description: 'The subject of the email',
    },
    {
        displayName: 'To',
        name: 'to',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['email'],
            },
        },
        default: '',
        description: 'Email addresses to send to (comma separated)',
    },
    {
        displayName: 'Body Text',
        name: 'bodyText',
        type: 'string',
        typeOptions: {
            rows: 4,
        },
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['email'],
            },
        },
        default: '',
        description: 'Plain text body of the email',
    },
    {
        displayName: 'Body HTML',
        name: 'bodyHtml',
        type: 'string',
        typeOptions: {
            rows: 4,
        },
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['email'],
            },
        },
        default: '',
        description: 'HTML body of the email',
    },
    // Meeting specific fields
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['meeting'],
            },
        },
        default: '',
        description: 'The title of the meeting',
    },
    {
        displayName: 'Starts At',
        name: 'startsAt',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['meeting'],
            },
        },
        default: '',
        description: 'When the meeting starts',
    },
    {
        displayName: 'Ends At',
        name: 'endsAt',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['meeting'],
            },
        },
        default: '',
        description: 'When the meeting ends',
    },
    // SMS specific fields
    {
        displayName: 'Direction',
        name: 'direction',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['sms'],
            },
        },
        options: [
            {
                name: 'Inbound',
                value: 'inbound',
            },
            {
                name: 'Outbound',
                value: 'outbound',
            },
        ],
        default: 'outbound',
        description: 'The direction of the SMS',
    },
    {
        displayName: 'Text',
        name: 'text',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['sms'],
            },
        },
        default: '',
        description: 'The text content of the SMS',
    },
    {
        displayName: 'To',
        name: 'to',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['sms'],
            },
        },
        default: '',
        description: 'The phone number to send the SMS to',
    },
    // Additional fields for all activity types
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create', 'get'],
            },
        },
        options: [
            {
                displayName: 'Contact ID',
                name: 'contactId',
                type: 'string',
                default: '',
                description: 'The ID of the contact associated with this activity',
            },
            {
                displayName: 'User ID',
                name: 'userId',
                type: 'string',
                default: '',
                description: 'The ID of the user who performed this activity',
            },
            {
                displayName: 'Date Created',
                name: 'dateCreated',
                type: 'dateTime',
                default: '',
                description: 'Custom date for when the activity was created',
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
    // Email specific additional fields
    {
        displayName: 'Email Options',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['email'],
            },
        },
        options: [
            {
                displayName: 'CC',
                name: 'cc',
                type: 'string',
                default: '',
                description: 'CC email addresses (comma separated)',
            },
            {
                displayName: 'BCC',
                name: 'bcc',
                type: 'string',
                default: '',
                description: 'BCC email addresses (comma separated)',
            },
            {
                displayName: 'Sender',
                name: 'sender',
                type: 'string',
                default: '',
                description: 'The sender email address',
            },
            {
                displayName: 'Template ID',
                name: 'templateId',
                type: 'string',
                default: '',
                description: 'Email template ID to use',
            },
            {
                displayName: 'Send Later',
                name: 'sendLater',
                type: 'boolean',
                default: false,
                description: 'Whether to schedule this email for later',
            },
            {
                displayName: 'Send At',
                name: 'sendAt',
                type: 'dateTime',
                default: '',
                displayOptions: {
                    show: {
                        sendLater: [true],
                    },
                },
                description: 'When to send the scheduled email',
            },
        ],
    },
    // Meeting specific additional fields
    {
        displayName: 'Meeting Options',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['meeting'],
            },
        },
        options: [
            {
                displayName: 'Location',
                name: 'location',
                type: 'string',
                default: '',
                description: 'The location of the meeting',
            },
            {
                displayName: 'Attendees',
                name: 'attendees',
                type: 'string',
                default: '',
                description: 'Comma-separated list of attendee email addresses',
            },
        ],
    },
    // SMS specific additional fields
    {
        displayName: 'SMS Options',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['create'],
                activityType: ['sms'],
            },
        },
        options: [
            {
                displayName: 'From',
                name: 'from',
                type: 'string',
                default: '',
                description: 'The phone number to send the SMS from',
            },
            {
                displayName: 'Template ID',
                name: 'templateId',
                type: 'string',
                default: '',
                description: 'SMS template ID to use',
            },
        ],
    },
    // Get All Activities
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['activity'],
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
                resource: ['activity'],
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
        displayName: 'Filter Options',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Lead ID',
                name: 'leadId',
                type: 'string',
                default: '',
                description: 'Filter activities by lead ID',
            },
            {
                displayName: 'Contact ID',
                name: 'contactId',
                type: 'string',
                default: '',
                description: 'Filter activities by contact ID',
            },
            {
                displayName: 'User ID',
                name: 'userId',
                type: 'string',
                default: '',
                description: 'Filter activities by user ID',
            },
            {
                displayName: 'Date From',
                name: 'dateFrom',
                type: 'dateTime',
                default: '',
                description: 'Filter activities created after this date',
            },
            {
                displayName: 'Date To',
                name: 'dateTo',
                type: 'dateTime',
                default: '',
                description: 'Filter activities created before this date',
            },
        ],
    },
    // Update fields
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['activity'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Note',
                name: 'note',
                type: 'string',
                default: '',
                description: 'Update the note/content of the activity',
            },
            {
                displayName: 'Duration (Call)',
                name: 'duration',
                type: 'number',
                default: 0,
                description: 'Duration in seconds (for calls)',
            },
            {
                displayName: 'Direction (Call/Email/SMS)',
                name: 'direction',
                type: 'options',
                options: [
                    {
                        name: 'Inbound',
                        value: 'inbound',
                    },
                    {
                        name: 'Outbound',
                        value: 'outbound',
                    },
                ],
                default: 'outbound',
                description: 'Direction of communication',
            },
            {
                displayName: 'Subject (Email)',
                name: 'subject',
                type: 'string',
                default: '',
                description: 'Email subject',
            },
            {
                displayName: 'Body Text (Email)',
                name: 'bodyText',
                type: 'string',
                default: '',
                description: 'Plain text body of email',
            },
            {
                displayName: 'Body HTML (Email)',
                name: 'bodyHtml',
                type: 'string',
                default: '',
                description: 'HTML body of email',
            },
            {
                displayName: 'Title (Meeting)',
                name: 'title',
                type: 'string',
                default: '',
                description: 'Meeting title',
            },
            {
                displayName: 'Starts At (Meeting)',
                name: 'startsAt',
                type: 'dateTime',
                default: '',
                description: 'Meeting start time',
            },
            {
                displayName: 'Ends At (Meeting)',
                name: 'endsAt',
                type: 'dateTime',
                default: '',
                description: 'Meeting end time',
            },
            {
                displayName: 'Location (Meeting)',
                name: 'location',
                type: 'string',
                default: '',
                description: 'Meeting location',
            },
            {
                displayName: 'Text (SMS)',
                name: 'text',
                type: 'string',
                default: '',
                description: 'SMS text content',
            },
        ],
    },
];
