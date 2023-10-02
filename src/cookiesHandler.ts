import dotenv from 'dotenv';
import fs from 'fs/promises';
import { CookieJar } from 'tough-cookie';

dotenv.config();

export type CookieOpts = {
  key: string;
  value: string;
  expires: Date; // You might want to convert this to a Date object in your code
  domain: string;
  path: string;
  hostOnly: boolean;
  creation: string; // You might want to convert this to a Date object in your code
  lastAccessed: string; // You might want to convert this to a Date object in your code
};

class VRCCookie implements CookieOpts {
  key: string;
  value: string;
  expires: Date; // You might want to convert this to a Date object in your code
  domain: string;
  path: string;
  hostOnly: boolean;
  creation: string; // You might want to convert this to a Date object in your code
  lastAccessed: string; // You might want to convert this to a Date object in your code
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

  toString(): string {
    return `${this.key}=${this.value}`;
  }
}

export type SavedCookieJar = {
  [username: string]: VRCCookie[];
};

export class cookiesHandler {
  private cookies: VRCCookie[];
  private cookieFilePath: string = process.env.COOKIES_PATH || './cookies.json';

  constructor(cookies: VRCCookie[] = []) {
    this.cookies = cookies as VRCCookie[];
  }

  public setCookies(cookies: VRCCookie[]): void {
    this.cookies = cookies;
  }

  public getCookies(): VRCCookie[] {
    return this.cookies;
  }



  // load cookie method, save cookie method, clear cookie method
  async loadCookies(username: string, cookieJar: CookieJar) {
    try {
      // const cookieFileContent:SavedCookieJar = fs.readFileSync(this.cookieFilePath, 'utf8') as unknown as SavedCookieJar;
      const allCookies: SavedCookieJar = JSON.parse(await fs.readFile(this.cookieFilePath, 'utf8')) as SavedCookieJar;

      if (allCookies[username] === undefined) {
        throw new Error("Cookie data couldn't be found.");
      }

      const loadedCookies = allCookies[username];

      loadedCookies.forEach((cookie) => {
        const expirationDate = new Date(cookie.expires);
        const currentDate = new Date();
        if (expirationDate > currentDate) {
          const newCookie = new VRCCookie({
            key: cookie.key,
            value: cookie.value,
            expires: expirationDate,
            domain: cookie.domain,
            path: cookie.path,
          });
          // console.log(cookieJar);
        } else {
          console.warn(
            "[!] A cookie for '",
            username,
            "' has expired. You may need to re-authenticate."
          );
          return "expired";
        }
      });
      console.log(
        '\x1b[34m✔ Valid cookies for \'' +
        '\x1b[1m' + username + '\x1b[0m\x1b[34m' +
        '\' loaded successfully.\x1b[0m'
      );


    } catch (error: unknown) {
      if (error instanceof Error) {
        // Now TypeScript knows that `error` is an instance of Error
        console.error(error.message);
      } else if (typeof error === 'object' && error !== null && 'code' in error) {
        // TypeScript knows that `error` is an object with a `code` property
        const code = (error as { code: string }).code;
        if (code === 'ENOENT') {
          console.error('No cookies file found.');
        } else {
          console.error('An unknown error occurred:', error);
        }
      } else {
        // Handle other types of errors or rethrow
        console.error('An unknown error occurred:', error);
      }
    }
  }
  async saveCookies(cookieJar: CookieJar, username: string) {
    // TODO
    // let's you save cookies to a file using process.env.COOKIES_PATH
    let cookiesExisted = false;
    try {
      const cookies = cookieJar.getCookiesSync('https://api.vrchat.cloud');
      let allCookies: SavedCookieJar = {};

      try {
        const cookieFileContent: string = await fs.readFile(
          this.cookieFilePath,
          'utf8',
        );
        allCookies = JSON.parse(cookieFileContent) as SavedCookieJar;
        cookiesExisted = true;
      } catch (error) {
        // Handle error (file not found, JSON parse error, etc.)
        cookiesExisted = false;
      }

      allCookies[username] = cookies as unknown as SavedCookie[];
      fs.writeFile(this.cookieFilePath, JSON.stringify(allCookies), 'utf8');
      // reverse btoa with atob
      if (!cookiesExisted) {
        console.log(
          "\x1b[34m\x1b[1m✅ The cookies for '\x1b[4m" +
          username +
          "\x1b[0m\x1b[34m\x1b[1m' have been created successfully!\x1b[0m",
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error saving cookies for '${username}' : ${error.message}`,
        );
      } else {
        throw new Error(
          `An unknown error occurred while saving cookies for '${username}'`,
        );
      }
    }
  }

  public cookiesExist(username: string): boolean {
    // TODO
    // let's you check if cookies exist in a file using process.env.COOKIES_PATH and if a key exist with the name of 'username'
    // if it does return true
    // else return false
    if (fs.existsSync(this.cookieFilePath)) {
      const cookies: SavedCookieJar = JSON.parse(fs.readFileSync(this.cookieFilePath, 'utf8')) as SavedCookieJar;
      if (cookies[username] !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

export default cookiesHandler;