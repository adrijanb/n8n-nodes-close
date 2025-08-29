import { INodeProperties } from 'n8n-workflow';

export const customFieldOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customField'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new custom field',
				action: 'Create a custom field',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single custom field',
				action: 'Get a custom field',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve many custom fields',
				action: 'Get many custom fields',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing custom field',
				action: 'Update a custom field',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a custom field',
				action: 'Delete a custom field',
			},
			{
				name: 'Get Schema',
				value: 'getSchema',
				description: 'Get custom field schema for an object type',
				action: 'Get custom field schema',
			},
		],
		default: 'getAll',
	},
];

export const customFieldFields: INodeProperties[] = [
	// Object Type Selection (for create and getSchema)
	{
		displayName: 'Object Type',
		name: 'objectType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create', 'getSchema'],
			},
		},
		options: [
			{
				name: 'Lead',
				value: 'lead',
			},
			{
				name: 'Contact',
				value: 'contact',
			},
			{
				name: 'Opportunity',
				value: 'opportunity',
			},
			{
				name: 'Activity',
				value: 'activity',
			},
			{
				name: 'Custom Object',
				value: 'custom_object',
			},
		],
		default: 'lead',
		description: 'The type of object this custom field applies to',
	},

	// Create Custom Field
	{
		displayName: 'Field Type',
		name: 'fieldType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Text',
				value: 'text',
			},
			{
				name: 'Number',
				value: 'number',
			},
			{
				name: 'Date',
				value: 'date',
			},
			{
				name: 'DateTime',
				value: 'datetime',
			},
			{
				name: 'Choice',
				value: 'choice',
			},
			{
				name: 'Boolean',
				value: 'boolean',
			},
		],
		default: 'text',
		description: 'The type of the custom field',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the custom field',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the custom field',
			},
			{
				displayName: 'Is Required',
				name: 'isRequired',
				type: 'boolean',
				default: false,
				description: 'Whether this field is required',
			},
			{
				displayName: 'Accepts Multiple Values',
				name: 'acceptsMultipleValues',
				type: 'boolean',
				default: false,
				description: 'Whether this field accepts multiple values',
			},
			{
				displayName: 'Choices',
				name: 'choices',
				type: 'string',
				default: '',
				description: 'Comma-separated list of choices (for choice fields only)',
			},
		],
	},

	// Get Custom Field
	{
		displayName: 'Custom Field ID',
		name: 'customFieldId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the custom field',
	},

	// Get All Custom Fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customField'],
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
				resource: ['customField'],
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
				resource: ['customField'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Object Type',
				name: 'objectType',
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
					{
						name: 'Opportunity',
						value: 'opportunity',
					},
					{
						name: 'Activity',
						value: 'activity',
					},
				],
				default: '',
				description: 'Filter by object type',
			},
			{
				displayName: 'Field Type',
				name: 'fieldType',
				type: 'options',
				options: [
					{
						name: 'Text',
						value: 'text',
					},
					{
						name: 'Number',
						value: 'number',
					},
					{
						name: 'Date',
						value: 'date',
					},
					{
						name: 'DateTime',
						value: 'datetime',
					},
					{
						name: 'Choice',
						value: 'choice',
					},
					{
						name: 'Boolean',
						value: 'boolean',
					},
				],
				default: '',
				description: 'Filter by field type',
			},
		],
	},

	// Update Custom Field
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the custom field',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the custom field',
			},
			{
				displayName: 'Is Required',
				name: 'isRequired',
				type: 'boolean',
				default: false,
				description: 'Whether this field is required',
			},
			{
				displayName: 'Accepts Multiple Values',
				name: 'acceptsMultipleValues',
				type: 'boolean',
				default: false,
				description: 'Whether this field accepts multiple values',
			},
			{
				displayName: 'Choices',
				name: 'choices',
				type: 'string',
				default: '',
				description: 'Comma-separated list of choices (for choice fields only)',
			},
		],
	},
];