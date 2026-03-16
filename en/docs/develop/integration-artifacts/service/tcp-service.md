---
title: TCP Service
description: Handle raw TCP connections for custom protocol implementations. (Beta)
---

# TCP Service

Handle raw TCP connections for custom protocol implementations.

```ballerina
import ballerina/tcp;

service on new tcp:Listener(3000) {

    remote function onConnect(tcp:Caller caller) returns tcp:ConnectionService {
        log:printInfo("New TCP connection");
        return new TcpHandler();
    }
}

service class TcpHandler {
    *tcp:ConnectionService;

    remote function onBytes(tcp:Caller caller, readonly & byte[] data) returns error? {
        string message = check string:fromBytes(data);
        log:printInfo("Received", data = message);
        // Process and respond
        check caller->writeBytes("ACK".toBytes());
    }

    remote function onClose() {
        log:printInfo("Connection closed");
    }
}
```
