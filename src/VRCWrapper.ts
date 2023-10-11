
import handleTOTP2FA from './2FAhandler';
import cookiesHandler, { VRCCookie } from './VRCCookie';
import { Color as C } from './colors';
import { CookiesExpired, CookiesNotFound, CookiesReadError, CookiesUser404, CookiesWriteError, CurrentUserObjectParseError, RequestError, TOTPRequired } from './errors';
import { AuthApi } from './requests/AuthApi';
import { UsersApi } from './requests/UsersApi';
import { ApiPaths } from './types/ApiPaths';
import { CurrentUserFromJSON, isCurrentUserJSON } from './types/CurrentUser';

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



  constructor(username: string, password: string) {
    // super(username, password);
    this.username = username;
    this.password = password;
    this.isAuthentificated = false;
    this.instanceCookie = new cookiesHandler(this.username)
    this.instanceCookie = new cookiesHandler(this.username);
    this.authApi = new AuthApi(this);
    this.userApi = new UsersApi(this);
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
    const headers: headerOptions = {
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

      const response: API<twoFactorAuthResponseType | RequestSuccess,error2FABase | RequestError> = await fetch(url, { ...options });

      // console.log("Response: ", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      
      // Check if the response contains the Set-Cookie header so we can save them
      if (response.headers.has('set-cookie')) {
        console.log("we have set-cookie");
        
        const cookies = response.headers.get('set-cookie');
        // console.log("cookies: ", cookies);

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
      // console.log("data: ", data);

      if ('success' in data) {
        // ignore here
        return;
      }

      try {

        // console.log("parsing");
        isCurrentUserJSON(data);
        
        this.isAuthentificated = true;

      } catch (error) {
        this.isAuthentificated = false;
        
      }

      if (data.verified) {
        throw new Error("2FA is already verified!");
      }
      // Handle special cases where authentication was not successful
      if (data.requiresTwoFactorAuth) {
        await this.handle2FATypes(data);

      }

      if (this.isAuthentificated) {
        // authentication was successful here! -------------------------------------------------------------

        try {
          isCurrentUserJSON(data) // if passes then it's a CurrentUserJSON
          const currentUserObject = CurrentUserFromJSON(data);
          console.log("Logged in as: ", currentUserObject.username);
          this.isAuthentificated = true;
        } catch (error) {
          if (error instanceof CurrentUserObjectParseError) {
            // error.logError();
            throw new Error(error.message);
          }
          if (error instanceof Error) {
            console.error('Unknown error: ', error);
          } else {
            console.log(`${C.yellow} The data is not a CurrentUserJSON!${C.reset}`);
            this.isAuthentificated = false;
          }
        }

      }


    } catch (error) {
      if (error instanceof TOTPRequired) {
        error.logError();
        // throw new TOTPRequired(error.message);
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

  async handle2FATypes(data: AuthenticationResponse) {
    if (data.requiresTwoFactorAuth) {
    if (JSON.stringify(data.requiresTwoFactorAuth) === JSON.stringify(["totp", "otp"])) {
      // Handle the 'totp' and 'otp' case
      console.log('Handling TOTP or OTP two-factor authentication...');
      // Add your handling code here
      if ((process.env.TOTP_2FA_CODE && process.env.TOTP_2FA_CODE.length > 0) || (process.env.VRCHAT_2FA_SECRET && process.env.VRCHAT_2FA_SECRET.length !== 0)) {
        try {
          const response = await handleTOTP2FA(this.instanceCookie.getAuthCookie());
          // console.log("response: ", response);
          if (response.response.verified) {
            console.log("2FA verified!");
            this.isAuthentificated = true;
            if (response.cookies.length !== 0) {
              // console.log("Cookies: ", response.cookies);
              this.instanceCookie.setCookies(this.instanceCookie.getCookies().concat(response.cookies as VRCCookie[]));
              // console.log("Old Cookies: ", this.instanceCookie.getCookies());
              // console.log("New Cookies that will be saved for '" + this.username + "' : ", this.instanceCookie.getCookies());
              await this.instanceCookie.saveCookies();
            }
          } else {
            console.log("2FA not verified!");
            this.isAuthentificated = false;
          }

        } catch (error) {
          console.log("catch?");

          if (error instanceof RequestError) {
            // Error with the request
            throw new RequestError(error.statusCode, error.message);
          }
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("Unknown error checking 2FA!");
          }
        };
      } else {
        throw new TOTPRequired("TOTP 2FA code is missing from .env file!");
      }


    } else if (JSON.stringify(data.requiresTwoFactorAuth) === JSON.stringify(['emailOtp'])) {
      // Handle the 'emailOtp' case
      console.log('Handling Email OTP two-factor authentication...');
      // Add your handling code here
    } else {
      // Handle other unknown two-factor authentication methods
      throw new Error('Unknown error while authenticating!');
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