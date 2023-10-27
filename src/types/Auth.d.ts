declare namespace VRCAPI {
    /**
    * All the types for the `Authentication` endpoints are stocked here.
    */
    namespace Auth {

        namespace ResponseTypes {
            /**
             * UserExists: Status object representing if a queried user by username or userId exists or not. 
             * 
             * This model is primarily used by the /auth/exists endpoint, which in turn is used during registration. 
             */
            type checkUserExistResponse = {
                userExists: boolean
            }
            type verify2FATOTPResponse = {
                verified: boolean;
            }
            type verify2FAEmailResponse = {
                verified: boolean;
            }
            type verifyAuthTokenResponse = {
                ok: boolean,
                token: string
            }
        }

        namespace Requests {
            type checkUserExistOptions = {
                email?: string,
                displayName?: string,
                userId?: string,
                excludeUserId?: string
              }
        
              type verify2FACodeOptions = {
                code?: string,
                generateCode?: boolean
              }
        
              type verify2FAEmailOptions = {
                code?: string,
              }
        }

    
    }

}