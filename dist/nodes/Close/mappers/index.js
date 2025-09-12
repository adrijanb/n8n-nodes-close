"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCloseApiError = exports.NodeErrorHandler = exports.NetworkErrorHandler = exports.HttpErrorHandler = exports.closeErrorHandler = exports.CloseErrorHandlerManager = exports.CloseErrorFormatter = exports.ErrorType = exports.ErrorHandlerManager = exports.AbstractErrorHandler = void 0;
// Export the main error handling components
var AbstractErrorHandler_1 = require("./AbstractErrorHandler");
Object.defineProperty(exports, "AbstractErrorHandler", { enumerable: true, get: function () { return AbstractErrorHandler_1.AbstractErrorHandler; } });
Object.defineProperty(exports, "ErrorHandlerManager", { enumerable: true, get: function () { return AbstractErrorHandler_1.ErrorHandlerManager; } });
Object.defineProperty(exports, "ErrorType", { enumerable: true, get: function () { return AbstractErrorHandler_1.ErrorType; } });
var CloseErrorFormatter_1 = require("./CloseErrorFormatter");
Object.defineProperty(exports, "CloseErrorFormatter", { enumerable: true, get: function () { return CloseErrorFormatter_1.CloseErrorFormatter; } });
var CloseErrorHandlerManager_1 = require("./CloseErrorHandlerManager");
Object.defineProperty(exports, "CloseErrorHandlerManager", { enumerable: true, get: function () { return CloseErrorHandlerManager_1.CloseErrorHandlerManager; } });
Object.defineProperty(exports, "closeErrorHandler", { enumerable: true, get: function () { return CloseErrorHandlerManager_1.closeErrorHandler; } });
// Export specific error handlers
var HttpErrorHandler_1 = require("./handlers/HttpErrorHandler");
Object.defineProperty(exports, "HttpErrorHandler", { enumerable: true, get: function () { return HttpErrorHandler_1.HttpErrorHandler; } });
var NetworkErrorHandler_1 = require("./handlers/NetworkErrorHandler");
Object.defineProperty(exports, "NetworkErrorHandler", { enumerable: true, get: function () { return NetworkErrorHandler_1.NetworkErrorHandler; } });
var NodeErrorHandler_1 = require("./handlers/NodeErrorHandler");
Object.defineProperty(exports, "NodeErrorHandler", { enumerable: true, get: function () { return NodeErrorHandler_1.NodeErrorHandler; } });
// Export legacy function for backward compatibility
var error_1 = require("./error");
Object.defineProperty(exports, "handleCloseApiError", { enumerable: true, get: function () { return error_1.handleCloseApiError; } });
