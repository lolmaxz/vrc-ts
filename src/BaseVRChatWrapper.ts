
import * as readline from 'readline';
import * as dotenv from 'dotenv';
import cookiesHandler from './VRCCookie';
dotenv.config();

export class BaseVRChatWrapper {
  // parameters
  username: string;
  password: string;
  public instanceCookie: cookiesHandler;
  rl: readline.Interface;
  isAuthentificated: boolean;

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