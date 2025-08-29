import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CloseHttpClient } from '../nodes/Close/transports/httpClient';

describe('CloseHttpClient', () => {
	let mockContext: any;
	let httpClient: CloseHttpClient;

	beforeEach(() => {
		mockContext = {
			getCredentials: jest.fn().mockResolvedValue({ apiKey: 'test-api-key' }),
			helpers: {
				httpRequest: jest.fn(),
			},
		};

		httpClient = new CloseHttpClient(mockContext);
	});

	it('should make a GET request with proper authentication', async () => {
		const mockResponse = { id: 'test_123', name: 'Test Lead' };
		mockContext.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await httpClient.makeRequest('GET', '/lead/test_123/');

		expect(mockContext.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.close.com/api/v1/lead/test_123/',
			auth: {
				username: 'test-api-key',
				password: '',
			},
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			json: true,
		});

		expect(result).toEqual(mockResponse);
	});

	it('should handle POST requests with body', async () => {
		const mockResponse = { id: 'lead_123', name: 'New Lead' };
		const requestBody = { name: 'New Lead', description: 'Test lead' };
		
		mockContext.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await httpClient.makeRequest('POST', '/lead/', requestBody);

		expect(mockContext.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://api.close.com/api/v1/lead/',
			auth: {
				username: 'test-api-key',
				password: '',
			},
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			json: true,
			body: requestBody,
		});

		expect(result).toEqual(mockResponse);
	});

	it('should include query parameters', async () => {
		const mockResponse = { data: [] };
		const queryParams = { _limit: 10, _skip: 0 };
		
		mockContext.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await httpClient.makeRequest('GET', '/lead/', undefined, queryParams);

		expect(mockContext.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.close.com/api/v1/lead/',
			auth: {
				username: 'test-api-key',
				password: '',
			},
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			json: true,
			qs: queryParams,
		});

		expect(result).toEqual(mockResponse);
	});
});