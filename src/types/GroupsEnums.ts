export enum GroupMembershipStatus {
    Inactive = 'inactive',
    Member = 'member',
    Requested = 'requested',
    Invited = 'invited',
}

export enum GroupPrivacy {
    Default = 'default',
    Private = 'private',
}

export enum GroupJoinState {
    Open = 'open',
    Closed = 'closed',
    Invite = 'invite',
    Request = 'request',
}

export enum GroupRoleTemplate {
    Default = "default",
    Managed_free = "managedFree",
    Managed_Invite = "managedInvite",
    Managed_Request = "managedRequest"

}

export enum GroupUserVisibility {
    Visible = 'visible',
    Hidden = 'hidden',
    Friends = 'friends',
}