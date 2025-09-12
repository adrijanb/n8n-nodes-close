import { NodeApiError } from 'n8n-workflow';
/**
 * Legacy function for handling Close API errors
 * @deprecated Use CloseErrorHandlerManager.handleError() instead
 *
 * This function is maintained for backward compatibility with existing code.
 * New implementations should use the abstracted error handling system.
 */
export declare function handleCloseApiError(error: any, resource: string, operation: string, requestBody?: any): NodeApiError;
