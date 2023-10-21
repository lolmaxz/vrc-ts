import { VRCWrapper } from "../VRCWrapper";
import { ApiPaths } from "../types/ApiPaths";
import { GroupJoinState, GroupPrivacy, GroupRoleTemplate, GroupUserVisibility } from "../types/GroupsEnums";
import { BaseApi } from "./BaseApi";


export class GroupsApi extends BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    // Creates a Group and returns a Group object. Requires VRC+ Subscription.
    /**
     * **YOU MUST HAVE VRC+ SUBSCRIPTION TO USE THIS METHOD!**
     * 
     * @param {VRCAPI.Generics.dataKeysCreateGroupRequest} parameters  An object with the following:
     * 
     * @param name `string` - The name of the group. Must be between 3 and 64 characters. **[REQUIRED]**.
     * @param shortCode `string` - The short code of the group. Must be between 3 and 6 characters. **[REQUIRED]**.
     * @param roleTemplate **ENUM** `VRCAPI.Groups.Models.GroupRoleTemplate` - The role template of the group. [DEFAULT: `0` - `Default`] **[REQUIRED]**.
     * @param description `string` - The description of the group. Must be between 0 and 250 characters. *[OPTIONAL]*.
     * @param joinState **ENUM** `VRCAPI.Groups.Models.GroupJoinState` - The join state of the group. [DEFAULT: `0` - `Open`] *[OPTIONAL]*.
     * @param iconId `string` - The icon id of the group. Must be a valid image id. *[OPTIONAL]*.
     * @param bannerId `string` - The banner id of the group. Must be a valid image id. *[OPTIONAL]*.
     * @param privacy **ENUM** `VRCAPI.Groups.Models.GroupPrivacy` - The privacy of the group. [DEFAULT: `0` - `Default`] *[OPTIONAL]*
     * @returns {Promise<VRCAPI.Groups.Models.Group>} - Returns a Group object Promise. 
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

        if (name.length < 3 || shortCode.length > 64) return Promise.reject(new Error('Name must be between 3 and 64 characters!'));
        if (shortCode.length < 3 || shortCode.length > 6) return Promise.reject(new Error('ShortCode must be between 3 and 64 characters!'));
        if (!Object.values(GroupRoleTemplate).includes(roleTemplate)) return Promise.reject(new Error('RoleTemplate must be one of the following: 0 - Default, 1 - ManagedFree, 2 - ManagedInvite, 3 - ManagedRequest!'));

        const body: VRCAPI.Generics.dataKeysCreateGroupRequest = {
            name,
            shortCode,
            roleTemplate,
        };

        if (description) {
            if (description.length > 250 || description.length < 0) return Promise.reject(new Error('Description must be between 0 and 250 characters!'));
            body.description = description;
        }

        if (joinState) {
            if (!Object.values(GroupJoinState).includes(joinState)) {
                console.warn('JoinState must be one of the following: 0 - Closed, 1 - Invite, 2 - Request, 3 - Open! Parameter ommited! Defaulted to "0 - Open"');
            } else {
                body.joinState = joinState;
            }
        }
        
        if (iconId) {
            body.iconId = iconId;
        }

        if (bannerId) {
            body.bannerId = bannerId;
        }

        if (privacy) {
            if (!Object.values(GroupPrivacy).includes(privacy)) {
                console.warn('Privacy must be one of the following: 0 - Default, 1 - Private! Parameter ommited! Defaulted to "0 - Default"!');
            } else {
                body.privacy = privacy;
            }
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.createGroup,
            pathFormated: ApiPaths.groups.createGroup.path,
            body: body,
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.Group>(paramRequest);

        return queryResult;

    }

    /**
     * Returns a single Group by ID.
     * @param param0 
     * @returns 
     */
    public async getGroupbyID({ groupId, includeRoles = false }: VRCAPI.Groups.Requests.getGroupByIdRequest): Promise<VRCAPI.Groups.Models.Group> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (!groupId) {
            throw new Error('No group id was provided!');
        }

        parameters.append('includeRoles', includeRoles.toString());

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupById,
            pathFormated: ApiPaths.groups.getGroupById.path.replace('{groupId}', groupId),
            queryOptions: parameters,
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.Group>(paramRequest);

        return queryResult;
    }

    /**
     * Updates a Group and returns it.
     * @param param0 
     * @returns 
     */
    public async updateGroup( {
        groupId,
        data: {
          name,
          shortCode, // 3 to 6 chars
          description, // Must be 0 to 250 characters long, optional
          joinState,
          iconId,
          bannerId,
          languages, // max length of 3, each max 3 characters strings
          links, // max length of 3
          rules, // max 2048 characters
        }
      } : VRCAPI.Groups.Requests.UpdateGroupRequest): Promise<VRCAPI.Groups.Models.Group> {

        // at least one parameter of the data must be present to continue
        if (!name && !shortCode && !description && !joinState && !iconId && !bannerId && !languages && !links && !rules) {
            throw new Error('At least one parameter of the data must be present to continue!');
        }

        const body: VRCAPI.Generics.dataKeysUpdateGroup = {}

        // check name
        if (name) {
            if (name.length < 3 || name.length > 64) return Promise.reject(new Error('Name must be between 3 and 64 characters!'));
            body.name = name;
        }

        // check shortCode
        if (shortCode) {
            if (shortCode.length < 3 || shortCode.length > 6) return Promise.reject(new Error('ShortCode must be between 3 and 64 characters!'));
            body.shortCode = shortCode;
        }

        // check description
        if (description) {
            if (description.length < 0 || description.length > 250) return Promise.reject(new Error('Description must be between 0 and 250 characters!'));
            body.description = description;
        }

        // check joinState
        if (joinState) {
            if (!Object.values(GroupJoinState).includes(joinState)) {
                console.warn('JoinState must be one of the following: 0 - Closed, 1 - Invite, 2 - Request, 3 - Open! Parameter ommited! Defaulted to "0 - Open"');
            }
            body.joinState = joinState;
        }

        // check iconId
        if (iconId) {
            body.iconId = iconId;
        }

        // check bannerId
        if (bannerId) {
            body.bannerId = bannerId;
        }

        // check languages
        if (languages) {
            if (languages.length > 3) return Promise.reject(new Error('Languages must be a maximum of 3!'));
            if (!languages.every((language: string) => language.length <= 3)) return Promise.reject(new Error('Each language must be a maximum of 3 characters!'));
            body.languages = languages;
        }

        // check links
        if (links) {
            if (links.length > 3) return Promise.reject(new Error('Links must be a maximum of 3!'));
            body.links = links;
        }

        // check rules
        if (rules) {
            if (rules.length > 2048) return Promise.reject(new Error('Rules must be a maximum of 2048 characters!'));
            body.rules = rules;
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.updateGroup,
            pathFormated: ApiPaths.groups.updateGroup.path.replace('{groupId}', groupId),
            body: body,
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.Group>(paramRequest);

        return queryResult;

    }

    /**
    * Deletes a Group. **BE CAREFUL WITH THAT, THERE IS NO GOING BACK.**
    * @param groupId The id of the group to delete.
    * @returns A RequestSuccess object.
     */
    public async deleteGroup({groupId}:VRCAPI.Groups.Requests.DeleteGroupRequest): Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroup,
            pathFormated: ApiPaths.groups.deleteGroup.path.replace('{groupId}', groupId),
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);

        return queryResult;

    }

    /**
     *  Returns the announcement for a Group. If no announcement has been made, then it returns empty object.
     * 
     *  If an announcement exists, then it will always return all fields except imageId and imageUrl which may be null.
     */ 
    public async getGroupAnnouncement({groupId}:VRCAPI.Groups.Requests.GetGroupAnnouncementRequest): Promise<VRCAPI.Groups.Models.GroupAnnouncement|object> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupAnnouncement,
            pathFormated: ApiPaths.groups.getGroupAnnouncement.path.replace('{groupId}', groupId),
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupAnnouncement>(paramRequest);

        return queryResult;

    }

    // Creates an Announcement for a Group.
    public async createGroupAnnouncement({
        groupId,
        title, // Min 1 chars
        text, // Min 1 chars
        imageId,
        sendNotification,
    }: VRCAPI.Groups.Requests.CreateGroupAnnouncementRequest): Promise<VRCAPI.Groups.Models.GroupAnnouncement> {

        // check parameters
        if (title.length < 1) return Promise.reject(new Error('Title must be at least 1 character!'));
        if (text.length < 1) return Promise.reject(new Error('Text must be at least 1 character!'));
        
        const body: VRCAPI.Generics.dataKeysCreateGroupAnnouncement = { title, text }

        if (imageId) body.imageId = imageId;
        if (sendNotification) {
            body.sendNotification = sendNotification;
        } else {
            body.sendNotification = true;
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.createGroupAnnouncement,
            pathFormated: ApiPaths.groups.createGroupAnnouncement.path.replace('{groupId}', groupId),
            body: body,
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupAnnouncement>(paramRequest);

        return queryResult;

    }

    /**
     * Deletes the announcement for a Group.
     * @param param0 The parameters for the request.
     * @returns A RequestSuccess object.
     */
    public async deleteGroupAnnouncement({groupId}:VRCAPI.Groups.Requests.deleteGroupAnnouncementRequest): Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.deleteGroupAnnouncement,
            pathFormated: ApiPaths.groups.deleteGroupAnnouncement.path.replace('{groupId}', groupId),
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);

        return queryResult;

    }

    /**
     * Returns a list of audit logs for a Group.
     * @param param request parameters for the request
     */
    public async getGroupAuditLogs({
        groupId, 
        n,  // 1 to 100
        offset, // 0 to infinity
        startDate, 
        endDate,    
    }: VRCAPI.Groups.Requests.getGroupAuditLogsRequest): Promise<VRCAPI.Groups.Models.GroupAudit> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (n) {
            if (n >= 1 && n <= 100) {
                parameters.append('n', n.toString());
            } else {
                parameters.append('n', '60');
            }
        } else {
            parameters.append('n', '60');
        }

        if (offset) {
            if (offset >= 0) {
                parameters.append('offset', offset.toString());
            } else {
                console.warn('Offset must be greater than 0! Setting offset to 0.');
                parameters.append('offset', '0');
            }
        }

        if (startDate) {
            parameters.append('startDate', startDate);
        }

        if (endDate) {
            parameters.append('endDate', endDate);
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupAuditLogs,
            pathFormated: ApiPaths.groups.getGroupAuditLogs.path.replace('{groupId}', groupId),
            queryOptions: parameters,
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupAudit>(paramRequest);

        return queryResult;

    }

    /**
     * Returns a list of banned users for a Group.
     * @param param0  The parameters for the request.
     * @returns A list of banned users for the Group.
     */
    public async getGroupBans({
        groupId,
        n, // 1 to 100
        offset 
    }:VRCAPI.Groups.Requests.GetBannedUsersRequest): Promise<VRCAPI.Groups.Models.GroupMember[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        // check parameters
        if (n) {
            if (n >= 1 && n <= 100) {
                parameters.append('n', n.toString());
            } else {
                console.warn('n must be between 1 and 100! Setting n to 60.');
                
                parameters.append('n', '60');
            }
        } else {
            parameters.append('n', '60');
        }

        if (offset) {
            if (offset >= 0) {
                parameters.append('offset', offset.toString());
            } else {
                console.warn('Offset must be greater than 0! Setting offset to 0.');
                parameters.append('offset', '0');
            }
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupBans,
            pathFormated: ApiPaths.groups.getGroupBans.path.replace('{groupId}', groupId),
            queryOptions: parameters,
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupMember[]>(paramRequest);

        return queryResult;

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
    }:VRCAPI.Groups.Requests.BanGroupMemberRequest): Promise<VRCAPI.Groups.Models.GroupMember> {


        if (userId.length <= 0) return Promise.reject(new Error('userId is too short!'));

        const body: VRCAPI.Generics.dataKeysGroupBanMember = {
            userId: userId,
        }
        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.banGroupMember,
            pathFormated: ApiPaths.groups.banGroupMember.path.replace('{groupId}', groupId),
            body: body
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupMember>(paramRequest);

        return queryResult;

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

        if (userId.length <= 0) return Promise.reject(new Error('userId is too short!'));

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.unbanGroupMember,
            pathFormated: ApiPaths.groups.unbanGroupMember.path.replace('{groupId}', groupId).replace('{userId}', userId),
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupMember>(paramRequest);

        return queryResult;

    }

    /**
     * Creates a gallery for a Group.
     * @param param0 The parameters for the request.
     * @returns A GroupGallery object.
     */
    public async createGroupGallery({
        groupId,
        name, // min 1 character
        description,
        membersOnly,
        roleIdsToView,
        roleIdsToSubmit,
        roleIdsToAutoApprove,
        roleIdsToManage
    }: VRCAPI.Groups.Requests.createGroupGalleryRequest): Promise<VRCAPI.Groups.Models.GroupGallery> {

        if (name && name.length < 1) return Promise.reject(new Error('Name must be at least 1 character!'));

        const body: VRCAPI.Generics.dataKeysGroupCreateGallery = {
            name: name,
        }
        
        // check parameters
        if (description && description.length >= 0) {
            body.description = description;
        }

        if (membersOnly) {
            body.membersOnly = membersOnly;
        }

        if (roleIdsToView) {
            body.roleIdsToView = roleIdsToView;
        }

        if (roleIdsToSubmit) {
            body.roleIdsToSubmit = roleIdsToSubmit;
        }

        if (roleIdsToAutoApprove) {
            body.roleIdsToAutoApprove = roleIdsToAutoApprove;
        }

        if (roleIdsToManage) {
            body.roleIdsToManage = roleIdsToManage;
        }
        

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.createGroupGallery,
            pathFormated: ApiPaths.groups.createGroupGallery.path.replace('{groupId}', groupId),
            body: body
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupGallery>(paramRequest);

        return queryResult;

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
            if (n >= 1 && n <= 100) {
                parameters.append('n', n.toString());
            } else {
                console.warn('n must be between 1 and 100! Setting n to 60.');
                
                parameters.append('n', '60');
            }
        } else {
            parameters.append('n', '60');
        }

        if (offset) {
            if (offset >= 0) {
                parameters.append('offset', offset.toString());
            } else {
                console.warn('Offset must be greater than 0! Setting offset to 0.');
                parameters.append('offset', '0');
            }
        }

        if (approved) {
            parameters.append('approved', approved.toString());
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupGalleryImages,
            pathFormated: ApiPaths.groups.getGroupGalleryImages.path.replace('{groupId}', groupId).replace('{groupGalleryId}', groupGalleryId),
            queryOptions: parameters,
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupGalleryImage[]>(paramRequest);

        return queryResult;

    }

    /**
     * Updates a gallery for a Group.
     * @param param0 
     * @returns 
     */
    public async updateGroupGallery({
        groupId,
        groupGalleryId,
        name, // min 1 character
        description,
        membersOnly,
        roleIdsToView,
        roleIdsToSubmit,
        roleIdsToAutoApprove,
        roleIdsToManage
    }: VRCAPI.Groups.Requests.UpdateGroupGalleryRequest): Promise<VRCAPI.Groups.Models.GroupGallery> {

        
        const body: VRCAPI.Generics.dataKeysGroupUpdateGallery = {}

        if (name) {
            if (name.length < 1) return Promise.reject(new Error('Name must be at least 1 character!'));
            body.name = name;
        }
        
        // check parameters
        if (description && description.length >= 0) {
            body.description = description;
        }

        if (membersOnly) {
            body.membersOnly = membersOnly;
        }

        if (roleIdsToView) {
            body.roleIdsToView = roleIdsToView;
        }

        if (roleIdsToSubmit) {
            body.roleIdsToSubmit = roleIdsToSubmit;
        }

        if (roleIdsToAutoApprove) {
            body.roleIdsToAutoApprove = roleIdsToAutoApprove;
        }

        if (roleIdsToManage) {
            body.roleIdsToManage = roleIdsToManage;
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.updateGroupGallery,
            pathFormated: ApiPaths.groups.updateGroupGallery.path.replace('{groupId}', groupId).replace('{groupGalleryId}', groupGalleryId),
            body: body
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupGallery>(paramRequest);

        return queryResult;

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

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);

        return queryResult;

    }

    // Adds an image to a Group gallery.
    public async addGroupGalleryImage({
        groupId,
        groupGalleryId,
        fileId
    }: VRCAPI.Groups.Requests.AddGroupGalleryImagesRequest): Promise<VRCAPI.Groups.Models.GroupGalleryImage> {

        const body: VRCAPI.Generics.dataKeysAddGroupGalleryImage = {
            fileId: fileId,
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.addGroupGalleryImage,
            pathFormated: ApiPaths.groups.addGroupGalleryImage.path.replace('{groupId}', groupId).replace('{groupGalleryId}', groupGalleryId),
            body: body
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupGalleryImage>(paramRequest);

        return queryResult;

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

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);

        return queryResult;

    }

    /**
     * Returns a list of members that have been invited to the Group.
     * @param param0 
     * @returns 
     */
    public async getGroupInvitesSent({groupId}: VRCAPI.Groups.Requests.GetGroupInvitesSentRequest): Promise<VRCAPI.Groups.Models.GroupMember[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupInvitesSent,
            pathFormated: ApiPaths.groups.getGroupInvitesSent.path.replace('{groupId}', groupId),
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupMember[]>(paramRequest);

        return queryResult;

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

        const body: VRCAPI.Generics.dataKeysCreateGroupInvite = {
            userId: userId,
        }

        if (confirmOverrideBlock) {
            body.confirmOverrideBlock = confirmOverrideBlock;
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.inviteUserToGroup,
            pathFormated: ApiPaths.groups.inviteUserToGroup.path.replace('{groupId}', groupId),
            body: body
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<boolean>(paramRequest);

        return queryResult;


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

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<boolean>(paramRequest);

        return queryResult;


    }

    /**
     * Join a Group by ID and returns the member object.
     * @param param0 
     * @returns 
     */
    public async joinGroup({groupId}: VRCAPI.Groups.Requests.joinGroupRequest): Promise<VRCAPI.Groups.Models.GroupMember[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.joinGroup,
            pathFormated: ApiPaths.groups.joinGroup.path.replace('{groupId}', groupId),
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupMember[]>(paramRequest);

        return queryResult;

    }

    /**
     * Leave a group by ID.
     * @param param0 
     * @returns 
     */
    public async leaveGroup({groupId}: VRCAPI.Groups.Requests.leaveGroupRequest): Promise<boolean> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.leaveGroup,
            pathFormated: ApiPaths.groups.leaveGroup.path.replace('{groupId}', groupId),
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<boolean>(paramRequest);

        return queryResult;

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
        offset
    }: VRCAPI.Groups.Requests.listGroupMembersRequest): Promise<VRCAPI.Groups.Models.GroupMember[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        // check parameters
        if (n) {
            if (n >= 1 && n <= 100) {
                parameters.append('n', n.toString());
            } else {
                console.warn('n must be between 1 and 100! Setting n to 60.');
                
                parameters.append('n', '60');
            }
        } else {
            parameters.append('n', '60');
        }

        if (offset) {
            if (offset >= 0) {
                parameters.append('offset', offset.toString());
            } else {
                console.warn('Offset must be greater than 0! Setting offset to 0.');
                parameters.append('offset', '0');
            }
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.listGroupMembers,
            pathFormated: ApiPaths.groups.listGroupMembers.path.replace('{groupId}', groupId),
            queryOptions: parameters,
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupMember[]>(paramRequest);

        return queryResult;

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

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupMemberLimitedUser>(paramRequest);

        return queryResult;

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

        // at least one attribute must be set
        if (!visibility && !isSubscribedToAnnouncements && !managerNotes) {
            throw new Error('At least one attribute must be set!');
        }

        const body: VRCAPI.Generics.dataKeysUpdateGroupMember = {}

        // check visibility
        if (visibility) {
            if (!Object.values(GroupUserVisibility).includes(visibility)) {
                console.warn('Visibility must be one of the following: 0 - Public, 1 - Private! Parameter ommited! Defaulted to "0 - Public"');
            }
            body.visibility = visibility;
        }

        // check isSubscribedToAnnouncements
        if (isSubscribedToAnnouncements) {
            body.isSubscribedToAnnouncements = isSubscribedToAnnouncements;
        }

        // check managerNotes
        if (managerNotes) {
            body.managerNotes = managerNotes;
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.updateGroupMember,
            pathFormated: ApiPaths.groups.updateGroupMember.path.replace('{groupId}', groupId).replace('{userId}', userId),
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupMemberLimitedUser>(paramRequest);

        return queryResult;

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

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<boolean>(paramRequest);

        return queryResult;

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

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<string[]>(paramRequest);

        return queryResult;

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

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<string[]>(paramRequest);

        return queryResult;

    }

    /**
     * Returns a List of all possible/available permissions for a Group.
     * @param param0 
     * @returns 
     */
    public async listGroupPermissions({groupId}: VRCAPI.Groups.Requests.listGroupPermissionsRequest): Promise<VRCAPI.Groups.Models.GroupPermission[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.listGroupPermissions,
            pathFormated: ApiPaths.groups.listGroupPermissions.path.replace('{groupId}', groupId),
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupPermission[]>(paramRequest);

        return queryResult;

    }

    /**
     * Returns a list of members that have requested to join the Group.
     * @param param0 
     * @returns 
     */
    public async getGroupJoinRequests({groupId}: VRCAPI.Groups.Requests.getGroupJoinRequestsRequest): Promise<VRCAPI.Groups.Models.GroupMember[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupJoinRequests,
            pathFormated: ApiPaths.groups.getGroupJoinRequests.path.replace('{groupId}', groupId),
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupMember[]>(paramRequest);

        return queryResult;

    }

    /**
     * Cancels a request sent to join the group.
     * @param param0 
     * @returns 
     */
    public async cancelGroupJoinRequest({groupId}: VRCAPI.Groups.Requests.cancelGroupJoinRequestRequest): Promise<boolean> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.cancelGroupJoinRequest,
            pathFormated: ApiPaths.groups.cancelGroupJoinRequest.path.replace('{groupId}', groupId),
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<boolean>(paramRequest);

        return queryResult;

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

        //check action must be either 'Accept' or 'Deny'
        if (!['Accept', 'Deny'].includes(action)) {
            throw new Error('Action must be either "Accept" or "Deny"!');
        }

        const body: VRCAPI.Generics.dataKeysRespondGroupJoinRequest = {
            action: action,
        }
        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.respondGroupJoinrequest,
            pathFormated: ApiPaths.groups.respondGroupJoinrequest.path.replace('{groupId}', groupId).replace('{userId}', userId),
            body: body
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<boolean>(paramRequest);

        return queryResult;

    }

    /**
     * Returns a Group Role by ID.
     * @param param0 
     * @returns 
     */
    public async getGroupRoles({groupId}: VRCAPI.Groups.Requests.getGroupRolesRequest): Promise<VRCAPI.Groups.Models.GroupRole[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.getGroupRoles,
            pathFormated: ApiPaths.groups.getGroupRoles.path.replace('{groupId}', groupId)
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupRole[]>(paramRequest);

        return queryResult;

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
        isSelfAssignable,
        permissions
    }: VRCAPI.Groups.Requests.createGroupRoleRequest): Promise<VRCAPI.Groups.Models.GroupRole> {

        const body: VRCAPI.Generics.dataKeysCreateGroupRole = {
            id: "new",
        }

        // check parameters
        if (name.length < 1) return Promise.reject(new Error('Name must be at least 1 character!'));
        body.name = name;

        if (description && description.length >= 0) {
            body.description = description;
        }

        if (isSelfAssignable) {
            body.isSelfAssignable = isSelfAssignable;
        } else {
            body.isSelfAssignable = false;
        }

        if (permissions) {
            body.permissions = permissions;
        } else {
            body.permissions = [];
        }

        
        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.createGroupRole,
            pathFormated: ApiPaths.groups.createGroupRole.path.replace('{groupId}', groupId),
            body: body
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupRole>(paramRequest);

        return queryResult;

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
        isSelfAssignable,
        permissions,
        order
    }: VRCAPI.Groups.Requests.updateGroupRoleRequest): Promise<VRCAPI.Groups.Models.GroupRole[]> {

        const body: VRCAPI.Generics.dataKeysUpdateGroupRole = {}

        // check parameters
        if (name && name.length < 1) return Promise.reject(new Error('Name must be at least 1 character!'));
        if (name) body.name = name;

        if (description && description.length >= 0) {
            body.description = description;
        }

        if (isSelfAssignable) {
            body.isSelfAssignable = isSelfAssignable;
        } else {
            body.isSelfAssignable = false;
        }

        if (permissions) {
            body.permissions = permissions;
        } else {
            body.permissions = [];
        }

        if (order) {
            body.order = order;
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.groups.updateGroupRole,
            pathFormated: ApiPaths.groups.updateGroupRole.path.replace('{groupId}', groupId).replace('{groupRoleId}', groupRoleId),
            body: body
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupRole[]>(paramRequest);

        return queryResult;

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

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.GroupRole[]>(paramRequest);

        return queryResult;

    }


}