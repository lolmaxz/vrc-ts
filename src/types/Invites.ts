//! --- Invites --- !//

export enum MessageType {
    Message = 'message',
    Response = 'response',
    Request = 'request',
    Request_Response = 'requestResponse',
}

export type InviteMessage = {
    id: string;
    slot: number;
    message: string;
    messageType: MessageType;
    updatedAt: string;
    remainingCooldownMinutes: number;
    canBeUpdated: boolean;
};

export type UpdatedInviteMessage = {
    message: string;
};

//! --- Requests --- !//

export type UserId = {
    /** The Id of the user you want to use with this request. */
    userId: string;
};

export type dataKeysSendInvite = {
    /** The instance id of the instance */
    instanceId: string;
    /** the slot number of the message // todo to figure what this is? */
    messageSlot?: number;
};

/** The data for requesting to send an invite to a user. */
export type InviteUserRequest = UserId & dataKeysSendInvite;

/** The data for requesting to send an invite to yourself. */
export type InviteMyselfToInstanceRequest = {
    /** The instance id of the instance */
    instanceid: string;
    /** The World id to invite yourself to */
    worldid: string;
};

export type dataKeysRequestInvite = {
    messageSlot: number;
};

/** The data for requesting to request an invite to a user. */
export type RequestInviteRequest = UserId & dataKeysRequestInvite;

export type dataKeysInviteResponse = {
    responseSlot: number;
};

/** The data for requesting to respond to an invite. */
export type InviteResponseRequest = dataKeysInviteResponse & {
    /** The notification id of the invite to respond to. */
    notificationId: string;
};

/** The data for requesting to get invite messages. */
export type ListInviteMessagesRequest = UserId & {
    /** The type of message to fetch, must be a valid InviteMessageType. */
    messageType: MessageType;
};

/** The data for requesting to get an invite message. */
export type GetInviteMessageRequest = UserId & {
    /** The type of message to fetch, must be a valid InviteMessageType. */
    messageType: MessageType;
    /** The message slot to fetch of a given message type. Min 0┃Max 11 */
    slot: number;
};

export type dataKeysUpdateInviteMessage = {
    message: string;
};

/** The data for requesting to update an invite message. */
export type UpdateInviteMessageRequest = UserId &
    dataKeysUpdateInviteMessage & {
        /** The type of message to fetch, must be a valid InviteMessageType. */
        messageType: MessageType;
        /** The message slot to fetch of a given message type. Min 0┃Max 11 */
        slot: number;
    };

/** The data for requesting to reset an invite message. */
export type ResetInviteMessageRequest = UserId & {
    /** The type of message to fetch, must be a valid InviteMessageType. */
    messageType: MessageType;
    /** The message slot to fetch of a given message type. Min 0┃Max 11 */
    slot: number;
};
