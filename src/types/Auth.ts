//! --- Auth Types --- //
/**
 * UserExists: Status object representing if a queried user by username or userId exists or not.
 *
 * This model is primarily used by the /auth/exists endpoint, which in turn is used during registration.
 */
export type checkUserExistResponse = {
    userExists: boolean;
    nameOk: boolean;
};
export type verify2FATOTPResponse = {
    verified: boolean;
};
export type verify2FAEmailResponse = {
    verified: boolean;
};
export type verifyAuthTokenResponse = {
    ok: boolean;
    token: string;
};

export type checkUserExistOptions = {
    email?: string;
    displayName?: string;
    userId?: string;
    excludeUserId?: string;
};

export type verify2FACodeOptions = {
    code?: string;
    generateCode?: boolean;
};

export type verify2FAEmailOptions = {
    code?: string;
};
