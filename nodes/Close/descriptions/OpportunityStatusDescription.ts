import { INodeProperties } from 'n8n-workflow';

export const opportunityStatusOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['opportunityStatus'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new opportunity status',
				action: 'Create an opportunity status',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single opportunity status',
				action: 'Get an opportunity status',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve many opportunity statuses',
				action: 'Get many opportunity statuses',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing opportunity status',
				action: 'Update an opportunity status',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an opportunity status',
				action: 'Delete an opportunity status',
			},
		],
		default: 'getAll',
	},
];

export const opportunityStatusFields: INodeProperties[] = [
	// Create Opportunity Status
	{
		displayName: 'Label',
		name: 'label',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunityStatus'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name/label of the opportunity status',
	},
	{
		displayName: 'Status Type',
		name: 'statusType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunityStatus'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Active',
				value: 'active',
				description: 'Active opportunity status',
			},
			{
				name: 'Won',
				value: 'won',
				description: 'Won opportunity status',
			},
			{
				name: 'Lost',
				value: 'lost',
				description: 'Lost opportunity status',
			},
		],
		default: 'active',
		description: 'The type of the opportunity status',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['opportunityStatus'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Pipeline ID',
				name: 'pipelineId',
				type: 'string',
				default: '',
				description: 'The ID of the pipeline this status belongs to',
			},
		],
	},

	// Get Opportunity Status
	{
		displayName: 'Status ID',
		name: 'statusId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunityStatus'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the opportunity status',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['opportunityStatus'],
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

	// Get All Opportunity Statuses
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['opportunityStatus'],
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
				resource: ['opportunityStatus'],
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
				resource: ['opportunityStatus'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Pipeline ID',
				name: 'pipelineId',
				type: 'string',
				default: '',
				description: 'Filter statuses by pipeline ID',
			},
			{
				displayName: 'Status Type',
				name: 'statusType',
				type: 'options',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Won',
						value: 'won',
					},
					{
						name: 'Lost',
						value: 'lost',
					},
				],
				default: '',
				description: 'Filter statuses by type',
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

	// Update Opportunity Status
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['opportunityStatus'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Label',
				name: 'label',
				type: 'string',
				default: '',
				description: 'The new name/label of the opportunity status',
			},
		],
	},
];
