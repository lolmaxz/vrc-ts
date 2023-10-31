declare namespace VRCAPI {
  namespace Generics {

    namespace Requests {

    }
    interface requestConfig {
      username?: string;
      password?: string;
      baseOptions?: unknown;
    }

    type executeRequestType = {
      currentRequest: VRCAPI.Generics.subSectionType,
      pathFormated: string,
      queryOptions?: URLSearchParams,
      body?: VRCAPI.Generics.dataSetKeys
    }

    type AuthenticationResponse = {
      ok?: boolean;
      requiresTwoFactorAuth?: ['totp', 'otp'] | ['emailOtp'];
      verified?: boolean;
      error?: { message: string; status_code: number };
    };

    type requestType = 'GET' | 'POST' | 'PUT' | 'DELETE';

    type VRCRequest = {
      method: requestType;
      headers: headerOptions;
      body?: string;
    };

    type headerOptions = {
      'Authorization'?: `Basic ${string}`;
      'User-Agent': string;
      'Content-Type'?: string;
      'cookie'?: string;
    };

    type error2fa = { requiresTwoFactorAuth: ['totp', 'otp'] };
    type error2faEmail = { requiresTwoFactorAuth: ['emailOtp'] };
    type error2FABase = error2fa | error2faEmail;
    type twoFactorAuthResponseType = {
      verified?: boolean;
      requiresTwoFactorAuth?: ['totp', 'otp'] | ['emailOtp'];
    };

    type authRequest = API<AuthenticationResponse, error2FABase | RequestError>;

    // type auth2FARequest = API<AuthenticationResponse, { verified: boolean }>;

    type RequestSuccess = {
      success: {
        message: string;
        status_code: number;
      };
    };

    type RequestError = {
      error: {
        message: string;
        status_code: number;
      };
    };

    interface APIResponse<T> extends Omit<Response, 'ok' | 'json'> {
      ok: true;
      json(): Promise<T>;
    }

    interface APIErrorResponse<E> extends Omit<Response, 'ok' | 'json'> {
      ok: false;
      json(): Promise<E>;
    }

    type API<T, E> = APIResponse<T> | APIErrorResponse<E>;

    type QueryParamsList = { name: string; value: string }[];

    // --- valid and error types here ---

    type VRCResponseValidType =
      | twoFactorAuthResponseType
      | RequestSuccess
      | AuthenticationResponse;

    type VRCResponseError = RequestError | error2FABase;

    type VRCAPIResponse = API<VRCResponseValidType, VRCResponseError>;

    // ---------------------------------

    type querryParamsType =
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
      | 'username';

    type subSectionType = {
      path: string;
      method: requestType;
      cookiesNeeded: (
        | 'authCookie'
        | 'authorization'
        | 'twoFactorAuth'
        | 'none'
      )[];
      requiredQueryParams?: querryParamsType[];
      deprecated?: boolean;
      requiresData?: boolean;
    };

    type subSectionPath = {
      [subsection: string]: subSectionType;
    };

    type APIPaths = {
      apiBasePath : string;
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
        createGroup: subSectionType;
        getGroupById: subSectionType;
        updateGroup: subSectionType;
        deleteGroup: subSectionType;
        getGroupAnnouncement: subSectionType;
        createGroupAnnouncement: subSectionType;
        deleteGroupAnnouncement: subSectionType;
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
        searchAllUsers: subSectionType
        getUserbyUsername: subSectionType
        getUserbyID: subSectionType
        updateUserInfo: subSectionType
        getUserGroups: subSectionType
        getUserGroupRequests: subSectionType
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
      | VRCAPI.Avatars.Requests.createAvatarOption
      | VRCAPI.Avatars.Requests.updateAvatarOption
      | VRCAPI.Favorites.Requests.dataKeysFavoriteTypes
      | VRCAPI.Files.Requests.dataKeysCreateFile
      | VRCAPI.Files.Requests.dataKeysCreateFileVersion
      | VRCAPI.Files.Requests.dataKeysFinishFileDataUpload
      | VRCAPI.Groups.Requests.CreateGroupRequest
      | VRCAPI.Groups.Requests.dataKeysUpdateGroup
      | VRCAPI.Groups.Requests.dataKeysCreateGroupAnnouncement
      | VRCAPI.Groups.Requests.dataKeysGroupBanMember
      | VRCAPI.Groups.Requests.dataKeysGroupCreateGallery
      | VRCAPI.Groups.Requests.dataKeysGroupUpdateGallery
      | VRCAPI.Groups.Requests.dataKeysAddGroupGalleryImage
      | VRCAPI.Groups.Requests.dataKeysCreateGroupInvite
      | VRCAPI.Groups.Requests.dataKeysUpdateGroupMember
      | VRCAPI.Groups.Requests.dataKeysRespondGroupJoinRequest
      | VRCAPI.Groups.Requests.dataKeysCreateGroupRole
      | VRCAPI.Groups.Requests.dataKeysUpdateGroupRole
      | VRCAPI.Invites.Requests.dataKeysSendInvite
      | VRCAPI.Invites.Requests.dataKeysRequestInvite
      | VRCAPI.Invites.Requests.dataKeysInviteResponse
      | VRCAPI.Invites.Requests.dataKeysUpdateInviteMessage
      | VRCAPI.PlayerModerations.Requests.dataKeysModerateUserRequest
      | VRCAPI.PlayerModerations.Requests.dataKeysUnModerateUser
      | VRCAPI.Users.Requests.dataKeysUpdateUser
      | VRCAPI.Worlds.Requests.dataKeysCreateWorld
      | VRCAPI.Worlds.Requests.dataKeysUpdateWorld;

    type dataKeys2Fa = {
      code: string;
    };

    type groupTags = 'group_0' | 'group_1' | 'group_2' | 'group_3';
    type avatarTags = 'avatar1' | 'avatar2' | 'avatar3' | 'avatar4';
    type worldTags = 'world1' | 'world2' | 'world3' | 'world4';
    type allFavoriteTags = groupTags | avatarTags | worldTags;

    type AdminTags =
      | 'admin_avatar_access'
      | 'admin_can_grant_licenses'
      | 'admin_canny_access'
      | 'admin_lock_tags'
      | 'admin_lock_level'
      | 'admin_moderator'
      | 'admin_official_thumbnail'
      | 'admin_scripting_access'
      | 'admin_world_access';

    type SystemTags =
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
      | 'system_world_access';

    type WorldTags =
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

    type LanguageTags =
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

    type languageTagsShort = "eng" | "kor" | "rus" | "spa" | "por" | "zho" | "deu" | "jpn" | "fra" | "swe" | "nld" | "pol" | "dan" | "nor" | "ita" | "tha" | "fin" | "hun" | "ces" | "tur" | "ara" | "ron" | "vie";

    type GroupTags = 'admin_hide_member_count';

    type UselessTags =
      | 'system_neuralink_beta'
      | 'system_extremely_cool_guy'
      | 'system_stop_being_nosy'
      | 'system_notamod'
      | 'system_no_seriously_im_not_a_mod_how_many_times_do_i_have_to_tell_people'
      | 'system_the_tag_is_just_named_that'
      | 'system_haha_you_have_to_document_this_one_too'
      | 'system_legen_wait_for_it_dary'
      | 'system_cute_robot';

    type AllTags =
      | AdminTags
      | SystemTags
      | WorldTags
      | LanguageTags
      | GroupTags
      | UselessTags;
  }
}
