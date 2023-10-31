import { Color as C } from './colors';

/**
 * Error thrown when the cookies couldn't be found.
 * @throws {CookiesNotFound}
 */
export class CookiesNotFound extends Error {
    constructor(message: string) {
        super(`${C.brightRed}[ ERROR ]${C.reset} - Cookies couldn't be found. - ${message}`); // Pass the message to the Error constructor
    }
}

/**
 * Error thrown when the user is not found in the cookies.
 * @throws {CookiesUser404}
 */
export class CookiesUser404 extends Error {
    constructor(message: string) {
        super(`${C.yellow}[ WARNING ]${C.reset} - Couldn't find user Cookies. - ${message}`); // Pass the message to the Error constructor
    }
}

/**
 * Error thrown when the cookies couldn't be read.
 * @throws {CookiesReadError}
 */
export class CookiesReadError extends Error {
    constructor(message: string) {
        super(`${C.brightRed}[ ERROR ]${C.reset} - Cookies couldn't be read! - ${message}`); // Pass the message to the Error constructor
    }
}

/**
 * Error thrown when the cookies couldn't be written.
 * @throws {CookiesWriteError}
 */
export class CookiesWriteError extends Error {
    constructor(message: string) {
        super(`${C.brightRed}[ ERROR ]${C.reset} - Couldn't write cookies! - ${message}`); // Pass the message to the Error constructor
    }
}

/**
 * Error thrown when the cookies are expired.
 * @throws {CookiesExpired}
 */
export class CookiesExpired extends Error {
    constructor(message: string) {
        super(`${C.yellow}[ WARNING ]${C.reset} - Cookies are expired, ${message}`); // Pass the message to the Error constructor
    }
}

/**
 * Error thrown when the cookies couldn't be loaded.
 * @throws {CookiesLoadError}
 */
export class CookiesLoadError extends Error {
    constructor(message: string) {
        super(`${C.brightRed}[ ERROR ]${C.reset} - Cookies couldn't be loaded, ${message}`); // Pass the message to the Error constructor
    }
}

/**
 * Error thrown when the TOTP is required.
 * @throws {TOTPRequired}
 */
export class TOTPRequired extends Error {
    constructor(message: string) {
        super(`${C.yellow}[ WARNING ]${C.reset} - TOTP is Required! - ${message}`); // Pass the message to the Error constructor
    }
}

/**
 * Error thrown when the Email Otp is required
 * @throws {EmailOtpRequired}
 */
export class EmailOtpRequired extends Error {
    constructor(message: string) {
        super(`${C.yellow}[ WARNING ]${C.reset} - Email Otp is Required! - ${message}`); // Pass the message to the Error constructor
    }
}

/**
 * Error thrown when the request failed. Includes the status code and the message.
 * @throws {RequestError}
 */
export class RequestError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(`${C.brightRed}[ ERROR ]${C.reset} - ${message} - Status Code: ${statusCode}`); // Pass the message to the Error constructor
        this.statusCode = statusCode;
    }
}

/**
 * Error when the user is not authenticated.
 * @throws {UserNotAuthenticated}
 */
export class UserNotAuthenticated extends Error {
    constructor(message?: string) {
        super(
            message &&
            `${C.yellow}[ WARNING ]${C.reset} - User is not authenticated yet!`,
        );
    }
}

/**
 * Error when the request is missing a parameter or the parameter is invalid.
 * @throws {BadRequestParameter}
 */
export class BadRequestParameter extends Error {
    constructor(message?: string) {
        super(message && `${C.yellow}[ WARNING ]${C.reset} - Bad request parameter: ${message}`,);
    }
}