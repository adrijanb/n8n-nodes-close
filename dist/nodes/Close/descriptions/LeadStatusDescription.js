"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadStatusFields = exports.leadStatusOperations = void 0;
exports.leadStatusOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['leadStatus'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new lead status',
                action: 'Create a lead status',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Retrieve a single lead status',
                action: 'Get a lead status',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Retrieve many lead statuses',
                action: 'Get many lead statuses',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update an existing lead status',
                action: 'Update a lead status',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a lead status',
                action: 'Delete a lead status',
            },
        ],
        default: 'getAll',
    },
];
exports.leadStatusFields = [
    // Create Lead Status
    {
        displayName: 'Label',
        name: 'label',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['leadStatus'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The name/label of the lead status',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['leadStatus'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Color',
                name: 'color',
                type: 'color',
                default: '#000000',
                description: 'The color for the lead status (hex format)',
            },
        ],
    },
    // Get Lead Status
    {
        displayName: 'Status ID',
        name: 'statusId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['leadStatus'],
                operation: ['get', 'update', 'delete'],
            },
        },
        default: '',
        description: 'The ID of the lead status',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['leadStatus'],
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
    // Get All Lead Statuses
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['leadStatus'],
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
                resource: ['leadStatus'],
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
                resource: ['leadStatus'],
                operation: ['getAll'],
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
    // Update Lead Status
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['leadStatus'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Label',
                name: 'label',
                type: 'string',
                default: '',
                description: 'The new name/label of the lead status',
            },
            {
                displayName: 'Color',
                name: 'color',
                type: 'color',
                default: '#000000',
                description: 'The new color for the lead status (hex format)',
            },
        ],
    },
];
