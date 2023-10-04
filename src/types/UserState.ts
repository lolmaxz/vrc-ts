/**
 * * "online" User is online in VRChat
 * * "active" User is online, but not in VRChat
 * * "offline" User is offline
 * 
 * Always offline when returned through `getCurrentUser` (/auth/user).
 * @export
 */
export const UserState = {
    Offline: 'offline',
    Active: 'active',
    Online: 'online'
} as const;
export type UserState = typeof UserState[keyof typeof UserState];