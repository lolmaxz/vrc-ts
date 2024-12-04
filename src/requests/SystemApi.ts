import { VRChatAPI } from '../VRChatAPI';
import { ApiPaths } from '../types/ApiPaths';
import { executeRequestType } from '../types/Generics';
import * as Sys from '../types/System';
import { BaseApi } from './BaseApi';

/**
 * This class is used to make requests to the System API.
 */
export class SystemApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    /**
     * API config contains configuration that the clients needs to work properly.
     *
     * Currently the most important value here is clientApiKey which is used for all other API endpoints.
     */
    public async fetchAPIConfig(): Promise<Sys.APIConfig> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.invites.updateInviteMessage,
            pathFormated: ApiPaths.invites.updateInviteMessage.path,
        };

        return await this.executeRequest<Sys.APIConfig>(paramRequest);
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
    public showInformationNotices() {
        console.log('This endpoint is still under development. Please check back later.');
    }

    /**
     * Fetches the CSS code to the frontend React website.
     */
    public downloadCSS() {
        console.log('This endpoint is still under development. Please check back later.');
    }

    /**
     * Fetches the JavaScript code to the frontend React website.
     */
    public downloadJavaScript() {
        console.log('This endpoint is still under development. Please check back later.');
    }

    /**
     * NOTE: The response type is not a JSON object, but a simple JSON integer.
     * @deprecated ⚠️ This endpoint is deprecated and will be removed in the future.
     */
    public checkAPIHealth() {
        console.log('This endpoint is still under development. Please check back later.');
    }

    /**
     * NOTE: The response type is not a JSON object, but a simple `number`.
     */
    public async currentOnlineUsers(): Promise<number> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.system.currentOnlineUsers,
            pathFormated: ApiPaths.system.currentOnlineUsers.path,
        };

        return await this.executeRequest<number>(paramRequest);
    }

    /**
     * Returns the current time of the API server.
     *
     * NOTE: The response type is not a JSON object, but a simple `string`.
     */
    public async currentSystemTime(): Promise<string> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.system.currentSystemTime,
            pathFormated: ApiPaths.system.currentSystemTime.path,
        };

        return await this.executeRequest<string>(paramRequest);
    }
}
