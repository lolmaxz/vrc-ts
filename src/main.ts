import { VRCWrapper } from "./AuthentificationHandler";
import dotenv from "dotenv";

dotenv.config();

function main() {
    const vrchat = new VRCWrapper(process.env.VRCHAT_USERNAME || '', process.env.VRCHAT_PASSWORD || '', true);
    // console.log(vrchat);
    
    vrchat.authenticate().then(() => {
        console.log("Authenticated!");
    }).catch((error) => {
        console.error("Authentification failed: ", error);
    });
    
}

main()