import { IExecuteFunctions, ILoadOptionsFunctions, INodeExecutionData, INodePropertyOptions, INodeType, INodeTypeDescription } from 'n8n-workflow';
export declare class Close implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getLeadStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getLeadCustomFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getContactCustomFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getOpportunityCustomFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getOpportunityStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
