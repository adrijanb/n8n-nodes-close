// Export the main error handling components
export {
	AbstractErrorHandler,
	ErrorHandlerManager,
	ErrorContext,
	ParsedError,
	ErrorType,
	IErrorHandler,
	IErrorFormatter,
	ErrorHandlerConfig,
} from './AbstractErrorHandler';

export { CloseErrorFormatter } from './CloseErrorFormatter';
export { CloseErrorHandlerManager, closeErrorHandler } from './CloseErrorHandlerManager';

// Export specific error handlers
export { HttpErrorHandler } from './handlers/HttpErrorHandler';
export { NetworkErrorHandler } from './handlers/NetworkErrorHandler';
export { NodeErrorHandler } from './handlers/NodeErrorHandler';

// Export legacy function for backward compatibility
export { handleCloseApiError } from './error';
