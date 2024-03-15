import { VRChatAPI } from '../VRChatAPI';
import { ApiPaths } from '../types/ApiPaths';
import { VRCRanks, VRCRanksName } from '../types/UsersEnums';
import { BaseApi } from './BaseApi';

export class UsersApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    async searchAllUsers({
        search,
        offset,
        n,
    }: VRCAPI.Users.Requests.SearchAllUsersRequest): Promise<
        VRCAPI.Users.Models.LimitedUser[]
    > {

        const parameters: URLSearchParams = new URLSearchParams();

        if (n) {
            if (n > 100 || n < 1) throw new Error('Quantity must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset) {
            if (offset < 0) throw new Error('Offset must be greater than 0!');
            parameters.append('offset', offset.toString());
        }

        if (!search.trim()) throw new Error('No search term was provided!');
        if (search.includes('%')) throw new Error('Search term must not contain any spaces!');

        parameters.append('search', search);

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.users.searchAllUsers,
            pathFormated: ApiPaths.users.searchAllUsers.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<VRCAPI.Users.Models.LimitedUser[]>(paramRequest);
    }

    /**
     * Executes a request to get information about a user by their id.
     * @param userId The id of the user to get information about.
     * @returns the information about the user. If the user is not found then it will return undefined.
     */
    async getUserById({ userId }: VRCAPI.Users.Requests.getUserByIdRequest): Promise<VRCAPI.Users.Models.User> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.users.getUserbyID,
            pathFormated: ApiPaths.users.getUserbyID.path.replace('{userId}', userId),
        };

        return await this.executeRequest<VRCAPI.Users.Models.User>(paramRequest);
    }

    /**
     * Update a users information such as the email and birthday.
     */
    public async updateUserInfo({
        userId,
        email,
        birthday,
        acceptedTOSVersion,
        tags,
        status,
        statusDescription,
        bio,
        bioLinks,
        userIcon
    }: VRCAPI.Users.Requests.updateUserByIdRequest): Promise<VRCAPI.Users.Models.CurrentUser> {

        const body: VRCAPI.Users.Requests.dataKeysUpdateUser = {};

        if (email) body.email = email;
        if (birthday) body.birthday = birthday;
        if (acceptedTOSVersion) body.acceptedTOSVersion = acceptedTOSVersion;
        if (tags) body.tags = tags;
        if (status) body.status = status;
        if (bioLinks) body.bioLinks = bioLinks;
        if (userIcon) body.userIcon = userIcon;

        if (statusDescription) {
            if (statusDescription.length > 32) throw new Error('Status description must be 32 characters or less!');
            body.statusDescription = statusDescription;
        }

        if (bio) {
            if (bio.length > 512) throw new Error('Bio must be 512 characters or less!');
            body.bio = bio;
        }


        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.users.updateUserInfo,
            pathFormated: ApiPaths.users.updateUserInfo.path.replace('{userId}', userId),
            body: body
        };

        return await this.executeRequest<VRCAPI.Users.Models.CurrentUser>(paramRequest);
    }

    /**
     * Get Groups a user is in by their User ID.
     * @param userId The id of the user to get information about.
     * @returns The information about the user. If the user is not found then it will return undefined.
     */
    async getUserGroups({ userId }: VRCAPI.Users.Requests.getUserGroupsByUserIdRequest): Promise<VRCAPI.Groups.Models.Group[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.users.getUserGroups,
            pathFormated: ApiPaths.users.getUserGroups.path.replace('{userId}', userId)
        };

        return await this.executeRequest<VRCAPI.Groups.Models.Group[]>(paramRequest);
    }

    /**
     * Returns a list of Groups the user has requested to be invited into.
     */
    public async getUserGroupRequests({ userId }: VRCAPI.Users.Requests.getUserGroupRequestsOptions): Promise<VRCAPI.Groups.Models.Group[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.users.getUserGroupRequests,
            pathFormated: ApiPaths.users.getUserGroupRequests.path.replace('{userId}', userId),
        };

        return await this.executeRequest<VRCAPI.Groups.Models.Group[]>(paramRequest);
    }

    /**
     * Return a RepresentedGroup object for the user's current group that they are representing.
     */
    public async getUserRepresentedGroup({ userId }: VRCAPI.Users.Requests.getUserRepresentedGroupOptions): Promise<VRCAPI.Groups.Models.RepresentedGroup> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.users.getUserRepresentedGroup,
            pathFormated: ApiPaths.users.getUserRepresentedGroup.path.replace('{userId}', userId),
        };

        return await this.executeRequest<VRCAPI.Groups.Models.RepresentedGroup>(paramRequest);
    }
}

export type VRCRankResult = {
    isTroll: boolean;
    rank: VRCRanks;
    rankName: string;
}

/**
 * This function is used to get the rank tag and tag name of a User/current User. Returns the highest rank tag of the user found.
 * @param user The User or CurrentUser object to get the rank tag from.
 * @returns {VRCRankResult} An object with the rank tag, the rank name and if the user is a troll. If the user has no rank tag, the rank will be set to Visitor.
 * 
 * *Complete rewrite of this part, now way more optimized.*
 */
export function getVRCRankTags(user: VRCAPI.Users.Models.User | VRCAPI.Users.Models.CurrentUser): VRCRankResult {
    // the highest vrcrank we can find in the user's tag is the rank of the user we should return
    // Determine if the user is a troll
    const isTroll = user.tags.includes(VRCRanks.Nuisance) || user.tags.includes("system_probable_troll");

    // Determine the user's rank
    let rank = VRCRanks.Visitor; // Default to Visitor if no other rank is found
    for (const key in VRCRanks) {
        if (user.tags.includes(VRCRanks[key as keyof typeof VRCRanks] as VRCAPI.Generics.AllTags)) {
            rank = VRCRanks[key as keyof typeof VRCRanks];
            break;
        }
    }

    return {
        isTroll,
        rank,
        rankName: VRCRanksName[rank],
    };
}

/**
 * Get if User is a VRC+ subscriber.
 * @param user The User object to check if it is a VRChat User with a current VRC+ subscription.
 * @returns `true` if the user is a VRChat User with a current VRC+ subscription, `false` otherwise.
 */
export function isVRCPlusSubcriber(user: VRCAPI.Users.Models.User): boolean {
    return user.tags.includes("system_supporter");
}

