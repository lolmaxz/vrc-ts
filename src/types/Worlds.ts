import { UnityPackage } from './Files';
import { Instance } from './Instances';
import { DeveloperType } from './Users';

//! --- Worlds --- !//
export type BaseWorld = {
    id: string;
    name: string; // Min 1 chars
    description: string; // Min 0 chars
    authorId: string;
    authorName: string; // Min 1 chars
    releaseStatus: ReleaseStatus; // Enum: ReleaseStatus, Default: public
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
};
export type World = BaseWorld & {
    unityPackages?: UnityPackage[]; // Empty if unauthenticated.
};

export enum ReleaseStatus {
    Public = 'public',
    Private = 'private',
    Hidden = 'hidden',
    All = 'all',
}

export enum SearchSortingOptions {
    Popularity = 'popularity',
    Heat = 'heat',
    Trust = 'trust',
    Shuffle = 'shuffle',
    Random = 'random',
    Favorites = 'favorites',
    Report_Score = 'reportScore',
    Report_Count = 'reportCount',
    Publication_Date = 'publicationDate',
    Labs_Publication_Date = 'labsPublicationDate',
    Created = 'created',
    Created_At = '_created_at',
    Updated = 'updated',
    Updated_At = '_updated_at',
    Order = 'order',
    Relevance = 'relevance',
    Magic = 'magic',
    Name = 'name',
}

export type LimitedWorld = {
    id: string;
    name: string;
    authorId: string;
    authorName: string;
    releaseStatus: ReleaseStatus;
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
};

export type WorldMetadata = {
    id: string;
    metadata: object;
};

export type WorldPublishStatus = {
    canPublish: boolean;
};

/**
 * Search order options for searching avatars. Enums: SearchOrderOptions
 */
export enum SearchOrderOptions {
    Ascending = 'ascending',
    Descending = 'descending',
}

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
    releaseStatus?: ReleaseStatus;
    /** The maximum unity version supported by the asset. */
    maxUnityVersion?: string;
    /** The minimum Unity version supported by the asset. */
    minUnityVersion?: string;
    /** The platform of the avatar. */
    platform?: string;
};

/** The data for requesting to search all worlds. */
export type SearchAllWorldsRequest = BaseSearch & {
    user?: 'me';
    /** The user id to filter by. */
    userId?: string;
    /** The developer type to filter by. */
    developer?: DeveloperType;
};

export type dataKeysCreateWorld = {
    assetUrl: string;
    assetVersion?: number;
    authorId?: string;
    authorName?: string;
    capacity?: number;
    description?: string;
    id?: string;
    imageUrl: string;
    name: string;
    platform?: string;
    releaseStatus?: ReleaseStatus;
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
    userId?: string;
};

/** The data for requesting to get a list of recent worlds. */
export type ListRecentWorldsRequest = BaseSearch & {
    /** The user id to filter by. **ADMIN ONLY** */
    userId?: string;
};

/** The data for requesting to get a world by id. */
export type GetWorldByIdRequest = {
    /** The id of the world to get. */
    worldId: string;
};

export type dataKeysUpdateWorld = {
    assetUrl?: string;
    assetVersion?: string;
    authorId?: string;
    authorName?: string;
    capacity?: number;
    description?: string;
    imageUrl?: string;
    name?: string;
    platform?: string;
    releaseStatus?: ReleaseStatus;
    tags?: string[];
    unityPackageUrl?: string;
    /** The unity version of the world. Example: "2022.3.6f1" Min. 1 character */
    unityVersion?: string;
};

/** The data for requesting to update a world. */
export type UpdateWorldRequest = dataKeysUpdateWorld & {
    /** The id of the world to update.*/
    worldId: string;
};

/** The data for requesting to delete a world. */
export type DeleteWorldRequest = {
    /** The id of the world to delete. */
    worldId: string;
};

/** The data for requesting to get a world's metadata. */
export type GetWorldMetadataRequest = {
    /** The id of the world to get metadata for. */
    worldId: string;
};

/** The data for requesting if the world is currently published. */
export type GetWorldPublishStatusRequest = {
    /** The id of the world to get the publish status for. */
    worldId: string;
};

/** The data for requesting to publish a world. */
export type PublishWorldRequest = {
    /** The id of the world to publish. */
    worldId: string;
};

/** The data for requesting to Unpublish a world. */
export type UnpublishWorldRequest = {
    /** The id of the world to unpublish. */
    worldId: string;
};

/** The data for requesting to get a list of world instances. */
export type GetWorldInstanceRequest = {
    /** The id of the world to get instances for. */
    worldId: string;
    /** The instance id to get the instance. */
    instanceId?: string;
};
