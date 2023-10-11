import { safeAccess, safeEnumConversion } from "../CheckingTools";
import { LimitedUserObjectParseError } from "../errors";
import { DeveloperType } from "./DeveloperType";
import { UserStatus } from "./UserStatus";

/**
 * LimitedUser is a subset of the User object, containing only the fields that are returned by the /users/ endpoint.
 */
export type LimitedUser = {
    bio?: string;
    currentAvatarImageUrl: string;
    currentAvatarThumbnailImageUrl: string;
    developerType: DeveloperType;
    displayName: string;
    fallbackAvatar?: string;
    id: string;
    isFriend: boolean;
    last_platform: string;
    profilePicOverride: string;
    status: UserStatus;
    statusDescription: string;
    tags: string[];
    userIcon: string;
    location?: string;
    friendKey?: string;
}

/**
 * Checks if the provided JSON object is a valid LimitedUser object.
 * @param json The JSON object to validate.
 * @throws {LimitedUserObjectParseError} Thrown if the provided JSON object is not a valid LimitedUser object.
 * @throws {Error} Thrown if the provided JSON object is not a valid JSON object.
 * @returns `boolean` indicating whether or not the provided JSON object is a valid LimitedUser object.
 */
export function isLimitedUserJSON(json: unknown): asserts json is Record<string, unknown> {
    if (typeof json !== 'object' || json === null) {
        throw new Error('Expected JSON object');
    }

    const obj = json as Record<string, unknown>;
    const errorList: string[] = [];

    try {
        if (('bio' in obj) && (obj.bio !== undefined && typeof obj.bio !== 'string')) errorList.push(`bio`);
        if (!('currentAvatarImageUrl' in obj && typeof obj.currentAvatarImageUrl === 'string')) errorList.push(`currentAvatarImageUrl`);
        if (!('currentAvatarThumbnailImageUrl' in obj && typeof obj.currentAvatarThumbnailImageUrl === 'string')) errorList.push(`currentAvatarThumbnailImageUrl`);
        if (!('developerType' in obj && typeof obj.developerType === 'string' && Object.values(DeveloperType).includes(obj.developerType as DeveloperType))) errorList.push(`developerType`);
        if (!('displayName' in obj && typeof obj.displayName === 'string')) errorList.push(`displayName`);
        if (('fallbackAvatar' in obj) && (obj.fallbackAvatar !== undefined && typeof obj.fallbackAvatar !== 'string')) errorList.push(`fallbackAvatar`);
        if (!('id' in obj && typeof obj.id === 'string')) errorList.push(`id`);
        if (!('isFriend' in obj && typeof obj.isFriend === 'boolean')) errorList.push(`isFriend`);
        if (!('last_platform' in obj && typeof obj.last_platform === 'string')) errorList.push(`last_platform`);
        if (!('profilePicOverride' in obj && typeof obj.profilePicOverride === 'string')) errorList.push(`profilePicOverride`);
        if (!('status' in obj && typeof obj.status === 'string' && Object.values(UserStatus).includes(obj.status as UserStatus))) errorList.push(`status`);
        if (!('statusDescription' in obj && typeof obj.statusDescription === 'string')) errorList.push(`statusDescription`);
        if (!('tags' in obj && Array.isArray(obj.tags) && obj.tags.every((tag: unknown) => typeof tag === 'string'))) errorList.push(`tags`);
        if (!('userIcon' in obj && typeof obj.userIcon === 'string')) errorList.push(`userIcon`);
        if (('location' in obj) && (obj.location !== undefined && typeof obj.location !== 'string')) errorList.push(`location`);
        if (('friendKey' in obj) && (obj.friendKey !== undefined && typeof obj.friendKey !== 'string')) errorList.push(`friendKey`);

        if (errorList.length > 0) {
            throw new LimitedUserObjectParseError(errorList);
        }

    } catch (error) {

        if (error instanceof LimitedUserObjectParseError) {
            console.log(error.errorList);

            throw new LimitedUserObjectParseError(error.errorList);
        } else if (error instanceof Error) {
            throw new Error(`Invalid JSON provided to isLimitedUsersJSON: ${error.message}`);
        } else {
            throw new Error(`Invalid JSON provided to isLimitedUsersJSON.`);
        }
    }
}

/**
 * Parses the provided JSON object into a LimitedUser object.
 * @param json string containing the JSON to parse into a LimitedUserObject.
 * @returns `LimitedUser` object representing the provided JSON.
 */
export function LimitedUserFromJSON(json: unknown): LimitedUser {
    return LimitedUserFromJSONTyped(json);
}

/**
 * Parses the provided JSON object into a LimitedUser object after validating it.
 * @param json string containing the JSON to parse into a LimitedUser.
 * @returns `LimitedUser` object representing the provided JSON.
 */
export function LimitedUserFromJSONTyped(json: unknown): LimitedUser {
    try {
        isLimitedUserJSON(json); // Validating the JSON object before attempting to parse it.
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Invalid JSON provided to LimitedUserFromJSONTyped: ${error.message}`);
        } else {
            throw new Error(`Invalid JSON provided to LimitedUserFromJSONTyped.`);
        }
    }

    // After validating all fields, return the CurrentUser object
    return {
        'bio': safeAccess(json, 'bio') as string,
        'currentAvatarImageUrl': safeAccess(json, 'currentAvatarImageUrl') as string,
        'currentAvatarThumbnailImageUrl': safeAccess(json, 'currentAvatarThumbnailImageUrl') as string,
        'developerType': safeEnumConversion(safeAccess(json, 'developerType'), DeveloperType) as DeveloperType,
        'displayName': safeAccess(json, 'displayName') as string,
        'fallbackAvatar': safeAccess(json, 'fallbackAvatar') as string,
        'id': safeAccess(json, 'id') as string,
        'isFriend': safeAccess(json, 'isFriend') as boolean,
        'last_platform': safeAccess(json, 'last_platform') as string,
        'profilePicOverride': safeAccess(json, 'profilePicOverride') as string,
        'status': safeEnumConversion(safeAccess(json, 'status'), UserStatus) as UserStatus,
        'statusDescription': safeAccess(json, 'statusDescription') as string,
        'tags': safeAccess(json, 'tags') as string[],
        'userIcon': safeAccess(json, 'userIcon') as string,
        'location': safeAccess(json, 'location') as string,
        'friendKey': safeAccess(json, 'friendKey') as string,
    };
}