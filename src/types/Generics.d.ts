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
      Authorization?: `Basic ${string}`;
      'User-Agent': string;
      'Content-Type'?: string;
      Cookie?: string;
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
      [section: string]: subSectionPath;
    };

    export type dataSetKeys =
      | dataKeysCreateUpdateAvatar
      | dataKeys2Fa
      | dataKeysFavoriteTypes
      | dataKeysCreateFile
      | dataKeysCreateFileVersion
      | dataKeysFinishFileDataUpload
      | dataKeysCreateGroupRequest
      | dataKeysUpdateGroup
      | dataKeysCreateGroupAnnouncement
      | dataKeysGroupBanMember
      | dataKeysGroupCreateGallery
      | dataKeysGroupUpdateGallery
      | dataKeysAddGroupGalleryImage
      | dataKeysCreateGroupInvite
      | dataKeysCreateGroupInviteUser
      | dataKeysUpdateGroupMember
      | dataKeysRespondGroupJoinRequest
      | dataKeysCreateGroupRole
      | dataKeysUpdateGroupRole
      | dataKeysSendInvite
      | dataKeysRequestInvite
      | dataKeysInviteResponse
      | dataKeysUpdateInviteMessage
      | dataKeysModerateUserRequest
      | dataKeysUnModerateUser
      | dataKeysUpdateUser
      | dataKeysCreateWorld
      | dataKeysUpdateWorld;

    type dataKeys2Fa = {
      code: string;
    };

    type dataKeysCreateUpdateAvatar = {
      assetUrl: string;
      id: '{avatarId}';
      name: string;
      description: string;
      tags: AllTags[];
      imageUrl: string;
      releaseStatus: ReleaseStatus;
      version: number;
      unityPackageUrl: string;
    };

    type dataKeysFavoriteTypes =
      | dataKeysAddFavoriteFriend
      | dataKeysAddFavoriteAvatar
      | dataKeysAddFavoriteWorld
      | dataKeysFavoriteUpdate;

    enum FavoriteType {
      Friend = 'friend',
      Avatar = 'avatar',
      World = 'world',
    }

    type dataKeysAddFavoriteFriend = {
      type: FavoriteType.Friend;
      favoriteId: string;
      tags: groupTags[];
    };

    type groupTags = 'group_0' | 'group_1' | 'group_2' | 'group_3';
    type avatarTags = 'avatar1' | 'avatar2' | 'avatar3' | 'avatar4';
    type worldTags = 'world1' | 'world2' | 'world3' | 'world4';
    type allFavoriteTags = groupTags | avatarTags | worldTags;

    type dataKeysAddFavoriteAvatar = {
      type: FavoriteType.Avatar;
      favoriteId: string;
      tags: avatarTags[];
    };

    /**
     * @description Data keys for adding a world to favorites
     */
    type dataKeysAddFavoriteWorld = {
      type: FavoriteType.World;
      favoriteId: string;
      tags: worldTags[];
    };

    type dataKeysFavoriteUpdate = {
      displayName: string;
      visibility: dataKeysFavoriteGroupVisibility;
      tags: (AllTags | allFavoriteTags)[];
    };

    enum dataKeysFavoriteGroupVisibility {
      Private = 'private',
      Friends = 'friends',
      Public = 'public',
    }

    type dataKeysCreateFile = {
      name: string;
      mimeType: MIMEType;
      extension: string;
      tags?: AllTags[];
    };

    enum MIMEType {
      JPEG = 'image/jpeg',
      JPG = 'image/jpg',
      PNG = 'image/png',
      WEBP = 'image/webp',
      GIF = 'image/gif',
      BMP = 'image/bmp',
      SVG_XML = 'image/svg+xml',
      TIFF = 'image/tiff',
      AVATAR = 'application/x-avatar',
      WORLD = 'application/x-world',
      GZIP = 'application/gzip',
      RSYNC_SIGNATURE = 'application/x-rsync-signature',
      RSYNC_DELTA = 'application/x-rsync-delta',
      OCTET_STREAM = 'application/octet-stream',
    }

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

    enum ReleaseStatus {
      Public = 'public',
      Private = 'private',
      Hidden = 'hidden',
      All = 'all',
    }

    type dataKeysCreateFileVersion = {
      signatureMd5: string;
      signatureSizeInBytes: number;
      fileMd5?: string;
      fileSizeInBytes?: number;
    };

    type dataKeysFinishFileDataUpload = {
      etags?: [string, string];
      nextPartNumber: '0';
      maxParts: '0';
    };

    type dataKeysCreateGroupRequest = {
      name: string; // Must be 3 to 64 characters long
      shortCode: string; // Must be 3 to 6 characters long
      description?: string; // Must be 0 to 250 characters long, optional
      joinState?: VRCAPI.Groups.Models.GroupJoinState; // Optional, default is GroupJoinState.Open
      iconId?: string; // Optional
      bannerId?: string; // Optional
      privacy?: VRCAPI.Groups.Models.GroupPrivacy; // Optional, default is GroupPrivacy.Default
      roleTemplate: VRCAPI.Groups.Models.GroupRoleTemplate; // Required, default is GroupRoleTemplate.Default
    };

    type dataKeysUpdateGroup = {
      name?: string; // Must be 3 to 64 characters long
      shortCode?: string; // Must be 3 to 6 characters long
      description?: string; // Must be 0 to 250 characters long
      joinState?: VRCAPI.Groups.Models.GroupJoinState; // Using the previously defined GroupJoinState enum
      iconId?: string;
      bannerId?: string;
      languages?: [VRCAPI.Generics.languageTagsShort?,VRCAPI.Generics.languageTagsShort?,VRCAPI.Generics.languageTagsShort?]; // Array of 3-letter language codes, max 3 items
      links?: [string?,string?,string?]; // Array of strings, max 3 items
      rules?: string; // max 2048 characters
      tags?: AllTags[]; // Array of strings, each string must be at least 1 character long
    };

    type dataKeysCreateGroupAnnouncement = {
      title: string; // Announcement title, must be at least 1 character long
      text: string; // Announcement text, must be at least 1 character long
      imageId?: string; // Must match the pattern: file_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}
      sendNotification?: boolean; // Optional, default is true
    };

    type dataKeysGroupBanMember = {
      userId: string; // A users unique ID, usually in the form of usr_c1644b5b-3ca4-45b4-97c6-a2a0de70d469. Legacy players can have old IDs in the form of 8JoV9XEdpo. The ID can never be changed.
    };

    type dataKeysGroupCreateGallery = {
      name: string;
      description?: string;
      membersOnly?: boolean;
      roleIdsToView?: string[];
      roleIdsToSubmit?: string[];
      roleIdsToAutoApprove?: string[];
      roleIdsToManage?: string[];
    };

    type dataKeysGroupUpdateGallery = {
      name?: string;
      description?: string;
      membersOnly?: boolean;
      roleIdsToView?: string[];
      roleIdsToSubmit?: string[];
      roleIdsToAutoApprove?: string[];
      roleIdsToManage?: string[];
    };

    type dataKeysAddGroupGalleryImage = {
      fileId: string;
    };

    type dataKeysCreateGroupInvite = {
      userId: string;
      confirmOverrideBlock?: boolean;
    };

    type dataKeysCreateGroupInviteUser = {
      userId: string;
      confirmOverrideBlock?: boolean;
    };

    type dataKeysUpdateGroupMember = {
      visibility?: VRCAPI.Groups.Models.GroupUserVisibility;
      isSubscribedToAnnouncements?: boolean;
      managerNotes?: string;
    };

    type dataKeysRespondGroupJoinRequest = {
      action: VRCAPI.Groups.Models.GroupInviteResponse;
    }

    type dataKeysCreateGroupRole = {
      id?: "new";
      name?: string;
      description?: string;
      isSelfAssignable?: boolean;
      permissions?: string[];
    };

    type dataKeysUpdateGroupRole = {
      name?: string;
      description?: string;
      isSelfAssignable?: boolean;
      permissions?: string[];
      order?: number;
    };

    type dataKeysSendInvite = {
      instanceId: string;
      messageSlot?: number;
    };

    type dataKeysRequestInvite = {
      messageSlot?: number;
    };

    type dataKeysInviteResponse = {
      responseSlot: number;
    };

    type dataKeysUpdateInviteMessage = {
      message: string;
    };

    enum PlayerModerationType {
      Mute = 'mute',
      Unmute = 'unmute',
      Block = 'block',
      Unblock = 'unblock',
      InteractOn = 'interactOn',
      InteractOff = 'interactOff',
    }

    type dataKeysModerateUserRequest = {
      moderated: string;
      type: PlayerModerationType;
    };

    type dataKeysUnModerateUser = {
      moderated: string;
      type: PlayerModerationType;
    };

    type dataKeysUpdateUser = {
      email?: string;
      birthday?: Date;
      acceptedTOSVersion?: number;
      tags?: string[];
      status?: Users.Models.UserStatus;
      statusDescription?: string;
      bio?: string;
      bioLinks?: string[];
      userIcon?: string;
    };

    type dataKeysCreateWorld = {
      assetUrl: string;
      assetVersion?: number;
      authorId?: string;
      authorName?: string;
      capacity?: number;
      description?: string;
      id?: string;
      imageUrl: string;
      name: string;
      platform?: string;
      releaseStatus?: ReleaseStatus;
      tags?: string[];
      unityPackageUrl?: string;
      unityVersion?: string;
    };

    type dataKeysUpdateWorld = {
      assetUrl?: string;
      assetVersion?: string;
      authorId?: string;
      authorName?: string;
      capacity?: number;
      description?: string;
      imageUrl?: string;
      name?: string;
      platform?: string;
      releaseStatus?: ReleaseStatus;
      tags?: string[];
      unityPackageUrl?: string;
      unityVersion?: string;
    };
  }
}
