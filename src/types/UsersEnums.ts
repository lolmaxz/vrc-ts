

/**
* This enum represents all the possible ranks for a user in VRChat.
* * Veteran : "system_trust_legend" - The user is a Veteran if he has this tag.
* * Trusted : "system_trust_veteran" - The user is Trusted if he has this tag.
* * Known : "system_trust_trusted" - The user is Known if he has this tag.
* * User : "system_trust_known" - The user is a User if he has this tag.
* * New : "system_trust_basic" - The user is a New User if he has this tag.
* * Visitor : "Visitor" - The User is a Visitor when he has no rank tag from the above.
* * Nuisance : "system_troll" - The user is a Nuisance if he has this tag.
* 
* Note: Veteran has been removed from VRChat since 2018 and removed from the database since 2022-05-05.
* 
* If a user has no rank tag, he is a Visitor.
*/
export enum VRCRanks {
    Veteran = "system_trust_legend",
    Trusted = "system_trust_veteran",
    Known = "system_trust_trusted",
    User = "system_trust_known",
    New = "system_trust_basic",
    Visitor = "Visitor",
    Nuisance = "system_troll",
}

/**
* This enum represents all the possible ranks' names for a user in VRChat.
* * system_trust_legend : "Veteran User" - The user is a Veteran if he has this tag.
* * system_trust_veteran : "Trusted User" - The user is Trusted if he has this tag.
* * system_trust_trusted : "Known User" - The user is Known if he has this tag.
* * system_trust_known : "User" - The user is a User if he has this tag.
* * system_trust_basic : "New User" - The user is a New User if he has this tag.
* * Visitor : "Visitor" - The User is a Visitor when he has no rank tag from the above.
* * system_troll : "Nuisance User" - The user is a Nuisance if he has this tag.
*/
export enum VRCRanksName {
    system_trust_legend = "Veteran User",
    system_trust_veteran = "Trusted User",
    system_trust_trusted = "Known User",
    system_trust_known = "User",
    system_trust_basic = "New User",
    Visitor = "Visitor",
    system_troll = "Nuisance User",
}

/**
* * None : "none" - User is a normal user
* * Trusted : "trusted" - Unknown
* * Internal : "internal" - Is a VRChat Developer
* * Moderator : "moderator" - Is a VRChat Moderator
*/
export enum DeveloperType {
    None = 'none',
    Trusted = 'trusted',
    Internal = 'internal',
    Moderator = 'moderator',
}

/**
* * Offline : "offline" - User is offline
* * Active : "active" - User is online, but not in VRChat
* * Online : "online" - User is online in VRChat
* 
* Always offline when returned through `getCurrentUser` (/auth/user).
*/
export enum UserState {
    Offline = 'offline',
    Active = 'active',
    Online = 'online',
}

/**
* Defines the User's current status, for example "ask me", "join me" or "offline. This status is a combined indicator of their online activity and privacy preference.
* * Active : "active" - The user is not in the game but is active on the website. (Will appear yellow on the website like "ask me")
* * JoinMe : "join me" - The user is in the game and is accepting invites. (Is on blue)
* * AskMe : "ask me" - The user is in the game but will request to receive invites in order to be invited. (Is on yellow)
* * Busy : "busy" - The user is in the game but is not accepting invites. (Is on red)
* * Offline : "offline" - The user is not in the game and is not active on the website. (is on Grey)
* 
* Note: By default the user's status is "offline".
*/
export enum UserStatus {
    Active = 'active',
    JoinMe = 'join me',
    AskMe = 'ask me',
    Busy = 'busy',
    Offline = 'offline',
}
