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
export enum ErrorType {
	VALIDATION = 'validation',
	AUTHENTICATION = 'authentication',
	AUTHORIZATION = 'authorization',
	NOT_FOUND = 'not_found',
	RATE_LIMIT = 'rate_limit',
	NETWORK = 'network',
	SERVER = 'server',
	UNKNOWN = 'unknown',
}

/**
 * Interface for error handlers
 */
export interface IErrorHandler {
	canHandle(error: any): boolean;
	handle(error: any, context: ErrorContext): ParsedError;
	priority: number; // Lower number = higher priority
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
export abstract class AbstractErrorHandler implements IErrorHandler {
	abstract priority: number;
	abstract canHandle(error: any): boolean;
	abstract handle(error: any, context: ErrorContext): ParsedError;

	protected createParsedError(
		error: any,
		context: ErrorContext,
		message: string,
		description: string,
		errorType: ErrorType,
		httpCode?: string,
	): ParsedError {
		return {
			message,
			description,
			httpCode,
			errorType,
			originalError: error,
			context,
		};
	}
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
export class ErrorHandlerManager {
	private handlers: IErrorHandler[] = [];
	private formatter: IErrorFormatter;
	private config: ErrorHandlerConfig;

	constructor(formatter: IErrorFormatter, config: ErrorHandlerConfig = {}) {
		this.formatter = formatter;
		this.config = {
			enableDebugLogging: true,
			logLevel: 'debug',
			includeRequestBodyInError: true,
			maxDescriptionLength: 2000,
			...config,
		};
	}

	/**
	 * Register an error handler
	 */
	registerHandler(handler: IErrorHandler): void {
		this.handlers.push(handler);
		// Sort handlers by priority (lower number = higher priority)
		this.handlers.sort((a, b) => a.priority - b.priority);
	}

	/**
	 * Handle an error and return a formatted NodeApiError
	 */
	handleError(error: any, context: ErrorContext): NodeApiError {
		this.logDebug('=== ERROR HANDLER DEBUG ===', {
			context,
			error: this.sanitizeError(error),
		});

		let parsedError: ParsedError | null = null;

		// Find the first handler that can handle this error
		for (const handler of this.handlers) {
			if (handler.canHandle(error)) {
				try {
					parsedError = handler.handle(error, context);
					this.logDebug(`Error handled by: ${handler.constructor.name}`, parsedError);
					break;
				} catch (handlerError) {
					this.logDebug(`Handler ${handler.constructor.name} failed:`, handlerError);
					continue;
				}
			}
		}

		// If no handler could process the error, create a fallback
		if (!parsedError) {
			parsedError = this.createFallbackError(error, context);
			this.logDebug('Using fallback error handler', parsedError);
		}

		// Apply configuration constraints
		if (
			this.config.maxDescriptionLength &&
			parsedError.description.length > this.config.maxDescriptionLength
		) {
			parsedError.description =
				parsedError.description.substring(0, this.config.maxDescriptionLength) + '...';
		}

		this.logDebug('=== END ERROR HANDLER DEBUG ===');

		return this.formatter.format(parsedError);
	}

	/**
	 * Create a fallback error when no specific handler can process the error
	 */
	private createFallbackError(error: any, context: ErrorContext): ParsedError {
		let message = 'Unknown error occurred';
		let description = '';

		if (error?.message) {
			message = error.message;
		} else if (typeof error === 'string') {
			message = error;
		}

		if (error?.stack && this.config.enableDebugLogging) {
			description = `Error details: ${error.stack}`;
		}

		return {
			message,
			description,
			errorType: ErrorType.UNKNOWN,
			originalError: error,
			context,
		};
	}

	/**
	 * Sanitize error object for logging (remove sensitive data)
	 */
	private sanitizeError(error: any): any {
		if (!error) return error;

		const sanitized = { ...error };

		// Remove potentially sensitive headers
		if (sanitized.config?.headers) {
			const headers = { ...sanitized.config.headers };
			if (headers.Authorization) headers.Authorization = '[REDACTED]';
			if (headers.authorization) headers.authorization = '[REDACTED]';
			sanitized.config.headers = headers;
		}

		// Remove credentials from auth
		if (sanitized.config?.auth) {
			sanitized.config.auth = { ...sanitized.config.auth };
			if (sanitized.config.auth.username) sanitized.config.auth.username = '[REDACTED]';
			if (sanitized.config.auth.password) sanitized.config.auth.password = '[REDACTED]';
		}

		return sanitized;
	}

	/**
	 * Debug logging method
	 */
	private logDebug(message: string, data?: any): void {
		if (!this.config.enableDebugLogging) return;

		console.log(message);
		if (data) {
			try {
				console.log(JSON.stringify(data, this.createCircularReplacer(), 2));
			} catch (error) {
				console.log('[Error serializing debug data]:', String(data));
			}
		}
	}

	/**
	 * Creates a replacer function to handle circular references in JSON.stringify
	 */
	private createCircularReplacer() {
		const seen = new WeakSet();
		return (key: string, value: any) => {
			if (typeof value === 'object' && value !== null) {
				if (seen.has(value)) {
					return '[Circular Reference]';
				}
				seen.add(value);
			}
			return value;
		};
	}
}
