import { VRChatAPI } from '../VRChatAPI';
import { ApiPaths } from '../types/ApiPaths';
import { BaseApi } from './BaseApi';
import * as Perm from '../types/Permissions';
import { executeRequestType } from '../types/Generics';

/**
 * This class is used to make requests to the Permissions API.
 */
export class PermissionsApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    /**
     * Returns a list of all permissions currently granted by the user. Permissions are assigned e.g. by subscribing to VRC+.
     */
    public async getAssignedPermissions(): Promise<Perm.Permission[]> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.permissions.getAssignedPermissions,
            pathFormated: ApiPaths.permissions.getAssignedPermissions.path,
        };

        return await this.executeRequest<Perm.Permission[]>(paramRequest);
    }

    /**
     * Returns a single permission. This endpoint is pretty useless, as it returns the exact same information as `/auth/permissions`.
     */
    public async getPermission({ permissionId }: Perm.GetPermissionRequest): Promise<Perm.Permission> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.permissions.getPermission,
            pathFormated: ApiPaths.permissions.getPermission.path.replace('{permissionId}', permissionId),
        };

        return await this.executeRequest<Perm.Permission>(paramRequest);
    }
}
