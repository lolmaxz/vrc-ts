import { VRCWrapper } from "../VRCWrapper";

export async function userAPITest(vrchat: VRCWrapper) {
    // search User
    const searchUser = await vrchat.userApi.searchAllUsers({search:"test",quantity: 5});
    console.log("Search result for Users with name 'test': ", searchUser, "-------------------");
  
    // get User by ID
    const userById = await vrchat.userApi.getUserById({userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797"})
    console.log("User found by id: ", userById);
  
    // update User
    const userUpdate = await vrchat.userApi.updateUserInfo({userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797", email:" ", birthday:"1993-10-07"});
    console.log("User updated: ", userUpdate, "-------------------");
  
    // get User's groups
    const userGroups = await vrchat.userApi.getUserGroups({userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797"})
    console.log("User's groups by User ID: ", userGroups, "-------------------");
  
    // get User's Group Requests
    const userGroupRequests = await vrchat.userApi.getUserGroupRequests({userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797"})
    console.log("User's group requests by User ID: ", userGroupRequests, "-------------------");
  }