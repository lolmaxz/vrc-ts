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
        const vrchat = new VRChatAPI('', '');
        await expect(async () => {
            await vrchat.login();
        }).rejects.toThrow(Error);
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
        // Example function that logs multiple messages
        async function logMessages() {
            const vrchat = new VRChatAPI(process.env.VRC_ACCOUNT_TOTP_USERNAME, process.env.VRC_ACCOUNT_TOTP_PASSWORD);
            // await expect(async () => {

            // }).rejects.toThrow(TOTPRequired);
            await vrchat.login();
        }

        // Call the function
        await logMessages();

        // Define the type for each call
        type ConsoleLogCall = [string | Error];

        // Type-safe extraction of logged messages
        const allLogs: string[] = consoleLogSpy.mock.calls.map((call: ConsoleLogCall): string => {
            const log = call[0];
            if (log instanceof Error) {
                return log.message; // Extract message from Error
            } else if (typeof log === 'string') {
                return log; // Keep string messages as-is
            } else {
                throw new Error('Unexpected log type'); // Handle unexpected types safely
            }
        });

        // Print all logs for debugging
        console.log('Captured logs:', allLogs);

        // Optionally assert on specific logs
        expect(allLogs).toContain(`Bad or no 2FA secret was provided in 'VRCHAT_2FA_SECRET' !`);
    });

    test('Should Receive Request to Email OTP', async () => {
        // Example function that logs multiple messages
        async function logMessages() {
            const vrchat = new VRChatAPI(
                process.env.VRC_ACCOUNT_EMAIL_OTP_USERNAME,
                process.env.VRC_ACCOUNT_EMAIL_OTP_PASSWORD
            );
            console.log('account username: ', process.env.VRC_ACCOUNT_EMAIL_OTP_USERNAME);

            // await expect(async () => {

            // }).rejects.toThrow(TOTPRequired);
            await vrchat.login();
        }

        // Call the function
        await logMessages();

        // Define the type for each call
        type ConsoleLogCall = [string | Error];

        // Type-safe extraction of logged messages
        const allLogs: string[] = consoleLogSpy.mock.calls.map((call: ConsoleLogCall): string => {
            const log = call[0];
            if (log instanceof Error) {
                return log.message; // Extract message from Error
            } else if (typeof log === 'string') {
                return log; // Keep string messages as-is
            } else {
                throw new Error('Unexpected log type'); // Handle unexpected types safely
            }
        });

        // Print all logs for debugging
        console.log('Captured logs:', allLogs);

        // Optionally assert on specific logs
        expect(allLogs).toContain(`Bad or no 2FA code was provided in 'EMAIL_2FA_CODE' in .env file. !`);
    });
});
