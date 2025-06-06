import { APIPaths } from "./Generics";

export const ApiPaths: APIPaths = {
    apiBasePath: "https://api.vrchat.cloud/api/1",
    apiBasePath2: "https://vrchat.com/api/1",
    auth: {
        userExist: { path: "/auth/exists", method: "GET", cookiesNeeded: ["none"] },
        getCurrentUserInfo: { path: "/auth/user", method: "GET", cookiesNeeded: ["authCookie", "authorization", "twoFactorAuth"] },
        verify2FATOTP: { path: "/auth/twofactorauth/totp/verify", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true },
        verify2FAOTP: { path: "/auth/twofactorauth/otp/verify", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true },
        verify2FAEmail: { path: "/auth/twofactorauth/emailotp/verify", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true },
        verifyAuthToken: { path: "/auth", method: "GET", cookiesNeeded: ["authCookie"] },
        logout: { path: "/logout", method: "PUT", cookiesNeeded: ["authCookie"] },
        deleteUser: { path: "/users/{userId}/delete", method: "PUT", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
    },
    avatars: {
        getOwnAvatar: { path: "/users/{userId}/avatar", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
        searchAvatars: { path: "/avatars", method: "GET", cookiesNeeded: ["authCookie"] },
        createAvatar: { path: "/avatars", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true },
        getAvatar: { path: "/avatars/{avatarId}", method: "GET", cookiesNeeded: ["authCookie"] },
        updateAvatar: { path: "/avatars/{avatarId}", method: "PUT", cookiesNeeded: ["authCookie"], requiresData:true },
        deleteAvatar: { path: "/avatars/{avatarId}", method: "DELETE", cookiesNeeded: ["authCookie"] },
        selectAvatar: { path: "/avatars/{avatarId}/select", method: "PUT", cookiesNeeded: ["authCookie"] },
        selectFallbackAvatar: { path: "/avatars/{avatarId}/selectFallback", method: "PUT", cookiesNeeded: ["authCookie"] },
        listFavoritedAvatars: { path: "/avatars/favorites", method: "GET", cookiesNeeded: ["authCookie"] },
        getImpostorQueueStats: { path: "/avatars/impostor/queue/stats", method: "GET", cookiesNeeded: ["authCookie"] },
        generateImpostor: { path: "/avatars/{avatarId}/impostor/enqueue", method: "POST", cookiesNeeded: ["authCookie"], requiredQueryParams: ["avatarId"] },
        deleteImpostor: { path: "/avatars/{avatarId}/impostor", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["avatarId"] },
    },
    beta: {
        getIOSClosedBetaInformation: { path: "/beta/ios-closed-beta", method: "GET", cookiesNeeded: ["authCookie"] },
    },
    economy: {
        listSteamTransactions: { path: "/Steam/transactions", method: "GET", cookiesNeeded: ["authCookie"] },
        getSteamTransaction: { path: "/Steam/transactions/{transactionId}", method: "GET", deprecated: true, cookiesNeeded: ["authCookie"] },
        getCurrentSubscriptions: { path: "/auth/user/subscription", method: "GET", cookiesNeeded: ["authCookie"] },
        listSubscriptions: { path: "/subscriptions", method: "GET", cookiesNeeded: ["authCookie"] },
        getLicenseGroup: { path: "/licenseGroups/{licenseGroupId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["licenseGroupId"] },
        getProductListing: { path: "/listing/{productId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["productId"] },
        getUserProductListings: { path: "/user/{userId}/listings", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
        listTokenBundles: { path: "/tokenBundles", method: "GET", cookiesNeeded: ["authCookie"] },
        getTiliaStatus: { path: "/tilia/status", method: "GET", cookiesNeeded: ["authCookie"] },
        getTiliaTOS: { path: "/user/{userId}/tilia/tos", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
        getBalance: { path: "/user/{userId}/balance", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
        getOwnPurchases: { path: "/economy/purchases", method: "GET", cookiesNeeded: ["authCookie"] },
        getOwnTransactions: { path: "/economy/transactions", method: "GET", cookiesNeeded: ["authCookie"] },
        getTiliaSyncData: { path: "/tilia/sync", method: "PUT", cookiesNeeded: ["authCookie"] },
        getLicenses: { path: "/licenses/{licenseId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["licenseId"] },
        getInfoPush: { path: "/infoPush", method: "GET", cookiesNeeded: ["authCookie"], notImplemented: true },
    },
    favorites: {
        listFavorites: { path: "/favorites", method: "GET", cookiesNeeded: ["authCookie"] },
        addFavorite: { path: "/favorites", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true },
        showFavorite: { path: "/favorites/{favoriteId}", method: "GET", cookiesNeeded: ["authCookie"] },
        removeFavorite: { path: "/favorites/{favoriteId}", method: "DELETE", cookiesNeeded: ["authCookie"] },
        listFavoriteGroups: { path: "/favorite/groups", method: "GET", cookiesNeeded: ["authCookie"] },
        showFavoriteGroup: { path: "/favorite/group/{favoriteGroupType}/{favoriteGroupName}/{userId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId", "favoriteGroupType", "favoriteGroupName"] },
        updateFavoriteGroup: { path: "/favorite/group/{favoriteGroupType}/{favoriteGroupName}/{userId}", method: "PUT", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["userId", "favoriteGroupType", "favoriteGroupName"]},
        clearFavoriteGroup: { path: "/favorite/group/{favoriteGroupType}/{favoriteGroupName}/{userId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId", "favoriteGroupType", "favoriteGroupName"] },
        getFavoriteLimits: { path: "/auth/user/favoritelimits", method: "GET", cookiesNeeded: ["authCookie"] },
    },
    files: {
        listFiles: { path: "/files", method: "GET", cookiesNeeded: ["authCookie"] },
        createFile: { path: "/file", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true },      
        showFile: { path: "/file/{fileId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["fileId"] },
        deleteFile: { path: "/file/{fileId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["fileId"] },
        createFileVersion: { path: "/file/{fileId}", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true,requiredQueryParams: ["fileId"] },
        downloadFileVersion: { path: "/file/{fileId}/{versionId}", method: "GET", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["fileId", "versionId"] },
        deleteFileVersion: { path: "/file/{fileId}/{versionId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["fileId", "versionId"] },
        finishFileDataUpload: { path: "/file/{fileId}/{versionId}/{fileType}/finish", method: "PUT", cookiesNeeded: ["authCookie"], requiredQueryParams: ["fileId", "versionId", "fileType"] },
        startFileDataUpload: { path: "/file/{fileId}/{versionId}/{fileType}/start", method: "PUT", cookiesNeeded: ["authCookie"], requiredQueryParams: ["fileId", "versionId", "fileType"]},
        checkFileDataUploadStatus: { path: "/file/{fileId}/{versionId}/{fileType}/status", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["fileId", "versionId", "fileType"] },
        getFileVersionAnalysis: { path: "/analysis/{fileId}/{versionId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["fileId", "versionId"] }, // ! TODO - TO TEST
        getFileVersionAnalysisSecurity: { path: "/analysis/{fileId}/{versionId}/security", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["fileId", "versionId"] }, // ! TODO - TO TEST
        getFileVersionAnalysisStandard: { path: "/analysis/{fileId}/{versionId}/standard", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["fileId", "versionId"] }, // ! TODO - TO TEST
    },
    friends: {
        listFriends: { path: "/auth/user/friends", method: "GET", cookiesNeeded: ["authCookie"] },
        sendFriendRequest: { path: "/user/{userId}/friendRequest", method: "POST", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
        deleteFriendRequest: { path: "/user/{userId}/friendRequest", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
        checkFriendStatus: { path: "/user/{userId}/friendStatus", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
        unfriend: { path: "/auth/user/friends/{userId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
    },
    groups: {
        searchGroups: { path: "/groups", method: "GET", cookiesNeeded: ["authCookie"] },
        createGroup: { path: "/groups", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true },
        getGroupById: { path: "/groups/{groupId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"] },
        updateGroup: { path: "/groups/{groupId}", method: "PUT", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["groupId"] },
        deleteGroup: { path: "/groups/{groupId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"] },
        getGroupAnnouncement: { path: "/groups/{groupId}/announcement", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"], deprecated: true},
        createGroupAnnouncement: { path: "/groups/{groupId}/announcement", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["groupId"], deprecated: true  },
        deleteGroupAnnouncement: { path: "/groups/{groupId}/announcement", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"], deprecated: true },
        getGroupAuditLogs: { path: "/groups/{groupId}/auditLogs", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"]  },
        getGroupBans: { path: "/groups/{groupId}/bans", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"]  },
        banGroupMember: { path: "/groups/{groupId}/bans", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["groupId"]  },
        unbanGroupMember: { path: "/groups/{groupId}/bans/{userId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId", "userId"]  },
        createGroupGallery: { path: "/groups/{groupId}/galleries", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["groupId"]  },
        getGroupGalleryImages: { path: "/groups/{groupId}/galleries/{groupGalleryId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId", "groupGalleryId"]  },
        updateGroupGallery: { path: "/groups/{groupId}/galleries/{groupGalleryId}", method: "PUT", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["groupId", "groupGalleryId"] },
        deleteGroupGallery: { path: "/groups/{groupId}/galleries/{groupGalleryId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId", "groupGalleryId"] },
        addGroupGalleryImage: { path: "/groups/{groupId}/galleries/{groupGalleryId}/images", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["groupId", "groupGalleryId"]},
        deleteGroupGalleryImage: { path: "/groups/{groupId}/galleries/{groupGalleryId}/images/{groupGalleryImageId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId", "groupGalleryId", "groupGalleryImageId"] },
        getGroupInstances: { path: "/groups/{groupId}/instances", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"] }, // ! TODO - TO TEST
        getGroupInvitesSent: { path: "/groups/{groupId}/invites", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"]  },
        inviteUserToGroup: { path: "/groups/{groupId}/invites", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["groupId"]  },
        deleteUserInvite: { path: "/groups/{groupId}/invites/{userId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId", "userId"]  },
        joinGroup: { path: "/groups/{groupId}/join", method: "POST", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"]  },
        leaveGroup: { path: "/groups/{groupId}/leave", method: "POST", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"]  },
        listGroupMembers: { path: "/groups/{groupId}/members", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"]  },
        getGroupMember: { path: "/groups/{groupId}/members/{userId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId", "userId"]},
        updateGroupMember: { path: "/groups/{groupId}/members/{userId}", method: "PUT", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["groupId", "userId"] },
        kickGroupMember: { path: "/groups/{groupId}/members/{userId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId", "userId"] },
        addRoleToGroupMember: { path: "/groups/{groupId}/members/{userId}/roles/{groupRoleId}", method: "PUT", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId", "userId", "groupRoleId"] },
        removeRoleFromGroupMember: { path: "/groups/{groupId}/members/{userId}/roles/{groupRoleId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId", "userId", "groupRoleId"] },
        listGroupPermissions: { path: "/groups/{groupId}/permissions", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"]  },
        getGroupPosts: { path: "/groups/{groupId}/posts", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"] },
        createGroupPost: { path: "/groups/{groupId}/posts", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["groupId"] },
        deleteGroupPost: { path: "/groups/{groupId}/posts/{postId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId", "postId"] },
        editGroupPost: { path: "/groups/{groupId}/posts/{notificationId}", method: "PUT", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["groupId", "notificationId"] },
        getGroupJoinRequests: { path: "/groups/{groupId}/requests", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"]  },
        cancelGroupJoinRequest: { path: "/groups/{groupId}/requests", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"]  },
        respondGroupJoinrequest: { path: "/groups/{groupId}/requests/{userId}", requiresData: true, method: "PUT", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId", "userId"] },
        getGroupRoles: { path: "/groups/{groupId}/roles", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId"]  },
        createGroupRole: { path: "/groups/{groupId}/roles", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["groupId"]  },
        updateGroupRole: { path: "/groups/{groupId}/roles/{groupRoleId}", method: "PUT", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["groupId", "groupRoleId"] },
        deleteGroupRole: { path: "/groups/{groupId}/roles/{groupRoleId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["groupId", "groupRoleId"] },
    },
    invites: {
        inviteUser: { path: "/invite/{userId}", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["userId"] },
        inviteMyselfToInstance: { path: "/invite/myself/to/{worldId}:{instanceId}", method: "POST", cookiesNeeded: ["authCookie"], requiredQueryParams: ["worldId", "instanceId"] },
        requestInvite: { path: "/requestInvite/{userId}", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["userId"] },
        respondInvite: { path: "/invite/{notificationId}/respond", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["notificationId"] },
        listInviteMessages: { path: "/message/{userId}/{messageType}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId", "messageType"] },
        getInviteMessage: { path: "/message/{userId}/{messageType}/{slot}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId", "messageType", "slot"] },
        updateInviteMessage: { path: "/message/{userId}/{messageType}/{slot}", method: "PUT", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["userId", "messageType", "slot"]},
        resetInviteMessage: { path: "/message/{userId}/{messageType}/{slot}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId", "messageType", "slot"] },
    },
    instances: {
        getInstance: { path: "/instances/{worldId}:{instanceId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["worldId", "instanceId"] },
        getInstanceShortName: { path: "/instances/{instanceId}/shortName", method: "GET", cookiesNeeded: ["authCookie", "twoFactorAuth"], requiredQueryParams: ["instanceId"], secondPath: true },
        sendSelfInvite: { path: "/instances/{worldId}:{instanceId}/invite", method: "POST", deprecated:true, cookiesNeeded: ["authCookie"], requiredQueryParams: ["worldId", "instanceId"] },
        getInstanceByShortName: { path: "/instances/s/{shortName}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["shortName"] },
        createNormalInstance: { path: "/instances/{instanceId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["instanceId"] },
        createGroupInstance: { path: "/instances", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true, secondPath: true},
    },
    jams: {
        getJamsList: { path: "/jams", method: "GET", cookiesNeeded: ["authCookie"] },
        getJamInfo: { path: "/jams/{jamId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["jamId"] },
        getJamSubmissions: { path: "/jams/{jamId}/submissions", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["jamId"] },
    },
    medias: {
        getUserIcons: { path: "/files", method: "GET", cookiesNeeded: ["authCookie"], notImplemented: true },
        getUserEmojis: { path: "/files", method: "GET", cookiesNeeded: ["authCookie"], notImplemented: true },
        getUserPhotos: { path: "/files", method: "GET", cookiesNeeded: ["authCookie"], notImplemented: true },
        getUserStickers: { path: "/files", method: "GET", cookiesNeeded: ["authCookie"], notImplemented: true },
    },
    notifications: {
        listNotifications: { path: "/auth/user/notifications", method: "GET", cookiesNeeded: ["authCookie"] },
        acceptFriendRequest: { path: "/auth/user/notifications/{notificationId}/accept", method: "PUT", cookiesNeeded: ["authCookie"], requiredQueryParams: ["notificationId"] },
        markNotificationAsRead: { path: "/auth/user/notifications/{notificationId}/see", method: "PUT", cookiesNeeded: ["authCookie"], requiredQueryParams: ["notificationId"] },
        deleteNotification: { path: "/auth/user/notifications/{notificationId}/hide", method: "PUT", cookiesNeeded: ["authCookie"], requiredQueryParams: ["notificationId"] },
        clearAllNotifications: { path: "/auth/user/notifications/clear", method: "PUT", cookiesNeeded: ["authCookie"] },
        respondToNotification: { path: "/notifications/{notificationId}/respond", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["notificationId"] }, // ! TODO - TO TEST
    },
    permissions: {
        getAssignedPermissions: { path: "/auth/permissions", method: "GET", cookiesNeeded: ["authCookie"] },
        getPermission: { path: "/permissions/{permissionId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["permissionId"] },
    },
    playermoderations: {
        searchPlayerModerations: { path: "/auth/user/playermoderations", method: "GET", cookiesNeeded: ["authCookie"] },
        moderateUser: { path: "/auth/user/playermoderations", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true },
        clearAllPlayerModerations: { path: "/auth/user/playermoderations", method: "DELETE", cookiesNeeded: ["authCookie"] },
        getPlayerModeration: { path: "/auth/user/playermoderations/{playerModerationId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["playerModerationId"] },
        deletePlayerModeration: { path: "/auth/user/playermoderations/{playerModerationId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["playerModerationId"] },
        unmoderateUser: { path: "/auth/user/unplayermoderate", method: "PUT", cookiesNeeded: ["authCookie"], requiresData:true },
    },
    prints: {
        listPrints: { path: "/prints/user/{userId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
    },
    system: {
        fetchAPIConfig: { path: "/config", method: "GET", cookiesNeeded: ["none"] },
        showInformationNotices: { path: "/infoPush", method: "GET", cookiesNeeded: ["none"], notImplemented: true },
        downloadCSS: { path: "/css/app.css", method: "GET", cookiesNeeded: ["none"], notImplemented: true },
        downloadJavaScript: { path: "/js/app.js", method: "GET", cookiesNeeded: ["none"], notImplemented: true },
        checkAPIHealth: { path: "/health", method: "GET", deprecated: true, cookiesNeeded: ["none"] },
        currentOnlineUsers: { path: "/visits", method: "GET", cookiesNeeded: ["none"] },
        currentSystemTime: { path: "/time", method: "GET", cookiesNeeded: ["none"] },
    },
    users: {
        searchAllUsers: { path: "/users", method: "GET", cookiesNeeded: ["authCookie"] },
        getUserbyUsername: { path: "/users/{username}/name", method: "GET", deprecated: true, notImplemented: true, cookiesNeeded: ["authCookie"], requiredQueryParams: ["username"] },
        getUserbyID: { path: "/users/{userId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
        updateUserInfo: { path: "/users/{userId}", method: "PUT", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["userId"] },
        getUserGroups: { path: "/users/{userId}/groups", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
        getUserGroupRequests: { path: "/users/{userId}/groups/requested", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
        getUserRepresentedGroup: { path: "/users/{userId}/groups/represented", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
        getUserFeedback: { path: "/users/{userId}/feedback", method: "GET", cookiesNeeded: ["authCookie"], deprecated: true, requiredQueryParams: ["userId"] },
        getAllUserNotes: { path: "/userNotes", method: "GET", cookiesNeeded: ["authCookie"]},
        updateUserNote: { path: "/userNotes", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true},
        getAUserNote: { path: "/userNotes/{noteId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["noteId"] },
        getUserGroupInstances: { path: "/users/{userId}/instances/groups", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["userId"] },
    },
    worlds: {
        searchAllWorlds: { path: "/worlds", method: "GET", cookiesNeeded: ["authCookie"] },
        createWorld: { path: "/worlds", method: "POST", cookiesNeeded: ["authCookie"], requiresData:true },
        listActiveWorlds: { path: "/worlds/active", method: "GET", cookiesNeeded: ["authCookie"] },
        listFavoritedWorlds: { path: "/worlds/favorites", method: "GET", cookiesNeeded: ["authCookie"] },
        listRecentWorlds: { path: "/worlds/recent", method: "GET", cookiesNeeded: ["authCookie"] },
        getWorldbyID: { path: "/worlds/{worldId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["worldId"] },
        updateWorld: { path: "/worlds/{worldId}", method: "PUT", cookiesNeeded: ["authCookie"], requiresData:true, requiredQueryParams: ["worldId"] },
        deleteWorld: { path: "/worlds/{worldId}", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["worldId"] },
        getWorldMetadata: { path: "/worlds/{worldId}/metadata", method: "GET", deprecated: true, cookiesNeeded: ["authCookie"], requiredQueryParams: ["worldId"] },
        getWorldPublishStatus: { path: "/worlds/{worldId}/publish", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["worldId"] },
        publishWorld: { path: "/worlds/{worldId}/publish", method: "PUT", cookiesNeeded: ["authCookie"], requiredQueryParams: ["worldId"] },
        unpublishWorld: { path: "/worlds/{worldId}/publish", method: "DELETE", cookiesNeeded: ["authCookie"], requiredQueryParams: ["worldId"] },
        getWorldInstance: { path: "/worlds/{worldId}/{instanceId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["worldId", "instanceId"] },
        getContentRestricted: {path: "/contentRestrictions/content/{worldId}", method: "GET", cookiesNeeded: ["authCookie"], requiredQueryParams: ["worldId"] },
    }
}