"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCloseApiError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
function handleCloseApiError(error, resource, operation) {
    var _a;
    let message = 'Unknown error occurred';
    let description = '';
    if (error.response) {
        const { status, data } = error.response;
        if (data) {
            if (typeof data === 'string') {
                message = data;
            }
            else if (data.error) {
                message = data.error;
                if (data.error_description) {
                    description = data.error_description;
                }
            }
            else if (data.detail) {
                message = data.detail;
            }
            else if (data.message) {
                message = data.message;
            }
        }
        // Handle specific HTTP status codes
        switch (status) {
            case 401:
                message = 'Unauthorized - Check your API key';
                break;
            case 403:
                message = 'Forbidden - Insufficient permissions';
                break;
            case 404:
                message = `${resource} not found`;
                break;
            case 422:
                message = 'Validation error';
                break;
            case 429:
                message = 'Rate limit exceeded - Please slow down your requests';
                break;
        }
    }
    return new n8n_workflow_1.NodeApiError(error, {
        message: `Close.com error in ${resource}:${operation} - ${message}`,
        description,
        httpCode: (_a = error.response) === null || _a === void 0 ? void 0 : _a.status.toString(),
    });
}
exports.handleCloseApiError = handleCloseApiError;
