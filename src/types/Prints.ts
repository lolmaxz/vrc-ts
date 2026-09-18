import { FileIdType, PrintIdType, UserIdType, WorldIdType } from './Generics';

/** The type of the Prints object */
export type Prints = {
    /** The User ID of the author of the print */
    authorId: UserIdType;
    /** The VRChat user Display name of the author of the print */
    authorName: string;
    /** The timestamp at which the print was created */
    createdAt: string;
    /** Information about the print file */
    files: {
        /** File ID of the image */
        fileId: FileIdType;
        /** File location of the image (URL) */
        image: string;
    };
    /** The ID of the Print */
    id: PrintIdType;
    /** The note attached to the note. Sometime can be empty. */
    note?: string;
    /** Current owner. Official list/get often omit this. */
    ownerId?: UserIdType;
    /** User who shared this print. Official list/get often omit this. */
    sharedBy?: UserIdType;
    /** The timestamp at which the print was created */
    timestamp: string;
    /** The World ID of the world the print was taken in */
    worldId: WorldIdType;
    /** The name of the world the print was taken in */
    worldName: string;
};

export type getPrintRequest = {
    printId: PrintIdType;
};

export type deletePrintRequest = {
    printId: PrintIdType;
};
