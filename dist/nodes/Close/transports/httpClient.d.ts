import { IExecuteFunctions, IHookFunctions, IHttpRequestMethods } from 'n8n-workflow';
export declare class CloseHttpClient {
    private context;
    constructor(context: IExecuteFunctions | IHookFunctions);
    makeRequest(method: IHttpRequestMethods, endpoint: string, body?: any, qs?: any, headers?: any): Promise<any>;
}
