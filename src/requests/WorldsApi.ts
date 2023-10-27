import { VRCWrapper } from "../VRCWrapper";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the Worlds API.
 */
export class WorldsApi extends BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    
    /**
     * Search and list any worlds by query filters.
     */
    public async searchAllWorlds() {

    }
    
    /**
     * Create a new world. This endpoint requires `assetUrl` to be a valid File object with `.vrcw` file extension, and `imageUrl` to be a valid File object with an image file extension.
     */
    public async createWorld() {

    }
    
    /**
     * Search and list currently Active worlds by query filters.
     */
    public async listActiveWorlds() {

    }
    
    /**
     * Search and list favorited worlds by query filters.
     */
    public async listFavoritedWorlds() {

    }
    
    /**
     * Search and list recently visited worlds by query filters.
     */
    public async listRecentWorlds() {

    }
    
    /**
     * Get information about a specific World. Works unauthenticated but when so will always return `0` for certain fields.
     */
    public async getWorldbyID() {

    }
    
    /**
     * Update information about a specific World.
     */
    public async updateWorld() {

    }
    
    /**
     * Delete a world. Notice a world is never fully "deleted", only its ReleaseStatus is set to "hidden" and the linked Files are deleted. The WorldID is permanently reserved.
     */
    public async deleteWorld() {

    }
    
    /**
     * ⚠️ **DEPRECATED** ⚠️
     * 
     * Return a worlds custom metadata. This is currently believed to be unused. Metadata can be set with updateWorld and can be any arbitrary object.
     */
    public async getWorldMetadata() {

    }
    
    /**
     * Returns a worlds publish status.
     */
    public async getWorldPublishStatus() {

    }
    
    /**
     * Publish a world. You can only publish one world per week.
     */
    public async publishWorld() {

    }
    
    /**
     * Unpublish a world.
     */
    public async unpublishWorld() {

    }
    
    /**
     * Returns a worlds instance.
     */
    public async getWorldInstance() {

    }
}