"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseHttpClient = void 0;
const CloseErrorHandlerManager_1 = require("../mappers/CloseErrorHandlerManager");
class CloseHttpClient {
    constructor(context) {
        this.context = context;
    }
    async makeRequest(method, endpoint, body, qs, headers) {
        const credentials = await this.context.getCredentials('closeApi');
        const options = {
            method,
            url: `https://api.close.com/api/v1${endpoint}`,
            auth: {
                username: credentials.apiKey,
                password: '',
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...headers,
            },
            json: true,
        };
        if (body !== undefined) {
            options.body = body;
        }
        if (qs !== undefined) {
            options.qs = qs;
        }
        // Log request details for debugging
        console.log('=== CLOSE API REQUEST DEBUG ===');
        console.log('Method:', method);
        console.log('Endpoint:', endpoint);
        console.log('Request Body:', JSON.stringify(body, null, 2));
        console.log('Query String:', JSON.stringify(qs, null, 2));
        console.log('Full URL:', options.url);
        console.log('=== END REQUEST DEBUG ===');
        try {
            const response = await this.context.helpers.httpRequest(options);
            console.log('=== CLOSE API SUCCESS ===');
            console.log('Response:', JSON.stringify(response, null, 2));
            console.log('=== END SUCCESS ===');
            return response;
        }
        catch (error) {
            // Use the new abstracted error handler with full context
            throw CloseErrorHandlerManager_1.closeErrorHandler.handleErrorWithContext(error, {
                endpoint,
                method,
                requestBody: body,
            });
        }
    }
}
exports.CloseHttpClient = CloseHttpClient;
