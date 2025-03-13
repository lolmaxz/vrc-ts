import {
    AllTags,
    FeedbackIdType,
    FileIdType,
    InstanceIdType,
    twoFactorAuthResponseType,
    UserIdType,
    UserNoteIdType,
    WorldIdType,
} from './Generics';
import { Group } from './Groups';

//! --- Users --- !//
/** The CurrentUserPresence object containing detailed information about the currently logged in user's presence. */
export type CurrentUserPresence = {
    id?: UserIdType;
    displayName?: string;
    instance?: InstanceIdType;
    userIcon?: FileIdType;
    travelingToInstance?: InstanceIdType;
    avatarThumbnail?: string;
    world?: WorldIdType;
    currentAvatarTags?: string[];
    groups?: Group[];
    travelingToWorld?: InstanceIdType;
    instanceType?: string;
    status?: string;
    debugflag?: string; // todo new undocumented attribute !
    profilePicOverride?: string;
    platform?: string;
    isRejoining?: string; // todo ? is documented but doesn't get sent anymore
};

/** The CurrentUser object containing detailed information about the currently logged in user. */
export type CurrentUser = {
    id: UserIdType;
    displayName: string;
    userIcon: FileIdType;
    bio: string;
    bioLinks: string[];
    profilePicOverride: string;
    statusDescription: string;
    username?: string | null;
    pastDisplayNames: PastDisplayName[];
    hasEmail: boolean;
    hasPendingEmail: boolean;
    obfuscatedEmail: string;
    obfuscatedPendingEmail: string;
    emailVerified: boolean;
    hasBirthday: boolean;
    hideContentFilterSettings?: boolean;
    unsubscribe: boolean;
    statusHistory: string[];
    statusFirstTime: boolean;
    friends: UserIdType[];
    friendGroupNames: string[];
    userLanguage?: string;
    userLanguageCode?: string; // new
    currentAvatarImageUrl: string;
    currentAvatarThumbnailImageUrl: string;
    currentAvatarTags?: string[];
    currentAvatar: string;
    currentAvatarAssetUrl: string;
    fallbackAvatar?: string;
    accountDeletionDate?: string | null;
    accountDeletionLog?: Array<AccountDeletionLog>; // ensure it can be null or an array
    acceptedTOSVersion: number;
    acceptedPrivacyVersion?: number;
    steamId?: string;
    googleId?: string;
    googleDetails: object; // todo unknown yet, to research more
    steamDetails: object; // todo unknown yet, to research more
    oculusId?: string;
    picoId?: string;
    viveId?: string;
    hasLoggedInFromClient: boolean;
    homeLocation: string;
    twoFactorAuthEnabled: boolean;
    twoFactorAuthEnabledDate?: string | null;
    updated_at?: string;
    state: UserState;
    tags: AllTags[];
    developerType: DeveloperType;
    last_login: string;
    last_platform: string;
    ageVerificationStatus: AgeVerificationStatus;
    ageVerified: boolean;
    isAdult: boolean;
    allowAvatarCopying: boolean;
    status: UserStatus;
    date_joined: string;
    isFriend: boolean;
    friendKey: string;
    last_activity?: string;
    /** List of Online Friends.
     * @deprecated This field is currently considered deprecated as it's not returned anymore.
     */
    onlineFriends?: string[];
    /** List of Active Friends.
     * @deprecated This field is currently considered deprecated as it's not returned anymore.
     */
    activeFriends?: string[];
    /** User's current presence.
     * @deprecated This field is currently considered deprecated as it's not returned anymore it seems.
     */
    presence?: CurrentUserPresence;
    offlineFriends?: string[];
    /** If Booping is enabled for the user.
     * @deprecated This field is currently considered deprecated as VRChat removed the booping feature.
     */
    isBoopingEnabled: boolean;
    /** The user's preferred pronouns. */
    pronouns: string;
    /** If the wants to receive mobile invitations. */
    receiveMobileInvitations?: boolean;
    /** The last time the user logged in from a mobile device. */
    last_mobile?: string;
    /** The user's past Platform History. */
    platform_history?: PlatformHistoryEntity[];
};

/**
 * ### Age Verification Status
 * ##### This enum represents the possible age verification statuses for a user.
 *
 * .
 *
 * **Here are the possible values:**
 * * Hidden : "hidden" - The user's age verification status is hidden.
 * * Age_Verified : "verified" - The user's age is verified.
 * * Verified_18_Plus : "18+" - The user is verified to be 18 years or older.
 */
export enum AgeVerificationStatus {
    Hidden = 'hidden',
    //Age_Verified = 'verified', //! No longer used
    Verified_18_Plus = '18+',
}

export type PlatformHistoryEntity = {
    isMobile: boolean;
    platform?: null;
    recorded: string;
};

export type currentUserOrTwoFactorType = twoFactorAuthResponseType | CurrentUser;

/** Represents a past display name of a user. */
export type PastDisplayName = {
    displayName: string;
    updated_at: string;
    reverted: boolean; // new
};

/** Typically "Deletion requested" or "Deletion canceled". Other messages like "Deletion completed" may exist, but are these are not possible to see as a regular user.
 *
 *`Default: Deletion requested` */
export type AccountDeletionLog = {
    message: string;
    deletionScheduled: string | null;
    dateTime: string;
};

/** * None : "none" - User is a normal user
 * * Trusted : "trusted" - Unknown
 * * Internal : "internal" - Is a VRChat Developer
 * * Moderator : "moderator" - Is a VRChat Moderator */
export enum DeveloperType {
    None = 'none',
    Trusted = 'trusted',
    Internal = 'internal',
    Moderator = 'moderator',
}

/** * Offline : "offline" - User is offline
 * * Active : "active" - User is online, but not in VRChat
 * * Online : "online" - User is online in VRChat
 *
 * Always offline when returned through `getCurrentUser` (/auth/user). */
export enum UserState {
    Offline = 'offline',
    Active = 'active',
    Online = 'online',
}

/** Defines the User's current status, for example "ask me", "join me" or "offline. This status is a combined indicator of their online activity and privacy preference.
 * * Active : "active" - The user is not in the game but is active on the website. (Will appear yellow on the website like "ask me")
 * * JoinMe : "join me" - The user is in the game and is accepting invites. (Is on blue)
 * * AskMe : "ask me" - The user is in the game but will request to receive invites in order to be invited. (Is on yellow)
 * * Busy : "busy" - The user is in the game but is not accepting invites. (Is on red)
 * * Offline : "offline" - The user is not in the game and is not active on the website. (is on Grey)
 *
 * Note: By default the user's status is "offline". */
export enum UserStatus {
    Active = 'active',
    JoinMe = 'join me',
    AskMe = 'ask me',
    Busy = 'busy',
    Offline = 'offline',
}

/** LimitedUser is a subset of the User object, containing only the fields that are returned by the /users/ endpoint. */
export type LimitedUser = {
    /** The user's Bio. */
    bio?: string;
    /** The user's Bio Links. (Socials and such) */
    bioLinks?: string[];
    /** The user's current avatar image URL. */
    currentAvatarImageUrl: string;
    /** The user's current avatar tags. */
    currentAvatarTags?: string[];
    /** The user's current avatar thumbnail image URL. */
    currentAvatarThumbnailImageUrl: string;
    /** The user's developer type. */
    developerType: DeveloperType;
    /** The user's display name. */
    displayName: string;
    /** The user's ID. */
    id: UserIdType;
    /** If the user is a friend of the current logged in user.
     *
     * @variation - This field is always false is the user is not a friend of the current logged in user.
     */
    isFriend: false;
    /** The user's last platform used. */
    last_platform: string;
    /** The user's profile picture override. */
    profilePicOverride?: string;
    /** The user's status. */
    status: UserStatus;
    /** The user's status description. */
    statusDescription: string;
    /** The user's tags. */
    tags: string[];
    /** The user's user icon. */
    userIcon?: FileIdType;
};

export type LimitedUserFriend = {
    /** The user's Bio. */
    bio?: string;
    /** The user's Bio Links. (Socials and such) */
    bioLinks?: string[];
    /** The user's current avatar image URL. */
    currentAvatarImageUrl: string;
    /** The user's current avatar tags. */
    currentAvatarTags: string[];
    /** The user's current avatar thumbnail image URL. */
    currentAvatarThumbnailImageUrl: string;
    /** The user's developer type. */
    developerType: DeveloperType;
    /** The user's display name. */
    displayName: string;
    /** The user's friend key. */
    friendKey?: string;
    /** The user's ID. */
    id: UserIdType;
    /** If the user is a friend of the current logged in user.
     * @variation - This field is always true is the user is a friend of the current logged in user.
     */
    isFriend: true;
    /** The user's last platform used. */
    userIcon: FileIdType;
    /** The user's last login date. */
    last_login: string;
    /** The user's last platform used. */
    last_platform: string;
    /** The user's profile picture override. */
    profilePicOverride: string;
    /** The user's set pronouns. */
    pronouns: string;
    /** The user's status. */
    status: UserStatus;
    /** The user's status description. */
    statusDescription: string;
    /** The user's tags. */
    tags: string[];
    /**
     * @ignore
     * @deprecated This field seems deprecated and is not returned anymore.
     */
    imageUrl?: string; // todo undocumented. It seems this is not always returned
    /** This is normally not available if you aren't friends with the user.
     *
     * @deprecated This field seems deprecated and is not returned anymore.
     */
    location?: InstanceIdType;
};

/** Base User type for the websocket when identifying a user object */
export type UserBase = {
    id: UserIdType;
    displayName: string;
    userIcon: FileIdType;
    bio: string;
    bioLinks: string[];
    profilePicOverride: string;
    statusDescription: string;
    badges: UserBadge[]; //! new information. Never null, but can be empty
    currentAvatarImageUrl: string;
    currentAvatarThumbnailImageUrl: string;
    currentAvatarTags: string[]; // todo new undocumented
    date_joined: Date;
    developerType: DeveloperType;
    friendKey: string;
    isFriend: boolean;
    last_activity: string;
    last_login: string;
    last_platform: string;
    status: UserStatus;
    allowAvatarCopying: boolean;
    ageVerificationStatus: AgeVerificationStatus;
    tags: AllTags[];
    /** The last time the user logged in from a mobile device. */
    last_mobile?: string;
};

// todo some undocumented stuff here, those fields are not sent to the websocket! (as researched)
/** This Type represents a user in VRChat. Includes field that the websocket doesn't send */
export type User = UserBase & {
    friendRequestStatus?: string;
    instanceId?: InstanceIdType;
    location?: InstanceIdType;
    note?: string;
    state: UserState;
    travelingToInstance?: InstanceIdType;
    travelingToLocation?: InstanceIdType;
    travelingToWorld?: InstanceIdType;
    username?: string;
    worldId?: WorldIdType;
};

export type UserUpdateWebSocket = {
    id: UserIdType;
    displayName: string;
    userIcon: FileIdType;
    bio: string;
    profilePicOverride: string;
    statusDescription: string;
    username?: string | null;
    currentAvatarImageUrl: string;
    currentAvatarThumbnailImageUrl: string;
    currentAvatarTags: string[]; // todo new undocumented
    currentAvatar: string;
    currentAvatarAssetUrl: string;
    fallbackAvatar?: string;
    tags: AllTags[];
    status: UserStatus;
};

/** This enum represents all the possible ranks for a user in VRChat.
 * * Trusted : "system_trust_veteran" - The user is Trusted if he has this tag.
 * * Known : "system_trust_trusted" - The user is Known if he has this tag.
 * * User : "system_trust_known" - The user is a User if he has this tag.
 * * New : "system_trust_basic" - The user is a New User if he has this tag.
 * * Visitor : "Visitor" - The User is a Visitor when he has no rank tag from the above.
 * * Nuisance : "system_troll" - The user is a Nuisance if he has this tag.
 *
 * Note: Veteran has been removed from VRChat since 2018 and removed from the database since 2022-05-05.
 *
 * If a user has no rank tag, he is a Visitor. */
export enum VRCRanks {
    Trusted = 'system_trust_veteran',
    Known = 'system_trust_trusted',
    User = 'system_trust_known',
    New = 'system_trust_basic',
    Visitor = 'Visitor',
    Nuisance = 'system_troll',
}

/** This enum represents all the possible ranks' names for a user in VRChat.
 * * system_trust_veteran : "Trusted User" - The user is Trusted if he has this tag.
 * * system_trust_trusted : "Known User" - The user is Known if he has this tag.
 * * system_trust_known : "User" - The user is a User if he has this tag.
 * * system_trust_basic : "New User" - The user is a New User if he has this tag.
 * * Visitor : "Visitor" - The User is a Visitor when he has no rank tag from the above.
 * * system_troll : "Nuisance User" - The user is a Nuisance if he has this tag. */
export enum VRCRanksName {
    system_trust_veteran = 'Trusted User',
    system_trust_trusted = 'Known User',
    system_trust_known = 'User',
    system_trust_basic = 'New User',
    Visitor = 'Visitor',
    system_troll = 'Nuisance User',
}

export type UserBadge = {
    assignedAt: string;
    badgeDescription: string;
    badgeId: string;
    badgeImageUrl: string;
    badgeName: string;
    hidden: boolean;
    showcased: boolean;
    updated_at: string;
};

export type Feedback = {
    /** The user's ID who gave the feedback. */
    commenterId: UserIdType;
    /** The user's display name who gave the feedback. */
    commenterName: string;
    /** The Author of the content which received the feedback. */
    contentAuthorId: UserIdType;
    /** The display name of the Author of the content which received the feedback. */
    contentAuthorName: string;
    /** The content ID of the content which received the feedback. */
    contentId: string; // todo: need more information
    /** The content name of the content which received the feedback. */
    contentName: string;
    /** The content type of the content which received the feedback. */
    contentType: string; // todo: need more information
    /** The Version of the content which received the feedback. */
    contentVersion: number; // todo: need more information
    /** The feedback description. */
    description?: string;
    /** The feedback ID. */
    id: FeedbackIdType;
    /** The Feedback reason. */
    reason: string; // todo: need more information
    /** The feedback's tags. */
    tags: AllTags[];
    /** The feedback's type. */
    type: string; // todo: need more information
};

export type UserNote = {
    /** When the note was created. */
    createdAt: string;
    /** The user's Note ID. */
    id: UserNoteIdType;
    /** The note to add to the user. */
    note: string;
    /**
     * The targetted user's information.
     *
     * ⚠️ When Updating a User Note, this field is not returned!
     * */
    targetUser?: {
        /** Avatar Tags */
        currentAvatarTags?: AllTags[];
        /** The user's current avatar thumbnail image URL. */
        currentAvatarThumbnailImageUrl?: string;
        /** The user's current display name. */
        displayName?: string;
        /** The user's note ID. */
        id?: UserNoteIdType;
        /** URL leading to a REDIRECT, which brings you to a BLOB of the picture override for the profile picture
         *
         * @warning If you fetch this URL, you will get a BLOB of the profile picture override.
         */
        profilePicOverride?: string;
        /** The user's user icon. If there is one. */
        userIcon?: FileIdType;
    };
    targetUserId: UserIdType;
    userId: UserIdType;
};

//! --- Requests --- !//

type UserId = {
    /** The user's ID needed to perform this action.*/
    userId: UserIdType;
};
export type OptionalUserId = {
    /** The user's ID needed to perform this action.*/
    userId?: UserIdType;
};
/** Search All Users Options */
export type SearchAllUsersRequest = {
    /** Searches by displayName. Will return empty array if search query is empty or missing. Min 0 characters*/
    search: string;
    /** Active user by developer type, none for normal users and internal for moderators*/
    developerType?: 'none' | 'internal';
    /** The number of objects to return. Min 0, Max 100 Default 60*/
    n?: number;
    /** A zero-based offset from the default object sorting from where search results start. Min 0*/
    offset?: number;
    /** This setting is special, here's a generic description:
     *
     * A fuzzy search is performed using a fuzzy matching algorithm, which returns a list of results based on likely relevance even though search argument words and spellings may not be an exact match. For web lookups, exact and highly relevant matches appear near the top of the list. Subjective relevance ratings may be given, usually as percentages.
     **/
    fuzzy?: boolean;
};

/** Information required to get a user by their ID. */
export type getUserByIdRequest = UserId;

export type dataKeysUpdateUser = {
    /** The user's email address. */
    email?: string;
    /** The user's birthday. Formated like YYYY-MM-DD */
    birthday?: string;
    /** The user's accepted TOS version. */
    acceptedTOSVersion?: number;
    /** The user's tags. */
    tags?: AllTags[];
    /** UserStatus: Defines the User's current status, for example "ask me", "join me" or "offline.
     *
     * This status is a combined indicator of their online activity and privacy preference. Default: offline Allowed: active┃join me┃ask me┃busy┃offline */
    status?: UserStatus;
    /** The user's status description. Min 1 chars, Max 32 chars */
    statusDescription?: string;
    /** The user's bio. Min 0 chars, Max 512 chars */
    bio?: string;
    /** The user's bio links. Maximum of 3 links. Must contain 'https://' and finish with '.*[2]' */
    bioLinks?: [string?, string?, string?];
    /** The user's user icon. MUST be a valid VRChat file ID. */
    userIcon?: FileIdType;
    /** The user's preferred pronouns. */
    pronouns?: string;
    /** The age verification status of the user.
     *
     * You need to have been age verified to set this to "verified" or "18+".
     */
    ageVerificationStatus?: AgeVerificationStatus;
};

/** Information required to update a user's information. */
export type updateUserByIdRequest = dataKeysUpdateUser &
    UserId & {
        email?: string;
        /** The user's birthday date. Formated like YYYY-MM-DD */
        birthday?: string;
        acceptedTOSVersion?: number;
        status?: UserStatus;
        statusDescription?: string;
        /** Min 0 chars */
        bio?: string;
        bioLinks?: string[];
        /** MUST be a valid VRChat file ID. */
        userIcon?: FileIdType;
    };

/** Information required to get a user's groups. */
export type getUserGroupsByUserIdRequest = OptionalUserId;

/** Information required to get a user's group requests. */
export type getUserGroupRequestsOptions = UserId;

/** Information required to get a user's represented group */
export type getUserRepresentedGroupOptions = UserId;

/** Information required to get a user's submited feedback */
export type dataKeysGetUserSubmittedFeedback = {
    /** Filter for users' previously submitted feedback, e.g., a groupId, userId, avatarId, etc.? */
    contentId?: boolean; // todo: need more information
    /** The number of objects to return. Min 0, Max 100 Default 10 */
    n?: number;
    /** A zero-based offset from the default object sorting from where search results start. Min 0 */
    offset?: number;
};

/** Information required to Request a user's submited feedback */
export type getUserSubmittedFeedbackOptions = dataKeysGetUserSubmittedFeedback & UserId;

/** Information required to get the recently updated user notes. */
export type getUserNotesRequest = {
    /** The number of objects to return. Min 0, Max 100 Default 60 */
    n?: number;
    /** A zero-based offset from the default object sorting from where search results start. Min 0 */
    offset?: number;
};

/** Information required to update a user's note. */
export type dataKeysUpdateUserNote = {
    /** The user's ID of the user to add the note to. */
    targetUserId: UserIdType;
    /** The note to add to the user. */
    note: string;
};

export type updateUserNoteRequest = dataKeysUpdateUserNote;

/** Information required to get a specific note from a user. */
export type getNoteFromUserRequest = {
    /** The user's ID of the user to get the note from. */
    userNoteId: UserNoteIdType;
};

/** Information required to get a List of User's group instances. */
export type getUserGroupInstancesRequest = UserId;
