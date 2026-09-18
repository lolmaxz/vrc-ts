import { deletePrintRequest, getPrintRequest, Prints } from '../types/Prints';
import { ApiPaths } from '../types/ApiPaths';
import { executeRequestType, RequestSuccess, UserIdType } from '../types/Generics';
import { VRChatAPI } from '../VRChatAPI';
import { BaseApi } from './BaseApi';

export class PrintsApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    public async listPrints(userId: UserIdType): Promise<Prints[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.prints.listPrints,
            pathFormated: ApiPaths.prints.listPrints.path.replace('{userId}', userId),
        };

        return await this.executeRequest<Prints[]>(paramRequest);
    }

    public async getPrint({ printId }: getPrintRequest): Promise<Prints> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.prints.getPrint,
            pathFormated: ApiPaths.prints.getPrint.path.replace('{printId}', printId),
        };

        return await this.executeRequest<Prints>(paramRequest);
    }

    public async deletePrint({ printId }: deletePrintRequest): Promise<RequestSuccess> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.prints.deletePrint,
            pathFormated: ApiPaths.prints.deletePrint.path.replace('{printId}', printId),
        };

        return await this.executeRequest<RequestSuccess>(paramRequest);
    }
}
