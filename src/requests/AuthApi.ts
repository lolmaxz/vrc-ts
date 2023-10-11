// import { VRCWrapper } from "../AuthentificationHandler";
// import { BaseVRChatWrapper } from "../BaseVRChatWrapper";
import { VRCWrapper } from "../VRCWrapper";
import { CookiesReadError, CookiesUser404, CookiesWriteError, CurrentUserObjectParseError, TOTPRequired, UserNotAuthenticated } from "../errors";
import { ApiPaths } from "../types/ApiPaths";
import { CurrentUser, CurrentUserFromJSON, isCurrentUserJSON } from "../types/CurrentUser";
import { BaseApi } from "./BaseApi";




export class AuthApi extends BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    async getCurrentUser(): Promise<CurrentUser> {

        if (!this.baseClass.isAuthentificated) {
            throw new UserNotAuthenticated();
        }

        let result: CurrentUser;
        const path = ApiPaths.auth.getCurrentUserInfo;
        const url: URL = new URL(ApiPaths.api.base.path + path.path);

        const headers = {
            'Authorization': `Basic ${this.baseClass.getBase64Credentials()}`,
            "User-Agent": process.env.USER_AGENT || "ExampleApp/1.0.0 Email@example.com",
            "Cookie": `${this.baseClass.instanceCookie.getAuthCookie()}`,
        };

        const options: RequestInit = {
            method: path.method,
            headers: headers
        };

        try {

            const response: VRCAPIResponse = await fetch(url, { ...options });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Check if the response contains the Set-Cookie header so we can save them
            if (response.headers.has('set-cookie')) {
                console.log("we have set-cookie");

                const cookies = response.headers.get('set-cookie');
                if (cookies !== null) {

                    await this.baseClass.instanceCookie.parseCookieString(cookies, VRCWrapper.baseDomain);

                    try {
                        await this.baseClass.instanceCookie.saveCookies();
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

            try {
                isCurrentUserJSON(data) // if passes then it's a CurrentUserJSON
                const currentUserObject = CurrentUserFromJSON(data);
                result = currentUserObject;
            } catch (error) {
                if (error instanceof CurrentUserObjectParseError) {
                    console.log("error: ", error.message);

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

    // TODO function to check if user exist or not and return a boolean.
    userExist() {

    }

}