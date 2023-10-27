declare namespace VRCAPI {
    namespace Instances {
        namespace Models {

            type Instance = {
                id: string;
                location: string; // the full ID of the instance + world
                instanceId: string; // The id of the instance
                name: string; // the name of the instance, unless specified manually, will always be affected at random by vrchat with a digit number ranging from 0 to 99999
                worldId: string; // The world ID for the instance
                ownerId?: string; // depending on the type, could be a Group ID // todo to research more
                tags: string[]; // todo to research more 
                active: boolean; // If there is currently players in this world/instance
                full: boolean; // If the instance is full or not. Default to false.
                n_users: number; // todo check the difference with this and userCount
                capacity: number;
                recommendedCapacity: number;
                userCount: number; // todo check the difference with this and n_users
                queueEnabled: boolean; // Whether the queue is enabled or not
                platforms: {
                    standalonewindows: number; // todo to research more.  0 or 1 ( I think )
                    android: number; // todo to research more.  0 or 1 ( I think )
                };
                gameServerVersion?: number | null; // todo research more. for now we only know that this can be null
                roleRestricted: boolean; // if this instance requires roles to access // todo research more
                secureName: string; // The short code to access the instance (for short link to share outside vrchat website, only the code part, not the full link!)
                shortName?: string | null; // todo research more. for now we only know that this can be null
                world: unknown; // todo this will be a world type when it's completed
                clientNumber: "unknown"; // todo research more. for now we only know that this can be a string or "unknown"
                photonRegion: InstanceRegionType; // The region of the instance
                region: InstanceRegionType; // The region of the instance
                /**
                 * Default to false. Only in the case of a invite type instance. If set to true, will make a invite instance into a invite+ instance type!
                 */
                canRequestInvite: boolean;
                permanent: boolean; // todo research more
                groupAccessType: string; // todo research more
                strict: boolean; // todo research more
                nonce: string; // todo research more
                users?: string[]; // todo research more
                hidden?: string; // hidden field is only present if InstanceType is hidden aka "Friends+", and is instance creator. // TODO research more
                friends?: string; //friends field is only present if InstanceType is friends aka "Friends", and is instance creator. // TODO research more
                private?: string; // private field is only present if InstanceType is private aka "Invite" or "Invite+", and is instance creator. // TODO research more

            }

            /**
             * ## Different type of Instance
             * These are all the different instance type for an instance.
             * 
             * @enum {string} - **Public** -> `Public` Anybody can join.
             * - **Friends** -> `Friend` Only your friends may join.
             * - **Friends_Plus** -> `Friend+` Any friend of a user in the instance may join.
             * - **Private** -> `Invite` and `Invite+` Invite: You can invite others. Only you can accept requests. Invite+: You can invite others. Joiners can accept requests.
             * - **Group** -> `Group` Specificly for making a group instance type.
             */
            enum InstanceType {
                Public = "public",
                Friends = "friends",
                Friends_Plus = "hidden",
                Private = "private",
                Group = "group",
            }


            /**
             * ## Different type of Instance Region Type
             * These are all the different region type for an instance.
             * 
             * ### @enum {string} - **US_WEST** -> US West Server
             * - **US_EAST** -> US East Server
             * - **EU** -> Europe Server
             * - **JP** -> Japan Server
             */
            enum InstanceRegionType {
                US_WEST = "us",
                US_EAST = "use",
                EU = "eu",
                JP = "jp",
            }

            /**
             * ## Different type of Group Access Instance Type
             * These are all the different instance type for a Group Instance type.
             * ### @enum {string} - **Group_Public** -> Anyone can join in the group.
             * - **Group_Plus** -> Any friend of a user in the instance can join the instance
             * - **Group_Members** -> Only the selected group roles may join. (You are going to need to define group roles).
             */
            enum GroupAccessType {
                Group_Public = "public",
                Group_Plus = "plus",
                Group_Members = "member"
            }


        }
        namespace Requests {
            namespace CreateInstance {
                namespace Regular {

                }
                namespace Group {
                    type CreateRequest = {
                        worldId: string;
                        groupAccessType: string;
                        ownerId?: string;
                        region: VRCAPI.Instances.Models.InstanceRegionType;
                        queueEnabled?: boolean;
                        roleIds?: string[];
                    }
                }
            }

        }
    }
}