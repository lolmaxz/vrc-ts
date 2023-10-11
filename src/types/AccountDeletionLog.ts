
/**
 * 
 * Typically "Deletion requested" or "Deletion canceled". Other messages like "Deletion completed" may exist, but are these are not possible to see as a regular user.
 * 
 *`Default: Deletion requested`
 */
export type AccountDeletionLog = {
    message: string;
    deletionScheduled: string | null;
    dateTime: string;
};

/**
 *  Checks if `obj` is a valid AccountDeletionLog
 * @param obj The object to check for deletion logging messages
 * @returns   `true` if `obj` is a valid AccountDeletionLog, `false` otherwise
 */
export function isAccountDeletionLog(obj: unknown): obj is AccountDeletionLog {
    return typeof obj === 'object' && obj !== null &&
        'message' in obj && typeof obj.message === 'string' &&
        'deletionScheduled' in obj && (typeof obj.deletionScheduled === 'string' || obj.deletionScheduled === null) &&
        'dateTime' in obj && typeof obj.dateTime === 'string';
}