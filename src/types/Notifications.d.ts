declare namespace VRCAPI {
    namespace Notifications {
        namespace Models { // todo: implement

            type NotificationBase = {
                id: string;
                senderUserId: string;
                senderUsername?: string; // Deprecated, but still included as it might be present
                type: NotificationType;
                message: string;
                receiverUserId?: string;
                seen?: boolean;
                created_at: Date;
            }

            type Notification = NotificationBase & {
                details: string; // This will need to be parsed again
            };

            type SentNotification = {
                id: string;
                recieiverUserId?: string;
                senderUserId?: string;
                type: NotificationType;
                message: string;
                details: string;
                created_at: string;
            }

            enum NotificationType {
                FRIEND_REQUEST = 'friendRequest',
                INVITE = 'invite',
                INVITE_RESPONSE = 'inviteResponse',
                REQUEST_INVITE = 'requestInvite',
                REQUEST_INVITE_RESPONSE = 'requestInviteResponse',
                VOTE_TO_KICK = 'votetokick'
            }
        }

        namespace Requests {

            /** Parameters required to request a list of notifications. */
            type ListNotificationsRequest = {
                type: Models.NotificationType | 'all';
                hidden?: boolean;
                after?: 'five_minutes_ago';
                n?: number;
                offset?: number;
            }

            type AcceptFriendRequestRequest = {
                notificationId: string;
            }

            type MarkNotificationAsReadRequest = {
                notificationId: string;
            }

            type DeleteNotificationRequest = {
                notificationId: string;
            }
        }
    }
}