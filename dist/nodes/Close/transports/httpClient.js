"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseHttpClient = void 0;
const error_1 = require("../mappers/error");
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
            throw (0, error_1.handleCloseApiError)(error, endpoint, method, body);
        }
    }
}
exports.CloseHttpClient = CloseHttpClient;
