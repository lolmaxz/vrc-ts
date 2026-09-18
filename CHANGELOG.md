# Changelog 1.0.18 [ - September 13th, 2026 - ] Live user/group type sync

## Added

-   **[USER API]** **ADDED TYPE** `ProfileAppearance`, `ProfileBannerType` - Shared profile cosmetics (`bannerType`, `bannerColor`, `bannerUrl`, `iconUrl`, `iconFrame`, `nameplateEffect`, `profileEffect`, `profilePicOverrideThumbnail`) used on `CurrentUser`, `User`, `LimitedUser`, and `LimitedUserFriend`.
-   **[USER API]** **ADDED REQUEST** `getUserAllGroupPermissions`, `getInvitedGroups`, `getBlockedGroups`, `getUserGroupInstancesForGroup`, `getUserTutorialStatus`, `getMutuals` / `getMutualFriends` / `getMutualGroups`, `getPublicProfile`, `getPrivateProfile`, `checkUserPersistenceExists`.
-   **[USER API]** **ADDED REQUEST** `getUserClientConfig`, `getAgeVerificationStatus` - Official spec v1.21.0.
-   **[INVENTORY API]** **ADDED REQUEST** `getCosmeticIndex`, `getUserCosmetics` - Published cosmetics by kind, and cosmetics a user holds.
-   **[FAVORITE API]** **ADDED REQUEST** `getFavoriteGroupsByType`, `getFavoriteGroupContents`.
-   **[ECONOMY API]** **ADDED REQUEST** `getEconomyStatus`, `getEconomyBalance` (`/user/{userId}/economy/balance`, distinct from `/user/{userId}/balance`), `getProductListingProducts`.
-   **[BETA API]** **ADDED REQUEST** `getBeta`, `getBetaRegistration`.
-   **[SYSTEM API]** **ADDED REQUEST** `getFrontendBranches`.
-   **[WORLD API]** **ADDED TYPE** `UnavailableWorld` - Placeholder when a favorite group points at a world the API will not describe.
-   **[GROUP API]** **ADDED TYPE** `UserGroup` - Membership view returned by `GET /users/{userId}/groups` (`groupId`, `memberVisibility`, `mutualGroup`, nameplate fields, optional `storeId` / `lastPostReadAt` / `lastPostCreatedAt`).
-   **[GROUP API]** **ADDED ENUM** `GroupEventOccurrenceKind`, `GroupEventRecurrenceFrequency` and type `GroupEventRecurrence`.
-   **[GROUP API]** **ADDED TYPE** `GroupAuditTargetId`, `GroupAuditLogData`, `GroupEventAccessType`, `GroupCalendarKind`, `GroupEventRecurrenceDay`, `GroupEventRecurrenceEndType`, `GroupInstanceAccessType`.
-   **[GROUP API]** **ADDED REQUEST** `getGroupAuditLogTypes` - `GET /groups/{groupId}/auditLogTypes`.
-   **[GROUP API]** **ADDED REQUEST** `getFollowedCalendarEvents` - `GET /calendar/following`. Following an event does not add fields to `CurrentUser`; the calendar list is this endpoint.
-   **[GROUP API]** **ADDED REQUEST** `getCalendarEvents` - `GET /calendar`. User month calendar (`?date=`).
-   **[GROUP API]** **ADDED REQUEST** `getFeaturedCalendarEvents` - `GET /calendar/featured`.
-   **[GROUP API]** **ADDED REQUEST** `searchCalendarEvents` - `GET /calendar/search`.
-   **[GROUP API]** **ADDED REQUEST** `discoverCalendarEvents` - `GET /calendar/discover`. Returns `CalendarEventDiscovery` (`nextCursor` + `results`), not `GroupEventList`.
-   **[GROUP API]** **ADDED REQUEST** `getGroupCalendarEventIcs` - `GET /calendar/{groupId}/{calendarId}.ics` (ICS text).
-   **[GROUP API]** **ADDED ENUM** `CalendarEventDiscoveryScope`, `CalendarEventDiscoveryInclusion` and type `CalendarEventDiscovery`.
-   **[INSTANCE API]** **ADDED REQUEST** `closeInstance` - `DELETE /instances/{worldId}:{instanceId}` with `hardClose` / `closedAt` (same as VRCX).
-   **[INSTANCE API]** **ADDED REQUEST** `getRecentLocations` - `GET /instances/recent`.
-   **[INSTANCE API]** **ADDED TYPE** `InstanceContentSettings` - drones / emoji / pedestals / prints / props / stickers.
-   **[INSTANCE API]** **ADDED ENUM** `InstanceAvatarPerformance` - `None` / `Poor` / `Medium` / `Good` (website create UI + live `Medium`).
-   **[INVENTORY API]** **ADDED API** Inventory GETs plus share/update/delete: `/inventory`, item, user item, drops, template, collections, spawn, cloning.
-   **[INVENTORY API]** **ADDED TYPE** `Inventory`, `InventoryItem`, `InventoryDrop`, `InventoryTemplate`, `InventorySpawn` and inventory enums. `GET /inventory/collections` returns `string[]` collection names.
-   **[PROPS API]** **ADDED API** `listProps`, `getProp`, `getPropPublishStatus`.
-   **[PROPS API]** **ADDED TYPE** `Prop`, `PropUnityPackage`, `PropPublishStatus`, `PropReleaseStatus`.
-   **[PRINTS API]** **ADDED REQUEST** `getPrint`, `deletePrint`. Upload/edit stay unimplemented (multipart file).
-   **[FAVORITE API]** **ADDED ENUM** `FavoriteGroupVisibility` - Favorite group visibility is `public` / `private` / `friends`, not `FavoriteType`.

## Updated

-   **[AUTH API]** **UPDATED** Rate-limited logins (`401` + `Retry-After`, or `429`) are no longer reported as invalid credentials. A `429` "hold your horses" email-OTP cooldown is treated as `EmailOtpRequired`.
-   **[USER API]** **UPDATED TYPE** `CurrentUser` - Added `badges`, `completedTutorials`, `pronounsHistory`, `isEconomyCreator`, `isTemporary`, `temporaryExpiryDate`, `personalizationOptOut`, `usesGeneratedPassword`, and linked-account `apple` / `discord` / `twitch` fields.
-   **[USER API]** **UPDATED TYPE** `CurrentUser` - `currentAvatarAssetUrl` is now optional / deprecated; `/auth/user` no longer returns it.
-   **[USER API]** **UPDATED TYPE** `CurrentUser` - Added privacy opt-outs, `contentFilters`, `queuedInstance`, and activity fields (`friendRequestStatus`, `instanceId`, `location`, `note`, `travelingTo*`, `worldId`). `presence` is no longer marked deprecated (REST may still send it; websocket is the fuller source).
-   **[USER API]** **UPDATED TYPE** `CurrentUserPresence` - `groups` is `GroupIdType[]` (not `Group[]`). Added `avatarImageUrl`, `banner`, `iconFrame`, `nameplateEffect`, and `profileEffect`. Spec v1.21.0 types presence `currentAvatarTags` as a string; REST still may send an array, so the field is `string | string[]`.
-   **[USER API]** **UPDATED TYPE** `PastDisplayName.reverted` - Optional.
-   **[FAVORITE API]** **UPDATED ENUM** `FavoriteType` - Added `vrcPlusWorld`.
-   **[INVENTORY API]** **UPDATED ENUM** `InventoryItemType` - Added `profileBackground`. `InventoryFlag` added `global`, `global_visible`, `vrc_plus_exclusive`. `InventoryEquipSlot` added `iconFrame`, `nameplateEffect`, `profileEffect`.
-   **[INVENTORY API]** **UPDATED REQUEST** `getInventory` - Optional `seen` / `isNavBar`.
-   **[GROUP API]** **UPDATED REQUEST** `getGroupbyID` - Optional `purpose`. `getGroupEvents` optional `after` / `limit` / `sort`. `getGroupGalleryImages` optional `v`.
-   **[ECONOMY API]** **UPDATED TYPE** `Balance.tiliaResponse` - Optional (`GET /user/{id}/economy/balance` may send only `{ balance }`).
-   **[PROPS API]** **UPDATED REQUEST** `listProps` - `userId` / author remains optional (spec v1.21.0 no longer requires it).
-   **[USER API]** **UPDATED TYPE** `User` - Added `pronouns`, `ageVerified`, `isEconomyCreator`, and `platform`.
-   **[USER API]** **UPDATED TYPE** `User` - Official optional fields `acceptedPrivacyVersion` / `acceptedTOSVersion` / `accountDeletion*` / `appleDetails`, plus live `discordId`. `GET /users/{ownId}` still sends extra CurrentUser-only fields; use `getCurrentUser` for the authenticated view.
-   **[USER API]** **UPDATED TYPE** `User` - Public `GET /users/{userId}` omits several `UserBase` fields (`userIcon`, `bio`, `bioLinks`, `profilePicOverride`, `badges`, current-avatar URLs/tags), so those are optional on `User`.
-   **[USER API]** **UPDATED TYPE** `LimitedUser` - Added `pronouns` and the shared profile cosmetics.
-   **[USER API]** **UPDATED TYPE** `LimitedUser` - `currentAvatarImageUrl` / `currentAvatarThumbnailImageUrl` are optional (`searchAllUsers` often omits them).
-   **[USER API]** **ADDED FUNCTION** `normalizeUserImageFields` - When VRChat omits avatar URLs, copy profile `iconUrl` (or override thumbnail) into `currentAvatarThumbnailImageUrl` / `currentAvatarImageUrl`. JSON `null` `bio` / `statusDescription` / `profilePicOverride` become `''`.
-   **[USER API]** **UPDATED REQUEST** `getUserById` / `searchAllUsers` - Run `normalizeUserImageFields` so consumers that still read `currentAvatarThumbnailImageUrl` (Hephia linking embeds) get a usable https URL.
-   **[USER API]** **UPDATED REQUEST** `getPublicProfile` - Optional `asSelf` / `withGroupsAndWorlds` (official spec v1.21.0). Bio, badges, and avatar images live on this profile object, not on public `GET /users/{id}`.
-   **[USER API]** **UPDATED FUNCTION** `getVRCRankTags` - Missing `tags` is treated as `[]` (Visitor) instead of throwing.
-   **[USER API]** **UPDATED TYPE** `LimitedUserFriend` - `pronouns` optional. Added `discordId`, `last_activity`, `last_mobile`, `platform`.
-   **[USER API]** **UPDATED TYPE** `LimitedUserFriend` - `imageUrl` / `location` are still returned on the friends list (not deprecated).
-   **[USER API]** **UPDATED TYPE** `UserBadge` - `assignedAt`, `hidden`, and `updated_at` are optional (owner-only). Added `updatedAt` and `isQuantifiable`.
-   **[USER API]** **UPDATED TYPE** `ProfileBannerType` - Added `avatarBanner`.
-   **[USER API]** **UPDATED TYPE** `PlatformHistoryEntity.platform` - Live values are platform strings, not only `null`.
-   **[USER API]** **UPDATED REQUEST** `getUserGroups` - Now returns `UserGroup[]` instead of full `Group[]`.
-   **[USER API]** **UPDATED REQUEST** `updateUserInfo` - Body now accepts `contentFilters`, `hasDiscordFriendsOptOut`, and `hasSharedConnectionsOptOut`.
-   **[GROUP API]** **UPDATED TYPE** `UserGroup` - `id` is the membership id (`gmem_`), `groupId` is `grp_`. Invited rows omit `memberVisibility` / `mutualGroup` and send `membershipStatus`.
-   **[GROUP API]** **UPDATED TYPE** `RepresentedGroup` - `iconId` / `bannerId` allow `null`. Added `nameplateId` and `nameplateUrl`.
-   **[GROUP API]** **UPDATED TYPE** `Group` / `LimitedGroup` - Added `nameplateId` / `nameplateUrl`. `iconId` / `bannerId` allow `null`. `LimitedGroup.rules` is optional. Mutual-groups list also omits `galleries` / `isSearchable` and may send `lastPostCreatedAt` / `privacy`.
-   **[GROUP API]** **UPDATED TYPE** `Group` - Added `allowGroupJoinPrompt`, `transferTargetId`, `ageVerificationBetaCode` / `ageVerificationBetaSlots`. `GroupMember.user` may be `null`. Optional `storeId`.
-   **[GROUP API]** **UPDATED TYPE** `GroupGallery` - `roleIdsToView` may be `null`. `roleIdsToSubmit` / `roleIdsToAutoApprove` / `roleIdsToManage` optional on group GET.
-   **[GROUP API]** **UPDATED TYPE** `GroupRole` - `updatedAt` optional. `defaultRole` optional (present on create; omitted on update/delete/group role lists). `productId` on paid roles.
-   **[GROUP API]** **UPDATED ENUM** `GroupPermissionEnum` - Added live `/permissions` values: `group-calendar-manage`, `group-instance-announcement-create`, `group-instance-calendar-link`, `group-instance-bypass-avatar-performance`. `GroupPermissionsTags` now matches the enum. `GroupPermission.dependsOn` optional.
-   **[GROUP API]** **UPDATED TYPE** `GroupEventBase` - Added live calendar fields `durationInMs`, `interestedUserCount`, `occurrenceKind`, `recurrence`, `seriesId`, `imageUrl`. `languages` is `LanguageTypes[]` (`eng`), not `language_eng` tags. Search hits omit several host/overflow/timestamp fields, so those are optional. `GroupEventList.hasNext` optional.
-   **[GROUP API]** **UPDATED TYPE** `GroupEvent.userInterest` - Optional; create/update/GET often omit it.
-   **[GROUP API]** **UPDATED REQUEST** `getGroupEvents` / `getFollowedCalendarEvents` - Optional `date`, `n`, `offset`.
-   **[GROUP API]** **UPDATED ENUM** `GroupAuditLogEventType` - Live strings: `group.member.role.assign` / `unassign` (not `group.role.*`). Added `group.post.update`, `group.calendarEvent.create` / `delete`, `group.instance.close`. Instance audit data may include `calendarEntryId`.
-   **[GROUP API]** **UPDATED TYPE** `GroupAudit` - `targetId` is `GroupAuditTargetId` (`usr_` / `grol_` / `not_` / `cal_` / `grp_` / `gpos_` / `wrld_…:…`). `data` is `GroupAuditLogData`. Role audit data includes `isSelfAssignable` / `isAddedOnJoin`.
-   **[GROUP API]** **UPDATED REQUEST** `getGroupAuditLogs` - Optional `actorIds`, `eventTypes`, `targetIds` filters.
-   **[GROUP API]** **UPDATED TYPE** `MyMember` - `managerNotes` is optional. Added `isSubscribedToEventAnnouncements`.
-   **[GROUP API]** **UPDATED TYPE** `GroupMember` - Several membership fields are optional (list/join-request payloads omit them). `joinedAt` allows `null`. Added `acceptedByDisplayName` / `acceptedById`, `hasJoinedFromPurchase`, `lastPostReadAt`, `mRoleIds`, `isSubscribedToEventAnnouncements`.
-   **[GROUP API]** **UPDATED REQUEST** `getGroupMember` - Returns `GroupMember | null`. Live `GET /groups/{groupId}/members/{userId}` is JSON `null` when the user is not a member / invite / join request.
-   **[GROUP API]** **UPDATED TYPE** `GroupMemberLimitedUser` - Added profile cosmetics (`banner`, `currentAvatarImageUrl`, `iconFrame`, `nameplateEffect`, `profileEffect`, `userIcon`). Thumbnails allow `null`.
-   **[GROUP API]** **UPDATED TYPE** `GroupMemberLimitedUser` - `id` is `UserIdType` (`usr_`). `profilePicOverride` / `currentAvatarTags` optional. Added `bannerType` / `bannerColor` / `bannerUrl`.
-   **[GROUP API]** **UPDATED REQUEST** `updateGroupMember` - Body now accepts `isSubscribedToEventAnnouncements`. The built body is actually sent (it was previously dropped).
-   **[GROUP API]** **UPDATED REQUEST** `joinGroup` - Optional `inviteId` body.
-   **[WORLD API]** **UPDATED TYPE** `World` / `LimitedWorld` - Added `disabledPropAbilities`, `isHypeTrainEligible`, `storeId`. `namespace` / `pendingUpload` optional. `LimitedWorld` also has `defaultContentSettings` and `visits`.
-   **[WORLD API]** **UPDATED TYPE** `World.instances` - Live `/worlds/{id}` returns `[instanceId, userCount]` tuples, not `Instance[]`. Added `SlimWorldInstance` for `slimInstances`.
-   **[WORLD API]** **UPDATED TYPE** `World.instances` - Live tuples are length 3. `LimitedWorld` date fields are strings.
-   **[WORLD API]** **UPDATED TYPE** `World.defaultContentSettings` - Boolean flags, added `props`.
-   **[WORLD API]** **UPDATED REQUEST** `updateWorld` - Body now accepts `recommendedCapacity`, `disabledPropAbilities`, `previewYoutubeId`, and `urlList`.
-   **[WORLD API]** **FIXED REQUEST** `updateWorld` - Empty `description` / `0` capacity values are now sent so a restore can undo a test edit.
-   **[INSTANCE API]** **UPDATED TYPE** `Instance` - Live instance payload: `type`, `minimumAvatarPerformance`, `contentSettings`, `displayName`, `description`, `hardClose`, `instancePersistenceEnabled`, `calendarEntryId`, `categoryId`, `vibeIds`, languages, `userIcons`, `disabledPropAbilities`. `world` is `World`. `nonce` optional. `ageGate` is `boolean | null` and optional. `type` is `InstanceType`, `groupAccessType` is `GroupAccessType`, `minimumAvatarPerformance` is `InstanceAvatarPerformance`.
-   **[INSTANCE API]** **UPDATED ENUM** `InstanceRegionType` - Added `usw`.
-   **[INSTANCE API]** **UPDATED REQUEST** `generateGroupInstance` / `dataKeysCreateGroupInstance` - Optional `ageGate`, `minimumAvatarPerformance`, and official create extras (`contentSettings`, persistence, display name, etc.).
-   **[INSTANCE API]** **UPDATED REQUEST** `generateNormalInstance` - Optional `ageGate` appends `~ageGate` to the instance id.
-   **[INSTANCE API]** **FIXED REQUEST** `getInstance` / `getInstanceByShortName` - Return `Instance`, not `InstanceShortName`.
-   **[AVATAR API]** **UPDATED TYPE** `Avatar` - API currently sends `styles` (not required `style`). Added `acknowledgements`, `attribution`, `listingDate`, `performance`. `unityPackageUrlObject.unityPackageUrl` optional.
-   **[AVATAR API]** **UPDATED TYPE** `Avatar` - `styles.supplementary`, listing/product fields (`productId`, prices, `publishedListings`, `pendingUpload`, `lock`, `activeAssetReviewId`). Date fields are strings.
-   **[AVATAR API]** **UPDATED REQUEST** `createAvatar` - Optional `thumbnailImageUrl`, `assetVersion`, `platform`.
-   **[AVATAR API]** **FIXED REQUEST** `searchAvatars` - Query filters (`user=me`, `releaseStatus`, etc.) were built but never sent.
-   **[AVATAR API]** **FIXED REQUEST** `updateAvatar` - Empty `description` is now sent.
-   **[FILE API]** **UPDATED TYPE** `UnityPackage` - `id` / `assetVersion` optional. Added `variant` / `worldSignature`.
-   **[FILE API]** **UPDATED TYPE** `UnityPackageAvatar` - Added `scanStatus`.
-   **[FILE API]** **UPDATED TYPE** `File` versions - `delta` / `file` / `signature` optional. `FileData.md5` optional.
-   **[FILE API]** **UPDATED ENUM** `MIMEType` - Added `application/x-prop`.
-   **[INVENTORY API]** **UPDATED TYPE** `InventoryItem` - Live extras: `ancestor` / `firstAncestor` clone lineage, `metadata.propKind` / `viewfinderBundleId`, `userAttributes.primary`, `attribution.creator`. `templateId` may be `invt_` or `clt_`.
-   **[INVENTORY API]** **UPDATED ENUM** `InventoryItemType` - Added live types `accessory`, `avatarlook`, `iconFrame`, `nameplateEffect`, `profileEffect`, plus official `warpeffect`. `InventoryEquipSlot` added `warp`.
-   **[INVENTORY API]** **UPDATED TYPE** `InventoryTemplate` - Optional `productId` / `publishedListings`.
-   **[INVENTORY API]** **FIXED REQUEST** `shareInventoryItemPedestal` - Official query is `itemId` + `duration`, not `id`.
-   **[PROPS API]** **UPDATED TYPE** `Prop` - Optional `kind` (number).
-   **[PRINTS API]** **UPDATED TYPE** `Prints` - `ownerId` / `sharedBy` optional (official list/get omit them).
-   **[FAVORITE API]** **UPDATED TYPE** `FavoriteGroup` - Added `id` / `type`. `visibility` uses `FavoriteGroupVisibility`.
-   **[FAVORITE API]** **UPDATED TYPE** `FavoriteSingleGroupLimits` - Added `vrcPlusWorld`.
-   **[ECONOMY API]** **UPDATED TYPE** `Subscription` / `TokenBundle` - Added store product IDs (`appleProductId`, `googleProductId`, plus `googlePlanId` / `picoSku` on subscriptions). `oculusSku` optional.
-   **[PERMISSION API]** **UPDATED TYPE** `Permission` - Added `description`. `data.tags` optional. `data.max` optional.
-   **[AUTH API]** **UPDATED TYPE** `checkUserExistResponse` - `nameOk` optional (not always returned).
-   **[BETA API]** **UPDATED TYPE** `BetaIOSInformation` - Added `betaAppId`.
-   **[SYSTEM API]** **FIXED REQUEST** `fetchAPIConfig` - Was calling the invite-message path (`requiresData`), which threw "No path was provided!". Now uses `GET /config`. Allowed before login.
-   **[SYSTEM API]** **UPDATED TYPE** `APIConfig` - `dis-countdown` is a string. Added documented official fields (`CampaignStatus`, age-verification flags, `avatarPerfLimiter`, `availableLanguageCodes`, `constants.LANGUAGE`, iOS/build limits, economy pause fields, etc.). Announcements are an array.
-   **[CORE]** **UPDATED TYPE** `APIErrorBody` - Live errors are either `{ error: { message, status_code } }` (`APIRequestError`) or `{ error: string }` (`APIRequestErrorMessage`). `BaseApi` parses both (and empty/non-JSON 404s) without `unknown` casts.
-   **[GENERICS]** **UPDATED TYPE** `SystemTags` - Added `system_no_captcha` and `show_social_rank`.
-   **[GENERICS]** **UPDATED TYPE** `GroupAdminTags` / `languageTagsShort` - Live group tags `admin_featured_events_enabled`, `admin_vrc_event_*`, and language `ase`.

# Changelog 1.0.17 [ - July 31st, 2025 - ] Enum Export Update

## Added

-   **[WEBSOCKET API]** **EXPORTED ENUMS** `NotificationV2TypeEvents`, `CategoryV2Enum` - Made WebSocket notification type enums publicly available for external use.

# Changelog 1.0.16 [ - July 22nd, 2025 - ] Impostor + Calendar Update

## Added

-   **[GROUP API]** **ADDED NEW ENDPOINTS** `createGroupEvent`, `updateGroupEvent`, `deleteGroupEvent`, `getGroupEvent`, `getGroupEvents`, `getGroupNextEvent` and `followGroupEvent` - Complete Group Event management functionality with comprehensive validation and type safety.

-   **[GROUP API]** **ADDED TYPES** `GroupEventBase`, `GroupEvent`, `GroupEventList`, `PlatformType`, `EventCategoryType` - Comprehensive type definitions for group events.

-   **[GROUP API]** **ADDED ENUMS** `EventCategoryType`, `PlatformType` - Event categories (Music, Gaming, Hangout, etc.) and supported platforms (PC_ONLY, ANDROID, IOS).

-   **[AVATAR API]** **ADDED NEW ENDPOINTS** `getImpostorQueueStats`, `generateImpostor`, `deleteImpostor` - Complete Impostor avatar management functionality.

-   **[AVATAR API]** **ADDED TYPES** `ImpostorQueue`, `ImpostorCreation`, `ImpostorDeletion`, `dataKeysCreateImpostor`, `dataKeysDeleteImpostor` - Comprehensive type definitions for impostor functionality.

-   **[AVATAR API]** **ADDED AVATAR STYLES** `AvatarStyle`, `AvatarStyleTypes` - Avatar style system with primary/secondary styles including Furry, Animal, Object, Human, Robot, Anime, Realistic, Cartoon, Sci-Fi, Fantasy, Pop Culture, Fashion.

-   **[AVATAR API]** **ENHANCED AVATAR TYPE** `Avatar` - Added `style` property with comprehensive avatar styling support.

-   **[API PATHS]** **ADDED IMPOSTOR PATHS** - Added complete API path definitions for all impostor-related endpoints.

-   **[VALIDATION]** **ENHANCED VALIDATION** - Added comprehensive validation for all new group event and avatar endpoints with proper error handling and type safety.

-   **[DOCUMENTATION]** **COMPREHENSIVE DOCUMENTATION** - Added detailed JSDoc documentation for all new endpoints, types, and enums with examples and usage guidelines.

## Updated

-   **[GROUP API]** **UPDATED VALIDATION** - Enhanced input validation for group events with array limits, character limits, and date validation.

-   **[GROUP API]** **UPDATED DOCUMENTATION** - Enhanced method documentation with comprehensive parameter descriptions and usage notes.

## Note

-   Media endpoints will be coming in the future.

# Changelog 1.0.15 [ - April 6th, 2025 - ]

## Updated

-   **[GROUP API]** **FIXED REQUEST** `getGroupPosts` - Fixed endpoint URL that was using an outdated version.
-   **[GROUP API]** **ADDED TYPE** `GroupMemberLimitedBanResult` - New type to handle data returned when querying banned group members.

-   **[GENERICS]** **ADDED TYPES** - Added multiple player moderation ID types for better type safety.
-   **[GENERICS]** **ADDED TYPE** `BadgeIdType` - Added type for Badge IDs to improve type checking.

-   **[USER API]** **UPDATED DOCUMENTATION** - Enhanced descriptions for User Badge Data fields and usage.

-   **UPCOMING** - Preparing changes for improved User Data Format and enhanced Group data control based on permissions.

# Changelog 1.0.14 [ - March 12th, 2025 - ]

## Updated

-   **[INSTANCE API]** **UPDATED TYPE** `Instance` - Added attribute `ios` to `platforms` - This will tell you the number of users on iOS in the instance.
-   **[INSTANCE API]** **UPDATED TYPE** `Instance` - Added attribute `playerPersistenceEnabled` - This will tell you if player persistence is enabled in the instance.

-   **[WORLD API]** **UPDATED TYPE** `World` - Added attribute `worldSignature` - This will tell you the world signature of the world. VRChat uses this to verify the integrity of the world.

-   **INSTANCE CREATION** - Overhauled the instance creation process. Better control on instance creation id, world id, group, role restrictions, and more. This will allow you to create instances with more control and more options.

-   **[USER API]** **UPDATED ENUM** `AgeVerificationStatus` - Deprecated `Age_Verified`, now it's only either `Hidden` or `Verified_18_Plus`. This will allow you to know if a user is verified or not. The old value `Age_Verified` was ambiguous and could be confused with the new `Verified_18_Plus` value. It was only used to know if a user was verified but not 18+.
-   **[USER API]** **UPDATED TYPE** `User` - Added attribute `platform_history` - This will tell you the platforms the user has used in the past.

-   **[GROUP API]** **UPDATED ENUM** `Group` - Added new attributes to enum `GroupPermissionEnum`: groupInstanceAgeGatedJoin, groupInstanceManage, groupDefaultRoleManage. This will allow you to know if a user has the permission to manage group instances, manage age-gated instances, and manage the default role of the group.

-   **[GROUP API]** **UPDATED ENUM** `GroupMembershipStatus` - Added new value `banned` - This will allow you to know if a user is banned from a group.

-   **[GENERICS]** **UPDATED WORLD TAGS** - Added "feature_prints_disabled", "feature_drones_disabled", "feature_pedestals_disabled" and "feature_stickers_disabled" "feature_emoji_disabled" to World Tags possible.

-   **[WORLD API]** **UPDATED TYPE** `BaseWorld` - Added attribute `defaultContentSettings` - This will tell you the default content settings of the world. Aka, the new settings for world: **drones**, **emoji**, **pedestals**, **prints** and **stickers**.

-   **[WORLD API]** **NEW ENDPOINT** - Added a new endpoint called `getContentResticted` - This will allow you to get the content restricted status of a world. You must be the owner of the world to use this endpoint and the world needs to have been restricted by VRChat. (DMCA)

-   **TWEAKS** - Multiple fixes of types in Websocket events.

-   **[FEATURE]** - Added a new method to the VRChatAPI class called `manualCookiesLoad` - This will allow you to manually load cookies from a file. This is useful if you want to load cookies from a file that is not in the default location or if you want to load cookies from a file or location, that is not in the default format (default `cookies.json`).

# Changelog 1.0.13 [ - December 22rd, 2024 - ]

## Updated

-   **[AVATAR API]** **ADDED NEW ENDPOINT** `getImpostorQueueStats` - This will allow you to get the state of the impostor queue and know how long it will take to generate an impostor at the current moment.

# Changelog 1.0.12 [ - December 22rd, 2024 - ]

## Updated

-   **WEBSOCKET** - Added a new constructor parameter `customURL` and `customUserAgent` - This will allow you to specify a custom URL and User-Agent for the websocket connection. The custom URL will override the default URL for the websocket connection. The custom User-Agent will override the default User-Agent for the websocket connection.

-   **[AVATAR API]** **ADDED NEW ENDPOINT** `generateImpostor` - This will allow you to generate an impostor for a specific avatar, requires an avatarId
-   **[AVATAR API]** **ADDED NEW ENDPOINT** `deleteImpostor` - This will allow you to delete an impostor for a specific avatar, requires an avatarId

# Changelog 1.0.11 [ - December 21rd, 2024 - ]

## Updated

-   **[GROUP API]** **UPDATED REQUEST** `listGroupMembers` - Added parameter `roleId` - This will allow you to filter the members of a group by a specific role
-   **WEBSOCKET** - Better wording for the console logs when the websocket is connected or reconnected

# Changelog 1.0.10 [ - December 18rd, 2024 - ]

## Updated

-   **[INSTANCE API]** **UPDATED TYPE** `Instance` - Added attribute `ageGate` - This will tell you if the instance has an age gate or not
-   **[USER API]** **ADJUSTED FUNCTION** `isVRCPlusSubcriber` and `getVRCRankTags` - These functions can now be used by LimitedUser and LimitedUserFriend

-   ⚠️ **Updated VRChatAPI Constructor to now include the possibility to give a 2FA Secret code to it to automatically log-in. New Attribute name is `TwoFactorAuthSecret`.** This is useful if you have 2FA enabled on your account. This will allow you to log in without having to manually enter the 2FA code every time you log in. This is a security risk, so use it with caution. This is an alternative to using the .env file to store the 2FA code. This is useful if you want to use the library in a script that runs automatically and you don't want to have to enter the 2FA code every time you run the script or if you have a user input the 2FA code every time they run the script, or similar. If you specify the 2FA Secret in the constructor, it will take over whatever you've put in the .env file.
-   Readme updated to reflect this change.

# Changelog 1.0.9 [ - December 17rd, 2024 - ]

## Fixes

-   [WEBSOCKET] Fixed an issue where the websocket would not get the User-Agent from the VRChatApi class

# Changelog 1.0.8 [ - December 17rd, 2024 - ]

## Added

-   **ADDED PRINTS API ENDPOINTS**
-   **[PRINTS API]** `listPrints` endpoint added
-   **[AVATAR API]** **Added new Endpoint** `getImpostorQueueStats`
-   **[ECONOMY API]** **Added new Endpoint** `getInfoPush`
-   **[FILE API]** **Added new Type** `FileEmojis`
-   **[FILE API]** **Added new Enum** `AnimationStyle`
-   **[FILE API]** **Added new Enum** `MaskType`
-   **[FILE API]** **Added new Enum** `PerformanceTypes`
-   **[FILE API]** **Added new Enum** `MediaType` // Will be used in a future version

## Updated

-   **[USER API]** Fixed new Enum for Age Verification types. `AgeVerificationStatus`
-   **[USER API]** You can now update your Verification Status on your own profile if you are verified.
-   **[ECONOMY API]** **UPDATED TYPE** `Balance` - Added attribute `noTransactions`and`tiliaResponse``
-   **[FILE API]** **UPDATED TYPE** `UnityPackageAvatar` - Added attribute `performanceRating` and `impostorizerVersion`
-   **GENERICS** **Added new Tag** `admin_age_verification_enabled`
-   **GENERICS** **Added new ID Type** `PrintIdType` - New ID type for prints
-   **GENERICS** **Updated ID Type** `PlayerModerationObjectIdType` - Fixed the format
-   **[GROUP API]** **UPDATED TYPE** `Group` - Added attribute `ageVerificationSlotsAvailable`

This update is perfect to start automating age verification using VRChat's new Age Verification system.

# Changelog 1.0.6 [ - December 5rd, 2024 - ]

## Changes to VRChatApi Class

-   Added a new attribute to the VRChatApi class called `userAgent`. This will allow you to specify the User-Agent. This is useful if you want to change the User-Agent for a specific instance of the VRChatApi class.
-   Instantiating the VRChatApi class will now throw an error if the User-Agent is invalid.
-   The VRChatApi class now has new parameters: `userAgent`, `useCookies`, `cookiePath`, `EmailOTPCode` and `TOTPCode`. These parameters are used to set the User-Agent, use cookies, set the path to the cookies, set the Email OTP code and set the TOTP code respectively.
-   Additionally, the VRChatApi class parameters are set as an object instead of individual parameters. This is to make it easier to add new parameters in the future and control the order of the parameters, especially for optional parameters.
-   Cookies can now be enabled or disabled by setting the `useCookies` parameter to true or false. If cookies are enabled, the cookies will be saved to the path specified in the `cookiePath` parameter, if omitted, the cookies will be saved to the default path `./cookies.json`.

## More Changes

-   The .env file is now more optional. If you don't have a .env file, the library will still work. You can set the User-Agent, Email OTP code and TOTP code directly in the VRChatApi class as parameters when you instantiate it.
-   Changed the default User-Agent to be `ExampleProgram/0.0.1 my@email.com` instead of `ExampleApp/1.0.0 Email@example.com` for safety reasons. Please change it in your .env file if you are using the library.
-   Rewrote part of the Readme file.
-   Created WIP documentation on the Github Wiki.
-   Updated the .env.example file to reflect the new User-Agent.

### Better Error Handling from the VRChatApi Class

-   New Error Type `InvalideUserAgent` will be thrown if the User-Agent is invalid.
-   Better handling of errors being thrown during bad login procedures.

---

# Changelog 1.0.5 [ - December 3rd, 2024 - ]

## Added

-   **ADDED JAMS API ENDPOINTS**
-   **ADDED BETA API ENDPOINT**
-   **[NOTIFICATION API]** `respondToNotification` endpoint added <b>(REQUIRE MORE TESTING)</b>
-   **[ECONOMY API]** `getUserProductListings` endpoint added
-   **[ECONOMY API]** `listTokenBundles` endpoint added
-   **[ECONOMY API]** `getTiliaStatus` endpoint added
-   **[FAVORITE API]** `getFavoriteLimits` endpoint added
-   **[FILE API]** `getFileVersionAnalysis` endpoint added <b>(REQUIRE MORE TESTING)</b>
-   **[FILE API]** `getFileVersionAnalysisSecurity` endpoint added <b>(REQUIRE MORE TESTING)</b>
-   **[FILE API]** `getFileVersionAnalysisStandard` endpoint added <b>(REQUIRE MORE TESTING)</b>
-   **[GROUP API]** `getGroupInstances` endpoint added <b>(REQUIRE MORE TESTING)</b>
-   **[GROUP API]** `editGroupPost` endpoint added
-   **[JAMS API]** `getJamsList` endpoint added
-   **[JAMS API]** `getJamInfo` endpoint added
-   **[JAMS API]** `getJamSubmissions` endpoint added
-   **[USER API]** `getUserFeedback` endpoint added <i>(Altho this endpoint was added, it is already considered deprecated)</i>
-   **[USER API]** `getAllUserNotes` endpoint added
-   **[USER API]** `updateUserNote` endpoint added
-   **[USER API]** `getAUserNote` endpoint added
-   **[USER API]** `getUserGroupInstances` endpoint added <i>(Be careful, this endpoint only works for the user that is logged in)</i>
-   **[BETA API]** `getIOSClosedBetaInformation` endpoint added <i>(Who knows how long this will last)</i>

-   New function accessible to translate special characters that vrchat doesn't allow in many fields
-   ⚠️ Added a new measure in place to cover login in from a new location. This will require the user to verify their email address before they can log in. This used to not be handled.

## Changed

-   A duplicate endpoint was removed `getOwnSubscription`. Duplicate of `getCurrentSubscriptions`.
-   All required ID, like Group ID, Notification ID, World ID, Avatar ID, etc are now stricter. Only exception is the `userId` field, which is still a string because of legacy username format.
    -   Here is the list of now added ID object Types:
    ```ts
       `FriendRequestIdType`,
       `UserNoteIdType`,
       `PlayerModerationObjectIdType`,
       `PermissionIdType`,
       `WorldIdType`,
       `InstanceIdType`,
       `AvatarIdType`,
       `NotificationIdType`,
       `FileIdType`,
       `UnityPackageIdType`,
       `GroupIdType`,
       `GroupRoleIdType`,
       `GroupGalleryIdType`,
       `GroupMemberIdType`,
       `GroupAnnouncementIdType`,
       `GroupAuditLogIdType`,
       `GroupGalleryImageIdType`,
       `SteamTransactionIdType`,
       `ProductListingIdType`,
       `ProductListingVariantIdType`,
       `LicenseGroupIdType`,
       `tiliaIdType`,
       `TiliaDatabaseIdType`,
       `FavoriteIdType`,
       `FavoriteGroupIdType`,
       `InviteMessageIdType`,
       `JamIdType`,
       `JamSubmissionIdType`,
       `FeedbackIdType`,
    ```
    By example now, a group ID needs to have this format: `grp_${string}-${string}-${string}-${string}-${string}` to be considered valid.

## Updated

### **NEW TYPES**

-   [Economy API] **ADDED TYPE** `TokenBundle`
-   [Economy API] **ADDED TYPE** `TiliaStatus`
-   [Favorite API] **ADDED TYPE** `FavoriteLimits`
-   [Favorite API] **ADDED TYPE** `FavoriteSingleGroupLimits`
-   [File API]**ADDED TYPE** `FileAnalysis`
-   [Group API]**ADDED TYPE** `GroupInstance`
-   [Group API]**ADDED TYPE** `UserGroupInstances`
-   [JAMS API]**ADDED TYPE** `Jam` & `JamSubmission` & enum `JamTypes`
-   [User API]**ADDED TYPE** `UserNote` & `Feedback`

### **UPDATED TYPES**

-   [Economy API] Listing Type - Added attribute `buyerRefundable` and `groupIcon` object
-   [User API] **UPDATED TYPE** `CurrentUser` - Added attribute `ageVerificationStatus` & `ageVerified` & `isAdult` & `pronouns` & `receiveMobileInvitations` & `last_mobile`
-   [User API] **UPDATED TYPE** `UserBase` - Added attribute `ageVerificationStatus` & `pronouns`
-   [User API] **UPDATED TYPE** `LimitedUser` - Edited attribute `isFriend` to be set to false. (This is always false because a LimitedUser is not a friend)
-   [User API] **UPDATED TYPE** `LimitedUserFriend` - Edited attribute `isFriend` to be set to true. (This is always true because a LimitedUserFriend is a friend)
-   [User API] **UPDATED TYPE** `LimitedUserFriend` - Added attribute `last_mobile`
-   [User API] **UPDATED TYPE** `User` - Edited attribute `isBoopingEnabled` to be marked as deprecated
-   [User API] **UPDATED TYPE** `UserBadge` - Added attribute `assignedAt` & `hidden` & `updated_at`
-   [Invite API] **UPDATED TYPE** `Instance` - Added attribute `hardclose` & `hasCapacityForYou` & `closedAt`
-   [World API] **UPDATED TYPE** `World` - Added attribute `urlList` & `pendingUpload`
-   [World API] **UPDATED TYPE** `LimitedWorld` - Added attribute `pendingUpload`

### **OTHERS**

-   Endpoints World search and User search now have a new parameter `fuzzy` that will allow you to search for similar names. This is useful for when you don't know the exact name of the world or user you are looking for.
-   [World API] for endpoint `searchAllWorlds` - Added search parameter `includeInstances`

## Fixed

-   Fixed responding to invite for group invite. The endpoint wasn't typed correctly
-   Fixed multiple imports from the library that weren't accessible from the main module
-   Searching users will now return a list of users that are a mix of LimitedUser and LimitedUserFriend (more fields are available on LimitedUserFriend) (Check isFriend attribute to know if the user is a friend)
-   Deprecated endpoint are now properly marked as deprecated in the jsdoc
-   `Instance` type's attribute `users` is not properly defined to be an array of either Limited User or Limited User Friend, or empty array. Only if the instance is made by you will it return that field.
