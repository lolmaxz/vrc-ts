// import * as readline from 'readline';
// import { cookiesHandler } from './cookiesHandler';
// import { AxiosInstance } from 'axios';
// import { AxiosResponse } from 'axios';
// import { AxiosResponse } from 'axios';
import { BaseVRChatWrapper } from './BaseVRChatWrapper';
import { AuthenticationResponse } from './types/requestConfig';
// import { AuthenticationResponse } from './types/requestConfig';


// Function to handle authentification and 2FA verification
export class VRCWrapper extends BaseVRChatWrapper {
    baseURL: string = 'https://api.vrchat.cloud/api/1/';

    constructor(username: string, password: string, loadCookies:boolean = true) {
        super(username, password, loadCookies);
        console.log(super.cookieJar);
        
    }

    async authenticate() {


        try {
            console.log(super.cookieJar);
            
            const response = await super.axiosInstance.get('https://api.vrchat.cloud/api/1/auth/user', {
              headers: {
                Authorization: `Basic ${Buffer.from(`${encodeURIComponent(super.username)}:${encodeURIComponent(super.password)}`).toString('base64')}`, // Replace with actual credentials
              },
            });
      
            const data = response.data as AuthenticationResponse;
            // Handle the response data here
            if (data.displayName) {
                console.log('\x1b[32m🟢 Successfully logged in as: \x1b[1m' + data.displayName + '\x1b[0m');
                return;
            }

            if (data.requiresTwoFactorAuth) {
              if (data.requiresTwoFactorAuth.includes('totp') || data.requiresTwoFactorAuth.includes('otp')) {
                console.log('Handling TOTP or OTP two-factor authentication...');
                // Handle the 'totp' or 'otp' two-factor authentication case
              } else if (data.requiresTwoFactorAuth.includes('emailOtp')) {
                console.log('Handling Email OTP two-factor authentication...');
                
                // Handle the 'emailOtp' two-factor authentication case
              }
            }
            // ... other logic to handle the response ...
      
          } catch (error) {
            if (error instanceof Error) {
            console.error('Axios error: ', error.message); // Log any axios or network errors
            } else {
            console.error('Unknown error: ', error);

          }
        }


        // If we are here, Cookies couldn't be used so we need to authenticate
        // console.log(super.username);
        // console.log(super.rl);
        // console.log("This will now authenticate!");
        
        // try to authenticate normally
            // if it fails, check if it's because of 2FA
            // if it's because of email 2FA, ask for code sent to email
            // if it's because of TOTP, try to check if we have a TOTP secret
                // if we don't, ask for code
            // if it's because of TOTP and we have a TOTP secret, try to use it
                // if it fails, ask for code
                // if it succeeds, save cookies and exit
        
        // code here
        // getCurrent user fetch
         // check result
        

         

        // Encode username and password and create Basic Auth string
    //     const encodedUsername = encodeURIComponent(this.username);
    //     const encodedPassword = encodeURIComponent(this.password);
    //     const base64Credentials = Buffer.from(`${encodedUsername}:${encodedPassword}`).toString('base64');
    //     const headers = {
    //     'Authorization': `Basic ${base64Credentials}`
    //     };

    //     try {
    //     const response = await fetch(this.baseURL+"auth/user", { method: 'GET', headers: headers });

    //     // Check if response is ok (status code in the range 200-299)
    //     console.log("Response: ",response);
    //     if (!response.ok) {
    //         console.log("Response: ",response);
    //         throw new Error(`HTTP error! Status: ${response.status}`);

    //     }

    //     const data: AuthenticationResponse = await response.json() as AuthenticationResponse;
    //     console.log("data: ",data); // Log the response data

    //     // Handle special cases
        
    //   if (data.requiresTwoFactorAuth) {
    //     if (data.requiresTwoFactorAuth.includes('totp') || data.requiresTwoFactorAuth.includes('otp')) {
    //       // Handle the 'totp' and 'otp' case
    //       console.log('Handling TOTP or OTP two-factor authentication...');
    //       // Add your handling code here

    //     } else if (data.requiresTwoFactorAuth.includes('emailOtp')) {
    //       // Handle the 'emailOtp' case
    //       console.log('Handling Email OTP two-factor authentication...');
    //       // Add your handling code here
    //     } else {
    //       // Handle other unknown two-factor authentication methods
    //       console.warn('Unknown two-factor authentication method received:', data.requiresTwoFactorAuth);
    //     }
    //   } else {
    //     // Handle the case where no two-factor authentication is required
    //     console.log('No two-factor authentication required.');
    //     // Add your handling code here
    //   }
    

    //     } catch (error) {
    //         if (error instanceof Error) {
    //     // console.error('Fetch error: ', error.message); // Log any fetch or network errors
    //     // check if message is contains 401
    //     if (error.message.includes("401")) {
    //         throw new Error("Invalid Username/Email or Password | Missing Credentials");
    //     }
    //     } else {
    //     console.error('Unknown error: ', error);
    //     }
    // }

    // We first try to authenticate with the provided credentials and then handle 2FA if needed
    // this.authApi
    //   .getCurrentUser()
    //   .then((response) => {
    //     if (response.data && response.data.displayName) {
    //         console.log('\x1b[32m🟢 Successfully logged in as: \x1b[1m' + response.data.displayName + '\x1b[0m');
    //       let saveResult = this.saveCookies();
    //       if (saveResult === "errorSavingCookies") {
    //         console.warn('\x1b[33m\x1b[1mCookies failed to be saved, be careful before you run this script again.\x1b[0m');
    //       }
    //       rl.close();
    //     } else {
    //       // If we don't have a display name, we need to check why?
    //       // Handle invalid username/password
    //       if (
    //         response.data?.data?.error?.message.includes(
    //           "Invalid Username/Email or Password"
    //         )
    //       ) {
    //         console.error('\x1b[31mInvalid Username/Email or Password. Please try again.\x1b[0m');
    //         this.requestCredentials();
    //       }
    //       // Handle 2FA requirement
    //       else if (
    //         response.data?.requiresTwoFactorAuth &&
    //         response.data?.requiresTwoFactorAuth.includes("emailOtp")
    //       ) {
    //         console.log('\x1b[33mTwo-factor authentication is required. Please enter the code sent to your email.\x1b[0m');
    //         this.handle2FA(true);
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       if (error.response.status === 401) {
    //         if (
    //           error.response.data &&
    //           error.response.data.error &&
    //           error.response.data.error.message
    //         ) {
    //           // Handle invalid username/password
    //           if (
    //             error.response.data.error.message.includes(
    //               "Invalid Username/Email or Password"
    //             )
    //           ) {
    //             console.error('\x1b[31mInvalid Username/Email or Password. Please try again.\x1b[0m');
    //             this.requestCredentials();
    //           }
    //           // Handle 2FA requirement
    //           else if (
    //             error.response.data.requiresTwoFactorAuth &&
    //             error.response.data.requiresTwoFactorAuth.includes("emailOtp")
    //           ) {
    //             console.log('\x1b[33mTwo-factor authentication is required. Please enter the code sent to your email.\x1b[0m');
    //             this.handle2FA(true);
    //           }
    //         }
    //       } else if (error.response.status === 429) {
    //         console.error(
    //           "Too Many Requests: Please wait before trying again."
    //         );
    //         // this.errorMenu();
    //       } else {
    //         console.error(
    //           "Authentication Failed:",
    //         //   error.response.status,
    //         //   error.response.statusText
    //         );
    //       }
    //     } else {
    //       console.error("Network or other error:", error);
    //     }
    //   });
  }
}