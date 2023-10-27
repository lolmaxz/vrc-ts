declare namespace VRCAPI {
    namespace Notifications {
        namespace Models { // todo: implement

            type Notification = {
                created_at: Date;
                details: string; // You might want to parse this JSON string into an object after receiving it
                id: string;
                message: string;
                seen?: boolean;
                receiverUserId?: string;
                senderUserId: string;
                senderUsername?: string; // Deprecated, but still included as it might be present
                type: 'friendRequest' | 'invite' | 'inviteResponse' | 'requestInvite' | 'requestInviteResponse' | 'votetokick';
            };
            

        }
    }
}