import cookiesHandler, { CookieOpts, VRCCookie } from '../VRCCookie';
import { VRCWrapper } from '../VRCWrapper';
import { RequestError, UserNotAuthenticated } from '../errors';

/**
 * This class is used to handle the base API requests. This class should not be used directly.
 */
export class BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        this.baseClass = baseClass;
    }

    /**
     * Function to execute the request with the given parameters.
     * @param pathKeys  The path keys are the query parameters that are added to the path separated by a `&` symbol.
     * @param body The body is the data that is sent to the server.
     * @returns A promise that resolves to the data received from the server. If there is an error then it will throw an error. If there is no data then it will return an empty object.
     * @throws {UserNotAuthenticated} If the user is not authenticated.
     */
    protected async executeRequest<E>({ currentRequest,
        pathFormated,
        queryOptions,
        body
    }: VRCAPI.Generics.executeRequestType): Promise<E> {
    
        // if all query parameters are present in the query params variable then we can replace them with our parameter from the template
        const currentPath = this.baseClass.basePath + pathFormated;

        const url: URL = new URL(`${currentPath}${queryOptions ? "?" + queryOptions.toString() : ""}`);

        // check headers
        const headers: VRCAPI.Generics.headerOptions = {
            'User-Agent': this.baseClass.headerAgent, // we set the User_Agent header
        };

        if (!currentRequest.cookiesNeeded.includes('none')) {
            headers['Cookie'] = ``;

            if (currentRequest.cookiesNeeded.includes('authorization')) {
                headers['Authorization'] = `Basic ${this.baseClass.getBase64Credentials()}`;
            }
            if (currentRequest.cookiesNeeded.includes('authCookie')) {
                const authCookie = this.baseClass.instanceCookie.getAuthCookie();

                if (!authCookie) {
                    throw new Error('No Auth cookie was found! Please make sure you are logged in.');
                }

                headers['Cookie'] += `${authCookie} `;
            }
            if (currentRequest.cookiesNeeded.includes('twoFactorAuth')) {
                const twoFactorAuth = this.baseClass.instanceCookie.getTwoFactorAuthCookie();

                if (!twoFactorAuth) {
                    throw new Error('No 2FA cookie was found! Please make sure you are logged in.');
                }

                headers['Cookie'] += `${twoFactorAuth} `;
            }
        }

        const options: VRCAPI.Generics.VRCRequest = {
            method: currentRequest.method,
            headers: headers,
        };

        if (body && currentRequest.requiresData) {
            options.body = JSON.stringify(body);
        }

        // console.log("url: ", url);
        // console.log("options: ", options);

        

        const response: VRCAPI.Generics.API<E, RequestError> = await fetch(url, options);

        if (!response.ok) {
            // console.log("response: ", response);
            throw new RequestError(response.status, response.statusText);
        }
        
        if (pathFormated.includes('/auth/twofactorauth/')) {   
            if ('verified' in response && typeof response.verified === 'boolean') {
                if (response.verified) {
                    if (process.env.USE_COOKIES === "true") {
                        if (response.headers.has('set-cookie')) {
                            const cookies = response.headers.get('set-cookie');
                            // Parse the cookie string into a list of cookies
                            if (cookies === null) throw new Error('No cookies were set.');
                            const cookiesHandling: cookiesHandler = new cookiesHandler(process.env.VRCHAT_USERNAME || '');
                            await cookiesHandling.parseCookieString(cookies, VRCWrapper.baseDomain);
                            const cookiesFinal = cookiesHandling.getCookies() as CookieOpts[];
                            if (cookiesFinal.length !== 0) {
                                this.baseClass.instanceCookie.setCookies(this.baseClass.instanceCookie.getCookies().concat(cookiesFinal as VRCCookie[]));
                                await this.baseClass.instanceCookie.saveCookies();
                            }
                        }
                    }
                }
            }
        }

        return response.json();
    }

    checkValidData({
        currentRequest,
        pathFormated,
        queryOptions,
        body
    }: VRCAPI.Generics.executeRequestType) {

        // if the base class is not authenticated then we need to throw an error unless it's a 2FA authentication process!
        if (!this.baseClass.isAuthentificated) {
            if (!pathFormated.includes("/auth/twofactorauth")) {
                throw new UserNotAuthenticated();
            }
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

        // making sure we didn't send empty querryOptions to the server
        if (queryOptions && queryOptions.size <= 0) {
            throw new Error('No query parameters were provided!');
        }

        // check if there isn't any missing query parameters in the path
        if (pathFormated.includes('{') || pathFormated.includes('}')) {
            throw new Error('Missing required query parameter in "pathFormated" query parameters');
        }

    }
}
