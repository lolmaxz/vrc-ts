
import cookiesHandler from './VRCCookie';
import { Color as C } from './colors';
import { CookiesExpired, CookiesNotFound, CookiesReadError, CookiesUser404, CookiesWriteError, RequestError, TOTPRequired } from './errors';
import { AuthApi } from './requests/AuthApi';
import { GroupsApi } from './requests/GroupsApi';
import { UsersApi } from './requests/UsersApi';
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
  basePath: string = ApiPaths.api.base.path;

  cookiesLoaded = false;

  authApi: AuthApi;
  userApi: UsersApi;
  groupApi: GroupsApi;



  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.isAuthentificated = false;
    this.instanceCookie = new cookiesHandler(this.username)
    this.instanceCookie = new cookiesHandler(this.username);
    this.authApi = new AuthApi(this);
    this.userApi = new UsersApi(this);
    this.groupApi = new GroupsApi(this);
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

    const url: URL = new URL(ApiPaths.api.base.path + ApiPaths.auth.getCurrentUserInfo.path);
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

      const response: VRCAPI.Generics.API<VRCAPI.Generics.twoFactorAuthResponseType | VRCAPI.Generics.RequestSuccess, VRCAPI.Generics.error2FABase | RequestError> = await fetch(url, { ...options });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }


      // Check if the response contains the Set-Cookie header so we can save them
      if (response.headers.has('set-cookie')) {
        console.log("we have set-cookie");

        const cookies = response.headers.get('set-cookie');

        // Parse the cookie string into a list of cookies
        if (cookies === null) throw new Error('No cookies were set.');

        await this.instanceCookie.parseCookieString(cookies, VRCWrapper.baseDomain);

        // We save cookies if the user wants to keep them
        if (process.env.USE_COOKIES === "true") {
          try {
            console.log("saving cookies");

            await this.instanceCookie.saveCookies();
          } catch (error) {
            console.log("error saving cookies");

            console.log("error: ", error);

            if (error instanceof CookiesWriteError) {
              throw new CookiesWriteError(`Error writing cookies.` + error.message);
            } else if (error instanceof CookiesReadError) {
              throw new CookiesReadError(`Error reading cookies.` + error.message);
            } else if (error instanceof Error) {
              throw new Error(`Unknown error writing cookies: ` + error.message);
            }
          }
        }

      }

      const data = await response.json();

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
      if (error instanceof TOTPRequired) {
        error.logError();
      }

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