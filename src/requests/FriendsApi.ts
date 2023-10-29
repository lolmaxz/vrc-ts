import { VRCWrapper } from "../VRCWrapper";
import { ApiPaths } from "../types/ApiPaths";
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
    public async listFriends({
        n: n,
        offset: offset,
        offline: offline = false,
    }: VRCAPI.Friends.Requests.ListFriendsRequest):Promise<VRCAPI.Users.Models.LimitedUser[]> {

        const parameters: URLSearchParams = new URLSearchParams();

        if (n) {
            if (n > 0 && n <= 100) {
                parameters.append('n', n.toString());
            }
        }

        if (offset) {
            if (offset >= 0) {
                parameters.append('offset', offset.toString());
            }
        }


        parameters.append('offline', offline.toString());

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.friends.listFriends,
            pathFormated: ApiPaths.friends.listFriends.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<VRCAPI.Users.Models.LimitedUser[]>(paramRequest);

    }

    /**
     * Send a friend request to another user.
     */
    public async sendFriendRequest({userId}: VRCAPI.Friends.Requests.SendFriendRequest):Promise<VRCAPI.Notifications.Models.Notification> {
            
            const paramRequest: VRCAPI.Generics.executeRequestType = {
                currentRequest: ApiPaths.friends.sendFriendRequest,
                pathFormated: ApiPaths.friends.sendFriendRequest.path.replace('{userId}', userId),
            };
    
            return await this.executeRequest<VRCAPI.Notifications.Models.Notification>(paramRequest);

    }

    /**
     * Deletes an outgoing pending friend request to another user. To delete an incoming friend request, use the `deleteNotification` endpoint instead.
     */
    public async deleteFriendRequest({ userId }: VRCAPI.Friends.Requests.DeleteFriendRequest):Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.friends.deleteFriendRequest,
            pathFormated: ApiPaths.friends.deleteFriendRequest.path.replace('{userId}', userId),
        };

        return await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);

    }

    /**
     * Retrieve if the user is currently a friend with a given user, if they have an outgoing friend request, and if they have an incoming friend request.
     * 
     * The proper way to receive and accept friend request is by checking if the user has an incoming `Notification` of type `friendRequest`, and then accepting that notification.
     */
    public async checkFriendStatus({userId}: VRCAPI.Friends.Requests.CheckFriendStatus):Promise<VRCAPI.Friends.Models.FriendStatus> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.friends.checkFriendStatus,
            pathFormated: ApiPaths.friends.checkFriendStatus.path.replace('{userId}', userId),
        };

        return await this.executeRequest<VRCAPI.Friends.Models.FriendStatus>(paramRequest)

    }

    /**
     * Unfriend a user by ID.
     */
    public async unfriend({userId}: VRCAPI.Friends.Requests.Unfriend):Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.friends.unfriend,
            pathFormated: ApiPaths.friends.unfriend.path.replace('{userId}', userId),
        };

        return await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);

    }
}