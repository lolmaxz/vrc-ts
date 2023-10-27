declare namespace VRCAPI {
    namespace Avatars {
        namespace Models {
            type Avatar = { // todo: implement
                assetUrl?: string;
                assetUrlObject?: unknown; // Object has unknown usage/fields
                authorId: string;
                authorName: string;
                created_at: Date;
                description: string;
                featured: boolean;
                id: string;
                imageUrl: string;
                name: string;
                releaseStatus: 'public' | 'private' | 'hidden' | 'all';
                tags: string[]; // Assuming tags are strings based on the description
                thumbnailImageUrl: string;
                unityPackageUrl?: string;
                unityPackageUrlObject?: {
                    unityPackageUrl: string;
                };
                unityPackages: {
                    assetUrl: string;
                    assetUrlObject?: unknown; // Object has unknown usage/fields
                    assetVersion: number;
                    created_at: Date;
                    id: string;
                    platform: string;
                    pluginUrl?: string;
                    pluginUrlObject?: unknown; // Object has unknown usage/fields
                    unitySortNumber?: number;
                    unityVersion: string;
                }[];
                updated_at: Date;
                version: number;
            };
            
        }
    }
}