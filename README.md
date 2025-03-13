# VRC-TS - A VRChat Wrapper in TypeScript

Latest version: **v1.0.14**<br>
Changelogs: [CHANGELOG Link](https://github.com/lolmaxz/vrc-ts/blob/main/CHANGELOG.md)

From scratch TypeScript wrapper for the VRChat API, simplifying the process of interacting with VRChat's API programmatically. Perfect if you are looking to build bots, applications, or services that interact with VRChat's API!

<details>
<summary>⚠️ Please Read This If You Are Updating From 1.0.5 or Lower</summary>

-   The .env file is now more optional. If you don't have a .env file, the library will still work. You can set the User-Agent, Email OTP code and TOTP code directly in the VRChatApi class as parameters when you instantiate it, as well as the cookies path and if you want to use cookies!
-   The VRChatApi class's parameters is now an object of multiple optional options.
-   ⚠️ If you used to instantiate it like this:

```ts
const api = new VRChatAPI();
```

or

```ts
const api = new VRChatAPI('username', 'password');
```

You will now have to instantiate it like this:

```ts
const api = new VRChatAPI({});
```

or

```ts
const api = new VRChatAPI({ username: 'username', password: 'password' });
```

### This change was made to make the library more flexible and to allow for more options in the future and also to be more in line with the rest of the library's structure.

</details>

---

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Authenticating](#authenticating)
    -   [Using Email OTP](#using-email-otp)
    -   [Using TOTP](#using-totp)
    -   [Using `VRCHAT_2FA_SECRET`](#using-vrchat_2fa_secret)
-   [User-Agent](#user-agent)
-   [Cookies](#cookies)
-   [Notes](#notes)
-   [Endpoints Supported](#endpoints-supported)
-   [WebSocket Support](#websocket-support)
-   [Basic Example](#basic-example)
-   [Error Handling](#error-handling)
-   [Extra Information](#extra-information)
-   [Contributing](#contributing)
-   [License](#license)
-   [Changelog](#changelog)
-   [Contact](#contact)
-   [Final Notes](#final-notes)

---

## Features

-   **Full TypeScript Support**: Benefit from strong typing and IntelliSense.
-   **Comprehensive API Coverage**: Most of VRChat's API endpoints are integrated.
-   **WebSocket Support**: Receive real-time updates with a fully functional WebSocket client.
-   **Automatic 2FA Handling**: Simplify authentication with built-in 2FA code generation.
-   **Cookie Management**: Maintain session state effortlessly with the built-in cookies manager.
-   **Group Functionality**: Enhanced support for VRChat group endpoints.
-   **Dual Module Support**: Compatible with both CommonJS and ES Modules.

---

## Installation

Install the project dependencies:

```npm
npm install vrc-ts
```

> [!IMPORTANT] > **Environment Setup**<br>
> Ensure you have a `.env` file in your project's root directory with the required variables.

---

## Usage

Here’s how you can use `vrc-ts` in your project:

### TypeScript

```typescript
import { RequestError, VRChatAPI } from 'vrc-ts';

const api = new VRChatAPI({ userAgent: 'ExampleProgram/0.0.1' });
main();

async function main() {
    try {
        await api.login();
        console.log(`Logged in successfully as ${api.currentUser!.displayName}!`);
    } catch (error) {
        if (error instanceof RequestError) {
            console.error(`Failed to login: ${error.message}`);
        } else {
            console.error(`An unexpected error occurred: ${error}`);
        }
    }
}
```

### JavaScript (CommonJS)

```javascript
const { RequestError, VRChatAPI } = require('vrc-ts');

const api = new VRChatAPI({ userAgent: 'ExampleProgram/0.0.1' });
main();

async function main() {
    try {
        await api.login();
        console.log(`Logged in successfully as ${api.currentUser.displayName}!`);
    } catch (error) {
        if (error instanceof RequestError) {
            console.error(`Failed to login: ${error.message}`);
        } else {
            console.error(`An unexpected error occurred: ${error}`);
        }
    }
}
```

> [!TIP]
> Multiple Sessions<br>
> If you need to create multiple sessions, you can instantiate the `VRChatAPI` class multiple times.
>
> It's possible to have multiple cookies for different accounts, but be cautious with rate limits globally.

---

## User-Agent

The User-Agent header is required for all requests to VRChat's API. You can set it in the `.env` file:

```dotenv
USER_AGENT=ExampleProgram/0.0.1
```

or

Add it as an optional parameter when instantiating the VRChatAPI class:

```typescript
const api = new VRChatAPI({ userAgent: 'ExampleProgram/0.0.1' });
```

---

## Cookies

Cookies are used to maintain session state. By default, cookies are **disabled** and stored in the `./cookies.json` file. You can enable cookies and define the path/filename in the `.env` file:

```dotenv
USE_COOKIES=true
COOKIES_PATH='./cookies.json'
```

or

Add it as an optional parameter when instantiating the VRChatAPI class:

```typescript
const api = new VRChatAPI({ useCookies: true, cookiePath: './cookies.json' });
```

> [!NOTE] > **Cookies Path**<br>
> If the `COOKIES_PATH` is omitted, cookies will be saved to the default path `./cookies.json`.
>
> **Cookies Usage**<br>
> Cookies are used to maintain session state. If you disable cookies, you may need to re-authenticate on each application start.
>
> This is useful for applications that require a fresh login each time. Otherwise you might get quickly rate limited. (Error 429)
>
> ⚠️ Important to note that if you are using cookies, you should be careful with the cookies file. It contains your session information and should be kept secure and private at all times.

---

## Authenticating

VRChat requires two-factor authentication (2FA). Depending on your setup (Email OTP or TOTP), follow the steps below:

### Using Email OTP

1. Start your application; you'll receive a 6-digit code via email.
2. Add the code to your `.env` file:

    ```dotenv
    EMAIL_2FA_CODE=123456
    ```

    or

    Add it as an optional parameter when instantiating the VRChatAPI class:

    ```typescript
    const api = new VRChatAPI({ EmailOTPCode: '123456' });
    ```

3. Restart your application within **15 minutes** to complete authentication.

> [!NOTE] > **Email OTP Validity**<br>
> The Email OTP code is valid for **15 minutes**. Ensure you use it within this time frame.

### Using TOTP

1. Obtain the 6-digit code from your authenticator app.
2. Add the code to your `.env` file:

    ```dotenv
    TOTP_2FA_CODE=123456
    ```

    or

    Add it as an optional parameter when instantiating the VRChatAPI class:

    ```typescript
    const api = new VRChatAPI({ TOTPCode: '123456' });
    ```

3. Restart your application within **30 seconds** to complete authentication.

> [!NOTE]  
> **TOTP Code Validity**<br>
> The TOTP code is valid for **30 seconds**. Ensure you use it promptly.

### Using `VRCHAT_2FA_SECRET`

For automatic 2FA code generation:

1. Add your 2FA secret to the `.env` file:

    ```dotenv
    VRCHAT_2FA_SECRET=YOUR_32_CHARACTER_SECRET
    ```

    or

    Add it as an optional parameter when instantiating the VRChatAPI class:

    ```typescript
    const api = new VRChatAPI({ TwoFactorAuthSecret: 'YOUR_32_CHARACTER_SECRET' });
    ```

2. The application will generate TOTP codes automatically, removing the need for manual entry.

> [!CAUTION] > **Security Warning**<br>
> Make sure to **never share or commit** your passwords or 2FA secrets. Keep them secure.

---

## Notes

-   You can store your credentials in the `.env` file:

    ```dotenv
    VRCHAT_USERNAME=your_username
    VRCHAT_PASSWORD=your_password
    ```

-   Then instantiate the `VRChatAPI` without arguments:

    ```typescript
    const api = new VRChatAPI({});
    ```

> [!NOTE] > **Additional .env Options**<br>
> For more options with the `.env` file, check the `.env.example` file in the project.

---

## Endpoints Supported

Here is the full list of endpoints by category that this wrapper implements. For detailed documentation, please refer to the [API Documentation](https://github.com/lolmaxz/vrc-ts/wiki).

**Authentication API**:

-   `userExist`, `getCurrentUserInfo`, `verify2FATOTP`, `verify2FAEmail`, `verifyAuthToken`, `logout`

**Avatars API**:

-   `getOwnAvatar`, `searchAvatars`, `createAvatar`, `getAvatar`, `updateAvatar`, `deleteAvatar`, `selectAvatar`, `selectFallbackAvatar`, `listFavoritedAvatars`, `getImpostorQueueStats`, `generateImpostor`, `deleteImpostor`

**Beta API**:

-   `getIOSClosedBetaInformation`

**Economy API**:

-   `listSteamTransactions`, `getSteamTransaction`, `getCurrentSubscriptions`, `listSubscriptions`, `getLicenseGroup`, `getProductListing`, `getTiliaTOS`, `getOwnPurchases`, `getOwnTransactions`, `getTiliaSyncData`, `getBalance`, `getLicenses`, `getUserProductListings`, `listTokenBundles`, `getTiliaStatus`, `getInfoPush`

**Favorites API**:

-   `listFavorites`, `addFavorite`, `showFavorite`, `removeFavorite`, `listFavoriteGroups`, `showFavoriteGroup`, `updateFavoriteGroup`, `clearFavoriteGroup`, `getFavoriteLimits`

**Files API**:

-   `listFiles`, `createFile`, `showFile`, `createFileVersion`, `deleteFile`, `downloadFileVersion`, `deleteFileVersion`, `finishFileDataUpload`, `startFileDataUpload`, `checkFileDataUploadStatus`, `getFileVersionAnalysis`, `getFileVersionAnalysisSecurity`, `getFileVersionAnalysisStandard`

**Friends API**:

-   `listFriends`, `sendFriendRequest`, `deleteFriendRequest`, `checkFriendStatus`, `unfriend`

**Groups API**:

-   `searchGroups`, `createGroup`, `getGroupById`, `updateGroup`, `deleteGroup`, `createGroupPost`, `getGroupPosts`, `deleteGroupPost`, `getGroupAuditLogs`, `getGroupBans`, `banGroupMember`, `unbanGroupMember`, `createGroupGallery`, `getGroupGalleryImages`, `updateGroupGallery`, `deleteGroupGallery`, `addGroupGalleryImage`, `deleteGroupGalleryImage`, `getGroupInvitesSent`, `inviteUserToGroup`, `deleteUserInvite`, `joinGroup`, `leaveGroup`, `listGroupMembers`, `getGroupMember`, `updateGroupMember`, `kickGroupMember`, `addRoleToGroupMember`, `removeRoleFromGroupMember`, `listGroupPermissions`, `getGroupJoinRequests`, `cancelGroupJoinRequest`, `respondGroupJoinrequest`, `getGroupRoles`, `createGroupRole`, `updateGroupRole`, `deleteGroupRole`, `getGroupInstances`, `editGroupPost`

**Invites API**:

-   `inviteUser`, `inviteMyselfToInstance`, `requestInvite`, `respondInvite`, `listInviteMessages`, `getInviteMessage`, `updateInviteMessage`, `resetInviteMessage`

**Instances API**:

-   `getInstance`, `getInstanceShortName`, `sendSelfInvite`, `getInstanceByShortName`, `createNormalInstance`, `createGroupInstance`

**Jams API**:

-   `getJamsList`, `getJamInfo`, `getJamSubmissions`

**Notifications API**:

-   `listNotifications`, `acceptFriendRequest`, `markNotificationAsRead`, `deleteNotification`, `clearAllNotifications`, `respondToNotification`

**Permissions API**:

-   `getAssignedPermissions`, `getPermission`

**Playermoderations API**:

-   `searchPlayerModerations`, `moderateUser`, `clearAllPlayerModerations`, `getPlayerModeration`, `deletePlayerModeration`, `unmoderateUser`

**Prints API**:

-   `listPrints`

**System API**:

-   `fetchAPIConfig`, `currentOnlineUsers`, `currentSystemTime`

**Users API**:

-   `searchAllUsers`, `getUserbyUsername`, `getUserbyID`, `updateUserInfo`, `getUserGroups`, `getUserGroupRequests`, `getUserRepresentedGroup`, `getUserFeedback` _(Deprecated)_, `getAllUserNotes`, `updateUserNote`, `getAUserNote`, `getUserGroupInstances`

**Worlds API**:

-   `searchAllWorlds`, `createWorld`, `listActiveWorlds`, `listFavoritedWorlds`, `listRecentWorlds`, `getWorldbyID`, `updateWorld`, `deleteWorld`, `getWorldMetadata`, `getWorldPublishStatus`, `publishWorld`, `unpublishWorld`, `getWorldInstance`

> [!CAUTION] > **Usage Disclaimer**<br>
> Some endpoints may not yet be fully implemented or require more testing. Use them at your own discretion. VRChat's API is not officially documented, and this project relies on community efforts.

> [!TIP]  
> **Instance creation** have two separate endpoints now!
> One for regular instance and one for group instance. For regular instance you can also just create the instance ID without touching the API. Function is called `generateNormalInstanceIdOnly()` in the `instanceApi`.

---

## WebSocket Support

VRChat's WebSocket has also been implemented. You can listen for specific events in real-time. The connection will stay alive and auto-renew. If the connection is lost, a reconnection will be attempted automatically.

> [!TIP]
> For more detailed information and to get started with VRChat's WebSocket, you can [head here](<https://github.com/lolmaxz/vrc-ts/wiki/VRC-WebSocket-API-(Draft-WIP)#2-getting-started>).

### Basic WebSocket Usage

**TypeScript**

```typescript
import { VRChatAPI, VRCWebSocket, EventType, FriendOnline } from 'vrc-ts';

const api = new VRChatAPI({});

const ws = new VRCWebSocket({
    vrchatAPI: api,
    eventsToListenTo: [EventType.All],
});

// Listening to friend online events
ws.on(EventType.Friend_Online, (data: FriendOnline) => {
    console.log(`Friend ${data.user.displayName} is online at ${data.location}.`);
});
```

**JavaScript**

```javascript
const { VRChatAPI, VRCWebSocket, EventType } = require('vrc-ts');

const api = new VRChatAPI({});

const ws = new VRCWebSocket({
    vrchatAPI: api,
    eventsToListenTo: [EventType.All],
});

// Listening to friend online events
ws.on(EventType.Friend_Online, (data) => {
    console.log(`Friend ${data.user.displayName} is online at ${data.location}.`);
});
```

> [!WARNING] > **Authentication Required**<br>
> A valid `authToken` is required. Ensure you authenticate with the API before initializing the WebSocket.

### Specifying Events to Listen To

You can specify which events you want to listen to (Default: `EventType.All`):

```typescript
import { VRChatAPI, VRCWebSocket, EventType, friendRequestNotification } from 'vrc-ts';

const api = new VRChatAPI({});

const ws = new VRCWebSocket({
    vrchatAPI: api,
    eventsToListenTo: [EventType.Friend_Request],
});

ws.on(EventType.Friend_Request, (eventData: friendRequestNotification) => {
    console.log('A friend request was received from: ' + eventData.senderUsername);
});
```

**Supported Events Include**:

-   `User_Online`, `User_Update`, `User_Location`, `User_Offline`, `Friend_Online`, `Friend_Active`, `Friend_Update`, `Friend_Location`, `Friend_Offline`, `Friend_Add`, `Friend_Delete`, `Notification`, `Notification_V2`, `Notification_V2_Update`, `Notification_V2_Delete`, `Content_Refresh`, `Group_Join`, `Group_Leave`, `Group_Member_Updated`, `Group_Role_Updated`, `Error`, `All`, `Friend`, `User`, `Group`, `Notification_V1_All`, `Notification_V2_All`, `Notification_All`, `Friend_Request`, `Request_Invite`, `Invite`, `Invite_Response`, `Request_Invite_Response`, `Vote_To_Kick`, `Group_Announcement`, `Group_Invite`, `Group_Informative`, `Group_Join_Request`

> [!TIP]
> Description of each events can be found [here](<https://github.com/lolmaxz/vrc-ts/wiki/VRC-WebSocket-API-(Draft-WIP)#3-event-types>).

All Events logs is turned off by default. You can enable it by setting the `logAllEvents` parameter to `true` when initializing the WebSocket in the constructor.

You can also start the websocket using a custom URL by setting the `customURL` parameter to the URL you want to use, as well as the User-Agent for the WebSocket, with the `customUserAgent` parameter.

Here is an example of how to do it:
```typescript
import { VRChatAPI, VRCWebSocket } from 'vrc-ts';

const api = new VRChatAPI({});

const ws = new VRCWebSocket({
    customURL: 'wss://customurl.com',
    customUserAgent: 'CustomUserAgent/0.0.1'
});
```

> [!IMPORTANT]
> **WebSocket Connection**<br>
> If you do not specify the VRChatAPI instance, you **NEED** to specify the `customUserAgent` parameter in the WebSocket constructor.
---

## Basic Example

Here's a simple example to get you started:

```typescript
import { RequestError, VRChatAPI, VRCWebSocket, EventType, FriendOnline } from 'vrc-ts';

async function main() {
    const api = new VRChatAPI({});

    try {
        await api.login();
        console.log(`Logged in successfully as ${api.currentUser!.displayName}!`);

        // Instantiate WebSocket
        const ws = new VRCWebSocket({
            vrchatAPI: api,
            eventsToListenTo: [EventType.Friend_Online],
        });

        ws.on(EventType.Friend_Online, (data: FriendOnline) => {
            console.log(`Friend ${data.user.displayName} is online at ${data.location}.`);
        });

        // Fetching user information
        const tupperUserId = 'usr_c1644b5b-3ca4-45b4-97c6-a2a0de70d469';
        const user = await api.userApi.getUserById({ userId: tupperUserId });
        if (user) console.log(`Found user: ${user.displayName}`);

        // List user's public groups
        const groups = await api.userApi.getUserGroups({ userId: user.id });
        console.log(`Found ${groups.length} groups for ${user.displayName}:`);
        groups.forEach((group) => console.log(`- ${group.name}`));

        // User's Bio and Status Description
        console.log(`User's Bio: ${user.bio}`);
        console.log(`User's Status Description: ${user.statusDescription}`);
    } catch (error) {
        if (error instanceof RequestError) {
            console.error(`Failed to login: ${error.message}`);
        } else {
            console.error(`An unexpected error occurred: ${error}`);
        }
    }
}

main();
```

---

## Error Handling

When making API calls, you may encounter errors. Use try-catch blocks to handle them gracefully.

```typescript
try {
    const user = await api.userApi.getUserById({ userId: 'invalid_id' });
} catch (error) {
    if (error instanceof RequestError) {
        console.error(`API Error: ${error.statusCode} - ${error.message}`);
    } else {
        console.error(`Unexpected Error: ${error}`);
    }
}
```

---

## Extra Information

💡 With the VRChat API, there are a few things to keep in mind.

### Handling Rate Limits (Error 429)

VRChat's API may return a 429 error if too many requests are made in a short period. To avoid this:

-   Implement request throttling in your application.
-   Use the built-in cookies manager to maintain session state.
-   Avoid creating multiple sessions in quick succession.

> [!TIP] > **Error 429 - Too Many Requests**<br>
> This error might occur if you make too many requests consecutively. You might not be able to make any requests or some specific requests for a moment.<br>
> VRChat does not disclose the rate limit of their API, so be cautious.<br>
> Additionally, if you decide **not** to use cookies, ensure you understand the implications. Creating multiple logged-in sessions can quickly result in a 429 error.

### Compliance with VRChat's Terms of Service

Ensure that your application complies with VRChat's [TERMS OF SERVICE](https://hello.vrchat.com/legal).

> [!NOTE]
>
> ## INFORMATION FROM VRCHAT FAQ:
>
> > ### <ins>I'd like to use your API!</ins>
> >
> > You may interact with our API or write applications to interact with our API as long as you follow some general guidelines.\
> > \
> > We do not provide public documentation on our API.\
> > \
> > However, our community has created unofficial documentation of our API. While this project is not officially sanctioned, the project tends to be accurate and respectful of our rules. \
> > \
> > Please see our latest API usage guidelines at the bottom of our Creators Guidelines. \

> [!WARNING] > **Disclaimer**<br>
> This project is not affiliated with VRChat Inc. Use of this package must comply with VRChat's [Terms of Service](https://hello.vrchat.com/legal) and [Community Guidelines](https://hello.vrchat.com/community-guidelines). I am not responsible for any misuse of this package.

---

## Environment Variables

Ensure you have a `.env` file in your project's root directory with the following variables:

### Required Variables

| Variable          | Description          |
| ----------------- | -------------------- |
| `VRCHAT_USERNAME` | Your VRChat username |
| `VRCHAT_PASSWORD` | Your VRChat password |

### 2FA Variables (One of the following is required)

| Variable            | Description                                   |
| ------------------- | --------------------------------------------- |
| `EMAIL_2FA_CODE`    | The 6-digit code received via email           |
| `TOTP_2FA_CODE`     | The 6-digit code from your authenticator app  |
| `VRCHAT_2FA_SECRET` | Your 2FA secret for automatic TOTP generation |

### Optional Variables

| Variable          | Default Value                         | Description                                   |
| ----------------- | ------------------------------------- | --------------------------------------------- |
| `COOKIES_PATH`    | `'./cookies.json'`                    | Path to store cookies                         |
| `USE_COOKIES`     | `true`                                | Whether to use cookies for session management |
| `DEBUG`           | `false`                               | Enable debug logging                          |
| `WEBCLIENT_DEBUG` | `false`                               | Enable web client debug logging               |
| `USER_AGENT`      | `'ExampleProgram/0.0.1 my@email.com'` | User agent for HTTP requests                  |

---

## Contributing

Contributions are welcome! Feel free to open an issue or create a pull request.

A huge thank you to the community behind the VRChatApi project for their documentation on the API so far.

-   Check them out at <https://vrchatapi.github.io/>.

Thank you as well to Huijiro, my coding buddy helping me learn so much :)

For more information on plans and the wiki, head to the repo 😉

Feel free to contact me on Discord under the same username if you have any questions.

---

## License

This project is licensed under the MIT License.

---

## Changelog

For a detailed list of changes, please refer to the [CHANGELOG](https://github.com/lolmaxz/vrc-ts/blob/main/CHANGELOG.md).

---

## Contact

If you have any questions or need assistance, feel free to reach out via GitHub issues or contact me on Discord.

---

## Final Notes

By using `vrc-ts`, you're leveraging a powerful and flexible wrapper for the VRChat API. Whether you're building bots, applications, or services, this package aims to simplify your development process.

Happy coding!

---
