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
                'Accept': 'application/json',
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
        try {
            const response = await this.context.helpers.httpRequest(options);
            return response;
        }
        catch (error) {
            throw (0, error_1.handleCloseApiError)(error, endpoint, method);
        }
    }
}
exports.CloseHttpClient = CloseHttpClient;
