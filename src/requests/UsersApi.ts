import { isMin, isMinLength, isbetweenValues } from "../CheckingTools";
import { VRCWrapper } from "../VRCWrapper";
import { ApiPaths } from "../types/ApiPaths";
import { Group, GroupFromJSON } from "../types/Group";
import { LimitedUser, LimitedUserFromJSON } from "../types/LimitedUsers";
import { User, UserFromJSON } from "../types/User";
import { BaseApi } from "./BaseApi";


export class UsersApi extends BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    /**
     * Search and list any users by text query
     * @param searchQuery `MIN LENGTH: 1`
     * @param howMany `MIN: 1` - `MAX: 100`
     * @param offsetSearch `MIN: 0`
     * @param developerType `none` or `internal`
     * @returns 
     */
    async searchAllUsers(searchQuery: string, howMany: number = 60, offsetSearch?: number, developerType?: "none" | "internal") {
        // error checking
        const errorList = [];
        if (!isMinLength(searchQuery, 1)) {
            errorList.push("No search query was provided or Query is empty!");
        }
        if (!isbetweenValues(howMany, 1, 100)) {
            errorList.push("How many users to search for must be between 1 and 100!");
        }
        if (offsetSearch && !isMin(offsetSearch, 0)) {
            errorList.push("Offset must be at least 0!");
        }
        if (errorList.length > 0) {
            throw new Error(errorList.join("\n"));
        }

        let parameters = "sort=relevance&search=" + searchQuery;
        if (developerType) {
            parameters += `&developerType=${developerType}`;
        }

        parameters += `&n=${howMany}`;

        if (offsetSearch) {
            parameters += `&offset=${offsetSearch}`;
        }


        console.log(parameters);

        this.setCurrentRequest(ApiPaths.users.searchAllUsers);
        try {
            const queryResult = await this.executeRequest<LimitedUser[]>(parameters);
            console.log("result:", queryResult);


            

            const resultToReturn: LimitedUser[] = [];
            queryResult.forEach((user) => {
                // console.log("User:", user);
                // isLimitedUserJSON(user);
                resultToReturn.push(LimitedUserFromJSON(user));
            });

            return resultToReturn;
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
    async getUserById(userId: string): Promise<User|undefined> {
        if (typeof userId !== 'string') {
            throw new Error("No user id was provided!");
        }
        if (!isMinLength(userId, 1)) {
            throw new Error("No user id was provided!");
        }

        this.setCurrentRequest(ApiPaths.users.getUserbyID);
        this.setQueryParameters([{name: "userId",value: userId}]);

        try {
            const queryResult = await this.executeRequest<User>();
            const UserObject = UserFromJSON(queryResult);
            return UserObject;
        } catch (error) {
            console.log(error);
            return undefined; // we don't want the code to just stop but errors will be throw in console before this point!
        }
    }

    /**
     * Get Groups a user is in by their User ID.
     * @param userId The id of the user to get information about.
     * @returns The information about the user. If the user is not found then it will return undefined.
     */
    async getUserGroups(userId: string) {
        if (typeof userId !== 'string') {
            throw new Error("No user id was provided!");
        }
        if (!isMinLength(userId, 1)) {
            throw new Error("No user id was provided!");
        }

        this.setCurrentRequest(ApiPaths.users.getUserGroups);
        const queryParams:QueryParamsList  = [];

        queryParams.push({
            name: "userId",
            value: userId
        })
        this.setQueryParameters(queryParams);

        try {
            const queryResult = await this.executeRequest<Group[]>();
            console.log("result:", queryResult);

            const resultToReturnUserGroups: Group[] = [];
            queryResult.forEach((user) => {
                resultToReturnUserGroups.push(GroupFromJSON(user));
            });

            return resultToReturnUserGroups;
        } catch (error) {
            console.log(error);
            return undefined; // we don't want the code to just stop but errors will be throw in console before this point!
        }
    }

}