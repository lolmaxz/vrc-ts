import { VRChatAPI } from "../VRChatAPI";
import { ApiPaths } from "../types/ApiPaths";
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
    public async searchPlayerModerations({
        type,
        targetUserId,
    }: VRCAPI.PlayerModerations.Requests.SearchPlayerModerationsRequest): Promise<VRCAPI.PlayerModerations.Models.PlayerModeration[]> {

        const parameters: URLSearchParams = new URLSearchParams();

        if (type) parameters.append('type', type);
        if (targetUserId) parameters.append('targetUserId', targetUserId);

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.playermoderations.searchPlayerModerations,
            pathFormated: ApiPaths.playermoderations.searchPlayerModerations.path,
        };

        return await this.executeRequest<VRCAPI.PlayerModerations.Models.PlayerModeration[]>(paramRequest);
    }
    
    /**
     * Moderate a user, e.g. unmute them or show their avatar.
     * 
     * Please see the [Player Moderation docs from VRChat API Docs website](https://vrchatapi.github.io/docs/api/#tag--playermoderation) on what playerModerations are, and how they differ from staff moderations.
     */
    public async moderateUser({
        moderated,
        type
    }: VRCAPI.PlayerModerations.Requests.ModerateUserRequest): Promise<VRCAPI.PlayerModerations.Models.PlayerModeration> {
            
            const paramRequest: VRCAPI.Generics.executeRequestType = {
                currentRequest: ApiPaths.playermoderations.moderateUser,
                pathFormated: ApiPaths.playermoderations.moderateUser.path,
                body: {
                    moderated,
                    type
                }
            };
    
            return await this.executeRequest<VRCAPI.PlayerModerations.Models.PlayerModeration>(paramRequest);
    }
    
    /**
     * ⚠️ **This will delete every single player moderation you've ever made.**
     */
    public async clearAllPlayerModerations(): Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.playermoderations.clearAllPlayerModerations,
            pathFormated: ApiPaths.playermoderations.clearAllPlayerModerations.path,
        };

        return await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);
    }
    
    /**
     * Returns a single Player Moderation. This returns the exact same amount of information as the more generalised `getPlayerModerations`.
     */
    public async getPlayerModeration({
        playerModerationId
    }: VRCAPI.PlayerModerations.Requests.GetPlayerModerationRequest): Promise<VRCAPI.PlayerModerations.Models.PlayerModeration> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.playermoderations.getPlayerModeration,
            pathFormated: ApiPaths.playermoderations.getPlayerModeration.path.replace('{playerModerationId}', playerModerationId),
        };

        return await this.executeRequest<VRCAPI.PlayerModerations.Models.PlayerModeration>(paramRequest);
    }
    
    /**
     * Deletes a specific player moderation based on it's `pmod_` ID. The website uses `unmoderateUser` instead. You can delete the same player moderation multiple times successfully.
     */
    public async deletePlayerModeration({
        playerModerationId
    }: VRCAPI.PlayerModerations.Requests.DeletePlayerModerationRequest): Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.playermoderations.deletePlayerModeration,
            pathFormated: ApiPaths.playermoderations.deletePlayerModeration.path.replace('{playerModerationId}', playerModerationId),
        };

        return await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);
    }
    
    /**
     * Removes a player moderation previously added through `moderateUser`. E.g if you previously have shown their avatar, but now want to reset it to default.
     */
    public async unmoderateUser({
        moderated,
        type
    }: VRCAPI.PlayerModerations.Requests.UnModerateUserRequest): Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.playermoderations.unmoderateUser,
            pathFormated: ApiPaths.playermoderations.unmoderateUser.path,
            body: {
                moderated,
                type
            }
        };

        return await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);
    }
}