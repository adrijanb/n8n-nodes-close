import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { executeContactAction } from '../nodes/Close/actions/contact';

describe('Contact Actions', () => {
	let mockContext: any;
	let mockHttpClient: any;

	beforeEach(() => {
		mockContext = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({ apiKey: 'test-key' }),
			helpers: {
				httpRequest: jest.fn(),
			},
		};

		mockHttpClient = {
			makeRequest: jest.fn(),
		};
	});

	describe('getAllContacts', () => {
		it('should retrieve all contacts with lead filter', async () => {
			const mockResponse = {
				data: [
					{
						id: 'cont_123',
						name: 'John Doe',
						email: 'john@example.com',
						lead_id: 'lead_123',
					},
				],
			};

			mockContext.getNodeParameter
				.mockReturnValueOnce('contact') // resource
				.mockReturnValueOnce('getAll') // operation
				.mockReturnValueOnce(false) // returnAll
				.mockReturnValueOnce(10) // limit
				.mockReturnValueOnce({ leadId: 'lead_123' }); // additionalFields

			const result = await executeContactAction.call(mockContext, 'getAll', 0);

			expect(result).toBeDefined();
		});
	});

	describe('createContact', () => {
		it('should create a new contact', async () => {
			const mockResponse = {
				id: 'cont_123',
				name: 'John Doe',
				lead_id: 'lead_123',
			};

			mockContext.getNodeParameter
				.mockReturnValueOnce('lead_123') // leadId
				.mockReturnValueOnce('John Doe') // name
				.mockReturnValueOnce('CEO') // title
				.mockReturnValueOnce({}); // additionalFields

			const result = await executeContactAction.call(mockContext, 'create', 0);

			expect(result).toBeDefined();
		});
	});
});