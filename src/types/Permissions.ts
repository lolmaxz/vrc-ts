//! --- Permissions --- !//

import { PermissionIdType, UserIdType } from './Generics';

export type Permission = {
    id: PermissionIdType;
    ownerId: UserIdType;
    ownerDisplayName?: string;
    name: string;
    displayName?: string;
    type?: string;
    data?: {
        maxFavoritesPerGroup?: {
            avatar?: number;
        };
        maxFavoriteGroups?: {
            avatar?: number;
        };
        tags: string[];
    };
};

//! --- Request --- !//

export type GetPermissionRequest = {
    permissionId: PermissionIdType;
};
