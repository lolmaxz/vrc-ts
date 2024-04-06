//! --- Permissions --- !//

export type Permission = {
    id: string;
    ownerId: string;
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
    permissionId: string;
};
