import { NodeApiError } from 'n8n-workflow';

export function handleCloseApiError(
	error: any,
	resource: string,
	operation: string,
	requestBody?: any,
): NodeApiError {
	let message = 'Unknown error occurred';
	let description = '';
	let httpCode = '';

	console.log('=== CLOSE API ERROR DEBUG ===');
	console.log('Resource:', resource);
	console.log('Operation:', operation);
	console.log('Request Body:', JSON.stringify(requestBody, null, 2));
	console.log('Error Object:', JSON.stringify(error, null, 2));

	if (error.response) {
		const { status, data, headers } = error.response;
		httpCode = status.toString();

		console.log('Response Status:', status);
		console.log('Response Data:', JSON.stringify(data, null, 2));
		console.log('Response Headers:', JSON.stringify(headers, null, 2));

		if (data) {
			// Handle different error response formats from Close.com
			if (typeof data === 'string') {
				message = data;
			} else if (data.errors && Array.isArray(data.errors)) {
				// Handle validation errors array
				const errorMessages = data.errors.map((err: any) => {
					if (typeof err === 'string') return err;
					if (err.field && err.code) return `${err.field}: ${err.code}`;
					if (err.message) return err.message;
					return JSON.stringify(err);
				});
				message = `Validation errors: ${errorMessages.join(', ')}`;
				description = `Please check the following fields: ${errorMessages.join('; ')}`;
			} else if (data['field-errors']) {
				// Handle Close.com specific field-errors format (with hyphen)
				const fieldErrors = Object.entries(data['field-errors']).map(
					([field, errors]: [string, any]) => {
						const errorList = Array.isArray(errors) ? errors.join(', ') : errors;
						return `${field}: ${errorList}`;
					},
				);
				message = `Field validation errors: ${fieldErrors.join('; ')}`;
				description = `Please correct the following fields: ${fieldErrors.join('; ')}`;
			} else if (data.field_errors) {
				// Handle field_errors format (with underscore)
				const fieldErrors = Object.entries(data.field_errors).map(
					([field, errors]: [string, any]) => {
						const errorList = Array.isArray(errors) ? errors.join(', ') : errors;
						return `${field}: ${errorList}`;
					},
				);
				message = `Field validation errors: ${fieldErrors.join('; ')}`;
				description = `Please correct the following fields: ${fieldErrors.join('; ')}`;
			} else if (data.error) {
				message = data.error;
				if (data.error_description) {
					description = data.error_description;
				}
			} else if (data.detail) {
				message = data.detail;
			} else if (data.message) {
				message = data.message;
			} else {
				// Fallback: show the entire data object
				message = `API Error: ${JSON.stringify(data)}`;
			}
		}

		// Handle specific HTTP status codes with more detailed messages
		switch (status) {
			case 400:
				if (!message.includes('validation') && !message.includes('field')) {
					message = `Bad Request: ${message}. Please check your input parameters.`;
					description = `Request body: ${JSON.stringify(requestBody, null, 2)}`;
				}
				break;
			case 401:
				message = 'Unauthorized - Check your Close.com API key in credentials';
				description = 'Make sure your API key is valid and has the necessary permissions';
				break;
			case 403:
				message = 'Forbidden - Insufficient permissions for this operation';
				description = 'Your API key may not have permission to perform this action';
				break;
			case 404:
				message = `Resource not found: ${resource}`;
				description = 'The requested resource does not exist or you do not have access to it';
				break;
			case 422:
				if (!message.includes('validation') && !message.includes('field')) {
					message = `Validation error: ${message}`;
					description = `Please check your input data. Request: ${JSON.stringify(
						requestBody,
						null,
						2,
					)}`;
				}
				break;
			case 429:
				message = 'Rate limit exceeded - Please slow down your requests';
				description = 'Close.com API rate limit has been reached. Wait a moment before retrying.';
				break;
			case 500:
				message = 'Internal Server Error - Close.com API is experiencing issues';
				description =
					'This is a server-side error. Please try again later or contact Close.com support.';
				break;
		}
	} else if (error.code) {
		// Handle network errors
		switch (error.code) {
			case 'ECONNREFUSED':
				message = 'Connection refused - Cannot reach Close.com API';
				description = 'Please check your internet connection';
				break;
			case 'ETIMEDOUT':
				message = 'Request timeout - Close.com API did not respond in time';
				description = 'The request took too long. Please try again.';
				break;
			default:
				message = `Network error: ${error.code}`;
				description = error.message || 'Unknown network error occurred';
		}
	} else if (error.message) {
		message = error.message;
	}

	console.log('Final Error Message:', message);
	console.log('Final Error Description:', description);
	console.log('=== END ERROR DEBUG ===');

	return new NodeApiError(error, {
		message: `Close.com API Error [${resource}:${operation}] - ${message}`,
		description:
			description ||
			`Operation: ${operation} on ${resource}${
				requestBody ? `\nRequest data: ${JSON.stringify(requestBody, null, 2)}` : ''
			}`,
		httpCode,
	});
}
