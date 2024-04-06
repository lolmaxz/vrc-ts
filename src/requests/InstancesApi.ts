import { VRChatAPI } from '../VRChatAPI';
import { ApiPaths } from '../types/ApiPaths';
import { BaseApi } from './BaseApi';
import * as Inst from '../types/Instances';
import { RequestSuccess, executeRequestType } from '../types/Generics';

/**
 * This class is used to make requests to the Instance API.
 */
export class InstanceApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    /**
     * Returns an instance. Please read [Instances Tutorial from VRChat API Docs](https://vrchatapi.github.io/tutorials/instances/) for more information on Instances.
     *
     * If an invalid instanceId is provided, this endpoint will simply return "null"!
     */
    public async getInstance({ worldId, instanceId }: Inst.GetInstanceRequest): Promise<Inst.InstanceShortName> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.instances.getInstance,
            pathFormated: ApiPaths.instances.getInstance.path
                .replace('{worldId}', worldId)
                .replace('{instanceId}', instanceId),
        };

        return await this.executeRequest<Inst.InstanceShortName>(paramRequest);
    }

    /**
     * Returns an instance short name.
     */
    public async getInstanceShortName({
        worldId,
        instanceId,
    }: Inst.GetInstanceShortNameRequest): Promise<Inst.InstanceShortName> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.instances.getInstanceShortName,
            pathFormated: ApiPaths.instances.getInstanceShortName.path
                .replace('{worldId}', worldId)
                .replace('{instanceId}', instanceId),
        };

        return await this.executeRequest<Inst.InstanceShortName>(paramRequest);
    }

    /**
     * Sends an invite to the instance to yourself.
     */
    public async sendSelfInvite({ worldId, instanceId }: Inst.SendSelfInviteRequest): Promise<RequestSuccess> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.instances.sendSelfInvite,
            pathFormated: ApiPaths.instances.sendSelfInvite.path
                .replace('{worldId}', worldId)
                .replace('{instanceId}', instanceId),
        };

        return await this.executeRequest<RequestSuccess>(paramRequest);
    }

    /**
     * Returns an instance. Please read [Instances Tutorial from VRChat API Docs](https://vrchatapi.github.io/tutorials/instances/) for more information on Instances.
     */
    public async getInstanceByShortName({ shortName }: Inst.GetInstanceByShortName): Promise<Inst.InstanceShortName> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.instances.getInstanceByShortName,
            pathFormated: ApiPaths.instances.getInstanceByShortName.path.replace('{shortName}', shortName),
        };

        return await this.executeRequest<Inst.InstanceShortName>(paramRequest);
    }

    /**
     * Return a `instance` type object from the new instance being created.
     */
    public createRegularInstance({
        worldId,
        ownerId,
        region,
    }: Inst.CreateRegularInstanceRequest): Promise<Inst.Instance> {
        const body: Inst.CreateRegularInstanceRequest = {
            worldId,
            ownerId,
            region,
        };

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.instances.createInstance,
            pathFormated: ApiPaths.instances.createInstance.path,
            body: body,
        };

        return this.executeRequest<Inst.Instance>(paramRequest);
    }
}
