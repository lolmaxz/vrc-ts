import dotenv from 'dotenv';
import fs from 'fs/promises';
import { CookiesExpired, CookiesNotFound, CookiesReadError, CookiesUser404, CookiesWriteError } from './errors';
import { Color as C } from './colors';

dotenv.config();

export type CookieOpts = {
  key: string;
  value: string;
  expires: Date;
  domain: string;
  path: string;
  hostOnly: boolean;
  creation: Date;
  lastAccessed: Date;
};

export class VRCCookie implements CookieOpts {
  key: string;
  value: string;
  expires: Date;
  domain: string;
  path: string;
  hostOnly: boolean;
  creation: Date;
  lastAccessed: Date;

  constructor(cookie: CookieOpts) {
    this.key = cookie.key;
    this.value = cookie.value;
    this.expires = cookie.expires;
    this.domain = cookie.domain;
    this.path = cookie.path;
    this.hostOnly = cookie.hostOnly;
    this.creation = cookie.creation;
    this.lastAccessed = cookie.lastAccessed;
  }

  /**
   * This method will return a string of the cookie.
   * @returns `string` A string of the cookie.
   */
  toCookieString(): string {
    // return all keys with values in a concatenated string
    let result: string = "";
    result = `key: ${this.key}; `;
    result += `value: ${this.value}; `;
    result += `expires: ${this.expires.toISOString()}; `;
    result += `domain: ${this.domain}; `;
    result += `path: ${this.path}; `;
    result += `hostOnly: ${this.hostOnly}; `;
    result += `creation: ${this.creation.toISOString()}; `;
    result += `lastAccessed: ${this.lastAccessed.toISOString()};`;
    return result;
  }
}

export type SavedCookieJar = {
  [username: string]: VRCCookie[] | undefined;
};

/**
 * This class will handle cookies for the user.
 * @param username The username of the user.
 * @param username The username of the user.
 * @param cookies An array of cookies to set for the user [Optional].
 */
export class cookiesHandler {
  private usernameOwner: string;
  private cookies: VRCCookie[];
  private cookieFilePath: string = process.env.COOKIES_PATH || './cookies.json';

  /**
   * 
   * @param username The username of the user.
   * @param cookies An array of cookies to set for the user [Optional].
   */
  constructor(username: string, cookies: VRCCookie[] = []) {
    this.cookies = cookies;
    this.usernameOwner = username;
  }

  public setCookies(cookies: VRCCookie[]): void {
    this.cookies = cookies;
  }

  public getCookies(): VRCCookie[] {
    return this.cookies;
  }



  /**
   * This method will load cookies from the file specified in process.env.COOKIES_PATH and based on the username provided in the constructor.
   * @returns `Promise<void>` A promise that will resolve when the cookies are loaded.
   */
  async loadCookies(): Promise<void> {

    const allCookies = await fs.readFile(this.cookieFilePath, 'utf8').then((cookieFileContent) => {
      return JSON.parse(cookieFileContent) as SavedCookieJar;
    }).catch((error) => {
      if (error instanceof Error) {
        // Error reading the file
        if (typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
          // File not found, handle accordingly
          throw new CookiesNotFound("File not found: " + this.cookieFilePath);
        } else {
          // Other errors during reading the file
          throw new CookiesReadError("Error reading cookies: " + error.message);
        }
      }
    }) as SavedCookieJar;

    // Get current cookies for the user
    const loadedCookies = allCookies[this.usernameOwner];
    if (loadedCookies === undefined) {
      throw new CookiesUser404("No Cookies was found for user '" + this.usernameOwner + "'!");
    }

    this.cookies = []; // empty the cookies array before loading new ones
    loadedCookies.forEach((cookie) => {
      const expirationDate = new Date(cookie.expires);
      const currentDate = new Date();
      if (expirationDate > currentDate) {
        this.cookies.push(new VRCCookie({
          key: cookie.key,
          value: cookie.value,
          expires: expirationDate,
          domain: cookie.domain,
          path: cookie.path,
          hostOnly: cookie.hostOnly,
          creation: cookie.creation,
          lastAccessed: cookie.lastAccessed,
        }));
      } else {
        // this cookie is expired so we throw a special error for this case
        throw new CookiesExpired("Cookies expired for user '" + this.usernameOwner + "'!");
      }
    });
  }

  /**
   * This method will save the cookies to the file specified in process.env.COOKIES_PATH based on the username.
   * @returns `Promise<void>` A promise that will resolve when the cookies are saved.
   */
  async saveCookies(): Promise<void> {
    // we save if the user had cookies before or not before saving
    if (process.env.USE_COOKIES && process.env.USE_COOKIES !== "true") {
      return;
    }

    let allCookies: SavedCookieJar = {};

    try {
      // if cookies file doesn't exist we create it first
      const fileExist = await this.cookieFileExist();

      if (fileExist) {
        const cookieFileContent = await fs.readFile(this.cookieFilePath, 'utf8');
        allCookies = JSON.parse(cookieFileContent) as SavedCookieJar;
      }

      allCookies[this.usernameOwner] = this.cookies;
      await fs.writeFile(this.cookieFilePath, JSON.stringify(allCookies), 'utf8')

      // Loggin the result in the console
        console.log(`${C.blue + C.b}✅ The cookies for '${C.r}${this.usernameOwner}${C.blue + C.b}' have been ${fileExist?"updated":"created"} successfully!${C.r}`);

    } catch (error) {
      if (error instanceof CookiesUser404) {
        throw new CookiesUser404(error.message);
      } else if (error instanceof CookiesExpired) {
        throw new CookiesExpired(error.message);
      } else if (error instanceof CookiesWriteError) {
        throw new CookiesWriteError(error.message);
      } else {
        throw new Error("Unknown error saving cookies!");
      }
    }
  }

  // add cookies
  addCookies(cookies: VRCCookie[]): void {
    this.cookies = this.cookies.concat(cookies);
  }

  // add cookie
  addCookie(cookie: VRCCookie): void {
    this.cookies.push(cookie);
  }

  /**
   * let's you check if cookies exist in a file using process.env.COOKIES_PATH and if a key exist with the name of 'username'.
   * @returns `Promise<boolean>` A boolean if cookies exist for the user.
   */
  async cookiesExist(username?: string): Promise<void> {
    try {
      await fs.stat(this.cookieFilePath);
      const cookies: SavedCookieJar = JSON.parse(await fs.readFile(this.cookieFilePath, 'utf8')) as SavedCookieJar;
      if (username && !cookies[username]) throw new CookiesUser404("No Cookies was found for user '" + username + "'!");  
      if (!cookies[this.usernameOwner]) throw new CookiesUser404("No Cookies was found for user '" + this.usernameOwner + "'!");  
      
    } catch (error) {

      if (error instanceof Error) {
        // Error reading the file
        if (typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
          // File not found, handle accordingly
          throw new CookiesNotFound("File not found: " + this.cookieFilePath);
        } else {
          // Other errors during reading the file
          throw new CookiesReadError("Error reading cookies: " + error.message);
        }
      }

      if (error instanceof CookiesUser404 || error instanceof CookiesNotFound) {
        throw new CookiesUser404(error.message);
      } else {
        throw new Error("Unknown error loading cookies!");
      }
    }
  }

  /**
   * This function will check if the cookie file exist.
   * @returns `boolean` A boolean if the cookie file exist.
   */
  async cookieFileExist(): Promise<boolean> {
    try {
      await fs.stat(this.cookieFilePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * This function will return a string array of all current cookies of this instance.
   * @returns `string[]` A string array of all cookies.
   */
  toString(): string[] {
    // return all keys with values in a concatenated string
    const result: string[] = [];
    this.cookies.forEach((cookie) => {
      result.push(cookie.toCookieString() + ' ');
    });
    return result;
  }
  /**
   * Return all keys with values in a concatenated string from the cookies for this instance.
   * @returns `string` A string of all cookies in a format that can be used in a request.
   */
  formatAll(): string {
    let cookieString: string = "";
    this.cookies.forEach((cookie) => {
      cookieString += `${cookie.key}=${cookie.value}; `;
    });
    // trim the end
    cookieString = cookieString.trimEnd();
    // console.log("cookieString: ", cookieString);

    return cookieString;
  }

  public async parseCookieString(cookieString: string, domain: string): Promise<void> {
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

    this.cookies = cookies;
    return Promise.resolve();
  }

  // check if the cookies has a field key named 'auth' and if it's value is not empty and return it formated in a single line string
  getAuthCookie(): string {
    let result: string = "";
    this.cookies.forEach((cookie) => {
      if (cookie.key === 'auth') {
        result = `${cookie.key}=${cookie.value};`;
      }
    });
    return result;
  }

  // check if the cookies has a field key named 'twoFactorAuth' and if it's value is not empty and return it formated in a single line string
  getTwoFactorAuthCookie(): string {
    let result: string = "";
    this.cookies.forEach((cookie) => {
      if (cookie.key === 'twoFactorAuth') {
        result = `${cookie.key}=${cookie.value};`;
      }
    });
    return result;
  }
}

export default cookiesHandler;