import { User } from "./User";

// TODO Nothing FINAL HERE, ONLY FOR TESTING PURPOSES!

export type NotificationContent = {
    userId: string;
    // ... other fields ...
  };
  
  type NotificationEvent = {
    type: 'notification';
    content: string; // You might need to parse this again if it's a stringified JSON
  };
  
  type FriendAddContent = {
    userId: string;
    user: User; // Define UserObject type based on the API documentation
  };
  
  type FriendAddEvent = {
    type: 'friend-add';
    content: FriendAddContent;
  };
  
  // ... Define types for other events ...

  // eventTypes.ts
export interface UserData {
    userId: string;
    // ... other user data fields
}

export interface EventContent {
    userId?: string;
    // ... other event content fields
}

export type WebSocketData = {
    type: string;
    content: string;
}

export type ParsedWebSocketData = {
    type: string;
    content: EventContent;
}

  
  export type WebSocketEvent = NotificationEvent | FriendAddEvent; // | ... other event types ...
  