//! --- Favorites --- !//

import {
    AllTags,
    AvatarIdType,
    FavoriteAvatarTags,
    FavoriteGroupTags,
    FavoriteGroupIdType,
    FavoriteIdType,
    FavoriteWorldTags,
    UserIdType,
    WorldIdType,
    allFavoriteTags,
} from './Generics';

export type BaseFavorite = {
    tags: string[];
};

export type FavoriteAvatar = BaseFavorite & {
    id: AvatarIdType;
    type: FavoriteType.Avatar;
};

export type FavoriteFriend = BaseFavorite & {
    userId: UserIdType;
    type: FavoriteType.Friend;
};

export type FavoriteWorld = BaseFavorite & {
    worldId: WorldIdType;
    type: FavoriteType.World;
};

export type PossibleFavorite = FavoriteAvatar | FavoriteFriend | FavoriteWorld;

export type Favorite = PossibleFavorite &
    BaseFavorite & {
        favoriteId?: FavoriteIdType;
    };

export type FavoriteGroup = BaseFavorite & {
    id?: FavoriteGroupIdType;
    displayName: string;
    type?: FavoriteType;
    visibility: FavoriteGroupVisibility;
    ownerId: UserIdType;
    ownerDisplayName?: string;
    name?: string;
};

/** Type of favorite. Defaults: `friend`. */
export enum FavoriteType {
    Friend = 'friend',
    Avatar = 'avatar',
    World = 'world',
    VrcPlusWorld = 'vrcPlusWorld',
}

/** Visibility of a favorite group. Distinct from FavoriteType. */
export enum FavoriteGroupVisibility {
    Public = 'public',
    Private = 'private',
    Friends = 'friends',
}

export type FavoriteSingleGroupLimits = {
    avatar: number;
    friend: number;
    world: number;
    vrcPlusWorld?: number;
};

export type FavoriteLimits = {
    defaultMaxFavoriteGroups: number;
    defaultMaxFavoritesPerGroup: number;
    maxFavoriteGroups: FavoriteSingleGroupLimits;
    maxFavoritesPerGroup: FavoriteSingleGroupLimits;
};

//! --- Requests --- !//

export type quantity = {
    /** The quantity of the item. */
    n?: number;
};

export type offset = {
    /** The offset of the item. */
    offset?: number;
};

export type favId = {
    /** The Id of the favorite. */
    favoriteId: FavoriteIdType;
};
/**
 * The request parameters for the `listFavorites` method.
 */
export type listFavoritesRequest = quantity &
    offset & {
        type?: FavoriteType;
        tag?: string;
    };

/**
 * The data for requesting to favorites an avatar.
 */
export type dataKeysAddFavoriteAvatar = {
    type: FavoriteType.Avatar;
    favoriteId: FavoriteIdType;
    tags: FavoriteAvatarTags[];
};

/** The data for requesting to favorites a friend. */
export type dataKeysAddFavoriteFriend = {
    type: FavoriteType.Friend;
    favoriteId: FavoriteIdType;
    tags: FavoriteGroupTags[];
};

/**
 * @description Data keys for adding a world to favorites
 */
export type dataKeysAddFavoriteWorld = {
    type: FavoriteType.World;
    favoriteId: FavoriteIdType;
    tags: FavoriteWorldTags[];
};

/**
 * The request parameters for the `addFavorite` method.
 */
export type addFavoriteRequest = dataKeysAddFavoriteAvatar | dataKeysAddFavoriteFriend | dataKeysAddFavoriteWorld;

/**
 * The Request parameters for the `showFavorite` method.
 */
export type showFavoriteRequest = favId;

/**
 * The Request parameters for the `removeFavorite` method.
 */
export type removeFavoriteRequest = favId;

/**
 * The Request parameters for the `listFavoriteGroups` method.
 */
export type listFavoriteGroupsRequest = quantity &
    offset & {
        /** The owner of whoms favorite groups to return. Must be a UserID. */
        ownerId: UserIdType;
    };

/** The request parameters for any favorite group request. */
export type favoriteGroupRequest = {
    /** The type of group to fetch, must be a valid FavoriteType. */
    favoriteGroupType: FavoriteType;
    /** The name of the group to fetch, must be a name of a FavoriteGroup. */
    favoriteGroupName: string;
    /** The owner of whoms favorite groups to return. Must be a UserID. */
    userId: UserIdType;
};

/**
 * The Request parameters for the `showFavoriteGroup` method.
 */
export type showFavoriteGroupRequest = favoriteGroupRequest;

/** The data keys for creating a favorite group. */
export type dataKeysFavoriteUpdate = {
    displayName?: string;
    visibility?: FavoriteGroupVisibility;
    tags?: (AllTags | allFavoriteTags)[];
};

/**
 * The Request parameters for the `addFavoriteGroup` method.
 */
export type updateFavoriteGroupRequest = favoriteGroupRequest & dataKeysFavoriteUpdate;

/**
 * The Request parameters for the `updateFavoriteGroup` method.
 */
export type clearFavoriteGroupRequest = favoriteGroupRequest;

export type dataKeysFavoriteTypes =
    | dataKeysAddFavoriteFriend
    | dataKeysAddFavoriteAvatar
    | dataKeysAddFavoriteWorld
    | dataKeysFavoriteUpdate;

export type FavoriteGroupSummary = {
    displayName?: string;
    id?: FavoriteGroupIdType;
    name?: string;
    numFavorites?: number;
    visibility?: FavoriteGroupVisibility | string;
};

export type FavoriteGroupList = {
    favoriteGroups?: FavoriteGroupSummary[];
    maxFavoriteGroups?: number;
    maxFavoritesPerGroup?: number;
};

export type FavoriteGroupContentsEntry = {
    favoriteId?: string;
    id?: string;
    tags?: string[];
    type?: FavoriteType | string;
    avatar?: unknown;
    world?: unknown;
};

export type FavoriteGroupContents = {
    favorites?: FavoriteGroupContentsEntry[];
    totalCount?: number;
};

export type getFavoriteGroupsByTypeRequest = {
    favoriteGroupType: FavoriteType | 'vrcPlusWorld';
    userId?: UserIdType;
};

export type getFavoriteGroupContentsRequest = getFavoriteGroupsByTypeRequest & {
    favoriteGroupName: string;
};
