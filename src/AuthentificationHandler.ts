// import * as readline from 'readline';
// import { cookiesHandler } from './cookiesHandler';
// import { AxiosInstance } from 'axios';
// import { AxiosResponse } from 'axios';
// import { AxiosResponse } from 'axios';
import { BaseVRChatWrapper } from './BaseVRChatWrapper';
import cookiesHandler, { CookieOpts, VRCCookie } from './VRCCookie';
import { Color as C } from './colors';
import { CookiesExpired, CookiesNotFound, CookiesReadError, CookiesUser404 } from './errors';
// import { CookieOpts } from './VRCCookie';
// import { AuthenticationResponse } from './types/requestConfig';


// Function to handle authentification and 2FA verification
export class VRCWrapper extends BaseVRChatWrapper {
  baseDomain: string = 'api.vrchat.cloud';
  baseURL: string = 'https://api.vrchat.cloud/api/1/';
  cookiesLoaded = false;

  async authenticate() {

    if (process.env.USE_COOKIES === 'true') {
      try {
        await this.loadCookies();
      } catch (error) {
        if (error instanceof CookiesNotFound || error instanceof CookiesUser404) {
          console.error(error.message);
        } else if (error instanceof Error) {
          console.error("Unknown error loading cookies: ", error.message);
        } else {
          console.error("Unknown error loading cookies!");
        }
      }
    }

    //Encode username and password and create Basic Auth string
    const encodedUsername = encodeURIComponent(this.username);
    const encodedPassword = encodeURIComponent(this.password);
    const authString = Buffer.from(`${encodedUsername}:${encodedPassword}`).toString('base64');
    const url: URL = new URL(this.baseURL + "auth/user");

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

    console.log("options : ", options);

    try {
      // const response = await fetch(this.baseURL+"auth/user", { method: 'GET', headers: headers });

      const response: API<AuthenticationResponse, { requiresTwoFactorAuth: ['totp', 'otp'] } |
      { requiresTwoFactorAuth: ['emailOtp'] }> = await fetch(url, { ...options });

      // Check if response is ok (status code in the range 200-299)
      // console.log("Response: ",response);
      if (!response.ok) {
        console.log("Response: ", response);
        throw new Error(`HTTP error! Status: ${response.status}`);

      }

      // Check if the response contains the Set-Cookie header so we can save them
      if (process.env.USE_COOKIES === "true") {
        if (response.headers.has('set-cookie')) {
          const cookies = response.headers.get('set-cookie');
          // Parse the cookie string into a list of cookies
          if (cookies === null) throw new Error('No cookies were set.');
          const cookiesHandling: cookiesHandler = new cookiesHandler(this.username, parseCookieString(cookies, this.baseDomain));
          // cookiesHandling.setCookies(parseCookieString(cookies, this.baseDomain));
          // console.log("To String: ",cookiesHandling.toString());
          // console.log("Format All: ",cookiesHandling.formatAll());

          // We save cookies if the user wants to keep them
          await cookiesHandling.saveCookies();
        }
      }


      const data = await response.json();
      console.log("data: ", data); // Log the response data

      // Handle special cases

      if (data.requiresTwoFactorAuth) {
        if (data.requiresTwoFactorAuth.includes('totp') || data.requiresTwoFactorAuth.includes('otp')) {
          // Handle the 'totp' and 'otp' case
          console.log('Handling TOTP or OTP two-factor authentication...');
          // Add your handling code here

        } else if (data.requiresTwoFactorAuth.includes('emailOtp')) {
          // Handle the 'emailOtp' case
          console.log('Handling Email OTP two-factor authentication...');
          // Add your handling code here
        } else {
          // Handle other unknown two-factor authentication methods
          console.warn('Unknown two-factor authentication method received:', data.requiresTwoFactorAuth);
        }
      } else {
        // Handle the case where no two-factor authentication is required
        console.log('No two-factor authentication required.');
        this.isAuthentificated = true;
        // Add your handling code here
      }


    } catch (error) {
      if (error instanceof Error) {
        // console.error('Fetch error: ', error.message); // Log any fetch or network errors
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
              console.error(`Unknown error loading cookies for '${this.username}' : ${error.message}`);
              throw error; // You might want to throw the error to ensure it propagates up
            } else {
              console.error('No cookies file found.');
              throw new Error('No cookies file found.'); // Throwing an error here as well
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
        console.log(`${C.brightBlack}Cookies loading turned off!${C.r}`);
        return false; // Returning false since cookies loading is turned off
      }
    } catch (error) {
      console.error(error);
      return false; // Returning false in case of any error
    }
  }
}



function parseCookieString(cookieString: string, domain: string): VRCCookie[] {
  const cookies: VRCCookie[] = [];
  const cookieParts = cookieString.split(';');

  cookieParts.forEach((part, index) => {
    const [key, value] = part.split('=').map(s => s.trim());
    if (index === 0) {
      // This is the main cookie key-value pair
      cookies.push(new VRCCookie({
        key,
        value,
        expires: new Date(),
        domain,
        path: '/',
        hostOnly: false,
        creation: new Date(),
        lastAccessed: new Date(),
      } as CookieOpts));
    } else {
      // These are the cookie attributes
      const currentCookie = cookies[cookies.length - 1];
      switch (key.toLowerCase()) {
        case 'expires':
          currentCookie.expires = new Date(value);
          break;
        case 'path':
          currentCookie.path = value;
          break;
        case 'httponly':
          currentCookie.hostOnly = true;
          break;
      }
    }
  });

  return cookies;
}