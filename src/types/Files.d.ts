declare namespace VRCAPI {
    namespace Files {
        namespace Models {
            type UnityPackage = {
                id: string; // Pattern: (unp)_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}
                unityVersion: string; // Min 1 chars, Default: 5.3.4p1
                assetVersion: number; // Min 0
                platform: string; // Can be various values like standalonewindows, android, or specific Unity versions
                assetUrl?: string; // Min 1 chars
                assetUrlObject?: object;
                created_at?: string; // date-time
                pluginUrl?: string;
                pluginUrlObject?: object;
                unitySortNumber?: number; // Min 0
            };

            type UnityPackageAvatar = {
                id: string; // Pattern: (unp)_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}
                unityVersion: string; // Min 1 chars, Default: 5.3.4p1
                unitySortNumber?: number; // Min 0
                assetVersion: number; // Min 0
                platform: string; // Can be various values like standalonewindows, android, or specific Unity versions
                assetUrl?: string; // Min 1 chars
                assetUrlObject?: object;
                created_at?: string; // date-time
                variant?: string;
                pluginUrl?: string;
                pluginUrlObject?: object;
            }

            type File = { // todo: implement
                extension: string;
                id: string;
                mimeType: 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/webp' | 'image/gif' | 'image/bmp' | 'image/svg+xml' | 'image/tiff' | 'application/x-avatar' | 'application/x-world' | 'application/gzip' | 'application/x-rsync-signature' | 'application/x-rsync-delta' | 'application/octet-stream';
                name: string;
                ownerId: string;
                tags: string[]; // Assuming tags are strings based on the description
                versions: {
                    created_at: Date;
                    deleted?: boolean;
                    delta: FileData;
                    file: FileData;
                    signature: FileData;
                    status: 'waiting' | 'complete' | 'none' | 'queued';
                    version: number;
                }[];
            };
            
            type FileData = {
                category: 'multipart' | 'queued' | 'simple';
                fileName: string;
                md5: string;
                sizeInBytes: number;
                status: 'waiting' | 'complete' | 'none' | 'queued';
                uploadId: string;
                url: string;
            };
            

        }
        namespace Requests {

        }
    }
}