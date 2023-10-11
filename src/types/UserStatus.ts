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
    Offline = 'offline'
}
