import { AbstractErrorHandler, ErrorContext, ParsedError } from '../AbstractErrorHandler';
/**
 * Handler for HTTP response errors (4xx, 5xx status codes)
 */
export declare class HttpErrorHandler extends AbstractErrorHandler {
    priority: number;
    canHandle(error: any): boolean;
    handle(error: any, context: ErrorContext): ParsedError;
    /**
     * Parse error message from Close.com API response data
     */
    private parseErrorMessage;
}
