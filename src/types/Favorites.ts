//! --- Favorites --- !//

import { AllTags, FavoriteAvatarTags, FavoriteGroupTags, FavoriteWorldTags, allFavoriteTags } from './Generics';

export type BaseFavorite = {
    id: string;
    type: FavoriteType;
    tags: string[];
};

export type Favorite = BaseFavorite & {
    favoriteId?: string;
};

export type FavoriteGroup = BaseFavorite & {
    displayName: string;
    visibility: FavoriteType;
    ownerId: string;
    ownerDisplayName?: string;
    name?: string;
};

/** Type of favorite. Defaults: `friend`. */
export enum FavoriteType {
    Friend = 'friend',
    Avatar = 'avatar',
    World = 'world',
}

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
    favoriteId: string;
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
    favoriteId: string;
    tags: FavoriteAvatarTags[];
};

/** The data for requesting to favorites a friend. */
export type dataKeysAddFavoriteFriend = {
    type: FavoriteType.Friend;
    favoriteId: string;
    tags: FavoriteGroupTags[];
};

/**
 * @description Data keys for adding a world to favorites
 */
export type dataKeysAddFavoriteWorld = {
    type: FavoriteType.World;
    favoriteId: string;
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
        ownerId: string;
    };

/** The request parameters for any favorite group request. */
export type favoriteGroupRequest = {
    /** The type of group to fetch, must be a valid FavoriteType. */
    favoriteGroupType: FavoriteType;
    /** The name of the group to fetch, must be a name of a FavoriteGroup. */
    favoriteGroupName: string;
    /** The owner of whoms favorite groups to return. Must be a UserID. */
    userId: string;
};

/**
 * The Request parameters for the `showFavoriteGroup` method.
 */
export type showFavoriteGroupRequest = favoriteGroupRequest;

/** The data keys for creating a favorite group. */
export type dataKeysFavoriteUpdate = {
    displayName?: string;
    visibility?: FavoriteType;
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
