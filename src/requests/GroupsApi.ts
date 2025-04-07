import { BadRequestParameter } from '../errors';
import { replaceSpecialCharactersVRC } from '../tools';
import { ApiPaths } from '../types/ApiPaths';
import { RequestSuccess, executeRequestType } from '../types/Generics';
import * as Group from '../types/Groups';
import * as Inst from '../types/Instances';
import { VRChatAPI } from '../VRChatAPI';
import { BaseApi } from './BaseApi';

/**
 * This class is used to make requests to the Groups API.
 */
export class GroupsApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    /**
     * Returns a list of Groups.
     * @param searchGroupRequest - { n, offset, query }
     * @returns A list of Groups.
     */
    public async searchGroups({ n, offset, query }: Group.searchGroupRequest): Promise<Group.LimitedGroup[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (n) {
            if (!(n >= 1 && n <= 100)) throw new BadRequestParameter('n must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset && offset >= 0) parameters.append('offset', offset.toString());
        if (query) parameters.append('query', query);

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.searchGroups,
            pathFormated: ApiPaths.groups.searchGroups.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<Group.LimitedGroup[]>(paramRequest);
    }
    /**
     * Creates a Group and returns a Group object. Requires VRC+ Subscription.
     *
     * **YOU MUST HAVE VRC+ SUBSCRIPTION TO USE THIS METHOD!**
     *
     * Not giving a description will result in a random one given to you by VRChat!
     *
     * @param createGroupRequest - { name, shortCode, roleTemplate, description, joinState, iconId, bannerId, privacy }
     * @returns {Group.Group} The Group object of the created group.
     */
    public async createGroup({
        name,
        shortCode,
        roleTemplate,
        description,
        joinState,
        iconId,
        bannerId,
        privacy,
    }: Group.createGroupRequest): Promise<Group.Group> {
        if (name.length < 3 || shortCode.length > 64)
            throw new BadRequestParameter('Name must be between 3 and 64 characters!');
        // Making sure group name is going to be valid when sent to the VRChat API.
        name = replaceSpecialCharactersVRC(name);

        if (shortCode.length < 3 || shortCode.length > 6)
            throw new BadRequestParameter('ShortCode must be between 3 and 64 characters!');

        const body: Group.createGroupRequest = {
            name,
            shortCode,
            roleTemplate,
        };

        if (description) {
            if (description.length > 250 || description.length < 0)
                throw new BadRequestParameter('Description must be between 0 and 250 characters!');
            body.description = description;
        }

        if (joinState) body.joinState = joinState;
        if (iconId) body.iconId = iconId;
        if (bannerId) body.bannerId = bannerId;
        if (privacy) body.privacy = privacy;

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.createGroup,
            pathFormated: ApiPaths.groups.createGroup.path,
            body: body,
        };

        return await this.executeRequest<Group.Group>(paramRequest);
    }

    /**
     * Returns a single Group by ID.
     * @param getGroupByIdRequest - { groupId, includeRoles }
     * @returns {Group.Group} The Group object of the requested group.
     */
    public async getGroupbyID({ groupId, includeRoles = false }: Group.getGroupByIdRequest): Promise<Group.Group> {
        const parameters: URLSearchParams = new URLSearchParams();

        parameters.append('includeRoles', includeRoles.toString());

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupById,
            pathFormated: ApiPaths.groups.getGroupById.path.replace('{groupId}', groupId),
            queryOptions: parameters,
        };

        return await this.executeRequest<Group.Group>(paramRequest);
    }

    /**
     * Updates a Group and returns it.
     * @param updateGroupRequest - { groupId, name, shortCode, description, joinState, iconId, bannerId, languages, links, rules, tags }
     * @returns {Group.Group} The Group object of the updated group.
     */
    public async updateGroup({
        groupId,
        name,
        shortCode,
        description,
        joinState,
        iconId,
        bannerId,
        languages,
        links,
        rules,
        tags,
    }: Group.updateGroupRequest): Promise<Group.Group> {
        // at least one parameter of the data must be present to continue
        if (
            !name &&
            !shortCode &&
            !description &&
            !joinState &&
            !iconId &&
            !bannerId &&
            !languages &&
            !links &&
            !rules
        ) {
            throw new Error('At least one parameter of the data must be present to continue!');
        }

        const body: Group.dataKeysUpdateGroup = {};

        if (name) {
            if (name.length < 3 || name.length > 64)
                throw new BadRequestParameter('Name must be between 3 and 64 characters!');
            body.name = name;
        }

        if (shortCode) {
            if (shortCode.length < 3 || shortCode.length > 6)
                throw new BadRequestParameter('ShortCode must be between 3 and 64 characters!');
            body.shortCode = shortCode;
        }

        if (description) {
            if (description.length < 0 || description.length > 250)
                throw new BadRequestParameter('Description must be between 0 and 250 characters!');
            body.description = description;
        }

        if (joinState) body.joinState = joinState;
        if (iconId) body.iconId = iconId;
        if (bannerId) body.bannerId = bannerId;
        if (languages && languages.length > 0) body.languages = languages;
        if (links && links.length > 0) body.links = links;
        if (tags && tags.length > 0) body.tags = tags;

        if (rules) {
            if (rules.length > 2048) new BadRequestParameter('Rules must be a maximum of 2048 characters!');
            body.rules = rules;
        }

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.updateGroup,
            pathFormated: ApiPaths.groups.updateGroup.path.replace('{groupId}', groupId),
            body: body,
        };

        return await this.executeRequest<Group.Group>(paramRequest);
    }

    /**
     * Deletes a Group. **BE CAREFUL WITH THAT, THERE IS NO GOING BACK.**
     * @param deleteGroupRequest - { groupId }
     * @returns A RequestSuccess object.
     */
    public async deleteGroup({ groupId }: Group.deleteGroupRequest): Promise<RequestSuccess> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroup,
            pathFormated: ApiPaths.groups.deleteGroup.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<RequestSuccess>(paramRequest);
    }

    /**
     *  Returns the announcement for a Group. If no announcement has been made, then it returns empty object.
     *
     *  If an announcement exists, then it will always return all fields except imageId and imageUrl which may be null.
     *
     * @param {Group.getGroupAnnouncementRequest} { groupId } - The id of the group to get the announcement for.
     * @returns {Group.GroupAnnouncement} The GroupAnnouncement object of the requested announcement.
     * @deprecated ⚠️ This endpoint is deprecated and will be removed in the future.
     */
    public async getGroupAnnouncement({
        groupId,
    }: Group.getGroupAnnouncementRequest): Promise<Group.GroupAnnouncement | object> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupAnnouncement,
            pathFormated: ApiPaths.groups.getGroupAnnouncement.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<Group.GroupAnnouncement>(paramRequest);
    }

    /**
     * Creates an Announcement for a Group.
     * @param createGroupAnnouncementRequest - { groupId, title, text, imageId, sendNotification }
     * @returns {Group.GroupAnnouncement} The GroupAnnouncement object of the created announcement.
     * @deprecated ⚠️ This endpoint is deprecated and will be removed in the future.
     */
    public async createGroupAnnouncement({
        groupId,
        title,
        text,
        imageId,
        sendNotification = true,
    }: Group.createGroupAnnouncementRequest): Promise<Group.GroupAnnouncement> {
        // check parameters
        if (title.length < 1) new BadRequestParameter('Title must be at least 1 character!');
        if (text.length < 1) new BadRequestParameter('Text must be at least 1 character!');

        const body: Group.dataKeysCreateGroupAnnouncement = {
            title,
            text,
            sendNotification,
        };

        if (imageId) body.imageId = imageId;

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.createGroupAnnouncement,
            pathFormated: ApiPaths.groups.createGroupAnnouncement.path.replace('{groupId}', groupId),
            body: body,
        };

        return await this.executeRequest<Group.GroupAnnouncement>(paramRequest);
    }

    /**
     * Deletes the announcement for a Group.
     * @param deleteGroupAnnouncementRequest - { groupId }
     * @returns A RequestSuccess object.
     * @deprecated ⚠️ This endpoint is deprecated and will be removed in the future.
     */
    public async deleteGroupAnnouncement({ groupId }: Group.deleteGroupAnnouncementRequest): Promise<RequestSuccess> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroupAnnouncement,
            pathFormated: ApiPaths.groups.deleteGroupAnnouncement.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<RequestSuccess>(paramRequest);
    }

    /**
     *  Returns the Posts for a Group. If no Post has been made, then it returns an object with the total of posts and an empty array.
     *
     *  The Total will always be the same no matter the offset.
     *
     * @param getGroupPostRequest - { groupId, n, offset, publicOnly }
     * @returns {Group.GroupAnnouncement} The GroupAnnouncement object of the requested announcement.
     */
    public async getGroupPosts({
        groupId,
        n,
        offset,
        publicOnly = false,
    }: Group.getGroupPostsRequest): Promise<Group.GroupPostRequestResponse> {
        const body: Group.dataKeysGetGroupPosts = {
            n,
            offset,
            publicOnly,
        };

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupPosts,
            pathFormated: ApiPaths.groups.getGroupPosts.path.replace('{groupId}', groupId),
            body: body,
        };

        return await this.executeRequest<Group.GroupPostRequestResponse>(paramRequest);
    }

    /**
     * Creates a Post for a Group.
     * @param createGroupPostRequest - { groupId, title, text, imageId, sendNotification, visibility, roleIds }
     * @returns {Group.GroupPost} The GroupPost object of the created post.
     */
    public async createGroupPost({
        groupId,
        title,
        content,
        visibility,
        imageId,
        sendNotification = true,
        roleIds,
    }: Group.createGroupPostRequest): Promise<Group.GroupPost> {
        // check parameters
        if (title.length < 1) new BadRequestParameter('Title must be at least 1 character!');
        if (content.length < 1) new BadRequestParameter('Text must be at least 1 character!');

        const text = content;
        const body: Group.dataKeysCreateGroupPostPlus = {
            title,
            text,
            sendNotification,
            visibility,
            roleIds: [],
        };

        if (roleIds) {
            if (visibility == Group.GroupPostVisibilityType.Public && roleIds.length > 0) {
                console.log('Warning: RoleIds will be ignored when visibility is set to Public!');
            } else {
                body.roleIds = roleIds;
            }
        }

        if (imageId) body.imageId = imageId;

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.createGroupPost,
            pathFormated: ApiPaths.groups.createGroupPost.path.replace('{groupId}', groupId),
            body: body,
        };

        return await this.executeRequest<Group.GroupPost>(paramRequest);
    }

    /**
     * Deletes the announcement for a Group.
     * @param deleteGroupPostRequest - { groupId , postId }
     * @returns A RequestSuccess object.
     */
    public async deleteGroupPost({ groupId, postId }: Group.deleteGroupPostRequest): Promise<RequestSuccess> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroupPost,
            pathFormated: ApiPaths.groups.deleteGroupPost.path
                .replace('{groupId}', groupId)
                .replace('{postId}', postId),
        };

        return await this.executeRequest<RequestSuccess>(paramRequest);
    }

    /**
     * Returns a list of audit logs for a Group.
     * @param getGroupAuditLogsRequest - { groupId, n, offset, startDate, endDate }
     * @returns A list of audit logs for the Group.
     */
    public async getGroupAuditLogs({
        groupId,
        n,
        offset,
        startDate,
        endDate,
    }: Group.getGroupAuditLogsRequest): Promise<Group.GroupAudit> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (n) {
            if (!(n >= 1 && n <= 100)) throw new BadRequestParameter('n must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset && offset >= 0) parameters.append('offset', offset.toString());
        if (startDate) parameters.append('startDate', startDate);
        if (endDate) parameters.append('endDate', endDate);

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupAuditLogs,
            pathFormated: ApiPaths.groups.getGroupAuditLogs.path.replace('{groupId}', groupId),
            queryOptions: parameters,
        };

        return await this.executeRequest<Group.GroupAudit>(paramRequest);
    }

    /**
     * Returns a list of banned users for a Group.
     * @param getBannedUsersRequest - { groupId, n, offset }
     * @returns A list of banned users for the Group.
     */
    public async getGroupBans({ groupId, n, offset }: Group.getBannedUsersRequest): Promise<Group.GroupMember[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        // check parameters
        if (n) {
            if (!(n >= 1 && n <= 100)) throw new BadRequestParameter('n must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset && offset >= 0) parameters.append('offset', offset.toString());

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupBans,
            pathFormated: ApiPaths.groups.getGroupBans.path.replace('{groupId}', groupId),
            queryOptions: parameters,
        };

        return await this.executeRequest<Group.GroupMember[]>(paramRequest);
    }

    /**
     * Bans a user from a Group.
     * @param banGroupMemberRequest - { groupId, userId }
     * @returns The GroupMember object of the banned user.
     */
    //! I'm scared this might not be the right type! (docs says list of members, but that doesn't make sense..)
    public async banGroupMember({
        groupId,
        userId,
    }: Group.banGroupMemberRequest): Promise<Group.GroupMemberLimitedBanResult> {
        if (userId.length <= 0) new BadRequestParameter('userId is too short!');

        const body: Group.dataKeysGroupBanMember = { userId };

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.banGroupMember,
            pathFormated: ApiPaths.groups.banGroupMember.path.replace('{groupId}', groupId),
            body: body,
        };

        return await this.executeRequest<Group.GroupMemberLimitedBanResult>(paramRequest);
    }

    /**
     * Unbans a user from a Group.
     * @param unbanGroupMemberRequest - { groupId, userId }
     * @returns The GroupMember object of the unbanned user.
     */
    //! Same here
    public async unbanGroupMember({ groupId, userId }: Group.unbanGroupMemberRequest): Promise<Group.GroupMember> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.unbanGroupMember,
            pathFormated: ApiPaths.groups.unbanGroupMember.path
                .replace('{groupId}', groupId)
                .replace('{userId}', userId),
        };

        return await this.executeRequest<Group.GroupMember>(paramRequest);
    }

    /**
     * Creates a gallery for a Group.
     * @param createGroupGalleryRequest - { groupId, name, description, membersOnly, roleIdsToView, roleIdsToSubmit, roleIdsToAutoApprove, roleIdsToManage }
     * @returns A GroupGallery object.
     */
    public async createGroupGallery({
        groupId,
        name,
        description,
        membersOnly,
        roleIdsToView,
        roleIdsToSubmit,
        roleIdsToAutoApprove,
        roleIdsToManage,
    }: Group.createGroupGalleryRequest): Promise<Group.GroupGallery> {
        if (name.length < 1) new BadRequestParameter('Name must be at least 1 character!');

        const body: Group.dataKeysGroupCreateGallery = { name };

        if (description && description.length >= 0) body.description = description;
        if (membersOnly) body.membersOnly = membersOnly;
        if (roleIdsToView) body.roleIdsToView = roleIdsToView;
        if (roleIdsToSubmit) body.roleIdsToSubmit = roleIdsToSubmit;
        if (roleIdsToAutoApprove) body.roleIdsToAutoApprove = roleIdsToAutoApprove;
        if (roleIdsToManage) body.roleIdsToManage = roleIdsToManage;

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.createGroupGallery,
            pathFormated: ApiPaths.groups.createGroupGallery.path.replace('{groupId}', groupId),
            body: body,
        };

        return await this.executeRequest<Group.GroupGallery>(paramRequest);
    }

    /**
     * Returns a list of images for a Group gallery.
     * @param getGroupGalleryImagesRequest - { groupId, groupGalleryId, n, offset, approved }
     * @returns
     */
    public async getGroupGalleryImages({
        groupId,
        groupGalleryId,
        n,
        offset,
        approved,
    }: Group.getGroupGalleryImagesRequest): Promise<Group.GroupGalleryImage[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        // check parameters
        if (n) {
            if (!(n >= 1 && n <= 100)) throw new BadRequestParameter('n must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset && offset >= 0) parameters.append('offset', offset.toString());
        if (approved) parameters.append('approved', approved.toString());

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupGalleryImages,
            pathFormated: ApiPaths.groups.getGroupGalleryImages.path
                .replace('{groupId}', groupId)
                .replace('{groupGalleryId}', groupGalleryId),
            queryOptions: parameters,
        };

        return await this.executeRequest<Group.GroupGalleryImage[]>(paramRequest);
    }

    /**
     * Updates a gallery for a Group.
     * @param updateGroupGalleryRequest - { groupId, groupGalleryId, name, description, membersOnly, roleIdsToView, roleIdsToSubmit, roleIdsToAutoApprove, roleIdsToManage }
     * @returns
     */
    public async updateGroupGallery({
        groupId,
        groupGalleryId,
        name,
        description,
        membersOnly,
        roleIdsToView,
        roleIdsToSubmit,
        roleIdsToAutoApprove,
        roleIdsToManage,
    }: Group.updateGroupGalleryRequest): Promise<Group.GroupGallery> {
        if (name && name.length < 1) new BadRequestParameter('Name must be at least 1 character!');

        const body: Group.dataKeysGroupUpdateGallery = { name };

        if (description && description.length >= 0) {
            body.description = description;
        }

        if (membersOnly) body.membersOnly = membersOnly;
        if (roleIdsToView) body.roleIdsToView = roleIdsToView;
        if (roleIdsToSubmit) body.roleIdsToSubmit = roleIdsToSubmit;
        if (roleIdsToAutoApprove) body.roleIdsToAutoApprove = roleIdsToAutoApprove;
        if (roleIdsToManage) body.roleIdsToManage = roleIdsToManage;

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.updateGroupGallery,
            pathFormated: ApiPaths.groups.updateGroupGallery.path
                .replace('{groupId}', groupId)
                .replace('{groupGalleryId}', groupGalleryId),
            body: body,
        };

        return await this.executeRequest<Group.GroupGallery>(paramRequest);
    }

    /**
     * Deletes a gallery for a Group.
     * @param deleteGroupGalleryRequest - { groupId, groupGalleryId }
     * @returns
     */
    public async deleteGroupGallery({
        groupId,
        groupGalleryId,
    }: Group.deleteGroupGalleryRequest): Promise<RequestSuccess> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroupGallery,
            pathFormated: ApiPaths.groups.deleteGroupGallery.path
                .replace('{groupId}', groupId)
                .replace('{groupGalleryId}', groupGalleryId),
        };

        return await this.executeRequest<RequestSuccess>(paramRequest);
    }

    /**
     * Adds an image to a Group gallery.
     * @param addGroupGalleryImagesRequest - { groupId, groupGalleryId, fileId }
     * @returns
     */
    public async addGroupGalleryImage({
        groupId,
        groupGalleryId,
        fileId,
    }: Group.addGroupGalleryImagesRequest): Promise<Group.GroupGalleryImage> {
        const body: Group.dataKeysAddGroupGalleryImage = { fileId };

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.addGroupGalleryImage,
            pathFormated: ApiPaths.groups.addGroupGalleryImage.path
                .replace('{groupId}', groupId)
                .replace('{groupGalleryId}', groupGalleryId),
            body: body,
        };

        return await this.executeRequest<Group.GroupGalleryImage>(paramRequest);
    }

    /**
     * Deletes an image from a Group gallery.
     * @param DeleteGroupGalleryImagesRequest - { groupId, groupGalleryId, groupGalleryImageId }
     * @returns
     */
    public async deleteGroupGalleryImage({
        groupId,
        groupGalleryId,
        groupGalleryImageId,
    }: Group.deleteGroupGalleryImagesRequest): Promise<RequestSuccess> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroupGalleryImage,
            pathFormated: ApiPaths.groups.deleteGroupGalleryImage.path
                .replace('{groupId}', groupId)
                .replace('{groupGalleryId}', groupGalleryId)
                .replace('{groupGalleryImageId}', groupGalleryImageId),
        };

        return await this.executeRequest<RequestSuccess>(paramRequest);
    }

    /**
     * Returns a list of members that have been invited to the Group.
     * @param GetGroupInvitesSentRequest - { groupId }
     * @returns
     */
    public async getGroupInvitesSent({ groupId }: Group.getGroupInvitesSentRequest): Promise<Group.GroupMember[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupInvitesSent,
            pathFormated: ApiPaths.groups.getGroupInvitesSent.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<Group.GroupMember[]>(paramRequest);
    }

    /**
     * Sends an invite to a user to join the group.
     * @param inviteUserToGroupRequest - { groupId, userId, confirmOverrideBlock }
     * @returns
     */
    public async inviteUsertoGroup({
        groupId,
        userId,
        confirmOverrideBlock,
    }: Group.inviteUserToGroupRequest): Promise<boolean> {
        const body: Group.dataKeysCreateGroupInvite = { userId };

        if (confirmOverrideBlock) body.confirmOverrideBlock = confirmOverrideBlock;

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.inviteUserToGroup,
            pathFormated: ApiPaths.groups.inviteUserToGroup.path.replace('{groupId}', groupId),
            body: body,
        };

        return await this.executeRequest<boolean>(paramRequest);
    }

    /**
     * Deletes an Group invite sent to a User
     * @param deleteGroupUserInviteRequest - { groupId, userId }
     * @returns
     */
    public async deleteUserInvite({ groupId, userId }: Group.deleteGroupUserInviteRequest): Promise<boolean> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.deleteUserInvite,
            pathFormated: ApiPaths.groups.deleteUserInvite.path
                .replace('{userId}', userId)
                .replace('{groupId}', groupId),
        };

        return await this.executeRequest<boolean>(paramRequest);
    }

    /**
     * Join a Group by ID and returns the member object.
     * @param joinGroupRequest - { groupId }
     * @returns
     */
    public async joinGroup({ groupId }: Group.joinGroupRequest): Promise<Group.GroupMember[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.joinGroup,
            pathFormated: ApiPaths.groups.joinGroup.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<Group.GroupMember[]>(paramRequest);
    }

    /**
     * Leave a group by ID.
     * @param leaveGroupRequest - { groupId }
     * @returns
     */
    public async leaveGroup({ groupId }: Group.leaveGroupRequest): Promise<boolean> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.leaveGroup,
            pathFormated: ApiPaths.groups.leaveGroup.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<boolean>(paramRequest);
    }

    /**
     * Returns a List of all other Group Members. This endpoint will never return the user calling the endpoint.
     *
     * Information about the user calling the endpoint must be found in the myMember field of the Group object.
     * @param listGroupMembersRequest - { groupId, n, offset, sort, roleId }
     * @returns
     */
    public async listGroupMembers({
        groupId,
        n,
        offset,
        sort,
        roleId,
    }: Group.listGroupMembersRequest): Promise<Group.GroupMember[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (n && n < 1 && n > 100) throw new BadRequestParameter('n must be set between 1 and 100!');

        parameters.append('n', n?.toString() || '60');
        if (offset && offset >= 0) parameters.append('offset', offset.toString());
        if (sort) parameters.append('sort', sort);
        if (roleId) parameters.append('roleId', roleId);

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.listGroupMembers,
            pathFormated: ApiPaths.groups.listGroupMembers.path.replace('{groupId}', groupId),
            queryOptions: parameters,
        };

        return await this.executeRequest<Group.GroupMember[]>(paramRequest);
    }

    /**
     * Returns a LimitedGroup Member.
     * @param getGroupMemberRequest - { groupId, userId }
     * @returns
     */
    public async getGroupMember({ groupId, userId }: Group.getGroupMemberRequest): Promise<Group.GroupMember> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupMember,
            pathFormated: ApiPaths.groups.getGroupMember.path.replace('{groupId}', groupId).replace('{userId}', userId),
        };

        return await this.executeRequest<Group.GroupMember>(paramRequest);
    }

    /**
     * Updates a Group Member
     * @param updateGroupMemberRequest - { groupId, userId, visibility, isSubscribedToAnnouncements, managerNotes }
     * @returns
     */
    public async updateGroupMember({
        groupId,
        userId,
        visibility,
        isSubscribedToAnnouncements,
        managerNotes,
    }: Group.updateGroupMemberRequest): Promise<Group.GroupMemberLimitedUser> {
        // At least one attribute must be set, otherwise the request will fail.
        if (!visibility && !isSubscribedToAnnouncements && !managerNotes) {
            throw new Error('At least one attribute must be set!');
        }

        const body: Group.dataKeysUpdateGroupMember = {};

        if (visibility) body.visibility = visibility;
        if (isSubscribedToAnnouncements) body.isSubscribedToAnnouncements = isSubscribedToAnnouncements;
        if (managerNotes) body.managerNotes = managerNotes;

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.updateGroupMember,
            pathFormated: ApiPaths.groups.updateGroupMember.path
                .replace('{groupId}', groupId)
                .replace('{userId}', userId),
        };

        return await this.executeRequest<Group.GroupMemberLimitedUser>(paramRequest);
    }

    /**
     * Kicks a Group Member from the Group. The current user must have the "Remove Group Members" permission.
     * @param kickGroupMemberRequest - { groupId, userId }
     * @returns
     */
    public async kickGroupMember({ groupId, userId }: Group.kickGroupMemberRequest): Promise<boolean> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.kickGroupMember,
            pathFormated: ApiPaths.groups.kickGroupMember.path
                .replace('{groupId}', groupId)
                .replace('{userId}', userId),
        };

        return await this.executeRequest<boolean>(paramRequest);
    }

    /**
     * Adds a Role to a Group Member
     * @param addRoleToGroupMemberRequest - { groupId, userId, groupRoleId }
     * @returns
     */
    public async addRoleToGroupMember({
        groupId,
        userId,
        groupRoleId,
    }: Group.addRoleToGroupMemberRequest): Promise<string[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.addRoleToGroupMember,
            pathFormated: ApiPaths.groups.addRoleToGroupMember.path
                .replace('{groupId}', groupId)
                .replace('{userId}', userId)
                .replace('{groupRoleId}', groupRoleId),
        };

        return await this.executeRequest<string[]>(paramRequest);
    }

    /**
     * Removes a Role from a Group Member
     * @param removeRoleFromGroupMemberRequest - { groupId, userId, groupRoleId }
     * @returns
     */
    public async removeRoleFromGroupMember({
        groupId,
        userId,
        groupRoleId,
    }: Group.removeRoleFromGroupMemberRequest): Promise<string[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.removeRoleFromGroupMember,
            pathFormated: ApiPaths.groups.removeRoleFromGroupMember.path
                .replace('{groupId}', groupId)
                .replace('{userId}', userId)
                .replace('{groupRoleId}', groupRoleId),
        };

        return await this.executeRequest<string[]>(paramRequest);
    }

    /**
     * Returns a List of all possible/available permissions for a Group.
     * @param listGroupPermissionsRequest - { groupId }
     * @returns
     */
    public async listGroupPermissions({
        groupId,
    }: Group.listGroupPermissionsRequest): Promise<Group.GroupPermission[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.listGroupPermissions,
            pathFormated: ApiPaths.groups.listGroupPermissions.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<Group.GroupPermission[]>(paramRequest);
    }

    /**
     * Returns a list of members that have requested to join the Group.
     * @param getGroupJoinRequestsRequest - { groupId }
     * @returns
     */
    public async getGroupJoinRequests({ groupId }: Group.getGroupJoinRequestsRequest): Promise<Group.GroupMember[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupJoinRequests,
            pathFormated: ApiPaths.groups.getGroupJoinRequests.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<Group.GroupMember[]>(paramRequest);
    }

    /**
     * Cancels a request sent to join the group.
     * @param cancelGroupJoinRequestRequest - { groupId }
     * @returns
     */
    public async cancelGroupJoinRequest({ groupId }: Group.cancelGroupJoinRequestRequest): Promise<boolean> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.cancelGroupJoinRequest,
            pathFormated: ApiPaths.groups.cancelGroupJoinRequest.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<boolean>(paramRequest);
    }

    /**
     * Responds to a Group Join Request with Accept/Deny
     * @param respondGroupJoinrequestRequest - { groupId, userId, action }
     * @returns
     */
    public async respondGroupJoinrequest({
        groupId,
        userId,
        action,
    }: Group.respondGroupJoinrequestRequest): Promise<boolean> {
        const body: Group.dataKeysRespondGroupJoinRequest = {
            action: action,
        };
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.respondGroupJoinrequest,
            pathFormated: ApiPaths.groups.respondGroupJoinrequest.path
                .replace('{groupId}', groupId)
                .replace('{userId}', userId),
            body: body,
        };

        return await this.executeRequest<boolean>(paramRequest);
    }

    /**
     * Returns a Group Role by ID.
     * @param getGroupRoleRequest - { groupId, groupRoleId }
     * @returns
     */
    public async getGroupRoles({ groupId }: Group.getGroupRolesRequest): Promise<Group.GroupRole[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupRoles,
            pathFormated: ApiPaths.groups.getGroupRoles.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<Group.GroupRole[]>(paramRequest);
    }

    /**
     * Create a Group role.
     * @param createGroupRoleRequest - { groupId, name, description, isSelfAssignable, permissions }
     * @returns
     */
    public async createGroupRole({
        groupId,
        name,
        description,
        isSelfAssignable = false,
        permissions,
    }: Group.createGroupRoleRequest): Promise<Group.GroupRole> {
        if (name.length < 1) new BadRequestParameter('Name must be at least 1 character!');

        const body: Group.dataKeysCreateGroupRole = {
            id: 'new',
            name: name,
            isSelfAssignable,
            permissions: permissions || [],
        };

        if (description && description.length >= 0) body.description = description;

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.createGroupRole,
            pathFormated: ApiPaths.groups.createGroupRole.path.replace('{groupId}', groupId),
            body: body,
        };

        return await this.executeRequest<Group.GroupRole>(paramRequest);
    }

    /**
     * Updates a group role by ID.
     * @param updateGroupRoleRequest - { groupId, groupRoleId, name, description, isSelfAssignable, permissions, order }
     * @returns
     */
    public async updateGroupRole({
        groupId,
        groupRoleId,
        name,
        description,
        isSelfAssignable = false,
        permissions,
        order,
    }: Group.updateGroupRoleRequest): Promise<Group.GroupRole[]> {
        // check parameters
        if (name && name.length < 1) new BadRequestParameter('Name must be at least 1 character!');

        const body: Group.dataKeysUpdateGroupRole = {
            isSelfAssignable,
            permissions: permissions || [],
        };

        if (name) body.name = name;
        if (description && description.length >= 0) body.description = description;
        if (order) body.order = order;

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.updateGroupRole,
            pathFormated: ApiPaths.groups.updateGroupRole.path
                .replace('{groupId}', groupId)
                .replace('{groupRoleId}', groupRoleId),
            body: body,
        };

        return await this.executeRequest<Group.GroupRole[]>(paramRequest);
    }

    /**
     * Deletes a Group Role by ID and returns the remaining roles.
     * @param deleteGroupRoleRequest - { groupId, groupRoleId }
     * @returns {Group.GroupRole[]} The GroupRole object of the remaining roles.
     */
    public async deleteGroupRole({ groupId, groupRoleId }: Group.deleteGroupRoleRequest): Promise<Group.GroupRole[]> {
        const parameters: URLSearchParams = new URLSearchParams();
        parameters.append('confirm', 'true');

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroupRole,
            pathFormated: ApiPaths.groups.deleteGroupRole.path
                .replace('{groupId}', groupId)
                .replace('{groupRoleId}', groupRoleId),
            queryOptions: parameters, // fixed this parameter that was missing
        };

        return await this.executeRequest<Group.GroupRole[]>(paramRequest);
    }

    /**
     * Returns a list of all Group Instances.
     * @param getGroupRolesRequest - { groupId }
     * @returns {Inst.GroupInstance[]} The GroupInstance object of the requested instances.
     */
    public async getGroupInstances({ groupId }: Group.getGroupInstancesRequest): Promise<Inst.GroupInstance[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupInstances,
            pathFormated: ApiPaths.groups.getGroupInstances.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<Inst.GroupInstance[]>(paramRequest);
    }

    /**
     *  Edit a Group Post.
     *
     * @param editGroupPostRequest - { groupId, notificationId, title, text, imageId, sendNotification, roleIds, visibility }
     * @returns {Group.GroupPost} The GroupPost object of the edited post.
     */
    public async editGroupPost({
        groupId,
        notificationId,
        title,
        text,
        imageId,
        sendNotification,
        roleIds = [],
        visibility,
    }: Group.editGroupPostRequest): Promise<Group.GroupPost> {
        // check parameters
        if (visibility == Group.GroupPostVisibilityType.Public && roleIds.length > 0) {
            console.warn('Warning: RoleIds will be ignored when visibility is set to Public!');
        }

        const body: Group.dataKeysEditGroupPost = {};

        if (roleIds.length > 0) body.roleIds = roleIds;
        if (title) body.title = replaceSpecialCharactersVRC(title);
        if (text) body.text = replaceSpecialCharactersVRC(text);
        if (sendNotification) body.sendNotification = sendNotification;
        if (visibility) body.visibility = visibility;
        if (imageId) body.imageId = imageId;

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.groups.editGroupPost,
            pathFormated: ApiPaths.groups.editGroupPost.path
                .replace('{groupId}', groupId)
                .replace('{notificationId}', notificationId),
            body: body,
        };

        return await this.executeRequest<Group.GroupPost>(paramRequest);
    }
}
