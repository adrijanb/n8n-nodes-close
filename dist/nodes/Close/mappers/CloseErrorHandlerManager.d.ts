import { ErrorHandlerManager, ErrorHandlerConfig, ErrorContext } from './AbstractErrorHandler';
import { NodeApiError } from 'n8n-workflow';
/**
 * Pre-configured error handler manager for Close.com API integration
 */
export declare class CloseErrorHandlerManager {
    private errorManager;
    constructor(config?: Partial<ErrorHandlerConfig>);
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
    handleError(error: any, resource?: string, operation?: string, requestBody?: any, itemIndex?: number): NodeApiError;
    /**
     * Handle an error with full context object
     *
     * @param error - The original error object
     * @param context - Complete error context
     * @returns Formatted NodeApiError
     */
    handleErrorWithContext(error: any, context: ErrorContext): NodeApiError;
    /**
     * Get the underlying error manager for advanced usage
     */
    getErrorManager(): ErrorHandlerManager;
}
export declare const closeErrorHandler: CloseErrorHandlerManager;
/**
 * Legacy function for backward compatibility
 * @deprecated Use closeErrorHandler.handleError() instead
 */
export declare function handleCloseApiError(error: any, resource: string, operation: string, requestBody?: any): NodeApiError;
