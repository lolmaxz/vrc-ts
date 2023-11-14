import { VRChatAPI } from "./VRChatAPI";
import dotenv from "dotenv";
import { WebSocketClient } from "./requests/WebSocketApi";
dotenv.config();

// use an async main function
async function main() {

  const vrchat = new VRChatAPI();

  await vrchat.login();

  const currentUser = await vrchat.authApi.getCurrentUser();
  console.log("Current user: ", currentUser);

  new WebSocketClient(vrchat);
}

main().then(() => {
  console.log("Done!");
  return true;
  // eslint-disable-next-line promise/prefer-await-to-callbacks
}).catch((error: unknown) => {
  console.error("Error main: ", error);
});