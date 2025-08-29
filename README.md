# n8n-nodes-close

![Banner Image](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

Ein umfassendes n8n Community Node Paket für die Integration mit Close.com CRM.

[English](README.md) | [Deutsch](README.de.md)

## Installation

Sie haben drei Möglichkeiten, dieses Node Paket zu installieren.

### Community Nodes (Empfohlen)

1. Öffnen Sie n8n und gehen Sie zu **Settings > Community Nodes**
2. Wählen Sie **Install**
3. Geben Sie `n8n-nodes-close` ein und klicken Sie auf **Install**
4. Akzeptieren Sie die Risiken bei der Installation von Community Nodes
5. Wählen Sie **Install** und warten Sie, bis das Node installiert ist

### npm Installation

Für Self-Hosted Instanzen:

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-close
```

### Manual Installation

1. Laden Sie das neueste Release herunter
2. Entpacken Sie die Dateien nach `~/.n8n/nodes/n8n-nodes-close/`
3. Starten Sie n8n neu

## Credentials

Sie müssen Close.com API Credentials konfigurieren:

1. Gehen Sie zu [Close.com](https://app.close.com) und melden Sie sich an
2. Navigieren Sie zu **Settings > API Keys**
3. Erstellen Sie einen neuen API Key
4. Gehen Sie in n8n zu **Credentials > Add Credential**
5. Suchen Sie nach **Close.com API**
6. Geben Sie Ihren API Key ein
7. Testen Sie die Verbindung und speichern Sie

## Supported Operations

### 📧 Lead Management

- **Create**: Neue Leads erstellen
- **Get**: Einzelne Leads abrufen
- **Get All**: Alle Leads mit Filteroptionen
- **Update**: Lead-Informationen aktualisieren
- **Delete**: Leads löschen
- **Merge**: Zwei Leads zusammenführen

### 👥 Contact Management

- **Create**: Kontakte zu Leads hinzufügen
- **Get**: Kontakt-Details abrufen
- **Get All**: Alle Kontakte mit Filtern
- **Update**: Kontakt-Informationen bearbeiten
- **Delete**: Kontakte entfernen

### 📋 Activity Management

- **Create**: Activities erstellen (Call, Email, Meeting, Note, SMS)
- **Get**: Activity-Details abrufen
- **Get All**: Alle Activities mit Filtern
- **Update**: Activity-Informationen aktualisieren
- **Delete**: Activities löschen

### 💰 Opportunity Management

- **Create**: Neue Opportunities erstellen
- **Get**: Opportunity-Details abrufen
- **Get All**: Alle Opportunities mit Filtern
- **Update**: Opportunity-Status und Werte aktualisieren
- **Delete**: Opportunities löschen

### ✅ Task Management

- **Create**: Tasks erstellen und zuweisen
- **Get**: Task-Details abrufen
- **Get All**: Alle Tasks mit Filtern
- **Update**: Task-Status und Details aktualisieren
- **Delete**: Tasks löschen

### 👤 User Management

- **Get**: Benutzer-Details abrufen
- **Get All**: Alle Team-Mitglieder auflisten
- **Get Me**: Aktuelle Benutzer-Informationen

### 📄 Template Management

- **Create**: Email/SMS Templates erstellen
- **Get**: Template-Details abrufen
- **Get All**: Alle Templates auflisten
- **Update**: Templates bearbeiten
- **Delete**: Templates löschen

### 🔧 Custom Field Management

- **Create**: Custom Fields erstellen
- **Get**: Custom Field Details abrufen
- **Get All**: Alle Custom Fields auflisten
- **Update**: Custom Field Konfiguration ändern
- **Delete**: Custom Fields entfernen

### 🔍 Meeting Search

- **Search**: Meetings nach verschiedenen Kriterien suchen

### 🎣 Webhooks & Triggers

- **Close Webhook Trigger**: Reagiert auf Close.com Events
- Unterstützt alle Close.com Webhook Events
- Automatisches Webhook-Management

## Example Workflows

Das Paket enthält vorgefertigte Workflow-Beispiele:

### Basic Lead Management

```json
// Import: examples/close-basic-workflow.json
```

- Neue Leads abrufen
- Lead-Informationen aktualisieren
- Activities zu Leads hinzufügen

### Complete CRM Integration

```json
// Import: examples/close-complete-workflow.json
```

- Vollständiger Lead-to-Customer Process
- Opportunity Management
- Task Assignment
- Template Usage

### Webhook Integration

```json
// Import: examples/close-webhook-example.json
```

- Real-time Event Processing
- Automated Lead Updates
- Cross-system Synchronization

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

Close.com API hat Rate Limits:

- 240 Requests pro Minute für Read Operations
- 120 Requests pro Minute für Write Operations

Das Node implementiert automatisches Rate Limiting und Retry-Logic.

## Error Handling

Das Node bietet umfassendes Error Handling:

- Automatische Retry bei temporären Fehlern
- Detaillierte Fehlermeldungen
- Graceful Handling von Rate Limits
- Validierung der Input-Parameter

## Debugging

Für Debug-Informationen:

1. Setzen Sie die n8n Log Level auf `debug`
2. Überprüfen Sie die n8n Logs für detaillierte API-Calls
3. Verwenden Sie die "Test" Funktion in den Credentials

## Contributing

Contributions sind willkommen! Bitte:

1. Forken Sie das Repository
2. Erstellen Sie einen Feature Branch
3. Committen Sie Ihre Änderungen
4. Pushen Sie zum Branch
5. Erstellen Sie einen Pull Request

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
