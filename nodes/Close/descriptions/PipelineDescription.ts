import { INodeProperties } from 'n8n-workflow';

export const pipelineOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['pipeline'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new pipeline',
				action: 'Create a pipeline',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single pipeline',
				action: 'Get a pipeline',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve many pipelines',
				action: 'Get many pipelines',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing pipeline',
				action: 'Update a pipeline',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a pipeline',
				action: 'Delete a pipeline',
			},
		],
		default: 'getAll',
	},
];

export const pipelineFields: INodeProperties[] = [
	// Create Pipeline
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['pipeline'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the pipeline',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['pipeline'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Statuses',
				name: 'statuses',
				type: 'json',
				default: '[]',
				description:
					'Array of opportunity status objects to include in the pipeline. Format: [{"id": "status_id"}] or [{"label": "New Status", "status_type": "active"}]',
				placeholder: '[{"id": "stat_abc123"}]',
			},
		],
	},

	// Get Pipeline
	{
		displayName: 'Pipeline ID',
		name: 'pipelineId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['pipeline'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the pipeline',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['pipeline'],
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

	// Get All Pipelines
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['pipeline'],
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
				resource: ['pipeline'],
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
				resource: ['pipeline'],
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

	// Update Pipeline
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['pipeline'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The new name of the pipeline',
			},
			{
				displayName: 'Statuses',
				name: 'statuses',
				type: 'json',
				default: '[]',
				description:
					'Array of opportunity status objects. Use this to reorder statuses within the pipeline or move statuses from other pipelines. Format: [{"id": "status_id"}]',
				placeholder: '[{"id": "stat_abc123"}, {"id": "stat_def456"}]',
			},
		],
	},
];
