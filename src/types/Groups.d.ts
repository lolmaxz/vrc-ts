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
        iconId?: string;
        iconUrl?: string;
        bannerUrl?: string;
        bannerId?: string;
        lastPostCreatedAt?: string; // TODO undocumented yet!
        privacy: GroupPrivacy;
        ownerId: string;
        rules?: string;
        links?: string[];
        languages?: string[];
        memberCount: number;
        memberCountSyncedAt?: string; // assuming date-time is a string in ISO format
        isVerified?: boolean;
        joinState?: GroupJoinState;
        tags?: Generics.AllTags[];
        galleries?: GroupGallery[];
        createdAt?: string; // assuming date-time is a string in ISO format
        initialRoleIds?: string[]; // TODO undocumented yet!
        updatedAt?: string; // assuming date-time is a string in ISO format // TODO undocumented yet!
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
          data: GroupAuditLogDataPostCreated |
          GroupAuditLogDataPostDeleted |
          GroupAuditLogDataRoleCreate |
          GroupAuditLogDataRoleUpdate |
          GroupAuditLogDataRoleDelete |
          GroupAuditLogDataMemberUpdate |
          GroupAuditLogDataRoleAssign |
          GroupAuditLogDataRoleUnassign |
          GroupAuditLogDataGroupUpdate |
          GroupAuditLogGalleryCreate |
          GroupAuditLogGalleryUpdate |
          GroupAuditLogGalleryDelete
        }[];
        totalCount: number
        hasNext: boolean
      }

      /**
       * ## Different types of Group Audit Log Events.
       * @enum {string} **Group_Create** -> A group was created.
       * @enum {string} **Group_Update** -> A group was updated.
       * @enum {string} **Group_Announcement_Create** -> A group announcement was created.
       * @enum {string} **Group_Announcement_Delete** -> A group announcement was deleted.
       * @enum {string} **Group_Role_Create** -> A group role was created.
       * @enum {string} **Group_Role_Update** -> A group role was updated.
       * @enum {string} **Group_Role_Delete** -> A group role was deleted.
       * @enum {string} **Group_Role_Assign** -> A group role was assigned to a member.
       * @enum {string} **Group_Role_Unassign** -> A group role was unassigned from a member.
       * @enum {string} **Group_Member_Update** -> A group member was updated.
       * @enum {string} **Group_Member_Join** -> A group member joined.
       * @enum {string} **Group_Member_Leave** -> A group member left.
       * @enum {string} **Group_Member_Kick** -> A group member was kicked.
       * @enum {string} **Group_Member_Ban** -> A group member was banned.
       * @enum {string} **Group_Member_Unban** -> A group member was unbanned.
       * @enum {string} **Group_Invite_Create** -> A group invite was created.
       * @enum {string} **Group_Gallery_Create** -> A group gallery was created.
       * @enum {string} **Group_Gallery_Update** -> A group gallery was updated.
       * @enum {string} **Group_Gallery_Delete** -> A group gallery was deleted.
       */
      enum GroupAuditLogEventType {
        // Group events
        Group_Create = "group.create",
        Group_Update = "group.update",
        // Announcement events
        Group_Announcement_Create = "group.post.create",
        Group_Announcement_Delete = "group.post.delete",
        // Role events
        Group_Role_Create = "group.role.create",
        Group_Role_Update = "group.role.update",
        Group_Role_Delete = "group.role.delete",
        Group_Role_Assign = "group.role.assign",
        Group_Role_Unassign = "group.role.unassign",
        // Member events
        Group_Member_Update = "group.member.update",
        Group_Member_Join = "group.member.join",
        Group_Member_Leave = "group.member.leave",
        Group_Member_Kick = "group.member.remove",
        Group_Member_Ban = "group.user.ban",
        Group_Member_Unban = "group.user.unban",
        // Invite events
        Group_Invite_Create = "group.invite.create",
        // Group Request events
        Group_Request_Deny = "group.request.reject",
        Group_Request_Deny_Block = "group.request.block",
        // Gallery events
        Group_Gallery_Create = "group.gallery.create",
        Group_Gallery_Update = "group.gallery.update",
        Group_Gallery_Delete = "group.gallery.delete",
        // Instance events
        Group_Instance_Create = "group.instance.create",
      }


      type GroupAuditLogDataPostCreated = {
        title: string;
        text: string;
        imageId?: string;
        authorId?: string;
        sendNotification?: boolean;
        roleIds?: string[];
      }

      type GroupAuditLogDataPostDeleted = {
        title: string;
        text: string;
        imageId?: string;
        imageUrl?: string;
        authorId?: string;
        editorId?: string;
        sendNotification?: boolean; // todo, not sure yet
        roleIds?: string[];
        createdAt: string;
        updatedAt: string;
      }

      type GroupAuditLogDataRoleCreate = {
        groupId: string;
        name: string;
        description: string;
        isSelfAssignable: boolean;
        requiresTwoFactor: boolean;
        requiresPurchase: boolean;
        permissions: VRCAPI.Groups.Models.GroupPermissionEnum[];
      }

      type GroupAuditLogDataRoleUpdate = {
        name?: {
          old: string;
          new: string;
        }
        description?: {
          old: string;
          new: string;
        }
        requiresTwoFactor?: {
          old: boolean;
          new: boolean;
        }
        permissions?: {
          old: VRCAPI.Groups.Models.GroupPermissionEnum[];
          new: VRCAPI.Groups.Models.GroupPermissionEnum[];
        }
        order?: {
          old: number;
          new: number;
        };
      }

      type GroupAuditLogDataRoleDelete = {
        name: string;
        description: string;
        isSelfAssignable: boolean;
        requiresTwoFactor: boolean;
        requiresPurchase: boolean;
        permissions: VRCAPI.Groups.Models.GroupPermissionEnum[];
        order: number;
        createdAt: string;
      }

      type GroupAuditLogDataMemberUpdate = {
        managerNotes?: {
          old: string;
          new: string;
        }
      }

      type GroupAuditLogDataRoleAssign = {
        roleId: string;
        roleName: string;
      }

      type GroupAuditLogDataRoleUnassign = {
        roleId: string;
        roleName: string;
      }

      type GroupAuditLogDataGroupUpdate = {
        name?: {
          old: string;
          new: string;
        }
        description?: {
          old: string;
          new: string;
        }
        joinState?: {
          old: VRCAPI.Groups.Models.GroupJoinState;
          new: VRCAPI.Groups.Models.GroupJoinState;
        }
        iconId?: {
          old?: string;
          new: string;
        }
        bannerId?: {
          old?: string;
          new: string;
        }
        privacy?: {
          old: VRCAPI.Groups.Models.GroupPrivacy;
          new: VRCAPI.Groups.Models.GroupPrivacy;
        }
        languages?: {
          old: string[];
          new: string[];
        }
        links?: {
          old: string[];
          new: string[];
        }
        rules?: {
          old: string;
          new: string;
        }
      }
      type GroupAuditLogGalleryCreate = {
        name: string;
        description: string;
        membersOnly: boolean;
        roleIdsToView?: string[];
        roleIdsToSubmit?: string[];
        roleIdsToAutoApprove?: string[];
        roleIdsToManage?: string[];
      }

      type GroupAuditLogGalleryUpdate = {
        name?: {
          old: string;
          new: string;
        }
        description?: {
          old: string;
          new: string;
        }
        membersOnly?: {
          old: boolean;
          new: boolean;
        }
      }

      type GroupAuditLogGalleryDelete = {
        name: string;
        description: string;
        membersOnly: boolean;
        roleIdsToView?: string[];
        roleIdsToSubmit?: string[];
        roleIdsToAutoApprove?: string[];
        roleIdsToManage?: string[];
        createdAt: string;
        updatedAt: string;
      }

      type GroupAnnouncement = {
        id: string;
        groupId: string;
        authorId: string;
        editorId?: string; // TODO undocumented yet
        title: string;
        text: string;
        imageId?: string;
        imageUrl?: string;
        createdAt: string;
        updatedAt: string;
        roleIds?: string[]; // TODO undocumented yet
      };


      export type MyMember = {
        id: string;
        groupId: string;
        userId: string;
        roleIds: string[];
        managerNotes: string;
        membershipStatus: string;
        isSubscribedToAnnouncements: boolean; // defaults to true
        visibility: string;
        isRepresenting: boolean;
        joinedAt: string; // assuming date-time is a string in ISO format
        bannedAt: string | null;
        has2FA: boolean; // Defaults to false
        permissions: VRCAPI.Groups.Models.GroupPermissionEnum[]; // Admins defaults to ["*"]
        mRoleIds?: string[]; // TODO: Undocumented yet!
        lastPostReadAt?: string; // TODO: Undocumented yet!
        hasJoinedFromPurchase?: boolean; // TODO: Undocumented yet!
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
        permissions: VRCAPI.Groups.Models.GroupPermissionEnum[];
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

      /**
       * ## Different types of Group Privacy.
       *  @enum {string} **Default** -> Members can choose to advertise the group on their profile.
       *  @enum {string} **Private** -> The group cannot be advertised or displayed by members.
       */
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

      /**
       * ## Different types of Role Templates.
       * This is just a starting point for your group.
       * 
       * ### @enum {string} **Default** -> A basic starting point with only a Member role. New members get the role automatically, and can create and join open Group-Only instances.
       * #### Role(s):
       * 1. `Member`
       * -> Permissions granted: `group-instance-open-create`, `group-instance-plus-create`, `group-instance-public-create`, `group-instance-join`, `group-members-viewall`
       *
       * ### @enum {string} **Managed_free**
       * - Description: A set of roles with light Admin responsibility and some Member restrictions. Members can join open Group-Only instances, Moderators can moderate Instances, and Admins can manage Instances, Galleries, and Announcements.
       * #### Role(s):
       * 1. `Admin`
       * -> Permissions granted: `group-galleries-manage`, `group-announcement-manage`, `group-instance-moderate`
       * 
       * 2. `Moderator`
       * -> Permissions granted: `group-instance-moderate`
       * 
       * 3. `Member`
       * -> Permissions granted: `group-instance-join`
       * 
       * ### @enum {string} **Managed_Invite** -> A set of roles with light Admin responsibility and few Member restrictions. Members can create and join role-restricted and open Group-Only instances, Moderators can moderate Instances, and Admins can manage Instances, Galleries, and Announcements.
       * #### Role(s):
       * 1. `Admin`
       * -> Permissions granted: `group-galleries-manage, `group-announcement-manage`, `group-instance-moderate`
       * 
       * 2. `Moderator`
       * -> Permissions granted: `group-instance-moderate`
       * 
       * 3. `Member`
       * -> Permissions granted: `group-instance-restricted-create`, `group-instance-open-create`, `group-instance-plus-create`, `group-instance-public-create`, `group-instance-join`
       * 
       * ### @enum {string} **Managed_Request** -> A set of roles with more Admin responsibility and few Member restrictions. Members can create and join role-restricted and open Group-Only instances, Moderators can moderate instances, and Admins can manage other Members, Galleries, and Announcements.
       * #### Role(s):
       * 1. `Admin`
       * -> Permissions granted: `group-members-manage", `group-galleries-manage`, `group-announcement-manage`
       * 
       * 2. `Moderator`
       * -> Permissions granted: `group-instance-moderate`
       * 
       * 3. `Member`
       * -> Permissions granted: `group-instance-restricted-create`, `group-instance-open-create`, `group-instance-plus-create`, `group-instance-public-create`, `group-instance-join`
       * 
       */
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

      /**
       * ## Different types of Group Permissions.
       * All the different permissions for a group.
       * 
       * ### @enum {string} - **groupAllPermissions** -> All the permissions for a group. **WARNING READ THIS:** This permission doesn't exist in the permission option, it's only an option for vrchat API when creating a group!
       * - **groupMembersManage** -> `Manage Group Member Data`. Allows role to view, filter by role, and sort all members and edit data about them. Manage Role?: `TRUE`
       * - **groupDataManage** -> `Manage Group Data`. Allows role to edit group details (name, description, joinState, initialRoles, etc). Manage Role?: `TRUE`
       * - **groupAuditView** -> `View Audit log`. Allows role to view the full group audit log. Manage Role?: `TRUE`
       * - **groupRolesManage** -> `Manage Group Roles`. Allows role to create roles, modify roles, and delete roles. Manage Role?: `TRUE`
       * - **groupRolesAssign** -> `Assign Group Roles`. Allows role to assign/unassign roles to users. Manage Role?: `TRUE`
       * - **groupBansManage** -> `Manage Group Bans`. Allows role to ban/unban users and view all banned users. Manage Role?: `TRUE`
       * - **groupMembersRemove** -> `Remove Group Members`. Allows role to remove someone from the group. Manage Role?: `TRUE`
       * - **groupMembersViewall** -> `View All Members`. Allows role to view all members in a group, not just friends. Manage Role?: `FALSE`
       * - **groupAnnouncementManage** -> `Manage Group Announcement`. Allows role to set/clear group announcement and send it as a notification. Manage Role?: `FALSE`
       * - **groupGalleriesManage** -> `Manage Group Galleries`. Allows role to create, reorder, edit, and delete group galleries. Can always submit to galleries, and can approve images. Manage Role?: `FALSE`
       * - **groupInvitesManage** -> `Manage Group Invites`. Allows role to create/cancel invites, as well as accept/decline/block join requests. Manage Role?: `FALSE`
       * - **groupInstanceModerate** -> `Moderate Group Instances`. Allows role to moderate within a group instance. Manage Role?: `TRUE`
       * - **groupInstanceQueuePriority** -> `Group Instance Queue Priority`. Gives role priority for group instance queues. Manage Role?: `FALSE`
       * - **groupInstancePublicCreate** -> `Create Group Public Instances`. Allows role to create group instances that are open to all, member or not. NOTE: Private groups cannot create public instances. Manage Role?: `FALSE`
       * - **groupInstancePlusCreate** -> `Create Group+ Instances`. Allows role to create group instances that friends of people present can also join. Manage Role?: `FALSE`
       * - **groupInstanceOpenCreate** -> `Create Members-Only Group Instances`. Allows role to create members-only instances. Manage Role?: `FALSE`
       * - **groupInstanceRestrictedCreate** -> `Role-Restrict Members-Only Instances`. Allows role to add/remove/modify role restrictions on members-only instances. Requires \"Create Members-Only Group Instances\" to create. Manage Role?: `FALSE`
       * - **groupInstancePlusPortal** -> `Portal to Group+ Instances`. Allows role to open locked portals to Group+ instances. Members, friends of people there, and friends of the portal dropper may enter unless group-banned. Manage Role?: `FALSE`
       * - **groupInstancePlusPortalUnlocked** -> `Unlocked Portal to Group+ Instances`. Allows role to open unlocked portals to Group+ instances. Everyone except group-banned people may enter. Requires \"Portal to Group+ Instances\" permission. Manage Role?: `FALSE`
       * - **groupInstanceJoin** -> `Join Group Instances`. Allows role to join group instances. Manage Role?: `FALSE`
       */
      enum GroupPermissionEnum {
        groupAllPermissions = "*",
        groupMembersManage = 'group-members-manage',
        groupDataManage = 'group-data-manage',
        groupAuditView = 'group-audit-view',
        groupRolesManage = 'group-roles-manage',
        groupRolesAssign = 'group-roles-assign',
        groupBansManage = 'group-bans-manage',
        groupMembersRemove = 'group-members-remove',
        groupMembersViewall = 'group-members-viewall',
        groupAnnouncementManage = 'group-announcement-manage',
        groupGalleriesManage = 'group-galleries-manage',
        groupInvitesManage = 'group-invites-manage',
        groupInstanceModerate = 'group-instance-moderate',
        groupInstanceQueuePriority = 'group-instance-queue-priority',
        groupInstancePublicCreate = 'group-instance-public-create',
        groupInstancePlusCreate = 'group-instance-plus-create',
        groupInstanceOpenCreate = 'group-instance-open-create',
        groupInstanceRestrictedCreate = 'group-instance-restricted-create',
        groupInstancePlusPortal = 'group-instance-plus-portal',
        groupInstancePlusPortalUnlocked = 'group-instance-plus-portal-unlocked',
        groupInstanceJoin = 'group-instance-join',
      }

      type GroupPermissionsTags =
        'group-members-manage'
        | 'group-data-manage'
        | 'group-audit-view'
        | 'group-roles-manage'
        | 'group-roles-assign'
        | 'group-bans-manage'
        | 'group-members-remove'
        | 'group-members-viewall'
        | 'group-announcement-manage'
        | 'group-galleries-manage'
        | 'group-invites-manage'
        | 'group-instance-moderate'
        | 'group-instance-queue-priority'
        | 'group-instance-public-create'
        | 'group-instance-plus-create'
        | 'group-instance-open-create'
        | 'group-instance-restricted-create'
        | 'group-instance-plus-portal'
        | 'group-instance-plus-portal-unlocked'
        | 'group-instance-join';

      enum GroupInviteResponse {
        Accept = 'accept',
        Decline = 'deny'
      }
    }
    namespace Requests {
      /**
       * Information Required to request to create a group.
       */
      type CreateGroupRequest = {
        /**
         * The name of the group. Must be between 3 and 64 characters. **[REQUIRED]**.
         */
        name: string;
        /**
         * The short code of the group. Must be between 3 and 6 characters. **[REQUIRED]**.
         */
        shortCode: string;
        /**
         * The description of the group. Must be between 0 and 250 characters. *[OPTIONAL]*.
         */
        description?: string;
        /**
         * The JoinState of the group. Must be one of the following: `open`, `invite`, `request`, `closed`. Default is `open`. *[OPTIONAL]*
         */
        joinState?: VRCAPI.Groups.Models.GroupJoinState;
        /**
         * The IconId of the group. *[OPTIONAL]*.
         */
        iconId?: string;
        /**
         * The BannerId of the group. *[OPTIONAL]*.
         */
        bannerId?: string;
        /**
         * The Privacy of the group. Must be one of the following: `default`, `private`. Default is `default`. *[OPTIONAL]*.
         */
        privacy?: VRCAPI.Groups.Models.GroupPrivacy;
        /**
         * The RoleTemplate of the group. Must be one of the following: `default`, `managedFree`, `managedInvite`, `managedRequest`. Default is `default`. **[REQUIRED]**.
         */
        roleTemplate: VRCAPI.Groups.Models.GroupRoleTemplate;
      }

      /**
       * Information Required to request to get a group.
       */
      type getGroupByIdRequest = {
        /**
         * The groupId of the Group you want to get information about. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * Whether or not to include the group's roles. Defaults to false if omitted. *[OPTIONAL]*.
         */
        includeRoles?: boolean;
      };

      /**
       * Information Required to request to get a group's Audit Logs.
       */
      type getGroupAuditLogsRequest = {
        /**
         * The groupId of the Group you want to get the audit logs from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The number of logs to get. Defaults to 60 if omitted. *[OPTIONAL]*.
         */
        n?: number;
        /**
         * The offset to get the logs from. Defaults to 0 if omitted. *[OPTIONAL]*.
         */
        offset?: number;
        /**
         * The Starting date of the logs to get. *[OPTIONAL]*.
         */
        startDate?: string;
        /**
         * The Ending date of the logs to get. *[OPTIONAL]*.
         */
        endDate?: string;
      }

      /**
       * Information Required to request to update a group.
       */
      type UpdateGroupRequest = {
        /**
         * The groupId of the Group you want to update. **[REQUIRED]**.
         */
        groupId: string;
        /**
        * The name of the group. Must be between 3 and 64 characters. *[OPTIONAL]*.
        */
        name?: string;
        /**
        * The short code of the group. Must be between 3 and 6 characters. *[OPTIONAL]*.
        */
        shortCode?: string;
        /**
         * The description of the group. Must be between 0 and 250 characters. *[OPTIONAL]*.
         */
        description?: string; // Must be 0 to 250 characters long, optional
        /**
         * The JoinState of the group. Must be one of the following: `open`, `invite`, `request`, `closed`. *[OPTIONAL]*.
         */
        joinState?: VRCAPI.Groups.Models.GroupJoinState;
        /**
         * The IconId of the group. *[OPTIONAL]*.
         */
        iconId?: string;
        /**
         * The BannerId of the group. *[OPTIONAL]*.
         */
        bannerId?: string;
        /**
         * The language tags of the group. Must be a valid Language Tag. Maximum of 3 tags. *[OPTIONAL]*.
         */
        languages?: [VRCAPI.Generics.languageTagsShort?, VRCAPI.Generics.languageTagsShort?, VRCAPI.Generics.languageTagsShort?];
        /**
         * The links of the group. Must not contain more then 3 elements. *[OPTIONAL]*.
         */
        links?: [string, string?, string?];
        /**
         * The Rules of the group. Minimum length is 0, maximum length is 2048. *[OPTIONAL]*.
         */
        rules?: string;

      }

      /**
       * Information Required to request to delete a group.
       * 
       * **BE CAREFULL WITH THIS, YOU CAN'T GO BACK!**
       */
      type DeleteGroupRequest = {
        /**
         * The groupId of the Group you want to delete. **[REQUIRED]**.
         */
        groupId: string;
      }

      /**
       * Information Required to request to get a group's announcements.
       */
      type GetGroupAnnouncementRequest = {
        /**
         * The groupId of the Group you want to get an announcement from. **[REQUIRED]**.
         */
        groupId: string;
      }

      /**
       * Information Required to request to create a group announcement.
       */
      type CreateGroupAnnouncementRequest = {
        /**
         * The groupId of the Group you want to create an announcement for. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The title of the Group Announcement. Must be minimum 1 character long. **[REQUIRED]**.
         */
        title: string;
        /**
         * The text of the Group Announcement. Must be minimum 1 character long. **[REQUIRED]**.
         */
        text: string;
        /**
         * The imageId of the Group Announcement. *[OPTIONAL]*.
         */
        imageId?: string;
        /**
         * Whether or not to send a notification to all group members. Defaults to true. *[OPTIONAL]*.
         */
        sendNotification?: boolean;
      }

      /**
       * Information Required to request to delete a GroupAnnouncement.
       */
      type deleteGroupAnnouncementRequest = {
        /**
         * The groupId of the Group you want to delete an announcement from. **[REQUIRED]**.
         */
        groupId: string;
      }

      /**
       * Information Required to request to get a group's banned users.
       */
      type GetBannedUsersRequest = {
        /**
         * The groupId of the Group you want to get the banned users from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The number of users to get. Defaults to 60 if omitted. *[OPTIONAL]*.
         */
        n?: number;
        /**
         * The offset to get the users from. Defaults to 0 if omitted. *[OPTIONAL]*.
         */
        offset?: number;
      }

      /**
       * Information Required to request to ban a user from a group.
       */
      type BanGroupMemberRequest = {
        /**
         * The groupId of the Group you want to ban a user from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The userId of the User you want to ban. **[REQUIRED]**.
         */
        userId: string;
      }

      /**
       * Information Required to request to unban a user from a group.
       */
      type UnbanGroupMemberRequest = {
        /**
         * The groupId of the Group you want to unban a user from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The userId of the User you want to unban. **[REQUIRED]**.
         */
        userId: string;
      }

      /**
       * Information Required to request to create a group gallery.
       */
      type createGroupGalleryRequest = {
        /**
         * The groupId of the Group you want to create a gallery for. **[REQUIRED]**.
         */
        groupId: string;
        /**
        * The name of the Group Gallery. Must be between 1 and 64 characters. **[REQUIRED]**.
        */
        name: string;
        /**
         * The description of the Group Gallery. Must be between 0 and 512 characters. *[OPTIONAL]*.
         */
        description?: string;
        /**
         * Whether or not the gallery is members only. Defaults to false. *[OPTIONAL]*.
         */
        membersOnly?: boolean;
        /**
         * The roleIds that can view the gallery. *[OPTIONAL]*.
         */
        roleIdsToView?: string[];
        /**
         * The roleIds that can submit to the gallery. *[OPTIONAL]*.
         */
        roleIdsToSubmit?: string[];
        /**
         * The roleIds that can auto approve submissions to the gallery. *[OPTIONAL]*.
         */
        roleIdsToAutoApprove?: string[];
        /**
         * The roleIds that can manage the gallery. *[OPTIONAL]*.
         */
        roleIdsToManage?: string[];
      }

      /**
       * Information Required to request to get a group's gallerie's Images.
       */
      type GetGroupGalleryImagesRequest = {
        /**
         * The groupId of the Group you want to get the gallerie's images from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The groupGalleryId of the Group Gallery you want to get the images from. **[REQUIRED]**.
         */
        groupGalleryId: string;
        /**
         * The number of images to get. Must be between 1 and 100. Defaults to 60 if omitted. *[OPTIONAL]*.
         */
        n?: number;
        /**
         * The offset to get the images from. Must be at least 0. Defaults to 0 if omitted. *[OPTIONAL]*.
         */
        offset?: number;
        /**
         * Whether or not to include images that are approved. *[OPTIONAL]*.
         */
        approved?: boolean; // TODO FIND THE DEFAULT?
      }

      /**
       * Information Required to request to update a group gallery.
       */
      type UpdateGroupGalleryRequest = {
        /**
         * The groupId of the Group you want to update a gallery for. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The groupGalleryId of the Group Gallery you want to update. **[REQUIRED]**.
         */
        groupGalleryId: string;
        /**
         * The name of the Group Gallery. Must be between 1 and 64 characters. *[OPTIONAL]*.
         */
        name?: string;
        /**
         * The description of the Group Gallery. Must be between 0 and 512 characters. *[OPTIONAL]*.
         */
        description?: string;
        /**
         * Whether or not the gallery is members only. *[OPTIONAL]*.
         */
        membersOnly?: boolean;
        /**
         * The roleIds that can view the gallery. *[OPTIONAL]*.
         */
        roleIdsToView?: string[];
        /**
         * The roleIds that can submit to the gallery. *[OPTIONAL]*.
         */
        roleIdsToSubmit?: string[];
        /**
         * The roleIds that can auto approve submissions to the gallery. *[OPTIONAL]*.
         */
        roleIdsToAutoApprove?: string[];
        /**
         * The roleIds that can manage the gallery. *[OPTIONAL]*.
         */
        roleIdsToManage?: string[];
      }

      /**
       * Information Required to request to delete a group gallery.
       */
      type DeleteGroupGalleryRequest = {
        /**
         * The groupId of the Group you want to delete a gallery from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The groupGalleryId of the Group Gallery you want to delete. **[REQUIRED]**.
         */
        groupGalleryId: string;
      }

      /**
       * Information Required to request to add a image to a group gallery.
       */
      type AddGroupGalleryImagesRequest = {
        /**
         * The groupId of the Group you want to add a image to a gallery from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The groupGalleryId of the Group Gallery you want to add a image to. **[REQUIRED]**.
         */
        groupGalleryId: string;
        /**
         * The fileId of the image you want to add to the gallery. **[REQUIRED]**.
         */
        fileId: string; // TODO Research how that file ID looks like ( file_ce35d830-e20a-4df0-a6d4-5aaef4508044 )
      }

      /**
       * Information Required to request to delete a image from a group gallery.
       */
      type DeleteGroupGalleryImagesRequest = {
        /**
         * The groupId of the Group you want to delete a image from a gallery from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The groupGalleryId of the Group Gallery you want to delete a image from. **[REQUIRED]**.
         */
        groupGalleryId: string;
        /**
         * The groupGalleryImageId of the Group Gallery Image you want to delete. **[REQUIRED]**.
         */
        groupGalleryImageId: string;
      }

      /**
       * Information Required to request to get a group's invites.
       */
      type GetGroupInvitesSentRequest = {
        /**
         * The groupId of the Group you want to get the invites from. **[REQUIRED]**.
         */
        groupId: string;
      }

      /**
       * Information Required to request to invite a user to a group.
       */
      type InviteUserToGroupRequest = {
        /**
         * The groupId of the Group you want to invite a user to. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The userId of the User you want to invite. **[REQUIRED]**.
         */
        userId: string;
        /**
         * TODO research what this does. *[OPTIONAL]*.
         */
        confirmOverrideBlock: boolean;
      }

      /**
       * Information Required to request to delete a group invite.
       */
      type deleteGroupUserInviteRequest = {
        /**
         * The groupId of the Group you want to delete an invite from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The userId of the User you want to delete an invite from. **[REQUIRED]**.
         */
        userId: string;
      }

      /**
       * Information Required to request to join a group.
       */
      type joinGroupRequest = {
        /**
         * The groupId of the Group you want to join. **[REQUIRED]**.
         */
        groupId: string;
      }

      /**
       * Information Required to request to leave a group.
       */
      type leaveGroupRequest = {
        /**
         * The groupId of the Group you want to leave. **[REQUIRED]**.
         */
        groupId: string;
      }

      /**
       * Information Required to request to get a group's members.
       */
      type listGroupMembersRequest = {
        /**
         * The groupId of the Group you want to get the members from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The number of members to get. Must be between 1 and 100. Defaults to 60 if omitted. *[OPTIONAL]*.
         */
        n?: number;
        /**
         * The offset to get the members from. Must be at least 0. Defaults to 0 if omitted. *[OPTIONAL]*.
         */
        offset?: number;
      }

      /**
       * Information Required to request to get a group's member.
       */
      type getGroupMemberRequest = {
        /**
         * The groupId of the Group you want to get the member from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The userId of the User you want to get the member from. **[REQUIRED]**.
         */
        userId: string;
      }

      /**
       * Information Required to request to update a group's member.
       */
      type updateGroupMemberRequest = {
        /**
         * The groupId of the Group you want to update the member from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The userId of the User you want to update the member from. **[REQUIRED]**.
         */
        userId: string;
        /**
         * The visibility of the member. Must be one of the following: `visible`, `hidden`, `friends`. *[OPTIONAL]*.
         */
        visibility?: VRCAPI.Groups.Models.GroupUserVisibility;
        /**
         * Whether or not the member is subscribed to announcements. *[OPTIONAL]*.
         */
        isSubscribedToAnnouncements?: boolean;
        /**
         * The notes about the member. *[OPTIONAL]*.
         */
        managerNotes?: string;
      };

      /**
       * Information Required to request to kick a user from a group.
       */
      type kickGroupMemberRequest = {
        /**
         * The groupId of the Group you want to kick the member from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The userId of the User you want to kick. **[REQUIRED]**.
         */
        userId: string;
      }

      /**
       * Information Required to request to add a role to a group member.
       */
      type addRoleToGroupMemberRequest = {
        /**
         * The groupId of the Group you want to add the role to the member from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The userId of the User you want to add the role to. **[REQUIRED]**.
         */
        userId: string;
        /**
         * The groupRoleId of the Group Role you want to add. **[REQUIRED]**.
         */
        groupRoleId: string;
      }

      /**
       * Information Required to request to remove a role from a group member.
       */
      type removeRoleFromGroupMemberRequest = {
        /**
         * The groupId of the Group you want to remove the role from the member from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The userId of the User you want to remove the role from. **[REQUIRED]**.
         */
        userId: string;
        /**
         * The groupRoleId of the Group Role you want to remove. **[REQUIRED]**.
         */
        groupRoleId: string;
      }

      /**
       * Information Required to request to get a group's permissions.
       */
      type listGroupPermissionsRequest = {
        /**
         * The groupId of the Group you want to get the permissions from. **[REQUIRED]**.
         */
        groupId: string;
      }

      /**
       * Information Required to request to get a group's current join request.
       */
      type getGroupJoinRequestsRequest = {
        /**
         * The groupId of the Group you want to get the join requests from. **[REQUIRED]**.
         */
        groupId: string;
      }

      /**
       * Information Required to request to cancel a group's join request.
       */
      type cancelGroupJoinRequestRequest = {
        /**
         * The groupId of the Group you want to cancel the join request from. **[REQUIRED]**.
         */
        groupId: string;
      }

      /**
       * Information Required to request to respond to a group's join request.
       */
      type respondGroupJoinrequestRequest = {
        /**
         * The groupId of the Group you want to respond to the join request from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The userId of the User you want to respond to the join request from. **[REQUIRED]**.
         */
        userId: string;
        /**
         * The action to take on the join request. Must be one of the following: `Accept`, `Deny`. **[REQUIRED]**.
         */
        action: VRCAPI.Groups.Models.GroupInviteResponse;
      }

      /**
       * Information Required to request to get a group's roles.
       */
      type getGroupRolesRequest = {
        /**
         * The groupId of the Group you want to get the roles from. **[REQUIRED]**.
         */
        groupId: string;
      }

      /**
       * Information Required to request to create a group role.
       */
      type createGroupRoleRequest = {
        /**
         * The groupId of the Group you want to create the role for. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The name of the Group Role. Must be between 1 and 64 characters. **[REQUIRED]**.
         */
        name: string;
        /**
         * The description of the Group Role. Must be between 1 and 512 characters. *[OPTIONAL]*.
         */
        description?: string;
        /**
         * Whether or not the role is self assignable. Defaults to false. *[OPTIONAL]*.
         */
        isSelfAssignable?: boolean;
        /**
         * The permissions of the role. *[OPTIONAL]*.
         */
        permissions?: VRCAPI.Groups.Models.GroupPermissionEnum[];
      }

      /**
       * Information Required to request to update a group role.
       */
      type updateGroupRoleRequest = {
        /**
         * The groupId of the Group you want to update the role for. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The groupRoleId of the Group Role you want to update. **[REQUIRED]**.
         */
        groupRoleId: string;
        /**
         * The name of the Group Role. Must be between 1 and 64 characters. *[OPTIONAL]*.
         */
        name?: string;
        /**
         * The description of the Group Role. Must be between 1 and 512 characters. *[OPTIONAL]*.
         */
        description?: string;
        /**
         * Whether or not the role is self assignable. *[OPTIONAL]*.
         */
        isSelfAssignable?: boolean;
        /**
         * The permissions of the role. *[OPTIONAL]*.
         */
        permissions?: VRCAPI.Groups.Models.GroupPermissionEnum[];
        /**
         * The order of the role in the group. *[OPTIONAL]*.
         */
        order?: number;
      }

      /**
       * Information Required to request to delete a group role.
       */
      type deleteGroupRoleRequest = {
        /**
         * The groupId of the Group you want to delete the role from. **[REQUIRED]**.
         */
        groupId: string;
        /**
         * The groupRoleId of the Group Role you want to delete. **[REQUIRED]**.
         */
        groupRoleId: string;
      }

    }
  }
}
