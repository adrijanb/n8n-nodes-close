import {
	AbstractErrorHandler,
	ErrorContext,
	ErrorType,
	ParsedError,
} from '../AbstractErrorHandler';

/**
 * Handler for Node.js runtime errors and application-specific errors
 */
export class NodeErrorHandler extends AbstractErrorHandler {
	priority = 3;

	canHandle(error: any): boolean {
		return error instanceof Error || error?.name || error?.message;
	}

	handle(error: any, context: ErrorContext): ParsedError {
		let message = 'Application error';
		let description = '';
		let errorType = ErrorType.UNKNOWN;

		// Handle based on error name/type
		if (error.name) {
			switch (error.name) {
				case 'TypeError':
					errorType = ErrorType.VALIDATION;
					message = `Type error: ${error.message}`;
					description =
						'There was a type mismatch in the data. Please check your input parameters.';
					break;

				case 'ReferenceError':
					errorType = ErrorType.UNKNOWN;
					message = `Reference error: ${error.message}`;
					description =
						'An undefined variable or function was referenced. This may be a configuration issue.';
					break;

				case 'SyntaxError':
					errorType = ErrorType.VALIDATION;
					message = `Syntax error: ${error.message}`;
					description =
						'There was a syntax error in the provided data. Please check JSON formatting and data structure.';
					break;

				case 'ValidationError':
					errorType = ErrorType.VALIDATION;
					message = `Validation error: ${error.message}`;
					description =
						'The provided data failed validation. Please check the required fields and data formats.';
					break;

				case 'TimeoutError':
					errorType = ErrorType.NETWORK;
					message = `Timeout error: ${error.message}`;
					description =
						'The operation timed out. Please try again or check your network connection.';
					break;

				default:
					message = error.message || `${error.name} occurred`;
					description = this.getErrorDescription(error);
			}
		} else if (error.message) {
			message = error.message;
			description = this.getErrorDescription(error);
		}

		// Check for specific error patterns in the message
		if (message.toLowerCase().includes('json')) {
			errorType = ErrorType.VALIDATION;
			description = 'Invalid JSON format. Please check your JSON syntax and data structure.';
		} else if (message.toLowerCase().includes('timeout')) {
			errorType = ErrorType.NETWORK;
		} else if (
			message.toLowerCase().includes('permission') ||
			message.toLowerCase().includes('unauthorized')
		) {
			errorType = ErrorType.AUTHORIZATION;
		}

		return this.createParsedError(error, context, message, description, errorType);
	}

	/**
	 * Get a descriptive error description based on the error object
	 */
	private getErrorDescription(error: any): string {
		const parts: string[] = [];

		if (error.stack) {
			// Extract the first few lines of the stack trace for context
			const stackLines = error.stack.split('\n').slice(0, 3);
			parts.push(`Stack trace: ${stackLines.join(' -> ')}`);
		}

		if (error.code && typeof error.code === 'string') {
			parts.push(`Error code: ${error.code}`);
		}

		if (error.errno) {
			parts.push(`Error number: ${error.errno}`);
		}

		return parts.join('\n');
	}
}
