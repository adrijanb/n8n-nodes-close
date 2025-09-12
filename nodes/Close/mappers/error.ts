// Legacy error handler - maintained for backward compatibility
// New implementations should use CloseErrorHandlerManager instead

import { NodeApiError } from 'n8n-workflow';
import { closeErrorHandler } from './CloseErrorHandlerManager';

/**
 * Legacy function for handling Close API errors
 * @deprecated Use CloseErrorHandlerManager.handleError() instead
 *
 * This function is maintained for backward compatibility with existing code.
 * New implementations should use the abstracted error handling system.
 */
export function handleCloseApiError(
	error: any,
	resource: string,
	operation: string,
	requestBody?: any,
): NodeApiError {
	// Delegate to the new abstracted error handler
	return closeErrorHandler.handleError(error, resource, operation, requestBody);
}
