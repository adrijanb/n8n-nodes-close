import { NodeApiError } from 'n8n-workflow';
/**
 * Interface for error context information
 */
export interface ErrorContext {
    resource?: string;
    operation?: string;
    requestBody?: any;
    itemIndex?: number;
    endpoint?: string;
    method?: string;
    metadata?: Record<string, any>;
}
/**
 * Interface for parsed error information
 */
export interface ParsedError {
    message: string;
    description: string;
    httpCode?: string;
    errorType: ErrorType;
    originalError: any;
    context: ErrorContext;
}
/**
 * Enum for different types of errors
 */
export declare enum ErrorType {
    VALIDATION = "validation",
    AUTHENTICATION = "authentication",
    AUTHORIZATION = "authorization",
    NOT_FOUND = "not_found",
    RATE_LIMIT = "rate_limit",
    NETWORK = "network",
    SERVER = "server",
    UNKNOWN = "unknown"
}
/**
 * Interface for error handlers
 */
export interface IErrorHandler {
    canHandle(error: any): boolean;
    handle(error: any, context: ErrorContext): ParsedError;
    priority: number;
}
/**
 * Interface for error formatters
 */
export interface IErrorFormatter {
    format(parsedError: ParsedError): NodeApiError;
}
/**
 * Abstract base class for error handlers
 */
export declare abstract class AbstractErrorHandler implements IErrorHandler {
    abstract priority: number;
    abstract canHandle(error: any): boolean;
    abstract handle(error: any, context: ErrorContext): ParsedError;
    protected createParsedError(error: any, context: ErrorContext, message: string, description: string, errorType: ErrorType, httpCode?: string): ParsedError;
}
/**
 * Configuration options for the error handler manager
 */
export interface ErrorHandlerConfig {
    enableDebugLogging?: boolean;
    logLevel?: 'error' | 'warn' | 'info' | 'debug';
    includeRequestBodyInError?: boolean;
    maxDescriptionLength?: number;
}
/**
 * Main error handler manager that orchestrates different error handlers
 */
export declare class ErrorHandlerManager {
    private handlers;
    private formatter;
    private config;
    constructor(formatter: IErrorFormatter, config?: ErrorHandlerConfig);
    /**
     * Register an error handler
     */
    registerHandler(handler: IErrorHandler): void;
    /**
     * Handle an error and return a formatted NodeApiError
     */
    handleError(error: any, context: ErrorContext): NodeApiError;
    /**
     * Create a fallback error when no specific handler can process the error
     */
    private createFallbackError;
    /**
     * Sanitize error object for logging (remove sensitive data)
     */
    private sanitizeError;
    /**
     * Debug logging method
     */
    private logDebug;
    /**
     * Creates a replacer function to handle circular references in JSON.stringify
     */
    private createCircularReplacer;
}
