import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CloseHttpClient } from '../nodes/Close/transports/httpClient';
import { handleCloseApiError } from '../nodes/Close/mappers/error';

describe('Rate Limiting and Error Handling', () => {
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

	it('should handle rate limit errors (429)', async () => {
		const rateLimitError = {
			response: {
				status: 429,
				data: {
					error: 'Rate limit exceeded',
					error_description: 'Please slow down your requests',
				},
			},
		};

		mockContext.helpers.httpRequest.mockRejectedValue(rateLimitError);

		try {
			await httpClient.makeRequest('GET', '/lead/');
		} catch (error) {
			expect(error.message).toContain('Rate limit exceeded');
		}
	});

	it('should handle authentication errors (401)', async () => {
		const authError = {
			response: {
				status: 401,
				data: {
					error: 'Invalid API key',
				},
			},
		};

		mockContext.helpers.httpRequest.mockRejectedValue(authError);

		try {
			await httpClient.makeRequest('GET', '/lead/');
		} catch (error) {
			expect(error.message).toContain('Unauthorized');
		}
	});

	it('should handle validation errors (422)', async () => {
		const validationError = {
			response: {
				status: 422,
				data: {
					error: 'Validation failed',
					detail: 'Name is required',
				},
			},
		};

		mockContext.helpers.httpRequest.mockRejectedValue(validationError);

		try {
			await httpClient.makeRequest('POST', '/lead/', {});
		} catch (error) {
			expect(error.message).toContain('Validation error');
		}
	});

	describe('handleCloseApiError', () => {
		it('should format error messages correctly', () => {
			const error = {
				response: {
					status: 404,
					data: {
						error: 'Lead not found',
					},
				},
			};

			const formattedError = handleCloseApiError(error, 'lead', 'get');
			
			expect(formattedError.message).toContain('lead not found');
			expect(formattedError.httpCode).toBe('404');
		});
	});
});