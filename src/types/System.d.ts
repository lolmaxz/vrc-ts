declare namespace VRCAPI {
    namespace System {
        namespace Models {

            type APIConfig = {
                VoiceEnableDegradation: boolean;
                VoiceEnableReceiverLimiting: boolean;
                address: string;
                alignmentScrollProfile: number;
                analyticsSegment_NewUI_PctOfUsers: number;
                analyticsSegment_NewUI_Salt: string;
                announcements?: {
                    name?: string;
                    text?: string;
                };
                appName: string;
                availableLanguages: string[];
                bufferBookmark: string;
                buildVersionTag: string;
                captchaPercentage: number;
                clientApiKey: string;
                clientBPSCeiling: number;
                clientDisconnectTimeout: number;
                clientReservedPlayerBPS: number;
                clientSentCountAllowance: number;
                colliderSortDisconnect: Array<Array<ColliderSortDisconnectClass | number> | string>;
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
                        }
                    };
                };
                contactEmail: string;
                contentReturnOnline: boolean;
                copyrightEmail: string;
                currentPrivacyVersion: number;
                currentTOSVersion: number;
                defaultAvatar: string;
                deploymentGroup: string;
                devSdkUrl: string;
                devSdkVersion: string;
                "dis-countdown": Date;
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
                disableHello: boolean;
                disableOculusSubs: boolean;
                disableRegistration: boolean;
                disableSteamNetworking: boolean;
                disableTwoFactorAuth: boolean;
                disableUdon: boolean;
                disableUpgradeAccount: boolean;
                downloadLinkWindows: string;
                downloadUrls: {
                    sdk2: string;
                    "sdk3-worlds": string;
                    "sdk3-avatars": string;
                    vcc: string;
                    bootstrap: string;
                };
                dynamicWorldRows: {
                    name: string;
                    sortHeading: string;
                    sortOwnership: "any" | "mine";
                    sortOrder: "descending" | "ascending";
                    platform: string;
                    index: number;
                    tag?: string;
                }[];
                ethernetRequest: number[];
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
                forceUseLatestWorld: boolean;
                googleApiClientId: string;
                headerHead: string;
                homeWorldId: string;
                homepageRedirectTarget: string;
                hubWorldId: string;
                imageHostUrlList: string[];
                jobsEmail: string;
                managerVoiceEventDefault: boolean;
                minimumUnityVersionForUploads: string;
                moderationEmail: string;
                notAllowedToSelectAvatarInPrivateWorldMessage: string;
                offlineAnalysis: {
                    standalonewindows: boolean;
                    android: boolean;
                };
                photonBiographyDistance: number;
                photonNameserverOverrides: string[];
                photonRandomReturnDelay: number;
                "player-url-resolver-sha1": string;
                "player-url-resolver-version": string;
                propUpload: number;
                receiveDistance: string;
                rotationViolationToken: Array<RotationViolationTokenClass | number>;
                sdkDeveloperFaqUrl: string;
                sdkDiscordUrl: string;
                sdkNotAllowedToPublishMessage: string;
                sdkUnityVersion: string;
                serverName: string;
                stringHostUrlList: string[];
                supportEmail: string;
                timeOutWorldId: string;
                trustedDisableMaximumTag: boolean;
                tutorialWorldId: string;
                updateRateMsMaximum: number;
                updateRateMsMinimum: number;
                updateRateMsNormal: number;
                updateRateMsUdonManual: number;
                uploadAnalysisPercent: number;
                urlList: string[];
                useReliableUdpForVoice: boolean;
                violationPackageLimit: {
                    referenceApi: string;
                    apiSystemPlainNameTag: boolean;
                };
                viveWindowsUrl: string;
                waffleFilePropSort: number;
                whiteListedAssetUrls: string[];
            }

            type ColliderSortDisconnectClass = {
                targetTimeout: number;
                keywordSubscriber: boolean;
            }

            type RotationViolationTokenClass = {
                analyticsWaffle: Array<boolean | AnalyticsWaffleClass | number>;
            }

            type AnalyticsWaffleClass = {
                contextBonesAvatarDefaultAttribute: number;
                targetAlignmentCheckApi: number;
            }

            
        }
    }
}