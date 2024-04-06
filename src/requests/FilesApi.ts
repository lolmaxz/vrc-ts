import { VRChatAPI } from '../VRChatAPI';
import { ApiPaths } from '../types/ApiPaths';
import { BaseApi } from './BaseApi';
import * as File from '../types/Files';
import { RequestSuccess, executeRequestType } from '../types/Generics';

/**
 * This class is used to make requests to the Files API.
 */
export class FilesApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    /**
     * Returns a list of files
     */
    public async listFiles({ tag, n, offset }: File.ListFilesRequest): Promise<File.File[]> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (tag) {
            if (tag.length < 1) throw new Error('Tag must be at least 1 character long!');
            parameters.append('tag', tag);
        }

        if (n) {
            if (n > 100 || n < 1) throw new Error('Quantity must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset) {
            if (offset < 0) throw new Error('Offset must be greater than 0!');
            parameters.append('offset', offset.toString());
        }

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.files.listFiles,
            pathFormated: ApiPaths.files.listFiles.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<File.File[]>(paramRequest);
    }

    /**
     * Creates a new File object
     */
    public async createFile({ name, mimeType, extension, tags }: File.CreateFileRequest): Promise<File.File> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (name) {
            if (name.length < 1) throw new Error('Name must be at least 1 character long!');
            parameters.append('name', name);
        }

        if (mimeType.length < 1) throw new Error('MimeType must be at least 1 character long!');
        parameters.append('mimeType', mimeType);

        if (extension) {
            if (extension.length < 1) throw new Error('Extension must be at least 1 character long!');
            parameters.append('extension', extension);
        }

        if (tags) {
            if (tags.length < 1) throw new Error('Tags must be at least 1 character long!');
            parameters.append('tags', tags.toString());
        }

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.files.createFile,
            pathFormated: ApiPaths.files.createFile.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<File.File>(paramRequest);
    }

    /**
     * Shows general information about the "File" object. Each File can have several "Version"'s, and each Version can have multiple real files or "Data" blobs.
     */
    public async showFile({ fileId }: File.ShowFileRequest): Promise<File.File> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.files.showFile,
            pathFormated: ApiPaths.files.showFile.path.replace('{fileId}', fileId),
        };

        return await this.executeRequest<File.File>(paramRequest);
    }

    /**
     * Creates a new FileVersion. Once a Version has been created, proceed to the `/file/{fileId}/{versionId}/file/start` endpoint to start a file upload.
     */
    public async createFileVersion({
        fileId,
        signatureMd5,
        signatureSizeInBytes,
        fileMd5,
        fileSizeInBytes,
    }: File.CreateFileVersionRequest): Promise<File.File> {
        const parameters: URLSearchParams = new URLSearchParams();

        if (signatureMd5.length < 1) throw new Error('SignatureMd5 must be at least 1 character long!');
        parameters.append('signatureMd5', signatureMd5);

        if (signatureSizeInBytes < 1) throw new Error('SignatureSizeInBytes must be at least 1 character long!');
        parameters.append('signatureSizeInBytes', signatureSizeInBytes.toString());

        if (fileMd5) {
            if (fileMd5.length < 1) throw new Error('FileMd5 must be at least 1 character long!');
            parameters.append('fileMd5', fileMd5);
        }

        if (fileSizeInBytes) {
            if (fileSizeInBytes < 1) throw new Error('FileSizeInBytes must be at least 1 character long!');
            parameters.append('fileSizeInBytes', fileSizeInBytes.toString());
        }

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.files.createFileVersion,
            pathFormated: ApiPaths.files.createFileVersion.path.replace('{fileId}', fileId),
            queryOptions: parameters,
        };

        return await this.executeRequest<File.File>(paramRequest);
    }

    /**
     * Deletes a File object.
     */
    public async deleteFile({ fileId }: File.FileId): Promise<RequestSuccess> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.files.deleteFile,
            pathFormated: ApiPaths.files.deleteFile.path.replace('{fileId}', fileId),
        };

        return await this.executeRequest<RequestSuccess>(paramRequest);
    }

    /**
     * Downloads the file with the provided version number.
     *
     * **Version Note:** Version 0 is always when the file was created. The real data is usually always located in version 1 and up.
     *
     * **Extension Note:** Files are not guaranteed to have a file extensions. UnityPackage files tends to have it, images through this endpoint do not. You are responsible for appending file extension from the `extension` field when neccesary.
     */
    public async downloadFileVersion({ fileId, versionId }: File.DownloadFileVersionRequest): Promise<File.File> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.files.downloadFileVersion,
            pathFormated: ApiPaths.files.downloadFileVersion.path
                .replace('{fileId}', fileId)
                .replace('{versionId}', versionId),
        };

        return await this.executeRequest<File.File>(paramRequest);
    }

    /**
     * Delete a specific version of a file. You can only delete the latest version.
     */
    public async deleteFileVersion({ fileId, versionId }: File.DownloadFileVersionRequest): Promise<RequestSuccess> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.files.deleteFileVersion,
            pathFormated: ApiPaths.files.deleteFileVersion.path
                .replace('{fileId}', fileId)
                .replace('{versionId}', versionId),
        };

        return await this.executeRequest<RequestSuccess>(paramRequest);
    }

    /**
     * Finish an upload of a FileData. This will mark it as "complete". After uploading the `file` for Avatars and Worlds you then have to upload a `signature` file.
     */
    public async finishFileDataUpload({
        fileId,
        versionId,
        fileType,
        etags,
    }: File.FinishFileDataUploadRequest): Promise<File.File> {
        const body: File.dataKeysFinishFileDataUpload = {
            etags,
            nextPartNumber: '0',
            maxParts: '0',
        };

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.files.finishFileDataUpload,
            pathFormated: ApiPaths.files.finishFileDataUpload.path
                .replace('{fileId}', fileId)
                .replace('{versionId}', versionId)
                .replace('{fileType}', fileType),
            body,
        };

        return await this.executeRequest<File.File>(paramRequest);
    }

    /**
    * Starts an upload of a specific FilePart. This endpoint will return an AWS URL which you can PUT data to. You need to call this and receive a new AWS API URL for each `partNumber`. Please see AWS's REST documentation on "PUT Object to S3" on how to upload. Once all parts has been uploaded, proceed to `/finish endpoint`.

    * **Note:** `nextPartNumber` seems like it is always ignored. Despite it returning 0, first partNumber is always 1.
     */
    public async startFileDataUpload({
        fileId,
        versionId,
        fileType,
    }: File.StartFileDataUploadRequest): Promise<File.File> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.files.startFileDataUpload,
            pathFormated: ApiPaths.files.startFileDataUpload.path
                .replace('{fileId}', fileId)
                .replace('{versionId}', versionId)
                .replace('fileType', fileType),
        };

        return await this.executeRequest<File.File>(paramRequest);
    }

    /**
     * Retrieves the upload status for file upload. Can currently only be accessed when `status` is `waiting`. Trying to access it on a file version already uploaded currently times out.
     */
    public async checkFileDataUploadStatus({
        fileId,
        versionId,
        fileType,
    }: File.CheckFileDataUploadStatus): Promise<File.CurrentFileVersionStatus> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.files.checkFileDataUploadStatus,
            pathFormated: ApiPaths.files.checkFileDataUploadStatus.path
                .replace('{fileId}', fileId)
                .replace('{versionId}', versionId)
                .replace('{fileType}', fileType),
        };

        return await this.executeRequest<File.CurrentFileVersionStatus>(paramRequest);
    }
}
