# Abstracted Error Handler for n8n Close Nodes

## Overview

The abstracted error handler provides a robust, extensible, and maintainable way to handle errors in the n8n Close.com integration. It replaces the previous monolithic error handling function with a modular system that can handle different types of errors appropriately.

## Architecture

### Core Components

1. **AbstractErrorHandler** - Base interface and abstract class for error handlers
2. **ErrorHandlerManager** - Orchestrates multiple error handlers and manages the error handling flow
3. **CloseErrorFormatter** - Formats parsed errors into n8n NodeApiError objects
4. **CloseErrorHandlerManager** - Pre-configured manager specifically for Close.com API integration

### Specific Error Handlers

1. **HttpErrorHandler** - Handles HTTP response errors (4xx, 5xx status codes)
2. **NetworkErrorHandler** - Handles network-related errors (connection, timeout, etc.)
3. **NodeErrorHandler** - Handles Node.js runtime errors and application-specific errors

## Error Types

The system categorizes errors into the following types:

- `VALIDATION` - Input validation and data format errors
- `AUTHENTICATION` - API key and authentication issues
- `AUTHORIZATION` - Permission and access control errors
- `NOT_FOUND` - Resource not found errors
- `RATE_LIMIT` - API rate limiting errors
- `NETWORK` - Network connectivity issues
- `SERVER` - Server-side errors from the Close.com API
- `UNKNOWN` - Unclassified errors

## Usage

### Basic Usage

```typescript
import { closeErrorHandler } from './mappers/CloseErrorHandlerManager';

try {
	// Your API call here
	const response = await apiCall();
} catch (error) {
	throw closeErrorHandler.handleError(error, 'lead', 'create', requestBody);
}
```

### Advanced Usage with Full Context

```typescript
import { closeErrorHandler, ErrorContext } from './mappers/CloseErrorHandlerManager';

const context: ErrorContext = {
	resource: 'contact',
	operation: 'update',
	endpoint: '/contact/123/',
	method: 'PUT',
	requestBody: { name: 'Updated Contact' },
	itemIndex: 5,
	metadata: { batchId: 'batch-456' },
};

try {
	// Your API call here
	const response = await apiCall();
} catch (error) {
	throw closeErrorHandler.handleErrorWithContext(error, context);
}
```

### Custom Configuration

```typescript
import { CloseErrorHandlerManager } from './mappers/CloseErrorHandlerManager';

const customErrorHandler = new CloseErrorHandlerManager({
	enableDebugLogging: false,
	maxDescriptionLength: 500,
	includeRequestBodyInError: false,
});
```

## Error Handler Priority

Error handlers are processed in order of priority (lower number = higher priority):

1. **HttpErrorHandler** (Priority: 1) - Handles HTTP response errors
2. **NetworkErrorHandler** (Priority: 2) - Handles network errors
3. **NodeErrorHandler** (Priority: 3) - Handles Node.js errors

If no specific handler can process the error, a fallback error is created.

## Extending the Error Handler

### Creating a Custom Error Handler

```typescript
import { AbstractErrorHandler, ErrorContext, ErrorType, ParsedError } from './AbstractErrorHandler';

export class CustomErrorHandler extends AbstractErrorHandler {
	priority = 0; // High priority

	canHandle(error: any): boolean {
		// Return true if this handler can process the error
		return error.customProperty !== undefined;
	}

	handle(error: any, context: ErrorContext): ParsedError {
		// Process the error and return a ParsedError
		return this.createParsedError(
			error,
			context,
			'Custom error message',
			'Custom error description',
			ErrorType.VALIDATION,
		);
	}
}
```

### Registering a Custom Handler

```typescript
import { CloseErrorHandlerManager } from './mappers/CloseErrorHandlerManager';
import { CustomErrorHandler } from './CustomErrorHandler';

const errorHandler = new CloseErrorHandlerManager();
errorHandler.getErrorManager().registerHandler(new CustomErrorHandler());
```

## Migration from Legacy Error Handler

The legacy `handleCloseApiError` function is still available for backward compatibility but is deprecated. To migrate:

### Before (Legacy)

```typescript
import { handleCloseApiError } from './mappers/error';

throw handleCloseApiError(error, 'lead', 'create', requestBody);
```

### After (New System)

```typescript
import { closeErrorHandler } from './mappers/CloseErrorHandlerManager';

throw closeErrorHandler.handleError(error, 'lead', 'create', requestBody);
```

## Configuration Options

| Option                      | Type    | Default | Description                                |
| --------------------------- | ------- | ------- | ------------------------------------------ |
| `enableDebugLogging`        | boolean | true    | Enable debug logging for error handling    |
| `logLevel`                  | string  | 'debug' | Log level for debug messages               |
| `includeRequestBodyInError` | boolean | true    | Include request body in error descriptions |
| `maxDescriptionLength`      | number  | 2000    | Maximum length for error descriptions      |

## Error Context Properties

| Property      | Type   | Description                                              |
| ------------- | ------ | -------------------------------------------------------- |
| `resource`    | string | The resource being operated on (e.g., 'lead', 'contact') |
| `operation`   | string | The operation being performed (e.g., 'create', 'update') |
| `requestBody` | any    | The request body data                                    |
| `itemIndex`   | number | The item index for batch operations                      |
| `endpoint`    | string | The API endpoint being called                            |
| `method`      | string | The HTTP method being used                               |
| `metadata`    | object | Additional metadata for the error                        |

## Benefits

1. **Modularity** - Each error type has its own handler
2. **Extensibility** - Easy to add new error handlers
3. **Consistency** - Uniform error formatting across the application
4. **Maintainability** - Clear separation of concerns
5. **Debugging** - Enhanced error information and context
6. **Backward Compatibility** - Legacy code continues to work
7. **Configuration** - Flexible configuration options
8. **Type Safety** - Full TypeScript support

## Examples

See `examples/error-handler-demo.ts` for comprehensive examples of how to use the error handler system with different types of errors.

## Testing

The error handler system includes comprehensive test coverage. Run tests with:

```bash
npm test -- errorHandler.spec.ts
```

## Troubleshooting

### Common Issues

1. **Handler not triggered** - Check the `canHandle` method logic
2. **Wrong error type** - Verify the error type classification in handlers
3. **Missing context** - Ensure proper context is provided for better error messages
4. **Configuration issues** - Check the configuration options and their values

### Debug Mode

Enable debug mode to see detailed error processing information:

```typescript
const errorHandler = new CloseErrorHandlerManager({
	enableDebugLogging: true,
	logLevel: 'debug',
});
```

This will output detailed logs showing how errors are processed through the handler chain.
