interface requestConfig {
    username?: string;
    password?: string;
    baseOptions?: unknown;
}

type AuthenticationResponse = {
    requiresTwoFactorAuth?: string[];
    verified?: boolean;
    displayName?: string;
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
