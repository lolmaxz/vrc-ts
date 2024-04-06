//! --- Instances --- !//

export type Instance = {
    id: string;
    location: string; // the full ID of the instance + world
    instanceId: string; // The id of the instance
    name: string; // the name of the instance, unless specified manually, will always be affected at random by vrchat with a digit number ranging from 0 to 99999
    worldId: string; // The world ID for the instance
    ownerId?: string; // depending on the type, could be a Group ID // todo to research more
    tags: string[]; // todo to research more
    active: boolean; // If there is currently players in this world/instance
    full: boolean; // If the instance is full or not. Default to false.
    n_users: number; // todo check the difference with this and userCount, seems to be the same..
    capacity: number;
    recommendedCapacity: number;
    userCount: number; // todo check the difference with this and n_users, seems to be the same..
    queueEnabled: boolean; // Whether the queue is enabled or not
    /** The number of player in the instance, per platforms */
    platforms: {
        /** Number of PC players */
        standalonewindows: number;
        /** Number of Quest/Mobile players */
        android: number;
    };
    gameServerVersion?: number | null; // todo research more. for now we only know that this can be null, it can be a number
    roleRestricted: boolean; // if this instance requires roles to access // todo research more
    secureName: string; // The short code to access the instance (for short link to share outside vrchat website, only the code part, not the full link!)
    shortName?: string | null; // todo research more. for now we only know that this can be null
    world: unknown; // todo this will be a world type when it's completed
    clientNumber: 'unknown'; // todo research more. for now we only know that this can be a string or "unknown"
    photonRegion: InstanceRegionType; // The region of the instance
    region: InstanceRegionType; // The region of the instance
    /**
     * Default to false. Only in the case of a invite type instance. If set to true, will make a invite instance into a invite+ instance type!
     */
    canRequestInvite: boolean;
    permanent: boolean; // todo research more
    groupAccessType?: string; // todo research more
    strict: boolean; // todo research more
    /** Required to generate an instance that isn't public */
    nonce: string;
    users?: string[]; // todo research more
    hidden?: string; // hidden field is only present if InstanceType is hidden aka "Friends+", and is instance creator. // TODO research more
    friends?: string; //friends field is only present if InstanceType is friends aka "Friends", and is instance creator. // TODO research more
    private?: string; // private field is only present if InstanceType is private aka "Invite" or "Invite+", and is instance creator. // TODO research more
};

export type InstanceShortName = {
    shortName?: string;
    secureName?: string;
};

/**
 * ## Different type of Instance
 * These are all the different instance type for an instance.
 *
 * @enum {string} - **Public** -> `Public` Anybody can join.
 * - **Friends** -> `Friend` Only your friends may join.
 * - **Friends_Plus** -> `Friend+` Any friend of a user in the instance may join.
 * - **Private** -> `Invite` and `Invite+` Invite: You can invite others. Only you can accept requests. Invite+: You can invite others. Joiners can accept requests.
 * - **Group** -> `Group` Specificly for making a group instance type.
 */
export enum InstanceType {
    Public = 'public',
    Friends = 'friends',
    Friends_Plus = 'hidden',
    Private = 'private',
    Group = 'group',
}

/**
 * ## Different type of Instance Region Type
 * These are all the different region type for an instance.
 *
 * ### @enum {string} - **US_WEST** -> US West Server
 * - **US_EAST** -> US East Server
 * - **EU** -> Europe Server
 * - **JP** -> Japan Server
 */
export enum InstanceRegionType {
    US_WEST = 'us',
    US_EAST = 'use',
    EU = 'eu',
    JP = 'jp',
}

/**
 * ## Different type of Group Access Instance Type
 * These are all the different instance type for a Group Instance type.
 * ### @enum {string} - **Group_Public** -> Anyone can join in the group.
 * - **Group_Plus** -> Any friend of a user in the instance can join the instance
 * - **Group_Members** -> Only the selected group roles may join. (You are going to need to define group roles).
 */
export enum GroupAccessType {
    Group_Public = 'public',
    Group_Plus = 'plus',
    Group_Members = 'members',
}

//! --- Requests --- !//

export type CreateRegularInstanceRequest = {
    worldId: string;
    region: InstanceRegionType;
    instanceCode?: number | string;
} & (PublicType | Friends_Invite_Type);

export type PublicType = {
    instanceType: InstanceAccessNormalType.Public;
    ownerId?: string;
};

export type Friends_Invite_Type = {
    instanceType:
        | InstanceAccessNormalType.Friends
        | InstanceAccessNormalType.Invite
        | InstanceAccessNormalType.Invite_Plus
        | InstanceAccessNormalType.Friends_Plus;
    /** Only required if the instance isn't of type 'Public' */
    ownerId: string;
};

type NonEmptyArray<T> = [T, ...T[]];

export type CreateGroupInstanceRequest = {
    worldId: string;
    groupAccessType: GroupAccessType;
    /** The GROUP ID of the group you want to create an instance for. */
    groupId: string;
    region: InstanceRegionType;
    roleIds: NonEmptyArray<string>;
    queueEnabled?: boolean;
    instanceCode?: number | string;
};

export type dataKeysCreateGroupInstance = {
    groupAccessType: GroupAccessType;
    ownerId: string;
    queueEnabled: boolean;
    region: InstanceRegionType;
    roleIds: NonEmptyArray<string>;
    type: 'group';
    worldId: string;
    instanceCode: number | string;
};

/** The Required Parameters to get an instance. */
export type GetInstanceRequest = {
    worldId: string;
    instanceId: string;
};

/** The Required Parameters to get an instance's short name. */
export type GetInstanceShortNameRequest = {
    instanceId: string;
};

/** The Required Parameters to send an invite to yourself. */
export type SendSelfInviteRequest = {
    worldId: string;
    instanceId: string;
};

/** The Required Parameters to get an instance by short name. */
export type GetInstanceByShortName = {
    shortName: string;
};

export enum InstanceAccessNormalType {
    Public,
    Friends_Plus,
    Friends,
    Invite,
    Invite_Plus,
}
