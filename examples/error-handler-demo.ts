/**
 * Demonstration of the abstracted error handler
 *
 * This file shows how to use the new CloseErrorHandlerManager
 * for handling different types of errors in a consistent way.
 */

import { CloseErrorHandlerManager } from '../nodes/Close/mappers/CloseErrorHandlerManager';
import { ErrorContext } from '../nodes/Close/mappers/AbstractErrorHandler';

// Create an instance of the error handler manager
const errorHandler = new CloseErrorHandlerManager({
	enableDebugLogging: true,
	maxDescriptionLength: 1000,
});

/**
 * Example 1: HTTP 401 Authentication Error
 */
function demonstrateAuthenticationError() {
	console.log('\n=== Demonstration 1: Authentication Error ===');

	const authError = {
		response: {
			status: 401,
			data: { error: 'Invalid API key' },
			headers: {},
		},
	};

	const result = errorHandler.handleError(authError, 'lead', 'create');

	console.log('Message:', result.message);
	console.log('Description:', result.description);
}

/**
 * Example 2: HTTP 422 Validation Error with Field Errors
 */
function demonstrateValidationError() {
	console.log('\n=== Demonstration 2: Validation Error ===');

	const validationError = {
		response: {
			status: 422,
			data: {
				'field-errors': {
					name: ['This field is required'],
					email: ['Invalid email format'],
				},
			},
			headers: {},
		},
	};

	const result = errorHandler.handleError(validationError, 'contact', 'create', {
		name: '',
		email: 'invalid-email',
	});

	console.log('Message:', result.message);
	console.log('Description:', result.description);
}

/**
 * Example 3: Network Connection Error
 */
function demonstrateNetworkError() {
	console.log('\n=== Demonstration 3: Network Error ===');

	const networkError = {
		code: 'ETIMEDOUT',
		message: 'Connection timed out',
	};

	const result = errorHandler.handleError(networkError, 'opportunity', 'update');

	console.log('Message:', result.message);
	console.log('Description:', result.description);
}

/**
 * Example 4: JavaScript TypeError
 */
function demonstrateNodeError() {
	console.log('\n=== Demonstration 4: Node.js Error ===');

	const nodeError = new TypeError("Cannot read property 'id' of undefined");

	const result = errorHandler.handleError(nodeError, 'task', 'delete');

	console.log('Message:', result.message);
	console.log('Description:', result.description);
}

/**
 * Example 5: Using Full Context Object
 */
function demonstrateFullContextError() {
	console.log('\n=== Demonstration 5: Full Context Error ===');

	const serverError = {
		response: {
			status: 500,
			data: { error: 'Internal server error' },
			headers: {},
		},
	};

	const context: ErrorContext = {
		resource: 'lead',
		operation: 'update',
		endpoint: '/lead/123/',
		method: 'PUT',
		requestBody: { name: 'Updated Lead' },
		itemIndex: 2,
		metadata: { batchId: 'batch-123' },
	};

	const result = errorHandler.handleErrorWithContext(serverError, context);

	console.log('Message:', result.message);
	console.log('Description:', result.description);
}

/**
 * Example 6: Rate Limit Error
 */
function demonstrateRateLimitError() {
	console.log('\n=== Demonstration 6: Rate Limit Error ===');

	const rateLimitError = {
		response: {
			status: 429,
			data: { message: 'Rate limit exceeded' },
			headers: { 'retry-after': '60' },
		},
	};

	const result = errorHandler.handleError(rateLimitError, 'contact', 'getAll');

	console.log('Message:', result.message);
	console.log('Description:', result.description);
}

/**
 * Example 7: Backward Compatibility with Legacy Function
 */
function demonstrateLegacyCompatibility() {
	console.log('\n=== Demonstration 7: Legacy Compatibility ===');

	// Import the legacy function
	const { handleCloseApiError } = require('../nodes/Close/mappers/error');

	const legacyError = {
		response: {
			status: 404,
			data: { detail: 'Lead not found' },
			headers: {},
		},
	};

	const result = handleCloseApiError(legacyError, 'lead', 'get', { id: '123' });

	console.log('Message:', result.message);
	console.log('Description:', result.description);
}

// Run all demonstrations
if (require.main === module) {
	console.log('Close.com Error Handler Demonstrations');
	console.log('=====================================');

	demonstrateAuthenticationError();
	demonstrateValidationError();
	demonstrateNetworkError();
	demonstrateNodeError();
	demonstrateFullContextError();
	demonstrateRateLimitError();
	demonstrateLegacyCompatibility();

	console.log('\n=== All Demonstrations Complete ===\n');
}
