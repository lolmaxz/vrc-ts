import WebSocket from 'ws';
import { BaseMyMember, GroupPermissionEnum } from '../types/Groups';
import { NotificationBase, NotificationTypes } from '../types/Notifications';
import { UserBase, UserUpdateWebSocket } from '../types/Users';
import { BaseWorld } from '../types/Worlds';
import { VRChatAPI } from '../VRChatAPI';

export enum EventType {
    /** When a user gets online, undocumented, untested! might be deprecated! */
    User_Online = 'user-online', // ? Unimplemented! Undocumented, untested!
    /** When a user updated it's information.
     * - WARNING Implemented by the documentation, untested! Might be deprecated! */
    User_Update = 'user-update', // ! Implemented by the documentation, untested!
    /** When a user changes location. This typically only triggers when YOU change worlds, not others. */
    User_Location = 'user-location',
    /** When a user gets offline, undocumented, untested! might be deprecated! */
    User_Offline = 'user-offline', // ? Unimplemented! Undocumented, untested!
    /** When a friend gets online. */
    Friend_Online = 'friend-online',
    /** When a friend is active. This is usually when they are browsing the website but not online in the game. */
    Friend_Active = 'friend-active',
    /** When a friend updated it's information. Implemented by the documentation, untested! Might be deprecated! */
    Friend_Update = 'friend-update', // Can't trigger // ! Implemented by the documentation, untested!
    /** When a friend changes location. This is when your friends are online and are changing worlds. */
    Friend_Location = 'friend-location',
    /** When a friend gets offline. */
    Friend_Offline = 'friend-offline',
    /** When a friend accepts your friend request. */
    Friend_Add = 'friend-add',
    /** When a friend removes you from their friends. */
    Friend_Delete = 'friend-delete',
    /** When a notification is received. Can be multiple things, friend request and more.*/
    Notification = 'notification',
    /** Notification Version 2. Typically only happens when a special type of events happen.
     *
     * Possible events:
     * - `NotificationV2GroupAnnouncement`
     *      - A notification that a group has a new announcement.
     * - `NotificationV2GroupInformative` *(More research needs to be done here)*
     *     - A notification that a group has a new informative message, can be one of the following:
     *          - When you are kicked from a group.
     *          - When you are banned from a group.
     * - `NotificationV2GroupInvite`
     *      - A notification that someone from a group invited you to their group.
     * - `NotificationV2GroupJoinRequest`
     *      - A notification that someone requested to join your group. Will only show up if you had the manage join request permision in said group.
     * */
    Notification_V2 = 'notification-v2',
    /** Notification Version 2, when a notification object needs to be updated. Implemented by the documentation, untested! Might be deprecated! */
    Notification_V2_Update = 'notification-v2-update', // ! Implemented by the documentation, untested!
    /** Notification Version 2, when a notification object needs to be deleted. */
    Notification_V2_Delete = 'notification-v2-delete',
    /** When a notification is shown, undocumented, untested! might be deprecated! */
    Show_Notification = 'show-notification', // ? Unimplemented! Undocumented, untested!
    /** When a notification is hidden. Implemented by the documentation, untested! Might be deprecated! */
    Hide_Notification = 'hide-notification', // ! Implemented by the documentation, untested!
    /** When receiving a notification reponse to another notification. Implemented by the documentation, untested! Might be deprecated! */
    Response_Notification = 'response-notification', // ! Implemented by the documentation, untested!
    /** When a notification is seen. Implemented by the documentation, untested! Might be deprecated! */
    See_Notification = 'see-notification', // ! Implemented by the documentation, untested!
    /** When a notification is cleared. Implemented by the documentation, untested! Might be deprecated! */
    Clear_Notification = 'clear-notification', // ! Implemented by the documentation, untested!
    /** When YOU update information about yourself. Not sure yet what triggers this, more research needs to be done. */
    Content_Refresh = 'content-refresh',
    // group types (new)
    /** When a user joins one of your groups. */
    Group_Join = 'group-joined',
    /** When a user leaves one of your groups. */
    Group_Leave = 'group-left',
    /** When a group member updated any information about them inside a group. */
    Group_Member_Updated = 'group-member-updated',
    /** When a group role is updated. Implemented by the documentation, untested! Might be deprecated! */
    Group_Role_Updated = 'group-role-updated', // ! Implemented by the documentation, untested!
    /** When a error happens, undocumented, untested! might be deprecated! */
    Error = 'error', // ? Unimplemented! Undocumented, untested!
    // adding special event types that are just type groups for the above
    /** Listen to all events. */
    All = 'all',
    /** Listen to all Friend events. */
    Friend = 'friend',
    /** Listen to all User events. */
    User = 'user',
    /** Listen to all Group events. */
    Group = 'group',
    /** Listen to all Notification V1 events. */
    Notification_V1_All = 'notification-v1-all',
    /** Listen to all Notification V2 events. */
    Notification_V2_All = 'notification-v2-all',
    /** Listen to all Notification events, both V1 & V2. */
    Notification_All = 'notification-all',
    /** When a friend request is received. */
    Friend_Request = 'friendRequest',
    /** When a request invite is received. */
    Request_Invite = 'requestInvite',
    /** When a invite is received. */
    Invite = 'invite',
    /** When a invite response is received. */
    Invite_Response = 'inviteResponse',
    /** When a request invite response is received. */
    Request_Invite_Response = 'requestInviteResponse',
    /** When a vote to kick is received. */
    Vote_To_Kick = 'votetokick',
    /** When a group announcement is received. */
    Group_Announcement = 'group.announcement',
    /** When a group invite is received. */
    Group_Invite = 'group.invite',
    /** When a group informative is received. */
    Group_Informative = 'group.informative',
    /** When a group join request is received. */
    Group_Join_Request = 'group.joinRequest',
}

type WebSocketParameters = {
    /** The VRChat API instance */
    vrchatAPI?: VRChatAPI;
    /** An array of events to listen to. If empty or ommited, then it will listen to all events. */
    eventsToListenTo?: EventType[];
    /** If true, then it will log all events to the console. */
    logAllEvents?: boolean;
    /** The custom URL to connect the WebSocket to. */
    customURL?: string;
    /** The custom User Agent to connect with. */
    customUserAgent?: string;
};

export class VRCWebSocket extends WebSocket {
    private heartbeatInterval: NodeJS.Timeout | null = null;
    public lastPingTimestamp: number | null = null;
    private baseClass?: VRChatAPI;
    badLoginDetected = false;
    lastPing: number = Date.now();
    private reconnectAttempts = 0;
    private reconnecting = false;
    private eventsToListenTo: EventType[] = [];
    private logAllEvents = false;
    private closing: boolean = false;

    /**
     *
     * @param vrchatAPI The VRChat API instance
     * @param eventsToListenTo An array of events to listen to. If empty or ommited, then it will listen to all events. This will limit the amount of event to emit.
     * @param logAllEvents If true, then it will log all events to the console.
     *
     * ## Events:
     * There are sub types as well as normal types if you want a category of events. For example:
     * - `Notification_V1_All` will listen to all notification v1 events.
     * - `Notification_V2_All` will listen to all notification v2 events.
     * - `Notification_All` will listen to all notification events, both v1 & v2.
     * - `Friend` will listen to all friend events.
     * - `User` will listen to all user events.
     * - `Group` will listen to all group events.
     * - `All` will listen to all events.
     *
     * ### Notification sub events:
     * - `Friend_Request` will listen to all friend request events.
     * - `Request_Invite` will listen to all request invite events.
     * - `Invite` will listen to all invite events.
     * - `Invite_Response` will listen to all invite response events.
     * - `Request_Invite_Response` will listen to all request invite response events.
     * - `Vote_To_Kick` will listen to all vote to kick events.
     *
     * ### Notification V2 sub events:
     * - `Group_Announcement` will listen to all group announcement events.
     * - `Group_Informative` will listen to all group informative events.
     * - `Group_Invite` will listen to all group invite events.
     * - `Group_Join_Request` will listen to all group join request events.
     *
     * .
     */
    constructor({
        vrchatAPI,
        eventsToListenTo = [],
        logAllEvents = false,
        customURL,
        customUserAgent,
    }: WebSocketParameters) {
        if (!vrchatAPI && !customURL) {
            throw new Error('You need to provide either a VRChat API instance or a custom URL to connect to!');
        }
        if (customURL && !customUserAgent && !vrchatAPI) {
            throw new Error(
                'You need to provide a custom User Agent if you are using a custom URL and no VRChat API instance!'
            );
        }
        super(
            customURL || vrchatAPI !== undefined
                ? `wss://vrchat.com/?authToken=${vrchatAPI?.instanceCookie.getAuthCookieKey()}`
                : '',
            {
                headers: {
                    'user-agent': customUserAgent || vrchatAPI?.headerAgent || 'ExampleProgram/0.0.1 my@email.com',
                },
            }
        );

        this.eventsToListenTo = eventsToListenTo;

        super.on('open', this.onOpen.bind(this));
        super.on('message', this.onMessage.bind(this));
        super.on('error', this.onError.bind(this));
        super.on('close', this.onClose.bind(this));
        super.on('terminate', this.onTerminate.bind(this));
        super.on('unexpected-response', (req, res) => {
            console.log('Unexpected response: ', res);
            console.log('Unexpected response: ', req);
        });
        super.on('ping', this.onPing.bind(this));

        this.baseClass = vrchatAPI;
        this.logAllEvents = logAllEvents;

        // depending on the event group types, we add all the events of that group to the eventsToListenTo array

        // if we want to listen to all notifications
        if (this.eventsToListenTo.includes(EventType.Notification_All)) {
            this.eventsToListenTo.push(EventType.Notification);
            this.eventsToListenTo.push(EventType.Notification_V2);
            this.eventsToListenTo.push(EventType.Notification_V2_Update);
            this.eventsToListenTo.push(EventType.Notification_V2_Delete);
            this.eventsToListenTo.push(EventType.Hide_Notification);
            this.eventsToListenTo.push(EventType.Response_Notification);
            this.eventsToListenTo.push(EventType.See_Notification);
            this.eventsToListenTo.push(EventType.Clear_Notification);
        }

        // if we want to listen to all notification v1
        if (this.eventsToListenTo.includes(EventType.Notification_V1_All)) {
            this.eventsToListenTo.push(EventType.Notification);
            this.eventsToListenTo.push(EventType.Hide_Notification);
            this.eventsToListenTo.push(EventType.Response_Notification);
            this.eventsToListenTo.push(EventType.See_Notification);
            this.eventsToListenTo.push(EventType.Clear_Notification);

            // we add the notification sub events
            this.eventsToListenTo.push(EventType.Friend_Request);
            this.eventsToListenTo.push(EventType.Request_Invite);
            this.eventsToListenTo.push(EventType.Invite);
            this.eventsToListenTo.push(EventType.Invite_Response);
            this.eventsToListenTo.push(EventType.Request_Invite_Response);
            this.eventsToListenTo.push(EventType.Vote_To_Kick);
        }

        // if we want to listen to all notification v2
        if (this.eventsToListenTo.includes(EventType.Notification_V2_All)) {
            this.eventsToListenTo.push(EventType.Notification_V2);
            this.eventsToListenTo.push(EventType.Notification_V2_Update);
            this.eventsToListenTo.push(EventType.Notification_V2_Delete);

            // we add the notification sub events
            this.eventsToListenTo.push(EventType.Group_Announcement);
            this.eventsToListenTo.push(EventType.Group_Informative);
            this.eventsToListenTo.push(EventType.Group_Invite);
            this.eventsToListenTo.push(EventType.Group_Join_Request);
        }

        // if we want to listen to all users
        if (this.eventsToListenTo.includes(EventType.User)) {
            this.eventsToListenTo.push(EventType.User_Online);
            this.eventsToListenTo.push(EventType.User_Update);
            this.eventsToListenTo.push(EventType.User_Location);
            this.eventsToListenTo.push(EventType.User_Offline);
        }

        // if we want to listen to all friends
        if (this.eventsToListenTo.includes(EventType.Friend)) {
            this.eventsToListenTo.push(EventType.Friend_Online);
            this.eventsToListenTo.push(EventType.Friend_Active);
            this.eventsToListenTo.push(EventType.Friend_Update);
            this.eventsToListenTo.push(EventType.Friend_Location);
            this.eventsToListenTo.push(EventType.Friend_Offline);
            this.eventsToListenTo.push(EventType.Friend_Add);
            this.eventsToListenTo.push(EventType.Friend_Delete);
        }

        // if we want to listen to all groups
        if (this.eventsToListenTo.includes(EventType.Group)) {
            this.eventsToListenTo.push(EventType.Group_Join);
            this.eventsToListenTo.push(EventType.Group_Leave);
            this.eventsToListenTo.push(EventType.Group_Member_Updated);
            this.eventsToListenTo.push(EventType.Group_Role_Updated);

            // we add the notification v2 events
            this.eventsToListenTo.push(EventType.Notification_V2);
            this.eventsToListenTo.push(EventType.Group_Announcement);
            this.eventsToListenTo.push(EventType.Group_Informative);
            this.eventsToListenTo.push(EventType.Group_Invite);
            this.eventsToListenTo.push(EventType.Group_Join_Request);
        }

        // if we want to listen to all events
        if (this.eventsToListenTo.includes(EventType.All)) {
            this.eventsToListenTo.push(EventType.User_Online);
            this.eventsToListenTo.push(EventType.User_Update);
            this.eventsToListenTo.push(EventType.User_Location);
            this.eventsToListenTo.push(EventType.User_Offline);
            this.eventsToListenTo.push(EventType.Friend_Online);
            this.eventsToListenTo.push(EventType.Friend_Active);
            this.eventsToListenTo.push(EventType.Friend_Update);
            this.eventsToListenTo.push(EventType.Friend_Location);
            this.eventsToListenTo.push(EventType.Friend_Offline);
            this.eventsToListenTo.push(EventType.Friend_Add);
            this.eventsToListenTo.push(EventType.Friend_Delete);
            this.eventsToListenTo.push(EventType.Notification);
            this.eventsToListenTo.push(EventType.Notification_V2);
            this.eventsToListenTo.push(EventType.Notification_V2_Update);
            this.eventsToListenTo.push(EventType.Notification_V2_Delete);
            this.eventsToListenTo.push(EventType.Show_Notification);
            this.eventsToListenTo.push(EventType.Hide_Notification);
            this.eventsToListenTo.push(EventType.Response_Notification);
            this.eventsToListenTo.push(EventType.See_Notification);
            this.eventsToListenTo.push(EventType.Clear_Notification);
            this.eventsToListenTo.push(EventType.Content_Refresh);
            this.eventsToListenTo.push(EventType.Group_Join);
            this.eventsToListenTo.push(EventType.Group_Leave);
            this.eventsToListenTo.push(EventType.Group_Member_Updated);
            this.eventsToListenTo.push(EventType.Group_Role_Updated);
            this.eventsToListenTo.push(EventType.Error);

            // we add the notification sub events
            this.eventsToListenTo.push(EventType.Friend_Request);
            this.eventsToListenTo.push(EventType.Request_Invite);
            this.eventsToListenTo.push(EventType.Invite);
            this.eventsToListenTo.push(EventType.Invite_Response);
            this.eventsToListenTo.push(EventType.Request_Invite_Response);
            this.eventsToListenTo.push(EventType.Vote_To_Kick);

            // we add the notification v2 events
            this.eventsToListenTo.push(EventType.Group_Announcement);
            this.eventsToListenTo.push(EventType.Group_Informative);
            this.eventsToListenTo.push(EventType.Group_Invite);
            this.eventsToListenTo.push(EventType.Group_Join_Request);
        }

        // if the user wants to listen to an event that is a sub event of notification, we need to add the notification event to the list
        if (
            this.eventsToListenTo.includes(EventType.Friend_Request) ||
            this.eventsToListenTo.includes(EventType.Invite) ||
            this.eventsToListenTo.includes(EventType.Invite_Response) ||
            this.eventsToListenTo.includes(EventType.Request_Invite) ||
            this.eventsToListenTo.includes(EventType.Request_Invite_Response) ||
            this.eventsToListenTo.includes(EventType.Vote_To_Kick)
        ) {
            this.eventsToListenTo.push(EventType.Notification);
        }

        // now the same for V2
        if (
            this.eventsToListenTo.includes(EventType.Group_Announcement) ||
            this.eventsToListenTo.includes(EventType.Group_Informative) ||
            this.eventsToListenTo.includes(EventType.Group_Invite) ||
            this.eventsToListenTo.includes(EventType.Group_Join_Request)
        ) {
            this.eventsToListenTo.push(EventType.Notification_V2);
        }
    }

    private onOpen(): void {
        console.log(
            'WebSocket Client Connected' + (this.baseClass !== undefined ? 'as ' + this.baseClass.username : '')
        );
        this.startHeartbeat();

        // Reset reconnection attempts on a successful connection
        this.reconnectAttempts = 0;
        this.reconnecting = false;
    }

    private onMessage(data: WebSocket.Data): void {
        // Handle incoming message
        if (process.env.WEBCLIENT_DEBUG === 'true') console.log('Received message RAW: ', data);

        // we stop if the data isn't a string or a buffer
        if (!(data instanceof Buffer)) {
            console.error('Received unsupported data type from WebSocket, type received: ' + typeof data);
            return;
        }

        const parsedMessage = JSON.parse(data.toString('utf8')) as AllWebSocketEventsTypes;
        if (process.env.WEBCLIENT_DEBUG === 'true') console.log('Buffer Message after parsing: ', parsedMessage);

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

            // we make sure we wanted to listen to this event
            if (this.eventsToListenTo.length > 0 && !this.eventsToListenTo.includes(messageObject.type)) {
                // console.log("We didn't wanted to listen to this event: ", messageObject.type);
                return;
            }

            switch (messageObject.type) {
                case EventType.Notification:
                    this.handleNotification(JSON.parse(messageObject.content) as NotificationWS);
                    this.emit(EventType.Notification, JSON.parse(messageObject.content) as NotificationWS);
                    break;
                case EventType.Notification_V2:
                    this.handleNotificationV2(JSON.parse(messageObject.content) as NotificationV2Types);
                    this.emit(EventType.Notification_V2, JSON.parse(messageObject.content) as NotificationV2Types);
                    break;
                case EventType.User_Location:
                    this.handleUserLocation(JSON.parse(messageObject.content) as UserLocation);
                    this.emit(EventType.User_Location, JSON.parse(messageObject.content) as UserLocation);
                    break;
                case EventType.User_Update:
                    this.handleUserUpdate(JSON.parse(messageObject.content) as UserUpdate);
                    this.emit(EventType.User_Update, JSON.parse(messageObject.content) as UserUpdate);
                    break;
                case EventType.Friend_Online:
                    this.handleFriendOnline(JSON.parse(messageObject.content) as FriendOnline);
                    this.emit(EventType.Friend_Online, JSON.parse(messageObject.content) as FriendOnline);
                    break;
                case EventType.Friend_Active:
                    this.handleFriendActive(JSON.parse(messageObject.content) as FriendActive);
                    this.emit(EventType.Friend_Active, JSON.parse(messageObject.content) as FriendActive);
                    break;
                case EventType.Friend_Update:
                    this.handleFriendUpdate(JSON.parse(messageObject.content) as FriendUpdate);
                    this.emit(EventType.Friend_Update, JSON.parse(messageObject.content) as FriendUpdate);
                    break;
                case EventType.Friend_Location:
                    this.handleFriendLocation(JSON.parse(messageObject.content) as FriendLocation);
                    this.emit(EventType.Friend_Location, JSON.parse(messageObject.content) as FriendLocation);
                    break;
                case EventType.Friend_Offline:
                    this.handleFriendOffline(JSON.parse(messageObject.content) as FriendOffline);
                    this.emit(EventType.Friend_Offline, JSON.parse(messageObject.content) as FriendOffline);
                    break;
                case EventType.Friend_Add:
                    this.handleFriendAdd(JSON.parse(messageObject.content) as FriendAdd);
                    this.emit(EventType.Friend_Add, JSON.parse(messageObject.content) as FriendAdd);
                    break;
                case EventType.Friend_Delete:
                    this.handleFriendDelete(JSON.parse(messageObject.content) as FriendDelete);
                    this.emit(EventType.Friend_Delete, JSON.parse(messageObject.content) as FriendDelete);
                    break;
                case EventType.Notification_V2_Update:
                    this.handleNotificationV2Update(JSON.parse(messageObject.content) as NotificationV2Update);
                    this.emit(
                        EventType.Notification_V2_Update,
                        JSON.parse(messageObject.content) as NotificationV2Update
                    );
                    break;
                case EventType.Notification_V2_Delete:
                    this.handleNotificationV2Delete(JSON.parse(messageObject.content) as NotificationV2Delete);
                    this.emit(
                        EventType.Notification_V2_Delete,
                        JSON.parse(messageObject.content) as NotificationV2Delete
                    );
                    break;
                case EventType.Hide_Notification:
                    this.handleHideNotification({ notificationId: messageObject.content } as HideNotification);
                    this.emit(EventType.Hide_Notification, {
                        notificationId: messageObject.content,
                    } as HideNotification);
                    break;
                case EventType.Response_Notification:
                    this.handleResponseNotification(JSON.parse(messageObject.content) as ResponseNotification);
                    this.emit(
                        EventType.Response_Notification,
                        JSON.parse(messageObject.content) as ResponseNotification
                    );
                    break;
                case EventType.See_Notification:
                    this.handleSeeNotification({ notificationId: messageObject.content } as SeeNotification);
                    this.emit(EventType.See_Notification, { notificationId: messageObject.content } as SeeNotification);
                    break;
                case EventType.Clear_Notification:
                    this.handleClearNotification();
                    this.emit(EventType.Clear_Notification);
                    break;
                case EventType.Content_Refresh:
                    this.handleContentRefresh(JSON.parse(messageObject.content) as ContentRefresh);
                    this.emit(EventType.Content_Refresh, JSON.parse(messageObject.content) as ContentRefresh);
                    break;
                case EventType.Group_Join:
                    this.handleGroupJoin(JSON.parse(messageObject.content) as GroupJoined);
                    this.emit(EventType.Group_Join, JSON.parse(messageObject.content) as GroupJoined);
                    break;
                case EventType.Group_Leave:
                    this.handleGroupLeave(JSON.parse(messageObject.content) as GroupLeft);
                    this.emit(EventType.Group_Leave, JSON.parse(messageObject.content) as GroupLeft);
                    break;
                case EventType.Group_Member_Updated:
                    this.handleGroupMemberUpdated(JSON.parse(messageObject.content) as GroupMemberUpdated);
                    this.emit(EventType.Group_Member_Updated, JSON.parse(messageObject.content) as GroupMemberUpdated);
                    break;
                case EventType.Group_Role_Updated:
                    this.handleGroupRoleUpdated(JSON.parse(messageObject.content) as GroupRoleUpdated);
                    this.emit(EventType.Group_Role_Updated, JSON.parse(messageObject.content) as GroupRoleUpdated);
                    break;
                default:
                    console.warn(`Unhandled message type: `, messageObject);
                    this.emit(EventType.Error, messageObject);
                    break;
            }
        } catch (error) {
            console.error(`Failed to parse message: `, error);
        }
    }

    private badRequestDisconect() {
        console.error('Bad request from WebSocket, error: ');
        this.badLoginDetected = true;
        super.close(); // we close the connection if the login is bad!
    }

    private onError(error: Error): void {
        console.error(`Connection Error: ${error.toString()}`);
    }

    private onClose(): void {
        console.log('WebSocket Connection Closed');
        if (!this.badLoginDetected && !this.reconnecting && !this.closing) this.reconnect(); // only if last login were correct, else we stop!
    }

    private onTerminate(): void {
        console.log('WebSocket Connection Terminated');
        this.closing = true;
        this.close();
    }

    public delete(): void {
        console.log('WebSocket Connection Closed and Deleted');
        this.reconnecting = true;
        this.close();
    }

    private reconnect(): void {
        // Avoid multiple reconnection attempts at the same time
        if (this.reconnecting) return;
        if (this.closing) return; // we stop if we are closing the connection
        this.reconnecting = true;
        // Exponential backoff for reconnection attempts
        const reconnectAfterMs = Math.min(10000, this.reconnectAttempts ** 2 * 1000);
        console.log(`Reconnecting in ${reconnectAfterMs / 1000} seconds...`);

        setTimeout(() => {
            this.reconnectAttempts++;
            console.log('Reconnected!');
            super.resume();
            super.on('open', this.onOpen.bind(this));
            super.on('message', this.onMessage.bind(this));
            super.on('error', this.onError.bind(this));
            super.on('close', this.onClose.bind(this));
            super.on('ping', this.onPing.bind(this));
        }, reconnectAfterMs);
    }

    private onPing(): void {
        this.lastPingTimestamp = Date.now();
        if (process.env.WEBCLIENT_DEBUG === 'true')
            console.log('ping' + (this.lastPing ? ' (' + (Date.now() - this.lastPing) + 'ms interval)' : ''));
        this.lastPing = Date.now();
    }

    private startHeartbeat(): void {
        this.heartbeatInterval = setInterval(() => {
            if (this.lastPingTimestamp !== null && Date.now() - this.lastPingTimestamp > 60000) {
                // It's been more than 60 seconds since the last ping from the server,
                // so assume the connection is dead and attempt to reconnect.
                if (this.heartbeatInterval) {
                    clearInterval(this.heartbeatInterval);
                }
                super.close();
            }
        }, 5000); // Check the connection every 5 seconds
    }

    private handleNotification(notification: NotificationWS): void {
        const notificationType = notification.type as string as EventType;
        // we make sure we want to listen to that event
        if (this.eventsToListenTo.length > 0 && !this.eventsToListenTo.includes(notificationType)) {
            // console.log("We didn't wanted to listen to this event: ", notificationType);
            return;
        }

        this.emit(notificationType, notification);

        switch (notificationType) {
            case EventType.Friend_Request:
                this.handleFriendRequest(notification);
                break;
            case EventType.Request_Invite:
                this.handleRequestInvite(notification);
                break;
            case EventType.Invite:
                this.handleInviteNotification(notification);
                break;
            case EventType.Invite_Response:
                this.handleInviteReponse(notification);
                break;
            case EventType.Request_Invite_Response:
                this.handleRequestInviteResponse(notification);
                break;
            case EventType.Vote_To_Kick:
                this.handleVoteToKick(notification);
                break;
            default:
                console.warn(`Unhandled notification type: ${notification.type}`);
        }
    }

    private handleVoteToKick(notification: NotificationWS) {
        if (this.logAllEvents) console.log('Vote to kick: ', notification);
    }

    private handleRequestInviteResponse(notification: NotificationWS) {
        if (this.logAllEvents) console.log('Request invite response: ', notification);
    }

    private handleInviteReponse(notification: NotificationWS) {
        if (this.logAllEvents) console.log('Invite response: ', notification);
    }

    private handleInviteNotification(notification: NotificationWS) {
        if (this.logAllEvents) console.log('Invite: ', notification);
    }

    private handleFriendRequest(notification: NotificationWS): void {
        if (this.logAllEvents) console.log('Friend request: ', notification);
    }

    private handleRequestInvite(notification: NotificationWS): void {
        if (this.logAllEvents) console.log('Request invite: ', notification);
    }

    private handleNotificationV2(notificationv2: NotificationV2Types) {
        const notificationType = notificationv2.type as string as EventType;
        // we make sure we want to listen to that event
        if (this.eventsToListenTo.length > 0 && !this.eventsToListenTo.includes(notificationType)) {
            // console.log("We didn't wanted to listen to this event: ", notificationType);
            return;
        }

        switch (notificationType) {
            case EventType.Group_Announcement:
                this.handleGroupAnnouncement(notificationv2 as NotificationV2GroupAnnouncement);
                this.emit(notificationType, notificationv2 as NotificationV2GroupAnnouncement);
                break;
            case EventType.Group_Invite:
                this.handleGroupInvite(notificationv2 as NotificationV2GroupInvite);
                this.emit(notificationType, notificationv2 as NotificationV2GroupInvite);
                break;
            case EventType.Group_Informative:
                this.handleGroupInformative(notificationv2 as NotificationV2GroupInformative);
                this.emit(notificationType, notificationv2 as NotificationV2GroupInformative);
                break;
            case EventType.Group_Join_Request:
                this.handleGroupJoinRequest(notificationv2 as NotificationV2GroupJoinRequest);
                this.emit(notificationType, notificationv2 as NotificationV2GroupJoinRequest);
                break;
            default:
                console.warn(`Unhandled notification type: ${notificationv2.type}`);
        }
    }

    private handleGroupAnnouncement(notificationv2: NotificationV2GroupAnnouncement) {
        if (this.logAllEvents) console.log('Group announcement: ', notificationv2);
    }

    private handleGroupInvite(notificationv2: NotificationV2GroupInvite) {
        if (this.logAllEvents) console.log('Group invite: ', notificationv2);
    }

    private handleGroupInformative(notificationv2: NotificationV2GroupInformative) {
        if (this.logAllEvents) console.log('Group informative: ', notificationv2);
    }

    private handleGroupJoinRequest(notificationv2: NotificationV2GroupJoinRequest) {
        if (this.logAllEvents) console.log('Group join request: ', notificationv2);
    }

    private handleUserUpdate(content: UserUpdate) {
        if (this.logAllEvents) console.log('User update: ', content);
    }

    private handleUserLocation(content: UserLocation) {
        if (this.logAllEvents) console.log('User location: ', content);
    }

    private handleFriendOnline(content: FriendOnline) {
        if (this.logAllEvents) console.log('Friend online: ', content);
    }

    private handleFriendActive(content: FriendActive) {
        if (this.logAllEvents) console.log('Friend active: ', content);
    }

    private handleFriendUpdate(content: FriendUpdate) {
        if (this.logAllEvents) console.log('Friend update: ', content);
    }

    private handleFriendLocation(content: FriendLocation) {
        if (this.logAllEvents) console.log('Friend location: ', content);
    }

    private handleFriendOffline(content: FriendOffline) {
        if (this.logAllEvents) console.log('Friend offline: ', content);
    }

    private handleFriendAdd(content: FriendAdd) {
        if (this.logAllEvents) console.log('Friend add: ', content);
    }

    private handleFriendDelete(content: FriendDelete) {
        if (this.logAllEvents) console.log('Friend delete: ', content);
    }

    private handleNotificationV2Update(content: NotificationV2Update) {
        if (this.logAllEvents) console.log('Notification v2 update: ', content);
    }

    private handleNotificationV2Delete(content: NotificationV2Delete) {
        if (this.logAllEvents) console.log('Notification v2 delete: ', content);
    }

    private handleHideNotification(content: HideNotification) {
        if (this.logAllEvents) console.log('Hide notification: ', content);
    }

    private handleResponseNotification(content: ResponseNotification) {
        if (this.logAllEvents) console.log('Response notification: ', content);
    }

    private handleSeeNotification(content: SeeNotification) {
        if (this.logAllEvents) console.log('See notification: ', content);
    }

    private handleClearNotification() {
        if (this.logAllEvents) console.log('Clear notification');
    }

    private handleContentRefresh(content: ContentRefresh) {
        if (this.logAllEvents) console.log('Content refresh: ', content);
    }

    private handleGroupJoin(content: GroupJoined) {
        if (this.logAllEvents) console.log('Group join: ', content);
    }

    private handleGroupLeave(content: GroupLeft) {
        if (this.logAllEvents) console.log('Group leave: ', content);
    }

    private handleGroupMemberUpdated(content: GroupMemberUpdated) {
        if (this.logAllEvents) console.log('Group member updated: ', content);
    }

    private handleGroupRoleUpdated(content: GroupRoleUpdated) {
        if (this.logAllEvents) console.log('Group role updated: ', content);
    }
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
};

enum NotificationV2TypeEvents {
    Group_Announcement = 'group.announcement',
    Group_Invite = 'group.invite',
    Group_Informative = 'group.informative',
    Group_Join_Request = 'group.joinRequest',
}

enum CategoryV2Enum {
    Social_Group = 'social.group',
}

export enum NotificationV2ResponseTypeEnum {
    Accept = 'accept',
    Decline = 'decline',
    Block = 'block',
    Unsubcribe = 'unsubscribe',
    Delete = 'delete',
    Reject = 'reject',
}

type NotificationType = {
    type: EventType.Notification;
    content: string;
};

export type NotificationWS = NotificationBase & {
    details: object; // This is a object already parsed
};

type ResponseNotificationType = {
    type: EventType.Response_Notification;
    content: string;
};

export type ResponseNotification = {
    /** example: not_00000000-0000-0000-000000000000 */
    notificationId: string;
    /** exmaple: usr_00000000-0000-0000-000000000000 */
    receiverId: string;
    /** example: not_00000000-0000-0000-000000000000 */
    responseId: string;
};

type SeeNotificationType = {
    type: EventType.See_Notification;
    /** The Id of the notification to mark as seen */
    content: string;
};

export type SeeNotification = {
    notificationId: string;
};

// hide notification type
type HideNotificationType = {
    type: EventType.Hide_Notification;
    /** Will be a friend request ID */
    content: string;
};

type HideNotification = {
    /** The Id of the notification to hide */
    notificationId: string;
};

type ClearNotificationType = {
    type: EventType.Clear_Notification;
};

type NotificationV2Type = {
    type: EventType.Notification_V2;
    content: string;
};

type NotificationV2ResponseType = {
    type: NotificationV2ResponseTypeEnum;
    data: string;
    icon: string;
    text: string;
    textKey: string;
};

type BaseNotificationV2 = {
    id: string;
    version: 2;
    type: NotificationV2TypeEvents;
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
    requireSeen?: boolean;
    seen?: boolean;
    canDelete?: boolean;
    created_at: string;
    updated_at: string;
};

export type NotificationV2GroupInvite = BaseNotificationV2 & {
    data: {
        groupName: string;
        manageruserDisplayName: string;
    };
};

export type NotificationV2GroupInformative = BaseNotificationV2 & {
    data: object;
};

export type NotificationV2GroupAnnouncement = BaseNotificationV2 & {
    data: {
        groupName: string;
        groupId: string;
        announcementTitle: string;
    };
};

export type NotificationV2GroupJoinRequest = BaseNotificationV2 & {
    data: {
        userDisplayName: string;
        groupName: string;
    };
};

export type NotificationV2Types =
    | NotificationV2GroupAnnouncement
    | NotificationV2GroupInformative
    | NotificationV2GroupInvite
    | NotificationV2GroupJoinRequest;

type NotificationV2DeleteType = {
    type: EventType.Notification_V2_Delete;
    content: string;
};

export type NotificationV2Delete = {
    ids: string[];
    version: 2;
};

type UserLocationType = {
    type: EventType.User_Location;
    content: string;
};

export type UserLocation = {
    userId: string;
    location: string;
    instance: string;
    worldId: string;
    user: UserBase;
    world: BaseWorld;
};

type ContentRefreshType = {
    type: EventType.Content_Refresh;
    content: string;
};

enum ContentTypeRefreshed {
    Gallery = 'gallery',
    Icon = 'icon',
    Emoji = 'emoji',
    World = 'world',
    Avatar = 'avatar',
}

enum ActionTypeRefreshed {
    Created = 'created',
    Updated = 'updated',
    Deleted = 'deleted',
}

export type ContentRefresh = {
    contentType: ContentTypeRefreshed;
    actionType: ActionTypeRefreshed;
};

// All notification types here

export type friendRequestNotification = {
    id: string;
    type: NotificationTypes.FRIEND_REQUEST;
    senderUserId: string;
    senderUsername?: string; // Deprecated, but still included as it might be present
    receiverUserId?: string;
    message: string;
    details: object; // might just be empty!
    created_at: string;
};

export type InviteNotification = {
    id: string;
    type: NotificationTypes.INVITE;
    senderUserId: string;
    senderUsername?: string; // Deprecated, but still included as it might be present
    receiverUserId?: string;
    message: string;
    details: {
        // ! read bellow
        /** Be careful, even tho vrchat identify this field as a worldId, it's actually an instanceId  */
        worldId: string;
        worldName: string;
    };
    created_at: string;
};

export type InviteResponseNotification = null; // todo to fill out this type

// -------

type FriendLocationType = {
    type: EventType.Friend_Location;
    content: string;
};

export type FriendLocation = {
    userId: string;
    location: string;
    platform: string;
    travelingToLocation: string;
    worldId: string;
    canRequestInvite: boolean;
    user: UserBase;
    world?: BaseWorld; // Not present if the user is in a private world and status set to Orange.
};

type FriendActiveType = {
    type: EventType.Friend_Active;
    content: string;
};

export type FriendActive = {
    userId: string;
    user: UserBase;
};

type FriendOnlineType = {
    type: EventType.Friend_Online;
    content: string;
};

export type FriendOnline = {
    userId: string;
    location: string;
    travelingToLocation: string;
    worldId: string;
    canRequestInvite: boolean;
    user: UserBase;
};

type FriendOfflineType = {
    type: EventType.Friend_Offline;
    content: string;
};

export type FriendOffline = {
    userId: string;
};

type FriendAddType = {
    type: EventType.Friend_Add;
    content: string;
};

export type FriendAdd = {
    userId: string;
    user: UserBase;
};

type FriendDeleteType = {
    type: EventType.Friend_Delete;
    content: string;
};

export type FriendDelete = {
    userId: string;
};

type GroupLeftType = {
    type: EventType.Group_Leave;
    content: string;
};

export type GroupLeft = {
    groupId: string;
};

type GroupJoinedType = {
    type: EventType.Group_Join;
    content: string;
};

export type GroupJoined = {
    groupId: string;
};

type GroupMemberUpdatedType = {
    type: EventType.Group_Member_Updated;
    content: string;
};

export type GroupMemberUpdated = {
    member: BaseMyMember;
};

// THOSE ARE BASED ON DOCUMENTATION AND MIGHT HAVE CHANGED OR NOT BE IMPLEMENTED OR REMOVED! BECAREFUL WITH THOSE IF YOU RECEIVE THEM!

type GroupRoleUpdatedType = {
    type: EventType.Group_Role_Updated;
    content: string;
};

// ! all field s are optional as this type couldn't be tested!
export type GroupRoleUpdated = {
    role?: {
        id?: string;
        groupId?: string;
        name?: string;
        description?: string;
        isSelfAssignable?: boolean;
        permissions?: GroupPermissionEnum[];
        isManagementRole?: boolean;
        requiresTwoFactor?: boolean;
        requiresPurchase?: boolean;
        order?: number;
        createdAt?: string; // assuming date-time is a string in ISO format
        updatedAt?: string; // assuming date-time is a string in ISO format
    };
};

type UserUpdateType = {
    type: EventType.User_Update;
    content: string;
};

export type UserUpdate = {
    userId: string;
    user: UserUpdateWebSocket;
};

type FriendUpdateType = {
    type: EventType.Friend_Update;
    content: string;
};

export type FriendUpdate = {
    userId: string;
    user: UserUpdateWebSocket;
};

type NotificationV2UpdateType = {
    type: EventType.Notification_V2_Update;
    content: string;
};

export type NotificationV2Update = {
    id: string;
    version: 2;
    updates: object; // can be nultiple things to update from another notification.
};
