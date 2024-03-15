declare namespace VRCAPI {
  /** All the types for the `User` endpoints are stocked here. */
  namespace Users {
    namespace Models {
      /** The CurrentUserPresence object containing detailed information about the currently logged in user's presence. */
      type CurrentUserPresence = {
        id?: string;
        displayName?: string;
        instance?: string;
        userIcon?: string;
        travelingToInstance?: string;
        avatarThumbnail?: string;
        world?: string;
        currentAvatarTags?: string[];
        groups?: string[];
        travelingToWorld?: string;
        instanceType?: string;
        status?: string;
        debugflag?: string; // todo new undocumented attribute !
        profilePicOverride?: string;
        platform?: string;
        isRejoining?: string; // todo ? is documented but doesn't get sent anymore
      };

      /** The CurrentUser object containing detailed information about the currently logged in user. */
      type CurrentUser = {
        id: string;
        displayName: string;
        userIcon: string;
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
        friends: string[];
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
        tags: Generics.AllTags[];
        developerType: DeveloperType;
        last_login: string;
        last_platform: string;
        allowAvatarCopying: boolean;
        status: UserStatus;
        date_joined: string;
        isFriend: boolean;
        friendKey: string;
        last_activity?: string;
        onlineFriends?: string[];
        activeFriends?: string[];
        presence?: CurrentUserPresence;
        offlineFriends?: string[];
      };

      type currentUserOrTwoFactorType = VRCAPI.Generics.twoFactorAuthResponseType | CurrentUser;

      /** Represents a past display name of a user. */
      export type PastDisplayName = {
        displayName: string;
        updated_at: string;
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
      enum DeveloperType {
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
      enum UserState {
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
      enum UserStatus {
        Active = 'active',
        JoinMe = 'join me',
        AskMe = 'ask me',
        Busy = 'busy',
        Offline = 'offline',
      }

      /** LimitedUser is a subset of the User object, containing only the fields that are returned by the /users/ endpoint. */
      type LimitedUser = {
        id: string;
        displayName: string;
        bio?: string;
        bioLinks?: string[]; // todo new field undocumented!
        currentAvatarImageUrl?: string;
        currentAvatarThumbnailImageUrl?: string;
        currentAvatarTags?: string[]; // todo new undocumented
        userIcon?: string;
        profilePicOverride?: string;
        statusDescription: string;
        status: UserStatus;
        last_platform: string;
        isFriend: boolean;
        tags: string[];
        fallbackAvatar?: string;
        developerType: DeveloperType;
      };

      type LimitedUserFriend = {
        id: string;
        displayName: string;
        bio?: string;
        bioLinks?: string[]; // todo new field undocumented!
        developerType: DeveloperType;
        currentAvatarImageUrl: string;
        currentAvatarThumbnailImageUrl: string;
        currentAvatarTags: string[]; // todo new undocumented
        userIcon: string;
        profilePicOverride: string;
        imageUrl: string; // todo undocumented
        last_login: string; // todo undocumented
        status: UserStatus;
        statusDescription: string;
        last_platform: string;
        //! fallbackAvatar?: string; This was removed from friend listing
        location?: string;
        tags: string[];
        friendKey?: string;
        isFriend: boolean;
      };

      /** Base User type for the websocket when identifying a user object */
      type UserBase = {
        id: string;
        displayName: string;
        userIcon: string;
        bio: string;
        bioLinks: string[];
        profilePicOverride: string;
        statusDescription: string;
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
        tags: Generics.AllTags[];        
      }
      
      // todo some undocumented stuff here, those fields are not sent to the websocket! (as researched)
      /** This Type represents a user in VRChat. Includes field that the websocket doesn't send */
      type User = UserBase & {
        friendRequestStatus?: string;
        instanceId?: string;
        location?: string;
        note?: string;
        state: UserState;
        travelingToInstance?: string;
        travelingToLocation?: string;
        travelingToWorld?: string;
        username?: string;
        worldId?: string;
      };

      type UserUpdateWebSocket = {
        id: string;
        displayName: string;
        userIcon: string;
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
        tags: Generics.AllTags[];
        status: UserStatus;
      }

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
        Trusted = "system_trust_veteran",
        Known = "system_trust_trusted",
        User = "system_trust_known",
        New = "system_trust_basic",
        Visitor = "Visitor",
        Nuisance = "system_troll",
      }

      /** This enum represents all the possible ranks' names for a user in VRChat.
      * * system_trust_veteran : "Trusted User" - The user is Trusted if he has this tag.
      * * system_trust_trusted : "Known User" - The user is Known if he has this tag.
      * * system_trust_known : "User" - The user is a User if he has this tag.
      * * system_trust_basic : "New User" - The user is a New User if he has this tag.
      * * Visitor : "Visitor" - The User is a Visitor when he has no rank tag from the above.
      * * system_troll : "Nuisance User" - The user is a Nuisance if he has this tag. */
      export enum VRCRanksName {
        system_trust_veteran = "Trusted User",
        system_trust_trusted = "Known User",
        system_trust_known = "User",
        system_trust_basic = "New User",
        Visitor = "Visitor",
        system_troll = "Nuisance User",
      }
    }

    namespace Requests {

      type UserId = {
        /** The user's ID needed to perform this action.*/
        userId: string;
      }
      /** Search All Users Options */
      type SearchAllUsersRequest = {
        /** Searches by displayName. Will return empty array if search query is empty or missing. Min 0 characters*/
        search: string;
        /** Active user by developer type, none for normal users and internal for moderators*/
        developerType?: 'none' | 'internal';
        /** The number of objects to return. Min 0, Max 100 Default 60*/
        n?: number;
        /** A zero-based offset from the default object sorting from where search results start. Min 0*/
        offset?: number;
      };

      /** Information required to get a user by their ID. */
      type getUserByIdRequest = UserId;

      type dataKeysUpdateUser = {
        /** The user's email address. */
        email?: string;
        /** The user's birthday. Formated like YYYY-MM-DD */
        birthday?: string;
        /** The user's accepted TOS version. */
        acceptedTOSVersion?: number;
        /** The user's tags. */
        tags?: VRCAPI.Generics.AllTags[];
        /** UserStatus: Defines the User's current status, for example "ask me", "join me" or "offline.
         * 
         * This status is a combined indicator of their online activity and privacy preference. Default: offline Allowed: active┃join me┃ask me┃busy┃offline */
        status?: Users.Models.UserStatus;
        /** The user's status description. Min 1 chars, Max 32 chars */
        statusDescription?: string;
        /** The user's bio. Min 0 chars, Max 512 chars */
        bio?: string;
        /** The user's bio links. Maximum of 3 links. Must contain 'https://' and finish with '.*[2]' */
        bioLinks?: [string?,string?,string?];
        /** The user's user icon. MUST be a valid VRChat /file/ url. */
        userIcon?: string;
      };

      /** Information required to update a user's information. */
      type updateUserByIdRequest = dataKeysUpdateUser & UserId & {
        email?: string;
        /** The user's birthday date. Formated like YYYY-MM-DD */
        birthday?: string;
        acceptedTOSVersion?: number;
        status?: Users.Models.UserStatus;
        statusDescription?: string;
        /** Min 0 chars */
        bio?: string;
        bioLinks?: string[];
        /** MUST be a valid VRChat /file/ url. */
        userIcon?: string;
      }

      /** Information required to get a user's groups. */
      type getUserGroupsByUserIdRequest = UserId;

      /** Information required to get a user's group requests. */
      type getUserGroupRequestsOptions = UserId

      /** Information required to get a user's represented group */
      type getUserRepresentedGroupOptions = UserId;
    }
  }
}
