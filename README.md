# n8n-nodes-close

![Banner Image](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

A comprehensive n8n Community Node package for integration with Close.com CRM.

## Installation

You have three options to install this node package.

### Community Nodes (Recommended)

1. Open n8n and go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-close` and click **Install**
4. Accept the risks of installing community nodes
5. Select **Install** and wait for the node to be installed

### npm Installation

For self-hosted instances:

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-close
```

### Manual Installation

1. Download the latest release
2. Extract the files to `~/.n8n/nodes/n8n-nodes-close/`
3. Restart n8n

## Credentials

You need to configure Close.com API credentials:

1. Go to [Close.com](https://app.close.com) and log in
2. Navigate to **Settings > API Keys**
3. Create a new API key
4. Go to **Credentials > Add Credential** in n8n
5. Search for **Close.com API**
6. Enter your API key
7. Test the connection and save

## Supported Operations

### 📧 Lead Management

- **Create**: Create new leads
- **Get**: Retrieve individual leads
- **Get All**: Get all leads with filter options
- **Update**: Update lead information
- **Delete**: Delete leads
- **Merge**: Merge two leads together

### 👥 Contact Management

- **Create**: Add contacts to leads
- **Get**: Retrieve contact details
- **Get All**: Get all contacts with filters
- **Update**: Edit contact information
- **Delete**: Remove contacts

### 📋 Activity Management

- **Create**: Create activities (Call, Email, Meeting, Note, SMS)
- **Get**: Retrieve activity details
- **Get All**: Get all activities with filters
- **Update**: Update activity information
- **Delete**: Delete activities

### 💰 Opportunity Management

- **Create**: Create new opportunities
- **Get**: Retrieve opportunity details
- **Get All**: Get all opportunities with filters
- **Update**: Update opportunity status and values
- **Delete**: Delete opportunities

### ✅ Task Management

- **Create**: Create and assign tasks
- **Get**: Retrieve task details
- **Get All**: Get all tasks with filters
- **Update**: Update task status and details
- **Delete**: Delete tasks

### 👤 User Management

- **Get**: Retrieve user details
- **Get All**: List all team members
- **Get Me**: Get current user information

### 📄 Template Management

- **Create**: Create email/SMS templates
- **Get**: Retrieve template details
- **Get All**: List all templates
- **Update**: Edit templates
- **Delete**: Delete templates

### 🔧 Custom Field Management

- **Create**: Create custom fields
- **Get**: Retrieve custom field details
- **Get All**: List all custom fields
- **Update**: Change custom field configuration
- **Delete**: Remove custom fields

### 🔍 Meeting Search

- **Search**: Search meetings by various criteria

### 🎣 Webhooks & Triggers

- **Close Webhook Trigger**: Responds to Close.com events
- Supports all Close.com webhook events
- Automatic webhook management

## Example Workflows

The package includes pre-built workflow examples:

### Basic Lead Management

```json
// Import: examples/close-basic-workflow.json
```

- Retrieve new leads
- Update lead information
- Add activities to leads

### Complete CRM Integration

```json
// Import: examples/close-complete-workflow.json
```

- Complete lead-to-customer process
- Opportunity management
- Task assignment
- Template usage

### Webhook Integration

```json
// Import: examples/close-webhook-example.json
```

- Real-time event processing
- Automated lead updates
- Cross-system synchronization

## Configuration Examples

### Basic Lead Creation

```json
{
	"resource": "lead",
	"operation": "create",
	"name": "John Doe",
	"description": "Potential customer from website",
	"additionalFields": {
		"url": "https://example.com",
		"addresses": [
			{
				"address_1": "123 Main St",
				"city": "New York",
				"state": "NY",
				"zipcode": "10001",
				"country": "US"
			}
		]
	}
}
```

### Activity Creation with Template

```json
{
	"resource": "activity",
	"operation": "create",
	"activityType": "email",
	"leadId": "lead_123456",
	"additionalFields": {
		"templateId": "tmpl_123456",
		"subject": "Welcome to our service",
		"scheduledTime": "2024-01-15T10:00:00Z"
	}
}
```

### Advanced Lead Filtering

```json
{
	"resource": "lead",
	"operation": "getAll",
	"returnAll": false,
	"limit": 50,
	"additionalFields": {
		"query": "status:new AND created:\"2024-01-01\" AND email:*@gmail.com",
		"fields": "id,name,status_label,date_created"
	}
}
```

## Rate Limiting

Close.com API has rate limits:

- 240 requests per minute for read operations
- 120 requests per minute for write operations

The node implements automatic rate limiting and retry logic.

## Error Handling

The node provides comprehensive error handling:

- Automatic retry on temporary failures
- Detailed error messages
- Graceful handling of rate limits
- Input parameter validation

## Debugging

For debug information:

1. Set n8n log level to `debug`
2. Check n8n logs for detailed API calls
3. Use the "Test" function in credentials

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## Testing

```bash
npm run test
```

## Building

```bash
npm run build
```

## Resources

- [Close.com API Documentation](https://developer.close.com/)
- [n8n Node Development](https://docs.n8n.io/integrations/community-nodes/)
- [Close.com Webhooks Guide](https://developer.close.com/resources/webhook-subscriptions/)

## License

[MIT](LICENSE)

## Support

- 📚 [Documentation](https://docs.n8n.io/)
- 💬 [Community Forum](https://community.n8n.io/)
- 🐛 [Bug Reports](https://github.com/n8n-io/n8n/issues)

---

**Made with ❤️ for the n8n community**
