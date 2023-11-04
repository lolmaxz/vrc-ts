declare namespace VRCAPI {
    namespace Permissions {
        namespace Models {

            type Permission = {
                id: string
                ownerId: string;
                ownerDisplayName?: string;
                name: string
                displayName?: string;
                type?: string
                data?: {
                    maxFavoritesPerGroup?: {
                        avatar?: number;
                    };
                    maxFavoriteGroups?: {
                        avatar?: number;
                    };
                    tags: string[];
                };
            }

        }

        namespace Requests {

            type GetPermissionRequest = {
                permissionId: string;
            }

        }
    }
}