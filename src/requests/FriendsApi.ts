import { VRCWrapper } from "../VRCWrapper";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the Friends API.
 */
export class FriendsApi extends BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    
    /**
     * List information about friends.
     */
    public async listFriends() {

    }
    
    /**
     * Send a friend request to another user.
     */
    public async sendFriendRequest() {

    }
    
    /**
     * Deletes an outgoing pending friend request to another user. To delete an incoming friend request, use the `deleteNotification` endpoint instead.
     */
    public async deleteFriendRequest() {

    }
    
    /**
     * Retrieve if the user is currently a friend with a given user, if they have an outgoing friend request, and if they have an incoming friend request.
     * 
     * The proper way to receive and accept friend request is by checking if the user has an incoming `Notification` of type `friendRequest`, and then accepting that notification.
     */
    public async checkFriendStatus() {

    }
    
    /**
     * Unfriend a user by ID.
     */
    public async unfriend() {

    }
}