import { VRChatAPI } from "./VRChatAPI";
import dotenv from "dotenv";
import { getVRCRankTags } from "./requests/UsersApi";
dotenv.config();

// use an async main function
async function main() {
    
  const vrchat = new VRChatAPI();

  await vrchat.login();
  
  // Get Current User that is logged in
  const currentUser = await vrchat.authApi.getCurrentUser();
  console.log("Current user: ", currentUser);     
  console.log("Current user's Rank is:", getVRCRankTags(currentUser).rankName);  
  
  // Get avatar for the current user
  // const ownAvatar = await vrchat.avatarApi.getOwnAvatar({userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797"});
  // console.log("Current user's avatar: ", ownAvatar);

  // Get user by id WORKS
  const user = await vrchat.userApi.getUserById({userId:"usr_e8aa9b59-3041-4a1f-8cce-3e274bed925e"});
  console.log("User: ", user);

  }
  
main().then(() => {
    console.log("Done!");
   return true;
// eslint-disable-next-line promise/prefer-await-to-callbacks
}).catch((error: unknown) => {
    console.error("Error main: ", error);
});