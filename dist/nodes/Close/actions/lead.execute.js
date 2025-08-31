"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeLeadAction = void 0;
const httpClient_1 = require("../transports/httpClient");
const paginator_1 = require("../transports/paginator");
// Cache for custom field metadata to avoid repeated API calls
let customFieldsCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
// Helper function to convert custom fields from Close.com API response to structured array
async function convertCustomFields(responseData, httpClient) {
    if (!responseData || typeof responseData !== 'object') {
        return responseData;
    }
    const customFields = [];
    const result = { ...responseData };
    const fieldIds = [];
    // First pass: collect all field IDs and prepare basic structure
    for (const [key, value] of Object.entries(responseData)) {
        if (key.startsWith('custom.cf_')) {
            // Extract the field ID (remove 'custom.' prefix)
            const fieldId = key.substring(7); // Remove 'custom.' prefix
            fieldIds.push(fieldId);
            customFields.push({
                id: fieldId,
                name: fieldId,
                value: value,
            });
            // Remove the original custom field property from the result
            delete result[key];
        }
    }
    // Second pass: fetch real names for the custom fields
    if (fieldIds.length > 0) {
        try {
            // Check if we need to fetch/refresh custom field metadata
            const now = Date.now();
            if (!customFieldsCache || now - cacheTimestamp > CACHE_DURATION) {
                // Fetch custom field metadata from Close.com API
                const customFieldsResponse = await httpClient.makeRequest('GET', '/custom_field/lead/');
                const customFieldsMetadata = customFieldsResponse.data || [];
                // Create a map of field ID to field name and cache it
                customFieldsCache = {};
                for (const fieldMeta of customFieldsMetadata) {
                    if (fieldMeta.id) {
                        customFieldsCache[fieldMeta.id] = fieldMeta.name || fieldMeta.id;
                    }
                }
                cacheTimestamp = now;
            }
            // Update the custom fields with real names from cache
            for (const customField of customFields) {
                if (customFieldsCache && customFieldsCache[customField.id]) {
                    customField.name = customFieldsCache[customField.id];
                }
            }
        }
        catch (error) {
            // If fetching metadata fails, keep the field IDs as names
            console.warn('Could not fetch custom field metadata:', error);
        }
    }
    // Add the structured custom fields array
    result.customFields = customFields;
    return result;
}
async function executeLeadAction(operation, i) {
    const httpClient = new httpClient_1.CloseHttpClient(this);
    const paginator = new paginator_1.ClosePaginator(httpClient);
    switch (operation) {
        case 'create':
            return await createLead.call(this, httpClient, i);
        case 'get':
            return await getLead.call(this, httpClient, i);
        case 'getAll':
            return await getAllLeads.call(this, httpClient, paginator, i);
        case 'update':
            return await updateLead.call(this, httpClient, i);
        case 'delete':
            return await deleteLead.call(this, httpClient, i);
        case 'merge':
            return await mergeLeads.call(this, httpClient, i);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
exports.executeLeadAction = executeLeadAction;
async function createLead(httpClient, i) {
    const body = {};
    // Required fields
    const name = this.getNodeParameter('name', i);
    if (name)
        body.name = name;
    // Optional fields
    const description = this.getNodeParameter('description', i, '');
    if (description)
        body.description = description;
    const statusId = this.getNodeParameter('statusId', i, '');
    if (statusId)
        body.status_id = statusId;
    const url = this.getNodeParameter('url', i, '');
    if (url)
        body.url = url;
    // Additional fields
    const additionalFields = this.getNodeParameter('additionalFields', i);
    // Custom fields
    if (additionalFields.customFields && additionalFields.customFields.customField) {
        const customFields = additionalFields.customFields.customField;
        for (const field of customFields) {
            if (field.fieldId && field.value !== undefined && field.value !== '') {
                const customFieldKey = `custom.${field.fieldId}`;
                body[customFieldKey] = field.value;
            }
        }
    }
    // User Custom fields
    if (additionalFields.userCustomFields && additionalFields.userCustomFields.userCustomField) {
        const userCustomFields = additionalFields.userCustomFields.userCustomField;
        for (const field of userCustomFields) {
            if (field.fieldId && field.value !== undefined && field.value !== '') {
                const customFieldKey = `custom.${field.fieldId}`;
                body[customFieldKey] = field.value;
            }
        }
    }
    // Addresses (now separate main field)
    const addresses = this.getNodeParameter('addresses', i, {});
    if (addresses && addresses.address) {
        body.addresses = addresses.address.filter((addr) => addr.address_1 || addr.city || addr.state || addr.zipcode || addr.country);
    }
    // Contacts (now separate main field)
    const contacts = this.getNodeParameter('contacts', i, {});
    if (contacts && contacts.contact) {
        body.contacts = contacts.contact
            .filter((contact) => contact.name ||
            (contact.emails && contact.emails.email && contact.emails.email.length > 0))
            .map((contact) => {
            const processedContact = {};
            if (contact.name)
                processedContact.name = contact.name;
            if (contact.title)
                processedContact.title = contact.title;
            // Process emails
            if (contact.emails && contact.emails.email) {
                processedContact.emails = contact.emails.email.filter((email) => email.email);
            }
            // Process phones
            if (contact.phones && contact.phones.phone) {
                processedContact.phones = contact.phones.phone.filter((phone) => phone.phone);
            }
            return processedContact;
        });
    }
    const response = await httpClient.makeRequest('POST', '/lead/', body);
    const convertedResponse = await convertCustomFields(response, httpClient);
    return [{ json: convertedResponse }];
}
async function getLead(httpClient, i) {
    const leadId = this.getNodeParameter('leadId', i);
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await httpClient.makeRequest('GET', `/lead/${leadId}/`, undefined, qs);
    const convertedResponse = await convertCustomFields(response, httpClient);
    return [{ json: convertedResponse }];
}
async function getAllLeads(httpClient, paginator, i) {
    const returnAll = this.getNodeParameter('returnAll', i);
    const limit = this.getNodeParameter('limit', i, 50);
    const query = this.getNodeParameter('query', i, '{}');
    const orderBy = this.getNodeParameter('orderBy', i, '');
    const additionalFields = this.getNodeParameter('additionalFields', i);
    const qs = {};
    // Query (JSON format)
    if (query && query !== '{}') {
        try {
            const queryObj = JSON.parse(query);
            // Convert JSON query to Close.com query format
            const queryParts = [];
            for (const [key, value] of Object.entries(queryObj)) {
                if (value !== null && value !== undefined && value !== '') {
                    queryParts.push(`${key}:"${value}"`);
                }
            }
            if (queryParts.length > 0) {
                qs.query = queryParts.join(' AND ');
            }
        }
        catch (error) {
            throw new Error(`Invalid JSON in query field: ${error}`);
        }
    }
    // Order By
    if (orderBy) {
        qs._order_by = orderBy;
    }
    // Additional fields
    if (additionalFields.fields) {
        qs._fields = additionalFields.fields;
    }
    const response = await paginator.getAll('/lead/', { returnAll, limit }, qs);
    // Convert custom fields for each item
    const convertedItems = await Promise.all(response.map(async (item) => ({ json: await convertCustomFields(item, httpClient) })));
    return convertedItems;
}
async function updateLead(httpClient, i) {
    const leadId = this.getNodeParameter('leadId', i);
    const updateFields = this.getNodeParameter('updateFields', i);
    const body = {};
    // Update basic fields
    if (updateFields.name !== undefined)
        body.name = updateFields.name;
    if (updateFields.description !== undefined)
        body.description = updateFields.description;
    if (updateFields.statusId !== undefined)
        body.status_id = updateFields.statusId;
    if (updateFields.url !== undefined)
        body.url = updateFields.url;
    // Custom fields
    if (updateFields.customFields && updateFields.customFields.customField) {
        const customFields = updateFields.customFields.customField;
        for (const field of customFields) {
            if (field.fieldId && field.value !== undefined && field.value !== '') {
                const customFieldKey = `custom.${field.fieldId}`;
                body[customFieldKey] = field.value;
            }
        }
    }
    // User Custom fields
    if (updateFields.userCustomFields && updateFields.userCustomFields.userCustomField) {
        const userCustomFields = updateFields.userCustomFields.userCustomField;
        for (const field of userCustomFields) {
            if (field.fieldId && field.value !== undefined && field.value !== '') {
                const customFieldKey = `custom.${field.fieldId}`;
                body[customFieldKey] = field.value;
            }
        }
    }
    const response = await httpClient.makeRequest('PUT', `/lead/${leadId}/`, body);
    const convertedResponse = await convertCustomFields(response, httpClient);
    return [{ json: convertedResponse }];
}
async function deleteLead(httpClient, i) {
    const leadId = this.getNodeParameter('leadId', i);
    await httpClient.makeRequest('DELETE', `/lead/${leadId}/`);
    return [{ json: { success: true, id: leadId } }];
}
async function mergeLeads(httpClient, i) {
    const sourceId = this.getNodeParameter('sourceId', i);
    const destinationId = this.getNodeParameter('destinationId', i);
    const body = {
        source: sourceId,
        destination: destinationId,
    };
    const response = await httpClient.makeRequest('POST', '/lead/merge/', body);
    const convertedResponse = await convertCustomFields(response, httpClient);
    return [{ json: convertedResponse }];
}
