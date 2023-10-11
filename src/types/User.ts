import { safeAccess, safeEnumConversion } from "../CheckingTools";
import { UserObjectParseError } from "../errors";
import { CurrentUser } from "./CurrentUser";
import { DeveloperType } from "./DeveloperType";
import { UserState } from "./UserState";
import { UserStatus } from "./UserStatus";

/**
 * This Type represents a user in VRChat.
 */
export type User = {
    allowAvatarCopying: boolean;
    bio: string;
    bioLinks: string[];
    currentAvatarImageUrl: string;
    currentAvatarThumbnailImageUrl: string;
    date_joined: Date;
    developerType: DeveloperType;
    displayName: string;
    friendKey: string;
    friendRequestStatus?: string;
    id: string;
    instanceId?: string;
    isFriend: boolean;
    last_activity: string;
    last_login: string;
    last_platform: string;
    location?: string;
    note?: string;
    profilePicOverride: string;
    state: UserState;
    status: UserStatus;
    statusDescription: string;
    tags: AllTags[];
    travelingToInstance?: string;
    travelingToLocation?: string;
    travelingToWorld?: string;
    userIcon: string;
    username?: string;
    worldId?: string;
}

/**
 * Checks if the provided JSON object is a valid User object.
 * @param json {Object} The JSON object to validate.
 * @return {boolean} `true` if the provided JSON object is a valid User object, `false` otherwise.
 * @throws {UserObjectParseError} Thrown if the provided JSON object is not a valid User object.
 */
export function isUserJSON(json: unknown): asserts json is Record<string, unknown> {
    if (typeof json !== 'object' || json === null) {
        throw new Error('Expected JSON object');
    }

    const obj = json as Record<string, unknown>;
    const errorList: string[] = [];

    try {
        if (!('allowAvatarCopying' in obj && typeof obj.allowAvatarCopying === 'boolean')) errorList.push('allowAvatarCopying');
        if (!('bio' in obj && typeof obj.bio === 'string')) errorList.push('bio');
        if (!('bioLinks' in obj && Array.isArray(obj.bioLinks) && obj.bioLinks.every(link => typeof link === 'string'))) errorList.push('bioLinks');
        if (!('currentAvatarImageUrl' in obj && typeof obj.currentAvatarImageUrl === 'string')) errorList.push('currentAvatarImageUrl');
        if (!('currentAvatarThumbnailImageUrl' in obj && typeof obj.currentAvatarThumbnailImageUrl === 'string')) errorList.push('currentAvatarThumbnailImageUrl');
        if (!('date_joined' in obj && (typeof obj.date_joined === typeof Date || typeof obj.date_joined === 'string'))) errorList.push('date_joined');
        if (!('developerType' in obj && typeof obj.developerType === 'string' && Object.values(DeveloperType).includes(obj.developerType as DeveloperType))) errorList.push('developerType');
        if (!('displayName' in obj && typeof obj.displayName === 'string')) errorList.push('displayName');
        if (!('friendKey' in obj && typeof obj.friendKey === 'string')) errorList.push('friendKey');
        if (('friendRequestStatus' in obj) && (obj.friendRequestStatus !== undefined && typeof obj.friendRequestStatus !== 'string')) errorList.push('friendRequestStatus');
        if (!('id' in obj && typeof obj.id === 'string')) errorList.push('id');
        if (('instanceId' in obj) && (obj.instanceId !== undefined && typeof obj.instanceId !== 'string')) errorList.push('instanceId');
        if (!('isFriend' in obj && typeof obj.isFriend === 'boolean')) errorList.push('isFriend');
        if (!('last_activity' in obj && typeof obj.last_activity === 'string')) errorList.push('last_activity');
        if (!('last_login' in obj && typeof obj.last_login === 'string')) errorList.push('last_login');
        if (!('last_platform' in obj && typeof obj.last_platform === 'string')) errorList.push('last_platform');
        if (('location' in obj) && (obj.location !== undefined && typeof obj.location !== 'string')) errorList.push('location');
        if (('note' in obj) && (obj.note !== undefined && typeof obj.note !== 'string')) errorList.push('note');
        if (!('profilePicOverride' in obj && typeof obj.profilePicOverride === 'string')) errorList.push('profilePicOverride');
        if (!('state' in obj && typeof obj.state === 'string' && Object.values(UserState).includes(obj.state as UserState))) errorList.push('state');
        if (!('status' in obj && typeof obj.status === 'string' && Object.values(UserStatus).includes(obj.status as UserStatus))) errorList.push('status');
        if (!('statusDescription' in obj && typeof obj.statusDescription === 'string')) errorList.push('statusDescription');
        if (!('tags' in obj && Array.isArray(obj.tags) && obj.tags.every(tag => typeof tag === 'string'))) errorList.push('tags');
        if (('travelingToInstance' in obj) && (obj.travelingToInstance !== undefined && typeof obj.travelingToInstance !== 'string')) errorList.push('travelingToInstance');
        if (('travelingToLocation' in obj) && (obj.travelingToLocation !== undefined && typeof obj.travelingToLocation !== 'string')) errorList.push('travelingToLocation');
        if (('travelingToWorld' in obj) && (obj.travelingToWorld !== undefined && typeof obj.travelingToWorld !== 'string')) errorList.push('travelingToWorld');
        if (!('userIcon' in obj && typeof obj.userIcon === 'string')) errorList.push('userIcon');
        if (('username' in obj) && (obj.username !== undefined && typeof obj.username !== 'string')) errorList.push('username');
        if (('worldId' in obj) && (obj.worldId !== undefined && typeof obj.worldId !== 'string')) errorList.push('worldId');

        if (errorList.length > 0) {
            throw new UserObjectParseError(errorList);
        }

    } catch (error) {

        if (error instanceof UserObjectParseError) {
            throw new UserObjectParseError(error.errorList);
        } else if (error instanceof Error) {
            throw new Error(`Invalid JSON provided to CurrentUserFromJSONTyped: ${error.message}`);
        } else {
            throw new Error(`Invalid JSON provided to CurrentUserFromJSONTyped.`);
        }
    }
}

/**
 * Function used to convert a JSON object to a User object.
 * @param json The JSON object to convert to a User object.
 * @returns A `User` object.
 */
export function UserFromJSON(json: unknown): User {
    return UserFromJSONTyped(json as Record<string, unknown>);
}

/**
 * Function used to validate if an object is a User type and returns the User object if it is. This function throws an error if the object is not a valid User object.
 * @param json The JSON object to convert to a User object.
 * @returns A `User` object.
 * @throws {Error} Thrown if the object is not a valid User object.
 */
function UserFromJSONTyped(json: Record<string, unknown>): User {

    try {
        isUserJSON(json)
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Invalid JSON provided to CurrentUserFromJSONTyped: ${error.message}`);
        } else {
            throw new Error(`Invalid JSON provided to CurrentUserFromJSONTyped.`);
        }
    }

    // After validating all fields, return the CurrentUser object
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
        'tags': safeAccess(json, 'tags') as AllTags[],
        'travelingToInstance': safeAccess(json, 'travelingToInstance') as string,
        'travelingToLocation': safeAccess(json, 'travelingToLocation') as string,
        'travelingToWorld': safeAccess(json, 'travelingToWorld') as string,
        'userIcon': safeAccess(json, 'userIcon') as string,
        'username': safeAccess(json, 'username') as string,
        'worldId': safeAccess(json, 'worldId') as string,
    }
}

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
 * This function is used to get the rank tag of a user. Returns the highest rank tag of the user. Else returns undefined.
 * @param user The User or CurrentUser object to get the rank tag from.
 * @returns The rank tag of the user. If the user has no rank tag, returns undefined.
 */
export function getVRCRankTag(user: User|CurrentUser): VRCRanks | undefined {
    // the highest vrcrank we can find in the user's tag is the rank of the user we should return
    const tags: AllTags[] = user.tags;
    if (user.tags.includes(VRCRanks.Veteran)) {
        return VRCRanks.Veteran;
    } else if (tags.includes(VRCRanks.Trusted)) {
        return VRCRanks.Trusted;
    } else if (tags.includes(VRCRanks.Known)) {
        return VRCRanks.Known;
    } else if (tags.includes(VRCRanks.User)) {
        return VRCRanks.User;
    } else if (tags.includes(VRCRanks.New)) {
        return VRCRanks.New;
    } else if (!tags.includes(VRCRanks.Veteran) &&
                !tags.includes(VRCRanks.Trusted) &&
                !tags.includes(VRCRanks.Known) &&
                !tags.includes(VRCRanks.User) &&
                !tags.includes(VRCRanks.New) &&
                !tags.includes(VRCRanks.Nuisance)) {

        return VRCRanks.Visitor;
    } else if (tags.includes(VRCRanks.Nuisance)) {
        return VRCRanks.Nuisance;
    } else {
        return undefined;
    }
}

/**
 * Get the rank of the user as a string.
 * @param user The User or Current User object to get the rank name from.
 * @returns The rank name of the user. If the user has no rank tag, returns "Rank not found."
 */
export function getVRCRankName(user: User|CurrentUser): string {
    const rank = getVRCRankTag(user);
    if (!rank) {
        return "Rank not found.";
    }
    return VRCRanksName[rank];
}

/**
 * Get if User is a VRC+ subscriber.
 * @param user The User object to check if it is a VRChat User with a current VRC+ subscription.
 * @returns `true` if the user is a VRChat User with a current VRC+ subscription, `false` otherwise.
 */
export function isVRCPlusSubcriber(user: User): boolean {
    return user.tags.includes("system_supporter");

}

/**
 * Get if User has a troll tag.
 * @param user The User object to check if it is a VRChat User with a troll tag.
 * @returns `true` if the user is a VRChat User with a troll tag, `false` otherwise.
 */
export function isUserTroll(user: User): boolean {
    return user.tags.includes(VRCRanks.Nuisance) || user.tags.includes("system_probable_troll");
}