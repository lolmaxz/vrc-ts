import { AllTags, languageTagsShort } from './Generics';

//! -- Group API -- !//
export type Group = {
    id: string;
    name: string;
    shortCode: string;
    discriminator: string;
    description: string;
    iconId?: string;
    iconUrl?: string;
    bannerUrl?: string;
    bannerId?: string;
    lastPostCreatedAt?: string; // assuming date-time is a string in ISO format
    privacy: GroupPrivacy;
    ownerId: string;
    rules?: string;
    links?: string[];
    languages?: languageTagsShort[]; // only languages short tags
    memberCount: number;
    memberCountSyncedAt?: string; // assuming date-time is a string in ISO format
    isVerified?: boolean;
    joinState?: GroupJoinState;
    tags?: AllTags[];
    galleries?: GroupGallery[];
    createdAt?: string; // assuming date-time is a string in ISO format
    initialRoleIds?: string[]; // TODO undocumented yet! Seems to not be present anymore?
    updatedAt?: string; // assuming date-time is a string in ISO format
    onlineMemberCount?: number;
    membershipStatus?: GroupMembershipStatus;
    myMember?: MyMember;
    roles?: GroupRole[];
    badges?: string[]; // new attribute
};

export type LimitedGroup = {
    id: string;
    name: string;
    shortCode: string;
    discriminator: string;
    description: string;
    iconId?: string;
    iconUrl?: string;
    bannerUrl?: string;
    bannerId?: string;
    ownerId: string;
    memberCount: number;
    tags?: AllTags[];
    createdAt?: string; // assuming date-time is a string in ISO format
    membershipStatus?: GroupMembershipStatus;
    galleries: GroupGallery[];
    isSearchable: boolean;
};

export type RepresentedGroup = {
    name: string;
    shortCode: string;
    discriminator: string;
    description: string;
    iconId?: string;
    iconUrl?: string;
    bannerUrl?: string;
    bannerId?: string;
    privacy: GroupPrivacy;
    ownerId: string;
    memberCount: number;
    groupId: string;
    memberVisibility: GroupUserVisibility;
    isRepresenting: boolean;
};

export type GroupAudit = {
    results: {
        id: string;
        created_at: string;
        groupId: string;
        actorId: string;
        actorDisplayName: string;
        targetId: string;
        eventType: GroupAuditLogEventType;
        description: string;
        data?:
            | GroupAuditLogDataPostCreated
            | GroupAuditLogDataPostDeleted
            | GroupAuditLogDataRoleCreate
            | GroupAuditLogDataRoleUpdate
            | GroupAuditLogDataRoleDelete
            | GroupAuditLogDataMemberUpdate
            | GroupAuditLogDataRoleAssign
            | GroupAuditLogDataRoleUnassign
            | GroupAuditLogDataGroupUpdate
            | GroupAuditLogGalleryCreate
            | GroupAuditLogGalleryUpdate
            | GroupAuditLogGalleryDelete
            | GroupAuditLogDataGroupInstanceCreate;
    }[];
    totalCount: number;
    hasNext: boolean;
};

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
export enum GroupAuditLogEventType {
    // Group events
    Group_Create = 'group.create',
    Group_Update = 'group.update',
    // Announcement events
    Group_Announcement_Create = 'group.post.create',
    Group_Announcement_Delete = 'group.post.delete',
    // Role events
    Group_Role_Create = 'group.role.create',
    Group_Role_Update = 'group.role.update',
    Group_Role_Delete = 'group.role.delete',
    Group_Role_Assign = 'group.role.assign',
    Group_Role_Unassign = 'group.role.unassign',
    // Member events
    Group_Member_Update = 'group.member.update',
    Group_Member_Join = 'group.member.join',
    Group_Member_Leave = 'group.member.leave',
    Group_Member_Kick = 'group.member.remove',
    Group_Member_Ban = 'group.user.ban',
    Group_Member_Unban = 'group.user.unban',
    // Invite events
    Group_Invite_Create = 'group.invite.create',
    // Group Request events
    Group_Request_Create = 'group.request.create',
    Group_Request_Deny = 'group.request.reject',
    Group_Request_Deny_Block = 'group.request.block',
    // Gallery events
    Group_Gallery_Create = 'group.gallery.create',
    Group_Gallery_Update = 'group.gallery.update',
    Group_Gallery_Delete = 'group.gallery.delete',
    // Instance events
    Group_Instance_Create = 'group.instance.create',
}

export type GroupAuditLogDataPostCreated = {
    title: string;
    text: string;
    imageId?: string;
    authorId?: string;
    sendNotification?: boolean;
    roleIds?: string[];
    visibility: GroupPostVisibilityType;
};

export type GroupAuditLogDataPostDeleted = {
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
    visibility: GroupPostVisibilityType;
};

export type GroupAuditLogDataRoleCreate = {
    groupId: string;
    name: string;
    description: string;
    isSelfAssignable: boolean;
    requiresTwoFactor: boolean;
    requiresPurchase: boolean;
    permissions: GroupPermissionEnum[];
};

export type GroupAuditLogDataRoleUpdate = {
    name?: {
        old: string;
        new: string;
    };
    description?: {
        old: string;
        new: string;
    };
    requiresTwoFactor?: {
        old: boolean;
        new: boolean;
    };
    permissions?: {
        old: GroupPermissionEnum[];
        new: GroupPermissionEnum[];
    };
    order?: {
        old: number;
        new: number;
    };
};

export type GroupAuditLogDataRoleDelete = {
    name: string;
    description: string;
    isSelfAssignable: boolean;
    requiresTwoFactor: boolean;
    requiresPurchase: boolean;
    permissions: GroupPermissionEnum[];
    order: number;
    createdAt: string;
};

export type GroupAuditLogDataMemberUpdate = {
    managerNotes?: {
        old: string;
        new: string;
    };
};

export type GroupAuditLogDataRoleAssign = {
    roleId: string;
    roleName: string;
};

export type GroupAuditLogDataRoleUnassign = {
    roleId: string;
    roleName: string;
};

export type GroupAuditLogDataGroupUpdate = {
    name?: {
        old: string;
        new: string;
    };
    description?: {
        old: string;
        new: string;
    };
    joinState?: {
        old: GroupJoinState;
        new: GroupJoinState;
    };
    iconId?: {
        old?: string;
        new: string;
    };
    bannerId?: {
        old?: string;
        new: string;
    };
    privacy?: {
        old: GroupPrivacy;
        new: GroupPrivacy;
    };
    languages?: {
        old: string[];
        new: string[];
    };
    links?: {
        old: string[];
        new: string[];
    };
    rules?: {
        old: string;
        new: string;
    };
};
export type GroupAuditLogGalleryCreate = {
    name: string;
    description: string;
    membersOnly: boolean;
    roleIdsToView?: string[];
    roleIdsToSubmit?: string[];
    roleIdsToAutoApprove?: string[];
    roleIdsToManage?: string[];
};

export type GroupAuditLogGalleryUpdate = {
    name?: {
        old: string;
        new: string;
    };
    description?: {
        old: string;
        new: string;
    };
    membersOnly?: {
        old: boolean;
        new: boolean;
    };
};

export type GroupAuditLogGalleryDelete = {
    name: string;
    description: string;
    membersOnly: boolean;
    roleIdsToView?: string[];
    roleIdsToSubmit?: string[];
    roleIdsToAutoApprove?: string[];
    roleIdsToManage?: string[];
    createdAt: string;
    updatedAt: string;
};

export type GroupAuditLogDataGroupInstanceCreate = {
    groupAccessType: string; // 'member'
    roleIds?: string[];
};

export type GroupAnnouncement = {
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
    /** List of role IDs that can view the post. Will be empty when for all members OR Public visibility. */
    roleIds: string[];
};

export type GroupPost = GroupAnnouncement & {
    visibility: GroupPostVisibilityType;
};

export type GroupPostRequestResponse = {
    total: number;
    posts: GroupPost[];
};
export type BaseMyMember = {
    id: string;
    groupId: string;
    userId: string;
    isRepresenting: boolean;
    roleIds: string[];
    mRoleIds?: string[]; // TODO: Undocumented yet!
    joinedAt: string; // assuming date-time is a string in ISO format
    membershipStatus: string;
    visibility: string;
    isSubscribedToAnnouncements: boolean; // defaults to true
    lastPostReadAt?: string; // TODO: Undocumented yet!
};

export type MyMember = BaseMyMember & {
    managerNotes: string;
    bannedAt: string | null;
    has2FA: boolean; // Defaults to false
    permissions: GroupPermissionEnum[]; // Admins defaults to ["*"]
    hasJoinedFromPurchase?: boolean; // TODO: Undocumented yet!
};

export type GroupMemberLimitedUser = {
    id: string;
    displayName: string;
    thumbnailUrl: string;
    iconUrl: string;
    profilePicOverride: string;
    currentAvatarThumbnailImageUrl: string;
    currentAvatarTags: string[];
};

export type GroupMember = {
    id: string;
    groupId: string;
    userId: string;
    isRepresenting: boolean;
    user: GroupMemberLimitedUser;
    roleIds: string[];
    joinedAt: string;
    membershipStatus: GroupMembershipStatus;
    visibility: string;
    isSubscribedToAnnouncements: boolean;
    createdAt?: string;
    bannedAt?: string;
    managerNotes?: string;
};

export type GroupRole = {
    id: string;
    groupId: string;
    name: string;
    description: string;
    isSelfAssignable: boolean;
    permissions: GroupPermissionEnum[];
    isManagementRole: boolean;
    requiresTwoFactor: boolean;
    requiresPurchase: boolean;
    order: number;
    createdAt: string; // assuming date-time is a string in ISO format
    updatedAt: string; // assuming date-time is a string in ISO format
    /** The default role is the role that is assigned to all members by default. If set to true, this role will be given to any members that join the VRChat Group */
    defaultRole: boolean; //! new attribute
    /** The role that will be assigned to new members when they join the VRChat Group */
    isAddedOnJoin: boolean; //! new attribute
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

export type GroupGalleryImage = {
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
};

export type GroupPermission = {
    allowedToAdd: boolean;
    dependsOn: GroupPermissionEnum[];
    displayName: string;
    help: string;
    isManagementPermission: boolean;
    name: string;
};

export enum GroupMembershipStatus {
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
export enum GroupPrivacy {
    Default = 'default',
    Private = 'private',
}

/**
 * ## Different types of Group Join States.
 * Choose how you'd like to allow people to join your Group. This can be changed later.
 * @enum {string} **Open** -> Also called `Free Join` on VRChat. > Anyone can join your Group freely!
 * @enum {string} **Request** -> Also called `Request to Join` on VRChat. > New members must request to join. This can be approved or denied by a Moderator or Admin.
 * @enum {string} **Invite** -> Also called `Invite-Only` on VRChat. > New members may be invited by anyone with the right permissions.
 *
 */
export enum GroupJoinState {
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
export enum GroupRoleTemplate {
    Default = 'default',
    Managed_free = 'managedFree',
    Managed_Invite = 'managedInvite',
    Managed_Request = 'managedRequest',
}

export enum GroupUserVisibility {
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
export enum GroupPermissionEnum {
    groupAllPermissions = '*',
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

export type GroupPermissionsTags =
    | 'group-members-manage'
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

export enum GroupInviteResponse {
    Accept = 'accept',
    Decline = 'deny',
}

//! -- Request Types -- !//

export type GroupId = {
    /** The groupId of the group you want to perform this action on. **[REQUIRED]** */
    groupId: string;
};

export type UserId = {
    /** UserId of the User needed to perform this action on. **[REQUIRED]** */
    userId: string;
};

export type Quantity = {
    /** A quantity to specify how much information to receive. Must be between 1 and 100. Defaults to 60 if omitted. *[OPTIONAL]*. */
    n?: number;
};

export type Offset = {
    /** The offset to get the information from. Must be at least 0. Defaults to 0 if omitted. *[OPTIONAL]*. */
    offset?: number;
};

export type ReqName = {
    /** The required name to perform this action. Must be between 3 and 64 characters. **[REQUIRED]** */
    name: string;
};

export type OptName = {
    /** The optional name to perform this action. Must be between 3 and 64 characters. *[OPTIONAL]*. */
    name?: string;
};

export type Description = {
    /** The description to attach to this action. Must be between 0 and 512 characters. *[OPTIONAL]*. */
    description?: string;
};

export type Sort = {
    /** The sort order of the information. Must be one of the following: `ascending`, `descending`. Defaults to `descending` if omitted. *[OPTIONAL]*. */
    sort?: GroupMemberSearchSort;
};

export type groupMemberSort = {
    /** The sort order of the information. Must be one of the following: `ascending`, `descending`. Defaults to `descending` if omitted. *[OPTIONAL]*. */
    sort?: GroupMemberSearchSort;
};

export enum GroupMemberSearchSort {
    JoinedAt_Asc = 'joinedAt:asc',
    JoinedAt_Desc = 'joinedAt:desc',
}

export type searchGroupRequest = Quantity &
    Offset & {
        /** The search query to search for groups. Can be either a Group shortCode or a Group Name. **[REQUIRED]**. */
        query: string;
    };

export type basicGroupData = Description & {
    /** The short code of the group. Must be between 3 and 6 characters. **[REQUIRED]**. */
    shortCode?: string;
    /** The JoinState of the group. Must be one of the following: `open`, `invite`, `request`, `closed`. Default is `open`. *[OPTIONAL]* */
    joinState?: GroupJoinState;
    /** The IconId of the group. *[OPTIONAL]*. */
    iconId?: string;
    /** The BannerId of the group. *[OPTIONAL]*. */
    bannerId?: string;
};

/** Information Required to request to create a group. */
export type createGroupRequest = basicGroupData &
    ReqName & {
        /** The Privacy of the group. Must be one of the following: `default`, `private`. Default is `default`. *[OPTIONAL]*. */
        privacy?: GroupPrivacy;
        /** The RoleTemplate of the group. Must be one of the following: `default`, `managedFree`, `managedInvite`, `managedRequest`. Default is `default`. **[REQUIRED]**. */
        roleTemplate: GroupRoleTemplate;
        /** test */
        shortCode: string; // redefining
    };

/** Information Required to request to get a group. */
export type getGroupByIdRequest = GroupId & {
    /** Whether or not to include the group's roles. Defaults to false if omitted. *[OPTIONAL]*. */
    includeRoles?: boolean;
};

/** Information Required to request to get a group's Audit Logs.*/
export type getGroupAuditLogsRequest = GroupId &
    Quantity &
    Offset & {
        /** The Starting date of the logs to get. *[OPTIONAL]*. */
        startDate?: string;
        /** The Ending date of the logs to get. *[OPTIONAL]*. */
        endDate?: string;
    };

/** Information Required to request to update a group's information. */
export type dataKeysUpdateGroup = basicGroupData &
    OptName & {
        /** The language tags of the group. Must be a valid Language Tag. Maximum of 3 tags. *[OPTIONAL]*. */
        languages?: [languageTagsShort?, languageTagsShort?, languageTagsShort?];
        /** The links of the group. Must not contain more then 3 elements. *[OPTIONAL]*. */
        links?: [string, string?, string?];
        /** The Rules of the group. Minimum length is 0, maximum length is 2048. *[OPTIONAL]*. */
        rules?: string;
        /** The tags of the group. Each string must be at least 1 character long. *[OPTIONAL]*. */
        tags?: AllTags[];
    };

/** Information Required to request to update a group. */
export type updateGroupRequest = GroupId & dataKeysUpdateGroup;

/** Information Required to request to delete a group.
 * ### BE CAREFULL WITH THIS, YOU CAN'T GO BACK!*/
export type deleteGroupRequest = GroupId;

/** Information Required to request to get a group's announcements. */
export type getGroupAnnouncementRequest = GroupId;

/** Information Required to get a group's Posts. */
export type getGroupPostsRequest = GroupId & dataKeysGetGroupPosts;

/** Information Required to send a request to get a group's Posts. */
export type dataKeysGetGroupPosts = Quantity &
    Offset & {
        /** This is set to False by default */
        publicOnly?: boolean;
    };

/**
 * ## Different types of Group Post Visibility.
 * @enum {string} **Group** -> Only group members can see the post. This is when you select either for specific roles or for group members only.
 * @enum {string} **Public** -> Everyone can see the post.
 */
export enum GroupPostVisibilityType {
    Group = 'group',
    Public = 'public',
}

/** Information Required to request to create a group post. */
export type dataKeyCreatePost = dataKeysCreateGroupPost & {
    /** The visibility of the post. If the Post is either for members only or for specific roles, it NEEDS to be set to Group.*/
    visibility: GroupPostVisibilityType;
    roleIds?: string[];
};

/** Final Information Required to request to create a group post. */
export type createGroupPostRequest = GroupId & dataKeyCreatePost & extraCreateGroupPostContentRequest;

export type extraCreateGroupPostTextRequest = {
    /** The text of the Group Announcement. Must be minimum 1 character long. **[REQUIRED]**.*/
    text: string; // is called 'text' in the API
};
export type extraCreateGroupPostContentRequest = {
    /** The text of the Group Announcement. Must be minimum 1 character long. **[REQUIRED]**.*/
    content: string; // is called 'text' in the API
};

export type dataKeysCreateGroupPost = {
    /** The title of the Group Announcement. Must be minimum 1 character long. **[REQUIRED]**.*/
    title: string;
    /** The imageId of the Group Announcement. *[OPTIONAL]*.*/
    imageId?: string;
    /** Whether or not to send a notification to all group members. Defaults to true. *[OPTIONAL]*.*/
    sendNotification?: boolean;
};

export type dataKeysCreateGroupPostPlus = dataKeyCreatePost &
    extraCreateGroupPostTextRequest & {
        /** The visibility of the post. If the Post is either for members only or for specific roles, it NEEDS to be set to Group.*/
        visibility: GroupPostVisibilityType;
        roleIds?: string[];
    };

export type dataKeysCreateGroupAnnouncement = {
    /** The title of the Group Announcement. Must be minimum 1 character long. **[REQUIRED]**.*/
    title: string;
    /** The text of the Group Announcement. Must be minimum 1 character long. **[REQUIRED]**.*/
    text: string; // is called 'text' in the API
    /** The imageId of the Group Announcement. *[OPTIONAL]*.*/
    imageId?: string;
    /** Whether or not to send a notification to all group members. Defaults to true. *[OPTIONAL]*.*/
    sendNotification?: boolean;
};

/** Information Required to request to create a group announcement. */
export type createGroupAnnouncementRequest = GroupId & dataKeysCreateGroupAnnouncement;

/** Information Required to request to delete a GroupAnnouncement. */
export type deleteGroupAnnouncementRequest = GroupId;

/** Information Required to request to delete a Group's Post. */
export type deleteGroupPostRequest = GroupId & {
    /** The ID of the post you want to delete. **[REQUIRED]**.*/
    postId: string;
};

/** Information Required to request to get a group's banned users. */
export type getBannedUsersRequest = GroupId & Quantity & Offset;

export type dataKeysGroupBanMember = {
    /** The ID of the user to ban. **[REQUIRED]**.*/
    userId: string;
};

/** Information Required to request to ban a user from a group. */
export type banGroupMemberRequest = GroupId & dataKeysGroupBanMember;

/** Information Required to request to unban a user from a group. */
export type unbanGroupMemberRequest = GroupId & UserId;

export type dataKeysGroupCreateGallery = ReqName &
    Description & {
        /** Whether or not the gallery is members only. Defaults to false. *[OPTIONAL]*.*/
        membersOnly?: boolean;
        /** The roleIds that can view the gallery. *[OPTIONAL]*.*/
        roleIdsToView?: string[];
        /** The roleIds that can submit to the gallery. *[OPTIONAL]*.*/
        roleIdsToSubmit?: string[];
        /** The roleIds that can auto approve submissions to the gallery. *[OPTIONAL]*.*/
        roleIdsToAutoApprove?: string[];
        /** The roleIds that can manage the gallery. *[OPTIONAL]*.*/
        roleIdsToManage?: string[];
    };

/** Information Required to request to create a group gallery. */
export type createGroupGalleryRequest = GroupId & dataKeysGroupCreateGallery;

export type groupGalleryId = {
    /** The groupGalleryId of the Group Gallery you want to perform this action on. **[REQUIRED]** */
    groupGalleryId: string;
};

/** Information Required to request to get a group's gallerie's Images. */
export type getGroupGalleryImagesRequest = GroupId &
    groupGalleryId &
    Quantity &
    Offset & {
        /** Whether or not to include images that are approved. *[OPTIONAL]*.*/
        approved?: boolean; // TODO FIND THE DEFAULT?
    };

export type dataKeysGroupUpdateGallery = OptName &
    Description & {
        /** Whether or not the gallery is members only. *[OPTIONAL]*.*/
        membersOnly?: boolean;
        /** The roleIds that can view the gallery. *[OPTIONAL]*.*/
        roleIdsToView?: string[];
        /** The roleIds that can submit to the gallery. *[OPTIONAL]*.*/
        roleIdsToSubmit?: string[];
        /** The roleIds that can auto approve submissions to the gallery. *[OPTIONAL]*.*/
        roleIdsToAutoApprove?: string[];
        /** The roleIds that can manage the gallery. *[OPTIONAL]*.*/
        roleIdsToManage?: string[];
    };

/** Information Required to request to update a group gallery. */
export type updateGroupGalleryRequest = GroupId & groupGalleryId & OptName & Description & dataKeysGroupUpdateGallery;

/** Information Required to request to delete a group gallery. */
export type deleteGroupGalleryRequest = GroupId & groupGalleryId;

export type dataKeysAddGroupGalleryImage = {
    /** The fileId of the image you want to add to the gallery. **[REQUIRED]**.*/
    fileId: string; // TODO Research how that file ID looks like ( file_ce35d830-e20a-4df0-a6d4-5aaef4508044 )
};

/** Information Required to request to add a image to a group gallery. */
export type addGroupGalleryImagesRequest = GroupId & groupGalleryId & dataKeysAddGroupGalleryImage;

/** Information Required to request to delete a image from a group gallery. */
export type deleteGroupGalleryImagesRequest = GroupId &
    groupGalleryId & {
        /** The groupGalleryImageId of the Group Gallery Image you want to delete. **[REQUIRED]**.*/
        groupGalleryImageId: string;
    };

/** Information Required to request to get a group's invites. */
export type getGroupInvitesSentRequest = GroupId;

export type dataKeysCreateGroupInvite = {
    /** The ID of the user to invite to the group. **[REQUIRED]**.*/
    userId: string;
    /** // TODO research what this does. *[OPTIONAL]*. */
    confirmOverrideBlock?: boolean;
};

/** Information Required to request to invite a user to a group. */
export type inviteUserToGroupRequest = GroupId & dataKeysCreateGroupInvite;

/** Information Required to request to delete a group invite. */
export type deleteGroupUserInviteRequest = GroupId & UserId;

/** Information Required to request to join a group. */
export type joinGroupRequest = GroupId;

/** Information Required to request to leave a group. */
export type leaveGroupRequest = GroupId;

/** Information Required to request to get a group's members. */
export type listGroupMembersRequest = GroupId & Quantity & Offset & groupMemberSort;

/** Information Required to request to get a group's member. */
export type getGroupMemberRequest = GroupId & UserId;

export type dataKeysUpdateGroupMember = {
    /** The visibility of the member. Must be one of the following: `visible`, `hidden`, `friends`. *[OPTIONAL]*.*/
    visibility?: GroupUserVisibility;
    /** Whether or not the member is subscribed to announcements. *[OPTIONAL]*.*/
    isSubscribedToAnnouncements?: boolean;
    /** The notes about the member. *[OPTIONAL]*.*/
    managerNotes?: string;
};

/** Information Required to request to update a group's member. */
export type updateGroupMemberRequest = GroupId & UserId & dataKeysUpdateGroupMember;

/** Information Required to request to kick a user from a group. */
export type kickGroupMemberRequest = GroupId & UserId;

export type GroupRoleId = {
    /** The groupRoleId of the Group Role you want to perform this action on. **[REQUIRED]** */
    groupRoleId: string;
};

/** Information Required to request to add a role to a group member. */
export type addRoleToGroupMemberRequest = GroupId & UserId & GroupRoleId;

/** Information Required to request to remove a role from a group member. */
export type removeRoleFromGroupMemberRequest = GroupId & UserId & GroupRoleId;

/** Information Required to request to get a group's permissions. */
export type listGroupPermissionsRequest = GroupId;

/** Information Required to request to get a group's current join request. */
export type getGroupJoinRequestsRequest = GroupId;

/** Information Required to request to cancel a group's join request. */
export type cancelGroupJoinRequestRequest = GroupId;

export type dataKeysRespondGroupJoinRequest = {
    /** The action to take on the join request. Must be one of the following: `Accept`, `Deny`. **[REQUIRED]**.*/
    action: GroupInviteResponse;
};

/** Information Required to request to respond to a group's join request. */
export type respondGroupJoinrequestRequest = GroupId & UserId & dataKeysRespondGroupJoinRequest;

/** Information Required to request to get a group's roles. */
export type getGroupRolesRequest = GroupId;

export type dataKeysCreateGroupRole = ReqName &
    Description & {
        /** The id of the role to create, will not have anything beside "new" when used. */
        id: string;
        /** Whether or not the role is self assignable. Defaults to false. *[OPTIONAL]*.*/
        isSelfAssignable?: boolean;
        /** The permissions of the role. *[OPTIONAL]*.*/
        permissions?: GroupPermissionEnum[];
        /** If this role requires to be purchased. *[OPTIONAL]* Default to false. Only if you are a VRChat creator.*/
        requiresPurchase?: boolean;
    };
/** Information Required to request to create a group role. */
export type createGroupRoleRequest = GroupId & dataKeysCreateGroupRole;

export type dataKeysUpdateGroupRole = OptName &
    Description & {
        /** Whether or not the role is self assignable. *[OPTIONAL]*.*/
        isSelfAssignable?: boolean;
        /** The permissions of the role. *[OPTIONAL]*.*/
        permissions?: GroupPermissionEnum[];
        /** The order of the role in the group. *[OPTIONAL]*.*/
        order?: number;
    };
/** Information Required to request to update a group role. */
export type updateGroupRoleRequest = GroupId & GroupRoleId & dataKeysUpdateGroupRole;

/** Information Required to request to delete a group role. */
export type deleteGroupRoleRequest = GroupId & GroupRoleId;
