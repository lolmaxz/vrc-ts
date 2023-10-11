import { safeAccess, safeEnumConversion } from "../CheckingTools";
import { CurrentUserObjectParseError } from "../errors";
import { AccountDeletionLog, isAccountDeletionLog } from "./AccountDeletionLog";
import { DeveloperType } from "./DeveloperType";
import { PastDisplayName, isPastDisplayName } from "./PastDisplayNames";
import { UserState } from "./UserState";
import { UserStatus } from "./UserStatus";

/**
 * The CurrentUserPresence object containing detailed information about the currently logged in user's presence.
 */
type CurrentUserPresence = {
    avatarThumbnail?: string | null;
    displayName?: string;
    groups?: string[];
    id?: string;
    instance?: string | null;
    instanceType?: string | null;
    isRejoining?: string | null;
    platform?: string | null;
    profilePicOverride?: string | null;
    status?: string | null;
    travelingToInstance?: string | null;
    travelingToWorld?: string;
    world?: string;
};

/**
 *  The CurrentUser object containing detailed information about the currently logged in user.
 */
export type CurrentUser = {
    acceptedTOSVersion: number;
    acceptedPrivacyVersion?: number;
    accountDeletionDate?: string | null;
    accountDeletionLog?: Array<AccountDeletionLog>; // ensure it can be null or an array
    activeFriends?: string[];
    allowAvatarCopying: boolean;
    bio: string;
    bioLinks: string[];
    currentAvatar: string;
    currentAvatarAssetUrl: string;
    currentAvatarImageUrl: string;
    currentAvatarThumbnailImageUrl: string;
    date_joined: string;
    developerType: DeveloperType;
    displayName: string;
    emailVerified: boolean;
    fallbackAvatar?: string;
    friendGroupNames: string[];
    friendKey: string;
    friends: string[];
    hasBirthday: boolean;
    hasEmail: boolean;
    hasLoggedInFromClient: boolean;
    hasPendingEmail: boolean;
    homeLocation: string;
    id: string;
    isFriend: boolean;
    last_activity?: string;
    last_login: string;
    last_platform: string;
    obfuscatedEmail: string;
    obfuscatedPendingEmail: string;
    oculusId: string;
    offlineFriends?: string[];
    onlineFriends?: string[];
    pastDisplayNames: PastDisplayName[];
    presence?: CurrentUserPresence;
    profilePicOverride: string;
    state: UserState;
    status: UserStatus;
    statusDescription: string;
    statusFirstTime: boolean;
    statusHistory: string[];
    steamDetails: Record<string, unknown>;
    steamId: string;
    tags: AllTags[];
    twoFactorAuthEnabled: boolean;
    twoFactorAuthEnabledDate?: string | null;
    unsubscribe: boolean;
    updated_at?: string;
    userIcon: string;
    username?: string | null;
};

/**
 * Checks if `obj` is a valid CurrentUserPresence.
 * @param obj The object to check for user presence.
 * @returns  `true` if `obj` is a valid CurrentUserPresence, `false` otherwise.
 */
function isCurrentUserPresence(obj: unknown): obj is CurrentUserPresence {
    if (typeof obj !== 'object' || obj === null) return false;

    const presenceObj = obj as Record<string, unknown>;
    const errorList: string[] = [];

    try {
        if (('displayName' in presenceObj) && (presenceObj.displayName !== undefined && typeof presenceObj.displayName !== 'string')) errorList.push('displayName');
        if (('avatarThumbnail' in presenceObj) && (presenceObj.avatarThumbnail !== undefined && typeof presenceObj.avatarThumbnail !== 'string')) errorList.push('avatarThumbnail');
        if (('groups' in presenceObj) && (presenceObj.groups !== undefined && (!Array.isArray(presenceObj.groups) || !presenceObj.groups.every(group => typeof group === 'string')))) errorList.push('groups');
        if (('id' in presenceObj) && (presenceObj.id !== undefined && typeof presenceObj.id !== 'string')) errorList.push('id');
        if (('instance' in presenceObj) && (presenceObj.instance !== undefined && typeof presenceObj.instance !== 'string')) errorList.push('instance');
        if (('instanceType' in presenceObj) && (presenceObj.instanceType !== undefined && typeof presenceObj.instanceType !== 'string')) errorList.push('instanceType');
        if (('isRejoining' in presenceObj) && (presenceObj.isRejoining !== undefined && typeof presenceObj.isRejoining !== 'string')) errorList.push('isRejoining');
        if (('platform' in presenceObj) && (presenceObj.platform !== undefined && typeof presenceObj.platform !== 'string')) errorList.push('platform');
        if (('profilePicOverride' in presenceObj) && (presenceObj.profilePicOverride !== undefined && typeof presenceObj.profilePicOverride !== 'string')) errorList.push('profilePicOverride');
        if (('status' in presenceObj) && (presenceObj.status !== undefined && typeof presenceObj.status !== 'string')) errorList.push('status');
        if (('travelingToInstance' in presenceObj) && (presenceObj.travelingToInstance !== undefined && typeof presenceObj.travelingToInstance !== 'string')) errorList.push('travelingToInstance');
        if (!('travelingToWorld' in presenceObj && typeof presenceObj.travelingToWorld === 'string')) errorList.push('travelingToWorld');
        if (!('world' in presenceObj && typeof presenceObj.world === 'string')) errorList.push('world');

        if (errorList.length > 0) {
            throw new CurrentUserObjectParseError(errorList);
        }

        return true;

    } catch (error) {
        return false;
    }
}

/**
 * Checks if `json` is a valid CurrentUser object.
 * @param json The JSON object to check for validity.
 * @returns `true` if `json` is a valid CurrentUser object, `false` otherwise.
 */
export function isCurrentUserJSON(json: unknown): asserts json is Record<string, unknown> {
    if (typeof json !== 'object' || json === null) {
        throw new Error('Expected JSON object');
    }

    const obj = json as Record<string, unknown>;
    const errorList: string[] = [];

    try {
        if (!('acceptedTOSVersion' in obj && typeof obj.acceptedTOSVersion === 'number')) errorList.push('acceptedTOSVersion');
        if (('acceptedPrivacyVersion' in obj) && (obj.acceptedPrivacyVersion !== undefined && typeof obj.acceptedPrivacyVersion !== 'number')) errorList.push('acceptedPrivacyVersion');
        if (('accountDeletionDate' in obj) && (obj.accountDeletionDate !== undefined && typeof obj.accountDeletionDate !== 'string' && obj.accountDeletionDate !== null)) errorList.push('accountDeletionDate');
        if (('accountDeletionLog' in obj) && obj.accountDeletionLog !== null && (!Array.isArray(obj.accountDeletionLog) || !obj.accountDeletionLog.every(log => isAccountDeletionLog(log)))) errorList.push('accountDeletionLog');
        if (('activeFriends' in obj) && (obj.activeFriends !== undefined && (!Array.isArray(obj.activeFriends) || !obj.activeFriends.every(friend => typeof friend === 'string')))) errorList.push('activeFriends');
        if (!('allowAvatarCopying' in obj && typeof obj.allowAvatarCopying === 'boolean')) errorList.push('allowAvatarCopying');
        if (!('bio' in obj && typeof obj.bio === 'string')) errorList.push('bio');
        if (!('bioLinks' in obj && Array.isArray(obj.bioLinks) && obj.bioLinks.every(link => typeof link === 'string'))) errorList.push('bioLinks');
        if (!('currentAvatar' in obj && typeof obj.currentAvatar === 'string')) errorList.push('currentAvatar');
        if (!('currentAvatarAssetUrl' in obj && typeof obj.currentAvatarAssetUrl === 'string')) errorList.push('currentAvatarAssetUrl');
        if (!('currentAvatarImageUrl' in obj && typeof obj.currentAvatarImageUrl === 'string')) errorList.push('currentAvatarImageUrl');
        if (!('currentAvatarThumbnailImageUrl' in obj && typeof obj.currentAvatarThumbnailImageUrl === 'string')) errorList.push('currentAvatarThumbnailImageUrl');
        if (!('date_joined' in obj && typeof obj.date_joined === 'string')) errorList.push('date_joined');
        if (!('developerType' in obj && typeof obj.developerType === 'string' && Object.values(DeveloperType).includes(obj.developerType as DeveloperType))) errorList.push('developerType');
        if (!('displayName' in obj && typeof obj.displayName === 'string')) errorList.push('displayName');
        if (!('emailVerified' in obj && typeof obj.emailVerified === 'boolean')) errorList.push('emailVerified');
        if (('fallbackAvatar' in obj) && (obj.fallbackAvatar !== undefined && typeof obj.fallbackAvatar !== 'string')) errorList.push('fallbackAvatar');
        if (!('friendGroupNames' in obj && Array.isArray(obj.friendGroupNames) && obj.friendGroupNames.every(group => typeof group === 'string'))) errorList.push('friendGroupNames');
        if (!('friendKey' in obj && typeof obj.friendKey === 'string')) errorList.push('friendKey');
        if (!('friends' in obj && Array.isArray(obj.friends) && obj.friends.every(friend => typeof friend === 'string'))) errorList.push('friends');
        if (!('hasBirthday' in obj && typeof obj.hasBirthday === 'boolean')) errorList.push('hasBirthday');
        if (!('hasEmail' in obj && typeof obj.hasEmail === 'boolean')) errorList.push('hasEmail');
        if (!('hasLoggedInFromClient' in obj && typeof obj.hasLoggedInFromClient === 'boolean')) errorList.push('hasLoggedInFromClient');
        if (!('hasPendingEmail' in obj && typeof obj.hasPendingEmail === 'boolean')) errorList.push('hasPendingEmail');
        if (!('homeLocation' in obj && typeof obj.homeLocation === 'string')) errorList.push('homeLocation');
        if (!('id' in obj && typeof obj.id === 'string')) errorList.push('id');
        if (!('isFriend' in obj && typeof obj.isFriend === 'boolean')) errorList.push('isFriend');
        if (('last_activity' in obj) && (obj.last_activity !== undefined && typeof obj.last_activity !== 'string')) errorList.push('last_activity');
        if (!('last_login' in obj && typeof obj.last_login === 'string')) errorList.push('last_login');
        if (!('last_platform' in obj && typeof obj.last_platform === 'string')) errorList.push('last_platform');
        if (!('obfuscatedEmail' in obj && typeof obj.obfuscatedEmail === 'string')) errorList.push('obfuscatedEmail');
        if (!('obfuscatedPendingEmail' in obj && typeof obj.obfuscatedPendingEmail === 'string')) errorList.push('obfuscatedPendingEmail');
        if (!('oculusId' in obj && typeof obj.oculusId === 'string')) errorList.push('oculusId');
        if (('offlineFriends' in obj) && (obj.offlineFriends !== undefined && (!Array.isArray(obj.offlineFriends) || !obj.offlineFriends.every(friend => typeof friend === 'string')))) errorList.push('offlineFriends');
        if (!('onlineFriends' in obj && Array.isArray(obj.onlineFriends) && obj.onlineFriends.every(friend => typeof friend === 'string'))) errorList.push('onlineFriends');
        if (!('pastDisplayNames' in obj && Array.isArray(obj.pastDisplayNames) && obj.pastDisplayNames.every(isPastDisplayName))) errorList.push('pastDisplayNames');
        if (('presence' in obj) && (obj.presence !== undefined && !isCurrentUserPresence(obj.presence))) errorList.push('presence');
        if (!('profilePicOverride' in obj && typeof obj.profilePicOverride === 'string')) errorList.push('profilePicOverride');
        if (!('state' in obj && typeof obj.state === 'string' && Object.values(UserState).includes(obj.state as UserState))) errorList.push('state');
        if (!('status' in obj && typeof obj.status === 'string' && Object.values(UserStatus).includes(obj.status as UserStatus))) errorList.push('status');
        if (!('statusDescription' in obj && typeof obj.statusDescription === 'string')) errorList.push('statusDescription');
        if (!('statusFirstTime' in obj && typeof obj.statusFirstTime === 'boolean')) errorList.push('statusFirstTime');
        if (!('statusHistory' in obj && Array.isArray(obj.statusHistory) && obj.statusHistory.every(status => typeof status === 'string'))) errorList.push('statusHistory');
        if (!('steamDetails' in obj && typeof obj.steamDetails === 'object' && obj.steamDetails !== null)) errorList.push('steamDetails');
        if (!('steamId' in obj && typeof obj.steamId === 'string')) errorList.push('steamId');
        if (!('tags' in obj && Array.isArray(obj.tags) && obj.tags.every(tag => typeof tag === 'string'))) errorList.push('tags');
        if (!('twoFactorAuthEnabled' in obj && typeof obj.twoFactorAuthEnabled === 'boolean')) errorList.push('twoFactorAuthEnabled');
        if (('twoFactorAuthEnabledDate' in obj) && (obj.twoFactorAuthEnabledDate !== undefined && typeof obj.twoFactorAuthEnabledDate !== 'string' && obj.twoFactorAuthEnabledDate !== null)) errorList.push('twoFactorAuthEnabledDate');
        if (!('unsubscribe' in obj && typeof obj.unsubscribe === 'boolean')) errorList.push('unsubscribe');
        if (('updated_at' in obj) && (obj.updated_at !== undefined && typeof obj.updated_at !== 'string')) errorList.push('updated_at');
        if (!('userIcon' in obj && typeof obj.userIcon === 'string')) errorList.push('userIcon');
        if (!('username' in obj && typeof obj.username === 'string')) errorList.push('username');

        if (errorList.length > 0) {
            throw new CurrentUserObjectParseError(errorList);
        }

    } catch (error) {

        if (error instanceof CurrentUserObjectParseError) {
            throw new CurrentUserObjectParseError(error.errorList);
        } else if (error instanceof Error) {
            throw new Error(`Invalid JSON provided to CurrentUserFromJSONTyped: ${error.message}`);
        } else {
            throw new Error(`Invalid JSON provided to CurrentUserFromJSONTyped.`);
        }
    }
}

/**
 * 
 * @param json The JSON object to convert to a CurrentUser object.
 * @returns `CurrentUser`. The converted CurrentUser object.
 */
export function CurrentUserFromJSON(json: unknown): CurrentUser {
    return CurrentUserFromJSONTyped(json as Record<string, unknown>);
}

/**
 * Checks if `value` is a valid array of AccountDeletionLog objects.
 * @param value The value to check for validity.
 * @returns returns an array of AccountDeletionLog objects if `value` is valid, `undefined` otherwise.
 */
function safeAccountDeletionLogConversion(value: unknown): AccountDeletionLog[] | undefined {
    if (Array.isArray(value)) {
        return value.every(isAccountDeletionLog) ? value : undefined;
    }
    return undefined;
}

/**
 * Converts JSON to a CurrentUser object and returns it if it's valid.
 * @param json The JSON object to convert to a CurrentUser object.
 * @returns `CurrentUser`. The converted CurrentUser object.
 */
function CurrentUserFromJSONTyped(json: Record<string, unknown>): CurrentUser {

    try {
        isCurrentUserJSON(json)
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Invalid JSON provided to CurrentUserFromJSONTyped: ${error.message}`);
        } else {
            throw new Error(`Invalid JSON provided to CurrentUserFromJSONTyped.`);
        }
    }

    // After validating all fields, return the CurrentUser object
    return {
        'acceptedTOSVersion': safeAccess(json, 'acceptedTOSVersion') as number,
        'acceptedPrivacyVersion': safeAccess(json, 'acceptedPrivacyVersion') as number | undefined,
        'accountDeletionDate': safeAccess(json, 'accountDeletionDate') as string | null | undefined,
        'accountDeletionLog': safeAccountDeletionLogConversion(safeAccess(json, 'accountDeletionLog')),
        'activeFriends': safeAccess(json, 'activeFriends') as string[] | undefined,
        'allowAvatarCopying': safeAccess(json, 'allowAvatarCopying') as boolean,
        'bio': safeAccess(json, 'bio') as string,
        'bioLinks': safeAccess(json, 'bioLinks') as string[],
        'currentAvatar': safeAccess(json, 'currentAvatar') as string,
        'currentAvatarAssetUrl': safeAccess(json, 'currentAvatarAssetUrl') as string,
        'currentAvatarImageUrl': safeAccess(json, 'currentAvatarImageUrl') as string,
        'currentAvatarThumbnailImageUrl': safeAccess(json, 'currentAvatarThumbnailImageUrl') as string,
        'date_joined': safeAccess(json, 'date_joined') as string,
        'developerType': safeEnumConversion(safeAccess(json, 'developerType'), DeveloperType) as DeveloperType,
        'displayName': safeAccess(json, 'displayName') as string,
        'emailVerified': safeAccess(json, 'emailVerified') as boolean,
        'fallbackAvatar': safeAccess(json, 'fallbackAvatar') as string | undefined,
        'friendGroupNames': safeAccess(json, 'friendGroupNames') as string[],
        'friendKey': safeAccess(json, 'friendKey') as string,
        'friends': safeAccess(json, 'friends') as string[],
        'hasBirthday': safeAccess(json, 'hasBirthday') as boolean,
        'hasEmail': safeAccess(json, 'hasEmail') as boolean,
        'hasLoggedInFromClient': safeAccess(json, 'hasLoggedInFromClient') as boolean,
        'hasPendingEmail': safeAccess(json, 'hasPendingEmail') as boolean,
        'homeLocation': safeAccess(json, 'homeLocation') as string,
        'id': safeAccess(json, 'id') as string,
        'isFriend': safeAccess(json, 'isFriend') as boolean,
        'last_activity': safeAccess(json, 'last_activity') as string | undefined,
        'last_login': safeAccess(json, 'last_login') as string,
        'last_platform': safeAccess(json, 'last_platform') as string,
        'obfuscatedEmail': safeAccess(json, 'obfuscatedEmail') as string,
        'obfuscatedPendingEmail': safeAccess(json, 'obfuscatedPendingEmail') as string,
        'oculusId': safeAccess(json, 'oculusId') as string,
        'offlineFriends': safeAccess(json, 'offlineFriends') as string[] | undefined,
        'onlineFriends': safeAccess(json, 'onlineFriends') as string[] | undefined,
        'pastDisplayNames': safeAccess(json, 'pastDisplayNames') as PastDisplayName[],
        'presence': safeAccess(json, 'presence') as CurrentUserPresence | undefined,
        'profilePicOverride': safeAccess(json, 'profilePicOverride') as string,
        'state': safeEnumConversion(safeAccess(json, 'state'), UserState) as UserState,
        'status': safeEnumConversion(safeAccess(json, 'status'), UserStatus) as UserStatus,
        'statusDescription': safeAccess(json, 'statusDescription') as string,
        'statusFirstTime': safeAccess(json, 'statusFirstTime') as boolean,
        'statusHistory': safeAccess(json, 'statusHistory') as string[],
        'steamDetails': safeAccess(json, 'steamDetails') as Record<string, unknown>,
        'steamId': safeAccess(json, 'steamId') as string,
        'tags': safeAccess(json, 'tags') as AllTags[],
        'twoFactorAuthEnabled': safeAccess(json, 'twoFactorAuthEnabled') as boolean,
        'twoFactorAuthEnabledDate': safeAccess(json, 'twoFactorAuthEnabledDate') as string | null | undefined,
        'unsubscribe': safeAccess(json, 'unsubscribe') as boolean,
        'updated_at': safeAccess(json, 'updated_at') as string | undefined,
        'userIcon': safeAccess(json, 'userIcon') as string,
        'username': safeAccess(json, 'username') as string
    };
}