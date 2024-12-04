import { PlayerModerationObjectIdType, UserIdType } from './Generics';

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
    id: PlayerModerationObjectIdType;
    type?: PlayerModerationType;
    sourceUserId?: UserIdType;
    sourceDisplayName?: string;
    targetUserId?: UserIdType;
    targetDisplayName?: string;
    created?: string;
};

//! --- Requests --- !//

/**
 * The data for requesting to search player moderations.
 */
export type SearchPlayerModerationsRequest = {
    type?: PlayerModerationType;
    targetUserId?: UserIdType;
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
    playerModerationId: PlayerModerationObjectIdType;
};

/**
 * The data for requesting to delete a player moderation.
 */
export type DeletePlayerModerationRequest = {
    playerModerationId: PlayerModerationObjectIdType;
};

export type dataKeysUnModerateUser = {
    moderated: string;
    type: PlayerModerationType;
};

/**
 * The data for requesting to unmoderate a user.
 */
export type UnModerateUserRequest = dataKeysUnModerateUser;
