import { VRCWrapper } from "../VRCWrapper";
import { ApiPaths } from "../types/ApiPaths";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the Avatars API.
 */
export class AvatarsApi extends BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    /**
     * Get the current avatar for the user. This will return an error for any other user than the one logged in.
     */
    public async getOwnAvatars(): Promise<VRCAPI.Avatars.Models.Avatar> { 
                
                const paramRequest: VRCAPI.Generics.executeRequestType = {
                    currentRequest: ApiPaths.avatars.getOwnAvatar,
                    pathFormated: ApiPaths.avatars.getOwnAvatar.path,
                };
        
                const queryResult = await this.executeRequest<VRCAPI.Avatars.Models.Avatar>(paramRequest);
        
                return queryResult;
    

    }

    /**
     * Search and list avatars by query filters. You can only search your own or featured avatars. It is not possible as a normal user to search other peoples avatars.
     */
    public async searchAvatars(): Promise<VRCAPI.Avatars.Models.Avatar[]> {
            
            const paramRequest: VRCAPI.Generics.executeRequestType = {
                currentRequest: ApiPaths.avatars.searchAvatars,
                pathFormated: ApiPaths.avatars.searchAvatars.path,
            };
    
            const queryResult = await this.executeRequest<VRCAPI.Avatars.Models.Avatar[]>(paramRequest);
    
            return queryResult;

    }

    /**
     * Create an avatar. It's possible to optionally specify a ID if you want a custom one. Attempting to create an Avatar with an already claimed ID will result in a DB error.
     */
    public async createAvatars() {

    }

    /**
     * Get information about a specific Avatar.
     */
    public async getAvatar() {

    }

    /**
     * Update information about a specific avatar.
     */
    public async updateAvatar() {

    }

    /**
     * Delete an avatar. Notice an avatar is never fully "deleted", only its ReleaseStatus is set to "hidden" and the linked Files are deleted. The AvatarID is permanently reserved.
     */
    public async deleteAvatar() {

    }

    /**
     * Switches into that avatar.
     */
    public async selectAvatar() {

    }

    /**
     * Switches into that avatar as your fallback avatar.
     */
    public async selectFallbackAvatar() {

    }

    /**
     * Search and list favorited avatars by query filters.
     */
    public async listFavoritedAvatars() {

    }

}