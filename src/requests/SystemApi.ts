import { VRCWrapper } from "../VRCWrapper";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the System API.
 */
export class SystemApi extends BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    
    /**
     * API config contains configuration that the clients needs to work properly.
     * 
     * Currently the most important value here is clientApiKey which is used for all other API endpoints.
     */
    public async fetchAPIConfig() {

    }
    
    /**
     * ⚠️ **Status: Early Access (Still Under Development)**
     * 
     * IPS (Info Push System) is a system for VRChat to push out dynamic information to the client. This is primarily used by the Quick-Menu info banners, but can also be used to e.g. alert you to update your game to the latest version.
     * 
     * `include` is used to query what Information Pushes should be included in the response. If include is missing or empty, then no notices will normally be returned. This is an "any of" search.
     * 
     * `require` is used to limit what Information Pushes should be included in the response. This is usually used in combination with `include`, and is an "all of" search.
     */
    public async showInformationNotices() {

    }
    
    /**
     * Fetches the CSS code to the frontend React website.
     */
    public async downloadCSS() {

    }
    
    /**
     * Fetches the JavaScript code to the frontend React website.
     */
    public async downloadJavaScript() {

    }
    
    /**
     * NOTE: The response type is not a JSON object, but a simple JSON integer.
     */
    public async checkAPIHealth() {

    }
    
    /**
     * NOTE: The response type is not a JSON object, but a simple `number`.
     */
    public async currentOnlineUsers() {

    }
    
    /**
     * Returns the current time of the API server.
     * 
     * NOTE: The response type is not a JSON object, but a simple `string`.
     */
    public async currentSystemTime() {

    }
}