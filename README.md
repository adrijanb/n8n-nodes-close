# @adrijanx/n8n-nodes-close

![Banner Image](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

A comprehensive n8n Community Node package for integration with Close.com CRM.

## Installation

You have three options to install this node package.

### Community Nodes (Recommended)

1. Open n8n and go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `@adrijanx/n8n-nodes-close` and click **Install**
4. Accept the risks of installing community nodes
5. Select **Install** and wait for the node to be installed

### npm Installation

For self-hosted instances:

```bash
cd ~/.n8n/nodes
npm install @adrijanx/n8n-nodes-close
```

### Manual Installation

1. Download the latest release
2. Extract the files to `~/.n8n/nodes/@adrijanx/n8n-nodes-close/`
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

- **Create**: Create new leads with contacts and custom fields
- **Get**: Retrieve individual leads with full details
- **Get All**: Get all leads with advanced filtering options
- **Update**: Update lead information and status
- **Delete**: Delete leads and associated data
- **Merge**: Merge two leads together

### 🏷️ Lead Status Management

- **Create**: Create new lead statuses with custom colors
- **Get**: Retrieve lead status details
- **Get All**: List all lead statuses
- **Update**: Update lead status labels and colors
- **Delete**: Remove lead statuses

### 👥 Contact Management

- **Create**: Add contacts to leads with full contact information
- **Get**: Retrieve contact details and relationships
- **Get All**: Get all contacts with advanced filters
- **Update**: Edit contact information and associations
- **Delete**: Remove contacts from system

### 📋 Activity Management

- **Create**: Create activities (Call, Email, Meeting, Note, SMS, WhatsApp)
- **Get**: Retrieve activity details and metadata
- **Get All**: Get all activities with comprehensive filters
- **Update**: Update activity information and status
- **Delete**: Delete activities and history

### 🔍 Meeting Search

- **Search**: Advanced meeting search with multiple criteria
- **Filter**: Filter by date, participants, status, and more

### 💰 Opportunity Management

- **Create**: Create new opportunities with pipeline assignment
- **Get**: Retrieve opportunity details and history
- **Get All**: Get all opportunities with status and pipeline filters
- **Update**: Update opportunity values, status, and pipeline
- **Delete**: Delete opportunities and associated data

### 📊 Opportunity Status Management

- **Create**: Create opportunity statuses (active/won/lost)
- **Get**: Retrieve opportunity status details
- **Get All**: List all opportunity statuses with pipeline info
- **Update**: Update opportunity status labels
- **Delete**: Remove opportunity statuses

### 🔗 Integration Link Management

- **Create**: Create integration links for external systems
- **Get**: Retrieve integration link details
- **Get All**: List all integration links with type filters
- **Update**: Update link URLs and configurations
- **Delete**: Remove integration links

### 🔍 Smart View Management

- **Create**: Create smart views (saved searches) for leads/contacts
- **Get**: Retrieve smart view configurations
- **Get All**: List all smart views with type filters
- **Update**: Update smart view queries and sharing settings
- **Delete**: Remove smart views

### 💬 Comment Management

- **Create**: Create comments on any Close.com object
- **Get**: Retrieve individual comments
- **Get All**: Get comments by object or thread with filters
- **Get Thread**: Retrieve comment threads
- **Get All Threads**: List comment threads with filters
- **Update**: Edit comment content (own comments only)
- **Delete**: Remove comments (preserves thread structure)

### 🔄 Pipeline Management

- **Create**: Create pipelines for organizing opportunity statuses
- **Get**: Retrieve pipeline details and status organization
- **Get All**: List all pipelines in organization
- **Update**: Reorder statuses, rename pipelines, move statuses between pipelines
- **Delete**: Remove empty pipelines (must have no statuses)

### 📧 Email Template Management

- **Create**: Create email templates with HTML/text content
- **Get**: Retrieve email template details
- **Get All**: List templates with archive filtering
- **Update**: Edit template content, sharing, and archive status
- **Delete**: Remove email templates
- **Render**: Render templates with dynamic content for specific leads/contacts or search queries

### ✅ Task Management

- **Create**: Create and assign tasks with due dates
- **Get**: Retrieve task details and assignments
- **Get All**: Get all tasks with status and assignment filters
- **Update**: Update task status, assignments, and details
- **Delete**: Delete tasks and history

### 👤 User Management

- **Get**: Retrieve user details and permissions
- **Get All**: List all team members and roles
- **Get Me**: Get current user information and settings

### 📄 Template Management (General)

- **Create**: Create general templates for various purposes
- **Get**: Retrieve template details and content
- **Get All**: List all templates with type filters
- **Update**: Edit template content and settings
- **Delete**: Delete templates

### 🔧 Custom Field Management

- **Create**: Create custom fields for leads, contacts, opportunities, activities
- **Get**: Retrieve custom field definitions and configurations
- **Get All**: List all custom fields with type and object filters
- **Update**: Change custom field configuration and options
- **Delete**: Remove custom fields (preserves existing data)

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

### Create Opportunity Status

```json
{
	"resource": "opportunityStatus",
	"operation": "create",
	"label": "Qualified Lead",
	"statusType": "active",
	"additionalFields": {
		"pipelineId": "pipe_123456"
	}
}
```

### Create Smart View for Lead Filtering

```json
{
	"resource": "smartView",
	"operation": "create",
	"name": "High Value Prospects",
	"query": "status:\"Potential\" AND custom_field:\"value\" > 10000",
	"smartViewType": "lead",
	"additionalFields": {
		"shared": true
	}
}
```

### Email Template Creation and Rendering

```json
{
	"resource": "emailTemplate",
	"operation": "create",
	"name": "Welcome Email",
	"subject": "Welcome {{lead.name}}!",
	"bodyHtml": "<h1>Welcome {{lead.name}}!</h1><p>Thank you for your interest in our services.</p>",
	"additionalFields": {
		"bodyText": "Welcome {{lead.name}}! Thank you for your interest in our services.",
		"isShared": true
	}
}
```

### Render Email Template

```json
{
	"resource": "emailTemplate",
	"operation": "render",
	"templateId": "tmpl_123456",
	"renderMode": "singleLeadContact",
	"leadId": "lead_123456",
	"contactId": "cont_123456"
}
```

### Create Pipeline with Status Organization

```json
{
	"resource": "pipeline",
	"operation": "create",
	"name": "Sales Pipeline",
	"additionalFields": {
		"statuses": [{ "id": "stat_123456" }, { "id": "stat_789012" }]
	}
}
```

### Add Comment to Lead

```json
{
	"resource": "comment",
	"operation": "create",
	"objectId": "lead_123456",
	"body": "Follow-up call scheduled for next week. Customer showed strong interest in our premium package."
}
```

### Create Integration Link

```json
{
	"resource": "integrationLink",
	"operation": "create",
	"name": "View in Analytics",
	"url": "https://analytics.company.com/lead/{{lead.id}}",
	"type": "lead"
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

## Advanced Features

### 🎯 Smart Views (Saved Searches)

Create and manage saved search queries for leads and contacts:

- **Advanced Filtering Syntax**: Use Close.com's powerful query language
- **Shared Views**: Share smart views across your organization
- **Lead & Contact Views**: Separate views for different object types
- **Dynamic Queries**: Support for date ranges, custom fields, and complex logic

### 🔗 Integration Links

Create dynamic links to external systems:

- **Variable Substitution**: Use `{{lead.id}}`, `{{contact.id}}`, `{{opportunity.id}}`
- **Multiple Types**: Links for leads, contacts, and opportunities
- **External Integrations**: Connect to analytics, support, or other CRM systems

### 📧 Email Template Rendering

Advanced email template functionality:

- **Dynamic Content**: Automatic variable replacement with lead/contact data
- **Two Render Modes**: Single lead/contact or bulk rendering from search queries
- **HTML & Text**: Support for both HTML and plain text email bodies
- **Bulk Operations**: Render templates for multiple leads from search results

### 💬 Comment System

Rich commenting system with thread support:

- **Object Comments**: Comment on any Close.com object (leads, contacts, opportunities, etc.)
- **Thread Management**: Automatic thread creation and management
- **Rich Text**: Support for formatted text and mentions
- **Permissions**: Edit own comments, view all accessible comments

### 🔄 Pipeline Management

Organize opportunity statuses into logical workflows:

- **Status Organization**: Group opportunity statuses by team or process
- **Flexible Management**: Reorder statuses, move between pipelines
- **Team Workflows**: Separate pipelines for sales, services, support
- **Status Migration**: Move statuses between pipelines without data loss

### 🏷️ Status Management

Complete control over lead and opportunity statuses:

- **Custom Colors**: Visual differentiation with color coding (lead statuses)
- **Status Types**: Active, won, lost categories (opportunity statuses)
- **Pipeline Integration**: Opportunity statuses work with pipeline organization
- **Lifecycle Management**: Create, update, and remove statuses safely

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

### Close.com API Documentation

- [Close.com API Documentation](https://developer.close.com/)
- [Lead Management](https://developer.close.com/resources/leads/)
- [Contact Management](https://developer.close.com/resources/contacts/)
- [Activity Management](https://developer.close.com/resources/activities/)
- [Opportunity Management](https://developer.close.com/resources/opportunities/)
- [Opportunity Statuses](https://developer.close.com/resources/opportunity-statuses/)
- [Lead Statuses](https://developer.close.com/resources/lead-statuses/)
- [Pipelines](https://developer.close.com/resources/pipelines/)
- [Smart Views](https://developer.close.com/resources/smart-views/)
- [Comments](https://developer.close.com/resources/comments/)
- [Integration Links](https://developer.close.com/resources/integration-links/)
- [Email Templates](https://developer.close.com/resources/email-templates/)
- [Webhooks Guide](https://developer.close.com/resources/webhook-subscriptions/)

### n8n Documentation

- [n8n Node Development](https://docs.n8n.io/integrations/community-nodes/)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/installation/)
- [n8n Workflow Examples](https://docs.n8n.io/workflows/examples/)

## License

[MIT](LICENSE)

## Support

- 📚 [Documentation](https://docs.n8n.io/)
- 💬 [Community Forum](https://community.n8n.io/)
- 🐛 [Bug Reports](https://github.com/n8n-io/n8n/issues)

---

**Made with ❤️ for the n8n community**
