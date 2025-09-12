import { AbstractErrorHandler, ErrorContext, ParsedError } from '../AbstractErrorHandler';
/**
 * Handler for Node.js runtime errors and application-specific errors
 */
export declare class NodeErrorHandler extends AbstractErrorHandler {
    priority: number;
    canHandle(error: any): boolean;
    handle(error: any, context: ErrorContext): ParsedError;
    /**
     * Get a descriptive error description based on the error object
     */
    private getErrorDescription;
}
