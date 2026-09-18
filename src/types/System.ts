//! --- System ---

export type APIConfig = {
    CampaignStatus?: string;
    DisableBackgroundPreloads?: boolean;
    LocationGiftingNonSubPrioEnabled?: boolean;
    VoiceEnableDegradation: boolean;
    VoiceEnableReceiverLimiting: boolean;
    accessLogsUrls?: {
        Default?: string;
        Pico?: string;
        Quest?: string;
        XRElite?: string;
    };
    address: string;
    ageVerificationInviteVisible?: boolean;
    ageVerificationP?: boolean;
    ageVerificationStatusVisible?: boolean;
    analysisMaxRetries?: number;
    analysisRetryInterval?: number;
    /** VRChat rerolls decoy property names on /config. Keep these optional. */
    alignmentScrollProfile?: number;
    analyticsSegment_NewUI_PctOfUsers: number;
    analyticsSegment_NewUI_Salt: string;
    announcements?: {
        name?: string;
        text?: string;
    }[];
    appName?: string;
    availableLanguageCodes?: string[];
    availableLanguages: string[];
    avatarPerfLimiter?: {
        AndroidMobile?: { maxSeats: number };
        PC?: { maxSeats: number };
        Pico?: { maxSeats: number };
        Quest?: { maxSeats: number };
        XRElite?: { maxSeats: number };
        iOSMobile?: { maxSeats: number };
    };
    audioConfig?: {
        eq?: number;
        nearFieldILDNudge?: number;
        nearFieldILDNudgeDistance?: number;
        nearFieldILDNudgeEarRadius?: number;
        nearFieldILDNudgeEarTranslate?: number;
        perEarDirectionalityEarRadius?: number;
        perEarDirectionalityFadeDistance?: number;
        perEarDirectionalityMaxScale?: number;
        perEarDirectionalityPCFactor?: number;
        trackingScaleMax?: number;
        trackingScaleMin?: number;
        trackingScaleMultiplier?: number;
        useLegacyILDNudging?: boolean;
    };
    chatboxLogBufferSeconds?: number;
    clientMaxDatagrams?: number;
    clientNetDispatchThread?: boolean;
    clientNetDispatchThreadMobile?: boolean;
    bufferBookmark?: string;
    buildVersionTag?: string;
    captchaPercentage?: number;
    clientApiKey: string;
    clientBPSCeiling: number;
    clientDisconnectTimeout: number;
    clientReservedPlayerBPS: number;
    clientSentCountAllowance: number;
    colliderSortDisconnect?: Array<Array<ColliderSortDisconnectClass | number> | string>;
    constants: {
        GROUPS: {
            CAPACITY: number;
            MAX_JOINED: number;
            MAX_OWNED: number;
            MAX_INVITES_REQUESTS: number;
            MAX_LANGUAGES: number;
            MAX_LINKS: number;
            MAX_ROLES: number;
            MAX_MANAGEMENT_ROLES: number;
            MAX_JOINED_PLUS?: number;
            GROUP_TRANSFER_REQUIREMENTS?: string[];
        };
        INSTANCE: {
            POPULATION_BRACKETS: {
                FEW: {
                    min: number;
                    max: number;
                };
                MANY: {
                    min: number;
                    max: number;
                };
                CROWDED: {
                    min: number;
                    max: number;
                };
            };
        };
        LANGUAGE?: {
            SPOKEN_LANGUAGE_OPTIONS?: {
                [key: string]: string;
            };
        };
    };
    contactEmail: string;
    contentReturnOnline?: boolean;
    copyrightEmail: string;
    currentPrivacyVersion: number;
    copyrightFormUrl?: string;
    currentTOSVersion: number;
    defaultAvatar: string;
    defaultStickerSet?: string;
    deploymentGroup?: string;
    devLanguageCodes?: string[];
    devSdkUrl: string;
    devSdkVersion: string;
    'dis-countdown'?: string;
    disableAVProInProton: boolean;
    disableAvatarCopying: boolean;
    disableAvatarGating: boolean;
    disableCaptcha: boolean;
    disableCommunityLabs: boolean;
    disableCommunityLabsPromotion: boolean;
    disableEmail: boolean;
    disableEventStream: boolean;
    disableFeedbackGating: boolean;
    disableFrontendBuilds: boolean;
    disableGiftDrops?: boolean;
    disableHello: boolean;
    disableOculusSubs: boolean;
    disableRegistration: boolean;
    disableSteamNetworking: boolean;
    disableTwoFactorAuth: boolean;
    disableUdon: boolean;
    disableUpgradeAccount: boolean;
    downloadLinkWindows: string;
    downloadUrls: {
        sdk2?: string;
        'sdk3-worlds'?: string;
        'sdk3-avatars'?: string;
        vcc?: string;
        bootstrap?: string;
    };
    dynamicWorldRows: {
        name: string;
        sortHeading: string;
        sortOwnership: 'any' | 'mine';
        sortOrder: 'descending' | 'ascending';
        platform: string;
        index: number;
        tag?: string;
    }[];
    ethernetRequest?: number[];
    events: {
        distanceClose: number;
        distanceFactor: number;
        distanceFar: number;
        groupDistance: number;
        maximumBunchSize: number;
        notVisibleFactor: number;
        playerOrderBucketSize: number;
        playerOrderFactor: number;
        slowUpdateFactorThreshold: number;
        viewSegmentLength: number;
    };
    economyLedgerBackfill?: boolean;
    economyLedgerMode?: string;
    economyPauseEnd?: string;
    economyPauseStart?: string;
    economyState?: number;
    forceUseLatestWorld: boolean;
    giftDisplayType?: string;
    googleApiClientId: string;
    headerHead?: string;
    homeWorldId: string;
    homepageRedirectTarget: string;
    hubWorldId: string;
    imageHostUrlList: string[];
    iosAppVersion?: string[];
    iosVersion?: {
        major: number;
        minor: number;
    };
    jobsEmail: string;
    maxUserEmoji?: number;
    maxUserStickers?: number;
    minSupportedClientBuildNumber?: {
        [platform: string]: {
            minBuildNumber?: number;
            redirectionAddress?: string;
        };
    };
    managerVoiceEventDefault?: boolean;
    minimumUnityVersionForUploads: string;
    moderationEmail: string;
    notAllowedToSelectAvatarInPrivateWorldMessage: string;
    offlineAnalysis: {
        standalonewindows: boolean;
        android: boolean;
    };
    photonBiographyDistance?: number;
    photonNameserverOverrides: string[];
    photonRandomReturnDelay?: number;
    'player-url-resolver-sha1'?: string;
    'player-url-resolver-version'?: string;
    propUpload?: number;
    receiveDistance?: string;
    rotationViolationToken?: Array<RotationViolationTokenClass | number>;
    sdkDeveloperFaqUrl: string;
    sdkDiscordUrl: string;
    sdkNotAllowedToPublishMessage: string;
    sdkUnityVersion: string;
    serverName?: string;
    stringHostUrlList: string[];
    supportEmail: string;
    timeOutWorldId: string;
    trustedDisableMaximumTag?: boolean;
    tutorialWorldId: string;
    updateRateMsMaximum: number;
    updateRateMsMinimum: number;
    updateRateMsNormal: number;
    updateRateMsUdonManual: number;
    uploadAnalysisPercent: number;
    urlList: string[];
    useReliableUdpForVoice: boolean;
    violationPackageLimit?: {
        referenceApi: string;
        apiSystemPlainNameTag: boolean;
    };
    viveWindowsUrl: string;
    waffleFilePropSort?: number;
    whiteListedAssetUrls: string[];
};

export type ColliderSortDisconnectClass = {
    targetTimeout: number;
    keywordSubscriber: boolean;
};

export type RotationViolationTokenClass = {
    analyticsWaffle: Array<boolean | AnalyticsWaffleClass | number>;
};

export type AnalyticsWaffleClass = {
    contextBonesAvatarDefaultAttribute: number;
    targetAlignmentCheckApi: number;
};

/** Live `GET /frontend/branches` shape; extra keys are expected until VRChat documents it. */
export type FrontendBranches = Record<string, unknown> | unknown[];
