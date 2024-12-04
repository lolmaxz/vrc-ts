# VRC-TS - A VRChat Wrapper in TypeScript

Latest version: **v1.0.5**<br>
From scratch TypeScript wrapper for the VRChat API, simplifying the process of interacting with VRChat's API programmatically.
Perfect if you are looking to build bots, applications, or services that interact with VRChat's API!

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Authenticating](#authenticating)
-   [Notes](#notes)
-   [Endpoints Supported](#endpoints)
-   [WebSocket Support](#websocket)
-   [Basic Example](#example)
-   [Extra Information](#extra-information)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   Fully Typed with most of VRChat's API Endpoints integrated and simple to use.
-   Fully functional Websocket with multiple events to listen to.
-   Built in Cookies Manager, so you don't have to manage Cookies.
-   Big push on functionalities touching VRChat Group Endpoints.
-   Compatible with both for CommonJS and Module.

## Installation

Install the project dependencies:

```npm
npm install vrc-ts
```

> [!IMPORTANT]
>
> <h2> .ENV FILE</h2>
> ⚠️ Make sure to have a .env in your project's root and you have the minimum requirement. <br>
> ⭕ = REQUIRED | 🟡 = Requires One-Of<br><br>
>
> -   `VRCHAT_USERNAME` ⭕
>     -   **Description:** Your VRChat Username _(Can be different from your displayname in some cases)_
> -   `VRCHAT_PASSWORD` ⭕
>     -   **Description:** Your VRChat Password _(Make sure to keep it safe)_
> -   `EMAIL_2FA_CODE` 🟡
>     -   **Description:** The 6 digits code you received by Email _(Only if you are using Email OTP)_
> -   `VRCHAT_2FA_SECRET` 🟡
>     -   **Description:** The 32 digits secret you got from your 2FA App _(Only if you are using TOTP)_
> -   `TOTP_2FA_CODE` 🟡
>     -   **Description:** The 6 digits code you got from your 2FA App _(Only if you are using TOTP)_
> -   `COOKIES_PATH`
>     -   **Default/recommended:** `'./cookies.json'`
>     -   **Description:** The path where the cookies will be stored.
> -   `USE_COOKIES`
>     -   **Default/Recommended:** `true`
>     -   **Description:** If you want to use cookies or not. (Highly recommended if you want to avoid 429 errors)
> -   `DEBUG`
>     -   **Default/Recommended:** `false`
>     -   **Description:** If you want to see debug logs.
> -   `WEBCLIENT_DEBUG`
>     -   **Default/Recommended:** `false`
>     -   **Description:** If you want to see debug logs for the webclient.
> -   `USER_AGENT`
>     -   **Default if left empty:** `'ExampleApp/1.0.0 Email@example.com'`
>     -   **Description:** The User Agent used for the requests. _(You can change it if you want)_

## Usage

Here’s how you can use the `vrc-ts` in your project:

**Typescript :**

```typescript
import { RequestError, VRChatAPI } from 'vrc-ts';

const api = new VRChatAPI('username', 'password');
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

**Javascript Imports :**

```javascript
const { RequestError, VRChatAPI } = require('vrc-ts');
```

## Authenticating

VRChat now has an automatic 2FA system in place that is set by default to email OTP and you can also enable 2FA with a TOTP (Time based One Time Password) like using the 'Authy App'.

> [!IMPORTANT]  
> **.ENV Requires more information!**\
> :warning: Please note that **YOU WILL** need to add one more thing in your `.env` file in order to complete the authenticating process, whether you are using _Email OTP_ or _2FA TOTP_.

Depending on your situation, here is how you can define either the **Email OTP** or the **TOTP** in the `.env` file:

-   **Email OTP** :

```js
EMAIL_2FA_CODE = 123456;
```

> When you've started the app and you know you received a code by Email, add it to the .env file and restart the app within :clock3: **15 Minutes** of the code being sent to you. Past that delay the code will be invalidated by VRChat.

-   **TOTP** :

```js
TOTP_2FA_CODE = 123456;
```

> When you've started the app and you know you need the TOTP 2FA Code, Go on your _Authy App_ or similar, grab the 6 digits code and add it to the .env file and restart the app within :clock3: **30 Seconds**.
> :warning: the TOTP code is always valid for only 30 seconds. Refer to app like Authy to see the timing. The right code should be in the .env when starting the app, in order for the connectino to successfully work.

> [!NOTE]
> For the **Email OTP** you have **15 minutes** after receiving it to use it.\
> For the **TOTP** you have 30 seconds between each code reset. It is time based!

## :white_check_mark: Bonus Easier Authentication

This Wrapper also comes with a 2FA Secret code generator. (totp-generator) You will simply need to specify it in your `.env` file like so:

```js
VRCHAT_2FA_SECRET=2W4X6Z7YQ9A2B4C62W4X6Z7YQ9A2B4C6
```

It comes in the form of 32 digits and capital characters mixed string.

> :exclamation: Using this secret, you'll be able to authenticate automatically each time without having to deal with a 6 digits code.
> _To get your secret you can simply scan the QR code VRChat gives you when enabling 2FA on your account. Scan it with a camera and copy the text to get the secret. Then you can add it to the Authy App if you want._

> [!CAUTION]
> Make sure to never commit or share any password, especially your 2FA secret!

## Notes

You can also use the `.env` file to login and/or store your credential like so:

```js
VRCHAT_USERNAME = username_here;
VRCHAT_PASSWORD = password_here;
```

Then in your program, you can simply authenticate this way:

```typescript
const api = new VRChatAPI();
```

> instead of

```typescript
const api = new VRChatAPI('username', 'password');
```

> [!NOTE]
> For more option with the `.env` file, check the `.env.example` file in the project.

## Endpoints

<h2> Here is the full list of endpoints by category that this wrapper does implements and has all typed: </h2>

**Authentication API** :

-   `userExist`, `getCurrentUserInfo`, `verify2FATOTP`, `verify2FAEmail`, `verifyAuthToken`, `logout`

**Avatars API** :

-   `getOwnAvatar`, `searchAvatars`, `createAvatar`, `getAvatar`, `updateAvatar`, `deleteAvatar`, `selectAvatar`, `selectFallbackAvatar`, `listFavoritedAvatars`

**Economy API** : (Some endpoints here may need more testing. Usage of these endpoints are at your own discretion.)

-   `listSteamTransactions`, `getSteamTransaction`, `getCurrentSubscriptions`, `listSubscriptions`, `getLicenseGroup`, `getProductListing`, `getOwnSubscription`, `getTiliaTOS`, `getOwnPurchases`, `getOwnTransactions`, `getTiliaSyncData`, `getBalance`, `getLicenses`

**Favorites API** :

-   `listFavorites`, `addFavorite`, `showFavorite`, `removeFavorite`, `listFavoriteGroups`, `showFavoriteGroup`, `updateFavoriteGroup`, `clearFavoriteGroup`

**Files API** :

-   `listFiles`, `createFile`, `showFile`, `createFileVersion`, `deleteFile`, `downloadFileVersion`, `deleteFileVersion`, `finishFileDataUpload`, `startFileDataUpload`, `checkFileDataUploadStatus`

**Friends API** :

-   `listFriends`, `sendFriendRequest`, `deleteFriendRequest`, `checkFriendStatus`, `unfriend`

**Groups API** :

-   `searchGroups`, `createGroup`, `getGroupById`, `updateGroup`, `deleteGroup`, `createGroupPost`, `getGroupPosts`, `deleteGroupPost`, `getGroupAuditLogs`, `getGroupBans`, `banGroupMember`, `unbanGroupMember`, `createGroupGallery`, `getGroupGalleryImages`, `updateGroupGallery`, `deleteGroupGallery`, `addGroupGalleryImage`, `deleteGroupGalleryImage`, `getGroupInvitesSent`, `inviteUserToGroup deleteUserInvite`, `joinGroup`, `leaveGroup`, `listGroupMembers`, `getGroupMember`, `updateGroupMember`, `kickGroupMember`, `addRoleToGroupMember`, `removeRoleFromGroupMember`, `listGroupPermissions`, `getGroupJoinRequests`, `cancelGroupJoinRequest`, `respondGroupJoinrequest`, `getGroupRoles`, `createGroupRole`, `updateGroupRole`, `deleteGroupRole`

**Invites API** :

-   `inviteUser`, `inviteMyselfToInstance`, `requestInvite`, `respondInvite`, `listInviteMessages`, `getInviteMessage`, `updateInviteMessage`, `resetInviteMessage`

**Instances API** :

-   `getInstance`, `getInstanceShortName`, `sendSelfInvite`, `getInstanceByShortName`, `createNormalInstance`, `createGroupInstance`

**Notifications API** :

-   `listNotifications`, `acceptFriendRequest`, `markNotificationAsRead`, `deleteNotification`, `clearAllNotifications`

**Permissions API** :

-   `getAssignedPermissions`, `getPermission`

**Playermoderations API** :

-   `searchPlayerModerations`, `moderateUser`, `clearAllPlayerModerations`, `getPlayerModeration`, `deletePlayerModeration`, `unmoderateUser`

**System API** :

-   `fetchAPIConfig`, `currentOnlineUsers`, `currentSystemTime`

**Users API** :

-   `searchAllUsers`, `getUserbyUsername`, `getUserbyID`, `updateUserInfo`, `getUserGroups`, `getUserGroupRequests`, `getUserRepresentedGroup`

**Worlds API** :

-   `searchAllWorlds`, `createWorld`, `listActiveWorlds`, `listFavoritedWorlds`, `listRecentWorlds`, `getWorldbyID`, `updateWorld`, `deleteWorld`, `getWorldMetadata`, `getWorldPublishStatus`, `publishWorld`, `unpublishWorld`, `getWorldInstance`

> [!CAUTION]
> Some Endpoints may not yet be implemented. Some Endpoint implemented may require more testing.
> Some Endpoints aren't supported anymore and they haven't been included in this list, but for legacy reason, they may still exist in the code. Their usage is up for discretion.
> Remember that VRChat's API is **NOT** documented and this project relies on people testing the API and documents it themselves.

> [!TIP]  
> **Instance creation** have two separate endpoints now!
> One for regular instance and one for group instance. For regular instance you can also just create the instance ID without touching the API. Function is called `generateNormalInstanceIdOnly()` in the `instanceApi`.

## WebSocket

VRChat's Websocket has also been implemented. You can listen for specific events in real time. The connection will stay alive and renewed. If the connection is lost, a reconnection will be done as soon as possible.

Using the WebSocket with VRC-TS is very easy, you simply need to instanciate a WebSocket and declare the various events you want to listen to. Most (if not all) WebSocket events have been correctly Typed too!

**Here's how you can instanciate a new WebSocket:**

**Javascript :**

```javascript
const { VRChatAPI, VRCWebSocket } = require('vrc-ts');

const api = new VRChatAPI();

new VRCWebSocket({ vrchatAPI: api });
```

**Typescript :**

```typescript
import { VRChatAPI, VRCWebSocket } from 'vrc-ts';

const api = new VRChatAPI();

new VRCWebSocket({ vrchatAPI: api });
```

The system ensure you've given the instance of `api` as a parameter so it knows which username and password to use to connect to the websocket.

> [!WARNING]
> A valid authToken saved from authenticating with the API first before the WebSocket is functional.

### Extra Websocket

If you don't want to execute the code all events, you can specify to the WebSocket instanciator (`const websocket = new VRCWebSocket({})`) which events you actually want to listen to and then redefine the behavior of that event.

Here is an example if we only wanted to listen to incoming **friend request**:

**Javascript :**

```javascript
const { EventType, RequestError, VRChatAPI, VRCWebSocket } = require('vrc-ts');

const api = new VRChatAPI();

const websocket = new VRCWebSocket({ vrchatAPI: api, eventsToListenTo: [EventType.Friend_Request] });

websocket.on(EventType.Friend_Request, (eventData) => {
    console.log('A friend request was received by: ' + eventData.senderUsername);
});
```

**Typescript :**

```typescript
import { EventType, friendRequestNotification, RequestError, VRChatAPI, VRCWebSocket } from 'vrc-ts';

const api = new VRChatAPI();

const websocket = new VRCWebSocket({ vrchatAPI: api, eventsToListenTo: [EventType.Friend_Request] });

websocket.on(EventType.Friend_Request, (eventData: friendRequestNotification) => {
    console.log('A friend request was received by: ' + eventData.senderUsername);
});
```

> This will print out `A friend request was received by: [USERNAME OF THE SENDER]` anytime a friend request is received on the connected account that is currently instanciated.

**EventType** can be multiple events, ranging from notification types to friend information changing, invite detection and way more. Optionally, you can also set another parameter `logAllEvents` to true if you want the console to log any events you are listening to currently when they happen.

**Here is the current list of supported events:**

-   `User_Online`, `User_Update`, `User_Location`, `User_Offline`, `Friend_Online`, `Friend_Active`, `Friend_Update`, `Friend_Location`, `Friend_Offline`, `Friend_Add`, `Friend_Delete`, `Notification`, `Notification_V2`, `Notification_V2_Update`, `Notification_V2_Delete`, `Show_Notification`, `Hide_Notification`, `Response_Notification`, `See_Notification`, `Clear_Notification`, `Content_Refresh`, `Group_Join`, `Group_Leave`, `Group_Member_Updated`, `Group_Role_Updated`, `Error`, `All`, `Friend`, `User`, `Group`, `Notification_V1_All`, `Notification_V2_All`, `Notification_All`, `Friend_Request`, `Request_Invite`, `Invite`, `Invite_Response`, `Request_Invite_Response`, `Vote_To_Kick`, `Group_Announcement`, `Group_Invite`, `Group_Informative`, `Group_Join_Request`

## Example

Here I am leaving you with a simple example of what you can do using this API, to get started!

**Typescript :**

```typescript
import { RequestError, VRChatAPI } from 'vrc-ts';

async function main() {
    const api = new VRChatAPI();

    try {
        await api.login();
        console.debug(`Logged in successfully as ${api.currentUser!.displayName}!`);

        // Testing with a User ID (In this Case, Tupper):
        const tupperUserId = 'usr_c1644b5b-3ca4-45b4-97c6-a2a0de70d469';

        // Searching for a user by User ID:
        const user = await api.userApi.getUserById({ userId: tupperUserId });
        if (user) console.debug(`Found user: ${user.displayName}`);

        // Let's list all the user's publically known groups:
        const groups = await api.userApi.getUserGroups({ userId: user.id });
        console.debug(`Found ${groups.length} groups for ${user.displayName}:`);
        groups.forEach((group) => console.debug(`- ${group.name}`));

        // User's Bio and Status Description:
        console.debug(`User's Bio: ${user.bio}`);
        console.debug(`User's Status Description: ${user.statusDescription}`);
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

## Extra-Information

💡 With the VRChat API, there are a few things to keep in mind.

> [!TIP]  
> ERROR 429 - Too Many Requests\
> \
> This error might pop if you try doing too many requests consecutively. You might not be able to do any request or some specific request(s) for a moment.\
> VRChat do no disclose the rate limit of their API, so be careful with them.\
> Additionally, if you decide to NOT use the cookies, make sure you know what you are doing. Creating multiple logged in session can **quickly** give you an error 429 - Too Many Requests!

> [!TIP]
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

## Contributing

Contributions are welcome! Feel free to open an issue or create a pull request.

A huge thank you to the community behind the VRChatApi project for their documentation on the API so far.

-   Check them out at <https://vrchatapi.github.io/>.

Thank you as well to Huijiro, my coding buddy helping me learn so much :)

For more information on plans and the wiki, head to the repo 😉

Feel free to contact me on Discord under the same username if you have any questions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
