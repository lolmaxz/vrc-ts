import { VRChatAPI } from '../VRChatAPI';
import { ApiPaths } from '../types/ApiPaths';
import { RequestSuccess, executeRequestType } from '../types/Generics';
import * as Inst from '../types/Instances';
import { BaseApi } from './BaseApi';

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
     * Returns an instance short name and secure name.
     * The secure name is used mainly for group instance.
     * Only the instance owner can get the short name and secure name.
     */
    public async getInstanceShortName({
        instanceId,
    }: Inst.GetInstanceShortNameRequest): Promise<Inst.InstanceShortName> {
        const parameters: URLSearchParams = new URLSearchParams();

        parameters.append('permanentify', 'true');

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.instances.getInstanceShortName,
            pathFormated: ApiPaths.instances.getInstanceShortName.path.replace('{instanceId}', instanceId),
            queryOptions: parameters,
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
     * This function is used to create a new instance. Returns the instance object that was created.
     * ### **[Important]**
     * - Only for creating instances that are not group instances.
     *
     * @param worldId The ID of the world you want to create an instance in.
     * @param region The region of the instance. Enum: `InstanceRegionType`.
     * @param instanceType The type of instance you are creating. Enum: `InstanceAccessNormalType`.
     * @param instanceCode **[Optional]** The code of the instance. If not provided, a random code will be generated. (Any 1-5 digit number or characters are valid.)
     * @param ownerId **[Optional]** The owner ID of the instance. BUT **is Required if the instance isn't public.** (Must be the USER ID of the bot account this script is controlling).
     *
     * @returns {Promise<Inst.Instance>} The instance object that was created.
     */
    public generateNormalInstance({
        worldId,
        region,
        instanceType,
        instanceCode,
        ownerId,
    }: Inst.CreateRegularInstanceRequest): Promise<Inst.Instance> {
        if (instanceType !== Inst.InstanceAccessNormalType.Public) {
            if (!ownerId) throw new Error('You need to provide the ownerId parameter for a non-public instance!');
        } else {
            if (ownerId)
                console.warn('The ownerId parameter is not required for a public instance! It will be ignored.');
        }

        // gnerate a random code that is 1-5 digits long maximum
        if (!instanceCode) {
            instanceCode = Math.floor(Math.random() * 99999) + 1;
        } else {
            if (instanceCode.toString().length > 5 || instanceCode.toString().length < 1) {
                throw new Error('The instanceCode must be between 1-5 digits/characters long!');
            }
        }

        let instanceId = '';

        instanceId = worldId + ':' + instanceCode;
        const nonce = this.getRandomNonce();

        if (instanceType === Inst.InstanceAccessNormalType.Public) {
            // Public instance type
            instanceId += '~region(' + region + ')';
        } else if (instanceType === Inst.InstanceAccessNormalType.Friends) {
            // Friends instance type
            instanceId += '~friends(' + ownerId + ')~region(' + region + ')~nonce(' + nonce + ')';
        } else if (instanceType === Inst.InstanceAccessNormalType.Friends_Plus) {
            // Friends+ instance type
            instanceId += '~hidden(' + ownerId + ')~region(' + region + ')~nonce(' + nonce + ')';
        } else if (instanceType === Inst.InstanceAccessNormalType.Invite) {
            // Invite instance type
            instanceId += '~private(' + ownerId + ')~region(' + region + ')~nonce(' + nonce + ')';
        } else {
            // Invite+ instance type
            instanceId += '~private(' + ownerId + ')~canRequestInvite~region(' + region + ')~nonce(' + nonce + ')';
        }

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.instances.createNormalInstance,
            pathFormated: ApiPaths.instances.createNormalInstance.path.replace('{instanceId}', instanceId),
        };

        // console.log('instanceId: ', instanceId);

        return this.executeRequest<Inst.Instance>(paramRequest);
    }

    /**
     * This function is used to create a new group instance. Returns the instance object that was created.
     * ### **[Important]**
     * - Only for creating group instances.
     *
     * @param worldId The ID of the world you want to create an instance in.
     * @param groupAccessType The type of group instance you are creating. Enum: `GroupAccessType`.
     * @param ownerId The owner ID of the instance. (Must be the USER ID of the bot account this script is controlling).
     * @param region The region of the instance. Enum: `InstanceRegionType`.
     * @param queueEnabled **[Optional]** If the queue is enabled for the instance. Default is `false`.
     * @param roleIds The role IDs of the group that can join the instance. (You can get the role IDs from the group object).
     * @param instanceCode **[Optional]** The code of the instance. If not provided, a random code will be generated. (Any 1-5 digit number or characters are valid.)
     *
     * @returns {Promise<Inst.Instance>} The instance object that was created.
     */
    public generateGroupInstance({
        worldId,
        groupAccessType,
        groupId,
        region,
        queueEnabled = false,
        roleIds,
        instanceCode,
    }: Inst.CreateGroupInstanceRequest): Promise<Inst.Instance> {
        // gnerate a random code that is 1-5 digits long maximum
        if (!instanceCode) {
            instanceCode = Math.floor(Math.random() * 99999) + 1;
        } else {
            if (instanceCode.toString().length > 5 || instanceCode.toString().length < 1) {
                throw new Error('The instanceCode must be between 1-5 digits/characters long!');
            }
        }

        // making sure all the role IDs are valid and starts with grol_
        roleIds.forEach((roleId) => {
            if (!roleId.startsWith('grol_')) {
                throw new Error('The roleIds are supposed to start with "grol_"! Now cancelling the request.');
            }
        });

        const ownerId = groupId;

        const body: Inst.dataKeysCreateGroupInstance = {
            groupAccessType,
            ownerId,
            queueEnabled,
            region,
            roleIds,
            type: 'group',
            worldId,
            instanceCode,
        };

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.instances.createGroupInstance,
            pathFormated: ApiPaths.instances.createGroupInstance.path,
            body: body,
        };

        return this.executeRequest<Inst.Instance>(paramRequest);
    }

    /**
     * This function is used to Generate a new instance ID **ONLY**. It will only return a string you can use to create an instance with. There is no request made to VRChat with this function.
     * ### **[Important]**
     * - Only for creating instances that are not group instances!! Group instances HAVE to be created with VRChat API.
     *
     * @param worldId The ID of the world you want to create an instance in.
     * @param region The region of the instance. Enum: `InstanceRegionType`.
     * @param instanceType The type of instance you are creating. Enum: `InstanceAccessNormalType`.
     * @param instanceCode **[Optional]** The code of the instance. If not provided, a random code will be generated. (Any 1-5 digit number or characters are valid.)
     * @param ownerId **[Optional]** The owner ID of the instance. BUT **is Required if the instance isn't public.** (Must be the USER ID of the bot account this script is controlling).
     *
     * @returns {Promise<Inst.Instance>} The instance object that was created.
     */
    public generateNormalInstanceIdOnly({
        worldId,
        region,
        instanceType,
        instanceCode,
        ownerId,
    }: Inst.CreateRegularInstanceRequest): string {
        if (instanceType !== Inst.InstanceAccessNormalType.Public) {
            if (!ownerId) throw new Error('You need to provide the ownerId parameter for a non-public instance!');
        } else {
            if (ownerId)
                console.warn('The ownerId parameter is not required for a public instance! It will be ignored.');
        }

        // gnerate a random code that is 1-5 digits long maximum
        if (!instanceCode) {
            instanceCode = Math.floor(Math.random() * 99999) + 1;
        } else {
            if (instanceCode.toString().length > 5 || instanceCode.toString().length < 1) {
                throw new Error('The instanceCode must be between 1-5 digits/characters long!');
            }
        }

        let instanceId = '';

        instanceId = worldId + ':' + instanceCode;
        const nonce = this.getRandomNonce();

        if (instanceType === Inst.InstanceAccessNormalType.Public) {
            // Public instance type
            instanceId += '~region(' + region + ')';
        } else if (instanceType === Inst.InstanceAccessNormalType.Friends) {
            // Friends instance type
            instanceId += '~friends(' + ownerId + ')~region(' + region + ')~nonce(' + nonce + ')';
        } else if (instanceType === Inst.InstanceAccessNormalType.Friends_Plus) {
            // Friends+ instance type
            instanceId += '~hidden(' + ownerId + ')~region(' + region + ')~nonce(' + nonce + ')';
        } else if (instanceType === Inst.InstanceAccessNormalType.Invite) {
            // Invite instance type
            instanceId += '~private(' + ownerId + ')~region(' + region + ')~nonce(' + nonce + ')';
        } else {
            // Invite+ instance type
            instanceId += '~private(' + ownerId + ')~canRequestInvite~region(' + region + ')~nonce(' + nonce + ')';
        }

        return instanceId;
    }

    /** Return a random UUIDv4 called nonce. Required for creating an instance other then group type instance. */
    public getRandomNonce() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
