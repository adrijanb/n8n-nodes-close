import { NodeApiError } from 'n8n-workflow';
import { IErrorFormatter, ParsedError } from './AbstractErrorHandler';
/**
 * Error formatter specifically for Close.com API integration with n8n
 */
export declare class CloseErrorFormatter implements IErrorFormatter {
    format(parsedError: ParsedError): NodeApiError;
    /**
     * Build context information string for the error message
     */
    private buildContextInfo;
    /**
     * Determine if request body should be included in error details
     */
    private shouldIncludeRequestBody;
    /**
     * Get troubleshooting hints based on error type
     */
    private getTroubleshootingHint;
}
