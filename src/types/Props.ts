import { PropIdType, UserIdType } from './Generics';

export enum PropReleaseStatus {
    Public = 'public',
    Private = 'private',
    Hidden = 'hidden',
    All = 'all',
}

export type PropUnityPackage = {
    assetUrl: string;
    assetVersion: number;
    platform: string;
    propSignature: string;
    unityVersion: string;
    variant: string;
};

export type Prop = {
    _created_at: string;
    _updated_at: string;
    abilities?: string[];
    /** Official example uses a legacy account id, not always `usr_`. */
    authorId: string;
    authorName: string;
    description: string;
    id: PropIdType;
    imageUrl: string;
    itemTemplate?: string;
    kind?: number;
    maxCountPerUser: number;
    name: string;
    releaseStatus: PropReleaseStatus;
    scaleWithAvatar?: boolean;
    spawnType: number;
    tags: string[];
    thumbnailImageUrl: string;
    unityPackageUrl: string | null;
    unityPackages: PropUnityPackage[];
    version?: number;
    visibilityType?: string;
    worldPlacementMask: number;
};

export type PropPublishStatus = {
    canPublish?: boolean;
    unpublished?: boolean;
};

export type getPropRequest = {
    propId: PropIdType;
};

export type listPropsRequest = {
    n?: number;
    offset?: number;
    userId?: UserIdType;
    releaseStatus?: PropReleaseStatus;
};
