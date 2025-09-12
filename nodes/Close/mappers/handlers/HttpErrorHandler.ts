import {
	AbstractErrorHandler,
	ErrorContext,
	ErrorType,
	ParsedError,
} from '../AbstractErrorHandler';

/**
 * Handler for HTTP response errors (4xx, 5xx status codes)
 */
export class HttpErrorHandler extends AbstractErrorHandler {
	priority = 1;

	canHandle(error: any): boolean {
		return error?.response?.status !== undefined;
	}

	handle(error: any, context: ErrorContext): ParsedError {
		const { status, data, headers: _headers } = error.response;
		const httpCode = status.toString();

		let message = 'HTTP Error';
		let description = '';
		let errorType = ErrorType.UNKNOWN;

		// Parse error data based on Close.com API response format
		if (data) {
			const parsedMessage = this.parseErrorMessage(data);
			if (parsedMessage) {
				message = parsedMessage.message;
				description = parsedMessage.description;
			}
		}

		// Determine error type and enhance message based on status code
		switch (status) {
			case 400:
				errorType = ErrorType.VALIDATION;
				if (!message.includes('validation') && !message.includes('field')) {
					message = `Bad Request: ${message}. Please check your input parameters.`;
					if (context.requestBody && !description) {
						description = `Request body: ${JSON.stringify(context.requestBody, null, 2)}`;
					}
				}
				break;

			case 401:
				errorType = ErrorType.AUTHENTICATION;
				message = 'Unauthorized - Check your Close.com API key in credentials';
				description = 'Make sure your API key is valid and has the necessary permissions';
				break;

			case 403:
				errorType = ErrorType.AUTHORIZATION;
				message = 'Forbidden - Insufficient permissions for this operation';
				description = 'Your API key may not have permission to perform this action';
				break;

			case 404:
				errorType = ErrorType.NOT_FOUND;
				message = `Resource not found: ${context.resource || 'Unknown resource'}`;
				description = 'The requested resource does not exist or you do not have access to it';
				break;

			case 422:
				errorType = ErrorType.VALIDATION;
				if (!message.includes('validation') && !message.includes('field')) {
					message = `Validation error: ${message}`;
					if (context.requestBody && !description) {
						description = `Please check your input data. Request: ${JSON.stringify(
							context.requestBody,
							null,
							2,
						)}`;
					}
				}
				break;

			case 429:
				errorType = ErrorType.RATE_LIMIT;
				message = 'Rate limit exceeded - Please slow down your requests';
				description = 'Close.com API rate limit has been reached. Wait a moment before retrying.';
				break;

			case 500:
			case 502:
			case 503:
			case 504:
				errorType = ErrorType.SERVER;
				message = 'Internal Server Error - Close.com API is experiencing issues';
				description =
					'This is a server-side error. Please try again later or contact Close.com support.';
				break;

			default:
				if (status >= 400 && status < 500) {
					errorType = ErrorType.VALIDATION;
				} else if (status >= 500) {
					errorType = ErrorType.SERVER;
				}
		}

		return this.createParsedError(error, context, message, description, errorType, httpCode);
	}

	/**
	 * Parse error message from Close.com API response data
	 */
	private parseErrorMessage(data: any): { message: string; description: string } | null {
		if (typeof data === 'string') {
			return { message: data, description: '' };
		}

		if (!data || typeof data !== 'object') {
			return null;
		}

		// Handle validation errors array
		if (data.errors && Array.isArray(data.errors)) {
			const errorMessages = data.errors.map((err: any) => {
				if (typeof err === 'string') return err;
				if (err.field && err.code) return `${err.field}: ${err.code}`;
				if (err.message) return err.message;
				return JSON.stringify(err);
			});
			return {
				message: `Validation errors: ${errorMessages.join(', ')}`,
				description: `Please check the following fields: ${errorMessages.join('; ')}`,
			};
		}

		// Handle Close.com specific field-errors format (with hyphen)
		if (data['field-errors']) {
			const fieldErrors = Object.entries(data['field-errors']).map(
				([field, errors]: [string, any]) => {
					const errorList = Array.isArray(errors) ? errors.join(', ') : errors;
					return `${field}: ${errorList}`;
				},
			);
			return {
				message: `Field validation errors: ${fieldErrors.join('; ')}`,
				description: `Please correct the following fields: ${fieldErrors.join('; ')}`,
			};
		}

		// Handle field_errors format (with underscore)
		if (data.field_errors) {
			const fieldErrors = Object.entries(data.field_errors).map(
				([field, errors]: [string, any]) => {
					const errorList = Array.isArray(errors) ? errors.join(', ') : errors;
					return `${field}: ${errorList}`;
				},
			);
			return {
				message: `Field validation errors: ${fieldErrors.join('; ')}`,
				description: `Please correct the following fields: ${fieldErrors.join('; ')}`,
			};
		}

		// Handle standard error formats
		if (data.error) {
			return {
				message: data.error,
				description: data.error_description || '',
			};
		}

		if (data.detail) {
			return { message: data.detail, description: '' };
		}

		if (data.message) {
			return { message: data.message, description: '' };
		}

		// Fallback: show the entire data object
		return {
			message: `API Error: ${JSON.stringify(data)}`,
			description: '',
		};
	}
}
