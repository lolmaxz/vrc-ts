//! --- Notifications --- !//

import { NotificationV2ResponseTypeEnum } from 'requests/VRCWebSocketApi';
import { GroupIdType, UserIdType } from './Generics';

export type NotificationBase = {
    id: string;
    senderUserId: string;
    senderUsername?: string; // Deprecated, but still included as it might be present
    type: NotificationTypes;
    message: string;
    receiverUserId?: string;
    seen?: boolean;
    created_at: Date;
};

export type Notification = NotificationBase & {
    details: string; // This will need to be parsed again
};

export type SentNotification = {
    id: string;
    recieiverUserId?: string;
    senderUserId?: string;
    type: NotificationTypes;
    message: string;
    details: string;
    created_at: string;
};

export enum NotificationTypes {
    FRIEND_REQUEST = 'friendRequest',
    INVITE = 'invite',
    INVITE_RESPONSE = 'inviteResponse',
    REQUEST_INVITE = 'requestInvite',
    MESSAGE = 'message',
    REQUEST_INVITE_RESPONSE = 'requestInviteResponse',
    VOTE_TO_KICK = 'votetokick',
}

//! --- Requests --- !//

/** Parameters required to request a list of notifications. */
export type ListNotificationsRequest = {
    type: NotificationTypes | 'all';
    hidden?: boolean;
    after?: 'five_minutes_ago';
    n?: number;
    offset?: number;
};

export type AcceptFriendRequestRequest = {
    notificationId: string;
};

export type MarkNotificationAsReadRequest = {
    notificationId: string;
};

export type DeleteNotificationRequest = {
    notificationId: string;
};

export type dataKeysRespondToNotificationRequest = {
    responseType: NotificationV2ResponseTypeEnum;
    responseData: string; // Should be a GroupId or UserId
};

/** The data for requesting to respond to an invite. */
export type RespondToNotificationRequest = {
    /** The notification id of the invite to respond to. */
    notificationId: string;
    /** The response type to the notification. */
    responseType: NotificationV2ResponseTypeEnum;
    groupId?: GroupIdType;
    userId?: UserIdType;
};
