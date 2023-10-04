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
        super(); // Pass the message to the Error constructor
        this.name = 'CurrentUserObjectParseError'; // Set the name of the error
        this.errorList = errorList;
        Object.setPrototypeOf(this, CurrentUserObjectParseError.prototype); // Set the prototype explicitly for correct instanceof checks
        }
    
        logError(): void {
            // joined list of error to display
            const joinedList = this.errorList.join(', ');
            console.error(`${C.brightRed}[ PARSING ERROR ] [CURRENTUSER]${C.reset} - The following properties couldn't be parsed: ${joinedList}`);
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
        super(message); // Pass the message to the Error constructor
        this.name = 'RequestError'; // Set the name of the error
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, RequestError.prototype); // Set the prototype explicitly for correct instanceof checks
        }
    
        logError(): void {
            console.error(`${C.brightRed}[ ERROR ]${C.reset} - ${this.message} - Status Code: ${this.statusCode}`);
        }
    }