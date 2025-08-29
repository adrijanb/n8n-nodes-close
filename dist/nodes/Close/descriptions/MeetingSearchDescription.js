"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingSearchFields = exports.meetingSearchOperations = void 0;
exports.meetingSearchOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['meetingSearch'],
            },
        },
        options: [
            {
                name: 'Search',
                value: 'search',
                description: 'Search for meetings',
                action: 'Search meetings',
            },
        ],
        default: 'search',
    },
];
exports.meetingSearchFields = [
    // Search Meetings
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['meetingSearch'],
                operation: ['search'],
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
                resource: ['meetingSearch'],
                operation: ['search'],
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
        displayName: 'Search Options',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['meetingSearch'],
                operation: ['search'],
            },
        },
        options: [
            {
                displayName: 'Query',
                name: 'query',
                type: 'string',
                default: '',
                description: 'Search query to filter meetings',
            },
            {
                displayName: 'User ID',
                name: 'userId',
                type: 'string',
                default: '',
                description: 'Filter meetings by user ID',
            },
            {
                displayName: 'Lead ID',
                name: 'leadId',
                type: 'string',
                default: '',
                description: 'Filter meetings by lead ID',
            },
            {
                displayName: 'Contact ID',
                name: 'contactId',
                type: 'string',
                default: '',
                description: 'Filter meetings by contact ID',
            },
            {
                displayName: 'Date From',
                name: 'dateFrom',
                type: 'dateTime',
                default: '',
                description: 'Filter meetings starting from this date',
            },
            {
                displayName: 'Date To',
                name: 'dateTo',
                type: 'dateTime',
                default: '',
                description: 'Filter meetings up to this date',
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
];
