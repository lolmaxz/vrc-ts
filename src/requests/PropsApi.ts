import { BadRequestParameter } from '../errors';
import { ApiPaths } from '../types/ApiPaths';
import { executeRequestType } from '../types/Generics';
import * as PropTypes from '../types/Props';
import { VRChatAPI } from '../VRChatAPI';
import { BaseApi } from './BaseApi';

export class PropsApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    public async listProps({
        n,
        offset,
        userId,
        releaseStatus,
    }: PropTypes.listPropsRequest = {}): Promise<PropTypes.Prop[]> {
        const parameters: URLSearchParams = new URLSearchParams();
        if (n) {
            if (!(n >= 1 && n <= 100)) throw new BadRequestParameter('n must be between 1 and 100!');
            parameters.append('n', n.toString());
        }
        if (offset !== undefined && offset >= 0) parameters.append('offset', offset.toString());
        if (userId) parameters.append('userId', userId);
        if (releaseStatus) parameters.append('releaseStatus', releaseStatus);

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.props.listProps,
            pathFormated: ApiPaths.props.listProps.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<PropTypes.Prop[]>(paramRequest);
    }

    public async getProp({ propId }: PropTypes.getPropRequest): Promise<PropTypes.Prop> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.props.getProp,
            pathFormated: ApiPaths.props.getProp.path.replace('{propId}', propId),
        };

        return await this.executeRequest<PropTypes.Prop>(paramRequest);
    }

    /**
     * Official lists this path. Live VRChat currently 404s:
     * "The endpoint you're looking for is not implemented by our system."
     */
    public async getPropPublishStatus({ propId }: PropTypes.getPropRequest): Promise<PropTypes.PropPublishStatus> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.props.getPropPublishStatus,
            pathFormated: ApiPaths.props.getPropPublishStatus.path.replace('{propId}', propId),
        };

        return await this.executeRequest<PropTypes.PropPublishStatus>(paramRequest);
    }
}
