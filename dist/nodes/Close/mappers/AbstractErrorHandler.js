"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerManager = exports.AbstractErrorHandler = exports.ErrorType = void 0;
/**
 * Enum for different types of errors
 */
var ErrorType;
(function (ErrorType) {
    ErrorType["VALIDATION"] = "validation";
    ErrorType["AUTHENTICATION"] = "authentication";
    ErrorType["AUTHORIZATION"] = "authorization";
    ErrorType["NOT_FOUND"] = "not_found";
    ErrorType["RATE_LIMIT"] = "rate_limit";
    ErrorType["NETWORK"] = "network";
    ErrorType["SERVER"] = "server";
    ErrorType["UNKNOWN"] = "unknown";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
/**
 * Abstract base class for error handlers
 */
class AbstractErrorHandler {
    createParsedError(error, context, message, description, errorType, httpCode) {
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
exports.AbstractErrorHandler = AbstractErrorHandler;
/**
 * Main error handler manager that orchestrates different error handlers
 */
class ErrorHandlerManager {
    constructor(formatter, config = {}) {
        this.handlers = [];
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
    registerHandler(handler) {
        this.handlers.push(handler);
        // Sort handlers by priority (lower number = higher priority)
        this.handlers.sort((a, b) => a.priority - b.priority);
    }
    /**
     * Handle an error and return a formatted NodeApiError
     */
    handleError(error, context) {
        this.logDebug('=== ERROR HANDLER DEBUG ===', {
            context,
            error: this.sanitizeError(error),
        });
        let parsedError = null;
        // Find the first handler that can handle this error
        for (const handler of this.handlers) {
            if (handler.canHandle(error)) {
                try {
                    parsedError = handler.handle(error, context);
                    this.logDebug(`Error handled by: ${handler.constructor.name}`, parsedError);
                    break;
                }
                catch (handlerError) {
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
        if (this.config.maxDescriptionLength &&
            parsedError.description.length > this.config.maxDescriptionLength) {
            parsedError.description =
                parsedError.description.substring(0, this.config.maxDescriptionLength) + '...';
        }
        this.logDebug('=== END ERROR HANDLER DEBUG ===');
        return this.formatter.format(parsedError);
    }
    /**
     * Create a fallback error when no specific handler can process the error
     */
    createFallbackError(error, context) {
        let message = 'Unknown error occurred';
        let description = '';
        if (error === null || error === void 0 ? void 0 : error.message) {
            message = error.message;
        }
        else if (typeof error === 'string') {
            message = error;
        }
        if ((error === null || error === void 0 ? void 0 : error.stack) && this.config.enableDebugLogging) {
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
    sanitizeError(error) {
        var _a, _b;
        if (!error)
            return error;
        const sanitized = { ...error };
        // Remove potentially sensitive headers
        if ((_a = sanitized.config) === null || _a === void 0 ? void 0 : _a.headers) {
            const headers = { ...sanitized.config.headers };
            if (headers.Authorization)
                headers.Authorization = '[REDACTED]';
            if (headers.authorization)
                headers.authorization = '[REDACTED]';
            sanitized.config.headers = headers;
        }
        // Remove credentials from auth
        if ((_b = sanitized.config) === null || _b === void 0 ? void 0 : _b.auth) {
            sanitized.config.auth = { ...sanitized.config.auth };
            if (sanitized.config.auth.username)
                sanitized.config.auth.username = '[REDACTED]';
            if (sanitized.config.auth.password)
                sanitized.config.auth.password = '[REDACTED]';
        }
        return sanitized;
    }
    /**
     * Debug logging method
     */
    logDebug(message, data) {
        if (!this.config.enableDebugLogging)
            return;
        console.log(message);
        if (data) {
            console.log(JSON.stringify(data, null, 2));
        }
    }
}
exports.ErrorHandlerManager = ErrorHandlerManager;
