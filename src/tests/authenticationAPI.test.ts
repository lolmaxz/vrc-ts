import { EmailOtpRequired, InvalidUserAgent, TOTPRequired } from '../errors';
import { VRChatAPI } from '../VRChatAPI';

// export async function authenticationAPITest(vrchat: VRChatAPI) {

//     // Check if a user exist
//     const userExist = await vrchat.authApi.userExist({userId:"usr_e98ee7ac-2364-4669-b7ef-02991e40a797",displayName:"test"});
//     console.log("User exist: ", userExist, "-------------------");

//     // Get Current User that is logged in
//     const currentUser = await vrchat.authApi.getCurrentUser();
//     console.log("Current user: ", currentUser);

//     // Verify Auth token
//     const verifyAuthToken = await vrchat.authApi.verifyAuthToken();
//     console.log("Verify Auth token: ", verifyAuthToken, "-------------------");

//     // Logout
//     const logout = await vrchat.authApi.logout();
//     console.log("Logout: ", logout, "-------------------");
// }

describe('Authentication API Test', () => {
    let originalConsoleLog: typeof console.log;

    beforeAll(() => {
        // Save the original console.log
        originalConsoleLog = console.log;
        // Mock console.log to prevent output during the test
        console.log = jest.fn();
    });

    afterAll(() => {
        // Restore the original console.log
        console.log = originalConsoleLog;
    });

    test('Authentication API Test with Wrong Username/Password', async () => {
        const vrchat = new VRChatAPI({
            username: 'wrong',
            password: 'wrong',
            userAgent: 'ExampleApp/1.0.0 Email@example.com',
        });
        await expect(async () => {
            await vrchat.login();
        }).rejects.toThrow(Error);
    });

    test('Authentication API Test with Wrong User Agent', async () => {
        const vrchat = new VRChatAPI({
            username: 'wrong',
            password: 'wrong',
            userAgent: 'ExampleProgram/0.0.1 my@email.com',
        });
        await expect(async () => {
            await vrchat.login();
        }).rejects.toThrow(InvalidUserAgent);
    });
});

describe('Authentication Expected to get 2FA', () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
        // Spy on console.log
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore original console.log
        consoleLogSpy.mockRestore();
    });

    test('Should Receive Request to TOTP', async () => {
        const vrchat = new VRChatAPI({
            username: process.env.VRC_ACCOUNT_TOTP_USERNAME,
            password: process.env.VRC_ACCOUNT_TOTP_PASSWORD,
            userAgent: 'ExampleApp/1.0.0 Email@example.com',
        });
        await expect(async () => {
            await vrchat.login();
        }).rejects.toThrow(TOTPRequired);
    });

    test('Should Receive Request to Email OTP', async () => {
        const vrchat = new VRChatAPI({
            username: process.env.VRC_ACCOUNT_EMAIL_OTP_USERNAME,
            password: process.env.VRC_ACCOUNT_EMAIL_OTP_PASSWORD,
            userAgent: 'ExampleApp/1.0.0 Email@example.com',
        });
        await expect(async () => {
            await vrchat.login();
        }).rejects.toThrow(EmailOtpRequired);
    });
});
