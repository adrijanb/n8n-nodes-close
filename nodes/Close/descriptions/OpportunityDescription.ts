import { INodeProperties } from 'n8n-workflow';

export const opportunityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new opportunity',
				action: 'Create an opportunity',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single opportunity',
				action: 'Get an opportunity',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve many opportunities',
				action: 'Get many opportunities',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing opportunity',
				action: 'Update an opportunity',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an opportunity',
				action: 'Delete an opportunity',
			},
		],
		default: 'getAll',
	},
];

export const opportunityFields: INodeProperties[] = [
	// Create Opportunity
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the lead this opportunity belongs to',
	},
	{
		displayName: 'Status',
		name: 'statusId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOpportunityStatuses',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The status for the opportunity',
	},
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'A note about the opportunity',
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The monetary value of the opportunity',
	},
	{
		displayName: 'Value Formatted',
		name: 'valueFormatted',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Formatted display value (e.g., "$1,000")',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				description: 'The ID of the primary contact for this opportunity',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'The ID of the user responsible for this opportunity',
			},
			{
				displayName: 'Expected Value',
				name: 'expectedValue',
				type: 'number',
				default: 0,
				description: 'The expected value of the opportunity',
			},
			{
				displayName: 'Confidence',
				name: 'confidence',
				type: 'number',
				default: 0,
				description: 'Confidence percentage (0-100)',
			},
			{
				displayName: 'Date Won',
				name: 'dateWon',
				type: 'dateTime',
				default: '',
				description: 'Expected close date',
			},
		],
	},

	// Get Opportunity
	{
		displayName: 'Opportunity ID',
		name: 'opportunityId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the opportunity',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['opportunity'],
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

	// Get All Opportunities
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['opportunity'],
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
				resource: ['opportunity'],
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
				resource: ['opportunity'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Lead ID',
				name: 'leadId',
				type: 'string',
				default: '',
				description: 'Filter opportunities by lead ID',
			},
			{
				displayName: 'Status ID',
				name: 'statusId',
				type: 'string',
				default: '',
				description: 'Filter opportunities by status ID',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'Filter opportunities by user ID',
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Search query to filter opportunities',
			},
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter opportunities created after this date',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter opportunities created before this date',
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

	// Update Opportunity
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				description: 'A note about the opportunity',
			},
			{
				displayName: 'Value',
				name: 'value',
				type: 'number',
				default: 0,
				description: 'The monetary value of the opportunity',
			},
			{
				displayName: 'Value Formatted',
				name: 'valueFormatted',
				type: 'string',
				default: '',
				description: 'Formatted display value',
			},
			{
				displayName: 'Status',
				name: 'statusId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getOpportunityStatuses',
				},
				default: '',
				description: 'The status for the opportunity',
			},
			{
				displayName: 'Expected Value',
				name: 'expectedValue',
				type: 'number',
				default: 0,
				description: 'The expected value of the opportunity',
			},
			{
				displayName: 'Confidence',
				name: 'confidence',
				type: 'number',
				default: 0,
				description: 'Confidence percentage (0-100)',
			},
			{
				displayName: 'Date Won',
				name: 'dateWon',
				type: 'dateTime',
				default: '',
				description: 'Expected close date',
			},
		],
	},
];
