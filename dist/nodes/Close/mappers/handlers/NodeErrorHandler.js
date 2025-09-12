"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeErrorHandler = void 0;
const AbstractErrorHandler_1 = require("../AbstractErrorHandler");
/**
 * Handler for Node.js runtime errors and application-specific errors
 */
class NodeErrorHandler extends AbstractErrorHandler_1.AbstractErrorHandler {
    constructor() {
        super(...arguments);
        this.priority = 3;
    }
    canHandle(error) {
        return error instanceof Error || (error === null || error === void 0 ? void 0 : error.name) || (error === null || error === void 0 ? void 0 : error.message);
    }
    handle(error, context) {
        let message = 'Application error';
        let description = '';
        let errorType = AbstractErrorHandler_1.ErrorType.UNKNOWN;
        // Handle based on error name/type
        if (error.name) {
            switch (error.name) {
                case 'TypeError':
                    errorType = AbstractErrorHandler_1.ErrorType.VALIDATION;
                    message = `Type error: ${error.message}`;
                    description =
                        'There was a type mismatch in the data. Please check your input parameters.';
                    break;
                case 'ReferenceError':
                    errorType = AbstractErrorHandler_1.ErrorType.UNKNOWN;
                    message = `Reference error: ${error.message}`;
                    description =
                        'An undefined variable or function was referenced. This may be a configuration issue.';
                    break;
                case 'SyntaxError':
                    errorType = AbstractErrorHandler_1.ErrorType.VALIDATION;
                    message = `Syntax error: ${error.message}`;
                    description =
                        'There was a syntax error in the provided data. Please check JSON formatting and data structure.';
                    break;
                case 'ValidationError':
                    errorType = AbstractErrorHandler_1.ErrorType.VALIDATION;
                    message = `Validation error: ${error.message}`;
                    description =
                        'The provided data failed validation. Please check the required fields and data formats.';
                    break;
                case 'TimeoutError':
                    errorType = AbstractErrorHandler_1.ErrorType.NETWORK;
                    message = `Timeout error: ${error.message}`;
                    description =
                        'The operation timed out. Please try again or check your network connection.';
                    break;
                default:
                    message = error.message || `${error.name} occurred`;
                    description = this.getErrorDescription(error);
            }
        }
        else if (error.message) {
            message = error.message;
            description = this.getErrorDescription(error);
        }
        // Check for specific error patterns in the message
        if (message.toLowerCase().includes('json')) {
            errorType = AbstractErrorHandler_1.ErrorType.VALIDATION;
            description = 'Invalid JSON format. Please check your JSON syntax and data structure.';
        }
        else if (message.toLowerCase().includes('timeout')) {
            errorType = AbstractErrorHandler_1.ErrorType.NETWORK;
        }
        else if (message.toLowerCase().includes('permission') ||
            message.toLowerCase().includes('unauthorized')) {
            errorType = AbstractErrorHandler_1.ErrorType.AUTHORIZATION;
        }
        return this.createParsedError(error, context, message, description, errorType);
    }
    /**
     * Get a descriptive error description based on the error object
     */
    getErrorDescription(error) {
        const parts = [];
        if (error.stack) {
            // Extract the first few lines of the stack trace for context
            const stackLines = error.stack.split('\n').slice(0, 3);
            parts.push(`Stack trace: ${stackLines.join(' -> ')}`);
        }
        if (error.code && typeof error.code === 'string') {
            parts.push(`Error code: ${error.code}`);
        }
        if (error.errno) {
            parts.push(`Error number: ${error.errno}`);
        }
        return parts.join('\n');
    }
}
exports.NodeErrorHandler = NodeErrorHandler;
