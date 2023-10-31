import { VRChatAPI } from "../VRChatAPI";

export async function groupAPITest(vrchat: VRChatAPI) {
    // Create a group (works)
    // const groupCreated = await vrchat.groupApi.createGroup({name:"test2!", description:"", shortCode:"TEST", roleTemplate:GroupRoleTemplate.Default, joinState:GroupJoinState.Closed, privacy:GroupPrivacy.Private});
    // console.log("Group created: ", groupCreated, "-------------------");
    // const groupID = "grp_4ab66841-7848-423c-86fd-474b618d6f6b";
    // const groupID = groupCreated.id;
  
  
    // getGroupById (works)
    const groupById = await vrchat.groupApi.getGroupbyID({groupId:"grp_2cdec1ab-ef2a-4340-9537-cb50392d23bb"});
    console.log("Group by ID: ", groupById, "-------------------");
  
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