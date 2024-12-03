import { AvatarIdType, JamIdType, JamSubmissionIdType, UserIdType, WorldIdType } from './Generics';

//! --- Avatars --- !//
export type Jam = {
    /** When the Jam was created. */
    created_at: string;
    /** The description of the Jam. */
    description: string;
    /** The Id of the Jam. */
    id: JamIdType;
    /** If the Jam is visible. */
    isVisible: boolean;
    /** More information about the Jam. Usually a URL going to VRChat website page about this Jam */
    moreInfo: string;
    /** The current State of the Jam. */
    state: string; // todo: Need more information and maybe be an enum
    /** Any Changes to the dates of the Jam. */
    stateChangeDates: {
        // todo: Need more information
        closed?: string;
        submissionsClosed?: string;
        submissionsOpened?: string;
        winnersSelected?: string | null;
    };
    /** The date when the Jam Stops. */
    submissionContentGateDate: string | null;
    /** If the Jam is Gated. */
    submissionContentGated: boolean;
    /** The title of the Jam. */
    title: string;
    /** The type of the Jam. */
    type: JamTypes;
    /** Last time the Jam was updated. */
    updated_at: string;
};

export type JamSubmission = {
    /** Either world ID or avatar ID */
    contentId: WorldIdType | AvatarIdType;
    /** When the submission was created. */
    created_at: string;
    /** The description of the submission. */
    description: string;
    /** The Id of the Jam Submission. */
    id: JamSubmissionIdType;
    /** The Id of the Jam. */
    jamId: JamIdType;
    /** The score of the submission. */
    ratingScore: number;
    /** The Id of the submitter. Usualy a user ID. */
    submitterId: UserIdType;
};

/**
 * The type of the Jam.
 * - `World`: A Jam for Worlds.
 * - `Avatar`: A Jam for Avatars.
 */
export enum JamTypes {
    World = 'world',
    Avatar = 'avatar',
}

//! --- Requests --- !//

export type JamId = {
    jamId: JamIdType;
};

/** Parameters required to request a list of Jams. */
export type GetJamsListRequest = {
    isActive?: boolean;
    type?: JamTypes;
};

/** Parameters required to request a specific Jam. */
export type GetJamInformationRequest = JamId;

/** Parameters required to request a list of Jam Submissions. */
export type GetJamSubmissionsRequest = JamId;
