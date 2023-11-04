declare namespace VRCAPI {
    namespace Favorites {
        namespace Models {

            type BaseFavorite = {
                id: string;
                type: VRCAPI.Favorites.Models.FavoriteType;
                tags: string[];
            }

            type Favorite = BaseFavorite & {
                favoriteId?: string;
            }

            type FavoriteGroup = BaseFavorite & {
                displayName: string;
                visibility: VRCAPI.Favorites.Models.FavoriteType;
                ownerId: string;
                ownerDisplayName?: string;
                name?: string;
            }

            /** Type of favorite. Defaults: `friend`. */
            enum FavoriteType {
                Friend = 'friend',
                Avatar = 'avatar',
                World = 'world',
            }
        }

        namespace Requests {

            type quantity = {
                /** The quantity of the item. */
                n?: number;
            }

            type offset = {
                /** The offset of the item. */
                offset?: number;
            }

            type favId = {
                /** The Id of the favorite. */
                favoriteId: string;
            }
            /**
             * The request parameters for the `listFavorites` method.
             */
            type listFavoritesRequest = quantity & offset & {
                type?: VRCAPI.Favorites.Models.FavoriteType;
                tag?: string;
            }

            /**
             * The data for requesting to favorites an avatar.
             */
            type dataKeysAddFavoriteAvatar = {
                type: VRCAPI.Favorites.Models.FavoriteType.Avatar;
                favoriteId: string;
                tags: VRCAPI.Generics.avatarTags[];
            };

            /** The data for requesting to favorites a friend. */
            type dataKeysAddFavoriteFriend = {
                type: VRCAPI.Favorites.Models.FavoriteType.Friend;
                favoriteId: string;
                tags: VRCAPI.Generics.groupTags[];
            };

            /**
            * @description Data keys for adding a world to favorites
            */
            type dataKeysAddFavoriteWorld = {
                type: VRCAPI.Favorites.Models.FavoriteType.World;
                favoriteId: string;
                tags: VRCAPI.Generics.worldTags[];
            };

            /**
             * The request parameters for the `addFavorite` method.
             */
            type addFavoriteRequest = dataKeysAddFavoriteAvatar | dataKeysAddFavoriteFriend | dataKeysAddFavoriteWorld;

            /**
             * The Request parameters for the `showFavorite` method.
             */
            type showFavoriteRequest = favId;

            /**
             * The Request parameters for the `removeFavorite` method.
             */
            type removeFavoriteRequest = favId;

            /**
             * The Request parameters for the `listFavoriteGroups` method.
             */
            type listFavoriteGroupsRequest = quantity & offset & {
                /** The owner of whoms favorite groups to return. Must be a UserID. */
                ownerId: string;
            }

            /** The request parameters for any favorite group request. */
            type favoriteGroupRequest = {
                /** The type of group to fetch, must be a valid FavoriteType. */
                favoriteGroupType: VRCAPI.Favorites.Models.FavoriteType;
                /** The name of the group to fetch, must be a name of a FavoriteGroup. */
                favoriteGroupName: string;
                /** The owner of whoms favorite groups to return. Must be a UserID. */
                userId: string;
            }

            /**
             * The Request parameters for the `showFavoriteGroup` method.
             */
            type showFavoriteGroupRequest = favoriteGroupRequest;

            /** The data keys for creating a favorite group. */
            type dataKeysFavoriteUpdate = {
                displayName?: string;
                visibility?: VRCAPI.Favorites.Models.FavoriteType;
                tags?: (VRCAPI.Generics.AllTags | VRCAPI.Generics.allFavoriteTags)[];
              };

            /**
             * The Request parameters for the `addFavoriteGroup` method.
             */
            type updateFavoriteGroupRequest = favoriteGroupRequest & dataKeysFavoriteUpdate;

            /**
             * The Request parameters for the `updateFavoriteGroup` method.
             */
            type clearFavoriteGroupRequest = favoriteGroupRequest;

            type dataKeysFavoriteTypes =
                | dataKeysAddFavoriteFriend
                | dataKeysAddFavoriteAvatar
                | dataKeysAddFavoriteWorld
                | dataKeysFavoriteUpdate;
        }
    }
}