
import cookiesHandler from './VRCCookie';
import { Color as C } from './colors';
import { CookiesExpired, CookiesNotFound, CookiesUser404, RequestError } from './errors';
import { AuthApi } from './requests/AuthApi';
import { AvatarsApi } from './requests/AvatarsApi';
import { FavoritesApi } from './requests/FavoritesApi';
import { FilesApi } from './requests/FilesApi';
import { FriendsApi } from './requests/FriendsApi';
import { GroupsApi } from './requests/GroupsApi';
import { InstanceApi } from './requests/InstancesApi';
import { InvitesApi } from './requests/InvitesApi';
import { NotificationsApi } from './requests/NotificationsApi';
import { PermissionsApi } from './requests/PermissionsApi';
import { PlayerModerationApi } from './requests/PlayerModerationApi';
import { SystemApi } from './requests/SystemApi';
import { UsersApi } from './requests/UsersApi';
import { WorldsApi } from './requests/WorldsApi';
import { ApiPaths } from './types/ApiPaths';

/**
 * This class is used to authenticate the user and get the current user information.
 * @export
 * @class VRCWrapper
 */
export class VRCWrapper {

  username: string;
  password: string;
  public instanceCookie: cookiesHandler;
  isAuthentificated: boolean;
  static baseDomain: string = 'api.vrchat.cloud';
  public static ApiBaseUrl: string = "https://api.vrchat.cloud/api/1"
  headerAgent: string = process.env.USER_AGENT || "ExampleApp/1.0.0 Email@example.com";
  basePath: string = ApiPaths.apiBasePath;
  cookiesLoaded = false;

  authApi: AuthApi;
  avatarApi: AvatarsApi;
  favoriteApi: FavoritesApi;
  fileApi: FilesApi;
  friendApi: FriendsApi;
  groupApi: GroupsApi;
  instanceApi: InstanceApi;
  inviteApi: InvitesApi;
  notificationApi: NotificationsApi;
  permissionApi: PermissionsApi;
  playermoderationApi: PlayerModerationApi;
  systemApi: SystemApi;
  userApi: UsersApi;
  worldApi: WorldsApi;

  constructor(username?: string, password?: string) {
    if (username) {
      this.username = username;
    } else {
      this.username = process.env.VRCHAT_USERNAME || '';
    }
    if (password) {
      this.password = password;
    } else {
      this.password = process.env.VRCHAT_PASSWORD || '';
    }
    
    this.isAuthentificated = false;
    this.instanceCookie = new cookiesHandler(this.username)
    this.instanceCookie = new cookiesHandler(this.username);
    this.authApi = new AuthApi(this);
    this.avatarApi = new AvatarsApi(this);
    this.favoriteApi = new FavoritesApi(this);
    this.fileApi = new FilesApi(this);
    this.friendApi = new FriendsApi(this);
    this.groupApi = new GroupsApi(this);
    this.instanceApi = new InstanceApi(this);
    this.inviteApi = new InvitesApi(this);
    this.notificationApi = new NotificationsApi(this);
    this.permissionApi = new PermissionsApi(this);
    this.playermoderationApi = new PlayerModerationApi(this);
    this.systemApi = new SystemApi(this);
    this.userApi = new UsersApi(this);
    this.worldApi = new WorldsApi(this);
  }

  async authenticate() {

    if (process.env.USE_COOKIES && process.env.USE_COOKIES === 'true') {
      try {
        await this.instanceCookie.cookiesExist();
        await this.instanceCookie.loadCookies();
        this.cookiesLoaded = true;
      } catch (error) {
        this.cookiesLoaded = false;
        if (error instanceof CookiesExpired) {
          console.error(`${C.yellow} [WARNING]${C.r} - Cookies are expired, a new session will be created.`);
        }
        if (error instanceof CookiesNotFound || error instanceof CookiesUser404) {
          this.cookiesLoaded = false;
        } else if (error instanceof Error) {
          console.error("Error loading cookies: ", error.message);
        } else {
          console.error("Unknown error loading cookies!");
        }
      }
    } else {
      this.instanceCookie = new cookiesHandler(this.username);
    }

    const url: URL = new URL(this.basePath + ApiPaths.auth.getCurrentUserInfo.path);
    const headers: VRCAPI.Generics.headerOptions = {
      'Authorization': `Basic ${this.getBase64Credentials()}`,
      "User-Agent":
        process.env.USER_AGENT || "ExampleApp/1.0.0 Email@example.com",
    };

    if (this.cookiesLoaded) {
      // check if cookies is not expired!
      headers["Cookie"] = `${this.instanceCookie.getAuthCookie()}`;
    }

    const options: RequestInit = {
      method: 'GET',
      headers: headers
    };

    try {

      const response: VRCAPI.Generics.API<VRCAPI.Generics.twoFactorAuthResponseType, VRCAPI.Generics.error2FABase | RequestError> = await fetch(url, { ...options });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

     // we get the set-cookies if there is any (way more optimized solution)
     const cookies = response.headers.getSetCookie();
     if (response.headers.getSetCookie().length > 0) {
         // making sure there is at least one cookie and then adding it to our Cookies Instance and it will be saved in the cookies file.
         await this.instanceCookie.addCookiesFromStrings(cookies);
     }

      

      if ('success' in data) return;

      try {
        this.isAuthentificated = true;
        const getCurrentUser = await this.authApi.getCurrentUser();
        console.log(`${C.green}Logged in as: ${C.r}`, getCurrentUser.username);

      } catch (error) {
        this.isAuthentificated = false;
      }

      if (data.verified) {
        throw new Error("2FA is already verified!");
      }

      // Handle special cases where authentication was not successful
      if (data.requiresTwoFactorAuth) {
        let isVerified = false;
        if (JSON.stringify(data.requiresTwoFactorAuth) === JSON.stringify(["totp", "otp"])) {

          console.log('Handling TOTP or OTP two-factor authentication...');
          try {
            const check2FA = await this.authApi.verify2FACodeTOTP({});
            if (check2FA.verified) isVerified = true;
            console.log("check2FA: ", check2FA);
          } catch (error) {
            console.log("error: ", error);
          }


        } else if (JSON.stringify(data.requiresTwoFactorAuth) === JSON.stringify(['emailOtp'])) {

          console.log('Handling Email OTP two-factor authentication...');
          try {
            const check2FAEmail = await this.authApi.verify2FAEmailCode({});
            if (check2FAEmail.verified) isVerified = true;
          } catch (error) {
            console.log("error: ", error);
          }


        } else {
          // Handle other unknown two-factor authentication methods
          throw new Error('Unknown error while authenticating!');
        }

        if (isVerified) {
          console.log("2FA verified!");
          this.isAuthentificated = true;
        } else {
          console.log("2FA not verified!");
          this.isAuthentificated = false;
        }

      }


    } catch (error) {
      if (error instanceof Error) {
        // check if message is contains 401
        if (error.message.includes("401")) {
          throw new Error("Invalid Username/Email or Password | Missing Credentials");
        }
      } else {
        console.error('Unknown error: ', error);
      }
    }

  }

  // function get the base64 encoded string of the username and password with a semi-colon in between
  getBase64Credentials(): string {
    const encodedUsername = encodeURIComponent(this.username);
    const encodedPassword = encodeURIComponent(this.password);
    const authString = Buffer.from(`${encodedUsername}:${encodedPassword}`).toString('base64');
    return authString;
  }

}