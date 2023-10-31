import { VRCWrapper } from "../VRCWrapper";

export async function avatarsAPITest(vrchat: VRCWrapper) {

    // Examples of how to use the avatar API
  
    // Get own avatar
    const avatar = await vrchat.avatarApi.getOwnAvatar({ userId: "usr_e98ee7ac-2364-4669-b7ef-02991e40a797" });
    console.log("Own avatar: ", avatar, "-------------------");
  
    // Search avatars
    const searchAvatars = await vrchat.avatarApi.searchAvatars({ featured: false, n: 3 });
    console.log("Search avatars: ", searchAvatars, "-------------------");
  
    // Create avatar
    const createAvatar = await vrchat.avatarApi.createAvatar({ name: "Test avatar", description: "This is a test avatar", imageUrl: "image link here", version: 1, tags: ["test", "test2"] });
    console.log("Create avatar: ", createAvatar, "-------------------");
  
    // Get avatar by ID
    const avatarById = await vrchat.avatarApi.getAvatar({ avatarId: "avtr_2cdec1ab-ef2a-4340-9537-cb50392d23bb" });
    console.log("Avatar by ID: ", avatarById, "-------------------");
  
    // Update avatar
    const updateAvatar = await vrchat.avatarApi.updateAvatar({ avatarId: "avtr_2cdec1ab-ef2a-4340-9537-cb50392d23bb", name: "Test avatar 2", description: "This is a test avatar 2", imageUrl: "image link here", version: 1});
    console.log("Update avatar: ", updateAvatar, "-------------------");
  
    // Delete avatar
    const deleteAvatar = await vrchat.avatarApi.deleteAvatar({ avatarId: "avtr_2cdec1ab-ef2a-4340-9537-cb50392d23bb" });
    console.log("Delete avatar: ", deleteAvatar, "-------------------");
  
    // Select avatar
    const selectAvatar = await vrchat.avatarApi.selectAvatar({ avatarId: "avtr_2cdec1ab-ef2a-4340-9537-cb50392d23bb" });
    console.log("User changed avatar: ", selectAvatar, "-------------------");
  
    // Select Fallback avatar
    const selectFallbackAvatar = await vrchat.avatarApi.selectFallbackAvatar({ avatarId: "avtr_2cdec1ab-ef2a-4340-9537-cb50392d23bb" });
    console.log("User changed fallback avatar: ", selectFallbackAvatar, "-------------------");
  
    // List avatar favorites
    const listAvatarFavorites = await vrchat.avatarApi.listFavoritedAvatars({ userId: "usr_e98ee7ac-2364-4669-b7ef-02991e40a797" });
    console.log("List avatar favorites: ", listAvatarFavorites, "-------------------");
  
  }