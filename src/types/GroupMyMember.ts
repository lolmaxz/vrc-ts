export type MyMember = {
    id: string;
    groupId: string;
    userId: string;
    roleIds: string[];
    managerNotes: string;
    membershipStatus: string;
    isSubscribedToAnnouncements: boolean;
    visibility: string;
    isRepresenting: boolean;
    joinedAt: string; // assuming date-time is a string in ISO format
    bannedAt: string | null;
    has2FA: boolean;
    permissions: string[];
};