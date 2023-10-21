import { Color as C } from './colors';
export class CookiesNotFound extends Error {
  constructor(message: string) {
    super(message); // Pass the message to the Error constructor
    this.name = 'CookiesNotFound'; // Set the name of the error
    Object.setPrototypeOf(this, CookiesNotFound.prototype); // Set the prototype explicitly for correct instanceof checks
  }

  logError(): void {
    console.error(`${C.brightRed}[ ERROR ]${C.reset} - ${this.message}`);
  }
}

export class CookiesUser404 extends Error {
  constructor(message: string) {
    super(message); // Pass the message to the Error constructor
    this.name = 'CookiesUser404'; // Set the name of the error
    Object.setPrototypeOf(this, CookiesUser404.prototype); // Set the prototype explicitly for correct instanceof checks
  }

  logError(): void {
    console.error(`${C.yellow}[ WARNING ]${C.reset} - ${this.message}`);
  }
}

// error reading the cookies
export class CookiesReadError extends Error {
  constructor(message: string) {
    super(message); // Pass the message to the Error constructor
    this.name = 'CookiesReadError'; // Set the name of the error
    Object.setPrototypeOf(this, CookiesReadError.prototype); // Set the prototype explicitly for correct instanceof checks
  }

  logError(): void {
    console.error(`${C.brightRed}[ ERROR ]${C.reset} - ${this.message}`);
  }
}

// error writing the cookies
export class CookiesWriteError extends Error {
  constructor(message: string) {
    super(message); // Pass the message to the Error constructor
    this.name = 'CookiesWriteError'; // Set the name of the error
    Object.setPrototypeOf(this, CookiesWriteError.prototype); // Set the prototype explicitly for correct instanceof checks
  }

  logError(): void {
    console.error(`${C.brightRed}[ ERROR ]${C.reset} - ${this.message}`);
  }
}

// error warning cookies expired
export class CookiesExpired extends Error {
  constructor(message: string) {
    super(message); // Pass the message to the Error constructor
    this.name = 'CookiesExpired'; // Set the name of the error
    Object.setPrototypeOf(this, CookiesExpired.prototype); // Set the prototype explicitly for correct instanceof checks
  }

  logError(): void {
    console.error(`${C.yellow}[ WARNING ]${C.reset} - ${this.message}`);
  }
}

// error loading cookies
export class CookiesLoadError extends Error {
  constructor(message: string) {
    super(message); // Pass the message to the Error constructor
    this.name = 'CookiesLoadError'; // Set the name of the error
    Object.setPrototypeOf(this, CookiesLoadError.prototype); // Set the prototype explicitly for correct instanceof checks
  }

  logError(): void {
    console.error(`${C.brightRed}[ ERROR ]${C.reset} - ${this.message}`);
  }
}

/**
 * @class CurrentUserObjectParseError
 * @description Error thrown when parsing the CurrentUserObject
 * @param errorList - list of properties that couldn't be parsed correctly `string[]`
 */
export class CurrentUserObjectParseError extends Error {
  errorList: string[];
  constructor(errorList: string[]) {
    super(
      `${C.brightRed}[ PARSING ERROR ] [CURRENTUSER]${
        C.reset
      } - The following properties couldn't be parsed: ${errorList.join(', ')}`,
    ); // Pass the message to the Error constructor
    this.name = 'CurrentUserObjectParseError'; // Set the name of the error
    this.errorList = errorList;
    Object.setPrototypeOf(this, CurrentUserObjectParseError.prototype); // Set the prototype explicitly for correct instanceof checks
  }
}

// error parsing LimitedUserObject
export class LimitedUserObjectParseError extends Error {
  errorList: string[];
  constructor(errorList: string[]) {
    super(
      `${C.brightRed}[ PARSING ERROR ] [LIMITEDUSER]${
        C.reset
      } - The following properties couldn't be parsed: ${errorList.join(', ')}`,
    ); // Pass the message to the Error constructor
    this.name = 'LimitedUserObjectParseError'; // Set the name of the error
    this.errorList = errorList;
    Object.setPrototypeOf(this, LimitedUserObjectParseError.prototype); // Set the prototype explicitly for correct instanceof checks
  }
}

// error parsing UserObject
export class UserObjectParseError extends Error {
  errorList: string[];
  constructor(errorList: string[]) {
    super(
      `${C.brightRed}[ PARSING ERROR ] [USER]${
        C.reset
      } - The following properties couldn't be parsed: ${errorList.join(', ')}`,
    ); // Pass the message to the Error constructor
    this.name = 'UserObjectParseError'; // Set the name of the error
    this.errorList = errorList;
    Object.setPrototypeOf(this, UserObjectParseError.prototype); // Set the prototype explicitly for correct instanceof checks
  }
}

// error parsing GroupObject
export class GroupObjectParseError extends Error {
  errorList: string[];
  constructor(errorList: string[]) {
    super(
      `${C.brightRed}[ PARSING ERROR ] [GROUP]${
        C.reset
      } - The following properties couldn't be parsed: ${errorList.join(', ')}`,
    ); // Pass the message to the Error constructor
    this.name = 'GroupObjectParseError'; // Set the name of the error
    this.errorList = errorList;
    Object.setPrototypeOf(this, GroupObjectParseError.prototype); // Set the prototype explicitly for correct instanceof checks
  }
}

// error 2fa TOTP required
export class TOTPRequired extends Error {
  constructor(message: string) {
    super(message); // Pass the message to the Error constructor
    this.name = 'TOTPRequired'; // Set the name of the error
    Object.setPrototypeOf(this, TOTPRequired.prototype); // Set the prototype explicitly for correct instanceof checks
  }

  logError(): void {
    console.error(`${C.yellow}[ WARNING ]${C.reset} - ${this.message}`);
  }
}

// request error with status code and message
export class RequestError extends Error {
    statusCode: number;
  constructor(statusCode: number, message: string) {
      super(`${C.brightRed}[ ERROR ]${C.reset} - ${message} - Status Code: ${statusCode}`); // Pass the message to the Error constructor
          this.statusCode = statusCode;
  }
}

// error user not authenticated yet
export class UserNotAuthenticated extends Error {
  constructor(message?: string) {
    super(
      message &&
        `${C.yellow}[ WARNING ]${C.reset} - User is not authenticated yet!`,
    );
  }
}
