import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { closeErrorHandler } from '../mappers/CloseErrorHandlerManager';

export class CloseHttpClient {
	constructor(private context: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions) {}

	async makeRequest(
		method: IHttpRequestMethods,
		endpoint: string,
		body?: any,
		qs?: any,
		headers?: any,
	): Promise<any> {
		const credentials = await this.context.getCredentials('closeApi');

		const options: IHttpRequestOptions = {
			method,
			url: `https://api.close.com/api/v1${endpoint}`,
			auth: {
				username: credentials.apiKey as string,
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
		} catch (error) {
			// Use the new abstracted error handler with full context
			throw closeErrorHandler.handleErrorWithContext(error, {
				endpoint,
				method,
				requestBody: body,
			});
		}
	}
}
