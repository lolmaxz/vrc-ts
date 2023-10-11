import { safeAccess, safeEnumConversion } from "../CheckingTools";
import { GroupObjectParseError } from "../errors";
import { Gallery } from "./GroupGallery";
import { MyMember } from "./GroupMyMember";
import { GroupRole } from "./GroupRole";

export type Group = {
    id: string;
    name: string;
    shortCode: string;
    discriminator: string;
    description: string;
    iconUrl?: string;
    bannerUrl?: string;
    privacy: GroupPrivacy;
    ownerId: string;
    rules?: string;
    links?: string[];
    languages?: string[];
    iconId?: string;
    bannerId?: string;
    memberCount: number;
    memberCountSyncedAt?: string; // assuming date-time is a string in ISO format
    isVerified?: boolean;
    joinState?: GroupJoinState;
    tags?: AllTags[];
    galleries?: Gallery[];
    createdAt?: string; // assuming date-time is a string in ISO format
    onlineMemberCount?: number;
    membershipStatus?: GroupMembershipStatus;
    myMember?: MyMember;
    roles?: GroupRole[];
};

export enum GroupMembershipStatus {
    Inactive = 'inactive',
    Member = 'member',
    Requested = 'requested',
    Invited = 'invited',
}

export enum GroupPrivacy {
    Default = 'default',
    Private = 'private',
}

export enum GroupJoinState {
    Closed = 'closed',
    Invite = 'invite',
    Request = 'request',
    Open = 'open',
}

export function isGroupJSON(json: unknown): asserts json is Record<string, unknown>[] {
    if (typeof json !== 'object' || json === null) {
        throw new Error('Expected JSON object');
    }

    const obj = json as Record<string, unknown>;
    const errorList: string[] = [];

    try {

        if (!('id' in obj && typeof obj.id === 'string')) errorList.push(`id`);
        if (!('name' in obj && typeof obj.name === 'string')) errorList.push(`name`);
        if (!('shortCode' in obj && typeof obj.shortCode === 'string')) errorList.push(`shortCode`);
        if (!('discriminator' in obj && typeof obj.discriminator === 'string')) errorList.push(`discriminator`);
        if (!('description' in obj && typeof obj.description === 'string')) errorList.push(`description`);
        if (('iconUrl' in obj) && (obj.iconUrl !== undefined && typeof obj.iconUrl !== 'string')) errorList.push(`iconUrl`);
        if (('bannerUrl' in obj) && (obj.bannerUrl !== undefined && typeof obj.bannerUrl !== 'string')) errorList.push(`bannerUrl`);
        if (!('privacy' in obj && typeof obj.privacy === 'string' && Object.values(GroupPrivacy).includes(obj.privacy as GroupPrivacy))) errorList.push(`privacy`);
        if (!('ownerId' in obj && typeof obj.ownerId === 'string')) errorList.push(`ownerId`);
        if (('rules' in obj) && (obj.rules !== undefined && typeof obj.rules !== 'string')) errorList.push(`rules`);
        if (('links' in obj) && (obj.links !== undefined && Array.isArray(obj.links) && obj.links.every((link: unknown) => typeof link === 'string'))) errorList.push(`links`);
        if (('languages' in obj) && (obj.languages !== undefined && Array.isArray(obj.languages) && obj.languages.every((language: LanguageTags) => typeof language === 'string'))) errorList.push(`languages`);
        if (('iconId' in obj) && (obj.iconId !== undefined && typeof obj.iconId !== 'string')) errorList.push(`iconId`);
        if (('bannerId' in obj) && (obj.bannerId !== undefined && typeof obj.bannerId !== 'string')) errorList.push(`bannerId`);
        if (!('memberCount' in obj && typeof obj.memberCount === 'number')) errorList.push(`memberCount`);
        if (('memberCountSyncedAt' in obj) && (obj.memberCountSyncedAt !== undefined && typeof obj.memberCountSyncedAt !== 'string')) errorList.push(`memberCountSyncedAt`);
        if (('isVerified' in obj) && (obj.isVerified !== undefined && typeof obj.isVerified !== 'boolean')) errorList.push(`isVerified`);
        if (('joinState' in obj) && (obj.joinState !== undefined && typeof obj.joinState !== 'string' && Object.values(GroupJoinState).includes(obj.joinState as GroupJoinState))) errorList.push(`joinState`);
        if (('tags' in obj) && (obj.tags !== undefined && Array.isArray(obj.tags) && obj.tags.every((tag: AllTags) => typeof tag === 'string'))) errorList.push(`tags`);
        if (('galleries' in obj) && (obj.galleries !== undefined && Array.isArray(obj.galleries) && obj.galleries.every((gallery: unknown) => typeof gallery === 'object'))) errorList.push(`galleries`);
        if (('createdAt' in obj) && (obj.createdAt !== undefined && typeof obj.createdAt !== 'string')) errorList.push(`createdAt`);
        if (('onlineMemberCount' in obj) && (obj.onlineMemberCount !== undefined && typeof obj.onlineMemberCount !== 'number')) errorList.push(`onlineMemberCount`);
        if (('membershipStatus' in obj) && (obj.membershipStatus !== undefined && typeof obj.membershipStatus !== 'string' && Object.values(GroupMembershipStatus).includes(obj.membershipStatus as GroupMembershipStatus))) errorList.push(`membershipStatus`);
        if (('myMember' in obj) && (obj.myMember !== undefined && typeof obj.myMember !== 'object')) errorList.push(`myMember`);
        if (('roles' in obj) && (obj.roles !== undefined && Array.isArray(obj.roles) && obj.roles.every((role: unknown) => typeof role === 'object'))) errorList.push(`roles`);


        if (errorList.length > 0) {
            throw new GroupObjectParseError(errorList);
        }

    } catch (error) {

        if (error instanceof GroupObjectParseError) {
            // console.log(error.errorList);
            throw new GroupObjectParseError(error.errorList);
        } else if (error instanceof Error) {
            throw new Error(`Invalid JSON provided to isGroupJSON: ${error.message}`);
        } else {
            throw new Error(`Invalid JSON provided to isGroupJSON.`);
        }
    }

}


export function GroupFromJSON(json: unknown): Group {
    return GroupFromJSONTyped(json as Record<string, unknown>);
}

function GroupFromJSONTyped(json: Record<string, unknown>): Group {

    try {
        isGroupJSON(json)
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Invalid JSON provided to GroupFromJSONTyped: ${error.message}`);
        } else {
            throw new Error(`Invalid JSON provided to GroupFromJSONTyped.`);
        }
    }

    // After validating all fields, return the CurrentUser object
    return {
        'id': safeAccess(json, 'id') as string,
        'name': safeAccess(json, 'name') as string,
        'shortCode': safeAccess(json, 'shortCode') as string,
        'discriminator': safeAccess(json, 'discriminator') as string,
        'description': safeAccess(json, 'description') as string,
        'iconUrl': safeAccess(json, 'iconUrl') as string,
        'bannerUrl': safeAccess(json, 'bannerUrl') as string,
        'privacy': safeEnumConversion(safeAccess(json, 'privacy'), GroupPrivacy) as GroupPrivacy,
        'ownerId': safeAccess(json, 'ownerId') as string,
        'rules': safeAccess(json, 'rules') as string,
        'links': safeAccess(json, 'links') as string[],
        'languages': safeAccess(json, 'languages') as string[],
        'iconId': safeAccess(json, 'iconId') as string,
        'bannerId': safeAccess(json, 'bannerId') as string,
        'memberCount': safeAccess(json, 'memberCount') as number,
        'memberCountSyncedAt': safeAccess(json, 'memberCountSyncedAt') as string,
        'isVerified': safeAccess(json, 'isVerified') as boolean,
        'joinState': safeEnumConversion(safeAccess(json, 'joinState'), GroupJoinState) as GroupJoinState,
        'tags': safeAccess(json, 'tags') as AllTags[],
        'galleries': safeAccess(json, 'galleries') as Gallery[],
        'createdAt': safeAccess(json, 'createdAt') as string,
        'onlineMemberCount': safeAccess(json, 'onlineMemberCount') as number,
        'membershipStatus': safeEnumConversion(safeAccess(json, 'membershipStatus'), GroupMembershipStatus) as GroupMembershipStatus,
        'myMember': safeAccess(json, 'myMember') as MyMember,
        'roles': safeAccess(json, 'roles') as GroupRole[],

    }

}