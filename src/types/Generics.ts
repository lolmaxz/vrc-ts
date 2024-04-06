import { createAvatarOption, updateAvatarOption } from './Avatars';
import {
    GetLicenseGroupRequest,
    GetLicenseRequest,
    GetOwnPurchasesRequest,
    GetOwnTransactionsRequest,
    GetProductListingRequest,
    GetSteamTransactionRequest,
    GetTiliaTOSRequest,
    GetUserBalanceRequest,
} from './Economy';
import { dataKeysFavoriteTypes } from './Favorites';
import { dataKeysCreateFile, dataKeysCreateFileVersion, dataKeysFinishFileDataUpload } from './Files';
import {
    createGroupRequest,
    searchGroupRequest,
    dataKeysAddGroupGalleryImage,
    dataKeysCreateGroupAnnouncement,
    dataKeysCreateGroupInvite,
    dataKeysCreateGroupRole,
    dataKeysGroupBanMember,
    dataKeysGroupCreateGallery,
    dataKeysGroupUpdateGallery,
    dataKeysRespondGroupJoinRequest,
    dataKeysUpdateGroup,
    dataKeysUpdateGroupMember,
    dataKeysUpdateGroupRole,
} from './Groups';
import { CreateRegularInstanceRequest } from './Instances';
import {
    dataKeysInviteResponse,
    dataKeysRequestInvite,
    dataKeysSendInvite,
    dataKeysUpdateInviteMessage,
} from './Invites';
import { dataKeysModerateUserRequest, dataKeysUnModerateUser } from './PlayerModeration';
import { dataKeysUpdateUser } from './Users';
import { dataKeysCreateWorld, dataKeysUpdateWorld } from './Worlds';

export interface requestConfig {
    username?: string;
    password?: string;
    baseOptions?: unknown;
}

export type executeRequestType = {
    currentRequest: subSectionType;
    pathFormated: string;
    queryOptions?: URLSearchParams;
    body?: dataSetKeys;
};

export type AuthenticationResponse = {
    ok?: boolean;
    requiresTwoFactorAuth?: ['totp', 'otp'] | ['emailOtp'];
    verified?: boolean;
    error?: { message: string; status_code: number };
};

export type requestType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type VRCRequest = {
    method: requestType;
    headers: headerOptions;
    body?: string;
};

export type headerOptions = {
    Authorization?: `Basic ${string}`;
    'User-Agent': string;
    'Content-Type'?: string;
    cookie?: string;
};

export type error2fa = { requiresTwoFactorAuth: ['totp', 'otp'] };
export type error2faEmail = { requiresTwoFactorAuth: ['emailOtp'] };
export type error2FABase = error2fa | error2faEmail;
export type twoFactorAuthResponseType = {
    verified?: boolean;
    requiresTwoFactorAuth?: ['totp', 'otp'] | ['emailOtp'];
};

export type authRequest = API<AuthenticationResponse, error2FABase | RequestError>;

// type auth2FARequest = API<AuthenticationResponse, { verified: boolean }>;

export type RequestSuccess = {
    success: {
        message: string;
        status_code: number;
    };
};

export type RequestError = {
    error: {
        message: string;
        status_code: number;
    };
};

export interface APIResponse<T> extends Omit<Response, 'ok' | 'json'> {
    ok: true;
    json(): Promise<T>;
}

export interface APIErrorResponse<E> extends Omit<Response, 'ok' | 'json'> {
    ok: false;
    json(): Promise<E>;
}

export type API<T, E> = APIResponse<T> | APIErrorResponse<E>;

export type QueryParamsList = { name: string; value: string }[];

// --- valid and error types here ---

export type VRCResponseValidType = twoFactorAuthResponseType | RequestSuccess | AuthenticationResponse;

export type VRCResponseError = RequestError | error2FABase;

export type VRCAPIResponse = API<VRCResponseValidType, VRCResponseError>;

// ---------------------------------

export type querryParamsType =
    | 'avatarId'
    | 'transactionId'
    | 'userId'
    | 'worldId'
    | 'licenseGroupId'
    | 'favoriteId'
    | 'favoriteGroupType'
    | 'favoriteGroupName'
    | 'fileId'
    | 'versionId'
    | 'fileType'
    | 'groupId'
    | 'postId'
    | 'groupGalleryId'
    | 'groupGalleryImageId'
    | 'groupRoleId'
    | 'instanceId'
    | 'notificationId'
    | 'messageType'
    | 'slot'
    | 'shortName'
    | 'permissionId'
    | 'playerModerationId'
    | 'username'
    | 'productId'
    | 'licenseId';

export type subSectionType = {
    path: string;
    method: requestType;
    cookiesNeeded: ('authCookie' | 'authorization' | 'twoFactorAuth' | 'none')[];
    requiredQueryParams?: querryParamsType[];
    deprecated?: boolean;
    requiresData?: boolean;
    notImplemented?: boolean;
};

export type subSectionPath = {
    [subsection: string]: subSectionType;
};

export type APIPaths = {
    apiBasePath: string;
    auth: {
        userExist: subSectionType;
        getCurrentUserInfo: subSectionType;
        verify2FATOTP: subSectionType;
        verify2FAOTP: subSectionType;
        verify2FAEmail: subSectionType;
        verifyAuthToken: subSectionType;
        logout: subSectionType;
        deleteUser: subSectionType;
    };
    avatars: {
        getOwnAvatar: subSectionType;
        searchAvatars: subSectionType;
        createAvatar: subSectionType;
        getAvatar: subSectionType;
        updateAvatar: subSectionType;
        deleteAvatar: subSectionType;
        selectAvatar: subSectionType;
        selectFallbackAvatar: subSectionType;
        listFavoritedAvatars: subSectionType;
    };
    economy: {
        listSteamTransactions: subSectionType;
        getSteamTransaction: subSectionType;
        getCurrentSubscriptions: subSectionType;
        listSubscriptions: subSectionType;
        getLicenseGroup: subSectionType;
        getProductListing: subSectionType;
        getOwnSubscription: subSectionType;
        getTiliaTOS: subSectionType;
        getOwnPurchases: subSectionType;
        getOwnTransactions: subSectionType;
        getTiliaSyncData: subSectionType;
        getBalance: subSectionType;
        getLicenses: subSectionType;
    };
    favorites: {
        listFavorites: subSectionType;
        addFavorite: subSectionType;
        showFavorite: subSectionType;
        removeFavorite: subSectionType;
        listFavoriteGroups: subSectionType;
        showFavoriteGroup: subSectionType;
        updateFavoriteGroup: subSectionType;
        clearFavoriteGroup: subSectionType;
    };
    files: {
        listFiles: subSectionType;
        createFile: subSectionType;
        showFile: subSectionType;
        createFileVersion: subSectionType;
        deleteFile: subSectionType;
        downloadFileVersion: subSectionType;
        deleteFileVersion: subSectionType;
        finishFileDataUpload: subSectionType;
        startFileDataUpload: subSectionType;
        checkFileDataUploadStatus: subSectionType;
    };
    friends: {
        listFriends: subSectionType;
        sendFriendRequest: subSectionType;
        deleteFriendRequest: subSectionType;
        checkFriendStatus: subSectionType;
        unfriend: subSectionType;
    };
    groups: {
        searchGroups: subSectionType;
        createGroup: subSectionType;
        getGroupById: subSectionType;
        updateGroup: subSectionType;
        deleteGroup: subSectionType;
        getGroupAnnouncement: subSectionType;
        createGroupAnnouncement: subSectionType;
        deleteGroupAnnouncement: subSectionType;
        getGroupPosts: subSectionType;
        createGroupPost: subSectionType;
        deleteGroupPost: subSectionType;
        getGroupAuditLogs: subSectionType;
        getGroupBans: subSectionType;
        banGroupMember: subSectionType;
        unbanGroupMember: subSectionType;
        createGroupGallery: subSectionType;
        getGroupGalleryImages: subSectionType;
        updateGroupGallery: subSectionType;
        deleteGroupGallery: subSectionType;
        addGroupGalleryImage: subSectionType;
        deleteGroupGalleryImage: subSectionType;
        getGroupInvitesSent: subSectionType;
        inviteUserToGroup: subSectionType;
        deleteUserInvite: subSectionType;
        joinGroup: subSectionType;
        leaveGroup: subSectionType;
        listGroupMembers: subSectionType;
        getGroupMember: subSectionType;
        updateGroupMember: subSectionType;
        kickGroupMember: subSectionType;
        addRoleToGroupMember: subSectionType;
        removeRoleFromGroupMember: subSectionType;
        listGroupPermissions: subSectionType;
        getGroupJoinRequests: subSectionType;
        cancelGroupJoinRequest: subSectionType;
        respondGroupJoinrequest: subSectionType;
        getGroupRoles: subSectionType;
        createGroupRole: subSectionType;
        updateGroupRole: subSectionType;
        deleteGroupRole: subSectionType;
    };
    invites: {
        inviteUser: subSectionType;
        inviteMyselfToInstance: subSectionType;
        requestInvite: subSectionType;
        respondInvite: subSectionType;
        listInviteMessages: subSectionType;
        getInviteMessage: subSectionType;
        updateInviteMessage: subSectionType;
        resetInviteMessage: subSectionType;
    };
    instances: {
        getInstance: subSectionType;
        getInstanceShortName: subSectionType;
        sendSelfInvite: subSectionType;
        getInstanceByShortName: subSectionType;
        createInstance: subSectionType;
    };
    notifications: {
        listNotifications: subSectionType;
        acceptFriendRequest: subSectionType;
        markNotificationAsRead: subSectionType;
        deleteNotification: subSectionType;
        clearAllNotifications: subSectionType;
    };
    permissions: {
        getAssignedPermissions: subSectionType;
        getPermission: subSectionType;
    };
    playermoderations: {
        searchPlayerModerations: subSectionType;
        moderateUser: subSectionType;
        clearAllPlayerModerations: subSectionType;
        getPlayerModeration: subSectionType;
        deletePlayerModeration: subSectionType;
        unmoderateUser: subSectionType;
    };
    system: {
        fetchAPIConfig: subSectionType;
        showInformationNotices: subSectionType;
        downloadCSS: subSectionType;
        downloadJavaScript: subSectionType;
        checkAPIHealth: subSectionType;
        currentOnlineUsers: subSectionType;
        currentSystemTime: subSectionType;
    };
    users: {
        searchAllUsers: subSectionType;
        getUserbyUsername: subSectionType;
        getUserbyID: subSectionType;
        updateUserInfo: subSectionType;
        getUserGroups: subSectionType;
        getUserGroupRequests: subSectionType;
        getUserRepresentedGroup: subSectionType;
    };
    worlds: {
        searchAllWorlds: subSectionType;
        createWorld: subSectionType;
        listActiveWorlds: subSectionType;
        listFavoritedWorlds: subSectionType;
        listRecentWorlds: subSectionType;
        getWorldbyID: subSectionType;
        updateWorld: subSectionType;
        deleteWorld: subSectionType;
        getWorldMetadata: subSectionType;
        getWorldPublishStatus: subSectionType;
        publishWorld: subSectionType;
        unpublishWorld: subSectionType;
        getWorldInstance: subSectionType;
    };
};

export type dataSetKeys =
    | dataKeys2Fa
    | createAvatarOption
    | updateAvatarOption
    | dataKeysFavoriteTypes
    | dataKeysCreateFile
    | dataKeysCreateFileVersion
    | dataKeysFinishFileDataUpload
    | searchGroupRequest
    | createGroupRequest
    | dataKeysUpdateGroup
    | dataKeysCreateGroupAnnouncement
    | dataKeysGroupBanMember
    | dataKeysGroupCreateGallery
    | dataKeysGroupUpdateGallery
    | dataKeysAddGroupGalleryImage
    | dataKeysCreateGroupInvite
    | dataKeysUpdateGroupMember
    | dataKeysRespondGroupJoinRequest
    | dataKeysCreateGroupRole
    | dataKeysUpdateGroupRole
    | CreateRegularInstanceRequest
    | dataKeysSendInvite
    | dataKeysRequestInvite
    | dataKeysInviteResponse
    | dataKeysUpdateInviteMessage
    | dataKeysModerateUserRequest
    | dataKeysUnModerateUser
    | dataKeysUpdateUser
    | dataKeysCreateWorld
    | dataKeysUpdateWorld
    | GetSteamTransactionRequest
    | GetLicenseGroupRequest
    | GetProductListingRequest
    | GetOwnPurchasesRequest
    | GetOwnTransactionsRequest
    | GetTiliaTOSRequest
    | GetUserBalanceRequest
    | GetLicenseRequest;

export type dataKeys2Fa = {
    code: string;
};

export type FavoriteGroupTags = 'group_0' | 'group_1' | 'group_2' | 'group_3';
export type FavoriteAvatarTags = 'avatar1' | 'avatar2' | 'avatar3' | 'avatar4';
export type FavoriteWorldTags = 'world1' | 'world2' | 'world3' | 'world4';
export type allFavoriteTags = FavoriteGroupTags | FavoriteAvatarTags | FavoriteWorldTags;

export type AdminTags =
    | 'admin_avatar_access'
    | 'admin_can_grant_licenses'
    | 'admin_canny_access'
    | 'admin_lock_tags'
    | 'admin_lock_level'
    | 'admin_moderator'
    | 'admin_official_thumbnail'
    | 'admin_scripting_access'
    | 'admin_world_access';

export type SystemTags =
    | 'system_avatar_access'
    | 'system_early_adopter'
    | 'system_feedback_access'
    | 'system_probable_troll'
    | 'system_supporter'
    | 'system_legend'
    | 'system_troll'
    | 'system_trust_basic'
    | 'system_trust_known'
    | 'system_trust_trusted'
    | 'system_trust_veteran'
    | 'system_trust_intermediate'
    | 'system_trust_advanced'
    | 'system_trust_legend'
    | 'system_world_access'
    | 'Visitor';

export type WorldTags =
    | 'author_tag_avatar'
    | 'author_tag_game'
    | 'admin_featured'
    | 'admin_approved'
    | 'admin_avatar_world'
    | 'admin_community_spotlight'
    | 'admin_hidden'
    | 'admin_hide_active'
    | 'admin_hide_new'
    | 'admin_hide_popular'
    | 'debug_allowed'
    | 'system_approved'
    | 'system_created_recently'
    | 'system_labs'
    | 'system_updated_recently';

export type LanguageTags =
    | 'language_eng'
    | 'language_kor'
    | 'language_rus'
    | 'language_spa'
    | 'language_por'
    | 'language_zho'
    | 'language_deu'
    | 'language_jpn'
    | 'language_fra'
    | 'language_swe'
    | 'language_nld'
    | 'language_pol'
    | 'language_dan'
    | 'language_nor'
    | 'language_ita'
    | 'language_tha'
    | 'language_fin'
    | 'language_hun'
    | 'language_ces'
    | 'language_tur'
    | 'language_ara'
    | 'language_ron'
    | 'language_vie';

export type languageTagsShort =
    | 'eng'
    | 'kor'
    | 'rus'
    | 'spa'
    | 'por'
    | 'zho'
    | 'deu'
    | 'jpn'
    | 'fra'
    | 'swe'
    | 'nld'
    | 'pol'
    | 'dan'
    | 'nor'
    | 'ita'
    | 'tha'
    | 'fin'
    | 'hun'
    | 'ces'
    | 'tur'
    | 'ara'
    | 'ron'
    | 'vie';

export type GroupAdminTags = 'admin_hide_member_count';

export type UselessTags =
    | 'system_neuralink_beta'
    | 'system_extremely_cool_guy'
    | 'system_stop_being_nosy'
    | 'system_notamod'
    | 'system_no_seriously_im_not_a_mod_how_many_times_do_i_have_to_tell_people'
    | 'system_the_tag_is_just_named_that'
    | 'system_haha_you_have_to_document_this_one_too'
    | 'system_legen_wait_for_it_dary'
    | 'system_cute_robot';

export type AllTags = AdminTags | SystemTags | WorldTags | LanguageTags | GroupAdminTags | UselessTags;
