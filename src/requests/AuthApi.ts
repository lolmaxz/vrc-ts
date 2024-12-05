import totp from 'totp-generator';
import { VRChatAPI } from '../VRChatAPI';
import { EmailOtpRequired, TOTPRequired } from '../errors';
import { ApiPaths } from '../types/ApiPaths';
import {
    checkUserExistOptions,
    checkUserExistResponse,
    verify2FAEmailResponse,
    verify2FATOTPResponse,
    verifyAuthTokenResponse,
} from '../types/Auth';
import { RequestSuccess, dataKeys2Fa, executeRequestType } from '../types/Generics';
import { CurrentUser } from '../types/Users';
import { BaseApi } from './BaseApi';

export class AuthApi extends BaseApi {
    baseClass: VRChatAPI;
    regexCode: RegExp;

    constructor(baseClass: VRChatAPI) {
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
     * @returns {Promise<CurrentUser>} - Returns a Promise with the response from the API.
     */
    public async getCurrentUser<E = CurrentUser>(): Promise<E> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.auth.getCurrentUserInfo,
            pathFormated: ApiPaths.auth.getCurrentUserInfo.path,
        };

        return await this.executeRequest<E>(paramRequest);
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
    public async userExist(params: checkUserExistOptions): Promise<checkUserExistResponse> {
        const parameters: URLSearchParams = new URLSearchParams();

        for (const [key, value] of Object.entries(params)) {
            if (value) {
                parameters.append(key, value);
            }
        }

        if (!parameters.toString())
            throw new Error(
                'No search term was provided! Please provide at least one of the following: `email`, `displayName` or `userId`.'
            );

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.auth.userExist,
            pathFormated: ApiPaths.auth.userExist.path,
            queryOptions: parameters,
        };

        return await this.executeRequest<checkUserExistResponse>(paramRequest);
    }

    /**
     * Finishes the login sequence with a normal 2FA-generated code for accounts with 2FA-protection enabled.
     *
     * @param {Requests.verify2FACodeOptions} options - Requests.verify2FACodeOptions Type `(All Optionals)`
     *
     * Options is an object containing 2 elements:
     *
     * `generateCode` - Whether to generate a new code or not. If no `code` is provided and this is set to `FALSE`, then the 6 digit code from the .env file will be used (from `TOTP_2FA_CODE`). `DEFAULT TRUE`
     *
     * `code` : The 2FA code to verify. If no code is provided then the code from the .env file will be used.
     */
    public async verify2FACodeTOTP(): Promise<verify2FATOTPResponse> {
        let code = '';
        const envCode = process.env.TOTP_2FA_CODE;

        // we use .env file for generating the code here
        if (!envCode || envCode.length !== 6) {
            // we generate the code
            if (
                process.env.VRCHAT_2FA_SECRET === undefined ||
                (process.env.VRCHAT_2FA_SECRET && process.env.VRCHAT_2FA_SECRET.length < 32)
            ) {
                throw new TOTPRequired("Bad or no 2FA secret was provided in 'VRCHAT_2FA_SECRET' !");
            }
            // secret was correctly set now we compute it
            console.log('Using generated 2FA code from secret key...');

            code = totp(process.env.VRCHAT_2FA_SECRET);
        } else {
            // we use the code from .env file
            if (process.env.TOTP_2FA_CODE === undefined || process.env.TOTP_2FA_CODE.length !== 6) {
                throw new TOTPRequired("Bad or no 2FA code was provided in 'TOTP_2FA_CODE' !");
            }
            code = process.env.TOTP_2FA_CODE;
        }

        if (!this.regexCode.test(code))
            throw new TOTPRequired('The provided 2FA code is invalid! It must be a 6 digit number.');
        const body: dataKeys2Fa = { code };

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.auth.verify2FATOTP,
            pathFormated: ApiPaths.auth.verify2FATOTP.path,
            body: body,
        };

        try {
            const result = await this.executeRequest<verify2FATOTPResponse>(paramRequest);
            return result;
        } catch (error) {
            console.log('error: ', error);
            return { verified: false };
        }
    }

    /**
     * Finishes the login sequence with an 2FA email code.
     *
     * @param {Requests.verify2FAEmailOptions} options - Requests.verify2FAEmailOptions Type `(All Optionals)`
     *
     * Options is an object containing 1 elements:
     *
     * `code` : The 2FA code to verify. If no code is provided then the code from the .env file will be used. From `EMAIL_2FA_CODE`.
     */
    public async verify2FAEmailCode(): Promise<verify2FAEmailResponse> {
        let code = '';
        const envCode = process.env.EMAIL_2FA_CODE;

        // we use the code from .env file
        if (!envCode || envCode.length !== 6)
            throw new EmailOtpRequired("Bad or no 2FA code was provided in 'EMAIL_2FA_CODE' in .env file. !");
        if (this.baseClass.instanceCookie.isSameEmailCode())
            throw new EmailOtpRequired(
                'The provided 2FA code is the same as the one from the last request! Please provide a new one.'
            );
        code = envCode;

        if (!this.regexCode.test(code))
            throw new EmailOtpRequired('The provided 2FA code is invalid! It must be a 6 digit number.');
        const body: dataKeys2Fa = { code };

        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.auth.verify2FAEmail,
            pathFormated: ApiPaths.auth.verify2FAEmail.path,
            body: body,
        };

        try {
            const result = await this.executeRequest<verify2FAEmailResponse>(paramRequest);
            return result;
        } catch (error) {
            console.log('error: ', error);
            return { verified: false };
        }
    }

    /**
     * Verify whether the currently provided Auth Token is valid.
     */
    public async verifyAuthToken(): Promise<verifyAuthTokenResponse> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.auth.verifyAuthToken,
            pathFormated: ApiPaths.auth.verifyAuthToken.path,
        };

        return await this.executeRequest<verifyAuthTokenResponse>(paramRequest);
    }

    /**
     * Invalidates the login session.
     */
    public async logout(): Promise<RequestSuccess> {
        const paramRequest: executeRequestType = {
            currentRequest: ApiPaths.auth.logout,
            pathFormated: ApiPaths.auth.logout.path,
        };

        const result = await this.executeRequest<RequestSuccess>(paramRequest);

        await this.baseClass.instanceCookie.deleteCookies();

        return result;
    }
}
