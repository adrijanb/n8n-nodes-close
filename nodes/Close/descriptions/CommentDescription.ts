import { INodeProperties } from 'n8n-workflow';

export const commentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['comment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new comment',
				action: 'Create a comment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single comment',
				action: 'Get a comment',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve many comments',
				action: 'Get many comments',
			},
			{
				name: 'Get Thread',
				value: 'getThread',
				description: 'Retrieve a comment thread',
				action: 'Get a comment thread',
			},
			{
				name: 'Get Many Threads',
				value: 'getAllThreads',
				description: 'Retrieve many comment threads',
				action: 'Get many comment threads',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing comment',
				action: 'Update a comment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a comment',
				action: 'Delete a comment',
			},
		],
		default: 'getAll',
	},
];

export const commentFields: INodeProperties[] = [
	// Create Comment
	{
		displayName: 'Object ID',
		name: 'objectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the object to comment on (lead, contact, opportunity, etc.)',
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The comment body (supports rich text formatting)',
	},

	// Get Comment
	{
		displayName: 'Comment ID',
		name: 'commentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the comment',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['comment'],
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

	// Get All Comments
	{
		displayName: 'Filter By',
		name: 'filterBy',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'Object ID',
				value: 'objectId',
				description: 'Filter comments by the object they are commenting on',
			},
			{
				name: 'Thread ID',
				value: 'threadId',
				description: 'Filter comments by thread ID',
			},
		],
		default: 'objectId',
		description: 'How to filter the comments (exactly one filter must be provided)',
	},
	{
		displayName: 'Object ID',
		name: 'objectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['getAll'],
				filterBy: ['objectId'],
			},
		},
		default: '',
		description: 'The ID of the object to get comments for',
	},
	{
		displayName: 'Thread ID',
		name: 'threadId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['getAll', 'getThread'],
				filterBy: ['threadId'],
			},
		},
		default: '',
		description: 'The ID of the comment thread',
	},
	{
		displayName: 'Thread ID',
		name: 'threadId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['getThread'],
			},
		},
		default: '',
		description: 'The ID of the comment thread',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['getAll', 'getAllThreads'],
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
				resource: ['comment'],
				operation: ['getAll', 'getAllThreads'],
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
				resource: ['comment'],
				operation: ['getAll', 'getThread', 'getAllThreads'],
			},
		},
		options: [
			{
				displayName: 'Object IDs',
				name: 'objectIds',
				type: 'string',
				default: '',
				description: 'Comma-separated list of object IDs to filter threads by (for getAllThreads)',
				displayOptions: {
					show: {
						'/operation': ['getAllThreads'],
					},
				},
			},
			{
				displayName: 'Thread IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of thread IDs to filter by (for getAllThreads)',
				displayOptions: {
					show: {
						'/operation': ['getAllThreads'],
					},
				},
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

	// Update Comment
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'The new comment body (supports rich text formatting)',
			},
		],
	},
];
