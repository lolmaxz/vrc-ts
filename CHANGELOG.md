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

## IN PROGRESS

-   All required ID, like Group ID, Notification ID, World ID, Avatar ID, etc are now stricter. Only exception is the `userId` field, which is still a string because of legacy username format.
