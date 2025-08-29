import { NodeApiError } from 'n8n-workflow';

export function handleCloseApiError(error: any, resource: string, operation: string): NodeApiError {
	let message = 'Unknown error occurred';
	let description = '';
	
	if (error.response) {
		const { status, data } = error.response;
		
		if (data) {
			if (typeof data === 'string') {
				message = data;
			} else if (data.error) {
				message = data.error;
				if (data.error_description) {
					description = data.error_description;
				}
			} else if (data.detail) {
				message = data.detail;
			} else if (data.message) {
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

	return new NodeApiError(error, {
		message: `Close.com error in ${resource}:${operation} - ${message}`,
		description,
		httpCode: error.response?.status.toString(),
	});
}