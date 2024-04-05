export type FriendStatus = {
    incomingRequest: boolean;
    isFriend: boolean;
    outgoingRequest: boolean;
};

export type UserId = {
    /** UserId of the User needed to perform this action on. **[REQUIRED]** */
    userId: string;
};

/** List information about friends. */
export type ListFriendsRequest = {
    /** The number of records to return. (Default: 60)*/
    n?: number;
    /** The number of records from the top of the list to offset the results by. (Default: 0)*/
    offset?: number;
    /** Returns only offline users if true, returns only online and active users if false*/
    offline?: boolean;
};

/** Send a friend request to another user. */
export type SendFriendRequest = UserId;

/** Deletes an outgoing pending friend request to another user. To delete an incoming friend request, use the `deleteNotification` endpoint instead. */
export type DeleteFriendRequest = UserId;

/** Retrieve if the user is currently a friend with a given user, if they have an outgoing friend request, and if they have an incoming friend request.
 *
 * The proper way to receive and accept friend request is by checking if the user has an incoming `Notification` of type `friendRequest`, and then accepting that notification. */
export type CheckFriendStatus = UserId;

/** Unfriend a user by ID. */
export type Unfriend = UserId;
