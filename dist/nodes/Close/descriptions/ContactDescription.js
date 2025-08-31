"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFields = exports.contactOperations = void 0;
exports.contactOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['contact'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new contact',
                action: 'Create a contact',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Retrieve a single contact',
                action: 'Get a contact',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Retrieve many contacts',
                action: 'Get many contacts',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update an existing contact',
                action: 'Update a contact',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a contact',
                action: 'Delete a contact',
            },
        ],
        default: 'getAll',
    },
];
exports.contactFields = [
    // Create Contact
    {
        displayName: 'Lead ID',
        name: 'leadId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The ID of the lead this contact belongs to',
    },
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The name of the contact',
    },
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The job title of the contact',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Email Addresses',
                name: 'emails',
                type: 'fixedCollection',
                default: {},
                description: 'Email addresses for the contact',
                typeOptions: {
                    multipleValues: true,
                },
                options: [
                    {
                        name: 'email',
                        displayName: 'Email',
                        values: [
                            {
                                displayName: 'Type',
                                name: 'type',
                                type: 'options',
                                options: [
                                    {
                                        name: 'Office',
                                        value: 'office',
                                    },
                                    {
                                        name: 'Personal',
                                        value: 'personal',
                                    },
                                    {
                                        name: 'Other',
                                        value: 'other',
                                    },
                                ],
                                default: 'office',
                                description: 'Type of email address',
                            },
                            {
                                displayName: 'Email',
                                name: 'email',
                                type: 'string',
                                default: '',
                                description: 'The email address',
                            },
                        ],
                    },
                ],
            },
            {
                displayName: 'Phone Numbers',
                name: 'phones',
                type: 'fixedCollection',
                default: {},
                description: 'Phone numbers for the contact',
                typeOptions: {
                    multipleValues: true,
                },
                options: [
                    {
                        name: 'phone',
                        displayName: 'Phone',
                        values: [
                            {
                                displayName: 'Type',
                                name: 'type',
                                type: 'options',
                                options: [
                                    {
                                        name: 'Office',
                                        value: 'office',
                                    },
                                    {
                                        name: 'Mobile',
                                        value: 'mobile',
                                    },
                                    {
                                        name: 'Home',
                                        value: 'home',
                                    },
                                    {
                                        name: 'Other',
                                        value: 'other',
                                    },
                                ],
                                default: 'office',
                                description: 'Type of phone number',
                            },
                            {
                                displayName: 'Phone',
                                name: 'phone',
                                type: 'string',
                                default: '',
                                description: 'The phone number',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    // Get Contact
    {
        displayName: 'Contact ID',
        name: 'contactId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['get', 'update', 'delete'],
            },
        },
        default: '',
        description: 'The ID of the contact',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['contact'],
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
    // Get All Contacts
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['contact'],
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
                resource: ['contact'],
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
                resource: ['contact'],
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Lead ID',
                name: 'leadId',
                type: 'string',
                default: '',
                description: 'Filter contacts by lead ID',
            },
            {
                displayName: 'Query',
                name: 'query',
                type: 'json',
                default: '{}',
                description: 'Search query to filter contacts in JSON format (e.g., {"name": "John", "email": "john@company.com"})',
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
    // Update Contact
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'The name of the contact',
            },
            {
                displayName: 'Title',
                name: 'title',
                type: 'string',
                default: '',
                description: 'The job title of the contact',
            },
            {
                displayName: 'Email Addresses',
                name: 'emails',
                type: 'fixedCollection',
                default: {},
                description: 'Email addresses for the contact',
                typeOptions: {
                    multipleValues: true,
                },
                options: [
                    {
                        name: 'email',
                        displayName: 'Email',
                        values: [
                            {
                                displayName: 'Type',
                                name: 'type',
                                type: 'options',
                                options: [
                                    {
                                        name: 'Office',
                                        value: 'office',
                                    },
                                    {
                                        name: 'Personal',
                                        value: 'personal',
                                    },
                                    {
                                        name: 'Other',
                                        value: 'other',
                                    },
                                ],
                                default: 'office',
                                description: 'Type of email address',
                            },
                            {
                                displayName: 'Email',
                                name: 'email',
                                type: 'string',
                                default: '',
                                description: 'The email address',
                            },
                        ],
                    },
                ],
            },
            {
                displayName: 'Phone Numbers',
                name: 'phones',
                type: 'fixedCollection',
                default: {},
                description: 'Phone numbers for the contact',
                typeOptions: {
                    multipleValues: true,
                },
                options: [
                    {
                        name: 'phone',
                        displayName: 'Phone',
                        values: [
                            {
                                displayName: 'Type',
                                name: 'type',
                                type: 'options',
                                options: [
                                    {
                                        name: 'Office',
                                        value: 'office',
                                    },
                                    {
                                        name: 'Mobile',
                                        value: 'mobile',
                                    },
                                    {
                                        name: 'Home',
                                        value: 'home',
                                    },
                                    {
                                        name: 'Other',
                                        value: 'other',
                                    },
                                ],
                                default: 'office',
                                description: 'Type of phone number',
                            },
                            {
                                displayName: 'Phone',
                                name: 'phone',
                                type: 'string',
                                default: '',
                                description: 'The phone number',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
