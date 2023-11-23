
# VRChat Wrapper TS

A TypeScript wrapper for the VRChat API, simplifying the process of interacting with VRChat's functionalities programmatically.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Authenticating](#authenticating)
- [Notes](#notes)
- [Endpoints Supported](#endpoints)
- [WebSocket Support](#websocket)
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

Then in your program, you can simply authenticate this way:
```typescript
api.login().then(() => {
    console.log('Logged in successfully!');
});
```
No need for sending the credentials.

For more option with the `.env` file, check the `.env.example` file in the project.

Websocket will eventually come when I can implement it.

## Endpoints

### Full Support of VRChat API with Typing

Here is the full list of endpoints by category that this wrapper does implements and has all typed:

**Authentication API** :

- `userExist`, `getCurrentUserInfo`, `verify2FATOTP`, `verify2FAOTP` `*`, `verify2FAEmail`, `verifyAuthToken`, `logout`, `deleteUser` `*`
    
**Avatars API** :

- `getOwnAvatar`, `searchAvatars`, `createAvatar`, `getAvatar`, `updateAvatar`, `deleteAvatar`, `selectAvatar`, `selectFallbackAvatar`, `listFavoritedAvatars`

**Economy API** : (including the new creator economy endpoints)

- `listSteamTransactions`, `getSteamTransaction`, `getCurrentSubscriptions`, `listSubscriptions`, `getLicenseGroup`, `getProductListing`, `getOwnSubscription`, `getTiliaTOS`, `getOwnPurchases`, `getOwnTransactions`, `getTiliaSyncData`, `getBalance`, `getLicenses`
    
**Favorites API** :

- `listFavorites`, `addFavorite`, `showFavorite`, `removeFavorite`, `listFavoriteGroups`, `showFavoriteGroup`, `updateFavoriteGroup`, `clearFavoriteGroup`
    
**Files API** :

- `listFiles`, `createFile`, `showFile`, `createFileVersion`, `deleteFile`, `downloadFileVersion`, `deleteFileVersion`, `finishFileDataUpload`, `startFileDataUpload`, `checkFileDataUploadStatus`
    
**Friends API** :

- `listFriends`, `sendFriendRequest`, `deleteFriendRequest`, `checkFriendStatus`, `unfriend`
    
**Groups API** :

- `createGroup`, `getGroupById`, `updateGroup`, `deleteGroup`, `getGroupAnnouncement`, `createGroupAnnouncement`, `deleteGroupAnnouncement`, `getGroupAuditLogs`, `getGroupBans`, `banGroupMember`, `unbanGroupMember`, `createGroupGallery`, `getGroupGalleryImages`, `updateGroupGallery`, `deleteGroupGallery`, `addGroupGalleryImage`, `deleteGroupGalleryImage`, `getGroupInvitesSent`, `inviteUserToGroup deleteUserInvite`, `joinGroup`, `leaveGroup`, `listGroupMembers`, `getGroupMember`, `updateGroupMember`, `kickGroupMember`, `addRoleToGroupMember`, `removeRoleFromGroupMember`, `listGroupPermissions`, `getGroupJoinRequests`, `cancelGroupJoinRequest`, `respondGroupJoinrequest`, `getGroupRoles`, `createGroupRole`, `updateGroupRole`, `deleteGroupRole`
    
**Invites API** :

- `inviteUser`, `inviteMyselfToInstance`, `requestInvite`, `respondInvite`, `listInviteMessages`, `getInviteMessage`, `updateInviteMessage`, `resetInviteMessage`
    
**Instances API** :

- `getInstance`, `getInstanceShortName`, `sendSelfInvite`, `getInstanceByShortName`, `createInstance`
    
**Notifications API** :

- `listNotifications`, `acceptFriendRequest`, `markNotificationAsRead`, `deleteNotification`, `clearAllNotifications`
    
**Permissions API** :

- `getAssignedPermissions`, `getPermission`
    
**Playermoderations API** :

- `searchPlayerModerations`, `moderateUser`, `clearAllPlayerModerations`, `getPlayerModeration`, `deletePlayerModeration`, `unmoderateUser`
    
**System API** :

- `fetchAPIConfig`, `showInformationNotices` `*`, `downloadCSS` `*`, `downloadJavaScript` `*`, `checkAPIHealth` `*`, `currentOnlineUsers`, `currentSystemTime`
    
**Users API** :

- `searchAllUsers`, `getUserbyUsername`, `getUserbyID`, `updateUserInfo`, `getUserGroups`, `getUserGroupRequests`
    
**Worlds API** :

- `searchAllWorlds`, `createWorld`, `listActiveWorlds`, `listFavoritedWorlds`, `listRecentWorlds`, `getWorldbyID`, `updateWorld`, `deleteWorld`, `getWorldMetadata`, `getWorldPublishStatus`, `publishWorld`, `unpublishWorld`, `getWorldInstance`

! Marks of an asterics are either not yet implemented or yet to be added. Progress is going fast, come back to see the update.


## WebSocket

This code also supports connecting to VRChat's Websocket service and be able to listen to any events in real time. It has a connection auto renewal, if the connection is lost, it will automatically create a new connection.

To be able to use the WebSocket, you can simply do as follow:
```typescript
import VRChatAPI from 'vrchat-wrapper-ts';
import { WebSocketClient } from "./requests/WebSocketApi";

const api = new VRChatAPI();

new WebSocketClient({vrchatAPI: api});
```

The system ensure you've given the instance of `api` as a parameter so it knows which username and password to use to connect to the websocket.

You also need to have a valid authToken saved from authenticating with the API first before the WebSocket is functional.

### Extra Websocket

To ensure that not all events are always firing, you can specify to the WebSocket constructor which events you actually want to listen to and then redefine the behavior of that event.

Here is an example if we only wanted to listen to incoming __friend request__:
```typescript
import VRChatAPI from 'vrchat-wrapper-ts';
import { EventType, WebSocketClient, friendRequestNotification } from "./requests/WebSocketApi";

const api = new VRChatAPI();

const websocket = new WebSocketClient({vrchatAPI: api, eventsToListenTo: [EventType.All]});

websocket.on(EventType.Friend_Request, (eventData: friendRequestNotification) => {
    console.log("A friend request was received by: " + eventData.senderUsername);
  });
```

> This will print out `A friend request was received by: [USERNAME OF THE SENDER]` anytime a friend request is received.

**EventType** can be multiple events, ranging from notification types to friend information changing, invite detection and way more. Optionally, you can also set another parameter `logAllEvents` to true if you want the console to log any events you are listening to currently when they happen.

__Here is the current list of supported events:__
- `User_Online`, `User_Update`, `User_Location`, `User_Offline`, `Friend_Online`, `Friend_Active`, `Friend_Update`, `Friend_Location`, `Friend_Offline`, `Friend_Add`, `Friend_Delete`, `Notification`, `Notification_V2`, `Notification_V2_Update`, `Notification_V2_Delete`, `Show_Notification`, `Hide_Notification`, `Response_Notification`, `See_Notification`, `Clear_Notification`, `Content_Refresh`, `Group_Join`, `Group_Leave`, `Group_Member_Updated`, `Group_Role_Updated`, `Error`, `All`, `Friend`, `User`, `Group`, `Notification_V1_All`, `Notification_V2_All`, `Notification_All`, `Friend_Request`, `Request_Invite`, `Invite`, `Invite_Response`, `Request_Invite_Response`, `Vote_To_Kick`, `Group_Announcement`, `Group_Invite`, `Group_Informative`, `Group_Join_Request`

## Contributing

Contributions are welcome! Feel free to open an issue or create a pull request.

A huge thank you to the community behind the VRChatApi project for their documentation on the API so far.
- Check them out at <https://vrchatapi.github.io/>.

Thank you as well to Huijiro, my partner helping me learn the best way :)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
