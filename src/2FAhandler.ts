import { Color as C } from './colors';
// import { BaseVRChatWrapper } from './BaseVRChatWrapper';
// import cookiesHandler from './VRCCookie';
import { ApiPaths } from './types/ApiPaths';
import totp from 'totp-generator';
import dotenv from 'dotenv';
import cookiesHandler from './VRCCookie';
import { BaseVRChatWrapper } from './BaseVRChatWrapper';
import { RequestError } from './errors';
dotenv.config();

/**
 * This function will handle the 2FA verification by email.
 */
async function handleTOTP2FA(authString: string): Promise<AuthenticationResponse> {
    let finalCode: string = '';
    if (process.env.VRCHAT_2FA_SECRET === undefined || !(process.env.VRCHAT_2FA_SECRET && process.env.VRCHAT_2FA_SECRET.length > 0)) {
        if (process.env.TOTP_2FA_CODE === undefined || (process.env.TOTP_2FA_CODE.length <= 0)) {
            throw new Error("No 2FA code OR 2FA Secret was provided in the .env file! Set `TOTP_2FA_CODE` or `VRCHAT_2FA_SECRET` in the .env file and restart the application.");
        } else {
            // use regex to check if the string contains only 6 numbers
            const regex = new RegExp('^[0-9]{6}$');
            if (!regex.test(process.env.TOTP_2FA_CODE)) {
                throw new Error("The provided 2FA code is invalid! It must be a 6 digit number.");
            }

            finalCode = process.env.TOTP_2FA_CODE;
            throw new Error("No 2FA secret was provided!");
        }
    } else {
        finalCode = totp("GJSWI3DLOVTG6RDPMJMEYRCRIEZHSZLE");
    }
    const url: URL = new URL(ApiPaths.api.base.path + ApiPaths.auth.verify2FATOTP.path);

    const headers = {
        'Content-Type': 'application/json',
        "User-Agent":
            process.env.USER_AGENT || "ExampleApp/1.0.0 Email@example.com",
        "Cookie": `${authString}`,
    };

    const options: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            code: finalCode
        })
    };

    // console.log("options : ", options);
    // console.log("URL: ", url);
    
    

    try {
        const response: API<AuthenticationResponse, unknown> = await fetch(url, { ...options });

        // Check if response is ok (status code in the range 200-299)
        console.log("Response: ", response);
        
        const data = await response.json() as AuthenticationResponse;
        console.log(`${C.yellow}data: `, data); // Log the response data
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("here?");
        
        if (data.error?.status_code === 429) {
            console.log("haha");
            
            throw new RequestError(response.status, response.statusText);
          }

        // Check if the response contains the Set-Cookie header so we can save them
        if (process.env.USE_COOKIES === "true") {
            if (response.headers.has('set-cookie')) {
                const cookies = response.headers.get('set-cookie');
                // Parse the cookie string into a list of cookies
                if (cookies === null) throw new Error('No cookies were set.');
                // console.log(`${C.yellow}Cookies: ${C.r}`, cookies);

                const cookiesHandling: cookiesHandler = new cookiesHandler(process.env.VRCHAT_USERNAME || '');
                await cookiesHandling.parseCookieString(cookies, BaseVRChatWrapper.baseDomain);
                data.cookies = cookiesHandling.getCookies();
                // cookiesHandling.setCookies(parseCookieString(cookies, this.baseDomain));
                // console.log("To String: ",cookiesHandling.toString());
                // console.log("Format All: ",cookiesHandling.formatAll());
                // this.instanceCookie = cookiesHandling;
                // We save cookies if the user wants to keep them
                // await cookiesHandling.saveCookies();
            }
        }

        console.log("Data: ", data);
        
        return data;

        // const data = await response.json();
        // console.log(`${C.yellow}data: `, data); // Log the response data


    } catch (error) {
        if (error instanceof RequestError) {
            // Error with the request
            throw new RequestError(error.statusCode, error.message);
        }
        if (error instanceof Error) {
            // Error reading the file
            if (typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
                // File not found, handle accordingly
                // throw new CookiesReadError("File not found: " + this.cookieFilePath);
            } else {
                // Other errors during reading the file
                // throw new CookiesReadError("Error reading cookies: " + error.message);
            }
        }
        throw new Error(`Unknown error with 2FA`);
    }


}

/**
 * This method will handle the 2FA verification by a TOTP.
 */
async function handleEmail2FA() {

}

export default handleTOTP2FA; handleEmail2FA;

