declare namespace VRCAPI {
    namespace PlayerModerations {
        namespace Models {

            enum PlayerModerationType {
                Mute = 'mute',
                Unmute = 'unmute',
                Block = 'block',
                Unblock = 'unblock',
                InteractOn = 'interactOn',
                InteractOff = 'interactOff',
            }

            type PlayerModeration = {
                id: string;
                type?: PlayerModerationType;
                sourceUserId?: string;
                sourceDisplayName?: string;
                targetUserId?: string;
                targetDisplayName?: string;
                created?: string;
            }
        }

        namespace Requests {

            /**
             * The data for requesting to search player moderations.
             */
            type SearchPlayerModerationsRequest = {
                type?: Models.PlayerModerationType;
                targetUserId?: string;
            }

            type dataKeysModerateUserRequest = {
                moderated: string;
                type: VRCAPI.PlayerModerations.Models.PlayerModerationType;
            };

            /**
             * The data for requesting to moderate a user.
             */
            type ModerateUserRequest = dataKeysModerateUserRequest;

            /**
             * The data for requesting to get a player moderation.
             */
            type GetPlayerModerationRequest = {
                playerModerationId: string;
            }

            /**
             * The data for requesting to delete a player moderation.
             */
            type DeletePlayerModerationRequest = {
                playerModerationId: string;
            }

            type dataKeysUnModerateUser = {
                moderated: string;
                type: VRCAPI.PlayerModerations.Models.PlayerModerationType;
            };

            /**
             * The data for requesting to unmoderate a user.
             */
            type UnModerateUserRequest = dataKeysUnModerateUser;
        }
    }
}