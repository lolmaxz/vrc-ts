import { UnityPackageAvatar } from './Files';
import { AllTags } from './Generics';

//! --- Avatars --- !//

export type Avatar = {
    /** AvatarID Pattern: avtr_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12} */
    id: string;
    /** Min 1 chars. Name of the avatar */
    name: string;
    /** Min 0 chars. Description of the avatar */
    description: string;
    /** - **UserID**: A users unique ID, usually in the form of `usr_c1644b5b-3ca4-45b4-97c6-a2a0de70d469`.
     * - Legacy players can have old IDs in the form of `8JoV9XEdpo`. *The ID can never be changed*. */
    authorId: string;
    /** Min 1 chars. Name of the author/user */
    authorName: string;
    /** System tags and more */
    tags: string[];
    /** Min 1 chars. Image URL of the avatar */
    imageUrl: string;
    /** Min 1 chars. Thumbnail image URL of the avatar */
    thumbnailImageUrl: string;
    /** Release status of the avatar. **Default**: public  **Allowed**: `public`┃`private`┃`hidden`┃`all`. Enums: releaseStatus
     *
     * ## ⚠ Warning: Setting the release status to `hidden` will effectively delete your avatar and remove your access to it. be careful with this! */
    releaseStatus: ReleaseStatus;
    /** Default: `0`. Version of the avatar */
    version: number;
    /** - Default: `FALSE`. If the avatar is a featured avatar or not.
     * - Featured avatars are avatar that are publically available on vrchat website and game, but made by the community */
    featured: boolean;
    unityPackages: UnityPackageAvatar[];
    unityPackageUrl?: string;
    /** Object has unknown usage/fields */
    assetUrlObject?: unknown;
    created_at: Date;
    updated_at: Date;

    /** Most likely deprecated */
    unityPackageUrlObject?: {
        unityPackageUrl: string;
    };
    /** Most likely deprecated */
    assetUrl?: string;
};

/**
 * Release status of the avatar. **Default**: public  **Allowed**: `public`┃`private`┃`hidden`┃`all`. Enums: releaseStatus
 *
 * ## ⚠ Warning: `hidden` will effectively delete your avatar and remove your access to it!
 */
export enum ReleaseStatus {
    Public = 'public',
    Private = 'private',
    Hidden = 'hidden',
    All = 'all',
}

/**
 * Search order options for searching avatars. Enums: SearchOrderOptions
 */
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

//! --- Requests --- !//

/**
 * Search order options for searching avatars. Enums: SearchOrderOptions
 */
export enum SearchOrderOptions {
    Ascending = 'ascending',
    Descending = 'descending',
}

/** Request options for getting own avatars. */
export type getOwnAvatarOption = {
    /** The id of the user to get the avatar from. */
    userId: string;
};

/** Request options for searching avatars.
 *
 * **Reminder**: You can only search your own or featured avatars. It is not possible as a normal user to search other peoples avatars. */
export type searchAvatarsOption = {
    featured?: boolean;
    /** Sortings. Default = `popularity` */
    sort?: SearchSortingOptions;
    /** - The username of the user to search avatar for.
     * - Only works for yourself. Default = `me` */
    user?: string;
    /** The UserId of the user who uploaded the avatar */
    userId?: string;
    /** How many results to return. Default = `60` */
    n?: number;
    /** The order of the results. Default = `descending` */
    order?: SearchOrderOptions;
    /** The offset of the results. Default = `0` */
    offset?: number;
    /** Tags to include (comma-separated). Any of the tags needs to be present. */
    tags?: string;
    /** Tags to exclude (comma-separated). None of the tags may be present. */
    noTags?: string;
    /** The release status of the avatar. Default = `all` */
    releaseStatus?: ReleaseStatus;
    /** The maximum unity version supported by the asset. */
    maxUnityVersion?: string;
    /** The minimum Unity version supported by the asset. */
    minUnityVersion?: string;
    /** The platform of the avatar. */
    platform?: string;
};

/** Request options for creating an avatar. */
export type createAvatarOption = {
    assetUrl?: string;
    /** AvatarID Pattern: avtr_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12} */
    id?: string;
    /** Name of the avatar. Min 1 chars */
    name: string;
    /** Description of the avatar. Min 1 chars */
    description?: string;
    /** All tags that belong to the avatar. */
    tags?: string[];
    /** The image URL of the avatar. Min 1 chars */
    imageUrl: string;
    /** Release status of the avatar. **Default**: public  **Allowed**: `public`┃`private`┃`hidden`┃`all`. Enums: releaseStatus */
    releaseStatus?: ReleaseStatus;
    /** The uploaded version of the avatar. Min 0 Default: 1 */
    version?: number;
    /** Unity package of the avatar. */
    unityPackageUrl?: string;
    /** The Unity version. Example: "2022.3.6f1". Min 1 character */
    unityVersion?: string;
};

/** Request options for getting an avatar. */
export type getAvatarOption = {
    /** AvatarID Pattern: avtr_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12} */
    avatarId: string;
};

export type testing = {
    /** a test attribute! */
    works: boolean;
};

/** Avatar Update DataKeys */
export type dataKeysUpdateAvatar = {
    assetUrl?: string;
    /** AvatarID Pattern: avtr_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12} */
    id?: string;
    /** Name of the avatar. Min 1 chars */
    name?: string;
    /** Description of the avatar. Min 1 chars */
    description?: string;
    /** All tags that belong to the avatar. */
    tags?: AllTags[];
    /** The image url for the avatar. Min 1 chars */
    imageUrl?: string;
    /** Release status of the avatar. **Default**: public  **Allowed**: `public`┃`private`┃`hidden`┃`all`. Enums: releaseStatus */
    releaseStatus?: ReleaseStatus;
    /** The uploaded version of the avatar. Min 0 Default: 1 */
    version?: number;
    /** Unity package of the avatar. */
    unityPackageUrl?: string;
    /** The Unity version. Example: "2022.3.6f1". Min 1 character */
    unityVersion?: string; //todo Added this
};

/** Request options for updating an avatar. */
export type updateAvatarOption = {
    /** AvatarID Pattern: avtr_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12} */
    avatarId: string;
} & dataKeysUpdateAvatar;

/** Request options for deleting an avatar. */
export type deleteAvatarOption = {
    /** AvatarID Pattern: avtr_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12} */
    avatarId: string;
};

/** Request options for selecting an avatar. */
export type selectAvatarOption = {
    /** AvatarID Pattern: avtr_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F] */
    avatarId: string;
};

/** Request options for selecting a fallback avatar. */
export type selectFallbackAvatarOption = {
    /** AvatarID Pattern: avtr_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F] */
    avatarId: string;
};

/** Request options for listing favorited avatars. */
export type listFavoritedAvatarsOption = {
    /** If the avatars are featured or not. Default = `false` */
    featured?: boolean;
    /** Sortings. Default = `popularity` */
    sort?: SearchSortingOptions;
    /** How many results to return. Default = `60` */
    n?: number;
    /** The order of the results. Default = `descending` */
    order?: SearchOrderOptions;
    /** The offset of the results. Default = `0` */
    offset?: number;
    /** Tags to include (comma-separated). Any of the tags needs to be present. */
    tags?: string;
    /** Tags to exclude (comma-separated). None of the tags may be present. */
    noTags?: string;
    /** The release status of the avatar. Default = `all` */
    releaseStatus?: ReleaseStatus;
    /** The maximum unity version supported by the asset. */
    maxUnityVersion?: string;
    /** The minimum Unity version supported by the asset. */
    minUnityVersion?: string;
    /** The platform of the avatar. */
    platform?: string;
    /** The UserId of the user who uploaded the avatar */
    userId?: string;
};
