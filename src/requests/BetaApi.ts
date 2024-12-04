import { VRChatAPI } from '../VRChatAPI';
import { ApiPaths } from '../types/ApiPaths';
import * as BETA from '../types/Beta';
import { executeRequestType } from '../types/Generics';
import { BaseApi } from './BaseApi';

/**
 * This class is used to make requests to the Avatars API.
 */
export class BetaApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    /**
     * Get information about the current closed beta for iOS.
     */
    public async getIOSClosedBetaInformation(): Promise<BETA.BetaIOSInformation> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.beta.getIOSClosedBetaInformation,
            pathFormated: ApiPaths.beta.getIOSClosedBetaInformation.path,
        };

        return await this.executeRequest<BETA.BetaIOSInformation>(paramRequest);
    }
}
