import { INodeProperties } from 'n8n-workflow';

export const leadOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lead'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new lead',
				action: 'Create a lead',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single lead',
				action: 'Get a lead',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve many leads',
				action: 'Get many leads',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing lead',
				action: 'Update a lead',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a lead',
				action: 'Delete a lead',
			},
			{
				name: 'Merge',
				value: 'merge',
				description: 'Merge two leads together',
				action: 'Merge leads',
			},
		],
		default: 'getAll',
	},
];

export const leadFields: INodeProperties[] = [
	// Create Lead
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the lead/company',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'A description of the lead',
	},
	{
		displayName: 'Status',
		name: 'statusId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getLeadStatuses',
		},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The status for the lead',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'The website URL of the lead',
			},
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'fixedCollection',
				default: {},
				description: 'Custom fields to set on the lead',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'customField',
						displayName: 'Custom Field',
						values: [
							{
								displayName: 'Field',
								name: 'fieldId',
								type: 'options',
								typeOptions: {
									loadOptionsMethod: 'getLeadCustomFields',
								},
								default: '',
								description: 'The custom field to set',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'The value for the custom field',
							},
						],
					},
				],
			},
			{
				displayName: 'User Custom Fields',
				name: 'userCustomFields',
				type: 'fixedCollection',
				default: {},
				description: 'User-type custom fields to set on the lead',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'userCustomField',
						displayName: 'User Custom Field',
						values: [
							{
								displayName: 'Field',
								name: 'fieldId',
								type: 'options',
								typeOptions: {
									loadOptionsMethod: 'getLeadUserCustomFields',
								},
								default: '',
								description: 'The user custom field to set',
							},
							{
								displayName: 'User',
								name: 'value',
								type: 'options',
								typeOptions: {
									loadOptionsMethod: 'getUsers',
								},
								default: '',
								description: 'The user to assign to this field',
							},
						],
					},
				],
			},
		],
	},

	// Addresses for Lead Creation
	{
		displayName: 'Addresses',
		name: 'addresses',
		type: 'fixedCollection',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		description: 'Addresses for the lead',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'address',
				displayName: 'Address',
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
								name: 'Mailing',
								value: 'mailing',
							},
							{
								name: 'Other',
								value: 'other',
							},
						],
						default: 'office',
						description: 'Type of address',
					},
					{
						displayName: 'Address Line 1',
						name: 'address_1',
						type: 'string',
						default: '',
						description: 'First line of the address',
					},
					{
						displayName: 'Address Line 2',
						name: 'address_2',
						type: 'string',
						default: '',
						description: 'Second line of the address (optional)',
					},
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
						description: 'City',
					},
					{
						displayName: 'State',
						name: 'state',
						type: 'string',
						default: '',
						description: 'State or province',
					},
					{
						displayName: 'Postal Code',
						name: 'zipcode',
						type: 'string',
						default: '',
						description: 'Postal or ZIP code',
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'Country',
					},
				],
			},
		],
	},

	// Contacts for Lead Creation
	{
		displayName: 'Contacts',
		name: 'contacts',
		type: 'fixedCollection',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		description: 'Contacts to create with the lead',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'contact',
				displayName: 'Contact',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Full name of the contact',
					},
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
						description: 'Job title of the contact',
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
		],
	},

	// Get Lead
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the lead to retrieve',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
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

	// Get All Leads
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['lead'],
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
				resource: ['lead'],
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
		displayName: 'Query',
		name: 'query',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['getAll'],
			},
		},
		default: '{}',
		description:
			'Search query to filter leads in JSON format (e.g., {"status": "new", "name": "acme"})',
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'Name (A-Z)',
				value: 'name',
			},
			{
				name: 'Name (Z-A)',
				value: '-name',
			},
			{
				name: 'Created Date (Newest)',
				value: '-date_created',
			},
			{
				name: 'Created Date (Oldest)',
				value: 'date_created',
			},
			{
				name: 'Updated Date (Newest)',
				value: '-date_updated',
			},
			{
				name: 'Updated Date (Oldest)',
				value: 'date_updated',
			},
			{
				name: 'Status Label (A-Z)',
				value: 'status_label',
			},
			{
				name: 'Status Label (Z-A)',
				value: '-status_label',
			},
		],
		default: '-date_created',
		description: 'Field to order results by',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
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

	// Update Lead
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the lead/company',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description of the lead',
			},
			{
				displayName: 'Status',
				name: 'statusId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getLeadStatuses',
				},
				default: '',
				description: 'The status for the lead',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'The website URL of the lead',
			},
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'fixedCollection',
				default: {},
				description: 'Custom fields to update on the lead',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'customField',
						displayName: 'Custom Field',
						values: [
							{
								displayName: 'Field',
								name: 'fieldId',
								type: 'options',
								typeOptions: {
									loadOptionsMethod: 'getLeadCustomFields',
								},
								default: '',
								description: 'The custom field to update',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'The value for the custom field',
							},
						],
					},
				],
			},
			{
				displayName: 'User Custom Fields',
				name: 'userCustomFields',
				type: 'fixedCollection',
				default: {},
				description: 'User-type custom fields to update on the lead',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'userCustomField',
						displayName: 'User Custom Field',
						values: [
							{
								displayName: 'Field',
								name: 'fieldId',
								type: 'options',
								typeOptions: {
									loadOptionsMethod: 'getLeadUserCustomFields',
								},
								default: '',
								description: 'The user custom field to update',
							},
							{
								displayName: 'User',
								name: 'value',
								type: 'options',
								typeOptions: {
									loadOptionsMethod: 'getUsers',
								},
								default: '',
								description: 'The user to assign to this field',
							},
						],
					},
				],
			},
		],
	},

	// Merge Leads
	{
		displayName: 'Source Lead ID',
		name: 'sourceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['merge'],
			},
		},
		default: '',
		description: 'The ID of the lead to merge (source)',
	},
	{
		displayName: 'Destination Lead ID',
		name: 'destinationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['merge'],
			},
		},
		default: '',
		description: 'The ID of the lead to merge into (destination)',
	},
];
