

interface requestConfig {
    username?: string;
    password?: string;
    baseOptions?: unknown;
}

type AuthenticationResponse = {
    requiresTwoFactorAuth?: string[];
    verified?: boolean;
    error?: {message: string, status_code: number};
    cookies?: {
        key: string;
        value: string;
        expires: Date;
        domain: string;
        path: string;
        hostOnly: boolean;
        creation: Date;
        lastAccessed: Date;
      }[]
};

type twoFactorAuthResponse = {
    verified: boolean;
};

interface APIResponse<T> extends Omit<Response, 'ok' | 'json'> {
    ok: true;
    json(): Promise<T>;
}

interface APIErrorResponse<E> extends Omit<Response, 'ok' | 'json'> {
    ok: false;
    json(): Promise<E>;
}

type API<T, E> = APIResponse<T> | APIErrorResponse<E>;

type APIPaths = {
    [section: string]: {
      [subsection: string]: {path:string, method:string};
    };
  };