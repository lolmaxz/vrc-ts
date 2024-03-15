import { VRChatAPI } from "../VRChatAPI";
import { BadRequestParameter } from "../errors";
import { ApiPaths } from "../types/ApiPaths";
import { BaseApi } from "./BaseApi";

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
     * @param param0 The parameters for the request.
     * @returns A list of Groups.
     */
    public async searchGroups({
        n,
        offset,
        query
    }: VRCAPI.Groups.Requests.SearchGroupRequest): Promise<VRCAPI.Groups.Models.LimitedGroup[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (n) {
            if (!(n >= 1 && n <= 100)) throw new BadRequestParameter('n must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset && offset >= 0) parameters.append('offset', offset.toString());
        if (query) parameters.append('query', query);

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.searchGroups,
            pathFormated: ApiPaths.groups.searchGroups.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<VRCAPI.Groups.Models.LimitedGroup[]>(paramRequest);
    }
    /**
     * Creates a Group and returns a Group object. Requires VRC+ Subscription.
     * 
     * **YOU MUST HAVE VRC+ SUBSCRIPTION TO USE THIS METHOD!**
     * 
     * Not giving a description will result in a random one given to you by VRChat!
     * 
     * @param {VRCAPI.Groups.Requests.CreateGroupRequest} parameters
     * @returns {VRCAPI.Group.Model.Group} The Group object of the created group.
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
    }: VRCAPI.Groups.Requests.CreateGroupRequest): Promise<VRCAPI.Groups.Models.Group> {

        if (name.length < 3 || shortCode.length > 64) throw new BadRequestParameter('Name must be between 3 and 64 characters!');
        // Making sure group name is going to be valid when sent to the VRChat API.
        const replacements: { [key: string]: string } = {
            '@': '＠',
            '#': '＃',
            '$': '＄',
            '%': '％',
            '&': '＆',
            '=': '＝',
            '+': '＋',
            '/': '⁄',
            '\\': '＼',
            ';': ';',
            ':': '˸',
            ',': '‚',
            '?': '？',
            '!': 'ǃ',
            '"': '＂',
            '<': '≺',
            '>': '≻',
            '.': '․',
            '^': '＾',
            '{': '｛',
            '}': '｝',
            '[': '［',
            ']': '］',
            '(': '（',
            ')': '）',
            '|': '｜',
            '*': '∗'
        };

        let result = '';
        for (const char of name) {
            result += replacements[char] || char;
        }

        name = result;

        if (shortCode.length < 3 || shortCode.length > 6) throw new BadRequestParameter('ShortCode must be between 3 and 64 characters!');

        const body: VRCAPI.Groups.Requests.CreateGroupRequest = {
            name,
            shortCode,
            roleTemplate,
        };

        if (description) {
            if (description.length > 250 || description.length < 0) throw new BadRequestParameter('Description must be between 0 and 250 characters!');
            body.description = description;
        }

        if (joinState) body.joinState = joinState;
        if (iconId) body.iconId = iconId;
        if (bannerId) body.bannerId = bannerId;
        if (privacy) body.privacy = privacy;

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.createGroup,
            pathFormated: ApiPaths.groups.createGroup.path,
            body: body,
        };

        return await this.executeRequest<VRCAPI.Groups.Models.Group>(paramRequest);
    }

    /**
     * Returns a single Group by ID.
     * @param {VRCAPI.Groups.Requests.getGroupByIdRequest} parameters
     * @returns {VRCAPI.Groups.Models.Group} The Group object of the requested group.
     */
    public async getGroupbyID({ groupId, includeRoles = false }: VRCAPI.Groups.Requests.getGroupByIdRequest): Promise<VRCAPI.Groups.Models.Group> {
        const parameters: URLSearchParams = new URLSearchParams();

        parameters.append('includeRoles', includeRoles.toString());

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupById,
            pathFormated: ApiPaths.groups.getGroupById.path.replace('{groupId}', groupId),
            queryOptions: parameters,
        };

        return await this.executeRequest<VRCAPI.Groups.Models.Group>(paramRequest);
    }

    /**
     * Updates a Group and returns it.
     * @param {VRCAPI.Groups.Requests.UpdateGroupRequest} parameters
     * @returns {VRCAPI.Groups.Models.Group} The Group object of the updated group.
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
        tags

    }: VRCAPI.Groups.Requests.UpdateGroupRequest): Promise<VRCAPI.Groups.Models.Group> {

        // at least one parameter of the data must be present to continue
        if (!name && !shortCode && !description && !joinState && !iconId && !bannerId && !languages && !links && !rules) {
            throw new Error('At least one parameter of the data must be present to continue!');
        }

        const body: VRCAPI.Groups.Requests.dataKeysUpdateGroup = {}

        if (name) {
            if (name.length < 3 || name.length > 64) throw new BadRequestParameter('Name must be between 3 and 64 characters!');
            body.name = name;
        }

        if (shortCode) {
            if (shortCode.length < 3 || shortCode.length > 6) throw new BadRequestParameter('ShortCode must be between 3 and 64 characters!');
            body.shortCode = shortCode;
        }

        if (description) {
            if (description.length < 0 || description.length > 250) throw new BadRequestParameter('Description must be between 0 and 250 characters!');
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

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.updateGroup,
            pathFormated: ApiPaths.groups.updateGroup.path.replace('{groupId}', groupId),
            body: body,
        };

        return await this.executeRequest<VRCAPI.Groups.Models.Group>(paramRequest);
    }

    /**
    * Deletes a Group. **BE CAREFUL WITH THAT, THERE IS NO GOING BACK.**
    * @param {VRCAPI.Groups.Requests.DeleteGroupRequest} {groupId} - The id of the group to delete.
    * @returns A RequestSuccess object.
     */
    public async deleteGroup({ groupId }: VRCAPI.Groups.Requests.DeleteGroupRequest): Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroup,
            pathFormated: ApiPaths.groups.deleteGroup.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);
    }

    /**
     *  Returns the announcement for a Group. If no announcement has been made, then it returns empty object.
     * 
     *  If an announcement exists, then it will always return all fields except imageId and imageUrl which may be null.
     * 
     * @param {VRCAPI.Groups.Requests.GetGroupAnnouncementRequest} parameters
     * @returns {VRCAPI.Groups.Models.GroupAnnouncement} The GroupAnnouncement object of the requested announcement.
     */
    public async getGroupAnnouncement({ groupId }: VRCAPI.Groups.Requests.GetGroupAnnouncementRequest): Promise<VRCAPI.Groups.Models.GroupAnnouncement | object> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupAnnouncement,
            pathFormated: ApiPaths.groups.getGroupAnnouncement.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupAnnouncement>(paramRequest);
    }

    /**
     * Creates an Announcement for a Group.
     * @param {VRCAPI.Groups.Requests.CreateGroupAnnouncementRequest} parameters
     * @returns {VRCAPI.Groups.Models.GroupAnnouncement} The GroupAnnouncement object of the created announcement.
     */
    public async createGroupAnnouncement({
        groupId,
        title,
        text,
        imageId,
        sendNotification = true,
    }: VRCAPI.Groups.Requests.CreateGroupAnnouncementRequest): Promise<VRCAPI.Groups.Models.GroupAnnouncement> {

        // check parameters
        if (title.length < 1) new BadRequestParameter('Title must be at least 1 character!');
        if (text.length < 1) new BadRequestParameter('Text must be at least 1 character!');

        const body: VRCAPI.Groups.Requests.dataKeysCreateGroupAnnouncement = {
            title,
            text,
            sendNotification
        }

        if (imageId) body.imageId = imageId;

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.createGroupAnnouncement,
            pathFormated: ApiPaths.groups.createGroupAnnouncement.path.replace('{groupId}', groupId),
            body: body,
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupAnnouncement>(paramRequest);
    }

    /**
     * Deletes the announcement for a Group.
     * @param param0 The parameters for the request.
     * @returns A RequestSuccess object.
     */
    public async deleteGroupAnnouncement({ groupId }: VRCAPI.Groups.Requests.deleteGroupAnnouncementRequest): Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroupAnnouncement,
            pathFormated: ApiPaths.groups.deleteGroupAnnouncement.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);
    }

    /**
     * Returns a list of audit logs for a Group.
     * @param param request parameters for the request
     */
    public async getGroupAuditLogs({
        groupId,
        n,
        offset,
        startDate,
        endDate,
    }: VRCAPI.Groups.Requests.getGroupAuditLogsRequest): Promise<VRCAPI.Groups.Models.GroupAudit> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (n) {
            if (!(n >= 1 && n <= 100)) throw new BadRequestParameter('n must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset && offset >= 0) parameters.append('offset', offset.toString());
        if (startDate) parameters.append('startDate', startDate);
        if (endDate) parameters.append('endDate', endDate);

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupAuditLogs,
            pathFormated: ApiPaths.groups.getGroupAuditLogs.path.replace('{groupId}', groupId),
            queryOptions: parameters,
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupAudit>(paramRequest);
    }

    /**
     * Returns a list of banned users for a Group.
     * @param param0  The parameters for the request.
     * @returns A list of banned users for the Group.
     */
    public async getGroupBans({
        groupId,
        n,
        offset
    }: VRCAPI.Groups.Requests.GetBannedUsersRequest): Promise<VRCAPI.Groups.Models.GroupMember[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        // check parameters
        if (n) {
            if (!(n >= 1 && n <= 100)) throw new BadRequestParameter('n must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset && offset >= 0) parameters.append('offset', offset.toString());

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupBans,
            pathFormated: ApiPaths.groups.getGroupBans.path.replace('{groupId}', groupId),
            queryOptions: parameters,
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupMember[]>(paramRequest);
    }

    /**
     * Bans a user from a Group.
     * @param param0 Parameter for the request.
     * @returns The GroupMember object of the banned user.
     */
    //! I'm scared this might not be the right type! (docs says list of members, but that doesn't make sense..)
    public async banGroupMember({
        groupId,
        userId
    }: VRCAPI.Groups.Requests.BanGroupMemberRequest): Promise<VRCAPI.Groups.Models.GroupMember> {

        if (userId.length <= 0) new BadRequestParameter('userId is too short!');

        const body: VRCAPI.Groups.Requests.dataKeysGroupBanMember = { userId }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.banGroupMember,
            pathFormated: ApiPaths.groups.banGroupMember.path.replace('{groupId}', groupId),
            body: body
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupMember>(paramRequest);
    }

    /**
     * Unbans a user from a Group.
     * @param param0 The parameters for the request.
     * @returns The GroupMember object of the unbanned user.
     */
    //! Same here
    public async unbanGroupMember({
        groupId,
        userId
    }: VRCAPI.Groups.Requests.UnbanGroupMemberRequest): Promise<VRCAPI.Groups.Models.GroupMember> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.unbanGroupMember,
            pathFormated: ApiPaths.groups.unbanGroupMember.path.replace('{groupId}', groupId).replace('{userId}', userId),
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupMember>(paramRequest);
    }

    /**
     * Creates a gallery for a Group.
     * @param param0 The parameters for the request.
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
        roleIdsToManage
    }: VRCAPI.Groups.Requests.createGroupGalleryRequest): Promise<VRCAPI.Groups.Models.GroupGallery> {

        if (name.length < 1) new BadRequestParameter('Name must be at least 1 character!');

        const body: VRCAPI.Groups.Requests.dataKeysGroupCreateGallery = { name }

        if (description && description.length >= 0) body.description = description;
        if (membersOnly) body.membersOnly = membersOnly;
        if (roleIdsToView) body.roleIdsToView = roleIdsToView;
        if (roleIdsToSubmit) body.roleIdsToSubmit = roleIdsToSubmit;
        if (roleIdsToAutoApprove) body.roleIdsToAutoApprove = roleIdsToAutoApprove;
        if (roleIdsToManage) body.roleIdsToManage = roleIdsToManage;

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.createGroupGallery,
            pathFormated: ApiPaths.groups.createGroupGallery.path.replace('{groupId}', groupId),
            body: body
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupGallery>(paramRequest);
    }

    /**
     * Returns a list of images for a Group gallery.
     * @param param0 
     * @returns 
     */
    public async getGroupGalleryImages({
        groupId,
        groupGalleryId,
        n,
        offset,
        approved
    }: VRCAPI.Groups.Requests.GetGroupGalleryImagesRequest): Promise<VRCAPI.Groups.Models.GroupGalleryImage[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        // check parameters
        if (n) {
            if (!(n >= 1 && n <= 100)) throw new BadRequestParameter('n must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset && offset >= 0) parameters.append('offset', offset.toString());
        if (approved) parameters.append('approved', approved.toString());

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupGalleryImages,
            pathFormated: ApiPaths.groups.getGroupGalleryImages.path.replace('{groupId}', groupId).replace('{groupGalleryId}', groupGalleryId),
            queryOptions: parameters,
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupGalleryImage[]>(paramRequest);
    }

    /**
     * Updates a gallery for a Group.
     * @param param0 
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
        roleIdsToManage
    }: VRCAPI.Groups.Requests.UpdateGroupGalleryRequest): Promise<VRCAPI.Groups.Models.GroupGallery> {

        if (name && name.length < 1) new BadRequestParameter('Name must be at least 1 character!');

        const body: VRCAPI.Groups.Requests.dataKeysGroupUpdateGallery = { name };


        if (description && description.length >= 0) {
            body.description = description;
        }

        if (membersOnly) body.membersOnly = membersOnly;
        if (roleIdsToView) body.roleIdsToView = roleIdsToView;
        if (roleIdsToSubmit) body.roleIdsToSubmit = roleIdsToSubmit;
        if (roleIdsToAutoApprove) body.roleIdsToAutoApprove = roleIdsToAutoApprove;
        if (roleIdsToManage) body.roleIdsToManage = roleIdsToManage;

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.updateGroupGallery,
            pathFormated: ApiPaths.groups.updateGroupGallery.path.replace('{groupId}', groupId).replace('{groupGalleryId}', groupGalleryId),
            body: body
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupGallery>(paramRequest);
    }

    /**
     * Deletes a gallery for a Group.
     * @param param0 
     * @returns 
     */
    public async deleteGroupGallery({
        groupId,
        groupGalleryId
    }: VRCAPI.Groups.Requests.DeleteGroupGalleryRequest): Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroupGallery,
            pathFormated: ApiPaths.groups.deleteGroupGallery.path.replace('{groupId}', groupId).replace('{groupGalleryId}', groupGalleryId),
        };

        return await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);
    }

    // Adds an image to a Group gallery.
    public async addGroupGalleryImage({
        groupId,
        groupGalleryId,
        fileId
    }: VRCAPI.Groups.Requests.AddGroupGalleryImagesRequest): Promise<VRCAPI.Groups.Models.GroupGalleryImage> {

        const body: VRCAPI.Groups.Requests.dataKeysAddGroupGalleryImage = { fileId };

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.addGroupGalleryImage,
            pathFormated: ApiPaths.groups.addGroupGalleryImage.path.replace('{groupId}', groupId).replace('{groupGalleryId}', groupGalleryId),
            body: body
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupGalleryImage>(paramRequest);
    }

    /**
     * Deletes an image from a Group gallery.
     * @param param0 
     * @returns 
     */
    public async deleteGroupGalleryImage({
        groupId,
        groupGalleryId,
        groupGalleryImageId
    }: VRCAPI.Groups.Requests.DeleteGroupGalleryImagesRequest): Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroupGalleryImage,
            pathFormated: ApiPaths.groups.deleteGroupGalleryImage.path.replace('{groupId}', groupId).replace('{groupGalleryId}', groupGalleryId).replace('{groupGalleryImageId}', groupGalleryImageId),
        };

        return await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);
    }

    /**
     * Returns a list of members that have been invited to the Group.
     * @param param0 
     * @returns 
     */
    public async getGroupInvitesSent({ groupId }: VRCAPI.Groups.Requests.GetGroupInvitesSentRequest): Promise<VRCAPI.Groups.Models.GroupMember[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupInvitesSent,
            pathFormated: ApiPaths.groups.getGroupInvitesSent.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupMember[]>(paramRequest);
    }

    /**
     * Sends an invite to a user to join the group.
     * @param param0 
     * @returns 
     */
    public async inviteUsertoGroup({
        groupId,
        userId,
        confirmOverrideBlock
    }: VRCAPI.Groups.Requests.InviteUserToGroupRequest): Promise<boolean> {

        const body: VRCAPI.Groups.Requests.dataKeysCreateGroupInvite = { userId };

        if (confirmOverrideBlock) body.confirmOverrideBlock = confirmOverrideBlock;

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.inviteUserToGroup,
            pathFormated: ApiPaths.groups.inviteUserToGroup.path.replace('{groupId}', groupId),
            body: body
        };

        return await this.executeRequest<boolean>(paramRequest);
    }

    /**
     * Deletes an Group invite sent to a User
     * @param param0 
     * @returns 
     */
    public async deleteUserInvite({
        groupId,
        userId
    }: VRCAPI.Groups.Requests.deleteGroupUserInviteRequest): Promise<boolean> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.deleteUserInvite,
            pathFormated: ApiPaths.groups.deleteUserInvite.path.replace('{userId}', userId).replace('{groupId}', groupId),
        };

        return await this.executeRequest<boolean>(paramRequest);
    }

    /**
     * Join a Group by ID and returns the member object.
     * @param param0 
     * @returns 
     */
    public async joinGroup({ groupId }: VRCAPI.Groups.Requests.joinGroupRequest): Promise<VRCAPI.Groups.Models.GroupMember[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.joinGroup,
            pathFormated: ApiPaths.groups.joinGroup.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupMember[]>(paramRequest);
    }

    /**
     * Leave a group by ID.
     * @param param0 
     * @returns 
     */
    public async leaveGroup({ groupId }: VRCAPI.Groups.Requests.leaveGroupRequest): Promise<boolean> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.leaveGroup,
            pathFormated: ApiPaths.groups.leaveGroup.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<boolean>(paramRequest);
    }

    /**
     * Returns a List of all other Group Members. This endpoint will never return the user calling the endpoint.
     *  
     * Information about the user calling the endpoint must be found in the myMember field of the Group object.
     * @param param0 
     * @returns 
     */
    public async listGroupMembers({
        groupId,
        n,
        offset,
        sort
    }: VRCAPI.Groups.Requests.listGroupMembersRequest): Promise<VRCAPI.Groups.Models.GroupMember[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (n && (n < 1 && n > 100)) throw new BadRequestParameter('n must be set between 1 and 100!');

        parameters.append('n', n?.toString() || '60');
        if (offset && offset >= 0) parameters.append('offset', offset.toString());
        if (sort) parameters.append('sort', sort);

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.listGroupMembers,
            pathFormated: ApiPaths.groups.listGroupMembers.path.replace('{groupId}', groupId),
            queryOptions: parameters,
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupMember[]>(paramRequest);
    }

    /**
     * Returns a LimitedGroup Member.
     * @param param0 
     * @returns 
     */
    public async getGroupMember({
        groupId,
        userId
    }: VRCAPI.Groups.Requests.getGroupMemberRequest): Promise<VRCAPI.Groups.Models.GroupMemberLimitedUser> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupMember,
            pathFormated: ApiPaths.groups.getGroupMember.path.replace('{groupId}', groupId).replace('{userId}', userId),
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupMemberLimitedUser>(paramRequest);
    }

    /**
     * Updates a Group Member
     * @param param0 
     * @returns 
     */
    public async updateGroupMember({
        groupId,
        userId,
        visibility,
        isSubscribedToAnnouncements,
        managerNotes
    }: VRCAPI.Groups.Requests.updateGroupMemberRequest): Promise<VRCAPI.Groups.Models.GroupMemberLimitedUser> {

        // At least one attribute must be set, otherwise the request will fail.
        if (!visibility && !isSubscribedToAnnouncements && !managerNotes) {
            throw new Error('At least one attribute must be set!');
        }

        const body: VRCAPI.Groups.Requests.dataKeysUpdateGroupMember = {}

        if (visibility) body.visibility = visibility;
        if (isSubscribedToAnnouncements) body.isSubscribedToAnnouncements = isSubscribedToAnnouncements;
        if (managerNotes) body.managerNotes = managerNotes;

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.updateGroupMember,
            pathFormated: ApiPaths.groups.updateGroupMember.path.replace('{groupId}', groupId).replace('{userId}', userId),
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupMemberLimitedUser>(paramRequest);
    }

    /**
     * Kicks a Group Member from the Group. The current user must have the "Remove Group Members" permission.
     * @param param0 
     * @returns 
     */
    public async kickGroupMember({
        groupId,
        userId
    }: VRCAPI.Groups.Requests.kickGroupMemberRequest): Promise<boolean> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.kickGroupMember,
            pathFormated: ApiPaths.groups.kickGroupMember.path.replace('{groupId}', groupId).replace('{userId}', userId),
        };

        return await this.executeRequest<boolean>(paramRequest);
    }

    /**
     * Adds a Role to a Group Member
     * @param param0 
     * @returns 
     */
    public async addRoleToGroupMember({
        groupId,
        userId,
        groupRoleId
    }: VRCAPI.Groups.Requests.addRoleToGroupMemberRequest): Promise<string[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.addRoleToGroupMember,
            pathFormated: ApiPaths.groups.addRoleToGroupMember.path.replace('{groupId}', groupId).replace('{userId}', userId).replace('{groupRoleId}', groupRoleId),
        };

        return await this.executeRequest<string[]>(paramRequest);
    }

    /**
     * Removes a Role from a Group Member
     * @param param0 
     * @returns 
     */
    public async removeRoleFromGroupMember({
        groupId,
        userId,
        groupRoleId
    }: VRCAPI.Groups.Requests.removeRoleFromGroupMemberRequest): Promise<string[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.removeRoleFromGroupMember,
            pathFormated: ApiPaths.groups.removeRoleFromGroupMember.path.replace('{groupId}', groupId).replace('{userId}', userId).replace('{groupRoleId}', groupRoleId),
        };

        return await this.executeRequest<string[]>(paramRequest);
    }

    /**
     * Returns a List of all possible/available permissions for a Group.
     * @param param0 
     * @returns 
     */
    public async listGroupPermissions({ groupId }: VRCAPI.Groups.Requests.listGroupPermissionsRequest): Promise<VRCAPI.Groups.Models.GroupPermission[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.listGroupPermissions,
            pathFormated: ApiPaths.groups.listGroupPermissions.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupPermission[]>(paramRequest);
    }

    /**
     * Returns a list of members that have requested to join the Group.
     * @param param0 
     * @returns 
     */
    public async getGroupJoinRequests({ groupId }: VRCAPI.Groups.Requests.getGroupJoinRequestsRequest): Promise<VRCAPI.Groups.Models.GroupMember[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupJoinRequests,
            pathFormated: ApiPaths.groups.getGroupJoinRequests.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupMember[]>(paramRequest);
    }

    /**
     * Cancels a request sent to join the group.
     * @param param0 
     * @returns 
     */
    public async cancelGroupJoinRequest({ groupId }: VRCAPI.Groups.Requests.cancelGroupJoinRequestRequest): Promise<boolean> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.cancelGroupJoinRequest,
            pathFormated: ApiPaths.groups.cancelGroupJoinRequest.path.replace('{groupId}', groupId),
        };

        return await this.executeRequest<boolean>(paramRequest);
    }

    /**
     * Responds to a Group Join Request with Accept/Deny
     * @param param0 
     * @returns 
     */
    public async respondGroupJoinrequest({
        groupId,
        userId,
        action
    }: VRCAPI.Groups.Requests.respondGroupJoinrequestRequest): Promise<boolean> {

        const body: VRCAPI.Groups.Requests.dataKeysRespondGroupJoinRequest = {
            action: action,
        }
        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.respondGroupJoinrequest,
            pathFormated: ApiPaths.groups.respondGroupJoinrequest.path.replace('{groupId}', groupId).replace('{userId}', userId),
            body: body
        };

        return await this.executeRequest<boolean>(paramRequest);
    }

    /**
     * Returns a Group Role by ID.
     * @param param0 
     * @returns 
     */
    public async getGroupRoles({ groupId }: VRCAPI.Groups.Requests.getGroupRolesRequest): Promise<VRCAPI.Groups.Models.GroupRole[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupRoles,
            pathFormated: ApiPaths.groups.getGroupRoles.path.replace('{groupId}', groupId)
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupRole[]>(paramRequest);
    }

    /**
     * Create a Group role.
     * @param param0 
     * @returns 
     */
    public async createGroupRole({
        groupId,
        name,
        description,
        isSelfAssignable = false,
        permissions
    }: VRCAPI.Groups.Requests.createGroupRoleRequest): Promise<VRCAPI.Groups.Models.GroupRole> {

        if (name.length < 1) new BadRequestParameter('Name must be at least 1 character!');

        const body: VRCAPI.Groups.Requests.dataKeysCreateGroupRole = {
            id: "new",
            name: name,
            isSelfAssignable,
            permissions: permissions || []
        }

        if (description && description.length >= 0) body.description = description;

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.createGroupRole,
            pathFormated: ApiPaths.groups.createGroupRole.path.replace('{groupId}', groupId),
            body: body
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupRole>(paramRequest);
    }

    /**
     * Updates a group role by ID.
     * @param param0 
     * @returns 
     */
    public async updateGroupRole({
        groupId,
        groupRoleId,
        name,
        description,
        isSelfAssignable = false,
        permissions,
        order
    }: VRCAPI.Groups.Requests.updateGroupRoleRequest): Promise<VRCAPI.Groups.Models.GroupRole[]> {

        
        // check parameters
        if (name && name.length < 1) new BadRequestParameter('Name must be at least 1 character!');
        
        const body: VRCAPI.Groups.Requests.dataKeysUpdateGroupRole = {
            isSelfAssignable,
            permissions: permissions || []
        }
        
        if (name) body.name = name;
        if (description && description.length >= 0) body.description = description;
        if (order) body.order = order;

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.updateGroupRole,
            pathFormated: ApiPaths.groups.updateGroupRole.path.replace('{groupId}', groupId).replace('{groupRoleId}', groupRoleId),
            body: body
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupRole[]>(paramRequest);
    }

    /**
     * Deletes a Group Role by ID and returns the remaining roles.
     * @param param0 
     * @returns 
     */
    public async deleteGroupRole({
        groupId,
        groupRoleId
    }: VRCAPI.Groups.Requests.deleteGroupRoleRequest): Promise<VRCAPI.Groups.Models.GroupRole[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroupRole,
            pathFormated: ApiPaths.groups.deleteGroupRole.path.replace('{groupId}', groupId).replace('{groupRoleId}', groupRoleId),
        };

        return await this.executeRequest<VRCAPI.Groups.Models.GroupRole[]>(paramRequest);
    }
}