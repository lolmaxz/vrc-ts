import { VRCWrapper } from "../VRCWrapper";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the Permissions API.
 */
export class PermissionsApi extends BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    
    /**
     * Returns a list of all permissions currently granted by the user. Permissions are assigned e.g. by subscribing to VRC+.
     */
    public async getAssignedPermissions() {

    }
    
    /**
     * Returns a single permission. This endpoint is pretty useless, as it returns the exact same information as `/auth/permissions`.
     */
    public async getPermission() {

    }
}