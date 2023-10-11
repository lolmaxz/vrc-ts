/**
 * GroupGallery.ts
 * A type that represents a group gallery in VRChat. It is used in the Group type.
 */
export type Gallery = {
    id: string;
    name: string;
    description: string;
    membersOnly: boolean;
    roleIdsToView: string[];
    roleIdsToSubmit: string[];
    roleIdsToAutoApprove: string[];
    roleIdsToManage: string[];
    createdAt: string; // assuming date-time is a string in ISO format
    updatedAt: string; // assuming date-time is a string in ISO format
};

