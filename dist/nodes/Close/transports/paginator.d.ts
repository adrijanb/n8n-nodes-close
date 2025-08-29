import { CloseHttpClient } from './httpClient';
export interface PaginationOptions {
    limit?: number;
    skip?: number;
    returnAll?: boolean;
}
export declare class ClosePaginator {
    private httpClient;
    constructor(httpClient: CloseHttpClient);
    getAll(endpoint: string, options?: PaginationOptions, qs?: any): Promise<any[]>;
}
