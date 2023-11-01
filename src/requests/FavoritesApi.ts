import { VRChatAPI } from "../VRChatAPI";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the Favorites API.
 */
export class FavoritesApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    
    /**
     * Returns a list of favorites.
     */
    public async listFavorites() {

    }
    
    /**
     * Add a new favorite.

        Friend groups are named `group_0` through `group_3`. Avatar and World groups are named `avatars1` to `avatars4` and `worlds1` to `worlds4`.

        You cannot add people whom you are not friends with to your friends list. Destroying a friendship removes the person as favorite on both sides.
     */
    public async addFavorite() {

    }
    
    /**
     * Return information about a specific Favorite.
     */
    public async showFavorite() {

    }
    
    /**
     * Remove a favorite from your favorites list.
     */
    public async removeFavorite() {

    }
    
    /**
     * Return a list of favorite groups owned by a user. Returns the same information as `getFavoriteGroups`.
     */
    public async listFavoriteGroups() {

    }
    
    /**
     * Fetch information about a specific favorite group.
     */
    public async showFavoriteGroup() {

    }
    
    /**
     * Update information about a specific favorite group.
     */
    public async updateFavoriteGroup() {

    }
    
    /**
     * Clear ALL contents of a specific favorite group.
     */
    public async clearFavoriteGroup() {

    }
}