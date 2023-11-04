declare namespace VRCAPI {
    namespace Worlds {
        namespace Models {

            type BaseWorld = {
                id: string;
                name: string; // Min 1 chars
                description: string; // Min 0 chars
                authorId: string;
                authorName: string; // Min 1 chars
                releaseStatus: ReleaseStatus; // Enum: ReleaseStatus, Default: public
                featured: boolean; // Default: false
                capacity: number; // integer
                recommendedCapacity: number; // integer
                imageUrl: string; // Min 1 chars
                thumbnailImageUrl: string; // Min 1 chars
                namespace: string;
                version: number; // Min 0, Default: 0
                organization: string; // Min 1 chars, Default: vrchat
                previewYoutubeId?: string | null;
                udonProducts: []; // todo undocumented!
                favorites?: number; // Min 0, Default: 0
                visits: number; // Min 0, Default: 0
                popularity: number; // Min 0, Default: 0
                heat: number; // Min 0, Default: 0
                publicationDate: string; // Min 1 chars
                labsPublicationDate: string; // Min 1 chars
                instances?: VRCAPI.Instances.Models.Instance[]; // Will always be an empty list when unauthenticated.
                publicOccupants?: number; // Min 0, Default: 0, Will always be 0 when unauthenticated.
                privateOccupants?: number; // Min 0, Default: 0, Will always be 0 when unauthenticated.
                occupants?: number; // Min 0, Default: 0, Will always be 0 when unauthenticated.
                unityPackages?: VRCAPI.Files.Models.UnityPackage[]; // Empty if unauthenticated.
                created_at: string; // date-time
                updated_at: string; // date-time
                tags: string[]; // Array of strings
            }
            type World = BaseWorld & {
                unityPackages?: VRCAPI.Files.Models.UnityPackage[]; // Empty if unauthenticated.
            };

            enum ReleaseStatus {
                Public = 'public',
                Private = 'private',
                Hidden = 'hidden',
                All = 'all',
            }

            enum SearchSortingOptions {
                Popularity = "popularity",
                Heat = "heat",
                Trust = "trust",
                Shuffle = "shuffle",
                Random = "random",
                Favorites = "favorites",
                Report_Score = "reportScore",
                Report_Count = "reportCount",
                Publication_Date = "publicationDate",
                Labs_Publication_Date = "labsPublicationDate",
                Created = "created",
                Created_At = "_created_at",
                Updated = "updated",
                Updated_At = "_updated_at",
                Order = "order",
                Relevance = "relevance",
                Magic = "magic",
                Name = "name"
            }

            type LimitedWorld = {
                id: string;
                name: string;
                authorId: string;
                authorName: string;
                releaseStatus: ReleaseStatus;
                capacity: number;
                recommendedCapacity: number;
                imageUrl: string;
                thumbnailImageUrl: string;
                organization: string; // most likely to only be 'vrchat'
                previewYoutubeId?: string;
                udonProducts: unknown[];
                favorites: number;
                popularity: number;
                heat: number;
                publicationDate: Date;
                labsPublicationDate: string;
                occupants: number;
                unityPackages: VRCAPI.Files.Models.UnityPackage[];
                created_at: Date;
                updated_at: Date;
                tags: string[];
            }

            type WorldMetadata = {
                id: string;
                metadata: object;
            }

            type WorldPublishStatus = {
                canPublish: boolean;
            }

            /**
             * Search order options for searching avatars. Enums: VRCAPI.Avatars.Models.SearchOrderOptions
             */
            enum SearchOrderOptions {
                Ascending = "ascending",
                Descending = "descending"
            }
        }
        namespace Requests {

            type BaseSearch = {
                /** The featured status to filter by. */
                featured?: boolean;
                /** The sort order. */
                sort?: Models.SearchSortingOptions;
                /** The maximum amount of results to return. */
                n?: number;
                /** The offset to start from. */
                offset?: number;
                /** The order to sort by. */
                order?: Models.SearchOrderOptions;
                /** The search query. */
                search?: string;
                /** The tag to filter by. */
                tag?: string;
                /** The not tag to filter by. */
                notag?: string;
                /** The release status to filter by. */
                releaseStatus?: VRCAPI.Worlds.Models.ReleaseStatus;
                /** The maximum unity version supported by the asset. */
                maxUnityVersion?: string;
                /** The minimum Unity version supported by the asset. */
                minUnityVersion?: string;
                /** The platform of the avatar. */
                platform?: string;
            }

            /** The data for requesting to search all worlds. */
            type SearchAllWorldsRequest = BaseSearch & {
                user?: 'me';
                /** The user id to filter by. */
                userId?: string;
                /** The developer type to filter by. */
                developer?: VRCAPI.Users.Models.DeveloperType;
            };


            type dataKeysCreateWorld = {
                assetUrl: string;
                assetVersion?: number;
                authorId?: string;
                authorName?: string;
                capacity?: number;
                description?: string;
                id?: string;
                imageUrl: string;
                name: string;
                platform?: string;
                releaseStatus?: VRCAPI.Worlds.Models.ReleaseStatus;
                tags?: string[];
                unityPackageUrl?: string;
                unityVersion?: string;
            };

            /** The data for requesting to create a world. */
            type CreateWorldRequest = dataKeysCreateWorld;

            /** The data for requesting to get a list of active worlds. */
            type ListActiveWorldsRequest = BaseSearch;
            
            /** The data for requesting to get a list of favorited worlds. */
            type ListFavoritedWorldsRequest = BaseSearch & {    
                /** The user id to filter by. **ADMIN ONLY** */
                userId?: string;
            }

            /** The data for requesting to get a list of recent worlds. */
            type ListRecentWorldsRequest = BaseSearch & {
                /** The user id to filter by. **ADMIN ONLY** */
                userId?: string;
            }

            /** The data for requesting to get a world by id. */
            type GetWorldByIdRequest = {
                /** The id of the world to get. */
                worldId: string;
            }

            type dataKeysUpdateWorld = {
                assetUrl?: string;
                assetVersion?: string;
                authorId?: string;
                authorName?: string;
                capacity?: number;
                description?: string;
                imageUrl?: string;
                name?: string;
                platform?: string;
                releaseStatus?: VRCAPI.Worlds.Models.ReleaseStatus;
                tags?: string[];
                unityPackageUrl?: string;
                unityVersion?: string;
            };

            /** The data for requesting to update a world. */
            type UpdateWorldRequest = dataKeysUpdateWorld & {
                /** The id of the world to update.*/
                worldId: string;
            }

            /** The data for requesting to delete a world. */
            type DeleteWorldRequest = {
                /** The id of the world to delete. */
                worldId: string;
            }

            /** The data for requesting to get a world's metadata. */
            type GetWorldMetadataRequest = {
                /** The id of the world to get metadata for. */
                worldId: string;
            }

            /** The data for requesting if the world is currently published. */
            type GetWorldPublishStatusRequest = {
                /** The id of the world to get the publish status for. */
                worldId: string;
            }

            /** The data for requesting to publish a world. */
            type PublishWorldRequest = {
                /** The id of the world to publish. */
                worldId: string;
            }

            /** The data for requesting to Unpublish a world. */
            type UnpublishWorldRequest = {
                /** The id of the world to unpublish. */
                worldId: string;
            }

            /** The data for requesting to get a list of world instances. */
            type GetWorldInstanceRequest = {
                /** The id of the world to get instances for. */
                worldId: string;
                /** The instance id to get the instance. */
                instanceId?: string;
            }

        }
    }
}