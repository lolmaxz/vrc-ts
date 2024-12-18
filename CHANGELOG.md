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
