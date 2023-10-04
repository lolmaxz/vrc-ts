
import readline from 'readline';
import cookiesHandler from './VRCCookie';
import dotenv from 'dotenv';
dotenv.config();

export class BaseVRChatWrapper {
  // parameters
  username: string;
  password: string;
  public instanceCookie: cookiesHandler;
  rl: readline.Interface;
  isAuthentificated: boolean;
  static baseDomain: string = 'api.vrchat.cloud';

  /**
   * 
   * @param username Username of the VRChat account
   * @param password Password of the VRChat account
   */
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.isAuthentificated = false;
    this.instanceCookie = new cookiesHandler(this.username)

    
  }
}