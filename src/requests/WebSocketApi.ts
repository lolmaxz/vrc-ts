import WebSocket from 'ws';
import { VRChatAPI } from '../VRChatAPI';

export enum EventType {
    User_Online = 'user-online', // ? Unimplemented! Undocumented, untested!
    User_Update = 'user-update', // ! Implemented by the documentation, untested!
    User_Location = 'user-location', // X
    User_Offline = 'user-offline', // ? Unimplemented! Undocumented, untested!
    Friend_Online = 'friend-online', // X
    Friend_Active = 'friend-active', // X
    Friend_Update = 'friend-update', // Can't trigger // ! Implemented by the documentation, untested!
    Friend_Location = 'friend-location', // X
    Friend_Offline = 'friend-offline', // X
    Friend_Add = 'friend-add', // X
    Friend_Delete = 'friend-delete', // X
    Notification = 'notification', // X
    Notification_V2 = 'notification-v2', // X
    Notification_V2_Update = 'notification-v2-update', // ! Implemented by the documentation, untested!
    Notification_V2_Delete = 'notification-v2-delete', // X
    Show_Notification = 'show-notification', // ? Unimplemented! Undocumented, untested!
    Hide_Notification = 'hide-notification', // ! Implemented by the documentation, untested!
    Response_Notification = 'response-notification', // ! Implemented by the documentation, untested!
    See_Notification = 'see-notification', // ! Implemented by the documentation, untested!
    Clear_Notification = 'clear-notification', // ! Implemented by the documentation, untested!
    Content_Refresh = 'content-refresh', // X
    // group types (new)
    Group_Join = 'group-joined', // X
    Group_Leave = 'group-left', // X
    Group_Member_Updated = 'group-member-updated', // X
    Group_Role_Updated = 'group-role-updated', // ! Implemented by the documentation, untested!
    Error = 'error' // ? Unimplemented! Undocumented, untested!
}

export class WebSocketClient {
    private ws: WebSocket;
    private heartbeatInterval: NodeJS.Timeout | null = null;
    public lastPingTimestamp: number | null = null;
    baseClass: VRChatAPI;
    badLoginDetected = false;
    lastPing: number = Date.now();
    private reconnectAttempts = 0;
    private reconnecting = false;

    constructor(baseClass: VRChatAPI) {
        this.ws = new WebSocket(`wss://vrchat.com/?authToken=${baseClass.instanceCookie.getAuthCookieKey()}`, {
            headers: {
                "user-agent": process.env.USER_AGENT || "ExampleBot/1.0.0"
            }
        });

        this.ws.on('open', this.onOpen.bind(this));
        this.ws.on('message', this.onMessage.bind(this));
        this.ws.on('error', this.onError.bind(this));
        this.ws.on('close', this.onClose.bind(this));
        this.ws.on("unexpected-response", (req, res) => {
            console.log("Unexpected response: ", res);
            console.log("Unexpected response: ", req);

        })
        this.ws.on("ping", this.onPing.bind(this));
        
        this.baseClass = baseClass;
    }

    private onOpen(): void {
        console.log('WebSocket Client Connecting as ' + this.baseClass.username + ' ...');
        this.startHeartbeat();

        // Reset reconnection attempts on a successful connection
        this.reconnectAttempts = 0;
        this.reconnecting = false;
    }

    private onMessage(data: WebSocket.Data): void {
        // Handle incoming message
        if (process.env.WEBCLIENT_DEBUG === 'true') console.log("Received message RAW: ", data);

        // we stop if the data isn't a string or a buffer
        if (!(data instanceof Buffer)) {
            console.error('Received unsupported data type from WebSocket, type received: ' + typeof data);
            return;
        }

        const parsedMessage = JSON.parse(data.toString('utf8')) as AllWebSocketEventsTypes;
        if (process.env.WEBCLIENT_DEBUG === 'true') console.log("Buffer Message after parsing: ", parsedMessage);

        if (typeof parsedMessage === 'object' && 'err' in parsedMessage) {
            this.badRequestDisconect();
            return;
        }

        try {
            const messageObject: AllWebSocketEventsTypes = parsedMessage;

            // double safety
            if (messageObject.type === 'error') {
                this.badRequestDisconect();
                return;
            }

            switch (messageObject.type) {
                case EventType.Notification:
                    this.handleNotification(JSON.parse(messageObject.content) as Notification);
                    break;
                case EventType.Notification_V2:
                    this.handleNotificationV2(JSON.parse(messageObject.content) as NotificationV2Types);
                    break;
                case EventType.User_Location:
                    this.handleUserLocation(JSON.parse(messageObject.content) as UserLocation);
                    break;
                case EventType.User_Update:
                    this.handleUserUpdate(JSON.parse(messageObject.content) as UserUpdate);
                    break;
                case EventType.Friend_Online:
                    this.handleFriendOnline(JSON.parse(messageObject.content) as FriendOnline);
                    break;
                case EventType.Friend_Active:
                    this.handleFriendActive(JSON.parse(messageObject.content) as FriendActive);
                    break;
                case EventType.Friend_Update:
                    this.handleFriendUpdate(JSON.parse(messageObject.content) as FriendUpdate);
                    break;
                case EventType.Friend_Location:
                    this.handleFriendLocation(JSON.parse(messageObject.content) as FriendLocation);
                    break;
                case EventType.Friend_Offline:
                    this.handleFriendOffline(JSON.parse(messageObject.content) as FriendOffline);
                    break;
                case EventType.Friend_Add:
                    this.handleFriendAdd(JSON.parse(messageObject.content) as FriendAdd);
                    break;
                case EventType.Friend_Delete:
                    this.handleFriendDelete(JSON.parse(messageObject.content) as FriendDelete);
                    break;
                case EventType.Notification_V2_Update:
                    this.handleNotificationV2Update(JSON.parse(messageObject.content) as NotificationV2Update);
                    break;
                case EventType.Notification_V2_Delete:
                    this.handleNotificationV2Delete(JSON.parse(messageObject.content) as NotificationV2Delete);
                    break;
                case EventType.Hide_Notification:
                    this.handleHideNotification(JSON.parse(messageObject.content) as HideNotification);
                    break;
                case EventType.Response_Notification:
                    this.handleResponseNotification(JSON.parse(messageObject.content) as ResponseNotification);
                    break;
                case EventType.See_Notification:
                    this.handleSeeNotification(JSON.parse(messageObject.content) as SeeNotification);
                    break;
                case EventType.Clear_Notification:
                    this.handleClearNotification();
                    break;
                case EventType.Content_Refresh:
                    this.handleContentRefresh(JSON.parse(messageObject.content) as ContentRefresh);
                    break;
                case EventType.Group_Join:
                    this.handleGroupJoin(JSON.parse(messageObject.content) as GroupJoined);
                    break;
                case EventType.Group_Leave:
                    this.handleGroupLeave(JSON.parse(messageObject.content) as GroupLeft);
                    break;
                case EventType.Group_Member_Updated:
                    this.handleGroupMemberUpdated(JSON.parse(messageObject.content) as GroupMemberUpdated);
                    break;
                case EventType.Group_Role_Updated:
                    this.handleGroupRoleUpdated(JSON.parse(messageObject.content) as GroupRoleUpdated);
                    break;
                default:
                    console.warn(`Unhandled message type: `, messageObject);
                    break;
            }

            // ... other message handling code ...
        } catch (error) {
            console.error(`Failed to parse message: `, error);
        }
    }

    private badRequestDisconect() {
        console.error('Bad request from WebSocket, error: ');
        this.badLoginDetected = true;
        this.ws.close(); // we close the connection if the login is bad!
    }

    private onError(error: Error): void {
        console.error(`Connection Error: ${error.toString()}`);
    }

    private onClose(): void {
        console.log('WebSocket Connection Closed');
        if (!this.badLoginDetected && !this.reconnecting) this.reconnect(); // only if last login were correct, else we stop!
    }

    private reconnect(): void {
        // Avoid multiple reconnection attempts at the same time
        if (this.reconnecting) return;
        this.reconnecting = true;
        // Exponential backoff for reconnection attempts
        const reconnectAfterMs = Math.min(10000, (this.reconnectAttempts ** 2) * 1000);
        console.log(`Reconnecting in ${reconnectAfterMs / 1000} seconds...`);

        setTimeout(() => {
            this.reconnectAttempts++;
            console.log('Reconnecting...');
            this.ws = new WebSocket(`wss://vrchat.com/?authToken=${this.baseClass.instanceCookie.getAuthCookieKey()}`, {
                headers: {
                    "user-agent": process.env.USER_AGENT || "ExampleBot/1.0.0",
                    // "cookies": `${this.baseClass.instanceCookie.formatAll()}`
                }
            });
            this.ws.on('open', this.onOpen.bind(this));
            this.ws.on('message', this.onMessage.bind(this));
            this.ws.on('error', this.onError.bind(this));
            this.ws.on('close', this.onClose.bind(this));
            this.ws.on("ping", this.onPing.bind(this));
        }, reconnectAfterMs)
    }

    private onPing(): void {
        this.lastPingTimestamp = Date.now();
        if (process.env.WEBCLIENT_DEBUG === 'true') console.log('ping' + (this.lastPing ? " (" + (Date.now() - this.lastPing) + "ms interval)" : ""));
        this.lastPing = Date.now();
    }

    private startHeartbeat(): void {
        this.heartbeatInterval = setInterval(() => {
            if (this.lastPingTimestamp !== null && (Date.now() - this.lastPingTimestamp) > 60000) {
                // It's been more than 60 seconds since the last ping from the server,
                // so assume the connection is dead and attempt to reconnect.
                if (this.heartbeatInterval) {
                    clearInterval(this.heartbeatInterval);
                }
                this.ws.close();
            }
        }, 5000);  // Check the connection every 5 seconds
    }

    private handleNotification(notification: Notification): void {
        const notificationType = notification.type;

        switch (notificationType) {
            case 'friendRequest':
                this.handleFriendRequest(notification);
                break;
            case 'requestInvite':
                this.handleRequestInvite(notification);
                break;
            case 'invite':
                this.handleInviteNotification(notification);
                break;
            case 'inviteResponse':
                this.handleInviteReponse(notification);
                break;
            case 'requestInviteResponse':
                this.handleRequestInviteResponse(notification);
                break;
            case 'votetokick':
                this.handleVoteToKick(notification);
                break;
            default:
                console.warn(`Unhandled notification type: ${notificationType}`);
        }
    }

    private handleVoteToKick(notification: Notification) {
        console.log("Vote to kick: ", notification);

    }

    private handleRequestInviteResponse(notification: Notification) {
        console.log("Request invite response: ", notification);

    }

    private handleInviteReponse(notification: Notification) {
        console.log("Invite response: ", notification);
    }

    private handleInviteNotification(notification: Notification) {
        console.log("Invite: ", notification);
    }

    private handleFriendRequest(notification: object): void {
        // ... handle friend request ...
        console.log("Friend request: ", notification);

    }

    private handleRequestInvite(notification: object): void {
        // ... handle request invite ...
        console.log("Request invite: ", notification);
    }

    private handleNotificationV2(notificationv2: NotificationV2Types) {
        const notificationType = notificationv2.type;

        switch (notificationType) {
            case notificationV2TypeEnum.Group_Announcement:
                this.handleGroupAnnouncement(notificationv2 as NotificationV2GroupAnnouncement);
                break;
            case notificationV2TypeEnum.Group_Invite:
                this.handleGroupInvite(notificationv2 as NotificationV2GroupInvite);
                break;
            case notificationV2TypeEnum.Group_Informative:
                this.handleGroupInformative(notificationv2 as NotificationV2GroupInformative);
                break;
            default:
                console.warn(`Unhandled notification type: ${notificationv2.type}`);
        }
    }

    private handleGroupAnnouncement(notificationv2: NotificationV2GroupAnnouncement) {
        console.log("Group announcement: ", notificationv2);
    }

    private handleGroupInvite(notificationv2: NotificationV2GroupInvite) {
        console.log("Group invite: ", notificationv2);
    }

    private handleGroupInformative(notificationv2: NotificationV2GroupInformative) {
        console.log("Group informative: ", notificationv2);
    }


    private handleUserUpdate(content: UserUpdate) {
        console.log("User update: ", content);
    }

    private handleUserLocation(content: UserLocation) {
        console.log("User location: ", content);
    }

    private handleFriendOnline(content: FriendOnline) {
        console.log("Friend online: ", content);
    }

    private handleFriendActive(content: FriendActive) {
        console.log("Friend active: ", content);
    }

    private handleFriendUpdate(content: FriendUpdate) {
        console.log("Friend update: ", content);
    }

    private handleFriendLocation(content: FriendLocation) {
        console.log("Friend location: ", content);
    }

    private handleFriendOffline(content: FriendOffline) {
        console.log("Friend offline: ", content);
    }

    private handleFriendAdd(content: FriendAdd) {
        console.log("Friend add: ", content);
    }

    private handleFriendDelete(content: FriendDelete) {
        console.log("Friend delete: ", content);
    }

    private handleNotificationV2Update(content: NotificationV2Update) {
        console.log("Notification v2 update: ", content);
    }

    private handleNotificationV2Delete(content: NotificationV2Delete) {
        console.log("Notification v2 delete: ", content);
    }

    private handleHideNotification(content: HideNotification) {
        console.log("Hide notification: ", content);
    }

    private handleResponseNotification(content: ResponseNotification) {
        console.log("Response notification: ", content);
    }

    private handleSeeNotification(content: SeeNotification) {
        console.log("See notification: ", content);
    }

    private handleClearNotification() {
        console.log("Clear notification");
    }

    private handleContentRefresh(content: ContentRefresh) {
        console.log("Content refresh: ", content);
    }

    private handleGroupJoin(content: GroupJoined) {
        console.log("Group join: ", content);

    }

    private handleGroupLeave(content: GroupLeft) {
        console.log("Group leave: ", content);
    }

    private handleGroupMemberUpdated(content: GroupMemberUpdated) {
        console.log("Group member updated: ", content);
    }

    private handleGroupRoleUpdated(content: GroupRoleUpdated) {
        console.log("Group role updated: ", content);
    }


    // on(event: VRCAPI.WebSockets.EventType, handlerCallback: (content: unknown) => void) {
    //     this.EventEmitter.on(event, handlerCallback);
    // }

}

type AllWebSocketEventsTypes =
    | UserUpdateType
    | UserLocationType
    | FriendOnlineType
    | FriendActiveType
    | FriendUpdateType
    | FriendLocationType
    | FriendOfflineType
    | FriendAddType
    | FriendDeleteType
    | NotificationType
    | NotificationV2Type
    | NotificationV2DeleteType
    | NotificationV2UpdateType
    | HideNotificationType
    | ResponseNotificationType
    | SeeNotificationType
    | ClearNotificationType
    | ContentRefreshType
    | GroupJoinedType
    | GroupLeftType
    | GroupMemberUpdatedType
    | GroupRoleUpdatedType
    | WebSocketError;

type WebSocketError = {
    type: 'error';
    err?: string;
    authToken?: string;
    ip?: string;
}


enum notificationV2TypeEnum {
    Group_Announcement = 'group.announcement',
    Group_Invite = 'group.invite',
    Group_Informative = 'group.informative',
    Group_Join_Request = 'group.joinRequest'
}

enum CategoryV2Enum {
    Social_Group = 'social.group',
}

enum NotificationV2ResponseTypeEnum {
    Accept = 'accept',
    Decline = 'decline',
    Block = 'block',
    Unsubcribe = 'unsubscribe',
    Delete = 'delete',
    Reject = 'reject'
}

type NotificationType = {
    type: EventType.Notification;
    content: string;
}

export type Notification = VRCAPI.Notifications.Models.NotificationBase & {
    details: object; // This is a object already parsed
}

type ResponseNotificationType = {
    type: EventType.Response_Notification;
    content: string;
}

export type ResponseNotification = {
    /** example: not_00000000-0000-0000-000000000000 */
    notificationId: string;
    /** exmaple: usr_00000000-0000-0000-000000000000 */
    receiverId: string;
    /** example: not_00000000-0000-0000-000000000000 */
    responseId: string;
}

type SeeNotificationType = {
    type: EventType.See_Notification;
    /** The Id of the notification to mark as seen */
    content: string;
}

export type SeeNotification = {
    notificationId: string;
}

// hide notification type
type HideNotificationType = {
    type: EventType.Hide_Notification;
    /** Will be a friend request ID */
    content: string;
}

type HideNotification = {
    /** The Id of the notification to hide */
    notificationId: string;
}

type ClearNotificationType = {
    type: EventType.Clear_Notification;
}

type NotificationV2Type = {
    type: EventType.Notification_V2;
    content: string;
}

type NotificationV2ResponseType = {
    type: NotificationV2ResponseTypeEnum;
    data: string;
    icon: string;
    text: string;
    textKey: string;
}

type BaseNotificationV2 = {
    id: string;
    version: 2;
    type: notificationV2TypeEnum;
    category?: CategoryV2Enum;
    isSystem: boolean;
    ignoreDND: boolean;
    senderUserId?: string;
    senderUsername?: string;
    receiverUserId?: string;
    relatedNotificationsId?: string;
    title: string;
    titleKey?: string;
    message: string;
    messageKey?: string;
    imageUrl?: string;

    link: string;
    linkText?: string;
    responses?: NotificationV2ResponseType[];
    expiresIn?: string;
    expiryAfterSeen?: number;
    requireSeen?: boolean
    seen?: boolean;
    canDelete?: boolean;
    created_at: string;
    updated_at: string;
}

export type NotificationV2GroupInvite = BaseNotificationV2 & {
    data: {
        groupName: string;
        manageruserDisplayName: string;
    }
}

export type NotificationV2GroupInformative = BaseNotificationV2 & {
    data: object;
}

export type NotificationV2GroupAnnouncement = BaseNotificationV2 & {
    data: {
        groupName: string;
        announcementTitle: string;
    }
}

export type NotificationV2GroupJoinRequest = BaseNotificationV2 & {
    data: {
        userDisplayName: string;
        groupName: string;
    }
}

export type NotificationV2Types = NotificationV2GroupAnnouncement | NotificationV2GroupInformative | NotificationV2GroupInvite | NotificationV2GroupJoinRequest;

type NotificationV2DeleteType = {
    type: EventType.Notification_V2_Delete;
    content: string;
}

export type NotificationV2Delete = {
    ids: string[];
    version: 2;
}

type UserLocationType = {
    type: EventType.User_Location;
    content: string;
}

export type UserLocation = {
    userId: string;
    location: string;
    instance: string;
    worldId: string;
    user: VRCAPI.Users.Models.UserBase;
    world: VRCAPI.Worlds.Models.BaseWorld;
}

type ContentRefreshType = {
    type: EventType.Content_Refresh;
    content: string;
}

enum ContentTypeRefreshed {
    Gallery = 'gallery',
    Icon = 'icon',
    Emoji = 'emoji',
    World = 'world',
    Avatar = 'avatar'
}

enum ActionTypeRefreshed {
    Created = 'created',
    Updated = 'updated',
    Deleted = 'deleted'
}

export type ContentRefresh = {
    contentType: ContentTypeRefreshed,
    actionType: ActionTypeRefreshed,
}


// All notification types here

export type friendRequestNotification = {
    id: string;
    type: VRCAPI.Notifications.Models.NotificationType.FRIEND_REQUEST;
    senderUserId: string;
    senderUsername?: string; // Deprecated, but still included as it might be present
    receiverUserId?: string;
    message: string;
    details: object; // might just be empty!
    created_at: string;
}

export type InviteNotification = {
    id: string;
    type: VRCAPI.Notifications.Models.NotificationType.INVITE;
    senderUserId: string;
    senderUsername?: string; // Deprecated, but still included as it might be present
    receiverUserId?: string;
    message: string;
    details: {
        // ! read bellow
        /** Be careful, even tho vrchat identify this field as a worldId, it's actually a instanceId  */
        worldId: string;
        worldName: string;
    };
    created_at: string;
}

export type InviteResponseNotification = null; // todo to fill out this type

// -------

type FriendLocationType = {
    type: EventType.Friend_Location;
    content: string;
}

export type FriendLocation = {
    userId: string;
    location: string;
    travelingToLocation: string;
    worldId: string;
    canRequestInvite: boolean;
    user: VRCAPI.Users.Models.UserBase;
    world: VRCAPI.Worlds.Models.BaseWorld;
}

type FriendActiveType = {
    type: EventType.Friend_Active;
    content: string;
}

export type FriendActive = {
    userId: string;
    user: VRCAPI.Users.Models.UserBase;
}

type FriendOnlineType = {
    type: EventType.Friend_Online;
    content: string;
}

export type FriendOnline = {
    userId: string;
    location: string;
    travelingToLocation: string;
    worldId: string;
    canRequestInvite: boolean;
    user: VRCAPI.Users.Models.UserBase;
}

type FriendOfflineType = {
    type: EventType.Friend_Offline;
    content: string;
}

export type FriendOffline = {
    userId: string;
}

type FriendAddType = {
    type: EventType.Friend_Add;
    content: string;
};

export type FriendAdd = {
    userId: string;
    user: VRCAPI.Users.Models.User;
};

type FriendDeleteType = {
    type: EventType.Friend_Delete;
    content: string;
}

export type FriendDelete = {
    userId: string;
}

type GroupLeftType = {
    type: EventType.Group_Leave;
    content: string;
}

export type GroupLeft = {
    groupId: string;
}

type GroupJoinedType = {
    type: EventType.Group_Join;
    content: string;
}

export type GroupJoined = {
    groupId: string;
}

type GroupMemberUpdatedType = {
    type: EventType.Group_Member_Updated;
    content: string;
}

export type GroupMemberUpdated = {
    member: VRCAPI.Groups.Models.BaseMyMember
}

// THOSE ARE BASED ON DOCUMENTATION AND MIGHT HAVE CHANGED OR NOT BE IMPLEMENTED OR REMOVED! BECAREFUL WITH THOSE IF YOU RECEIVE THEM!

type GroupRoleUpdatedType = {
    type: EventType.Group_Role_Updated;
    content: string;
}

// ! all field s are optional as this type couldn't be tested!
export type GroupRoleUpdated = {
    role?: {
        id?: string;
        groupId?: string;
        name?: string;
        description?: string;
        isSelfAssignable?: boolean;
        permissions?: VRCAPI.Groups.Models.GroupPermissionEnum[];
        isManagementRole?: boolean;
        requiresTwoFactor?: boolean;
        requiresPurchase?: boolean;
        order?: number;
        createdAt?: string; // assuming date-time is a string in ISO format
        updatedAt?: string; // assuming date-time is a string in ISO format
    }
}

type UserUpdateType = {
    type: EventType.User_Update;
    content: string;
}

export type UserUpdate = {
    userId: string;
    user: VRCAPI.Users.Models.UserUpdateWebSocket;
}

type FriendUpdateType = {
    type: EventType.Friend_Update;
    content: string;
}

export type FriendUpdate = {
    userId: string;
    user: VRCAPI.Users.Models.UserUpdateWebSocket;
}

type NotificationV2UpdateType = {
    type: EventType.Notification_V2_Update;
    content: string;
}

export type NotificationV2Update = {
    id: string;
    version: 2;
    updates: object; // can be nultiple things to update from another notification.
}