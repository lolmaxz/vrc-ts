import { VRChatAPI } from "../VRChatAPI";
import { BaseApi } from "./BaseApi";

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
    public async listFiles() {

    }
    
    /**
     * Creates a new File object
     */
    public async createFile() {

    }
    
    /**
     * Shows general information about the "File" object. Each File can have several "Version"'s, and each Version can have multiple real files or "Data" blobs.
     */
    public async showFile() {

    }
    
    /**
     * Creates a new FileVersion. Once a Version has been created, proceed to the `/file/{fileId}/{versionId}/file/start` endpoint to start a file upload.
     */
    public async createFileVersion() {

    }
    
    /**
     * Deletes a File object.
     */
    public async deleteFile() {

    }
    
    /**
    * Downloads the file with the provided version number.
    *
    * **Version Note:** Version 0 is always when the file was created. The real data is usually always located in version 1 and up.
    *
    * **Extension Note:** Files are not guaranteed to have a file extensions. UnityPackage files tends to have it, images through this endpoint do not. You are responsible for appending file extension from the `extension` field when neccesary.
    */
    public async downloadFileVersion() {

    }
    
    /**
     * Delete a specific version of a file. You can only delete the latest version.
     */
    public async deleteFileVersion() {

    }
    
    /**
     * Finish an upload of a FileData. This will mark it as "complete". After uploading the `file` for Avatars and Worlds you then have to upload a `signature` file.
     */
    public async finishFileDataUpload() {

    }
    
    /**
    * Starts an upload of a specific FilePart. This endpoint will return an AWS URL which you can PUT data to. You need to call this and receive a new AWS API URL for each `partNumber`. Please see AWS's REST documentation on "PUT Object to S3" on how to upload. Once all parts has been uploaded, proceed to `/finish endpoint`.

    * **Note:** `nextPartNumber` seems like it is always ignored. Despite it returning 0, first partNumber is always 1.
     */
    public async startFileDataUpload() {

    }
    
    /**
     * Retrieves the upload status for file upload. Can currently only be accessed when `status` is `waiting`. Trying to access it on a file version already uploaded currently times out.
     */
    public async checkFileDataUploadStatus() {

    }
}