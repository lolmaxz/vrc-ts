import { VRCWrapper } from '../VRCWrapper';
import { ApiPaths } from '../types/ApiPaths';
import { VRCRanks, VRCRanksName } from '../types/UsersEnums';
import { BaseApi } from './BaseApi';

export class UsersApi extends BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    async searchAllUsers({
        search,
        // developerType,
        offset,
        quantity,
    }: VRCAPI.Users.Requests.SearchAllUsersOptions): Promise<
        VRCAPI.Users.Models.LimitedUser[]
    > {
        const parameters: URLSearchParams = new URLSearchParams();

        if (quantity) {
            if (quantity > 100 || quantity < 1) {
                throw new Error('Quantity must be between 1 and 100!');
            }
            parameters.append('n', quantity.toString());
        }

        if (offset) {
            if (offset < 0) {
                throw new Error('Offset must be greater than 0!');
            }
            parameters.append('offset', offset.toString());
        }

        if (!search.trim()) {
            throw new Error('No search term was provided!');
        }

        if (search.includes('%')) {
            throw new Error('Search term must not contain any spaces!');
        }

        parameters.append('search', search);

        // parameters.append('developerType', developerType ?? 'none');

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.users.searchAllUsers,
            pathFormated: ApiPaths.users.searchAllUsers.path,
            queryOptions: parameters,
        };

        // console.log(paramRequest);
        

        try {
            this.checkValidData(paramRequest);
            const queryResult = await this.executeRequest<VRCAPI.Users.Models.LimitedUser[]>(paramRequest);

            return queryResult;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Executes a request to get information about a user by their id.
     * @param userId The id of the user to get information about.
     * @returns the information about the user. If the user is not found then it will return undefined.
     */
    async getUserById({ userId }: VRCAPI.Users.Requests.getUserByIdOptions): Promise<VRCAPI.Users.Models.User> {
        if (typeof userId !== 'string') {
            throw new Error('No user id was provided!');
        }
        if (userId.length < 1) {
            throw new Error('Empty User id or no User id were provided!');
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.users.getUserbyID,
            pathFormated: ApiPaths.users.getUserbyID.path.replace('{userId}', userId),
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Users.Models.User>(paramRequest);

        return queryResult;
    }

    /**
     * Get Groups a user is in by their User ID.
     * @param userId The id of the user to get information about.
     * @returns The information about the user. If the user is not found then it will return undefined.
     */
    async getUserGroups({ userId }: VRCAPI.Users.Requests.getUserGroupsByUserIdOptions): Promise<VRCAPI.Groups.Models.Group[]> {

        const parameters: URLSearchParams = new URLSearchParams();

        if (typeof userId !== 'string') {
            throw new Error('No user id was provided!');
        }
        if (userId.length < 1) {
            throw new Error('Empty User id or no User id were provided!');
        }

        parameters.append('userId', userId);

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.users.getUserGroups,
            pathFormated: ApiPaths.users.getUserGroups.path.replace('{userId}', userId),
            queryOptions: parameters,
        };

        this.checkValidData(paramRequest);
        const queryResult = await this.executeRequest<VRCAPI.Groups.Models.Group[]>(paramRequest);

        return queryResult;
    }

}

    /**
     * This function is used to get the rank tag of a user. Returns the highest rank tag of the user. Else returns undefined.
     * @param user The User or CurrentUser object to get the rank tag from.
     * @returns The rank tag of the user. If the user has no rank tag, returns undefined.
     */
    export function getVRCRankTag(user: VRCAPI.Users.Models.User | VRCAPI.Users.Models.CurrentUser): VRCAPI.Users.Models.VRCRanks | undefined {
        // the highest vrcrank we can find in the user's tag is the rank of the user we should return
        const tags: VRCAPI.Generics.AllTags[] = user.tags;
        if (user.tags.includes(VRCRanks.Veteran)) {
            return VRCRanks.Veteran;
        } else if (tags.includes(VRCRanks.Trusted)) {
            return VRCRanks.Trusted;
        } else if (tags.includes(VRCRanks.Known)) {
            return VRCRanks.Known;
        } else if (tags.includes(VRCRanks.User)) {
            return VRCRanks.User;
        } else if (tags.includes(VRCRanks.New)) {
            return VRCRanks.New;
        } else if (!tags.includes(VRCRanks.Veteran) &&
            !tags.includes(VRCRanks.Trusted) &&
            !tags.includes(VRCRanks.Known) &&
            !tags.includes(VRCRanks.User) &&
            !tags.includes(VRCRanks.New) &&
            !tags.includes(VRCRanks.Nuisance)) {

            return VRCRanks.Visitor;
        } else if (tags.includes(VRCRanks.Nuisance)) {
            return VRCRanks.Nuisance;
        } else {
            return undefined;
        }

    }


    /**
     * Get the rank of the user as a string.
     * @param user The User or Current User object to get the rank name from.
     * @returns The rank name of the user. If the user has no rank tag, returns "Rank not found."
     */
    export function getVRCRankName(user: VRCAPI.Users.Models.User | VRCAPI.Users.Models.CurrentUser): string {
        const rank = getVRCRankTag(user);
        if (!rank) {
            return "Rank not found.";
        }
        return VRCRanksName[rank];
    }

    /**
     * Get if User is a VRC+ subscriber.
     * @param user The User object to check if it is a VRChat User with a current VRC+ subscription.
     * @returns `true` if the user is a VRChat User with a current VRC+ subscription, `false` otherwise.
     */
    export function isVRCPlusSubcriber(user: VRCAPI.Users.Models.User): boolean {
        return user.tags.includes("system_supporter");

    }

    /**
     * Get if User has a troll tag.
     * @param user The User object to check if it is a VRChat User with a troll tag.
     * @returns `true` if the user is a VRChat User with a troll tag, `false` otherwise.
     */
    export function isUserTroll(user: VRCAPI.Users.Models.User): boolean {
        return user.tags.includes(VRCRanks.Nuisance) || user.tags.includes("system_probable_troll");
    }

