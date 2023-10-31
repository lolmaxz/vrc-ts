declare namespace VRCAPI {
  /** All the types for the `User` endpoints are stocked here. */
  namespace Users {
    namespace Models {
      /** The CurrentUserPresence object containing detailed information about the currently logged in user's presence. */
      type CurrentUserPresence = {
        avatarThumbnail?: string | null;
        displayName?: string;
        groups?: string[];
        id?: string;
        instance?: string | null;
        instanceType?: string | null;
        isRejoining?: string | null;
        platform?: string | null;
        profilePicOverride?: string | null;
        status?: string | null;
        travelingToInstance?: string | null;
        travelingToWorld?: string;
        world?: string;
      };

      /** The CurrentUser object containing detailed information about the currently logged in user. */
      type CurrentUser = {
        acceptedTOSVersion: number;
        acceptedPrivacyVersion?: number;
        accountDeletionDate?: string | null;
        accountDeletionLog?: Array<AccountDeletionLog>; // ensure it can be null or an array
        activeFriends?: string[];
        allowAvatarCopying: boolean;
        bio: string;
        bioLinks: string[];
        currentAvatar: string;
        currentAvatarAssetUrl: string;
        currentAvatarImageUrl: string;
        currentAvatarThumbnailImageUrl: string;
        date_joined: string;
        developerType: DeveloperType;
        displayName: string;
        emailVerified: boolean;
        fallbackAvatar?: string;
        friendGroupNames: string[];
        friendKey: string;
        friends: string[];
        hasBirthday: boolean;
        hasEmail: boolean;
        hasLoggedInFromClient: boolean;
        hasPendingEmail: boolean;
        homeLocation: string;
        id: string;
        isFriend: boolean;
        last_activity?: string;
        last_login: string;
        last_platform: string;
        obfuscatedEmail: string;
        obfuscatedPendingEmail: string;
        oculusId: string;
        offlineFriends?: string[];
        onlineFriends?: string[];
        pastDisplayNames: PastDisplayName[];
        presence?: CurrentUserPresence;
        profilePicOverride: string;
        state: UserState;
        status: UserStatus;
        statusDescription: string;
        statusFirstTime: boolean;
        statusHistory: string[];
        steamDetails: Record<string, unknown>;
        steamId: string;
        tags: Generics.AllTags[];
        twoFactorAuthEnabled: boolean;
        twoFactorAuthEnabledDate?: string | null;
        unsubscribe: boolean;
        updated_at?: string;
        userIcon: string;
        username?: string | null;
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
        bio?: string;
        currentAvatarImageUrl: string;
        currentAvatarThumbnailImageUrl: string;
        developerType: DeveloperType;
        displayName: string;
        fallbackAvatar?: string;
        id: string;
        isFriend: boolean;
        last_platform: string;
        profilePicOverride: string;
        status: UserStatus;
        statusDescription: string;
        tags: string[];
        userIcon: string;
        location?: string;
        friendKey?: string;
      };

      /** This Type represents a user in VRChat. */
      type User = {
        allowAvatarCopying: boolean;
        bio: string;
        bioLinks: string[];
        currentAvatarImageUrl: string;
        currentAvatarThumbnailImageUrl: string;
        date_joined: Date;
        developerType: DeveloperType;
        displayName: string;
        friendKey: string;
        friendRequestStatus?: string;
        id: string;
        instanceId?: string;
        isFriend: boolean;
        last_activity: string;
        last_login: string;
        last_platform: string;
        location?: string;
        note?: string;
        profilePicOverride: string;
        state: UserState;
        status: UserStatus;
        statusDescription: string;
        tags: Generics.AllTags[];
        travelingToInstance?: string;
        travelingToLocation?: string;
        travelingToWorld?: string;
        userIcon: string;
        username?: string;
        worldId?: string;
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
      /** Search All Users Options */
      type SearchAllUsersOptions = {
        search: string;
        developerType?: 'none' | 'internal';
        quantity?: number;
        offset?: number;
      };
      /** Get User by ID Options */
      type getUserByIdOptions = {
        userId: string;
      };
      /** Update User Info Options */
      type updateUserByIdOptions = {
        userId: string;
        email?: string;
        /** format YYYY-MM-DD */
        birthday?: string;
        acceptedTOSVersion?: number;
        tags?: VRCAPI.Generics.AllTags[];
        /** UserStatus: Defines the User's current status, for example "ask me", "join me" or "offline.
         * 
         * This status is a combined indicator of their online activity and privacy preference. Default: offline Allowed: active┃join me┃ask me┃busy┃offline */
        status?: VRCAPI.Users.Models.UserStatus;
        statusDescription?: string;
        /** Min 0 chars */
        bio?: string;
        bioLinks?: string[];
        /** MUST be a valid VRChat /file/ url. */
        userIcon?: string;
      }
      /** Get User Groups Options */
      type getUserGroupsByUserIdOptions = {
        userId: string;
      };
      /** Get User Group Requests Options */
      type getUserGroupRequestsOptions = {
        userId: string;
      };
    }
  }
}
