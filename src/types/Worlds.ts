import { UnityPackage } from './Files';
import { InstanceIdType, SearchOrderOptions, SearchSortingOptions, UserIdType, WorldIdType } from './Generics';
import { Instance } from './Instances';
import { DeveloperType } from './Users';

//! --- Worlds --- !//
export type BaseWorld = {
    id: WorldIdType;
    name: string; // Min 1 chars
    description: string; // Min 0 chars
    authorId: UserIdType;
    authorName: string; // Min 1 chars
    releaseStatus: WorldReleaseStatus; // Enum: ReleaseStatus, Default: public
    featured: boolean; // Default: false
    capacity: number; // integer
    recommendedCapacity: number; // integer
    imageUrl: string; // Min 1 chars
    thumbnailImageUrl: string; // Min 1 chars
    namespace: string;
    version: number; // Min 0, Default: 0
    organization: string; // Min 1 chars, Default: vrchat
    previewYoutubeId?: string | null;
    /** Product being sold in this world
     *
     * Format: prod_d4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4
     */
    udonProducts?: string[]; // new
    favorites?: number; // Min 0, Default: 0
    visits: number; // Min 0, Default: 0
    popularity: number; // Min 0, Default: 0
    heat: number; // Min 0, Default: 0
    publicationDate: string; // Min 1 chars
    labsPublicationDate: string; // Min 1 chars
    instances?: Instance[]; // Will always be an empty list when unauthenticated.
    publicOccupants?: number; // Min 0, Default: 0, Will always be 0 when unauthenticated.
    privateOccupants?: number; // Min 0, Default: 0, Will always be 0 when unauthenticated.
    occupants?: number; // Min 0, Default: 0, Will always be 0 when unauthenticated.
    unityPackages?: UnityPackage[]; // Empty if unauthenticated.
    created_at: string; // date-time
    updated_at: string; // date-time
    tags: string[]; // Array of strings
    /** White-listed URLs for the world. */
    urlList: string[]; // Array of strings
    /** If the world has a pending upload. */
    pendingUpload: boolean; // Default: false
};
export type World = BaseWorld & {
    unityPackages?: UnityPackage[]; // Empty if unauthenticated.
};

export enum WorldReleaseStatus {
    Public = 'public',
    Private = 'private',
    Hidden = 'hidden',
    All = 'all',
}

export type LimitedWorld = {
    id: WorldIdType;
    name: string;
    authorId: UserIdType;
    authorName: string;
    releaseStatus: WorldReleaseStatus;
    capacity: number;
    recommendedCapacity?: number;
    imageUrl: string;
    thumbnailImageUrl: string;
    organization: string; // most likely to only be 'vrchat'
    previewYoutubeId?: string;
    udonProducts?: string[];
    favorites: number;
    popularity: number;
    heat: number;
    publicationDate: Date;
    labsPublicationDate: string;
    occupants: number;
    unityPackages: UnityPackage[];
    created_at: Date;
    updated_at: Date;
    tags: string[];
    /** If the world has a pending upload. */
    pendingUpload: boolean; // Default: false
};

export type WorldMetadata = {
    id: WorldIdType;
    metadata: object;
};

export type WorldPublishStatus = {
    canPublish: boolean;
};

//! --- Request --- !//

export type BaseSearch = {
    /** The featured status to filter by. */
    featured?: boolean;
    /** The sort order. */
    sort?: SearchSortingOptions;
    /** The maximum amount of results to return. */
    n?: number;
    /** The offset to start from. */
    offset?: number;
    /** The order to sort by. */
    order?: SearchOrderOptions;
    /** The search query. */
    search?: string;
    /** The tag to filter by. */
    tag?: string;
    /** The not tag to filter by. */
    notag?: string;
    /** The release status to filter by. */
    releaseStatus?: WorldReleaseStatus;
    /** The maximum unity version supported by the asset. */
    maxUnityVersion?: string;
    /** The minimum Unity version supported by the asset. */
    minUnityVersion?: string;
    /** The platform of the avatar. */
    platform?: string;
    /** This setting is special, here's a generic description:
     *
     * A fuzzy search is performed using a fuzzy matching algorithm, which returns a list of results based on likely relevance even though search argument words and spellings may not be an exact match. For web lookups, exact and highly relevant matches appear near the top of the list. Subjective relevance ratings may be given, usually as percentages.
     **/
    fuzzy?: boolean;
    /** If you also want to include partial instance results. */
    includeInstances?: boolean;
};

/** The data for requesting to search all worlds. */
export type SearchAllWorldsRequest = BaseSearch & {
    user?: 'me';
    /** The user id to filter by. */
    userId?: UserIdType;
    /** The developer type to filter by. */
    developer?: DeveloperType;
};

export type dataKeysCreateWorld = {
    assetUrl: string;
    assetVersion?: number;
    authorId?: UserIdType;
    authorName?: string;
    capacity?: number;
    description?: string;
    id?: WorldIdType;
    imageUrl: string;
    name: string;
    platform?: string;
    releaseStatus?: WorldReleaseStatus;
    tags?: string[];
    unityPackageUrl?: string;
    /** The unity version of the world. Example: "2022.3.6f1" Min. 1 character */
    unityVersion?: string;
};

/** The data for requesting to create a world. */
export type CreateWorldRequest = dataKeysCreateWorld;

/** The data for requesting to get a list of active worlds. */
export type ListActiveWorldsRequest = BaseSearch;

/** The data for requesting to get a list of favorited worlds. */
export type ListFavoritedWorldsRequest = BaseSearch & {
    /** The user id to filter by. **ADMIN ONLY** */
    userId?: UserIdType;
};

/** The data for requesting to get a list of recent worlds. */
export type ListRecentWorldsRequest = BaseSearch & {
    /** The user id to filter by. **ADMIN ONLY** */
    userId?: UserIdType;
};

/** The data for requesting to get a world by id. */
export type GetWorldByIdRequest = {
    /** The id of the world to get. */
    worldId: WorldIdType;
};

export type dataKeysUpdateWorld = {
    assetUrl?: string;
    assetVersion?: string;
    authorId?: UserIdType;
    authorName?: string;
    capacity?: number;
    description?: string;
    imageUrl?: string;
    name?: string;
    platform?: string;
    releaseStatus?: WorldReleaseStatus;
    tags?: string[];
    unityPackageUrl?: string;
    /** The unity version of the world. Example: "2022.3.6f1" Min. 1 character */
    unityVersion?: string;
};

/** The data for requesting to update a world. */
export type UpdateWorldRequest = dataKeysUpdateWorld & {
    /** The id of the world to update.*/
    worldId: WorldIdType;
};

/** The data for requesting to delete a world. */
export type DeleteWorldRequest = {
    /** The id of the world to delete. */
    worldId: WorldIdType;
};

/** The data for requesting to get a world's metadata. */
export type GetWorldMetadataRequest = {
    /** The id of the world to get metadata for. */
    worldId: WorldIdType;
};

/** The data for requesting if the world is currently published. */
export type GetWorldPublishStatusRequest = {
    /** The id of the world to get the publish status for. */
    worldId: WorldIdType;
};

/** The data for requesting to publish a world. */
export type PublishWorldRequest = {
    /** The id of the world to publish. */
    worldId: WorldIdType;
};

/** The data for requesting to Unpublish a world. */
export type UnpublishWorldRequest = {
    /** The id of the world to unpublish. */
    worldId: WorldIdType;
};

/** The data for requesting to get a list of world instances. */
export type GetWorldInstanceRequest = {
    /** The id of the world to get instances for. */
    worldId: WorldIdType;
    /** The instance id to get the instance. */
    instanceId?: InstanceIdType;
};
