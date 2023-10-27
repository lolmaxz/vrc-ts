import { VRCWrapper } from "../VRCWrapper";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the Invites API.
 */
export class InvitesApi extends BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
    }


    /**
     * Sends an invite to a user. Returns the Notification of type `invite` that was sent.
     */
    public async inviteUser() {

    }

    /**
     * Sends self an invite to an instance.
     */
    public async inviteMyselfToInstance() {

    }

    /**
     * Requests an invite from a user. Returns the Notification of type `requestInvite` that was sent.
     */
    public async requestInvite() {

    }

    /**
     * Respond to an invite request by sending a world invite to the requesting user. `:notificationId` is the ID of the requesting notification.
     */
    public async respondInvite() {

    }

    /**
    * Returns a list of all the users Invite Messages. Admin Credentials are required to view messages of other users!
    *
    * Message type refers to a different collection of messages, used during different types of responses.
    * - message = Message during a normal invite
    * - response = Message when replying to a message
    * - request = Message when requesting an invite
    * - requestResponse = Message when replying to a request for invite
    */
    public async listInviteMessages() {

    }

    /**
    * Returns a single Invite Message. This returns the exact same information but less than `getInviteMessages`. Admin Credentials are required to view messages of other users!
    * 
    * Message type refers to a different collection of messages, used during different types of responses.
    * - message = Message during a normal invite
    * - response = Message when replying to a message
    * - request = Message when requesting an invite
    * - requestResponse = Message when replying to a request for invite
    */
    public async getInviteMessage() {

    }

    /**
    * Updates a single Invite Message and then returns a list of all of them. Admin Credentials are required to update messages of other users!
    *
    * Updating a message automatically sets the cooldown timer to 60 minutes. Trying to edit a message before the cooldown timer expires results in a 429 "Too Fast Error".
    * 
    * Message type refers to a different collection of messages, used during different types of responses.
    * - message = Message during a normal invite
    * - response = Message when replying to a message
    * - request = Message when requesting an invite
    * - requestResponse = Message when replying to a request for invite

     */
    public async updateInviteMessage() {

    }

    /**
    * Resets a single Invite Message back to its original message, and then returns a list of all of them. Admin Credentials are required to update messages of other users!
    * 
    * Resetting a message respects the rate-limit, so it is not possible to reset within the 60 minutes countdown. Resetting it does however not set the rate-limit to 60 like when editing it. It is possible to edit it right after resetting it. Trying to edit a message before the cooldown timer expires results in a 429 "Too Fast Error".
    * 
    * Message type refers to a different collection of messages, used during different types of responses.
    * - message = Message during a normal invite
    * - response = Message when replying to a message
    * - request = Message when requesting an invite
    * - requestResponse = Message when replying to a request for invite
    */
    public async resetInviteMessage() {

    }
}