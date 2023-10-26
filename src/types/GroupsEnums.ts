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
    Request = 'request',
    Invite = 'invite',
    Closed = 'closed',
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