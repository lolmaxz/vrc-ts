import { createAvatarOption, dataKeysCreateImpostor, dataKeysDeleteImpostor, updateAvatarOption } from './Avatars';
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
    dataKeyCreateGroupEventRequest,
    dataKeyFollowGroupEventRequest,
    dataKeysAddGroupGalleryImage,
    dataKeysCreateGroupAnnouncement,
    dataKeysCreateGroupInvite,
    dataKeysCreateGroupRole,
    dataKeysEditGroupEvent,
    dataKeysEditGroupPost,
    dataKeysGroupBanMember,
    dataKeysGroupCreateGallery,
    dataKeysGroupUpdateGallery,
    dataKeysRespondGroupJoinRequest,
    dataKeysUpdateGroup,
    dataKeysUpdateGroupMember,
    dataKeysUpdateGroupRole,
    searchGroupRequest,
} from './Groups';
import {
    CreateRegularInstanceRequest,
    dataKeysCreateGroupInstance,
    InstanceRegionType,
    InstanceType,
} from './Instances';
import {
    dataKeysInviteResponse,
    dataKeysRequestInvite,
    dataKeysSendInvite,
    dataKeysUpdateInviteMessage,
} from './Invites';
import { dataKeysRespondToNotificationRequest } from './Notifications';
import { dataKeysModerateUserRequest, dataKeysUnModerateUser } from './PlayerModeration';
import { dataKeysGetUserSubmittedFeedback, dataKeysUpdateUser, dataKeysUpdateUserNote } from './Users';
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
export type twoFactorAuthResponseType = (RequestSuccess | APIRequestError) & {
    verified?: boolean;
    requiresTwoFactorAuth?: ['totp', 'otp'] | ['emailOtp'];
};

export type authRequest = API<AuthenticationResponse, error2FABase | APIRequestError>;

// type auth2FARequest = API<AuthenticationResponse, { verified: boolean }>;

export type RequestSuccess = {
    success: {
        message: string;
        status_code: number;
    };
};

export type APIRequestError = {
    error: {
        message: string;
        status_code: number;
    };
};

export interface APIResponse<T> extends Omit<Response, 'ok' | 'json'> {
    ok: boolean;
    json(): Promise<T>;
}

export interface APIErrorResponse<E> extends Omit<Response, 'ok' | 'json'> {
    ok: boolean;
    json(): Promise<E>;
}

export type API<T, E> = APIResponse<T> | (APIErrorResponse<E> | APIErrorResponse<unknown>);

export type QueryParamsList = { name: string; value: string }[];

// --- valid and error types here ---

export type VRCResponseValidType = twoFactorAuthResponseType | RequestSuccess | AuthenticationResponse;

export type VRCResponseError = APIRequestError | error2FABase;

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
    | 'licenseId'
    | 'jamId'
    | 'noteId'
    | 'calendarId';

export type subSectionType = {
    path: string;
    method: requestType;
    cookiesNeeded: ('authCookie' | 'authorization' | 'twoFactorAuth' | 'none')[];
    requiredQueryParams?: querryParamsType[];
    deprecated?: boolean;
    requiresData?: boolean;
    notImplemented?: boolean;
    secondPath?: boolean;
};

export type subSectionPath = {
    [subsection: string]: subSectionType;
};

export type APIPaths = {
    apiBasePath: string;
    apiBasePath2: string;
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
        getImpostorQueueStats: subSectionType;
        generateImpostor: subSectionType;
        deleteImpostor: subSectionType;
    };
    beta: {
        getIOSClosedBetaInformation: subSectionType;
    };
    economy: {
        listSteamTransactions: subSectionType;
        getSteamTransaction: subSectionType;
        getCurrentSubscriptions: subSectionType;
        listSubscriptions: subSectionType;
        getLicenseGroup: subSectionType;
        getProductListing: subSectionType;
        getUserProductListings: subSectionType;
        listTokenBundles: subSectionType;
        getTiliaStatus: subSectionType;
        getTiliaTOS: subSectionType;
        getOwnPurchases: subSectionType;
        getOwnTransactions: subSectionType;
        getTiliaSyncData: subSectionType;
        getBalance: subSectionType;
        getLicenses: subSectionType;
        getInfoPush: subSectionType;
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
        getFavoriteLimits: subSectionType;
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
        getFileVersionAnalysis: subSectionType;
        getFileVersionAnalysisSecurity: subSectionType;
        getFileVersionAnalysisStandard: subSectionType;
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
        editGroupPost: subSectionType;
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
        getGroupInstances: subSectionType;
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
        followGroupEvent: subSectionType;
        getGroupEvents: subSectionType;
        getGroupEvent: subSectionType;
        getGroupNextEvent: subSectionType;
        createGroupEvent: subSectionType;
        updateGroupEvent: subSectionType;
        deleteGroupEvent: subSectionType;
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
        createNormalInstance: subSectionType;
        createGroupInstance: subSectionType;
    };
    jams: {
        getJamsList: subSectionType;
        getJamInfo: subSectionType;
        getJamSubmissions: subSectionType;
    };
    medias: {
        getUserIcons: subSectionType;
        getUserEmojis: subSectionType;
        getUserPhotos: subSectionType;
        getUserStickers: subSectionType;
    };
    notifications: {
        listNotifications: subSectionType;
        acceptFriendRequest: subSectionType;
        markNotificationAsRead: subSectionType;
        deleteNotification: subSectionType;
        clearAllNotifications: subSectionType;
        respondToNotification: subSectionType;
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
    prints: {
        listPrints: subSectionType;
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
        getUserFeedback: subSectionType;
        getAllUserNotes: subSectionType;
        updateUserNote: subSectionType;
        getAUserNote: subSectionType;
        getUserGroupInstances: subSectionType;
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
        getContentRestricted: subSectionType;
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
    | dataKeysEditGroupPost
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
    | GetLicenseRequest
    | dataKeysCreateGroupInstance
    | dataKeysGetUserSubmittedFeedback
    | dataKeysUpdateUserNote
    | dataKeysRespondToNotificationRequest
    | dataKeysCreateImpostor
    | dataKeysDeleteImpostor
    | dataKeyCreateGroupEventRequest
    | dataKeysEditGroupEvent
    | dataKeyFollowGroupEventRequest;

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
    | 'admin_world_access'
    | 'admin_age_verification_enabled'; // new tag

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
    | 'system_updated_recently'
    | 'feature_prints_disabled'
    | 'feature_drones_disabled'
    | 'feature_pedestals_disabled'
    | 'feature_stickers_disabled'
    | 'feature_emoji_disabled';

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

export enum LanguageTypes {
    Afrikaans = 'afr',
    American_Sign_Language = 'ase',
    Arabic = 'ara',
    Auslan_Australian_Sign_Language = 'asf',
    Bengali = 'ben',
    British_Sign_Language = 'bfi',
    /** Needs more research ↓ */
    Bulgarian = 'bul',
    Czech = 'ces',
    Mandarin = 'cmn',
    Welsh = 'cym',
    German = 'deu',
    Danish = 'dan',
    Dutch_Sign_Language = 'dse',
    Greek = 'ell',
    English = 'eng',
    Esperanto = 'epo',
    Estonian = 'est',
    Filipino = 'fil',
    Finnish = 'fin',
    French = 'fra',
    French_Sign_Language = 'fse',
    Gaelic = 'gla',
    Irish = 'gle',
    German_Sign_Language = 'gsg',
    Hebrew = 'heb',
    Hindi = 'hin',
    Hmong = 'hmn',
    Croatian = 'hrv',
    Hungarian = 'hun',
    Armenian = 'hye',
    Indonesian = 'ind',
    Icelandic = 'isl',
    Italian = 'ita',
    Japanese = 'jpn',
    Japanese_Sign_Language = 'jsl',
    Korean = 'kor',
    Korean_Sign_Language = 'kvk',
    Latvian = 'lav',
    Lithuanian = 'lit',
    Luxembourgish = 'ltz',
    Marathi = 'mar',
    Macedonian = 'mkd',
    Maltese = 'mlt',
    Maori = 'mri',
    Malay = 'msa',
    Dutch = 'nld',
    Norwegian = 'nor',
    New_Zealand_Sign_Language = 'nzs',
    Polish = 'pol',
    Portuguese = 'por',
    Romanian = 'ron',
    Russian = 'rus',
    Scots = 'sco',
    Slovak = 'slk',
    Slovenian = 'slv',
    Spanish = 'spa',
    Swedish = 'swe',
    Telugu = 'tel',
    Thai = 'tha',
    Toki_Pona = 'tok',
    Turkish = 'tur',
    Teochew = 'tws',
    Ukrainian = 'ukr',
    Vietnamese = 'vie',
    Wu = 'wuu',
    Cantonese = 'yue',
    Chinese = 'zho',
    No_Linguistic_Content = 'zxx',
}

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

//-- ID Types ---
// export type LegacyUserID = `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}`;
// export type UserIdType = `usr_${string}-${string}-${string}-${string}-${string}`;

export type BaseId = `${string}-${string}-${string}-${string}-${string}`;

/**
 *  A user ID is a unique identifier for a user.
 * ```example: usr_c1644b5b-3ca4-45b4-97c6-a2a0de70d469``` OR ```1234567890```
 */
export type UserIdType = string; // Because of literal types, it's not possible to use both types at the same time. :/ (I think)
export type FriendRequestIdType = `frq_${string}-${string}-${string}-${string}-${string}`;
export type UserNoteIdType = `unt_${string}-${string}-${string}-${string}-${string}`;
export type PlayerModerationBlockIdType = `obl_${string}-${string}-${string}-${string}-${string}`;
export type PlayerModerationMuteIdType = `omu_${string}-${string}-${string}-${string}-${string}`;
export type PlayerModerationUnmuteIdType = `oun_${string}-${string}-${string}-${string}-${string}`;

export type PlayerModerationObjectIdType =
    | PlayerModerationBlockIdType
    | PlayerModerationMuteIdType
    | PlayerModerationUnmuteIdType; // According to result from VRChat's API, these is the correct ID type, instead of `pmod_xx-xx-xx-xx-xx`

export type PermissionIdType = `prms_${string}-${string}-${string}-${string}-${string}`;

export type WorldIdType = `wrld_${string}-${string}-${string}-${string}-${string}`;

/**
 * ```example: 12345~hidden(usr_c1644b5b-3ca4-45b4-97c6-a2a0de70d469)~region(eu)~nonce(27e8414a-59a0-4f3d-af1f-f27557eb49a2) ```
 * */
export type InstanceIdType =
    | `${number}~${InstanceType}(${UserIdType})~region(${InstanceRegionType})~nonce(${string}-${string}-${string}-${string}-${string})`
    | 'private' // If your friend is in a private instance
    | 'offline'; // If the user is not friend with you

export type AvatarIdType = `avtr_${string}-${string}-${string}-${string}-${string}`;

export type NotificationIdType = `not_${string}-${string}-${string}-${string}-${string}`;

export type FileIdType = `file_${string}-${string}-${string}-${string}-${string}`;
export type UnityPackageIdType = `unp_${string}-${string}-${string}-${string}-${string}`;

/**
 * Example Group ID: `grp_0c1b3b5b-3ca4-45b4-97c6-a2a0de70d469`
 */
export type GroupIdType = `grp_${string}-${string}-${string}-${string}-${string}`;
export type GroupRoleIdType = `grol_${string}-${string}-${string}-${string}-${string}`;
export type GroupGalleryIdType = `ggal_${string}-${string}-${string}-${string}-${string}`;
export type GroupMemberIdType = `gmem_${string}-${string}-${string}-${string}-${string}`;
export type GroupAnnouncementIdType = `gpos_${string}-${string}-${string}-${string}-${string}`;
export type GroupAuditLogIdType = `gaud_${string}-${string}-${string}-${string}-${string}`;
export type GroupGalleryImageIdType = `ggim_${string}-${string}-${string}-${string}-${string}`;

export type TransactionIdType = `txn_${string}-${string}-${string}-${string}-${string}`;
export type ProductListingIdType = `prod_${string}-${string}-${string}-${string}-${string}`;
export type ProductListingVariantIdType = `listvar_${string}-${string}-${string}-${string}-${string}`;
export type LicenseGroupIdType = `lgrp_${string}-${string}-${string}-${string}-${string}`;
export type tiliaIdType = `acct_${string}`;
export type TiliaDatabaseIdType = `till_${string}-${string}-${string}-${string}-${string}`;

export type FavoriteIdType = `fvrt_${string}-${string}-${string}-${string}-${string}`;
export type FavoriteGroupIdType = `fvgrp_${string}-${string}-${string}-${string}-${string}`;

export type InviteMessageIdType = `invm_${string}-${string}-${string}-${string}-${string}`;
export type JamIdType = `jam_${string}-${string}-${string}-${string}-${string}`;
export type JamSubmissionIdType = `jsub_${string}-${string}-${string}-${string}-${string}`;

export type FeedbackIdType = `feedback_${string}-${string}-${string}-${string}-${string}`;

export type PrintIdType = `prnt_${string}-${string}-${string}-${string}-${string}`;

export type ContentRestrictedType = `cr_${string}-${string}-${string}-${string}-${string}`;

export type BadgeIdType = `bdg_${string}-${string}-${string}-${string}-${string}`;

export type CalendarIdType = `cal_${string}-${string}-${string}-${string}-${string}`;
//* -- VRCHAT GENERIC TYPES -- *//
/**
 * Search order options for searching avatars. Enums: SearchOrderOptions
 */
export enum SearchOrderOptions {
    Ascending = 'ascending',
    Descending = 'descending',
}

/**
 * Search order options for searching avatars. Enums: SearchOrderOptions
 */
export enum SearchSortingOptions {
    Popularity = 'popularity',
    Heat = 'heat',
    Trust = 'trust',
    Shuffle = 'shuffle',
    Random = 'random',
    Favorites = 'favorites',
    Report_Score = 'reportScore',
    Report_Count = 'reportCount',
    Publication_Date = 'publicationDate',
    Labs_Publication_Date = 'labsPublicationDate',
    Created = 'created',
    Created_At = '_created_at',
    Updated = 'updated',
    Updated_At = '_updated_at',
    Order = 'order',
    Relevance = 'relevance',
    Magic = 'magic',
    Name = 'name',
}
