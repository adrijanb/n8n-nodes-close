"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCloseApiError = exports.closeErrorHandler = exports.CloseErrorHandlerManager = void 0;
const AbstractErrorHandler_1 = require("./AbstractErrorHandler");
const CloseErrorFormatter_1 = require("./CloseErrorFormatter");
const HttpErrorHandler_1 = require("./handlers/HttpErrorHandler");
const NetworkErrorHandler_1 = require("./handlers/NetworkErrorHandler");
const NodeErrorHandler_1 = require("./handlers/NodeErrorHandler");
/**
 * Pre-configured error handler manager for Close.com API integration
 */
class CloseErrorHandlerManager {
    constructor(config) {
        const defaultConfig = {
            enableDebugLogging: true,
            logLevel: 'debug',
            includeRequestBodyInError: true,
            maxDescriptionLength: 2000,
        };
        const mergedConfig = { ...defaultConfig, ...config };
        const formatter = new CloseErrorFormatter_1.CloseErrorFormatter();
        this.errorManager = new AbstractErrorHandler_1.ErrorHandlerManager(formatter, mergedConfig);
        // Register error handlers in order of priority
        this.errorManager.registerHandler(new HttpErrorHandler_1.HttpErrorHandler());
        this.errorManager.registerHandler(new NetworkErrorHandler_1.NetworkErrorHandler());
        this.errorManager.registerHandler(new NodeErrorHandler_1.NodeErrorHandler());
    }
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
    handleError(error, resource, operation, requestBody, itemIndex) {
        var _a, _b, _c, _d;
        const context = {
            resource,
            operation,
            requestBody,
            itemIndex,
            endpoint: ((_a = error === null || error === void 0 ? void 0 : error.config) === null || _a === void 0 ? void 0 : _a.url) || ((_b = error === null || error === void 0 ? void 0 : error.request) === null || _b === void 0 ? void 0 : _b.path),
            method: ((_c = error === null || error === void 0 ? void 0 : error.config) === null || _c === void 0 ? void 0 : _c.method) || ((_d = error === null || error === void 0 ? void 0 : error.request) === null || _d === void 0 ? void 0 : _d.method),
        };
        return this.errorManager.handleError(error, context);
    }
    /**
     * Handle an error with full context object
     *
     * @param error - The original error object
     * @param context - Complete error context
     * @returns Formatted NodeApiError
     */
    handleErrorWithContext(error, context) {
        return this.errorManager.handleError(error, context);
    }
    /**
     * Get the underlying error manager for advanced usage
     */
    getErrorManager() {
        return this.errorManager;
    }
}
exports.CloseErrorHandlerManager = CloseErrorHandlerManager;
// Create a singleton instance for easy usage throughout the application
exports.closeErrorHandler = new CloseErrorHandlerManager();
/**
 * Legacy function for backward compatibility
 * @deprecated Use closeErrorHandler.handleError() instead
 */
function handleCloseApiError(error, resource, operation, requestBody) {
    return exports.closeErrorHandler.handleError(error, resource, operation, requestBody);
}
exports.handleCloseApiError = handleCloseApiError;
