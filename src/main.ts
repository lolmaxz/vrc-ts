import { VRChatAPI } from "./VRChatAPI";
import dotenv from "dotenv";
// import { getVRCRankTags } from "./requests/UsersApi";
// import { VRCRanks } from "./types/UsersEnums";
import { WebSocketClient } from "./requests/WebSocketApi";
// import { WebSocketClient } from "./requests/WebSocketApi";
// import { getVRCRankTags } from "./requests/UsersApi";
dotenv.config();

// use an async main function
async function main() {
    
  const vrchat = new VRChatAPI();

  await vrchat.login();
  // const currentUser = await vrchat.authApi.getCurrentUser();
  
new WebSocketClient(vrchat);
// console.log(await vrchat.avatarApi.getAvatar({avatarId:"avtr_353e04cc-d5e4-4292-8a05-4b034c9dfe9e"}));


  
  // Get Current User that is logged in
  // console.log("Current user: ", currentUser);     
  // console.log("Current user's Rank is:", getVRCRankTags(currentUser).rankName);  
  // if (currentUser.tags.includes(VRCRanks.Visitor)) {
  //   currentUser.tags.push("Visitor")
  // }
  
  // Get avatar for the current user
  // const ownAvatar = await vrchat.avatarApi.getOwnAvatar({userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797"});
  // console.log("Current user's avatar: ", ownAvatar);

  // Get user by id WORKS
  // const user = await vrchat.userApi.getUserById({userId:"usr_e8aa9b59-3041-4a1f-8cce-3e274bed925e"});
  // console.log("User: ", user);

  }
  
main().then(() => {
    console.log("Done!");
   return true;
// eslint-disable-next-line promise/prefer-await-to-callbacks
}).catch((error: unknown) => {
    console.error("Error main: ", error);
});