/**
 * "none" User is a normal user
 * "trusted" Unknown
 * "internal" Is a VRChat Developer
 * "moderator" Is a VRChat Moderator
 * 
 * Staff can hide their developerType at will.
 * @export
 */
export const DeveloperType = {
    None: 'none',
    Trusted: 'trusted',
    Internal: 'internal',
    Moderator: 'moderator'
} as const;
export type DeveloperType = typeof DeveloperType[keyof typeof DeveloperType];