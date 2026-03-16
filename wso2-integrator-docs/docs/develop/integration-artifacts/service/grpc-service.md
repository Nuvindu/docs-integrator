---
title: gRPC Service
description: Define services using Protocol Buffers and generate Ballerina code for gRPC.
---

# gRPC Service

Define services using Protocol Buffers and generate Ballerina code.

```ballerina
import ballerina/grpc;

@grpc:Descriptor {value: ORDER_SERVICE_DESC}
service "OrderService" on new grpc:Listener(9090) {

    // Unary RPC
    remote function getOrder(OrderRequest request) returns Order|error {
        return retrieveOrder(request.orderId);
    }

    // Server streaming RPC
    remote function listOrders(OrderFilter filter) returns stream<Order, error?> {
        return streamOrders(filter);
    }

    // Client streaming RPC
    remote function batchCreateOrders(stream<Order, error?> orders) returns BatchResult|error {
        return processBatch(orders);
    }

    // Bidirectional streaming RPC
    remote function orderChat(stream<OrderMessage, error?> messages)
            returns stream<OrderMessage, error?> {
        return handleChat(messages);
    }
}
```
