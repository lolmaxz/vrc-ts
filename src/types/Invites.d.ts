declare namespace VRCAPI {
    namespace Invites {
        namespace Models {

            enum MessageType {
                Message = "message",
                Response = "response",
                Request = "request",
                Request_Response = "request_response"
            }
        }

        namespace Requests {

            type UserId = {
                /** The Id of the user you want to use with this request. */
                userId: string;
            }

            type dataKeysSendInvite = {
                /** The instance id of the instance */
                instanceId: string;
                /** the slot number of the message // todo to figure what this is? */
                messageSlot?: number;
            };

            /** The data for requesting to send an invite to a user. */
            type InviteUserRequest = UserId & dataKeysSendInvite;

            /** The data for requesting to send an invite to yourself. */
            type InviteSelfToInstanceRequest = {
                /** The instance id of the instance */
                instanceid: string;
                /** The World id to invite yourself to */
                worldid: string;
            }

            type dataKeysRequestInvite = {
                messageSlot: number;
            };

            /** The data for requesting to request an invite to a user. */
            type RequestInviteRequest = UserId & dataKeysRequestInvite;


            type dataKeysInviteResponse = {
                responseSlot: number;
            };

            /** The data for requesting to respond to an invite. */
            type InviteResponseRequest = dataKeysInviteResponse & {
                /** The notification id of the invite to respond to. */
                notificationId: string;
            }

            /** The data for requesting to get invite messages. */
            type ListInviteMessagesRequest = UserId & {
                /** The type of message to fetch, must be a valid InviteMessageType. */
                messageType: VRCAPI.Invites.Models.MessageType;
            }

            /** The data for requesting to get an invite message. */
            type GetInviteMessagesRequest = UserId & {
                /** The type of message to fetch, must be a valid InviteMessageType. */
                messageType: VRCAPI.Invites.Models.MessageType;
                /** The message slot to fetch of a given message type. Min 0┃Max 11 */
                slot?: number;
            }

            type dataKeysUpdateInviteMessage = {
                message: string;
            };

            /** The data for requesting to update an invite message. */
            type UpdateInviteMessageRequest = UserId & dataKeysUpdateInviteMessage & {
                /** The type of message to fetch, must be a valid InviteMessageType. */
                messageType: VRCAPI.Invites.Models.MessageType;
                /** The message slot to fetch of a given message type. Min 0┃Max 11 */
                slot?: number;
            }

            /** The data for requesting to reset an invite message. */
            type ResetInviteMessageRequest = UserId & {
                /** The type of message to fetch, must be a valid InviteMessageType. */
                messageType: VRCAPI.Invites.Models.MessageType;
                /** The message slot to fetch of a given message type. Min 0┃Max 11 */
                slot?: number;
            }
        }
    }
}