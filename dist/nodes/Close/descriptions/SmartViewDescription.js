"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartViewFields = exports.smartViewOperations = void 0;
exports.smartViewOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['smartView'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new smart view',
                action: 'Create a smart view',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Retrieve a single smart view',
                action: 'Get a smart view',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Retrieve many smart views',
                action: 'Get many smart views',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update an existing smart view',
                action: 'Update a smart view',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a smart view',
                action: 'Delete a smart view',
            },
        ],
        default: 'getAll',
    },
];
exports.smartViewFields = [
    // Create Smart View
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['smartView'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The name of the smart view',
    },
    {
        displayName: 'Query',
        name: 'query',
        type: 'json',
        required: true,
        displayOptions: {
            show: {
                resource: ['smartView'],
                operation: ['create'],
            },
        },
        default: '{}',
        description: 'The search query for the smart view in JSON format (e.g., {"status": "potential", "custom_field": "value"})',
    },
    {
        displayName: 'Smart View Type',
        name: 'smartViewType',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['smartView'],
                operation: ['create'],
            },
        },
        options: [
            {
                name: 'Lead Smart View',
                value: 'lead',
                description: 'Create a smart view for leads',
            },
            {
                name: 'Contact Smart View',
                value: 'contact',
                description: 'Create a smart view for contacts',
            },
        ],
        default: 'lead',
        description: 'The type of smart view to create',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['smartView'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Shared',
                name: 'shared',
                type: 'boolean',
                default: false,
                description: 'Whether the smart view should be shared with the entire organization',
            },
        ],
    },
    // Get Smart View
    {
        displayName: 'Smart View ID',
        name: 'smartViewId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['smartView'],
                operation: ['get', 'update', 'delete'],
            },
        },
        default: '',
        description: 'The ID of the smart view',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['smartView'],
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
    // Get All Smart Views
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['smartView'],
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
                resource: ['smartView'],
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
                resource: ['smartView'],
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Type',
                name: 'type',
                type: 'options',
                options: [
                    {
                        name: 'Lead',
                        value: 'lead',
                    },
                    {
                        name: 'Contact',
                        value: 'contact',
                    },
                ],
                default: 'lead',
                description: 'Filter smart views by type',
            },
            {
                displayName: 'Type In',
                name: 'typeIn',
                type: 'string',
                default: '',
                description: 'Comma-separated list of types to include (e.g., "lead,contact")',
                placeholder: 'lead,contact',
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
    // Update Smart View
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['smartView'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'The new name of the smart view',
            },
            {
                displayName: 'Query',
                name: 'query',
                type: 'json',
                default: '{}',
                description: 'The new search query for the smart view in JSON format (e.g., {"status": "potential", "custom_field": "value"})',
            },
            {
                displayName: 'Shared',
                name: 'shared',
                type: 'boolean',
                default: false,
                description: 'Whether the smart view should be shared with the entire organization',
            },
            {
                displayName: 'Type',
                name: 'type',
                type: 'options',
                options: [
                    {
                        name: 'Lead',
                        value: 'lead',
                    },
                    {
                        name: 'Contact',
                        value: 'contact',
                    },
                ],
                default: 'lead',
                description: 'The type of the smart view',
            },
        ],
    },
];
