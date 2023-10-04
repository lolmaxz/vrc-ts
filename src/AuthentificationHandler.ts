
import handleTOTP2FA from './2FAhandler';
import { BaseVRChatWrapper } from './BaseVRChatWrapper';
import cookiesHandler, { VRCCookie } from './VRCCookie';
import { Color as C } from './colors';
import { CookiesExpired, CookiesLoadError, CookiesNotFound, CookiesReadError, CookiesUser404, CookiesWriteError, CurrentUserObjectParseError, RequestError, TOTPRequired } from './errors';
import { ApiPaths } from './types/ApiPaths';
import { CurrentUserFromJSON, isCurrentUserJSON, CurrentUser } from './types/CurrentUser';

/**
 * This class is used to authenticate the user and get the current user information.
 * @export
 * @class VRCWrapper
 * @extends {BaseVRChatWrapper}
 */
export class VRCWrapper extends BaseVRChatWrapper {
  cookiesLoaded = false;

  constructor(username: string, password: string) {
    super(username, password);
    this.instanceCookie = new cookiesHandler(this.username);
  }

  async authenticate() {

    if (process.env.USE_COOKIES === 'true') {
      try {
        const exist = await this.instanceCookie.cookiesExist();
        if (exist) {
         await this.loadCookies();
        }
      } catch (error) {
        if (error instanceof CookiesNotFound || error instanceof CookiesUser404) {
          console.error(error.message);
        } else if (error instanceof Error) {
          console.error("Error loading cookies: ", error.message);
        } else {
          console.error("Unknown error loading cookies!");
        }
      }
    } else {
      this.instanceCookie = new cookiesHandler(this.username);
    }

    //Encode username and password and create Basic Auth string
    const encodedUsername = encodeURIComponent(this.username);
    const encodedPassword = encodeURIComponent(this.password);
    const authString = Buffer.from(`${encodedUsername}:${encodedPassword}`).toString('base64');
    const url: URL = new URL(ApiPaths.api.base.path + ApiPaths.auth.getCurrentUserInfo.path);

    const headers = {
      'Authorization': `Basic ${authString}`,
      "User-Agent":
        process.env.USER_AGENT || "ExampleApp/1.0.0 Email@example.com",
      "Cookie": `${this.instanceCookie.formatAll()}`, // We add cookies in the request here !
    };

    const options: RequestInit = {
      method: 'GET',
      headers: headers
    };

    try {

      const response: API<AuthenticationResponse, { requiresTwoFactorAuth: ['totp', 'otp'] } |
      { requiresTwoFactorAuth: ['emailOtp'] }> = await fetch(url, { ...options });

      // console.log("Response: ", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Check if the response contains the Set-Cookie header so we can save them
      if (response.headers.has('set-cookie')) {
        const cookies = response.headers.get('set-cookie');
        // console.log("cookies: ", cookies);

        // Parse the cookie string into a list of cookies
        if (cookies === null) throw new Error('No cookies were set.');

        await this.instanceCookie.parseCookieString(cookies, BaseVRChatWrapper.baseDomain);

        // We save cookies if the user wants to keep them
        if (process.env.USE_COOKIES === "true") {
          try {
            await this.instanceCookie.saveCookies();
          } catch (error) {
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
      if (data.error) {
        throw new RequestError(data.error.status_code, data.error.message);
      }
      // console.log("data: ", data); // Log the response data
      // console.log("data: ", data);

      // Handle special cases where authentication was not successful
      if (data.requiresTwoFactorAuth && !this.isAuthentificated) {
        if (data.requiresTwoFactorAuth.includes('totp') || data.requiresTwoFactorAuth.includes('otp')) {
          // Handle the 'totp' and 'otp' case
          console.log('Handling TOTP or OTP two-factor authentication...');
          // Add your handling code here
          if ((process.env.TOTP_2FA_CODE && process.env.TOTP_2FA_CODE.length > 0) || (process.env.VRCHAT_2FA_SECRET && process.env.VRCHAT_2FA_SECRET.length !== 0)) {
            await handleTOTP2FA(this.instanceCookie.getAuthCookie()).then(async (response) => {
              // console.log("response: ", response);
              if (response.verified) {
                console.log("2FA verified!");
                this.isAuthentificated = true;
                if (response.cookies) {
                  console.log("Cookies: ", response.cookies);
                  const newCookies: VRCCookie[] = [];
                  response.cookies.forEach((cookie) => {
                    newCookies.push(cookie as VRCCookie);
                  });
                  newCookies.push(...this.instanceCookie.getCookies());
                  console.log("New Cookies: ", newCookies);
                  
                  // this.instanceCookie.setCookies(response.cookies as VRCCookie[]);
                  await this.instanceCookie.saveCookies().then(() => {
                    console.log("Cookies saved!");
                  }).catch((error) => {
                    if (error instanceof CookiesWriteError) {
                      throw new CookiesWriteError(`Error writing cookies.` + error.message);
                    } else if (error instanceof CookiesReadError) {
                      throw new CookiesReadError(`Error reading cookies.` + error.message);
                    } else if (error instanceof Error) {
                      throw new Error(`Unknown error writing cookies: ` + error.message);
                    }
                  });
                }

              } else {
                console.log("2FA not verified!");
                this.isAuthentificated = false;
              }

            }).catch((error) => {
              console.log("catch?");
              
              if (error instanceof RequestError) {
                // Error with the request
                throw new RequestError(error.statusCode, error.message);
              }
              if (error instanceof Error) {
                console.error("Error while authenticating: ", error.message);
              } else {
                console.error("Unknown error while authenticating!");
              }
            });
          } else {
            throw new TOTPRequired("TOTP 2FA code is missing from .env file!");
          }


        } else if (data.requiresTwoFactorAuth.includes('emailOtp')) {
          // Handle the 'emailOtp' case
          console.log('Handling Email OTP two-factor authentication...');
          // Add your handling code here
        } else {
          // Handle other unknown two-factor authentication methods
          throw new Error('Unknown error while authenticating!');
        }
      }

      if (this.isAuthentificated) {
        // authentication was successful here! -------------------------------------------------------------

        try {
          isCurrentUserJSON(data) // if passes then it's a CurrentUserJSON
          const currentUserObject = CurrentUserFromJSON(data);
          console.log("Logged in as: ", currentUserObject.username);
          // currentUserObject.displayName
          // console.log("Current user is: ", currentUserObject);

          // console.log("Current user is: ", currentUserObject);


          // console.log("Current user is: ", data);
          // console.log(`${C.green} The data is a CurrentUserJSON!${C.reset}`);
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
      // console.log("catch?");
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

    this.rl.close();
  }

  async loadCookies(): Promise<boolean> {
    try {
      if (process.env.USE_COOKIES === 'true') {
        try {
          await this.instanceCookie.cookiesExist();
          try {
            await this.instanceCookie.loadCookies();
            console.log(`${C.green} 🟢 Cookies found and ${C.u}LOADED.${C.reset}`);
            this.cookiesLoaded = true;
            return true;
          } catch (error) {
            if (error instanceof CookiesReadError || error instanceof CookiesUser404 || error instanceof CookiesExpired) {
              throw new Error(error.message);
            } else if (error instanceof Error) {
              throw new Error(`Unknown error loading cookies for '${this.username}' : ${error.message}`);
            } else {
              throw new Error('Unknown error loading cookies!');
            }
          }
        } catch (error) {
          if (error instanceof CookiesUser404 || error instanceof CookiesNotFound) {
            throw new Error(error.message);
          } else if (error instanceof Error) {
            throw new Error("Unknown error loading cookies: " + error.message);
          } else {
            throw new Error("Unknown error loading cookies!");
          }
        }
      } else {
        this.rl.close(); // temp
        // console.log(`${C.brightBlack}Cookies loading turned off!${C.r}`);
        return false; // Returning false since cookies loading is turned off
      }
    } catch (error) {
      if (error instanceof CookiesLoadError) {
        throw new CookiesLoadError(`Error loading cookies.` + error.message);
      } else if (error instanceof Error) {
        throw new Error(`Unknown error loading cookies: ` + error.message);
      }
      return false; // Returning false in case of any error
    }
  }

  async getCurrentUser(): Promise<CurrentUser> {

    let result: CurrentUser;
    const path = ApiPaths.auth.getCurrentUserInfo;
    const url: URL = new URL(ApiPaths.api.base.path + path.path);

    const headers = {
      'Authorization': `Basic ${this.instanceCookie.getAuthCookie()}`,
      "User-Agent": process.env.USER_AGENT || "ExampleApp/1.0.0 Email@example.com",
    };

    const options: RequestInit = {
      method: path.method,
      headers: headers
    };

    try {

      const response: API<AuthenticationResponse, CurrentUser> = await fetch(url, { ...options });

      // console.log("Response: ", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Check if the response contains the Set-Cookie header so we can save them
      if (response.headers.has('set-cookie')) {
        const cookies = response.headers.get('set-cookie');
        if (cookies !== null) {

          await this.instanceCookie.parseCookieString(cookies, BaseVRChatWrapper.baseDomain);

          if (process.env.USE_COOKIES === "true") {
            try {
              await this.instanceCookie.saveCookies();
            } catch (error) {
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
      }

      const data = await response.json();

      try {
        isCurrentUserJSON(data) // if passes then it's a CurrentUserJSON
        const currentUserObject = CurrentUserFromJSON(data);
        result = currentUserObject;
      } catch (error) {
        if (error instanceof CurrentUserObjectParseError) {
          error.logError();
          throw new Error(error.message);
        } else if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Unknown error!");
        }
      }

      return result;

    } catch (error) {
      if (error instanceof TOTPRequired) {
        error.logError();
        throw new TOTPRequired(error.message);
      } else if (error instanceof Error) {
        // check if message is contains 401
        if (error.message.includes("401")) {
          throw new Error("Invalid Username/Email or Password | Missing Credentials");
        } else if (error.message.includes("404")) {
          throw new CookiesUser404("User not found!");
        }
      } else {
        throw new Error("Unknown error!");
      }
    }

    throw new Error("Unknown error!");

    
  }

}