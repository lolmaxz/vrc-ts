import { VRCWrapper } from "../VRCWrapper";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the Instance API.
 */
export class InstanceApi extends BaseApi {
    baseClass: VRCWrapper;

    constructor(baseClass: VRCWrapper) {
        super(baseClass);
        this.baseClass = baseClass;
    }

     
    /**
    * Returns an instance. Please read [Instances Tutorial from VRChat API Docs](https://vrchatapi.github.io/tutorials/instances/) for more information on Instances.
    *
    * If an invalid instanceId is provided, this endpoint will simply return "null"!
     */
    public async getInstance() {

    }
    
    /**
     * Returns an instance short name.
     */
    public async getInstanceShortName() {

    }
    
    /**
     * Sends an invite to the instance to yourself.
     */
    public async sendSelfInvite() {

    }
    
    /**
     * Returns an instance. Please read [Instances Tutorial from VRChat API Docs](https://vrchatapi.github.io/tutorials/instances/) for more information on Instances.
     */
    public async getInstanceByShortName() {

    }
    
    /**
     * Return a `instance` type object from the new instance being created.
     */
    public async createInstance() {

    }
}