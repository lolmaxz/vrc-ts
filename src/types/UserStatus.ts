/**
 * Defines the User's current status, for example "ask me", "join me" or "offline. This status is a combined indicator of their online activity and privacy preference.
 * @export
 */
export const UserStatus = {
    Active: 'active',
    JoinMe: 'join me',
    AskMe: 'ask me',
    Busy: 'busy',
    Offline: 'offline'
} as const;
export type UserStatus = typeof UserStatus[keyof typeof UserStatus];