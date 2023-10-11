import { VRCWrapper } from "./VRCWrapper";
import dotenv from "dotenv";
import {  getVRCRankName } from "./types/User";
dotenv.config();



const vrchat = new VRCWrapper(process.env.VRCHAT_USERNAME || '', process.env.VRCHAT_PASSWORD || '');

// use an async main function
async function main() {
    
  await vrchat.authenticate()
  
  // Get Current User that is logged in
  const currentUser = await vrchat.authApi.getCurrentUser();
  console.log("Current user: ", currentUser.displayName);     
  // console.log("Current user's tags: ", currentUser.tags);
  console.log("Current user's Rank is:", getVRCRankName(currentUser));

    // Search users with query and quantity (min: 1, max: 100, default: 60)
    // const searchResultUsersByName = await vrchat.userApi.searchAllUsers("test", 5);
    // console.log("Search result for Users with name 'test': ", searchResultUsersByName);

    // Get a user by the User ID
    // const resultGetUserById = await vrchat.userApi.getUserById("usr_e98ee7ac-2364-4669-b7ef-02991e40a797")
    // console.log("User found by id: ", resultGetUserById);

    // Get a user's groups
    const resultgetUserGroups = await vrchat.userApi.getUserGroups("usr_e98ee7ac-2364-4669-b7ef-02991e40a797")
    console.log("User found by id: ", resultgetUserGroups);

  }
  
main().then(() => {
    console.log("Done!");
   return true;
// eslint-disable-next-line promise/prefer-await-to-callbacks
}).catch((error: unknown) => {
    console.error("Error main: ", error);
});