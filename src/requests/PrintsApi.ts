import { Prints } from 'types/Prints';
import { ApiPaths } from '../types/ApiPaths';
import { executeRequestType, UserIdType } from '../types/Generics';
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
}
