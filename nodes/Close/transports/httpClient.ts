import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { handleCloseApiError } from '../mappers/error';

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

		try {
			const response = await this.context.helpers.httpRequest(options);
			return response;
		} catch (error) {
			throw handleCloseApiError(error, endpoint, method);
		}
	}
}
