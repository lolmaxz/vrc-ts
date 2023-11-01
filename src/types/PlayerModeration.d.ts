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
        }

        namespace Requests {

            type dataKeysModerateUserRequest = {
                moderated: string;
                type: VRCAPI.PlayerModerations.Models.PlayerModerationType;
            };

            /**
             * The data for requesting to moderate a user.
             */
            type ModerateUserRequest = dataKeysModerateUserRequest;

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