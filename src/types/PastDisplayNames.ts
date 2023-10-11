/**
 * Represents a past display name of a user.
 */
export type PastDisplayName = {
    displayName: string;
    updated_at: string;
};

/**
 * Function used to validate if an object is a PastDisplayName type. This function returns `TRUE` if the object is a PastDisplayName type and `FALSE` otherwise.
 * @param obj The object to validate against the PastDisplayName type.
 * @returns `TRUE` if the object is a valid PastDisplayName object, `FALSE` otherwise.
 */
export function isPastDisplayName(obj: unknown): obj is PastDisplayName {
    return typeof obj === 'object' && obj !== null &&
        'displayName' in obj && typeof obj.displayName === 'string' &&
        'updated_at' in obj && typeof obj.updated_at === 'string';
}