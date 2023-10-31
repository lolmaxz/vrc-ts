declare namespace VRCAPI {
    namespace Worlds {
        namespace Models {

            type World = {
                authorId: string;
                authorName: string; // Min 1 chars
                capacity: number; // integer
                recommendedCapacity: number; // integer
                created_at: string; // date-time
                description: string; // Min 0 chars
                favorites?: number; // Min 0, Default: 0
                featured: boolean; // Default: false
                heat: number; // Min 0, Default: 0
                id: string;
                imageUrl: string; // Min 1 chars
                instances?: VRCAPI.Instances.Models.Instance[]; // Will always be an empty list when unauthenticated.
                labsPublicationDate: string; // Min 1 chars
                name: string; // Min 1 chars
                namespace: string;
                occupants?: number; // Min 0, Default: 0, Will always be 0 when unauthenticated.
                organization: string; // Min 1 chars, Default: vrchat
                popularity: number; // Min 0, Default: 0
                previewYoutubeId?: string | null;
                privateOccupants?: number; // Min 0, Default: 0, Will always be 0 when unauthenticated.
                publicOccupants?: number; // Min 0, Default: 0, Will always be 0 when unauthenticated.
                publicationDate: string; // Min 1 chars
                releaseStatus: 'public' | 'private' | 'hidden' | 'all'; // Enum: ReleaseStatus, Default: public
                tags: string[]; // Array of strings
                thumbnailImageUrl: string; // Min 1 chars
                unityPackages?: VRCAPI.Files.Models.UnityPackage[]; // Empty if unauthenticated.
                updated_at: string; // date-time
                version: number; // Min 0, Default: 0
                visits: number; // Min 0, Default: 0
            };

            enum ReleaseStatus {
                Public = 'public',
                Private = 'private',
                Hidden = 'hidden',
                All = 'all',
              }
        }
        namespace Requests {

        }
    }
}