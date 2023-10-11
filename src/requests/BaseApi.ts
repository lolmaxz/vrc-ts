import { VRCWrapper } from "../VRCWrapper";
import { UserNotAuthenticated } from "../errors";
import { ApiPaths } from "../types/ApiPaths";


/**
 * This class is used to handle the base API requests. This class should not be used directly.
 */
export class BaseApi {
    baseClass: VRCWrapper;
    apiPath: APIPaths;
    headers: string[];
    options: RequestInit;
    currentRequest: subSectionType;
    currentQueryParams: {name: string; value: string}[] = [];
    currentQueryPathParams: QueryParamsList = [];

    constructor(baseClass: VRCWrapper) {
        this.baseClass = baseClass;
        this.apiPath = ApiPaths;
        this.headers = [];
        this.options = {};
        this.currentRequest = ApiPaths.api.base;
    }

    /**
     * Function to set the current request that we are going to execute.
     * @param request The request information that we are going to execute.
     */
    setCurrentRequest(request: subSectionType) {
        this.currentRequest = request;
    }

    /**
     * Function to set the current query parameters that we are going to use.
     * @param parameters  The path keys are the query parameters that are added to the path separated by a `&` symbol.
     */
    setQueryParameters(parameters: QueryParamsList) {
        this.currentQueryParams = parameters;
    }


    /**
     * Function to execute the request with the given parameters.
     * @param pathKeys  The path keys are the query parameters that are added to the path separated by a `&` symbol.
     * @param body The body is the data that is sent to the server.
     * @returns A promise that resolves to the data received from the server. If there is an error then it will throw an error. If there is no data then it will return an empty object.
     * @throws {UserNotAuthenticated} If the user is not authenticated. 
     */
    protected async executeRequest<E>(pathKeys?: string, body?: dataSetKeys): Promise<E> {
        // console.log(body);
        // console.log(pathKeys);
        // console.log(this.currentQueryParams);
        // console.log("currentRequest: ", this.currentRequest);
        
        

        // if the base class is not authenticated then we need to throw an error
        if (!this.baseClass.isAuthentificated) {
            throw new UserNotAuthenticated();
        }

        // make sure we aren't running a fetch on a deprecated endpoint
        if ('deprecated' in this.currentRequest && this.currentRequest.deprecated === true) {
            console.warn("This request is deprecated!");
            throw new Error("This request is deprecated!");
        }

        // if we need data but no data was given then we need to throw an error
        if (!body && this.currentRequest.requiresData) {
            throw new Error("No path was provided!");
        }

        // check url
        
        // url checking for keywords to change for query parameters

        if (this.currentRequest.requiredQueryParams) {
            // we make sure all required param are set in the query params variable
            for (const param of this.currentRequest.requiredQueryParams) {
                if (!this.currentQueryParams.find((element) => element.name === param)) {
                    throw new Error("Missing required query parameter: " + param);
                }
            }
        }
        // if all query parameters are present in the query params variable then we can replace them with our parameter from the template
        let currentPath = this.baseClass.basePath + this.currentRequest.path;

        if (this.currentQueryParams.length > 0) {
            // check for all required parameters from this.currentRequest.requestQueryParams
            for (const param of this.currentQueryParams) {
                currentPath = currentPath.replace(`{${param.name}}`, param.value);
            }
            // console.log(currentPath);
            
            if (currentPath.includes("{") || currentPath.includes("}")) {
                throw new Error("Missing required query parameter!");
            }
        }

        // now we add any path parameters
        if (pathKeys) {
            currentPath += "?" + pathKeys;
        }

        const url: URL = new URL(currentPath);

        // check headers
        const headers: headerOptions = {
            "User-Agent": this.baseClass.headerAgent // we set the User_Agent header
        }
        // headers["User-Agent"] = this.baseClass.headerAgent; 

        if (!this.currentRequest.cookiesNeeded.includes("none")) {
            headers["Cookie"] = ``;

            if (this.currentRequest.cookiesNeeded.includes("authorization")) {
                headers['Authorization'] = `Basic ${this.baseClass.getBase64Credentials()}`;
            }
            if (this.currentRequest.cookiesNeeded.includes("authCookie")) {
                headers["Cookie"] += `${this.baseClass.instanceCookie.getAuthCookie()} `;
            }
            if (this.currentRequest.cookiesNeeded.includes("twoFactorAuth")) {
                headers["Cookie"] += `${this.baseClass.instanceCookie.getTwoFactorAuthCookie()} `;
            }
        }
        
        // check options
        const options: VRCRequest = {
            method: this.currentRequest.method,
            headers: headers
        };
        if (body && this.currentRequest.requiresData) {
            options.body = JSON.stringify(body);
        }

        // call the fetch
        // console.log("-- BEFORE CALL --");
        // console.log("URL: ", url);
        // console.log("options: ", options);
        // console.log("-- END BEFORE CALL --");
        

        try {
            const response: API<E | RequestSuccess, RequestError> = await fetch(url, { ...options });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json() as E;
            
            return data;

        } catch (err) {
            console.error("Error executing request: ", err);
            if (err instanceof Error) {
                throw new Error(`Error executing request: ${err.message}`);
            }

        }
        return {} as E;
        // handle situations
        // return whatever we received if there is no error


    }
}