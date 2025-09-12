import { AbstractErrorHandler, ErrorContext, ParsedError } from '../AbstractErrorHandler';
/**
 * Handler for network-related errors (connection, timeout, etc.)
 */
export declare class NetworkErrorHandler extends AbstractErrorHandler {
    priority: number;
    canHandle(error: any): boolean;
    handle(error: any, context: ErrorContext): ParsedError;
}
