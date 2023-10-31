import { VRCWrapper } from "../VRCWrapper";
import { ApiPaths } from "../types/ApiPaths";
import { BaseApi } from "./BaseApi";
import totp from 'totp-generator';




export class AuthApi extends BaseApi {
    baseClass: VRCWrapper;
    regexCode: RegExp;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
        this.regexCode = new RegExp('^[0-9]{6}$');
    }

/**
 * **Get Current User Info**
 * 
 * This method lets you get the information about the current user being logged in with the current instance.
 * 
 * Cookies needs to be valid for this to work. If the user isn't authenticated, then this will throw an error.
 * @returns {Promise<VRCAPI.Auth.responseTypes.loginResponse>} - Returns a Promise with the response from the API.
 */
    public async getCurrentUser(): Promise<VRCAPI.Users.Models.CurrentUser | VRCAPI.Generics.twoFactorAuthResponseType> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.auth.getCurrentUserInfo,
            pathFormated: ApiPaths.auth.getCurrentUserInfo.path,
        };
        
        return await this.executeRequest<VRCAPI.Users.Models.CurrentUser | VRCAPI.Generics.twoFactorAuthResponseType>(paramRequest);
    }

    /**
     * Checks if a user by a given `username`, `displayName` or `email` exist. 
     * 
     * This is used during registration to check if a username has already been taken, during change of displayName to check if a displayName is available, and during change of email to check if the email is already used. 
     * 
     * In the later two cases the `excludeUserId` is used to exclude oneself, otherwise the result would always be true.
     * 
     * It is **REQUIRED** to include **AT LEAST** `username`, `displayName` or `email` query parameter.
     * 
     * Although they can be combined - in addition with `excludeUserId` (generally to exclude yourself) - to further fine-tune the search.
     */
    public async userExist(params: VRCAPI.Auth.Requests.checkUserExistOptions): Promise<VRCAPI.Auth.ResponseTypes.checkUserExistResponse> {

        const parameters: URLSearchParams = new URLSearchParams();

        for (const [key, value] of Object.entries(params)) {
            if (value) {
                parameters.append(key, value);
            }
        }

        if (!parameters.toString()) {
            throw new Error("No search term was provided! Please provide at least one of the following: `email`, `displayName` or `userId`.");
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.auth.userExist,
            pathFormated: ApiPaths.auth.userExist.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<VRCAPI.Auth.ResponseTypes.checkUserExistResponse>(paramRequest);
    }

    /**
     * Finishes the login sequence with a normal 2FA-generated code for accounts with 2FA-protection enabled.
     * 
     * @param {VRCAPI.Generics.Requests.verify2FACodeOptions} options - VRCAPI.Generics.Requests.verify2FACodeOptions Type `(All Optionals)`
     * 
     * Options is an object containing 2 elements: 
     * 
     * `generateCode` - Whether to generate a new code or not. If no `code` is provided and this is set to `FALSE`, then the 6 digit code from the .env file will be used (from `TOTP_2FA_CODE`). `DEFAULT TRUE`
     * 
     * `code` : The 2FA code to verify. If no code is provided then the code from the .env file will be used.
     */
    public async verify2FACodeTOTP({ generateCode = true, code }: VRCAPI.Auth.Requests.verify2FACodeOptions): Promise<VRCAPI.Auth.ResponseTypes.verify2FATOTPResponse | VRCAPI.Generics.RequestError> {

        let finalCode = "";

        if (code) {
            if (code.length !== 6) {
                throw new Error("Invalid 2FA code!");
            } else {
                finalCode = code;
            }
        } else {
            // we use .env file for generating the code here
            if (generateCode) {
                // we generate the code
                if (process.env.VRCHAT_2FA_SECRET === undefined || (process.env.VRCHAT_2FA_SECRET && process.env.VRCHAT_2FA_SECRET.length < 32)) {
                    throw new Error("Bad or no 2FA secret was provided in 'VRCHAT_2FA_SECRET' !");
                }
                // secret was correctly set now we compute it
                finalCode = totp(process.env.VRCHAT_2FA_SECRET);
            } else {
                // we use the code from .env file
                if (process.env.TOTP_2FA_CODE === undefined || process.env.TOTP_2FA_CODE.length !== 6) {
                    throw new Error("Bad or no 2FA code was provided in 'TOTP_2FA_CODE' !");
                }
                finalCode = process.env.TOTP_2FA_CODE;
            }
        }

        if (!this.regexCode.test(finalCode)) {
            throw new Error("The provided 2FA code is invalid! It must be a 6 digit number.");
        }

        // the fetching

        const body: VRCAPI.Generics.dataKeys2Fa = {
            code: finalCode
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.auth.verify2FATOTP,
            pathFormated: ApiPaths.auth.verify2FATOTP.path,
            body: body
        };
        
        return await this.executeRequest<VRCAPI.Auth.ResponseTypes.verify2FATOTPResponse>(paramRequest);
    }


    /**
     * Finishes the login sequence with an 2FA email code.
     * 
     * @param {VRCAPI.Generics.Requests.verify2FAEmailOptions} options - VRCAPI.Generics.Requests.verify2FAEmailOptions Type `(All Optionals)`
     * 
     * Options is an object containing 1 elements:
     * 
     * `code` : The 2FA code to verify. If no code is provided then the code from the .env file will be used. From `EMAIL_2FA_CODE`.
     */
    public async verify2FAEmailCode({ code }: VRCAPI.Auth.Requests.verify2FAEmailOptions): Promise<VRCAPI.Auth.ResponseTypes.verify2FAEmailResponse> {

        let finalCode = "";
        if (code) {
            if (code.length !== 6) {
                throw new Error("Invalid 2FA code!");
            } else {
                finalCode = code;
            }
        } else {
            // we use the code from .env file
            if (process.env.EMAIL_2FA_CODE === undefined || process.env.EMAIL_2FA_CODE.length !== 6) {
                throw new Error("Bad or no 2FA code was provided in 'EMAIL_2FA_CODE' !");
            }
            finalCode = process.env.EMAIL_2FA_CODE;

        }

        if (!this.regexCode.test(finalCode)) {
            throw new Error("The provided 2FA code is invalid! It must be a 6 digit number.");
        }

        const body: VRCAPI.Generics.dataKeys2Fa = {
            code: finalCode
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.auth.verify2FAEmail,
            pathFormated: ApiPaths.auth.verify2FAEmail.path,
            body: body
        };

        return await this.executeRequest<VRCAPI.Auth.ResponseTypes.verify2FAEmailResponse>(paramRequest);
    }

    /**
     * Verify whether the currently provided Auth Token is valid.
     */
    public async verifyAuthToken(): Promise<VRCAPI.Auth.ResponseTypes.verifyAuthTokenResponse> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.auth.verifyAuthToken,
            pathFormated: ApiPaths.auth.verifyAuthToken.path,
        };

        return await this.executeRequest<VRCAPI.Auth.ResponseTypes.verifyAuthTokenResponse>(paramRequest);
    }

    /**
     * Invalidates the login session.
     */
    public async logout(): Promise<VRCAPI.Generics.RequestSuccess> {
        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.auth.logout,
            pathFormated: ApiPaths.auth.logout.path,
        };

        const result = await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);

        await this.baseClass.instanceCookie.deleteCookies();

        return result;

    }

}