"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskFields = exports.taskOperations = void 0;
exports.taskOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['task'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new task',
                action: 'Create a task',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Retrieve a single task',
                action: 'Get a task',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Retrieve many tasks',
                action: 'Get many tasks',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update an existing task',
                action: 'Update a task',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a task',
                action: 'Delete a task',
            },
            {
                name: 'Complete',
                value: 'complete',
                description: 'Mark a task as complete',
                action: 'Complete a task',
            },
        ],
        default: 'getAll',
    },
];
exports.taskFields = [
    // Create Task
    {
        displayName: 'Lead ID',
        name: 'leadId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The ID of the lead this task belongs to',
    },
    {
        displayName: 'Text',
        name: 'text',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The description/text of the task',
    },
    {
        displayName: 'Assigned To',
        name: 'assignedTo',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The user ID of who the task is assigned to',
    },
    {
        displayName: 'Due Date',
        name: 'dueDate',
        type: 'dateTime',
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'When the task is due',
    },
    {
        displayName: 'Is Complete',
        name: 'isComplete',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        default: false,
        description: 'Whether the task is marked as complete',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Contact ID',
                name: 'contactId',
                type: 'string',
                default: '',
                description: 'The ID of the contact associated with this task',
            },
            {
                displayName: 'Task Type',
                name: 'taskType',
                type: 'string',
                default: '',
                description: 'The type of task',
            },
        ],
    },
    // Get Task / Complete Task
    {
        displayName: 'Task ID',
        name: 'taskId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['get', 'update', 'delete', 'complete'],
            },
        },
        default: '',
        description: 'The ID of the task',
    },
    // Get Task additional fields
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['task'],
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
    // Get All Tasks
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['task'],
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
                resource: ['task'],
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
                resource: ['task'],
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Lead ID',
                name: 'leadId',
                type: 'string',
                default: '',
                description: 'Filter tasks by lead ID',
            },
            {
                displayName: 'Assigned To',
                name: 'assignedTo',
                type: 'string',
                default: '',
                description: 'Filter tasks by assigned user ID',
            },
            {
                displayName: 'Is Complete',
                name: 'isComplete',
                type: 'boolean',
                default: false,
                description: 'Filter by completion status',
            },
            {
                displayName: 'Task Type',
                name: 'taskType',
                type: 'string',
                default: '',
                description: 'Filter tasks by type',
            },
            {
                displayName: 'Due Date From',
                name: 'dueDateFrom',
                type: 'dateTime',
                default: '',
                description: 'Filter tasks due after this date',
            },
            {
                displayName: 'Due Date To',
                name: 'dueDateTo',
                type: 'dateTime',
                default: '',
                description: 'Filter tasks due before this date',
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
    // Update Task
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Text',
                name: 'text',
                type: 'string',
                default: '',
                description: 'The description/text of the task',
            },
            {
                displayName: 'Assigned To',
                name: 'assignedTo',
                type: 'string',
                default: '',
                description: 'The user ID of who the task is assigned to',
            },
            {
                displayName: 'Due Date',
                name: 'dueDate',
                type: 'dateTime',
                default: '',
                description: 'When the task is due',
            },
            {
                displayName: 'Is Complete',
                name: 'isComplete',
                type: 'boolean',
                default: false,
                description: 'Whether the task is marked as complete',
            },
            {
                displayName: 'Task Type',
                name: 'taskType',
                type: 'string',
                default: '',
                description: 'The type of task',
            },
        ],
    },
];
