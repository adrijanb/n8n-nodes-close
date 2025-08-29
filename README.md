# n8n-nodes-close

Ein umfassendes n8n Community Node Paket für die Integration mit Close.com CRM.

## Features

### Leads
- ✅ **CRUD Operationen**: Erstellen, Lesen, Aktualisieren, Löschen von Leads
- ✅ **Merge Funktionalität**: Zwei Leads zusammenführen
- ✅ **Filter Support**: Leads nach verschiedenen Kriterien filtern
- ✅ **Custom Fields**: Unterstützung für benutzerdefinierte Felder

### Contacts
- ✅ **CRUD Operationen**: Vollständige Kontakt-Verwaltung pro Lead
- ✅ **Email & Telefon**: Mehrere Email-Adressen und Telefonnummern
- ✅ **Filter Support**: Kontakte nach Lead oder anderen Kriterien filtern

### Activities
- ✅ **Unified API**: Alle Activity-Typen über eine einheitliche Schnittstelle
- ✅ **Call Activities**: Anruf-Protokolle mit Dauer und Notizen
- ✅ **Email Activities**: Email-Versand mit Schedule-Funktion
- ✅ **Meeting Activities**: Meeting-Management mit Teilnehmern
- ✅ **Note Activities**: Einfache Notizen zu Leads/Contacts
- ✅ **SMS Activities**: SMS-Versand mit Template-Support

### Meeting Search
- ✅ **Erweiterte Suche**: Meetings nach verschiedenen Kriterien suchen
- ✅ **Filter Options**: Nach User, Lead, Contact, Datum filtern

### Opportunities
- ✅ **CRUD Operationen**: Vollständige Sales Pipeline Verwaltung
- ✅ **Value Tracking**: Monetäre Werte und Prognosen
- ✅ **Status Management**: Opportunity Status Verfolgung
- ✅ **Filter Support**: Nach Status, User, Datum filtern

### Tasks
- ✅ **CRUD Operationen**: Task-Management für Team-Koordination
- ✅ **Assignment**: Tasks Benutzern zuweisen
- ✅ **Due Dates**: Fälligkeitsdaten verwalten
- ✅ **Completion**: Tasks als erledigt markieren

### Users
- ✅ **User Queries**: Benutzerinformationen abrufen
- ✅ **Current User**: Aktuell authentifizierten Benutzer abrufen
- ✅ **Team Overview**: Alle Team-Mitglieder auflisten

### Templates
- ✅ **Email Templates**: CRUD für Email-Vorlagen
- ✅ **SMS Templates**: CRUD für SMS-Vorlagen
- ✅ **Unified Interface**: Gemeinsame Abstraktion für beide Template-Typen
- ✅ **Sharing**: Templates team-weit teilen

### Webhooks & Triggers
- ✅ **Comprehensive Events**: Alle Close.com Webhook-Events unterstützt
- ✅ **Event Filtering**: Events nach Status oder User filtern
- ✅ **Auto Management**: Webhook-Subscriptions automatisch verwalten

### Custom Fields
- ✅ **Full CRUD**: Erstellen, Lesen, Aktualisieren, Löschen von Custom Fields
- ✅ **Multiple Types**: Text, Number, Date, Choice, Boolean Felder
- ✅ **Schema Support**: Custom Field Schemas abrufen
- ✅ **Multi-Object**: Support für alle Object-Typen (Lead, Contact, etc.)

## Installation

```bash
npm install n8n-nodes-close
```

## Konfiguration

1. Erstellen Sie Close.com API Credentials in n8n:
   - **Name**: Close.com API
   - **API Key**: Ihr Close.com API Schlüssel

2. Verwenden Sie das Close Node in Ihren Workflows

## API Referenz

Basiert auf der [Close.com API Dokumentation](https://developer.close.com/):

- [Leads API](https://developer.close.com/resources/leads/)
- [Contacts API](https://developer.close.com/resources/contacts/)
- [Activities API](https://developer.close.com/resources/activities/)
- [Meeting Search API](https://developer.close.com/resources/meeting-search/)
- [Opportunities API](https://developer.close.com/resources/opportunities/)
- [Tasks API](https://developer.close.com/resources/tasks/)
- [Users API](https://developer.close.com/resources/users/)
- [Templates API](https://developer.close.com/resources/email-templates/)
- [Webhooks API](https://developer.close.com/resources/webhook-subscriptions/)
- [Custom Fields API](https://developer.close.com/resources/custom-fields/)

## Beispiel Workflows

Das Paket enthält Beispiel-Workflows im `examples/` Verzeichnis:

- `close-basic-workflow.json`: Basis Workflow mit Leads, Contacts und Activities

## Lizenz

MIT