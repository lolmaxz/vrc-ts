import { ApiPaths } from '../types/ApiPaths';
import { executeRequestType } from '../types/Generics';
import * as Jam from '../types/Jams';
import { VRChatAPI } from '../VRChatAPI';
import { BaseApi } from './BaseApi';

/**
 * This class is used to make requests to the Jams API.
 */
export class JamsApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    /**
     * Get a list of Jams.
     * @returns {Promise<Jam.Jam>}
     */
    public async getJamsList({ isActive, type }: Jam.GetJamsListRequest): Promise<Jam.Jam[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (isActive) {
            parameters.append('active', isActive.toString());
        }

        if (type) {
            parameters.append('type', type);
        }

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.jams.getJamsList,
            pathFormated: ApiPaths.jams.getJamsList.path,
        };

        return await this.executeRequest<Jam.Jam[]>(paramRequest);
    }

    /**
     * Get information about a specific Jam.
     * @param {Jam.GetJamInformationRequest} { jamId }
     * @returns {Promise<Jam.Jam>}
     */
    public async getJamInfo({ jamId }: Jam.GetJamInformationRequest): Promise<Jam.Jam> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.jams.getJamInfo,
            pathFormated: ApiPaths.jams.getJamInfo.path.replace('{jamId}', jamId),
        };

        return await this.executeRequest<Jam.Jam>(paramRequest);
    }

    /**
     * Get a list of Jam submissions.
     * @param {Jam.GetJamInformationRequest} { jamId }
     * @returns {Promise<Jam.JamSubmission[]>}
     */
    public async getJamSubmissions({ jamId }: Jam.GetJamInformationRequest): Promise<Jam.JamSubmission[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.jams.getJamSubmissions,
            pathFormated: ApiPaths.jams.getJamSubmissions.path.replace('{jamId}', jamId),
        };

        return await this.executeRequest<Jam.JamSubmission[]>(paramRequest);
    }
}
