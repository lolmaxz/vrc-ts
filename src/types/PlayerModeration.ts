//! --- PlayerModeration --- !//
export enum PlayerModerationType {
    Mute = 'mute',
    Unmute = 'unmute',
    Block = 'block',
    Unblock = 'unblock',
    InteractOn = 'interactOn',
    InteractOff = 'interactOff',
}

export type PlayerModeration = {
    id: string;
    type?: PlayerModerationType;
    sourceUserId?: string;
    sourceDisplayName?: string;
    targetUserId?: string;
    targetDisplayName?: string;
    created?: string;
};

//! --- Requests --- !//

/**
 * The data for requesting to search player moderations.
 */
export type SearchPlayerModerationsRequest = {
    type?: PlayerModerationType;
    targetUserId?: string;
};

export type dataKeysModerateUserRequest = {
    moderated: string;
    type: PlayerModerationType;
};

/**
 * The data for requesting to moderate a user.
 */
export type ModerateUserRequest = dataKeysModerateUserRequest;

/**
 * The data for requesting to get a player moderation.
 */
export type GetPlayerModerationRequest = {
    playerModerationId: string;
};

/**
 * The data for requesting to delete a player moderation.
 */
export type DeletePlayerModerationRequest = {
    playerModerationId: string;
};

export type dataKeysUnModerateUser = {
    moderated: string;
    type: PlayerModerationType;
};

/**
 * The data for requesting to unmoderate a user.
 */
export type UnModerateUserRequest = dataKeysUnModerateUser;
