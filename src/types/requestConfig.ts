export interface requestConfig {
    username?: string;
    password?: string;
    baseOptions?: unknown;
}

export type AuthenticationResponse = {
    requiresTwoFactorAuth?: string[];
    verified?: boolean;
    displayName?: string;
  };
  