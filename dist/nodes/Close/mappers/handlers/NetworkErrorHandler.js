"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkErrorHandler = void 0;
const AbstractErrorHandler_1 = require("../AbstractErrorHandler");
/**
 * Handler for network-related errors (connection, timeout, etc.)
 */
class NetworkErrorHandler extends AbstractErrorHandler_1.AbstractErrorHandler {
    constructor() {
        super(...arguments);
        this.priority = 2;
    }
    canHandle(error) {
        return (error === null || error === void 0 ? void 0 : error.code) !== undefined && !(error === null || error === void 0 ? void 0 : error.response);
    }
    handle(error, context) {
        let message = 'Network error';
        let description = '';
        const errorType = AbstractErrorHandler_1.ErrorType.NETWORK;
        switch (error.code) {
            case 'ECONNREFUSED':
                message = 'Connection refused - Cannot reach Close.com API';
                description =
                    'Please check your internet connection and verify that the Close.com API is accessible';
                break;
            case 'ETIMEDOUT':
            case 'ESOCKETTIMEDOUT':
                message = 'Request timeout - Close.com API did not respond in time';
                description =
                    'The request took too long. Please try again or check your network connection.';
                break;
            case 'ECONNRESET':
                message = 'Connection reset - The connection to Close.com API was interrupted';
                description = 'The connection was lost during the request. Please try again.';
                break;
            case 'ENOTFOUND':
                message = 'DNS resolution failed - Cannot resolve Close.com API hostname';
                description = 'Please check your internet connection and DNS settings';
                break;
            case 'ECONNABORTED':
                message = 'Request aborted - The connection was cancelled';
                description =
                    'The request was cancelled before completion. This might be due to network issues.';
                break;
            case 'ENETWORK':
            case 'ENETUNREACH':
                message = 'Network unreachable - Cannot connect to Close.com API';
                description = 'Please check your internet connection and firewall settings';
                break;
            case 'EHOSTUNREACH':
                message = 'Host unreachable - Cannot reach Close.com servers';
                description =
                    'The Close.com servers may be temporarily unavailable. Please try again later.';
                break;
            case 'CERT_HAS_EXPIRED':
            case 'CERT_UNTRUSTED':
            case 'UNABLE_TO_VERIFY_LEAF_SIGNATURE':
                message = 'SSL Certificate error - Cannot verify Close.com API certificate';
                description =
                    'There is an issue with the SSL certificate. This might be a security concern.';
                break;
            default:
                message = `Network error: ${error.code}`;
                description = error.message || 'An unknown network error occurred';
        }
        // Add additional context if available
        if (context.endpoint) {
            description += ` (Endpoint: ${context.endpoint})`;
        }
        return this.createParsedError(error, context, message, description, errorType);
    }
}
exports.NetworkErrorHandler = NetworkErrorHandler;
