import { DeveloperType } from "./DeveloperType";
import { UserState } from "./UserState";
import { UserStatus } from "./UserStatus";


export interface User {
    allowAvatarCopying: boolean;
    bio: string;
    bioLinks: string[];
    currentAvatarImageUrl: string;
    currentAvatarThumbnailImageUrl: string;
    date_joined: Date;
    developerType: DeveloperType;
    displayName: string;
    friendKey: string;
    friendRequestStatus: string;
    id: string;
    instanceId: string;
    isFriend: boolean;
    last_activity: string;
    last_login: string;
    last_platform: string;
    location: string;
    note: string;
    profilePicOverride: string;
    state: UserState;
    status: UserStatus;
    statusDescription: string;
    tags: string[];
    travelingToInstance: string;
    travelingToLocation: string;
    travelingToWorld: string;
    userIcon: string;
    worldId: string;
}


export function isUser(obj: unknown): obj is User {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    const userObj = obj as Record<string, unknown>;

    return 'allowAvatarCopying' in userObj && typeof userObj.allowAvatarCopying === 'boolean' &&
        'bio' in userObj && typeof userObj.bio === 'string' &&
        'bioLinks' in userObj && Array.isArray(userObj.bioLinks) && userObj.bioLinks.every(link => typeof link === 'string') &&
        'currentAvatarImageUrl' in userObj && typeof userObj.currentAvatarImageUrl === 'string' &&
        'currentAvatarThumbnailImageUrl' in userObj && typeof userObj.currentAvatarThumbnailImageUrl === 'string' &&
        'date_joined' in userObj && typeof userObj.date_joined === 'string' &&
        'developerType' in userObj && ['none', 'trusted', 'internal', 'moderator'].includes(userObj.developerType as string) &&
        'displayName' in userObj && typeof userObj.displayName === 'string' &&
        'friendKey' in userObj && typeof userObj.friendKey === 'string' &&
        'friendRequestStatus' in userObj && typeof userObj.friendRequestStatus === 'string' &&
        'id' in userObj && typeof userObj.id === 'string' &&
        'instanceId' in userObj && typeof userObj.instanceId === 'string' &&
        'isFriend' in userObj && typeof userObj.isFriend === 'boolean' &&
        'last_activity' in userObj && typeof userObj.last_activity === 'string' &&
        'last_login' in userObj && typeof userObj.last_login === 'string' &&
        'last_platform' in userObj && typeof userObj.last_platform === 'string' &&
        'location' in userObj && typeof userObj.location === 'string' &&
        'note' in userObj && typeof userObj.note === 'string' &&
        'profilePicOverride' in userObj && typeof userObj.profilePicOverride === 'string' &&
        'state' in userObj && ['online', 'active', 'offline'].includes(userObj.state as string) &&
        'status' in userObj && ['active', 'join me', 'ask me', 'busy', 'offline'].includes(userObj.status as string) &&
        'statusDescription' in userObj && typeof userObj.statusDescription === 'string' &&
        'tags' in userObj && Array.isArray(userObj.tags) && userObj.tags.every(tag => typeof tag === 'string') &&
        'travelingToInstance' in userObj && typeof userObj.travelingToInstance === 'string' &&
        'travelingToLocation' in userObj && typeof userObj.travelingToLocation === 'string' &&
        'travelingToWorld' in userObj && typeof userObj.travelingToWorld === 'string' &&
        'userIcon' in userObj && typeof userObj.userIcon === 'string' &&
        'worldId' in userObj && typeof userObj.worldId === 'string';
}

function isUserJSON(json: unknown): json is Record<string, unknown> {
    if (typeof json !== 'object' || json === null) {
        return false;
    }

    const obj = json as Record<string, unknown>;

    return typeof obj.allowAvatarCopying === 'boolean' &&
        typeof obj.bio === 'string' &&
        Array.isArray(obj.bioLinks) &&
        obj.bioLinks.every((link: unknown) => typeof link === 'string') &&
        typeof obj.currentAvatarImageUrl === 'string' &&
        typeof obj.currentAvatarThumbnailImageUrl === 'string' &&
        (typeof obj.date_joined === typeof Date || typeof obj.date_joined === 'string') &&
        ['none', 'trusted', 'internal', 'moderator'].includes(obj.developerType as string) &&
        typeof obj.displayName === 'string' &&
        typeof obj.friendKey === 'string' &&
        typeof obj.friendRequestStatus === 'string' &&
        typeof obj.id === 'string' &&
        typeof obj.instanceId === 'string' &&
        typeof obj.isFriend === 'boolean' &&
        typeof obj.last_activity === 'string' &&
        typeof obj.last_login === 'string' &&
        typeof obj.last_platform === 'string' &&
        typeof obj.location === 'string' &&
        typeof obj.note === 'string' &&
        typeof obj.profilePicOverride === 'string' &&
        ['online', 'active', 'offline'].includes(obj.state as string) &&
        ['active', 'join me', 'ask me', 'busy', 'offline'].includes(obj.status as string) &&
        typeof obj.statusDescription === 'string' &&
        Array.isArray(obj.tags) &&
        obj.tags.every((tag: unknown) => typeof tag === 'string') &&
        typeof obj.travelingToInstance === 'string' &&
        typeof obj.travelingToLocation === 'string' &&
        typeof obj.travelingToWorld === 'string' &&
        typeof obj.userIcon === 'string' &&
        typeof obj.worldId === 'string'
}


export function UserFromJSON(json: unknown): User {
    return UserFromJSONTyped(json);
}

// Helper function to safely access properties
function safeAccess(json: unknown, key: string): unknown {
    if (typeof json === 'object' && json !== null && key in json) {
        return (json as Record<string, unknown>)[key];
    }
    return undefined;
}

// Safely handle enum conversion
function safeEnumConversion<T extends Record<string, string | number>>(value: unknown, enumObj: T): T[keyof T] | undefined {
    return Object.values(enumObj).includes(value as T[keyof T]) ? value as T[keyof T] : undefined;
}

export function UserFromJSONTyped(json: unknown): User {
    if (!isUserJSON(json)) {
        throw new Error('Invalid JSON provided to UserFromJSONTyped');
    }
    return {
        'allowAvatarCopying': safeAccess(json, 'allowAvatarCopying') as boolean,
        'bio': safeAccess(json, 'bio') as string,
        'bioLinks': safeAccess(json, 'bioLinks') as string[],
        'currentAvatarImageUrl': safeAccess(json, 'currentAvatarImageUrl') as string,
        'currentAvatarThumbnailImageUrl': safeAccess(json, 'currentAvatarThumbnailImageUrl') as string,
        'date_joined': new Date(safeAccess(json, 'date_joined') as string),
        'developerType': safeEnumConversion(safeAccess(json, 'developerType'), DeveloperType) as DeveloperType,
        'displayName': safeAccess(json, 'displayName') as string,
        'friendKey': safeAccess(json, 'friendKey') as string,
        'friendRequestStatus': safeAccess(json, 'friendRequestStatus') as string,
        'id': safeAccess(json, 'id') as string,
        'instanceId': safeAccess(json, 'instanceId') as string,
        'isFriend': safeAccess(json, 'isFriend') as boolean,
        'last_activity': safeAccess(json, 'last_activity') as string,
        'last_login': safeAccess(json, 'last_login') as string,
        'last_platform': safeAccess(json, 'last_platform') as string,
        'location': safeAccess(json, 'location') as string,
        'note': safeAccess(json, 'note') as string,
        'profilePicOverride': safeAccess(json, 'profilePicOverride') as string,
        'state': safeEnumConversion(safeAccess(json, 'state'), UserState) as UserState,
        'status': safeEnumConversion(safeAccess(json, 'status'), UserStatus) as UserStatus,
        'statusDescription': safeAccess(json, 'statusDescription') as string,
        'tags': safeAccess(json, 'tags') as string[],
        'travelingToInstance': safeAccess(json, 'travelingToInstance') as string,
        'travelingToLocation': safeAccess(json, 'travelingToLocation') as string,
        'travelingToWorld': safeAccess(json, 'travelingToWorld') as string,
        'userIcon': safeAccess(json, 'userIcon') as string,
        'worldId': safeAccess(json, 'worldId') as string,
    }
}