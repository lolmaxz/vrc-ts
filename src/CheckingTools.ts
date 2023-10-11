export function isNotEmpty(value: string): boolean {
    return value !== '' && value.length > 0;
}

export function isNotUndefined(value: unknown): boolean {
    return value !== undefined;
}

export function isMin(value: number, min: number): boolean {
    return value >= min;
}

export function isMinLength(value: Array<unknown>|string, min: number): boolean {
    return value.length >= min;
}

export function isMaxLength(value: number, max: number): boolean {
    return value <= max;
}

export function isbetweenValues(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

// Helper function to safely access properties
export function safeAccess(json: unknown, key: string): unknown {
    if (typeof json === 'object' && json !== null && key in json) {
        return (json as Record<string, unknown>)[key];
    }
    return undefined;
}

// Safely handle enum conversion
export function safeEnumConversion<T extends Record<string, string | number>>(value: unknown, enumObj: T): T[keyof T] | undefined {
    return Object.values(enumObj).includes(value as T[keyof T]) ? value as T[keyof T] : undefined;
}

