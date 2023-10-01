import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { CookieJar, Cookie } from 'tough-cookie';

dotenv.config();

export type SavedCookie = {
    key: string;
    value: string;
    expires: string; // You might want to convert this to a Date object in your code
    domain: string;
    path: string;
    hostOnly: boolean;
    creation: string; // You might want to convert this to a Date object in your code
    lastAccessed: string; // You might want to convert this to a Date object in your code
};

export type SavedCookieJar = {
    [username: string]: SavedCookie[] | undefined;
};

export class cookiesHandler {
    private cookies: SavedCookie[];
    private cookieFilePath: string = process.env.COOKIES_PATH || './cookies.json';

    constructor(cookies: SavedCookie[] = []) {
        this.cookies = cookies as unknown as SavedCookie[];
    }

    public setCookies(cookies: SavedCookie[]): void {
        this.cookies = cookies;
    }

    public getCookies(): SavedCookie[] {
        return this.cookies;
    }



    // load cookie method, save cookie method, clear cookie method
    public loadCookies(username:string, cookieJar:CookieJar): void {
        try {
            // const cookieFileContent:SavedCookieJar = fs.readFileSync(this.cookieFilePath, 'utf8') as unknown as SavedCookieJar;
            const allCookies:SavedCookieJar = JSON.parse(fs.readFileSync(this.cookieFilePath, 'utf8')) as SavedCookieJar;


            // const cookieFileContent = fs.readFileSync(this.cookieFilePath, "utf8");
            // const allCookies = JSON.parse(cookieFileContent) as SavedCookieJar;
      
            if (allCookies[username]) {
              const loadedCookies = allCookies[username];
              if (
                Array.isArray(loadedCookies) &&
                loadedCookies.every((cookie) => cookie.key && cookie.value)
              ) {
                loadedCookies.forEach((cookie) => {
                  const expirationDate = new Date(cookie.expires);
                  const currentDate = new Date();
                  if (expirationDate > currentDate) {
                    const newCookie = new Cookie({
                      key: cookie.key,
                      value: cookie.value,
                      expires: expirationDate,
                      domain: cookie.domain,
                      path: cookie.path,
                    });
                    cookieJar.setCookieSync(
                      newCookie,
                      "https://api.vrchat.cloud"
                    );
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
                
              } else {
                console.error(
                  "Invalid cookie data in file for '",
                  username,
                  "'."
                );
                throw new Error("Invalid cookie data");
              }
            } else {
                console.log(
                    '\x1b[90mNo cookies found for \'' +
                    username +
                    '\'. Proceeding without loading cookies.\x1b[0m'
                );                
              throw new Error("Cookie data couldn't be found.");

            }
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
    public saveCookies(cookieJar: CookieJar, username: string): void {
        // TODO
        // let's you save cookies to a file using process.env.COOKIES_PATH
        let cookiesExisted = false;
        try {
            const cookies = cookieJar.getCookiesSync('https://api.vrchat.cloud');
            let allCookies: SavedCookieJar = {};

            try {
                const cookieFileContent: string = fs.readFileSync(
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
            fs.writeFileSync(this.cookieFilePath, JSON.stringify(allCookies), 'utf8');
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
            const cookies:SavedCookieJar = JSON.parse(fs.readFileSync(this.cookieFilePath, 'utf8')) as SavedCookieJar;
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