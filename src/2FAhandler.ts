import * as readline from 'readline';

// function handle2FA_TOTP(rl:readline.Interface) {

// }

function handle2FA(rl:readline.Interface) {
    rl.question("\x1b[4mEnter 2FA code:\x1b[0m", (code) => {
        console.log(code);
        // code to make request here

        
    //   this.authApi
    //     .verify2FA({ code: code })
    //     .then((response) => {
    //       if (response.data && response.data.verified) {
    //         this.saveCookies();
    //         rl.close();
    //         if (retry) {
    //           this.authenticate();
    //         }
    //       } else {
    //         console.error(
    //           "2FA Verification Error:",
    //           error.response.status,
    //           error.response.statusText
    //         );
    //         this.errorMenu();
    //       }
    //     })
    //     .catch((error) => {
    //         if (error.response.status === 429) {
    //             console.error('\x1b[31mToo Many Requests: Please wait before trying again.\x1b[0m');
    //             this.errorMenu();
    //           } 
    //       this.errorMenu();
    //     });
    });
  }

  export default handle2FA; 