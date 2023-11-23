import dotenv from "dotenv";
import { VRChatAPI } from "./VRChatAPI";
dotenv.config();

// This is an example file to show how to use the API.
async function main() {

  const vrchat = new VRChatAPI();

  await vrchat.login();

  // const currentUser = await vrchat.authApi.getCurrentUser();
  // console.log("Current user: ", currentUser);

  // const websocket = new WebSocketClient({vrchatAPI: vrchat, eventsToListenTo: [EventType.All], logAllEvents: true});


  // websocket.on(EventType.Friend_Request, (eventData: friendRequestNotification) => {
  //   console.log("A friend request was received by: " + eventData.senderUsername + " details: ", eventData.details);
  // });
}
main().then(() => {
  console.log("Done!");
  return true;
  // eslint-disable-next-line promise/prefer-await-to-callbacks
}).catch((error: unknown) => {
  console.error("Error main: ", error);
});
