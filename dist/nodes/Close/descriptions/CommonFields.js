"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsOption = exports.standardPaginationFields = exports.resourceOptions = void 0;
exports.resourceOptions = {
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
};
exports.standardPaginationFields = [
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        default: false,
        description: 'Whether to return all results or only up to a given limit',
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
            show: {
                returnAll: [false],
            },
        },
        typeOptions: {
            minValue: 1,
        },
        default: 50,
        description: 'Max number of results to return',
    },
];
exports.fieldsOption = {
    displayName: 'Fields',
    name: 'fields',
    type: 'string',
    default: '',
    description: 'Comma-separated list of fields to include in response',
};
