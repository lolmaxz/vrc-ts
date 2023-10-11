import { VRCWrapper } from "../VRCWrapper";
import { BaseApi } from "./BaseApi";


export class GroupApi extends BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    // Creates a Group and returns a Group object. Requires VRC+ Subscription.
    public createGroup() {

    }

    // Returns a single Group by ID.
    public getGroupbyID() {

    }

    // Updates a Group and returns it.
    public updateGroup() {

    }

    // Deletes a Group.
    public deleteGroup() {

    }

    // Returns the announcement for a Group. If no announcement has been made, then it returns empty object.
    // If an announcement exists, then it will always return all fields except imageId and imageUrl which may be null.
    public getGroupAnnouncement() {

    }

    // Creates an Announcement for a Group.
    public createGroupAnnouncement() {

    }

    // Deletes the announcement for a Group.
    public deleteGroupAnnouncement() {

    }

    // Returns a list of audit logs for a Group.
    public getGroupAuditLogs() {

    }

    // Returns a list of banned users for a Group.
    public getGroupBans() {

    }

    // Bans a user from a Group.
    public banGroupMember() {

    }

    // Unbans a user from a Group.
    public unbanGroupMember() {

    }

    // Creates a gallery for a Group.
    public createGroupGallery() {

    }

    // Returns a list of images for a Group gallery.
    public getGroupGalleryImages() {

    }

    // Updates a gallery for a Group.
    public updateGroupGallery() {

    }

    // Deletes a gallery for a Group.
    public deleteGroupGallery() {

    }

    // Adds an image to a Group gallery.
    public addGroupGalleryImage() {

    }

    // Deletes an image from a Group gallery.
    public deleteGroupGalleryImage() {

    }

    // Returns a list of members that have been invited to the Group.
    public getGroupInvitesSent() {

    }

    // Sends an invite to a user to join the group.
    public inviteUsertoGroup() {

    }

    // Deletes an Group invite sent to a User
    public deleteUserInvite() {

    }

    // Join a Group by ID and returns the member object.
    public joinGroup() {

    }

    // Leave a group by ID.
    public leaveGroup() {

    }

    // Returns a List of all other Group Members. This endpoint will never return the user calling the endpoint.
    // Information about the user calling the endpoint must be found in the myMember field of the Group object.
    public listGroupMembers() {

    }

    // Returns a LimitedGroup Member.
    public getGroupMember() {

    }

    // Updates a Group Member
    public updateGroupMember() {

    }

    // Kicks a Group Member from the Group. The current user must have the "Remove Group Members" permission.
    public kickGroupMember() {

    }

    // Adds a Role to a Group Member
    public addRoleToGroupMember() {

    }

    // Removes a Role from a Group Member
    public removeRoleFromGroupMember() {

    }

    // Returns a List of all possible/available permissions for a Group.
    public listGroupPermissions() {

    }

    // Returns a list of members that have requested to join the Group.
    public getGroupJoinRequests() {

    }

    // Cancels a request sent to join the group.
    public cancelGroupJoinRequest() {

    }

    // Responds to a Group Join Request with Accept/Deny
    public respondGroupJoinrequest() {

    }

    // Returns a Group Role by ID.
    public getGroupRoles() {

    }

    // Create a Group role.
    public createGroupRole() {

    }

    // Updates a group role by ID.
    public updateGroupRole() {

    }

    // Deletes a Group Role by ID and returns the remaining roles.
    public deleteGroupRole() {

    }


}