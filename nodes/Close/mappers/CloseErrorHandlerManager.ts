import { ErrorHandlerManager, ErrorHandlerConfig, ErrorContext } from './AbstractErrorHandler';
import { CloseErrorFormatter } from './CloseErrorFormatter';
import { HttpErrorHandler } from './handlers/HttpErrorHandler';
import { NetworkErrorHandler } from './handlers/NetworkErrorHandler';
import { NodeErrorHandler } from './handlers/NodeErrorHandler';
import { NodeApiError } from 'n8n-workflow';

/**
 * Pre-configured error handler manager for Close.com API integration
 */
export class CloseErrorHandlerManager {
	private errorManager: ErrorHandlerManager;

	constructor(config?: Partial<ErrorHandlerConfig>) {
		const defaultConfig: ErrorHandlerConfig = {
			enableDebugLogging: true,
			logLevel: 'debug',
			includeRequestBodyInError: true,
			maxDescriptionLength: 2000,
		};

		const mergedConfig = { ...defaultConfig, ...config };
		const formatter = new CloseErrorFormatter();

		this.errorManager = new ErrorHandlerManager(formatter, mergedConfig);

		// Register error handlers in order of priority
		this.errorManager.registerHandler(new HttpErrorHandler());
		this.errorManager.registerHandler(new NetworkErrorHandler());
		this.errorManager.registerHandler(new NodeErrorHandler());
	}

	/**
	 * Handle an error and return a formatted NodeApiError
	 *
	 * @param error - The original error object
	 * @param resource - The resource being operated on (e.g., 'lead', 'contact')
	 * @param operation - The operation being performed (e.g., 'create', 'update')
	 * @param requestBody - The request body data (optional)
	 * @param itemIndex - The item index for batch operations (optional)
	 * @returns Formatted NodeApiError
	 */
	handleError(
		error: any,
		resource?: string,
		operation?: string,
		requestBody?: any,
		itemIndex?: number,
	): NodeApiError {
		const context: ErrorContext = {
			resource,
			operation,
			requestBody,
			itemIndex,
			endpoint: error?.config?.url || error?.request?.path,
			method: error?.config?.method || error?.request?.method,
		};

		return this.errorManager.handleError(error, context);
	}

	/**
	 * Handle an error with full context object
	 *
	 * @param error - The original error object
	 * @param context - Complete error context
	 * @returns Formatted NodeApiError
	 */
	handleErrorWithContext(error: any, context: ErrorContext): NodeApiError {
		return this.errorManager.handleError(error, context);
	}

	/**
	 * Get the underlying error manager for advanced usage
	 */
	getErrorManager(): ErrorHandlerManager {
		return this.errorManager;
	}
}

// Create a singleton instance for easy usage throughout the application
export const closeErrorHandler = new CloseErrorHandlerManager();

/**
 * Legacy function for backward compatibility
 * @deprecated Use closeErrorHandler.handleError() instead
 */
export function handleCloseApiError(
	error: any,
	resource: string,
	operation: string,
	requestBody?: any,
): NodeApiError {
	return closeErrorHandler.handleError(error, resource, operation, requestBody);
}
