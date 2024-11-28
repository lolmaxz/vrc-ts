import { VRChatAPI } from '../VRChatAPI';
import { RequestError, UserNotAuthenticated } from '../errors';
import { API, VRCRequest, executeRequestType, headerOptions } from '../types/Generics';

/**
 * This class is used to handle the base API requests. This class should not be used directly.
 */
export class BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        this.baseClass = baseClass;
    }

    /**
     * Function to execute the request with the given parameters.
     * @param pathKeys  The path keys are the query parameters that are added to the path separated by a `&` symbol.
     * @param body The body is the data that is sent to the server.
     * @returns A promise that resolves to the data received from the server. If there is an error then it will throw an error. If there is no data then it will return an empty object.
     * @throws {UserNotAuthenticated} If the user is not authenticated.
     */
    protected async executeRequest<E>({
        currentRequest,
        pathFormated,
        queryOptions,
        body,
    }: executeRequestType): Promise<E> {
        // we make sure everything is valid first
        this.checkValidData({
            currentRequest,
            pathFormated,
            queryOptions,
            body,
        });

        // if all query parameters are present in the query params variable then we can replace them with our parameter from the template
        let currentPath = '';
        if (currentRequest.secondPath) {
            currentPath = this.baseClass.basePath2 + pathFormated;
        } else {
            currentPath = this.baseClass.basePath + pathFormated;
        }
        const url: URL = new URL(currentPath);

        if (queryOptions && queryOptions.toString()) {
            url.search = queryOptions.toString();
        }

        // check headers
        const headers: headerOptions = {
            'User-Agent': this.baseClass.headerAgent, // we set the User_Agent header
            'Content-Type': 'application/json',
        };

        if (!currentRequest.cookiesNeeded.includes('none')) {
            headers.cookie = ``;

            if (currentRequest.cookiesNeeded.includes('authorization') && !this.baseClass.cookiesLoaded) {
                headers['Authorization'] = `Basic ${this.baseClass.getBase64Credentials()}`;
            }

            const authCookie = this.baseClass.instanceCookie.getAuthCookie();
            if (currentRequest.cookiesNeeded.includes('authCookie') && authCookie) {
                if (!authCookie) {
                    throw new Error('No Auth cookie was found! Please make sure you are logged in.');
                }

                headers.cookie += `${authCookie} `;
            }

            if (
                currentRequest.cookiesNeeded.includes('twoFactorAuth') &&
                this.baseClass.instanceCookie.getTwoFactorAuthCookie()
            ) {
                const twoFactorAuth = this.baseClass.instanceCookie.getTwoFactorAuthCookie();

                if (!twoFactorAuth) {
                    throw new Error('No 2FA cookie was found! Please make sure you are logged in.');
                }

                headers.cookie += `${twoFactorAuth} `;
            }
        }

        headers.cookie?.trim();

        const options: VRCRequest = {
            method: currentRequest.method,
            headers: headers,
        };

        if (body && currentRequest.requiresData) {
            options.body = JSON.stringify(body);
        }
        const response: API<E, RequestError> = await fetch(url, options);

        if (process.env.DEBUG === 'true') {
            console.log('#1 url: ', url);
            console.log('#2 options: ', options);
            console.log('#3 response: ', response);
        }

        if (!response.ok) {
            if (pathFormated.includes('/auth/twofactorauth') && response.status === 400) {
                return (await response.json()) as E;
            }
            let extraMessage = '';
            console.log('not okay?:', response);

            const reponseTry = (await response.json()) as RequestError;
            console.log(reponseTry);

            if ('error' in reponseTry) {
                const error = reponseTry.error as object;
                if ('message' in error) {
                    const extraMessageReceived = error.message as string;
                    if (extraMessageReceived) {
                        extraMessage = error.message as string;
                    }
                }
            }

            throw new RequestError(response.status, response.statusText + ' | Extra message: ' + extraMessage);
        }

        // we get the set-cookies if there is any (way more optimized solution)
        const cookies = response.headers.getSetCookie();
        if (response.headers.getSetCookie().length > 0) {
            // making sure there is at least one cookie and then adding it to our Cookies Instance and it will be saved in the cookies file.
            await this.baseClass.instanceCookie.addCookiesFromStrings(cookies);
        }

        const result = (await response.json()) as E;
        if (process.env.DEBUG === 'true') {
            console.log('RESULTS: ', result);
        }

        return result;
    }

    checkValidData({ currentRequest, pathFormated, queryOptions, body }: executeRequestType) {
        // if the base class is not authenticated then we need to throw an error unless it's a 2FA authentication process!
        if (!this.baseClass.isAuthentificated) {
            if (!pathFormated.includes('/auth/twofactorauth') && !pathFormated.includes('/auth/user')) {
                throw new UserNotAuthenticated();
            }
        }

        // if (currentRequest.cookiesNeeded.includes("authCookie") && !this.baseClass.instanceCookie.getAuthCookie()) {
        //     throw new Error('No Auth cookie was found! Please make sure you are logged in.');
        // }

        if (currentRequest.notImplemented) {
            throw new Error('This request is not implemented yet!');
        }

        // make sure we aren't running a fetch on a deprecated endpoint
        if ('deprecated' in currentRequest && currentRequest.deprecated === true) {
            console.warn('This request is deprecated!');
            throw new Error('This request is deprecated!');
        }

        // if we need data but no data was given then we need to throw an error
        if (!body && currentRequest.requiresData) {
            throw new Error('No path was provided!');
        }

        // if we need data but no data was given then we need to throw an error
        if (
            queryOptions &&
            queryOptions.size <= 0 &&
            currentRequest.requiredQueryParams &&
            currentRequest.requiredQueryParams.length > 0
        ) {
            throw new Error('No query parameters were provided!');
        }

        // check if there isn't any missing query parameters in the path
        if (pathFormated.includes('{') || pathFormated.includes('}')) {
            throw new Error('Missing required query parameter in "pathFormated" query parameters');
        }
    }
}
