---
title: WebSocket Service
description: Handle real-time bidirectional communication with WebSocket.
---

# WebSocket Service

Handle real-time bidirectional communication with WebSocket.

```ballerina
import ballerina/websocket;

service /ws on new websocket:Listener(8080) {

    resource function get .() returns websocket:Service|error {
        return new ChatService();
    }
}

service class ChatService {
    *websocket:Service;

    remote function onOpen(websocket:Caller caller) returns error? {
        log:printInfo("Client connected", connectionId = caller.getConnectionId());
    }

    remote function onTextMessage(websocket:Caller caller, string message) returns error? {
        // Echo the message back
        check caller->writeTextMessage("Received: " + message);
    }

    remote function onClose(websocket:Caller caller, int statusCode, string reason) {
        log:printInfo("Client disconnected", reason = reason);
    }
}
```
