import { VRCWrapper } from "./VRCWrapper";
import dotenv from "dotenv";
dotenv.config();

// use an async main function
async function main() {
    
  const vrchat = new VRCWrapper();
  
  await vrchat.authenticate()
  
  // Get Current User that is logged in
  // const currentUser = await vrchat.authApi.getCurrentUser();
  // console.log("Current user: ", currentUser);     
  // console.log("Current user's Rank is:", getVRCRankTags(currentUser).rankName);  
  
  // Get avatar for the current user
  const ownAvatar = await vrchat.avatarApi.getOwnAvatar({userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797"});
  console.log("Current user's avatar: ", ownAvatar);

  }
  
main().then(() => {
    console.log("Done!");
   return true;
// eslint-disable-next-line promise/prefer-await-to-callbacks
}).catch((error: unknown) => {
    console.error("Error main: ", error);
});