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