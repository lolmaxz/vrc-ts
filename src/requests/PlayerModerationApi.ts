import { VRChatAPI } from "../VRChatAPI";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the PlayerModeration API.
 */
export class PlayerModerationApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    
    /**
     * Returns a list of all player moderations made by **you**.
     * 
     * This endpoint does not have pagination, and will return __*all*__ results. Use query parameters to limit your query if needed.
     */
    public async searchPlayerModerations() {

    }
    
    /**
     * Moderate a user, e.g. unmute them or show their avatar.
     * 
     * Please see the [Player Moderation docs from VRChat API Docs website](https://vrchatapi.github.io/docs/api/#tag--playermoderation) on what playerModerations are, and how they differ from staff moderations.
     */
    public async moderateUser() {

    }
    
    /**
     * ⚠️ **This will delete every single player moderation you've ever made.**
     */
    public async clearAllPlayerModerations() {

    }
    
    /**
     * Returns a single Player Moderation. This returns the exact same amount of information as the more generalised `getPlayerModerations`.
     */
    public async getPlayerModeration() {

    }
    
    /**
     * Deletes a specific player moderation based on it's `pmod_` ID. The website uses `unmoderateUser` instead. You can delete the same player moderation multiple times successfully.
     */
    public async deletePlayerModeration() {

    }
    
    /**
     * Removes a player moderation previously added through `moderateUser`. E.g if you previously have shown their avatar, but now want to reset it to default.
     */
    public async unmoderateUser() {

    }
}