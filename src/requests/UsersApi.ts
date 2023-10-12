import { VRCWrapper } from '../VRCWrapper';
import { ApiPaths } from '../types/ApiPaths';
import { BaseApi } from './BaseApi';

export class UsersApi extends BaseApi {
  baseClass: VRCWrapper;

  constructor(baseClass: VRCWrapper) {
    super(baseClass);
    this.baseClass = baseClass;
  }

  async searchAllUsers({
    search,
    developerType,
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

    parameters.append('search', search);

    parameters.append('developerType', developerType ?? 'none');

    this.setCurrentRequest(ApiPaths.users.searchAllUsers);
    try {
      const queryResult = await this.executeRequest<LimitedUser[]>(parameters);

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
  async getUserById(userId: string): Promise<User> {
    if (typeof userId !== 'string') {
      throw new Error('No user id was provided!');
    }
    if (!isMinLength(userId, 1)) {
      throw new Error('No user id was provided!');
    }

    this.setCurrentRequest(ApiPaths.users.getUserbyID);

    const queryResult = await this.executeRequest<User>();

    return queryResult;
  }

  /**
   * Get Groups a user is in by their User ID.
   * @param userId The id of the user to get information about.
   * @returns The information about the user. If the user is not found then it will return undefined.
   */
  async getUserGroups(userId: string) {
    if (typeof userId !== 'string') {
      throw new Error('No user id was provided!');
    }
    if (!isMinLength(userId, 1)) {
      throw new Error('No user id was provided!');
    }

    this.setCurrentRequest(ApiPaths.users.getUserGroups);
    const queryParams: QueryParamsList = [];

    queryParams.push({
      name: 'userId',
      value: userId,
    });
    this.setQueryParameters(queryParams);

    try {
      const queryResult = await this.executeRequest<Group[]>();
      console.log('result:', queryResult);

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
