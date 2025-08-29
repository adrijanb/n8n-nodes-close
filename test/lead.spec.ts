import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { executeLeadAction } from '../nodes/Close/actions/lead';

describe('Lead Actions', () => {
	let mockContext: any;

	beforeEach(() => {
		mockContext = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({ apiKey: 'test-key' }),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('createLead', () => {
		it('should create a new lead with required fields', async () => {
			const mockResponse = {
				id: 'lead_123',
				name: 'ACME Corp',
				status_id: 'stat_123',
			};

			mockContext.getNodeParameter
				.mockReturnValueOnce('ACME Corp') // name
				.mockReturnValueOnce('Great company') // description
				.mockReturnValueOnce('stat_123') // statusId
				.mockReturnValueOnce({}); // additionalFields

			const result = await executeLeadAction.call(mockContext, 'create', 0);

			expect(result).toBeDefined();
		});
	});

	describe('mergeLeads', () => {
		it('should merge two leads', async () => {
			const mockResponse = {
				id: 'lead_destination',
				merged_lead_id: 'lead_source',
			};

			mockContext.getNodeParameter
				.mockReturnValueOnce('lead_source') // sourceId
				.mockReturnValueOnce('lead_destination'); // destinationId

			const result = await executeLeadAction.call(mockContext, 'merge', 0);

			expect(result).toBeDefined();
		});
	});

	describe('getAllLeads with filter', () => {
		it('should retrieve leads with search query', async () => {
			mockContext.getNodeParameter
				.mockReturnValueOnce(false) // returnAll
				.mockReturnValueOnce(10) // limit
				.mockReturnValueOnce({ query: 'status:new' }); // additionalFields

			const result = await executeLeadAction.call(mockContext, 'getAll', 0);

			expect(result).toBeDefined();
		});
	});
});