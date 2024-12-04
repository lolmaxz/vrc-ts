import { BaseId } from './Generics';

//! --- Beta --- !//

export type BetaIOSInformation = {
    active: boolean;
    id: BaseId;
    betaGroupId: string;
    betaName: string;
    created_at: Date | string;
    lastSynchronizedAt: Date | string;
    type: string;
    updated_at: Date | string;
    userFields: UserFields;
};

/**
 * The allowed values for the `devices` field in the `UserFields` object.
 */
export enum DevicesAllowedValues {
    iPhone12PM = 'iPhone12PM',
    iPhone13PM = 'iPhone13PM',
    iPhone14 = 'iPhone14',
    iPhone14PM = 'iPhone14PM',
    iPhone15 = 'iPhone15',
    iPhone15PM = 'iPhone15PM',
    iPadPro11 = 'iPadPro11',
    iPadPro12 = 'iPadPro12',
    iPadAir = 'iPadAir',
}

export type UserFields = {
    devices: Devices;
    discordName: DiscordName;
    isCreator: IsCreator;
};

export type Devices = {
    allowedValues: DevicesAllowedValues[];
    required: boolean;
};

export type DiscordName = {
    excludeFromAnalytics: boolean;
    required: boolean;
};

export type IsCreator = {
    required: boolean;
};
