"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseErrorFormatter = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const AbstractErrorHandler_1 = require("./AbstractErrorHandler");
/**
 * Error formatter specifically for Close.com API integration with n8n
 */
class CloseErrorFormatter {
    format(parsedError) {
        const { message, description, httpCode, errorType, originalError, context } = parsedError;
        // Build the formatted message with context
        const contextInfo = this.buildContextInfo(context);
        const formattedMessage = `Close.com API Error${contextInfo} - ${message}`;
        // Build the formatted description
        let formattedDescription = description;
        // Add helpful context information to the description
        if (!formattedDescription && context.operation && context.resource) {
            formattedDescription = `Operation: ${context.operation} on ${context.resource}`;
        }
        // Add request body information for debugging (if enabled and not sensitive)
        if (context.requestBody && this.shouldIncludeRequestBody(errorType)) {
            const requestBodyStr = JSON.stringify(context.requestBody, null, 2);
            if (formattedDescription) {
                formattedDescription += `\n\nRequest data: ${requestBodyStr}`;
            }
            else {
                formattedDescription = `Request data: ${requestBodyStr}`;
            }
        }
        // Add item index information for batch operations
        if (context.itemIndex !== undefined) {
            formattedDescription += `\n\nItem index: ${context.itemIndex}`;
        }
        // Add troubleshooting hints based on error type
        const troubleshootingHint = this.getTroubleshootingHint(errorType);
        if (troubleshootingHint) {
            formattedDescription += `\n\nTroubleshooting: ${troubleshootingHint}`;
        }
        // Create and return the NodeApiError
        return new n8n_workflow_1.NodeApiError(originalError, {
            message: formattedMessage,
            description: formattedDescription || 'No additional details available',
            httpCode,
        });
    }
    /**
     * Build context information string for the error message
     */
    buildContextInfo(context) {
        const parts = [];
        if (context.resource && context.operation) {
            parts.push(`[${context.resource}:${context.operation}]`);
        }
        else if (context.resource) {
            parts.push(`[${context.resource}]`);
        }
        else if (context.operation) {
            parts.push(`[${context.operation}]`);
        }
        if (context.endpoint && context.method) {
            parts.push(`[${context.method} ${context.endpoint}]`);
        }
        return parts.length > 0 ? ` ${parts.join(' ')}` : '';
    }
    /**
     * Determine if request body should be included in error details
     */
    shouldIncludeRequestBody(errorType) {
        // Include request body for validation errors to help debugging
        return errorType === AbstractErrorHandler_1.ErrorType.VALIDATION;
    }
    /**
     * Get troubleshooting hints based on error type
     */
    getTroubleshootingHint(errorType) {
        switch (errorType) {
            case AbstractErrorHandler_1.ErrorType.AUTHENTICATION:
                return 'Check that your Close.com API key is correct and properly configured in the credentials.';
            case AbstractErrorHandler_1.ErrorType.AUTHORIZATION:
                return 'Verify that your API key has the necessary permissions for this operation. Contact your Close.com administrator if needed.';
            case AbstractErrorHandler_1.ErrorType.VALIDATION:
                return 'Review the required fields and data formats. Check the Close.com API documentation for valid values.';
            case AbstractErrorHandler_1.ErrorType.NOT_FOUND:
                return 'Verify that the resource ID exists and that you have access to it. The resource might have been deleted or moved.';
            case AbstractErrorHandler_1.ErrorType.RATE_LIMIT:
                return 'Reduce the frequency of your requests. Consider adding delays between operations or using fewer parallel requests.';
            case AbstractErrorHandler_1.ErrorType.NETWORK:
                return 'Check your internet connection and firewall settings. The Close.com API might be temporarily unavailable.';
            case AbstractErrorHandler_1.ErrorType.SERVER:
                return 'This is a temporary server issue. Wait a few minutes and try again. If the problem persists, contact Close.com support.';
            default:
                return 'If this error persists, please check the Close.com API documentation or contact support for assistance.';
        }
    }
}
exports.CloseErrorFormatter = CloseErrorFormatter;
