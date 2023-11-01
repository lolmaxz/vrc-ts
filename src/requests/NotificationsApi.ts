import { VRChatAPI } from "../VRChatAPI";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the Notifications API.
 */
export class NotificationsApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    
    /**
     * Retrieve all of the current user's notifications.
     */
    public async listNotifications() {

    }
    
    /**
     * Accept a friend request by notification `frq_` ID. Friend requests can be found using the NotificationsAPI `listNotifications` by filtering of type `friendRequest`. // todo to recheck
     */
    public async acceptFriendRequest() {

    }
    
    /**
     * Mark a notification as seen.
     */
    public async markNotificationAsRead() {

    }
    
    /**
     * Delete a notification.
     */
    public async deleteNotification() {

    }
    
    /**
     * Clear **all** notifications.
     */
    public async clearAllNotifications() {

    }
}