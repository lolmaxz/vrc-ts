declare namespace VRCAPI {
  /**
  * All the types for the `Group` endpoints are stocked here.
  */
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
        galleries?: GroupGallery[];
        createdAt?: string; // assuming date-time is a string in ISO format
        onlineMemberCount?: number;
        membershipStatus?: GroupMembershipStatus;
        myMember?: MyMember;
        roles?: GroupRole[];
      };

      type GroupAudit = {
        results: {
          id: string;
          created_at: string;
          groupId: string;
          actorId: string;
          actorDisplayname: string;
          targetId: string;
          eventType: string
          description: string
          data: unknown;
        }[];
        totalCount: number
        hasNext: boolean
      }

      type GroupAnnouncement = {
        id: string;
        groupId: string;
        authorId: string;
        title: string;
        text: string;
        imageId?: string;
        imageUrl?: string;
        createdAt: string;
        updatedAt: string;
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

      type GroupMemberLimitedUser = {
        id: string
        displayName: string
        thumbnailUrl: string
        iconUrl: string
      }

      type GroupMember = {
        id: string;
        groupId: string;
        userId: string;
        isRepresenting: boolean;
        user: GroupMemberLimitedUser,
        roleIds: string[];
        joinedAt: string;
        membershipStatus: GroupMembershipStatus
        visibility: string
        isSubscribedToAnnouncements: boolean;
        createdAt?: string;
        bannedAt?: string;
        managerNotes?: string;
      }

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

      export type GroupGallery = {
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

      type GroupGalleryImage = {
        id: string;
        groupId: string;
        galleryId: string;
        fileId: string;
        imageUrl: URL;
        createdAt: string;
        submittedByUserId: string;
        approved: boolean;
        approvedByUserId: string;
        approvedAt: string;

      }

      type GroupPermission = {
        name: string
        displayName: string
        help: string
        isManagementPermission: boolean
        allowedToAdd: boolean
      }

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
        Open = 'open',
        Closed = 'closed',
        Invite = 'invite',
        Request = 'request',
      }

      enum GroupRoleTemplate {
        Default = "default",
        Managed_free = "managedFree",
        Managed_Invite = "managedInvite",
        Managed_Request = "managedRequest"

      }

      enum GroupUserVisibility {
        Visible = 'visible',
        Hidden = 'hidden',
        Friends = 'friends',
      }
    }
    namespace Requests {
      type CreateGroupRequest = {
        name: string; // Must be 3 to 64 characters long
        shortCode: string; // Must be 3 to 6 characters long
        description?: string; // Must be 0 to 250 characters long, optional
        joinState?: VRCAPI.Groups.Models.GroupJoinState; // Optional, default is GroupJoinState.Open
        iconId?: string; // Optional
        bannerId?: string; // Optional
        privacy?: VRCAPI.Groups.Models.GroupPrivacy; // Optional, default is GroupPrivacy.Default
        roleTemplate: VRCAPI.Groups.Models.GroupRoleTemplate; // Required, default is GroupRoleTemplate.Default
      }
      type getGroupByIdRequest = {
        groupId: string;
        includeRoles?: boolean;
      };
      type getGroupAuditLogsRequest = {
        groupId: string;
        n?: number;
        offset?: number;
        startDate?: string;
        endDate?: string;
      }

      type UpdateGroupRequest = {
        groupId: string;
        data: {
          name?: string; // 3 to 64 chars
          shortCode?: string; // 3 to 6 chars
          description?: string; // Must be 0 to 250 characters long, optional
          joinState?: VRCAPI.Groups.Models.GroupJoinState;
          iconId?: string;
          bannerId?: string;
          languages?: VRCAPI.Generics.languageTagsShort[];
          links?: string[];
          rules?: string;
        }
      }

      type DeleteGroupRequest = { groupId: string; }
      type GetGroupAnnouncementRequest = { groupId: string; }

      type CreateGroupAnnouncementRequest = {
        groupId: string;
        title: string; // Min 1 chars
        text: string; // Min 1 chars
        imageId?: string;
        sendNotification?: boolean // default to yes
      }

      type deleteGroupAnnouncementRequest = { groupId: string; }

      type GetBannedUsersRequest = {
        groupId: string;
        n?: number;
        offset?: number;
      }

      type BanGroupMemberRequest = { groupId: string; userId: string; }
      type UnbanGroupMemberRequest = { groupId: string; userId: string; }

      type createGroupGalleryRequest = {
        groupId: string;
        name: string; // min 1 chars, max 64 chars
        description?: string; // max 512 chars
        membersOnly?: boolean; // default to false
        roleIdsToView?: string[];
        roleIdsToSubmit?: string[];
        roleIdsToAutoApprove?: string[];
        roleIdsToManage?: string[];
      }

      type GetGroupGalleryImagesRequest = {
        groupId: string;
        groupGalleryId: string;
        n?: number; // min 1, max 100, default 60
        offset?: number; // min 0, default 0
        approved?: boolean; // default true
      }

      type UpdateGroupGalleryRequest = {
        groupId: string;
        groupGalleryId: string;
        name?: string;  // max 64 chars, min 1 char
        description?: string; // max 512 chars
        membersOnly?: boolean;
        roleIdsToView?: string[];
        roleIdsToSubmit?: string[];
        roleIdsToAutoApprove?: string[];
        roleIdsToManage?: string[];
      }

      type DeleteGroupGalleryRequest = {
        groupId: string;
        groupGalleryId: string;
      }

      type AddGroupGalleryImagesRequest = {
        groupId: string;
        groupGalleryId: string;
        fileId: string;
      }

      type DeleteGroupGalleryImagesRequest = {
        groupId: string;
        groupGalleryId: string;
        groupGalleryImageId: string;
      }

      type GetGroupInvitesSentRequest = {
        groupId: string;
      }

      type InviteUserToGroupRequest = {
        groupId: string;
        userId: string;
        confirmOverrideBlock: boolean;
      }

      type deleteGroupUserInviteRequest = {
        groupId: string;
        userId: string;
      }

      type joinGroupRequest = {
        groupId: string;
      }

      type leaveGroupRequest = {
        groupId: string;
      }

      type listGroupMembersRequest = {
        groupId: string;
        n?: number; // min 1, max 100, default 60
        offset?: number; // min 0, default 0
      }

      type getGroupMemberRequest = {
        groupId: string;
        userId: string;
      }

      type updateGroupMemberRequest = {
        groupId: string;
        userId: string;
        visibility?: VRCAPI.Groups.Models.GroupUserVisibility;
        isSubscribedToAnnouncements?: boolean;
        managerNotes?: string;
      };

      type kickGroupMemberRequest = {
        groupId: string;
        userId: string;
      }

      type addRoleToGroupMemberRequest = {
        groupId: string;
        userId: string;
        groupRoleId: string;
      }

      type removeRoleFromGroupMemberRequest = {
        groupId: string;
        userId: string;
        groupRoleId: string;
      }

      type listGroupPermissionsRequest = {
        groupId: string;
      }

      type getGroupJoinRequestsRequest = {
        groupId: string;
      }

      type cancelGroupJoinRequestRequest = {
        groupId: string;
      }

      type respondGroupJoinrequestRequest = {
        groupId: string;
        userId: string;
        action: 'Accept' | 'Deny';
      }

      type getGroupRolesRequest = {
        groupId: string;
      }

      type createGroupRoleRequest = {
        groupId: string;
        name: string; // min 1, max 64 chars
        description?: string; // max 512 chars
        isSelfAssignable?: boolean; // default false
        permissions?: string[];
      }

      type updateGroupRoleRequest = {
        groupId: string;
        groupRoleId: string;
        name?: string; // min 1, max 64 chars
        description?: string; // max 512 chars
        isSelfAssignable?: boolean; // default false
        permissions?: string[];
        order?: number;
      }

      type deleteGroupRoleRequest = {
        groupId: string;
        groupRoleId: string;
      }

    }
  }
}
