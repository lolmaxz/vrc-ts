declare namespace VRCAPI {
  namespace Groups {
    namespace Models {
      type Group = {
        id: string;
        name: string;
        shortCode: string;
        discriminator: string;
        description: string;
        iconUrl?: string;
        bannerUrl?: string;
        privacy: GroupPrivacy;
        ownerId: string;
        rules?: string;
        links?: string[];
        languages?: string[];
        iconId?: string;
        bannerId?: string;
        memberCount: number;
        memberCountSyncedAt?: string; // assuming date-time is a string in ISO format
        isVerified?: boolean;
        joinState?: GroupJoinState;
        tags?: Generics.AllTags[];
        galleries?: Gallery[];
        createdAt?: string; // assuming date-time is a string in ISO format
        onlineMemberCount?: number;
        membershipStatus?: GroupMembershipStatus;
        myMember?: MyMember;
        roles?: GroupRole[];
      };

      export type MyMember = {
        id: string;
        groupId: string;
        userId: string;
        roleIds: string[];
        managerNotes: string;
        membershipStatus: string;
        isSubscribedToAnnouncements: boolean;
        visibility: string;
        isRepresenting: boolean;
        joinedAt: string; // assuming date-time is a string in ISO format
        bannedAt: string | null;
        has2FA: boolean;
        permissions: string[];
      };

      export type GroupRole = {
        id: string;
        groupId: string;
        name: string;
        description: string;
        isSelfAssignable: boolean;
        permissions: string[];
        isManagementRole: boolean;
        requiresTwoFactor: boolean;
        requiresPurchase: boolean;
        order: number;
        createdAt: string; // assuming date-time is a string in ISO format
        updatedAt: string; // assuming date-time is a string in ISO format
      };

      export type Gallery = {
        id: string;
        name: string;
        description: string;
        membersOnly: boolean;
        roleIdsToView: string[];
        roleIdsToSubmit: string[];
        roleIdsToAutoApprove: string[];
        roleIdsToManage: string[];
        createdAt: string; // assuming date-time is a string in ISO format
        updatedAt: string; // assuming date-time is a string in ISO format
      };

      enum GroupMembershipStatus {
        Inactive = 'inactive',
        Member = 'member',
        Requested = 'requested',
        Invited = 'invited',
      }

      enum GroupPrivacy {
        Default = 'default',
        Private = 'private',
      }

      enum GroupJoinState {
        Closed = 'closed',
        Invite = 'invite',
        Request = 'request',
        Open = 'open',
      }
    }
  }
}
