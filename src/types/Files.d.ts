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
                impostorUrl?: string; // ! to test
                scanStatus?: string; // ! to test
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

            type CurrentFileVersionStatus = {
                uploadId: string;
                fileName: string;
                nextPartNumber: number;
                nextParts: number;
                parts: object[];
                etags: object[];
            }

            enum MIMEType {
                JPEG = 'image/jpeg',
                JPG = 'image/jpg',
                PNG = 'image/png',
                WEBP = 'image/webp',
                GIF = 'image/gif',
                BMP = 'image/bmp',
                SVG_XML = 'image/svg+xml',
                TIFF = 'image/tiff',
                AVATAR = 'application/x-avatar',
                WORLD = 'application/x-world',
                GZIP = 'application/gzip',
                RSYNC_SIGNATURE = 'application/x-rsync-signature',
                RSYNC_DELTA = 'application/x-rsync-delta',
                OCTET_STREAM = 'application/octet-stream'
            }

            enum fileType {
                File = "file",
                Signature = "signature",
                Delta = "delta"
            }


        }
        namespace Requests {

            /** Information required to request a list of files. */
            type ListFilesRequest = {
                /** Min 1 chars. Tag, for example "icon" or "gallery", not included by default. */
                tag?: string
                /** quantity to retrieve. Default 60. */
                n?: number
                /** offset to start from. Default 0. */
                offset?: number
            }

            type dataKeysCreateFile = {
                /** Name of the file. Min 0 chars */
                name: string;
                /** MIME type of the file. */
                mimeType: VRCAPI.Files.Models.MIMEType;
                /** Extension of the file. Min 1 chars */
                extension: string;
                /** Tags for the file */
                tags?: VRCAPI.Generics.AllTags[];
            };

            /** The data for requesting to create a file */
            type CreateFileRequest = dataKeysCreateFile;

            type FileId = {
                /** The Id of the file you want to use with this request.*/
                fileId: string;
            }

            /** The data for requesting to show a file */
            type ShowFileRequest = FileId;

            type dataKeysCreateFileVersion = {
                signatureMd5: string;
                signatureSizeInBytes: number;
                fileMd5?: string;
                fileSizeInBytes?: number;
            };

            /** The data for requesting to create a file version */
            type CreateFileVersionRequest = FileId & dataKeysCreateFileVersion;

            type VersionId = {
                /** The Id of the version you want to use with this request.*/
                versionId: string;
            }

            /** The data required to request to delete a file */
            type DeleteFileRequest = FileId;

            /** The data for requesting to show a file version */
            type DownloadFileVersionRequest = FileId & VersionId;

            type dataKeysFinishFileDataUpload = {
                etags?: [string, string];
                /** Always a zero in string form, despite how many parts uploaded. */
                nextPartNumber: '0';
                /** Always a zero in string form, despite how many parts uploaded. */
                maxParts: '0';
            };

            /** The data for requesting to delete a file version */
            type DeleteFileVersionRequest = FileId & VersionId;

            /** The data for requesting to finish a file data upload */
            type FinishFileDataUploadRequest = dataKeysFinishFileDataUpload & FileId & VersionId & {
                /** The fileType you want to upload. */
                fileType: Models.fileType;
            }

            /** The data for requesting to start a file data upload */
            type StartFileDataUploadRequest = FileId & VersionId & {
                /** The fileType you want to upload. */
                fileType: Models.fileType;
            }

            /** The data for requesting to check the file data upload status */
            type CheckFileDataUploadStatus = FileId & VersionId & {
                /** The fileType of the file you want to check. */
                fileType: Models.fileType;
            }


        }
    }
}