import { INodeProperties } from 'n8n-workflow';

export const templateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['template'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new template',
				action: 'Create a template',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single template',
				action: 'Get a template',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve many templates',
				action: 'Get many templates',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing template',
				action: 'Update a template',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a template',
				action: 'Delete a template',
			},
		],
		default: 'getAll',
	},
];

export const templateFields: INodeProperties[] = [
	// Template Type Selection
	{
		displayName: 'Template Type',
		name: 'templateType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['template'],
			},
		},
		options: [
			{
				name: 'Email',
				value: 'email',
				description: 'Email template',
			},
			{
				name: 'SMS',
				value: 'sms',
				description: 'SMS template',
			},
		],
		default: 'email',
	},

	// Create Template - Common fields
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the template',
	},

	// Email Template specific fields
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['create'],
				templateType: ['email'],
			},
		},
		default: '',
		description: 'The subject line of the email template',
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
				resource: ['template'],
				operation: ['create'],
				templateType: ['email'],
			},
		},
		default: '',
		description: 'Plain text body of the email template',
	},
	{
		displayName: 'Body HTML',
		name: 'bodyHtml',
		type: 'string',
		typeOptions: {
			rows: 6,
		},
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['create'],
				templateType: ['email'],
			},
		},
		default: '',
		description: 'HTML body of the email template',
	},

	// SMS Template specific fields
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 3,
		},
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['create'],
				templateType: ['sms'],
			},
		},
		default: '',
		description: 'The text content of the SMS template',
	},

	// Additional fields for create
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Is Shared',
				name: 'isShared',
				type: 'boolean',
				default: false,
				description: 'Whether this template is shared with the team',
			},
		],
	},

	// Get Template
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the template',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['template'],
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

	// Get All Templates
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['template'],
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
				resource: ['template'],
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
				resource: ['template'],
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

	// Update Template
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the template',
			},
			{
				displayName: 'Subject (Email)',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'Email template subject',
			},
			{
				displayName: 'Body Text (Email)',
				name: 'bodyText',
				type: 'string',
				default: '',
				description: 'Plain text body of the email template',
			},
			{
				displayName: 'Body HTML (Email)',
				name: 'bodyHtml',
				type: 'string',
				default: '',
				description: 'HTML body of the email template',
			},
			{
				displayName: 'Text (SMS)',
				name: 'text',
				type: 'string',
				default: '',
				description: 'The text content of the SMS template',
			},
			{
				displayName: 'Is Shared',
				name: 'isShared',
				type: 'boolean',
				default: false,
				description: 'Whether this template is shared with the team',
			},
		],
	},
];