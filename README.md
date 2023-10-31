
# VRChat Wrapper TS

A TypeScript wrapper for the VRChat API, simplifying the process of interacting with VRChat's functionalities programmatically.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Authenticating](#authenticating)
- [Notes](#notes)
- [Endpoints Supported](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Simplified interaction with the VRChat API.
- Written in TypeScript, promoting type safety and object-oriented patterns.
- Suitable for creating bots, applications, or services that interact with VRChat.

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/lolmaxz/vrchat-wrapper-ts.git
```

Navigate to the project directory:

```bash
cd vrchat-wrapper-ts
```

Install the project dependencies:

```bash
npm install
```

## Usage

Here’s how you can use the `vrchat-wrapper-ts` in your project:

```typescript
import VRChatAPI from 'vrchat-wrapper-ts';

const api = new VRChatAPI();

api.login('username', 'password').then(() => {
    console.log('Logged in successfully!');
});
```

## Authenticating

VRChat now has an automatic 2FA system in place that is by default set to email and you can also enable Authy App 2FA with a TOTP (Time based One Time Password).
Given this, you need to remember that **YOU WILL** need to add one more thing in your `.env` file in order to complete the authenticating process.

Depending on your situation, here is how you can define either the **Email OTP** or the **TOTP** in the `.env` file:

- **Email OTP** :
```.env
EMAIL_2FA_CODE=123456
```

- **TOTP** :
```.env
TOTP_2FA_CODE=123456
```

For the **Email OTP** you have 15 minutes after receiving it to use it.
For the **TOTP** you have 30 seconds between each code reset. It is time based!

## Bonus Easier Authentication

This Wrapper also comes with a 2FA Secret code generator. You will simply need to specify it in your `.env` file like so:
```.env
VRCHAT_2FA_SECRET=2W4X6Z7YQ9A2B4C62W4X6Z7YQ9A2B4C6
```
It comes in the form of 32 digits and capital characters mixed string.
-> Using this secret, you'll be able to authenticate automatically each time without having to deal with a 6 digits code.
*To get your secret you can simply scan the QR code VRChat gives you when enabling 2FA on your account. Scan it with a camera and copy the text to get the secret. Then you can add it to the Authy App if you want.*

## Notes

You can also use the `.env` file to login and/or store your credential like so:
```text
VRCHAT_USERNAME=username_here
VRCHAT_PASSWORD=password_here
```

For more option with the `.env` file, check the `.env.example` file in the project.

Websocket will eventually come when I can implement it.

### Endpoints

- __Full Support of VRChat API with Typing__
- 
Here is the full list of endpoints by category that this wrapper does implements and has all typed:

**auth** :
    - `userExist`, `getCurrentUserInfo`, `verify2FATOTP`, `verify2FAOTP`*, `verify2FAEmail`, `verifyAuthToken`, `logout`, `deleteUser`*
    
**avatars** :
    - `getOwnAvatar`, `searchAvatars`, `createAvatar`, `getAvatar`, `updateAvatar`, `deleteAvatar`, `selectAvatar`, `selectFallbackAvatar`, `listFavoritedAvatars`
    
**economy*** :
    - `listSteamTransactions`, `getSteamTransaction`, `getCurrentSubscriptions`, `listSubscriptions`, `getLicenseGroup`
    
**favorites*** :
    - `listFavorites`, `addFavorite`, `showFavorite`, `removeFavorite`, `listFavoriteGroups`, `showFavoriteGroup`, `updateFavoriteGroup`, `clearFavoriteGroup`
    
**files*** :
    - `listFiles`, `createFile`, `showFile`, `createFileVersion`, `deleteFile`, `downloadFileVersion`, `deleteFileVersion`, `finishFileDataUpload`, `startFileDataUpload`, `checkFileDataUploadStatus`
    
**friends** :
    - `listFriends`, `sendFriendRequest`, `deleteFriendRequest`, `checkFriendStatus`, `unfriend`
    
**groups** :
    - `createGroup`, `getGroupById`, `updateGroup`, `deleteGroup`, `getGroupAnnouncement`, `createGroupAnnouncement`, `deleteGroupAnnouncement`, `getGroupAuditLogs`, `getGroupBans`, `banGroupMember`, `unbanGroupMember`, `createGroupGallery`, `getGroupGalleryImages`, `updateGroupGallery`, `deleteGroupGallery`, `addGroupGalleryImage`, `deleteGroupGalleryImage`, `getGroupInvitesSent`, `inviteUserToGroup deleteUserInvite`, `joinGroup`, `leaveGroup`, `listGroupMembers`, `getGroupMember`, `updateGroupMember`, `kickGroupMember`, `addRoleToGroupMember`, `removeRoleFromGroupMember`, `listGroupPermissions`, `getGroupJoinRequests`, `cancelGroupJoinRequest`, `respondGroupJoinrequest`, `getGroupRoles`, `createGroupRole`, `updateGroupRole`, `deleteGroupRole`
    
**invites** :
    - `inviteUser`, `inviteMyselfToInstance`, `requestInvite`, `respondInvite`, `listInviteMessages`, `getInviteMessage`, `updateInviteMessage`, `resetInviteMessage`
    
**instances*** :
    - `getInstance`, `getInstanceShortName`, `sendSelfInvite`, `getInstanceByShortName`, `createInstance`
    
**notifications*** :
    - `listNotifications`, `acceptFriendRequest`, `markNotificationAsRead`, `deleteNotification`, `clearAllNotifications`
    
**permissions*** :
    - `getAssignedPermissions`, `getPermission`
    
**playermoderations*** :
    - `searchPlayerModerations`, `moderateUser`, `clearAllPlayerModerations`, `getPlayerModeration`, `deletePlayerModeration`, `unmoderateUser`
    
**system*** :
    - `fetchAPIConfig`, `showInformationNotices`, `downloadCSS`, `downloadJavaScript`, `checkAPIHealth`, `currentOnlineUsers`, `currentSystemTime`
    
**users** :
    - `searchAllUsers`, `getUserbyUsername`, `getUserbyID`, `updateUserInfo`, `getUserGroups`, `getUserGroupRequests`
    
**worlds*** :
    - `searchAllWorlds`, `createWorld`, `listActiveWorlds`, `listFavoritedWorlds`, `listRecentWorlds`, `getWorldbyID`, `updateWorld`, `deleteWorld`, `getWorldMetadata`, `getWorldPublishStatus`, `publishWorld`, `unpublishWorld`, `getWorldInstance`

! Marks of an asterics are either not yet implemented or yet to be added. Progress is going fast, come back to see the update.

## Contributing

Contributions are welcome! Feel free to open an issue or create a pull request.

A huge thank you to the community behind the VRChatApi project for their documentation on the API so far.
- Check them out at <https://vrchatapi.github.io/>.

Thank you as well to Huijiro, my partner helping me learn the best way :)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.