import WebSocket from 'ws';
import { EventEmitter } from 'events';
// import { EventContent } from './types/WebSocketTypes';
// import { User, isUserJSON } from './types/User';
// import fetch, { Headers } from 'node-fetch';

enum EventType {
    UserOnline = 'user-online',
    UserUpdate = 'user-update',
    UserLocation = 'user-location',
    UserOffline = 'user-offline',
    FriendOnline = 'friend-online',
    FriendActive = 'friend-active',
    FriendUpdate = 'friend-update',
    FriendLocation = 'friend-location',
    FriendOffline = 'friend-offline',
    FriendAdd = 'friend-add',
    FriendDelete = 'friend-delete',
    Notification = 'notification',
    ShowNotification = 'show-notification',
    HideNotification = 'hide-notification',
    Error = 'error'
}

enum QueryOrder {
    Ascending = "ascending",
    Descending = "descending"
}

enum QuerySort {
    Popularity = "popularity",
    Heat = "heat",
    Trust = "trust",
    Shuffle = "shuffle",
    Random = "random",
    Favorites = "favorites",
    ReportScore = "reportScore",
    ReportCount = "reportCount",
    PublicationDate = "publicationDate",
    LabsPublicationDate = "labsPublicationDate",
    Created = "created",
    CreatedAt = "_created_at",
    Updated = "updated",
    UpdatedAt = "_updated_at",
    Order = "order",
    Relevance = "relevance",
    Magic = "magic",
    Name = "name"
}

enum QueryReleaseStatus {
    Public = "public",
    Private = "private",
    Hidden = "hidden",
    All = "all"
}

export class Enums2 {
    readonly EventType = EventType;
    readonly QueryOrder = QueryOrder;
    readonly QuerySort = QuerySort;
    readonly QueryReleaseStatus = QueryReleaseStatus;
}

export type DataParsed = {
    content: string;
    type: string;
};

// export { Enums2, QueryReleaseStatus, QuerySort, QueryOrder, EventType };




export class EventsApi {
    private fetch = fetch;
    private UserAgent: string;
    private userid: string = "";
    private authCookie: string = "";
    private twoFactorAuth: string = "";
    private WebsocketClient?: WebSocket;
    private EventEmitter = new EventEmitter();
    private IsOnline = false;
    private PingTimeout?: NodeJS.Timeout;
    private ReconnectingInterval?: NodeJS.Timeout;
    private debug: boolean;
    private eventBuffer: Array<[string, string, NodeJS.Timeout]> = [];
    private OnlineInterval?: NodeJS.Timeout;
    private lastPing?: number;

    constructor({ userid = "", authCookie = "", twoFactorAuth = "", debug = false }: { userid?: string, authCookie?: string, twoFactorAuth?: string, debug?: boolean }, UserAgent: string) {
        this.UserAgent = UserAgent;
        this.debug = debug;
        if (authCookie.length > 0) {
            this.userid = userid;
            this.authCookie = authCookie;
            this.twoFactorAuth = twoFactorAuth;
        }
    }

    private Debug(x: string) {
        if (this.debug) console.log(x);
    }

    private GenerateHeaders(authentication = false, contentType = ""): Headers {
        const headers = new Headers({
            "User-Agent": this.UserAgent,
            "cookie": `${this.authCookie && authentication ? "auth=" + this.authCookie + "; " : ""}${this.twoFactorAuth && authentication ? "twoFactorAuth=" + this.twoFactorAuth + "; " : ""}`
        });

        if (contentType) headers.set('Content-Type', contentType);
        return headers;
    }

    public Connect() {
        if (!this.authCookie) return { success: false, status: 401 };

        this.WebsocketClient = new WebSocket(`wss://vrchat.com/?authToken=${this.authCookie}`, {
            headers: {
                "cookie": `auth=${this.authCookie}${this.twoFactorAuth ? " " + "twoFactorAuth=" + this.twoFactorAuth + ";" : ""}`,
                "user-agent": this.UserAgent
            }
        });

        this.WebsocketClient.on('error', (err: Error) => {
            this.EventEmitter.emit('error', err);
        });

        this.WebsocketClient.on('open', () => {
            clearInterval(this.ReconnectingInterval);
            this.Debug("OPEN");
            this.HeartBeat();
        });

        this.WebsocketClient.on('close', () => {
            this.Debug('CLOSE');
        });

        this.WebsocketClient.on('message', (data: WebSocket.Data) => {
            void this.handleMessage(data);
        });
        
            

        this.WebsocketClient.on('ping', () => {
            this.HeartBeat();
            this.Debug('ping' + (this.lastPing ? " (" + (Date.now() - this.lastPing) + "ms interval)" : ""));
            this.lastPing = Date.now();
        });
    }

    private async handleMessage(data: WebSocket.Data): Promise<void> {
        const dataString = JSON.stringify(data);
        console.log("dataString: ", dataString);
        
        // const dataParsed: DataParsed = JSON.parse(dataString) as DataParsed;
        // let content: EventContent;
    
        // try {
        //     content = JSON.parse(dataParsed.content);
        // } catch (e) {
        //     console.error('Error parsing content:', e);
        //     return;
        // }

        //     this.WebsocketClient.on('message', async (data: WebSocket.Data) => {
        //         const dataParsed = typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString());
        //         let content;
            
        //         try {
        //             content = JSON.parse(dataParsed.content);
        //         } catch (e) {
        //             content = dataParsed.content;
        //         }
            
        //         if (!["user-online", "user-update", "user-location", "user-offline", "friend-online", "friend-active", "friend-update", "friend-location", "friend-offline", "friend-add", "friend-delete", "notification", "see-notification", "hide-notification"].includes(dataParsed.type)) {
        //             console.log("NON-INDEXED WEBSOCKET EVENT TYPE: " + dataParsed.type);
        //         }
            
        //         if (dataParsed.type === "user-location") await this.UserEvent(content);
            
        //         const id = content.userId ? content.userId : "";
            
        //         // Preventing duplicate events.
        //         if (id) {
        //             let eventBuffered = false;
        //             for (let i = 0; i < this.eventBuffer.length; i++) {
        //                 if (this.eventBuffer[i][1] === dataParsed.type && this.eventBuffer[i][0] === id) {
        //                     eventBuffered = true;
        //                     this.Debug('prevented duplicate event: ' + dataParsed.type);
        //                     clearTimeout(this.eventBuffer[i][2]);
        //                     const timeout = setTimeout(() => {
        //                         for (let j = 0; j < this.eventBuffer.length; j++) {
        //                             if (this.eventBuffer[j].includes(dataParsed.type) && this.eventBuffer[j].includes(id)) {
        //                                 this.eventBuffer.splice(j, 1);
        //                             }
        //                         }
        //                     }, 100);
        //                     this.eventBuffer[i][2] = timeout;
        //                 }
        //             }
            
        //             if (!eventBuffered) {
        //                 this.EventEmitter.emit(dataParsed.type, content);
        //                 const timeout = setTimeout(() => {
        //                     for (let j = 0; j < this.eventBuffer.length; j++) {
        //                         if (this.eventBuffer[j].includes(dataParsed.type) && this.eventBuffer[j].includes(id)) {
        //                             this.eventBuffer.splice(j, 1);
        //                         }
        //                     }
        //                 }, 100);
        //                 this.eventBuffer.push([id, dataParsed.type, timeout]);
        //             }
        //         } else {
        //             this.EventEmitter.emit(dataParsed.type, content);
        //         }
        //     });
            return Promise.resolve();
    }

    // private UserEvent() {
    //     clearInterval(this.OnlineInterval);
    
    //     this.OnlineInterval = setInterval(() => {
    //         console.log("ONLINE INTERVAL TIMEOUT");
    
    //         void (async () => {
    //             try {
    //                 const res = await fetch(`https://api.vrchat.cloud/api/1/users/${this.userid}`, { headers: this.GenerateHeaders(true) });
    //                 if (!res.ok) {
    //                     clearInterval(this.OnlineInterval);
                        
    //                     this.IsOnline = false;
    //                     this.EventEmitter.emit('user-offline', { userid: this.userid });
    //                     return;
    //                 }
                    
    //                 isUserJSON(await res.json());
    //                 const json: User = await res.json() as User;
    //                 if (json.state !== "online") {
    //                     clearInterval(this.OnlineInterval);
                        
    //                     this.IsOnline = false;
    //                     this.EventEmitter.emit('user-offline', json);
    //                 } else if (!this.IsOnline) {
    //                     this.IsOnline = true;
    //                     this.EventEmitter.emit('user-online', json);
    //                 }
    //             } catch (error) {
    //                 console.error(error);
    //                 // Handle the error appropriately
    //             }
    //         })();
    //     }, 150000);
    // }
    
    

    private HeartBeat() {
        clearTimeout(this.PingTimeout);

        this.PingTimeout = setTimeout(() => {
            
            if (this.WebsocketClient) this.WebsocketClient.terminate();
            this.WebsocketClient = undefined;
            this.lastPing = undefined;
            this.ReconnectingInterval = setInterval(() => {
                if (this.WebsocketClient) this.WebsocketClient.terminate();
                this.Connect();
            }, 1000);
        }, 30000 + 2500);
    }


    // Other methods remain mostly the same, with minor adjustments for TypeScript
    // ...

    on(event: EventType, handlerCallback: (content: unknown) => void) {
        this.EventEmitter.on(event, handlerCallback);
    }
}