import { VRChatAPI } from "../VRChatAPI";
import { ApiPaths } from "../types/ApiPaths";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the Avatars API.
 */
export class AvatarsApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    /**
     * Get the current avatar for the user. This will return an error for any other user than the one logged in.
     */
    public async getOwnAvatar({
        userId,
    }: VRCAPI.Avatars.Requests.getOwnAvatarOption): Promise<VRCAPI.Avatars.Models.Avatar> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.avatars.getOwnAvatar,
            pathFormated: ApiPaths.avatars.getOwnAvatar.path.replace('{userId}', userId),
        };

        return await this.executeRequest<VRCAPI.Avatars.Models.Avatar>(paramRequest);
    }

    /**
     * Search and list avatars by query filters. You can only search your own or featured avatars.
     * 
     * It is not possible as a normal user to search other peoples avatars.
     * 
     * todo: the parameter releaseStatus is required to be sent
     */
    public async searchAvatars({
        featured = false,
        sort,
        user = "me",
        n,
        order,
        offset,
        tags,
        noTags,
        releaseStatus = VRCAPI.Avatars.Models.ReleaseStatus.All,
        maxUnityVersion,
        minUnityVersion,
        platform
    }: VRCAPI.Avatars.Requests.searchAvatarsOption): Promise<VRCAPI.Avatars.Models.Avatar[]> {

        const parameters: URLSearchParams = new URLSearchParams();


        parameters.append('featured', featured.toString());
        parameters.append('user', user);
        parameters.append('releaseStatus', releaseStatus);

        if (n) {
            if (n > 100 || n < 1) {
                throw new Error('Quantity must be between 1 and 100!');
            }
            parameters.append('n', n.toString());
        }

        if (order) {
            parameters.append('order', order);
        }

        if (offset) {
            if (offset < 0) {
                throw new Error('Offset must be greater than 0!');
            }
            parameters.append('offset', offset.toString());
        }

        if (sort) parameters.append('sort', sort);
        if (tags) parameters.append('tags', tags);
        if (noTags) parameters.append('notags', noTags);
        if (maxUnityVersion) parameters.append('maxUnityVersion', maxUnityVersion);
        if (minUnityVersion) parameters.append('minUnityVersion', minUnityVersion);
        if (platform) parameters.append('platform', platform);

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.avatars.searchAvatars,
            pathFormated: ApiPaths.avatars.searchAvatars.path,
        };

        return await this.executeRequest<VRCAPI.Avatars.Models.Avatar[]>(paramRequest);
    }

    /**
     * Create an avatar. It's possible to optionally specify a ID if you want a custom one. Attempting to create an Avatar with an already claimed ID will result in a DB error.
     */
    public async createAvatar({
        assetUrl,
        id,
        name,
        description,
        tags,
        imageUrl,
        releaseStatus,
        version,
        unityPackageUrl
    }: VRCAPI.Avatars.Requests.createAvatarOption): Promise<VRCAPI.Avatars.Models.Avatar> {

        const body: VRCAPI.Avatars.Requests.createAvatarOption = {
            name: name,
            imageUrl: imageUrl,
        }
        if (assetUrl) body.assetUrl = assetUrl;
        if (id) body.id = id;
        if (description) body.description = description;
        if (tags) body.tags = tags;
        if (releaseStatus) body.releaseStatus = releaseStatus;
        if (version) body.version = version;
        if (unityPackageUrl) body.unityPackageUrl = unityPackageUrl;

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.avatars.createAvatar,
            pathFormated: ApiPaths.avatars.createAvatar.path,
            body: body
        };

        return await this.executeRequest<VRCAPI.Avatars.Models.Avatar>(paramRequest);
    }

    /**
     * Get information about a specific Avatar.
     */
    public async getAvatar({
        avatarId,
    }: VRCAPI.Avatars.Requests.getAvatarOption): Promise<VRCAPI.Avatars.Models.Avatar> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.avatars.getAvatar,
            pathFormated: ApiPaths.avatars.getAvatar.path.replace('{avatarId}', avatarId),
        };

        return await this.executeRequest<VRCAPI.Avatars.Models.Avatar>(paramRequest);
    }

    /**
     * Update information about a specific avatar.
     */
    public updateAvatar({
        avatarId,
        assetUrl,
        id,
        name,
        description,
        tags,
        imageUrl,
        releaseStatus,
        version,
        unityPackageUrl
    }: VRCAPI.Avatars.Requests.updateAvatarOption): Promise<VRCAPI.Avatars.Models.Avatar> {

        const body: VRCAPI.Avatars.Requests.dataKeysUpdateAvatar = {};

        if (assetUrl) body.assetUrl = assetUrl;
        if (id) body.id = id;
        if (name) body.name = name;
        if (description) body.description = description;
        if (tags) body.tags = tags;
        if (imageUrl) body.imageUrl = imageUrl;
        if (releaseStatus) body.releaseStatus = releaseStatus;
        if (version) body.version = version;
        if (unityPackageUrl) body.unityPackageUrl = unityPackageUrl;

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.avatars.updateAvatar,
            pathFormated: ApiPaths.avatars.updateAvatar.path.replace('{avatarId}', avatarId),
            body: body
        };

        return this.executeRequest<VRCAPI.Avatars.Models.Avatar>(paramRequest);
    }

    /**
     * Delete an avatar. Notice an avatar is never fully "deleted", only its ReleaseStatus is set to "hidden" and the linked Files are deleted. The AvatarID is permanently reserved.
     */
    public async deleteAvatar({
        avatarId,
    }: VRCAPI.Avatars.Requests.deleteAvatarOption): Promise<VRCAPI.Avatars.Models.Avatar> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.avatars.deleteAvatar,
            pathFormated: ApiPaths.avatars.deleteAvatar.path.replace('{avatarId}', avatarId),
        };

        return await this.executeRequest<VRCAPI.Avatars.Models.Avatar>(paramRequest);
    }

    /**
     * Switches into that avatar.
     */
    public async selectAvatar({
        avatarId,
    }: VRCAPI.Avatars.Requests.selectAvatarOption): Promise<VRCAPI.Users.Models.CurrentUser> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.avatars.selectAvatar,
            pathFormated: ApiPaths.avatars.selectAvatar.path.replace('{avatarId}', avatarId),
        };

        return await this.executeRequest<VRCAPI.Users.Models.CurrentUser>(paramRequest);
    }

    /**
     * Switches into that avatar as your fallback avatar.
     */
    public async selectFallbackAvatar({
        avatarId,
    }: VRCAPI.Avatars.Requests.selectFallbackAvatarOption): Promise<VRCAPI.Users.Models.CurrentUser> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.avatars.selectFallbackAvatar,
            pathFormated: ApiPaths.avatars.selectFallbackAvatar.path.replace('{avatarId}', avatarId),
        };

        return await this.executeRequest<VRCAPI.Users.Models.CurrentUser>(paramRequest);
    }

    /**
     * Search and list favorited avatars by query filters.
     */
    public async listFavoritedAvatars({
        featured,
        sort,
        n,
        order,
        offset,
        tags,
        noTags,
        releaseStatus,
        maxUnityVersion,
        minUnityVersion,
        platform,
        userId
    }: VRCAPI.Avatars.Requests.listFavoritedAvatarsOption): Promise<VRCAPI.Avatars.Models.Avatar[]> {

        const parameters: URLSearchParams = new URLSearchParams();

        if (n) {
            if (n > 100 || n < 1) {
                throw new Error('Quantity must be between 1 and 100!');
            }
            parameters.append('n', n.toString());
        }
        if (offset) {
            if (offset < 0) {
                throw new Error('Offset must be greater than 0!');
            }
            parameters.append('offset', offset.toString());
        }

        if (featured) parameters.append('featured', featured.toString());
        if (sort) parameters.append('sort', sort);
        if (order) parameters.append('order', order);
        if (tags) parameters.append('tags', tags);
        if (noTags) parameters.append('notags', noTags);
        if (releaseStatus) parameters.append('releaseStatus', releaseStatus);
        if (maxUnityVersion) parameters.append('maxUnityVersion', maxUnityVersion);
        if (minUnityVersion) parameters.append('minUnityVersion', minUnityVersion);
        if (platform) parameters.append('platform', platform);
        if (userId) parameters.append('user', userId);

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.avatars.listFavoritedAvatars,
            pathFormated: ApiPaths.avatars.listFavoritedAvatars.path,
        };

        return await this.executeRequest<VRCAPI.Avatars.Models.Avatar[]>(paramRequest);
    }

}