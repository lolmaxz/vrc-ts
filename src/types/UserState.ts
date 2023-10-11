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
    Online = 'online'
}
