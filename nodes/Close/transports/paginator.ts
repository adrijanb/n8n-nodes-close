import { CloseHttpClient } from './httpClient';

export interface PaginationOptions {
	limit?: number;
	skip?: number;
	returnAll?: boolean;
}

export class ClosePaginator {
	constructor(private httpClient: CloseHttpClient) {}

	async getAll(
		endpoint: string,
		options: PaginationOptions = {},
		qs: any = {},
	): Promise<any[]> {
		const { returnAll = false, limit = 50 } = options;
		
		let hasMore = true;
		let skip = options.skip || 0;
		const results: any[] = [];

		while (hasMore) {
			const queryParams = {
				...qs,
				_limit: returnAll ? 100 : Math.min(limit - results.length, 100),
				_skip: skip,
			};

			const response = await this.httpClient.makeRequest('GET', endpoint, undefined, queryParams);
			
			const data = response.data || response;
			if (Array.isArray(data)) {
				results.push(...data);
			} else if (data && Array.isArray(data.data)) {
				results.push(...data.data);
			} else {
				break;
			}

			if (!returnAll && results.length >= limit) {
				return results.slice(0, limit);
			}

			// Check if there are more results
			hasMore = response.has_more || (data.length === queryParams._limit);
			skip += queryParams._limit;

			// Prevent infinite loops
			if (!hasMore || (data.length === 0)) {
				break;
			}
		}

		return results;
	}
}