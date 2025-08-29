"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseApi = void 0;
class CloseApi {
    constructor() {
        this.name = 'closeApi';
        this.displayName = 'Close.com API';
        this.documentationUrl = 'https://developer.close.com/';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
                description: 'Your Close.com API Key',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                auth: {
                    username: '={{$credentials.apiKey}}',
                    password: '',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.close.com',
                url: '/api/v1/me/',
            },
        };
    }
}
exports.CloseApi = CloseApi;
