import {
    AllTags,
    CalendarIdType,
    FileIdType,
    GroupAnnouncementIdType,
    GroupAuditLogIdType,
    GroupGalleryIdType,
    GroupGalleryImageIdType,
    GroupIdType,
    GroupMemberIdType,
    GroupRoleIdType,
    languageTagsShort,
    LanguageTypes,
    NotificationIdType,
    UserIdType,
    WorldIdType,
} from './Generics';
import type { ProfileBannerType } from './Users';

/** Ids that appear on audit-log `targetId` depending on the event. */
export type GroupAuditTargetId =
    | `usr_${string}-${string}-${string}-${string}-${string}`
    | GroupRoleIdType
    | NotificationIdType
    | CalendarIdType
    | GroupIdType
    | GroupAnnouncementIdType
    | `${WorldIdType}:${string}`;

/** Calendar / instance event visibility. */
export type GroupEventAccessType = 'group' | 'public';

/** Live calendar payloads currently only send `event`. */
export type GroupCalendarKind = 'event';

/** Recurrence weekday codes. */
export type GroupEventRecurrenceDay = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

/** How a recurring event stops. */
export type GroupEventRecurrenceEndType = 'afterDate' | 'afterOccurrences';

/** Members-only / Group+ / Group public instance access. */
export type GroupInstanceAccessType = 'public' | 'plus' | 'members';

//! -- Group API -- !//
export type Group = {
    id: GroupIdType;
    name: string;
    shortCode: string;
    discriminator: string;
    description: string;
    iconId?: FileIdType | null;
    iconUrl?: string;
    bannerUrl?: string;
    bannerId?: FileIdType | null;
    nameplateId?: string | null;
    nameplateUrl?: string | null;
    lastPostCreatedAt?: string; // assuming date-time is a string in ISO format
    privacy: GroupPrivacy;
    ownerId: UserIdType;
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
    isRepresenting?: boolean; // new attribute
    ageVerificationSlotsAvailable?: boolean; // new attribute
    ageVerificationBetaCode?: string;
    ageVerificationBetaSlots?: number;
    allowGroupJoinPrompt?: boolean;
    transferTargetId?: UserIdType;
    storeId?: string;
};

export type LimitedGroup = {
    id: GroupIdType;
    name: string;
    shortCode: string;
    discriminator: string;
    description: string;
    iconId?: FileIdType | null;
    iconUrl?: string;
    bannerUrl?: string;
    bannerId?: FileIdType | null;
    nameplateId?: string | null;
    nameplateUrl?: string | null;
    ownerId: UserIdType;
    memberCount: number;
    tags?: AllTags[];
    createdAt?: string; // assuming date-time is a string in ISO format
    membershipStatus?: GroupMembershipStatus;
    galleries?: GroupGallery[];
    isSearchable?: boolean;
    rules?: string;
    lastPostCreatedAt?: string;
    privacy?: string;
};

export type RepresentedGroup = {
    name: string;
    shortCode: string;
    discriminator: string;
    description: string;
    iconId?: FileIdType | null;
    iconUrl?: string | null;
    bannerUrl?: string | null;
    bannerId?: FileIdType | null;
    privacy: GroupPrivacy;
    ownerId: UserIdType;
    memberCount: number;
    groupId: GroupIdType;
    memberVisibility: GroupUserVisibility;
    isRepresenting: boolean;
    /** Group nameplate inventory / file ID. */
    nameplateId?: string | null;
    /** Group nameplate image URL. */
    nameplateUrl?: string | null;
};

/**
 * Membership-oriented group returned by `GET /users/{userId}/groups`.
 * This is not a full `Group` — roles, galleries, and `myMember` are not included.
 */
export type UserGroup = {
    /** Membership row id (`gmem_…`) on `GET /users/{userId}/groups`. */
    id: GroupMemberIdType;
    groupId: GroupIdType;
    name: string;
    shortCode: string;
    discriminator: string;
    description: string;
    iconId?: FileIdType | null;
    iconUrl?: string | null;
    bannerId?: FileIdType | null;
    bannerUrl?: string | null;
    privacy: GroupPrivacy;
    ownerId: UserIdType;
    memberCount: number;
    /** Present on memberships. Invited/blocked group rows may omit it. */
    memberVisibility?: GroupUserVisibility;
    /** Present on memberships. Invited/blocked group rows may omit it. */
    mutualGroup?: boolean;
    /** Invited-group rows send this (`invited`). */
    membershipStatus?: GroupMembershipStatus | string;
    isRepresenting?: boolean;
    nameplateId?: string | null;
    nameplateUrl?: string | null;
    /** Creator Economy store ID for the group, when present. */
    storeId?: string;
    /** When the logged-in member last read a group post. Observed on self groups. */
    lastPostReadAt?: string | null;
    /** When the group's latest post was created. Can be null. */
    lastPostCreatedAt?: string | null;
};

export type GroupAudit = {
    results: {
        id: GroupAuditLogIdType;
        created_at: string;
        groupId: GroupIdType;
        actorId: UserIdType;
        actorDisplayName: string;
        targetId: GroupAuditTargetId;
        eventType: GroupAuditLogEventType;
        description: string;
        data?: GroupAuditLogData;
    }[];
    totalCount: number;
    hasNext: boolean;
};

/**
 * ## Different types of Group Audit Log Events.
 * @enum {string} **Group_Create** -> A group was created.
 * @enum {string} **Group_Update** -> A group was updated.
 * @enum {string} **Group_Announcement_Create** -> A group post was created (`group.post.create`).
 * @enum {string} **Group_Announcement_Delete** -> A group post was deleted (`group.post.delete`).
 * @enum {string} **Group_Post_Update** -> A group post was edited (`group.post.update`).
 * @enum {string} **Group_Role_Create** -> A group role was created.
 * @enum {string} **Group_Role_Update** -> A group role was updated.
 * @enum {string} **Group_Role_Delete** -> A group role was deleted.
 * @enum {string} **Group_Member_Role_Assign** -> A role was assigned to a member (`group.member.role.assign`).
 * @enum {string} **Group_Member_Role_Unassign** -> A role was unassigned from a member (`group.member.role.unassign`).
 * @enum {string} **Group_CalendarEvent_Create** -> A calendar event was created.
 * @enum {string} **Group_CalendarEvent_Delete** -> A calendar event was deleted.
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
    Group_Post_Update = 'group.post.update',
    // Role events
    Group_Role_Create = 'group.role.create',
    Group_Role_Update = 'group.role.update',
    Group_Role_Delete = 'group.role.delete',
    /** Live API string. Older docs used `group.role.assign`. */
    Group_Member_Role_Assign = 'group.member.role.assign',
    Group_Member_Role_Unassign = 'group.member.role.unassign',
    /** @deprecated Wrong API string. Use `Group_Member_Role_Assign`. */
    Group_Role_Assign = 'group.member.role.assign',
    /** @deprecated Wrong API string. Use `Group_Member_Role_Unassign`. */
    Group_Role_Unassign = 'group.member.role.unassign',
    // Calendar events
    Group_CalendarEvent_Create = 'group.calendarEvent.create',
    Group_CalendarEvent_Delete = 'group.calendarEvent.delete',
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
    Group_Instance_Close = 'group.instance.close',
}

export type GroupAuditLogDataPostCreated = {
    title: string;
    text: string;
    imageId?: FileIdType | null;
    authorId?: UserIdType;
    sendNotification?: boolean;
    roleIds?: GroupRoleIdType[];
    visibility: GroupPostVisibilityType;
};

export type GroupAuditLogDataPostDeleted = {
    title: string;
    text: string;
    imageId?: FileIdType | null;
    imageUrl?: string | null;
    authorId?: UserIdType;
    editorId?: UserIdType;
    sendNotification?: boolean; // todo, not sure yet
    roleIds?: GroupRoleIdType[];
    createdAt: string;
    updatedAt: string;
    visibility: GroupPostVisibilityType;
};

export type GroupAuditLogDataPostUpdate = {
    title?: { old: string; new: string };
    text?: { old: string; new: string };
    editorId?: { old: UserIdType | null; new: UserIdType };
    visibility?: { old: GroupPostVisibilityType; new: GroupPostVisibilityType };
};

export type GroupAuditLogDataRoleCreate = {
    groupId: GroupIdType;
    name: string;
    description: string;
    isSelfAssignable: boolean;
    requiresTwoFactor: boolean;
    requiresPurchase: boolean;
    permissions: GroupPermissionEnum[];
    isAddedOnJoin?: boolean;
    lastUpdatedByUserId?: UserIdType;
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
    isSelfAssignable?: {
        old: boolean;
        new: boolean;
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
    defaultRole?: boolean;
    isAddedOnJoin?: boolean;
    isManagementRole?: boolean;
};

export type GroupAuditLogDataMemberUpdate = {
    managerNotes?: {
        old: string;
        new: string;
    };
};

export type GroupAuditLogDataRoleAssign = {
    roleId: GroupRoleIdType;
    roleName: string;
};

export type GroupAuditLogDataRoleUnassign = {
    roleId: GroupRoleIdType;
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
        old?: FileIdType;
        new: FileIdType;
    };
    bannerId?: {
        old?: FileIdType;
        new: FileIdType;
    };
    privacy?: {
        old: GroupPrivacy;
        new: GroupPrivacy;
    };
    languages?: {
        old: languageTagsShort[];
        new: languageTagsShort[];
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
    roleIdsToView?: GroupRoleIdType[];
    roleIdsToSubmit?: GroupRoleIdType[];
    roleIdsToAutoApprove?: GroupRoleIdType[];
    roleIdsToManage?: GroupRoleIdType[];
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
    roleIdsToView?: GroupRoleIdType[];
    roleIdsToSubmit?: GroupRoleIdType[];
    roleIdsToAutoApprove?: GroupRoleIdType[];
    roleIdsToManage?: GroupRoleIdType[];
    createdAt: string;
    updatedAt: string;
};

export type GroupAuditLogDataGroupInstanceCreate = {
    groupAccessType: GroupInstanceAccessType;
    roleIds?: GroupRoleIdType[] | null;
    calendarEntryId?: string | null;
};

export type GroupAuditLogDataCalendarEventCreate = {
    accessType?: GroupEventAccessType;
    description?: string;
    imageId?: FileIdType | null;
    title?: string;
    type?: GroupCalendarKind;
};

export type GroupAuditLogDataCalendarEventDelete = {
    accessType?: GroupEventAccessType;
    category?: EventCategoryType;
    closeInstanceAfterEndMinutes?: number;
    createdAt?: string;
    deletedAt?: string | null;
    description?: string;
    durationInMs?: number;
    endsAt?: string;
    featured?: boolean;
    guestEarlyJoinMinutes?: number;
    hostEarlyJoinMinutes?: number;
    imageId?: FileIdType | null;
    interestedUserCount?: number;
    isDraft?: boolean;
    languages?: LanguageTypes[] | null;
    occurrenceKind?: GroupEventOccurrenceKind;
    occurrenceModified?: boolean | null;
    ownerId?: GroupIdType;
    platforms?: PlatformType[];
    recurrence?: GroupEventRecurrence | null;
    roleIds?: GroupRoleIdType[];
    seriesId?: CalendarIdType | null;
    shortCode?: string | null;
    startsAt?: string;
    tags?: string[];
    title?: string;
    type?: GroupCalendarKind;
    updatedAt?: string;
    usesInstanceOverflow?: boolean;
};

export type GroupAuditLogData =
    | GroupAuditLogDataPostCreated
    | GroupAuditLogDataPostDeleted
    | GroupAuditLogDataPostUpdate
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
    | GroupAuditLogDataGroupInstanceCreate
    | GroupAuditLogDataCalendarEventCreate
    | GroupAuditLogDataCalendarEventDelete;

export type GroupAnnouncement = {
    id: GroupAnnouncementIdType;
    groupId: GroupIdType;
    authorId: UserIdType;
    /** The User ID of the User who edited the post last */
    editorId?: UserIdType;
    title: string;
    text: string;
    imageId?: string | null;
    imageUrl?: string | null;
    createdAt: string;
    updatedAt: string;
    /** List of role IDs that can view the post. Will be empty when for all members OR Public visibility. */
    roleIds: GroupRoleIdType[];
};

export type GroupPost = GroupAnnouncement & {
    visibility: GroupPostVisibilityType;
};

export type GroupPostRequestResponse = {
    total: number;
    posts: GroupPost[];
};
export type BaseMyMember = {
    id: GroupMemberIdType;
    groupId: GroupIdType;
    userId: UserIdType;
    isRepresenting: boolean;
    roleIds: GroupRoleIdType[];
    mRoleIds?: GroupRoleIdType[]; // TODO: Undocumented yet!
    joinedAt: string; // assuming date-time is a string in ISO format
    membershipStatus: string;
    visibility: string;
    isSubscribedToAnnouncements: boolean; // defaults to true
    lastPostReadAt?: string; // TODO: Undocumented yet!
};

export type MyMember = BaseMyMember & {
    managerNotes?: string;
    bannedAt: string | null;
    has2FA: boolean; // Defaults to false
    permissions: GroupPermissionEnum[]; // Admins defaults to ["*"]
    hasJoinedFromPurchase?: boolean; // TODO: Undocumented yet!
    isSubscribedToEventAnnouncements?: boolean;
};

export type GroupMemberLimitedUser = {
    /** Nested user id (`usr_`), not the membership `gmem_` id. */
    id: UserIdType;
    displayName: string;
    thumbnailUrl: string | null;
    iconUrl: string;
    /** Omitted on some member-list payloads. */
    profilePicOverride?: string;
    currentAvatarThumbnailImageUrl: string | null;
    currentAvatarImageUrl?: string;
    /** Omitted on some member-list payloads. */
    currentAvatarTags?: string[];
    userIcon?: string;
    banner?: string | null;
    iconFrame?: string | null;
    nameplateEffect?: string | null;
    profileEffect?: string | null;
    bannerType?: ProfileBannerType;
    bannerColor?: string;
    bannerUrl?: string;
};

export type GroupMember = {
    id: GroupMemberIdType;
    groupId: GroupIdType;
    userId: UserIdType;
    isRepresenting: boolean;
    user?: GroupMemberLimitedUser | null;
    roleIds?: GroupRoleIdType[];
    mRoleIds?: GroupRoleIdType[];
    joinedAt?: string | null;
    membershipStatus?: GroupMembershipStatus;
    visibility?: string;
    isSubscribedToAnnouncements?: boolean;
    isSubscribedToEventAnnouncements?: boolean;
    createdAt?: string;
    bannedAt?: string;
    managerNotes?: string;
    acceptedByDisplayName?: string | null;
    acceptedById?: string | null;
    hasJoinedFromPurchase?: boolean;
    lastPostReadAt?: string;
};

/**
 *  Same as GroupMember but omitting the user object
 */
export type GroupMemberLimitedBanResult = Omit<GroupMember, 'user'>;

export type GroupRole = {
    id: GroupRoleIdType;
    groupId: GroupIdType;
    name: string;
    description: string;
    isSelfAssignable: boolean;
    permissions: GroupPermissionEnum[];
    isManagementRole: boolean;
    requiresTwoFactor: boolean;
    requiresPurchase: boolean;
    order: number;
    createdAt: string; // assuming date-time is a string in ISO format
    updatedAt?: string; // assuming date-time is a string in ISO format
    /** Present on create. Omitted on role lists from group GET / update / delete. */
    defaultRole?: boolean;
    /** The role that will be assigned to new members when they join the VRChat Group */
    isAddedOnJoin: boolean; //! new attribute
    /** Present on paid / store-linked roles. */
    productId?: string;
};

export type GroupGallery = {
    id: GroupGalleryIdType;
    name: string;
    description: string;
    membersOnly: boolean;
    roleIdsToView: GroupRoleIdType[] | null;
    roleIdsToSubmit?: GroupRoleIdType[];
    roleIdsToAutoApprove?: GroupRoleIdType[];
    roleIdsToManage?: GroupRoleIdType[];
    createdAt: string; // assuming date-time is a string in ISO format
    updatedAt: string; // assuming date-time is a string in ISO format
};

export type GroupGalleryImage = {
    id: GroupGalleryImageIdType;
    groupId: GroupIdType;
    galleryId: GroupGalleryIdType;
    fileId: FileIdType;
    imageUrl: URL;
    createdAt: string;
    submittedByUserId: UserIdType;
    approved: boolean;
    approvedByUserId: UserIdType;
    approvedAt: string;
};

export type GroupPermission = {
    allowedToAdd: boolean;
    dependsOn?: GroupPermissionEnum[];
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
    Banned = 'banned',
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
 * - **groupInstanceAgeGatedCreate** -> `Create Age Gated Instances`. Allows role to create 18+ age-gated group instances. Manage Role?: `FALSE`
 * - **groupInstanceAgeGatedJoin** -> `Join Age Gated Instances`. Kept for payloads that still send it. Not in the current `/permissions` catalog.
 * - **groupInstanceManage** -> `Manage Group Instances`. Allows role to rename or close a group instance. Manage Role?: `TRUE`
 * - **groupDefaultRoleManage** -> `Manage Group Default Role`. Allows role to manage the Everyone / default role permissions. Requires `group-roles-manage`. Manage Role?: `TRUE`
 * - **groupAnnouncementInstanceCreate** -> `Create Instance Announcement`. Allows role to send an announcement to everyone in a group instance. Manage Role?: `FALSE`
 * - **groupCalendarManage** -> `Manage Group Calendar`. Allows role to create, modify, and publish calendar entries. Manage Role?: `FALSE`
 * - **groupInstanceCalendarLink** -> `Link Instances and Events`. Allows role to create and link instances to live / soon / recently-ended events. Manage Role?: `FALSE`
 * - **groupInstanceBypassAvatarPerformance** -> `Bypass Avatar Performance Requirements`. Allows role to join performance-gated group instances regardless of avatar rating. Manage Role?: `FALSE`
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
    groupInstanceAgeGatedCreate = 'group-instance-age-gated-create',
    groupInstanceAgeGatedJoin = 'group-instance-age-gated-join',
    groupInstanceManage = 'group-instance-manage',
    groupDefaultRoleManage = 'group-default-role-manage',
    groupAnnouncementInstanceCreate = 'group-instance-announcement-create',
    groupCalendarManage = 'group-calendar-manage',
    groupInstanceCalendarLink = 'group-instance-calendar-link',
    groupInstanceBypassAvatarPerformance = 'group-instance-bypass-avatar-performance',
}

export type GroupPermissionsTags =
    | '*'
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
    | 'group-instance-join'
    | 'group-instance-age-gated-create'
    | 'group-instance-age-gated-join'
    | 'group-instance-manage'
    | 'group-default-role-manage'
    | 'group-instance-announcement-create'
    | 'group-calendar-manage'
    | 'group-instance-calendar-link'
    | 'group-instance-bypass-avatar-performance';

export enum GroupInviteResponse {
    Accept = 'accept',
    Decline = 'deny',
}

export type GroupEventBase = {
    accessType: GroupEventAccessType;
    /** The category of this event. Of Type CategoryType. */
    category: EventCategoryType;
    /** Default: 5. Search hits often omit this. */
    closeInstanceAfterEndMinutes?: number;
    createdAt?: string;
    deletedAt?: string;
    /** The description of the event. | Look out for \n for line skips */
    description: string;
    /** When the event ends. */
    endsAt: string;
    /** If an event is featured, it will be advertised by VRChat. */
    featured?: boolean;
    /** The number of minutes before the event starts that guests can join. Search hits often omit this. */
    guestEarlyJoinMinutes?: number;
    /** The number of minutes before the host can join the event. Search hits often omit this. */
    hostEarlyJoinMinutes?: number;
    /** The ID of the event. */
    id: CalendarIdType;
    /** File ID of the event image. */
    imageId?: FileIdType | null;
    /** Resolved image URL when the API sends one. */
    imageUrl?: string | null;
    /** If this event is currently only a draft. Search hits often omit this. */
    isDraft?: boolean;
    /** ISO language codes (`eng`, …). Live calendar payloads send `LanguageTypes`, not `language_*` tags. */
    languages?: LanguageTypes[] | null;
    /** Can be either a group or a user ID. If a group ID, the event is owned by a group. If a user ID, the event is owned by a user. Currently we only know about GroupID being used. */
    ownerId: GroupIdType;
    /** The platforms that are allowed to join this event. [PC_ONLY, ANDROID, IOS] */
    platforms?: PlatformType[];
    /** The Group Role IDs that are allowed to join this event. */
    roleIds?: GroupRoleIdType[];
    /** The scheduled time of this event. */
    startsAt: string;
    /** The tags of the event. Optional, can be empty. */
    tags?: string[];
    /** The title of the event. */
    title: string;
    type?: GroupCalendarKind;
    /** Last time the event was updated. Search hits often omit this. */
    updatedAt?: string;
    /** Expected to be used if attendees will overflow to another instance. Search hits often omit this. */
    usesInstanceOverflow?: boolean;
    /** Event length in milliseconds. */
    durationInMs?: number;
    /** How many users marked interest. */
    interestedUserCount?: number;
    /** `single` for a one-off event, `series` / `occurrence` for recurring. */
    occurrenceKind?: GroupEventOccurrenceKind;
    /** Recurrence spec, or null on one-off events. */
    recurrence?: GroupEventRecurrence | null;
    /** Recurring series id when this event is part of a series. */
    seriesId?: CalendarIdType | null;
};

export enum GroupEventOccurrenceKind {
    Single = 'single',
    Series = 'series',
    Occurrence = 'occurrence',
}

export enum GroupEventRecurrenceFrequency {
    Daily = 'daily',
    Weekly = 'weekly',
    Monthly = 'monthly',
    Yearly = 'yearly',
}

export type GroupEventRecurrence = {
    daysOfWeek?: GroupEventRecurrenceDay[];
    end?: {
        count?: number;
        date?: string;
        type: GroupEventRecurrenceEndType;
    };
    frequency: GroupEventRecurrenceFrequency;
    interval: number;
    timezone: string;
};

/** This type is used for Group Events specifically. when doing a GET request only, to know if a user is interested in the event. */
export type GroupEvent = GroupEventBase & {
    /** Present when the current user has interest data for this event. Omitted on create/update and some GETs. */
    userInterest?: {
        createdAt: string; // assuming date-time is a string in ISO format
        isFollowing: boolean;
        updatedAt: string; // assuming date-time is a string in ISO format
    };
};

export enum EventCategoryType {
    Music = 'music',
    Gaming = 'gaming',
    Hangout = 'hangout',
    Exploring = 'exploring',
    Avatars = 'avatars',
    FilmAndMedia = 'film_media',
    Dance = 'dance',
    Roleplaying = 'roleplaying',
    Performance = 'performance',
    Wellness = 'wellness',
    Arts = 'arts',
    Education = 'education',
    Other = 'other',
}

export enum PlatformType {
    PC_ONLY = 'standalonewindows',
    ANDROID = 'android',
    IOS = 'ios',
}

/** This type is used for Group Events specifically. Gets all the upcoming events for a group.*/
export type GroupEventList = {
    /** Whether or not there are more events to fetch. Search can omit this. */
    hasNext?: boolean;
    /** The events that are upcoming. */
    results: GroupEvent[];
    /** The total number of upcoming events. */
    totalCount: number;
};

//! -- Request Types -- !//

export type GroupId = {
    /** The groupId of the group you want to perform this action on. **[REQUIRED]**
     *
     * Example: `grp_12345678-1234-1234-1234-1234567890ab`
     */
    groupId: GroupIdType;
};

type UserId = {
    /** UserId of the User needed to perform this action on. **[REQUIRED]** */
    userId: UserIdType;
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
    iconId?: FileIdType;
    /** The BannerId of the group. *[OPTIONAL]*. */
    bannerId?: FileIdType;
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
    /** Official spec v1.21.0 extra filter. *[OPTIONAL]*. */
    purpose?: string;
};

/** Information Required to request to get a group's Audit Logs.*/
export type getGroupAuditLogsRequest = GroupId &
    Quantity &
    Offset & {
        /** The Starting date of the logs to get. *[OPTIONAL]*. */
        startDate?: string;
        /** The Ending date of the logs to get. *[OPTIONAL]*. */
        endDate?: string;
        /** Comma-separated actor user ids. *[OPTIONAL]*. */
        actorIds?: string;
        /** Comma-separated `GroupAuditLogEventType` values. *[OPTIONAL]*. */
        eventTypes?: string;
        /** Comma-separated target ids. *[OPTIONAL]*. */
        targetIds?: string;
    };

export type getGroupAuditLogTypesRequest = GroupId;

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
    roleIds?: GroupRoleIdType[];
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
    imageId?: string; //! Potentially a FileIdType
    /** Whether or not to send a notification to all group members. Defaults to true. *[OPTIONAL]*.*/
    sendNotification?: boolean;
};

export type dataKeysCreateGroupPostPlus = dataKeyCreatePost &
    extraCreateGroupPostTextRequest & {
        /** The visibility of the post. If the Post is either for members only or for specific roles, it NEEDS to be set to Group.*/
        visibility: GroupPostVisibilityType;
        roleIds?: GroupRoleIdType[];
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
    postId: NotificationIdType;
};

/** Information Required to request to get a group's banned users. */
export type getBannedUsersRequest = GroupId & Quantity & Offset;

export type dataKeysGroupBanMember = {
    /** The ID of the user to ban. **[REQUIRED]**.*/
    userId: UserIdType;
};

/** Information Required to request to ban a user from a group. */
export type banGroupMemberRequest = GroupId & dataKeysGroupBanMember;

/** Information Required to request to unban a user from a group. */
export type unbanGroupMemberRequest = GroupId & UserId;

export type roleData = {
    /** The roleIds that can view the gallery. *[OPTIONAL]*.*/
    roleIdsToView?: GroupRoleIdType[];
    /** The roleIds that can submit to the gallery. *[OPTIONAL]*.*/
    roleIdsToSubmit?: GroupRoleIdType[];
    /** The roleIds that can auto approve submissions to the gallery. *[OPTIONAL]*.*/
    roleIdsToAutoApprove?: GroupRoleIdType[];
    /** The roleIds that can manage the gallery. *[OPTIONAL]*.*/
    roleIdsToManage?: GroupRoleIdType[];
};

export type dataKeysGroupCreateGallery = ReqName &
    Description &
    roleData & {
        /** Whether or not the gallery is members only. Defaults to false. *[OPTIONAL]*.*/
        membersOnly?: boolean;
    };

/** Information Required to request to create a group gallery. */
export type createGroupGalleryRequest = GroupId & dataKeysGroupCreateGallery;

export type groupGalleryId = {
    /** The groupGalleryId of the Group Gallery you want to perform this action on. **[REQUIRED]** */
    groupGalleryId: GroupGalleryIdType;
};

/** Information Required to request to get a group's gallerie's Images. */
export type getGroupGalleryImagesRequest = GroupId &
    groupGalleryId &
    Quantity &
    Offset & {
        /** Whether or not to include images that are approved. *[OPTIONAL]*.*/
        approved?: boolean; // TODO FIND THE DEFAULT?
        /** Official spec v1.21.0: `v=2` wraps images in a paginated object. *[OPTIONAL]*. */
        v?: number;
    };

export type dataKeysGroupUpdateGallery = OptName &
    Description &
    roleData & {
        /** Whether or not the gallery is members only. *[OPTIONAL]*.*/
        membersOnly?: boolean;
    };

/** Information Required to request to update a group gallery. */
export type updateGroupGalleryRequest = GroupId & groupGalleryId & OptName & Description & dataKeysGroupUpdateGallery;

/** Information Required to request to delete a group gallery. */
export type deleteGroupGalleryRequest = GroupId & groupGalleryId;

export type dataKeysAddGroupGalleryImage = {
    /** The fileId of the image you want to add to the gallery. **[REQUIRED]**.*/
    fileId: FileIdType;
};

/** Information Required to request to add a image to a group gallery. */
export type addGroupGalleryImagesRequest = GroupId & groupGalleryId & dataKeysAddGroupGalleryImage;

/** Information Required to request to delete a image from a group gallery. */
export type deleteGroupGalleryImagesRequest = GroupId &
    groupGalleryId & {
        /** The groupGalleryImageId of the Group Gallery Image you want to delete. **[REQUIRED]**.*/
        groupGalleryImageId: GroupGalleryImageIdType;
    };

/** Information Required to request to get a group's invites. */
export type getGroupInvitesSentRequest = GroupId;

export type dataKeysCreateGroupInvite = {
    /** The ID of the user to invite to the group. **[REQUIRED]**.*/
    userId: UserIdType;
    /** // TODO research what this does. *[OPTIONAL]*. */
    confirmOverrideBlock?: boolean;
};

/** Information Required to request to invite a user to a group. */
export type inviteUserToGroupRequest = GroupId & dataKeysCreateGroupInvite;

/** Information Required to request to delete a group invite. */
export type deleteGroupUserInviteRequest = GroupId & UserId;

/** Information Required to request to join a group. */
export type joinGroupRequest = GroupId & {
    /** Invite used when joining from a group invite. */
    inviteId?: string;
};

export type dataKeysJoinGroup = {
    inviteId?: string;
};

/** Information Required to request to leave a group. */
export type leaveGroupRequest = GroupId;

/** Information Required to request to get a group's members. */
export type listGroupMembersRequest = GroupId &
    Quantity &
    Offset &
    groupMemberSort & {
        roleId?: GroupRoleIdType;
    };

/** Information Required to request to get a group's member. */
export type getGroupMemberRequest = GroupId & UserId;

export type dataKeysUpdateGroupMember = {
    /** The visibility of the member. Must be one of the following: `visible`, `hidden`, `friends`. *[OPTIONAL]*.*/
    visibility?: GroupUserVisibility;
    /** Whether or not the member is subscribed to announcements. *[OPTIONAL]*.*/
    isSubscribedToAnnouncements?: boolean;
    /** Whether or not the member is subscribed to event announcements. *[OPTIONAL]*.*/
    isSubscribedToEventAnnouncements?: boolean;
    /** The notes about the member. *[OPTIONAL]*.*/
    managerNotes?: string;
};

/** Information Required to request to update a group's member. */
export type updateGroupMemberRequest = GroupId & UserId & dataKeysUpdateGroupMember;

/** Information Required to request to kick a user from a group. */
export type kickGroupMemberRequest = GroupId & UserId;

export type GroupRoleId = {
    /** The groupRoleId of the Group Role you want to perform this action on. **[REQUIRED]** */
    groupRoleId: GroupRoleIdType;
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

/** Information Required to get all the group instances. */
export type getGroupInstancesRequest = GroupId;

/** Data Keys Required to edit a group's post. */
export type dataKeysEditGroupPost = {
    title?: string;
    text?: string;
    imageId?: FileIdType;
    sendNotification?: boolean;
    roleIds?: GroupRoleIdType[];
    visibility?: GroupPostVisibilityType;
};

/** Information Required to edit a group's post. */
export type editGroupPostRequest = GroupId & {
    notificationId: NotificationIdType;
} & dataKeysEditGroupPost;

export type EventId = {
    /**
     * The Event ID to use for the request.
     * Example: `cal_12345678-1234-1234-1234-1234567890ab`
     */
    eventId: CalendarIdType;
};

export type dataKeyCreateGroupEventRequest = {
    accessType: GroupEventAccessType;
    category: EventCategoryType;
    closeInstanceAfterEndMinutes: number;
    description: string;
    endsAt: string;
    featured: boolean;
    guestEarlyJoinMinutes: number;
    hostEarlyJoinMinutes: number;
    imageId: FileIdType | null;
    isDraft: boolean;
    /** The languages of the event. See LanguageTypes for possible values. Maximum of 3 languages. *[OPTIONAL]*.*/
    languages: [LanguageTypes?, LanguageTypes?, LanguageTypes?];
    /** The parentId of the event. We don't know what this is for yet, will always be set to null for now.*/
    parentId: string | null;
    /** The platforms of the event. See PlatformType for possible values. **[REQUIRED]**. Can be empty.*/
    platforms: PlatformType[];
    /** The roleIds of the event. **[REQUIRED]**. Can be empty.*/
    roleIds: GroupRoleIdType[];
    /** Whether or not to send a notification to all group members. Defaults to true. *[OPTIONAL]*.*/
    sendCreationNotification: boolean;
    startsAt: string;
    /** The tags of the event. See AllTags for possible values. Maximum of 5 tags. *[OPTIONAL]*.*/
    tags: [string?, string?, string?, string?, string?];
    title: string;
    /** Whether or not to use instance overflow. Defaults to true. We can't control this yet tho. *[OPTIONAL]*.*/
    useInstanceOverflow: boolean;
};
/** Information Required to request to create a group's event. */
export type createGroupEventRequest = GroupId & {
    /** The category of the event. See EventCategoryType for possible values. **[REQUIRED]**.*/
    category: EventCategoryType;
    /** The description of the event. *[OPTIONAL]*.*/
    description: string;
    /** The end date of the event. **[REQUIRED]**.*/
    endsAt: string;
    /** The languages of the event. See LanguageTypes for possible values. Maximum of 3 languages. *[OPTIONAL]*.*/
    languages: [LanguageTypes?, LanguageTypes?, LanguageTypes?];
    /** The platforms of the event. See PlatformType for possible values. **[REQUIRED]**. Can be empty.*/
    platforms: PlatformType[];
    /** The roleIds of the event. **[REQUIRED]**. Can be empty.*/
    roleIds: GroupRoleIdType[];
    /** The start date of the event. **[REQUIRED]**.*/
    startsAt: string;
    /** The title of the event. **[REQUIRED]**.*/
    title: string;
    /** The tags of the event. Completely Customizable. Maximum of 5 tags. *[OPTIONAL]*. Can be empty.*/
    tags: [string?, string?, string?, string?, string?];
    /** Whether or not to send a notification to all group members. Defaults to true. *[OPTIONAL]*.*/
    sendCreationNotification: boolean;
};

/** Data Keys Required to edit a group's event. */
export type dataKeysEditGroupEvent = {
    /** The platforms of the event. See PlatformType for possible values. **[REQUIRED]**.*/
    platforms: PlatformType[];
    /** The roleIds of the event. **[REQUIRED]**. If the same as before, you need to send the same roleIds.*/
    roleIds: GroupRoleIdType[];
    /** The category of the event. See CategoryType for possible values. **[REQUIRED]**.*/
    category?: EventCategoryType;
    /** The description of the event. *[OPTIONAL]*.*/
    description?: string;
    /** The name of the event. **[REQUIRED]**.*/
    title?: string;
    /** The start date of the event. **[REQUIRED]**.*/
    startsAt?: string;
    /** The end date of the event. **[REQUIRED]**.*/
    endsAt?: string;
    /** The language of the event. See LanguageTags for possible values. *[OPTIONAL]*.*/
    languages?: LanguageTypes[];
    /** The tags of the event. Completely Customizable. Maximum of 5 tags. *[OPTIONAL]*. Can be empty.*/
    tags?: [string?, string?, string?, string?, string?];
};

export type updateGroupEventRequest = dataKeysEditGroupEvent & GroupId & EventId;
export type deleteGroupEventRequest = GroupId & EventId;
export type getGroupEventRequest = GroupId & EventId;
export type getGroupEventListRequest = GroupId &
    Quantity &
    Offset &
    CalendarMonthDate & {
        after?: string;
        limit?: number;
        sort?: string;
    };

export type groupEventNextRequest = GroupId;
export type dataKeyGetNextGroupEventRequest = GroupId;
export type dataKeyFollowGroupEventRequest = {
    /** Whether or not to follow the event. **[REQUIRED]**. Default is true if not provided.*/
    isFollowing: boolean;
};
export type followGroupEventRequest = GroupId & EventId & dataKeyFollowGroupEventRequest;

/** Month filter for calendar list endpoints (`?date=`). */
export type CalendarMonthDate = {
    /** Month to search. ISO date-time. *[OPTIONAL]*. */
    date?: string;
};

/** How discovery picks events. */
export enum CalendarEventDiscoveryScope {
    All = 'all',
    Live = 'live',
    Upcoming = 'upcoming',
}

/** Include / exclude / skip a discovery slice. */
export enum CalendarEventDiscoveryInclusion {
    Exclude = 'exclude',
    Include = 'include',
    Skip = 'skip',
}

/** Information required to list calendar events the current user is following. */
export type getFollowedCalendarEventsRequest = Quantity & Offset & CalendarMonthDate;

/** Information required to list the current user's calendar events for a month. */
export type getCalendarEventsRequest = Quantity & Offset & CalendarMonthDate;

/** Information required to list featured calendar events. */
export type getFeaturedCalendarEventsRequest = Quantity & Offset & CalendarMonthDate;

/** Information required to search calendar events. */
export type searchCalendarEventsRequest = Quantity & Offset & {
    /** Search term. **[REQUIRED]**. */
    searchTerm: string;
    /** Client UTC offset in hours, -12 to 12. *[OPTIONAL]*. */
    utcOffset?: number;
};

/** Information required to discover calendar events. */
export type discoverCalendarEventsRequest = Quantity & {
    scope?: CalendarEventDiscoveryScope;
    /** Comma-separated categories. */
    categories?: string;
    /** Comma-separated tags. */
    tags?: string;
    featuredResults?: CalendarEventDiscoveryInclusion;
    nonFeaturedResults?: CalendarEventDiscoveryInclusion;
    personalizedResults?: CalendarEventDiscoveryInclusion;
    minimumInterestCount?: number;
    minimumRemainingMinutes?: number;
    upcomingOffsetMinutes?: number;
    nextCursor?: string;
};

/** Cursor-paginated discovery list. `hasNext` / `totalCount` are not used here. */
export type CalendarEventDiscovery = {
    nextCursor?: string | null;
    results: GroupEvent[];
};

/** Information required to download an event as ICS. */
export type getGroupCalendarEventIcsRequest = GroupId & EventId;
