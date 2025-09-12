"use strict";
// Legacy error handler - maintained for backward compatibility
// New implementations should use CloseErrorHandlerManager instead
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCloseApiError = void 0;
const CloseErrorHandlerManager_1 = require("./CloseErrorHandlerManager");
/**
 * Legacy function for handling Close API errors
 * @deprecated Use CloseErrorHandlerManager.handleError() instead
 *
 * This function is maintained for backward compatibility with existing code.
 * New implementations should use the abstracted error handling system.
 */
function handleCloseApiError(error, resource, operation, requestBody) {
    // Delegate to the new abstracted error handler
    return CloseErrorHandlerManager_1.closeErrorHandler.handleError(error, resource, operation, requestBody);
}
exports.handleCloseApiError = handleCloseApiError;
