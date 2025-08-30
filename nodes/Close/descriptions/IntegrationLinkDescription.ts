import { INodeProperties } from 'n8n-workflow';

export const integrationLinkOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['integrationLink'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new integration link',
				action: 'Create an integration link',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single integration link',
				action: 'Get an integration link',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve many integration links',
				action: 'Get many integration links',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing integration link',
				action: 'Update an integration link',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an integration link',
				action: 'Delete an integration link',
			},
		],
		default: 'getAll',
	},
];

export const integrationLinkFields: INodeProperties[] = [
	// Create Integration Link
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['integrationLink'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The display name for the integration link',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['integrationLink'],
				operation: ['create'],
			},
		},
		default: '',
		description:
			'The URL template for the integration link (can include variables like {{lead.id}})',
		placeholder: 'https://example.com/lead/{{lead.id}}',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['integrationLink'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Lead',
				value: 'lead',
				description: 'Link will be available on lead pages',
			},
			{
				name: 'Contact',
				value: 'contact',
				description: 'Link will be available on contact pages',
			},
			{
				name: 'Opportunity',
				value: 'opportunity',
				description: 'Link will be available on opportunity pages',
			},
		],
		default: 'lead',
		description: 'The type of resource this integration link applies to',
	},

	// Get Integration Link
	{
		displayName: 'Link ID',
		name: 'linkId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['integrationLink'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the integration link',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['integrationLink'],
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

	// Get All Integration Links
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['integrationLink'],
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
				resource: ['integrationLink'],
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
				resource: ['integrationLink'],
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
					{
						name: 'Opportunity',
						value: 'opportunity',
					},
				],
				default: '',
				description: 'Filter links by type',
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

	// Update Integration Link
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['integrationLink'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The new display name for the integration link',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'The new URL template for the integration link',
				placeholder: 'https://example.com/lead/{{lead.id}}',
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
					{
						name: 'Opportunity',
						value: 'opportunity',
					},
				],
				default: 'lead',
				description: 'The new type of resource this integration link applies to',
			},
		],
	},
];
