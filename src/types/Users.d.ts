declare namespace VRCAPI {
  namespace Users {
    namespace Models {
      /**
       * The CurrentUserPresence object containing detailed information about the currently logged in user's presence.
       */
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

      /**
       *  The CurrentUser object containing detailed information about the currently logged in user.
       */
      export type CurrentUser = {
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

      /**
       * Represents a past display name of a user.
       */
      export type PastDisplayName = {
        displayName: string;
        updated_at: string;
      };

      /**
       *
       * Typically "Deletion requested" or "Deletion canceled". Other messages like "Deletion completed" may exist, but are these are not possible to see as a regular user.
       *
       *`Default: Deletion requested`
       */
      export type AccountDeletionLog = {
        message: string;
        deletionScheduled: string | null;
        dateTime: string;
      };

      enum DeveloperType {
        None = 'none',
        Trusted = 'trusted',
        Internal = 'internal',
        Moderator = 'moderator',
      }

      enum UserState {
        Offline = 'offline',
        Active = 'active',
        Online = 'online',
      }

      enum UserStatus {
        Active = 'active',
        JoinMe = 'join me',
        AskMe = 'ask me',
        Busy = 'busy',
        Offline = 'offline',
      }

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
    }

    namespace Requests {
      type SearchAllUsersOptions = {
        search: string;
        developerType?: 'none' | 'internal';
        quantity?: number;
        offset?: number;
      };
    }
  }
}
