import { VRCWrapper } from "./VRCWrapper";
import dotenv from "dotenv";
import { getVRCRankTags } from "./requests/UsersApi";
// import { GroupJoinState, GroupPrivacy, GroupRoleTemplate } from "./types/GroupsEnums";
// import { GroupJoinState, GroupPrivacy, GroupRoleTemplate } from "./types/GroupsEnums";
dotenv.config();



const vrchat = new VRCWrapper(process.env.VRCHAT_USERNAME || '', process.env.VRCHAT_PASSWORD || '');

// use an async main function
async function main() {
    
  await vrchat.authenticate()
  
  // Get Current User that is logged in
  const currentUser = await vrchat.authApi.getCurrentUser();
  console.log("Current user: ", currentUser);     
  console.log("Current user's Rank is:", getVRCRankTags(currentUser).rankName);
  
  // console.log("Current user's tags: ", currentUser.tags, "------------------");
    // Search users with query and quantity (min: 1, max: 100, default: 60) (WORKS)
    // const searchResultUsersByName = await vrchat.userApi.searchAllUsers({search:"test",quantity: 5});
    // console.log("Search result for Users with name 'test': ", searchResultUsersByName, "-------------------");

    // create a group (WORKS)
    // const group = await vrchat.groupApi.createGroup({name:"test2", description:"", shortCode:"TEST", roleTemplate:GroupRoleTemplate.Managed_Invite, joinState:GroupJoinState.Request, privacy:GroupPrivacy.Private});
    // console.log("Group created: ", group, "-------------------");

    // Get a Group by the ID (WORKS)
    // const group = await vrchat.groupApi.getGroupbyID({groupId:"grp_2cdec1ab-ef2a-4340-9537-cb50392d23bb"});
    // console.log("Group by ID: ", group, "-------------------");

    await groupAPITest();

    // Get a user by the User ID
    // const resultGetUserById = await vrchat.userApi.getUserById({userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797"})
    // console.log("User found by id: ", resultGetUserById);

    // Get a user's groups
    // const resultgetUserGroups = await vrchat.userApi.getUserGroups({userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797"})
    // console.log("User's groups by User ID: ", resultgetUserGroups, "-------------------");

    // Get a group by ID
    // const group = await vrchat.groupApi.getGroupbyID({groupId:"grp_3b8bf582-5dd9-4387-89e2-93bb521087b9"})
    // console.log("Group by ID: ", group, "-------------------");

    // get a group's audit's logs
    // const groupAuditLogs = await vrchat.groupApi.getGroupAuditLogs({groupId:"grp_3b8bf582-5dd9-4387-89e2-93bb521087b9"});
    // console.log("Group's audit logs: ", groupAuditLogs, "-------------------");
    

  }
  
main().then(() => {
    console.log("Done!");
   return true;
// eslint-disable-next-line promise/prefer-await-to-callbacks
}).catch((error: unknown) => {
    console.error("Error main: ", error);
});


export async function authenticationAPITest() {

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

export async function avatarAPITest() {

}

export async function favoriteAPITest() {

}

export async function filesAPITest() {

}

export async function friendAPITest() {

}

// todo to complete (all the test for group API)
export async function groupAPITest() {
  // Create a group (works)
  // const groupCreated = await vrchat.groupApi.createGroup({name:"test2!", description:"", shortCode:"TEST", roleTemplate:GroupRoleTemplate.Default, joinState:GroupJoinState.Closed, privacy:GroupPrivacy.Private});
  // console.log("Group created: ", groupCreated, "-------------------");
  // const groupID = "grp_4ab66841-7848-423c-86fd-474b618d6f6b";
  // const groupID = groupCreated.id;


  // getGroupById (works)
  // const groupById = await vrchat.groupApi.getGroupbyID({groupId:groupID});
  // console.log("Group by ID: ", groupById, "-------------------");

  // updateGroup (works)
  // const groupUpdate = await vrchat.groupApi.updateGroup({groupId:"grp_2cdec1ab-ef2a-4340-9537-cb50392d23bb", name:"Test Ultimate"});
  // console.log("Group updated: ", groupUpdate, "-------------------");


  // deleteGroup (works)
  // const groupDelete = await vrchat.groupApi.deleteGroup({groupId:groupID});
  // console.log("Group deleted: ", groupDelete, "-------------------");
  


  // getGroupAnnouncement (works)
  // const groupAnnouncement = await vrchat.groupApi.getGroupAnnouncement({groupId:groupID});
  // console.log("Group announcement: ", groupAnnouncement, "-------------------");
  


  // createGroupAnnouncement (works)
  // const groupAnnouncementCreated = await vrchat.groupApi.createGroupAnnouncement({groupId:groupID, title:"Test announcement", text:"This is a test announcement"});
  // console.log("Group announcement created: ", groupAnnouncementCreated, "-------------------");


  // deleteGroupAnnouncement (works)
  // const groupAnnouncementDeleted = await vrchat.groupApi.deleteGroupAnnouncement({groupId:groupID});
  // console.log("Group announcement deleted: ", groupAnnouncementDeleted, "-------------------");
  


  // getGroupAuditLogs (works)
  // const groupAuditLogs = await vrchat.groupApi.getGroupAuditLogs({groupId:groupID,n:3});
  // console.log("Group audit logs: ", groupAuditLogs.results, "-------------------");
  // console.log(groupAuditLogs.results[0].data);
  // console.log(groupAuditLogs.results[1].data);
  


  // getGroupBans (works)
  // const groupBans = await vrchat.groupApi.getGroupBans({groupId:groupID});
  // console.log("Group bans: ", groupBans, "-------------------");

  // banGroupMember (works)
  // const groupBan = await vrchat.groupApi.banGroupMember({groupId:groupID, userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797"});
  // console.log("Group ban: ", groupBan, "-------------------");

  // unbanGroupMember
  // const groupUnban = await vrchat.groupApi.unbanGroupMember({groupId:groupID, userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797"});
  // console.log("Group unban: ", groupUnban, "-------------------");

  // createGroupGallery (works, not all parameters tested)
  // const groupGalleryCreated = await vrchat.groupApi.createGroupGallery({groupId:groupID, name:"Test gallery", membersOnly:true,roleIdsToView:["grol_1d240566-0054-43fa-9b56-c66045fba890"]});
  // console.log("Group gallery created: ", groupGalleryCreated, "-------------------");

  // getGroupGalleryImages (works)
  // const groupGalleryImages = await vrchat.groupApi.getGroupGalleryImages({groupId:groupID, groupGalleryId:"ggal_9cd36317-c8a8-4b91-9b60-984e3f428afd"});
  // console.log("Group gallery images: ", groupGalleryImages, "-------------------");
  


  // banGroupMember
  


  // unbanGroupMember
  


  // createGroupGallery
  


  // getGroupGalleryImages
  


  // updateGroupGallery
  


  // deleteGroupGallery
  


  // addGroupGalleryImage
  


  // deleteGroupGalleryImage
  


  // getGroupInvitesSent
  


  // inviteUserToGroup
  


  // deleteUserInvite
  


  // joinGroup
  


  // leaveGroup
  


  // listGroupMembers
  


  // getGroupMember
  


  // updateGroupMember
  


  // kickGroupMember
  


  // addRoleToGroupMember
  


  // removeRoleFromGroupMember
  


  // listGroupPermissions
  


  // getGroupJoinRequests
  


  // cancelGroupJoinRequest
  


  // respondGroupJoinrequest
  


  // getGroupRoles
  


  // createGroupRole
  


  // updateGroupRole
  


  // deleteGroupRole
  
}

export async function instanceAPITest() {

}

export async function inviteAPITest() {

}

export async function notificationApiTest() {

}

export async function permissionAPITest() {

}

export async function moderationAPITest() {

}

export async function systemAPITest() {

}

export async function userAPITest() {
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

export async function worldAPITest() {

}