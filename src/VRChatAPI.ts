import { Color as C } from './colors';
import {
    CookiesExpired,
    CookiesNotFound,
    CookiesUser404,
    EmailOtpRequired,
    InvalidUserAgent,
    TOTPRequired,
} from './errors';
import { AuthApi } from './requests/AuthApi';
import { AvatarsApi } from './requests/AvatarsApi';
import { BetaApi } from './requests/BetaApi';
import { EconomyApi } from './requests/EconomyApi';
import { FavoritesApi } from './requests/FavoritesApi';
import { FilesApi } from './requests/FilesApi';
import { FriendsApi } from './requests/FriendsApi';
import { GroupsApi } from './requests/GroupsApi';
import { InstanceApi } from './requests/InstancesApi';
import { InvitesApi } from './requests/InvitesApi';
import { JamsApi } from './requests/JamsApi';
import { NotificationsApi } from './requests/NotificationsApi';
import { PermissionsApi } from './requests/PermissionsApi';
import { PlayerModerationApi } from './requests/PlayerModerationApi';
import { PrintsApi } from './requests/PrintsApi';
import { SystemApi } from './requests/SystemApi';
import { UsersApi } from './requests/UsersApi';
import { WorldsApi } from './requests/WorldsApi';
import { ApiPaths } from './types/ApiPaths';
import { CurrentUser, currentUserOrTwoFactorType } from './types/Users';
import cookiesHandler from './VRCCookie';

export type VRCApiParams = {
    username?: string;
    password?: string;
    userAgent?: string;
    EmailOTPCode?: string;
    TOTPCode?: string;
    TwoFactorAuthSecret?: string;
    useCookies?: boolean;
    cookiePath?: string;
};

/**
 * This class is used to authenticate the user and get the current user information.
 * @export
 * @class VRCWrapper
 */
export class VRChatAPI {
    username: string;
    password: string;
    public instanceCookie: cookiesHandler;
    isAuthentificated: boolean;
    static baseDomain: string = 'api.vrchat.cloud';
    public static ApiBaseUrl: string = 'https://api.vrchat.cloud/api/1';
    headerAgent: string = process.env.USER_AGENT || 'ExampleProgram/0.0.1 my@email.com';
    basePath: string = ApiPaths.apiBasePath;
    basePath2: string = ApiPaths.apiBasePath;
    cookiesLoaded = false;
    currentUser: CurrentUser | null = null;
    TOTPCode: string = process.env.TOTP_2FA_CODE || '';
    EmailOTPCode: string = process.env.EMAIL_2FA_CODE || '';
    TwoFactorAuthSecret = process.env.VRCHAT_2FA_SECRET || '';
    useCookies: boolean = process.env.USE_COOKIES === 'true' || false;

    authApi: AuthApi = new AuthApi(this);
    avatarApi: AvatarsApi = new AvatarsApi(this);
    betaApi: BetaApi = new BetaApi(this);
    economyApi: EconomyApi = new EconomyApi(this);
    favoriteApi: FavoritesApi = new FavoritesApi(this);
    fileApi: FilesApi = new FilesApi(this);
    friendApi: FriendsApi = new FriendsApi(this);
    groupApi: GroupsApi = new GroupsApi(this);
    instanceApi: InstanceApi = new InstanceApi(this);
    inviteApi: InvitesApi = new InvitesApi(this);
    jamApi: JamsApi = new JamsApi(this);
    notificationApi: NotificationsApi = new NotificationsApi(this);
    permissionApi: PermissionsApi = new PermissionsApi(this);
    playermoderationApi: PlayerModerationApi = new PlayerModerationApi(this);
    printsApi: PrintsApi = new PrintsApi(this);
    systemApi: SystemApi = new SystemApi(this);
    userApi: UsersApi = new UsersApi(this);
    worldApi: WorldsApi = new WorldsApi(this);

    constructor({
        username,
        password,
        userAgent,
        EmailOTPCode,
        TOTPCode,
        TwoFactorAuthSecret,
        useCookies,
        cookiePath,
    }: VRCApiParams) {
        if (username) {
            this.username = username;
        } else {
            this.username = process.env.VRCHAT_USERNAME || '';
        }
        if (password) {
            this.password = password;
        } else {
            this.password = process.env.VRCHAT_PASSWORD || '';
        }

        if (userAgent) {
            this.headerAgent = userAgent;
        }

        if (EmailOTPCode) {
            this.EmailOTPCode = EmailOTPCode;
        } else {
            this.EmailOTPCode = process.env.EMAIL_2FA_CODE || '';
        }

        if (TOTPCode) {
            this.TOTPCode = TOTPCode;
        } else {
            this.TOTPCode = process.env.TOTP_2FA_CODE || '';
        }

        if (TwoFactorAuthSecret) {
            this.TwoFactorAuthSecret = TwoFactorAuthSecret;
        } else {
            this.TwoFactorAuthSecret = process.env.VRCHAT_2FA_SECRET || '';
        }

        if (useCookies) {
            this.useCookies = useCookies;
        } else {
            this.useCookies = process.env.USE_COOKIES === 'true' || false;
        }

        this.isAuthentificated = false;
        this.instanceCookie = new cookiesHandler({
            username: this.username,
            cookieFilePath: cookiePath || './cookies.json',
            vrcApi: this,
            cookies: [],
        });
    }

    async login() {
        console.log(`Authenticating with username: ${this.username}...`);

        if (this.useCookies) {
            try {
                await this.instanceCookie.cookiesExist();
                await this.instanceCookie.loadCookies();
                this.cookiesLoaded = true;
                const validAuth = this.instanceCookie.getAuthCookie();
                if (!validAuth) {
                    this.cookiesLoaded = false;
                }
            } catch (error) {
                this.cookiesLoaded = false;
                if (error instanceof CookiesExpired) {
                    console.error(`${C.yellow} [WARNING]${C.r} - Cookies are expired, a new session will be created.`);
                } else if (error instanceof CookiesNotFound) {
                    this.cookiesLoaded = false;
                } else if (error instanceof CookiesUser404) {
                    console.warn('Cookies for this user were not found, creating new cookies...');
                    this.cookiesLoaded = false;
                } else if (error instanceof Error) {
                    console.error('Error loading cookies: ', error.message);
                } else {
                    console.error('Unknown error loading cookies!');
                }
            }
        } else {
            this.instanceCookie = new cookiesHandler({
                username: this.username,
                cookieFilePath: '',
                vrcApi: this,
                cookies: [],
            });
        }

        try {
            // we first try to login or get current user
            const getCurrentUser = await this.authApi.getCurrentUser<currentUserOrTwoFactorType>();
            // if current user is not null or undefined and is of type CurrentUser then we are logged in
            // console.log("getCurrentUser: ", getCurrentUser);

            if ('displayName' in getCurrentUser) {
                this.isAuthentificated = true;
                this.currentUser = getCurrentUser;
                console.log(`${C.green}Logged in as: ${C.r}`, getCurrentUser.displayName);
                return;
            } else if ('verified' in getCurrentUser && !getCurrentUser.verified) {
                this.isAuthentificated = false;
                this.currentUser = null;
            } else if ('error' in getCurrentUser) {
                const loginError = getCurrentUser.error;
                if (loginError.status_code === 401) {
                    if (loginError.message.includes('somewhere new')) {
                        console.warn(
                            'It seems you are logging in from a new location, please check your email for a Authorization Link! Then instantiate the API again.'
                        );
                        this.isAuthentificated = false;
                        this.currentUser = null;
                        return;
                    }
                }
            } else {
                console.log('2FA required, attempt to login using 2FA authentication...');

                // If we are not logged in then we try to login
                if (getCurrentUser.requiresTwoFactorAuth) {
                    if (this.arraysAreEqual(getCurrentUser.requiresTwoFactorAuth, ['emailOtp'])) {
                        // If we can't login we check if it's because of email otp
                        const verify = await this.authApi.verify2FAEmailCode();

                        // if after verifying email otp we are verified then we are logged in and we set isAuthentificated to true, otherwise we throw an error
                        if (!verify.verified) {
                            this.isAuthentificated = false;
                            this.currentUser = null;
                            console.log(
                                '2FA emailOtp required, attempt to login using 2FA email Otp authentication...'
                            );
                            throw new EmailOtpRequired(
                                '\nTIPS: Add/Update your Email code inside the .env file.\nYou might have received the code by Email!'
                            );
                        }

                        // this should always be true normally if authentication with email was successful at this point.
                        if (this.EmailOTPCode) await this.instanceCookie.addEmailCode();
                        console.log('Email OTP verified! Authentication successful!');

                        this.isAuthentificated = true;
                    } else if (this.arraysAreEqual(getCurrentUser.requiresTwoFactorAuth, ['totp', 'otp'])) {
                        // if we can't login we check if it's because of totp
                        const verify = await this.authApi.verify2FACodeTOTP();

                        // if we can login then we are logged in and we set isAuthentificated to true, otherwise we throw an error
                        if (!verify.verified) {
                            this.isAuthentificated = false;
                            this.currentUser = null;
                            throw new TOTPRequired(
                                "Authentication failed! TOTP authentication didn't work. Check your credentials or your TOTP code/secret in your .env file."
                            );
                        }
                        console.log('TOTP verified! Authentication successful!');
                        this.isAuthentificated = true;
                    }
                }
            }

            if (this.isAuthentificated) {
                const currentUser = await this.authApi.getCurrentUser();
                this.currentUser = currentUser;
                console.log(`${C.green}Logged in as: ${C.r}`, currentUser.displayName);
                return;
            }
        } catch (error) {
            if (error instanceof EmailOtpRequired) {
                throw new EmailOtpRequired(error.message);
            } else if (error instanceof TOTPRequired) {
                throw new TOTPRequired(error.message);
            } else if (error instanceof Error) {
                // check if message is contains 401
                if (error.message.includes('401')) {
                    throw new Error('Invalid Username/Email or Password | Missing Credentials');
                } else if (error.message.includes('403')) {
                    if (error.message.includes('please identify yourself with a properly formatted user-agent')) {
                        throw new InvalidUserAgent('Invalid User-Agent');
                    } else {
                        throw new Error(error.message);
                    }
                } else {
                    throw new Error(error.message);
                }
            } else {
                throw new Error('Unknown error!');
            }
        }
    }

    arraysAreEqual<T>(array1: T[], array2: T[]): boolean {
        if (array1.length !== array2.length) return false;

        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) return false;
        }

        return true;
    }

    // function get the base64 encoded string of the username and password with a semi-colon in between
    getBase64Credentials(): string {
        const encodedUsername = encodeURIComponent(this.username);
        const encodedPassword = encodeURIComponent(this.password);
        const authString = Buffer.from(`${encodedUsername}:${encodedPassword}`).toString('base64');
        return authString;
    }
}
