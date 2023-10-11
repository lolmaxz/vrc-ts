export type GroupRole = {
    id: string;
    groupId: string;
    name: string;
    description: string;
    isSelfAssignable: boolean;
    permissions: string[];
    isManagementRole: boolean;
    requiresTwoFactor: boolean;
    requiresPurchase: boolean;
    order: number;
    createdAt: string; // assuming date-time is a string in ISO format
    updatedAt: string; // assuming date-time is a string in ISO format
};