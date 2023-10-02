
import * as readline from 'readline';
import * as dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import * as tough from 'tough-cookie';
import * as axiosCookieJarSupport from 'axios-cookiejar-support';
import cookiesHandler, { SavedCookie } from './cookiesHandler';



dotenv.config();



// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class BaseVRChatWrapper {
  username: string;
  password: string;
  cookieJar: tough.CookieJar;
  public instanceCookie: cookiesHandler;
  rl: readline.Interface;
  manualCredentials: boolean;
  isAuthentificated: boolean;
  configuration: requestConfig;
  public axiosInstance: AxiosInstance;



  constructor(username: string, password: string, loadCookies: boolean = true) {
    this.username = username;
    this.password = password;
    this.cookieJar = new tough.CookieJar();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.manualCredentials = false;
    this.isAuthentificated = false;
    this.configuration = this.setConfiguration(username, password, loadCookies);

    // Check if cookies exist
    // try to load cookies if exist
    // check if user is listed in the
    const cookieJar = new tough.CookieJar();
    this.axiosInstance = axios.create({
      withCredentials: true,
    });

    // Applying the wrapper function to the axios instance
    const enhancedAxiosInstance = axiosCookieJarSupport.wrapper(this.axiosInstance);
    enhancedAxiosInstance.defaults.jar = cookieJar;

    this.instanceCookie = new cookiesHandler(cookieJar as unknown as SavedCookie[]);

    // we first check if we want cookies before trying to authenticate
    if (loadCookies) {
      if (this.instanceCookie.cookiesExist(this.username)) {
        try {
          // console.log(this.instanceCookie);

          this.instanceCookie.loadCookies(this.username, cookieJar);
          // console.log(this.instanceCookie);

          console.log('\x1b[32m🟢 Cookies found.\x1b[0m');
        } catch (error) {
          if (error instanceof Error) {
            console.error(
              `Error loading cookies for '${this.username}' : ${error.message}`,
            );
          } else {
            console.error('No cookies file found.');
          }
        }
      } else {
        console.log("\x1b[33mCookies not found for user '" + this.username + "'!\x1b[0m"); // throw error later on
      }
    }
    // We now have cookies or not so we can try to authenticate with the provided credentials and then handle 2FA if needed
    // console.log("cookies:",this.instanceCookie.getCookies());
    this.rl.close()

  }

  setConfiguration(username: string, password: string, loadCookies: boolean): requestConfig { // Replace return type with actual type
    let configuration;
    if (loadCookies) {
      configuration = {
        username: username,
        password: password,
        baseOptions: {
          headers: {
            "User-Agent":
              process.env.USER_AGENT || "ExampleApp/1.0.0 Email@example.com",
          },
          jar: this.cookieJar,
          withCredentials: true,
        },
      };
      // console.log(configuration);
    } else {
      configuration = {
        username: username,
        password: password,
        baseOptions: {
          headers: {
            "User-Agent":
              process.env.USER_AGENT || "ExampleApp/1.0.0 Email@example.com",
          },
          withCredentials: true,
        },
      };
    }

    return configuration;
  }


}