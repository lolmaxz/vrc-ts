import { VRChatAPI } from '../VRChatAPI';
import { ApiPaths } from '../types/ApiPaths';
import { executeRequestType } from '../types/Generics';
import { Instance } from '../types/Instances';
import * as Wrld from '../types/Worlds';
import { BaseApi } from './BaseApi';

/**
 * This class is used to make requests to the Worlds API.
 */
export class WorldsApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    /**
     * Search and list any worlds by query filters.
     */
    public async searchAllWorlds({
        featured,
        sort,
        n,
        offset,
        order,
        search,
        tag,
        notag,
        releaseStatus,
        maxUnityVersion,
        minUnityVersion,
        platform,
        user,
        userId,
        developer,
        fuzzy = false,
        includeInstances,
    }: Wrld.SearchAllWorldsRequest): Promise<Wrld.LimitedWorld[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (featured) parameters.append('featured', featured.toString());
        if (sort) parameters.append('sort', sort);
        if (n) {
            if (n > 100 || n < 1) throw new Error('Quantity must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset) {
            if (offset < 0) throw new Error('Offset must be greater than 0!');
            parameters.append('offset', offset.toString());
        }

        if (order) parameters.append('order', order);
        if (search) parameters.append('search', search);
        if (tag) parameters.append('tag', tag);
        if (notag) parameters.append('notag', notag);
        if (releaseStatus) parameters.append('releaseStatus', releaseStatus);
        if (maxUnityVersion) parameters.append('maxUnityVersion', maxUnityVersion);
        if (minUnityVersion) parameters.append('minUnityVersion', minUnityVersion);
        if (platform) parameters.append('platform', platform);
        if (user) parameters.append('user', user);
        if (userId) parameters.append('userId', userId);
        if (developer) parameters.append('developer', developer);
        if (fuzzy) parameters.append('fuzzy', fuzzy.toString());
        if (includeInstances) parameters.append('includeInstances', 'partial');

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.searchAllWorlds,
            pathFormated: ApiPaths.worlds.searchAllWorlds.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<Wrld.LimitedWorld[]>(paramRequest);
    }

    /**
     * Create a new world. This endpoint requires `assetUrl` to be a valid File object with `.vrcw` file extension, and `imageUrl` to be a valid File object with an image file extension.
     */
    public async createWorld({
        assetUrl,
        assetVersion,
        authorId,
        authorName,
        capacity,
        description,
        id,
        imageUrl,
        name,
        platform,
        releaseStatus,
        tags,
        unityPackageUrl,
        unityVersion,
    }: Wrld.CreateWorldRequest): Promise<Wrld.World> {
        const body: Wrld.dataKeysCreateWorld = {
            assetUrl,
            assetVersion,
            authorId,
            authorName,
            capacity,
            description,
            id,
            imageUrl,
            name,
            platform,
            releaseStatus,
            tags,
            unityPackageUrl,
            unityVersion,
        };

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.createWorld,
            pathFormated: ApiPaths.worlds.createWorld.path,
            body: body,
        };

        return await this.executeRequest<Wrld.World>(paramRequest);
    }

    /**
     * Search and list currently Active worlds by query filters.
     */
    public async listActiveWorlds({
        n,
        offset,
        sort,
        order,
        search,
        tag,
        notag,
        releaseStatus,
        maxUnityVersion,
        minUnityVersion,
        platform,
    }: Wrld.ListActiveWorldsRequest): Promise<Wrld.LimitedWorld[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (n) {
            if (n > 100 || n < 1) throw new Error('Quantity must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset) {
            if (offset < 0) throw new Error('Offset must be greater than 0!');
            parameters.append('offset', offset.toString());
        }

        if (sort) parameters.append('sort', sort);
        if (order) parameters.append('order', order);
        if (search) parameters.append('search', search);
        if (tag) parameters.append('tag', tag);
        if (notag) parameters.append('notag', notag);
        if (releaseStatus) parameters.append('releaseStatus', releaseStatus);
        if (maxUnityVersion) parameters.append('maxUnityVersion', maxUnityVersion);
        if (minUnityVersion) parameters.append('minUnityVersion', minUnityVersion);
        if (platform) parameters.append('platform', platform);

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.listActiveWorlds,
            pathFormated: ApiPaths.worlds.listActiveWorlds.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<Wrld.LimitedWorld[]>(paramRequest);
    }

    /**
     * Search and list favorited worlds by query filters.
     */
    public async listFavoritedWorlds({
        userId,
        n,
        offset,
        sort,
        order,
        search,
        tag,
        notag,
        releaseStatus,
        maxUnityVersion,
        minUnityVersion,
        platform,
    }: Wrld.ListFavoritedWorldsRequest): Promise<Wrld.LimitedWorld[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (userId) parameters.append('userId', userId);

        if (n) {
            if (n > 100 || n < 1) throw new Error('Quantity must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset) {
            if (offset < 0) throw new Error('Offset must be greater than 0!');
            parameters.append('offset', offset.toString());
        }

        if (sort) parameters.append('sort', sort);
        if (order) parameters.append('order', order);
        if (search) parameters.append('search', search);
        if (tag) parameters.append('tag', tag);
        if (notag) parameters.append('notag', notag);
        if (releaseStatus) parameters.append('releaseStatus', releaseStatus);
        if (maxUnityVersion) parameters.append('maxUnityVersion', maxUnityVersion);
        if (minUnityVersion) parameters.append('minUnityVersion', minUnityVersion);
        if (platform) parameters.append('platform', platform);

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.listFavoritedWorlds,
            pathFormated: ApiPaths.worlds.listFavoritedWorlds.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<Wrld.LimitedWorld[]>(paramRequest);
    }

    /**
     * Search and list recently visited worlds by query filters.
     */
    public async listRecentWorlds({
        userId,
        n,
        offset,
        sort,
        order,
        search,
        tag,
        notag,
        releaseStatus,
        maxUnityVersion,
        minUnityVersion,
        platform,
    }: Wrld.ListRecentWorldsRequest): Promise<Wrld.LimitedWorld[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (userId) parameters.append('userId', userId);

        if (n) {
            if (n > 100 || n < 1) throw new Error('Quantity must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset) {
            if (offset < 0) throw new Error('Offset must be greater than 0!');
            parameters.append('offset', offset.toString());
        }

        if (sort) parameters.append('sort', sort);
        if (order) parameters.append('order', order);
        if (search) parameters.append('search', search);
        if (tag) parameters.append('tag', tag);
        if (notag) parameters.append('notag', notag);
        if (releaseStatus) parameters.append('releaseStatus', releaseStatus);
        if (maxUnityVersion) parameters.append('maxUnityVersion', maxUnityVersion);
        if (minUnityVersion) parameters.append('minUnityVersion', minUnityVersion);
        if (platform) parameters.append('platform', platform);

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.listRecentWorlds,
            pathFormated: ApiPaths.worlds.listRecentWorlds.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<Wrld.LimitedWorld[]>(paramRequest);
    }

    /**
     * Get information about a specific World. Works unauthenticated but when so will always return `0` for certain fields.
     */
    public async getWorldbyID({ worldId }: Wrld.GetWorldByIdRequest): Promise<Wrld.World> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.getWorldbyID,
            pathFormated: ApiPaths.worlds.getWorldbyID.path.replace('{worldId}', worldId),
        };

        return await this.executeRequest<Wrld.World>(paramRequest);
    }

    /**
     * Update information about a specific World.
     */
    public async updateWorld({
        worldId,
        assetUrl,
        assetVersion,
        authorId,
        authorName,
        capacity,
        description,
        imageUrl,
        name,
        platform,
        releaseStatus,
        tags,
        unityPackageUrl,
        unityVersion,
    }: Wrld.UpdateWorldRequest): Promise<Wrld.World> {
        const body: Wrld.dataKeysUpdateWorld = {};

        if (assetUrl) body.assetUrl = assetUrl;
        if (assetVersion) body.assetVersion = assetVersion;
        if (authorId) body.authorId = authorId;
        if (authorName) body.authorName = authorName;
        if (capacity) body.capacity = capacity;
        if (description) body.description = description;
        if (imageUrl) body.imageUrl = imageUrl;
        if (name) body.name = name;
        if (platform) body.platform = platform;
        if (releaseStatus) body.releaseStatus = releaseStatus;
        if (tags) body.tags = tags;
        if (unityPackageUrl) body.unityPackageUrl = unityPackageUrl;
        if (unityVersion) body.unityVersion = unityVersion;

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.updateWorld,
            pathFormated: ApiPaths.worlds.updateWorld.path.replace('{worldId}', worldId),
            body: body,
        };

        return await this.executeRequest<Wrld.World>(paramRequest);
    }

    /**
     * Delete a world. Notice a world is never fully "deleted", only its ReleaseStatus is set to "hidden" and the linked Files are deleted. The WorldID is permanently reserved.
     */
    public async deleteWorld({ worldId }: Wrld.DeleteWorldRequest): Promise<Response> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.deleteWorld,
            pathFormated: ApiPaths.worlds.deleteWorld.path.replace('{worldId}', worldId),
        };

        return await this.executeRequest<Response>(paramRequest);
    }

    /**
     * ⚠️ **DEPRECATED** ⚠️
     *
     * Return a worlds custom metadata. This is currently believed to be unused. Metadata can be set with updateWorld and can be any arbitrary object.
     * @deprecated ⚠️ This endpoint is deprecated and will be removed in the future.
     */
    public async getWorldMetadata({ worldId }: Wrld.GetWorldMetadataRequest): Promise<Wrld.WorldMetadata> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.getWorldMetadata,
            pathFormated: ApiPaths.worlds.getWorldMetadata.path.replace('{worldId}', worldId),
        };

        return await this.executeRequest<Wrld.WorldMetadata>(paramRequest);
    }

    /**
     * Returns a worlds publish status.
     */
    public async getWorldPublishStatus({
        worldId,
    }: Wrld.GetWorldPublishStatusRequest): Promise<Wrld.WorldPublishStatus> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.getWorldPublishStatus,
            pathFormated: ApiPaths.worlds.getWorldPublishStatus.path.replace('{worldId}', worldId),
        };

        return await this.executeRequest<Wrld.WorldPublishStatus>(paramRequest);
    }

    /**
     * Publish a world. You can only publish one world per week.
     */
    public async publishWorld({ worldId }: Wrld.PublishWorldRequest): Promise<Response> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.publishWorld,
            pathFormated: ApiPaths.worlds.publishWorld.path.replace('{worldId}', worldId),
        };

        return await this.executeRequest<Response>(paramRequest);
    }

    /**
     * Unpublish a world.
     */
    public async unpublishWorld({ worldId }: Wrld.UnpublishWorldRequest): Promise<Response> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.unpublishWorld,
            pathFormated: ApiPaths.worlds.unpublishWorld.path.replace('{worldId}', worldId),
        };

        return await this.executeRequest<Response>(paramRequest);
    }

    /**
     * Returns a worlds instance.
     */
    public async getWorldInstance({ worldId }: Wrld.GetWorldInstanceRequest): Promise<Instance> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.getWorldInstance,
            pathFormated: ApiPaths.worlds.getWorldInstance.path.replace('{worldId}', worldId),
        };

        return await this.executeRequest<Instance>(paramRequest);
    }

    /**
     * Return the resticted content of a world by the worldId.
     * You can only access this endpoint if you are the owner of the world.
     * @untested
     */
    public async getWorldRestrictedContent({
        worldId,
    }: Wrld.GetWorldRestrictedContentRequest): Promise<Wrld.WorldRestrictedContent> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.worlds.getContentRestricted,
            pathFormated: ApiPaths.worlds.getContentRestricted.path.replace('{worldId}', worldId),
        };

        return await this.executeRequest<Wrld.WorldRestrictedContent>(paramRequest);
    }
}
