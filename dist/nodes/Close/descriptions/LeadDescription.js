"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadFields = exports.leadOperations = void 0;
exports.leadOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['lead'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new lead',
                action: 'Create a lead',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Retrieve a single lead',
                action: 'Get a lead',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Retrieve many leads',
                action: 'Get many leads',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update an existing lead',
                action: 'Update a lead',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a lead',
                action: 'Delete a lead',
            },
            {
                name: 'Merge',
                value: 'merge',
                description: 'Merge two leads together',
                action: 'Merge leads',
            },
        ],
        default: 'getAll',
    },
];
exports.leadFields = [
    // Create Lead
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The name of the lead/company',
    },
    {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'A description of the lead',
    },
    {
        displayName: 'Status ID',
        name: 'statusId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The status ID for the lead',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'URL',
                name: 'url',
                type: 'string',
                default: '',
                description: 'The website URL of the lead',
            },
            {
                displayName: 'Custom Fields',
                name: 'customFields',
                type: 'fixedCollection',
                default: {},
                description: 'Custom fields to set on the lead',
                typeOptions: {
                    multipleValues: true,
                },
                options: [
                    {
                        name: 'customField',
                        displayName: 'Custom Field',
                        values: [
                            {
                                displayName: 'Field ID',
                                name: 'fieldId',
                                type: 'string',
                                default: '',
                                description: 'The custom field ID (e.g., custom.cf_abc123)',
                            },
                            {
                                displayName: 'Value',
                                name: 'value',
                                type: 'string',
                                default: '',
                                description: 'The value for the custom field',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    // Get Lead
    {
        displayName: 'Lead ID',
        name: 'leadId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['get', 'update', 'delete'],
            },
        },
        default: '',
        description: 'The ID of the lead to retrieve',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['lead'],
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
    // Get All Leads
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['lead'],
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
                resource: ['lead'],
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
                resource: ['lead'],
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Query',
                name: 'query',
                type: 'string',
                default: '',
                description: 'Search query to filter leads (e.g., "status:new", "name:acme")',
            },
            {
                displayName: 'Fields',
                name: 'fields',
                type: 'string',
                default: '',
                description: 'Comma-separated list of fields to include in response',
            },
            {
                displayName: 'Order By',
                name: 'orderBy',
                type: 'string',
                default: '',
                description: 'Field to order results by (e.g., "name", "-created")',
            },
        ],
    },
    // Update Lead
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'The name of the lead/company',
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                default: '',
                description: 'A description of the lead',
            },
            {
                displayName: 'Status ID',
                name: 'statusId',
                type: 'string',
                default: '',
                description: 'The status ID for the lead',
            },
            {
                displayName: 'URL',
                name: 'url',
                type: 'string',
                default: '',
                description: 'The website URL of the lead',
            },
            {
                displayName: 'Custom Fields',
                name: 'customFields',
                type: 'fixedCollection',
                default: {},
                description: 'Custom fields to update on the lead',
                typeOptions: {
                    multipleValues: true,
                },
                options: [
                    {
                        name: 'customField',
                        displayName: 'Custom Field',
                        values: [
                            {
                                displayName: 'Field ID',
                                name: 'fieldId',
                                type: 'string',
                                default: '',
                                description: 'The custom field ID (e.g., custom.cf_abc123)',
                            },
                            {
                                displayName: 'Value',
                                name: 'value',
                                type: 'string',
                                default: '',
                                description: 'The value for the custom field',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    // Merge Leads
    {
        displayName: 'Source Lead ID',
        name: 'sourceId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['merge'],
            },
        },
        default: '',
        description: 'The ID of the lead to merge (source)',
    },
    {
        displayName: 'Destination Lead ID',
        name: 'destinationId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['merge'],
            },
        },
        default: '',
        description: 'The ID of the lead to merge into (destination)',
    },
];
