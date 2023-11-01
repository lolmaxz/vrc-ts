import { VRChatAPI } from "../VRChatAPI";

export async function authenticationAPITest(vrchat: VRChatAPI) {

    // Check if a user exist
    const userExist = await vrchat.authApi.userExist({userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797",displayName:"test"});
    console.log("User exist: ", userExist, "-------------------");
  
    // Get Current User that is logged in
    const currentUser = await vrchat.authApi.getCurrentUser();
    console.log("Current user: ", currentUser);
  
    // Verify Auth token
    const verifyAuthToken = await vrchat.authApi.verifyAuthToken();
    console.log("Verify Auth token: ", verifyAuthToken, "-------------------");
  
    // Logout
    const logout = await vrchat.authApi.logout();
    console.log("Logout: ", logout, "-------------------");   
}