---
title: HTTP Service
description: Build REST APIs, webhooks, and data services with HTTP.
---

# HTTP Service

HTTP services are the foundation for REST APIs, webhooks, and data services.

## Creating an HTTP Service

```ballerina
import ballerina/http;

configurable int port = 8090;

service /api on new http:Listener(port) {

    resource function get greeting() returns string {
        return "Hello from WSO2 Integrator!";
    }
}
```

## Defining Resources and Methods

Each resource function maps to an HTTP method and path. Ballerina's type system ensures request and response payloads are validated automatically.

```ballerina
service /orders on new http:Listener(8090) {

    // GET /orders
    resource function get .() returns Order[]|error {
        return getOrders();
    }

    // GET /orders/{id}
    resource function get [string id]() returns Order|http:NotFound {
        Order? order = getOrder(id);
        return order ?: http:NOT_FOUND;
    }

    // POST /orders
    resource function post .(Order order) returns Order|http:BadRequest|error {
        return createOrder(order);
    }

    // PUT /orders/{id}
    resource function put [string id](Order order) returns Order|http:NotFound|error {
        return updateOrder(id, order);
    }

    // DELETE /orders/{id}
    resource function delete [string id]() returns http:NoContent|http:NotFound {
        boolean deleted = deleteOrder(id);
        return deleted ? http:NO_CONTENT : http:NOT_FOUND;
    }
}
```

## Path Parameters and Query Parameters

```ballerina
service /api on new http:Listener(8090) {

    // Path parameter: /api/users/42
    resource function get users/[int userId]() returns User|error {
        return getUser(userId);
    }

    // Query parameters: /api/products?category=electronics&limit=10
    resource function get products(string? category, int limit = 20) returns Product[]|error {
        return searchProducts(category, limit);
    }

    // Multiple path segments: /api/orgs/wso2/repos/integrator
    resource function get orgs/[string org]/repos/[string repo]() returns Repository|error {
        return getRepository(org, repo);
    }
}
```

## Request and Response Payload Types

Define typed records for request and response payloads. Ballerina automatically validates and deserializes incoming JSON.

```ballerina
type OrderRequest record {|
    string customerId;
    LineItem[] items;
    string? shippingAddress;
|};

type OrderResponse record {|
    string orderId;
    string status;
    decimal totalAmount;
    string createdAt;
|};

resource function post orders(OrderRequest request) returns OrderResponse|http:BadRequest|error {
    // request is already validated and deserialized
    OrderResponse response = check processOrder(request);
    return response;
}
```

## Headers and Content Types

```ballerina
resource function post webhook(
    @http:Header string x\-api\-key,
    @http:Header {name: "Content-Type"} string contentType,
    http:Request req
) returns http:Accepted|http:Unauthorized {
    if x\-api\-key != expectedKey {
        return http:UNAUTHORIZED;
    }
    // Process the webhook payload
    return http:ACCEPTED;
}
```

## CORS Configuration

```ballerina
@http:ServiceConfig {
    cors: {
        allowOrigins: ["https://app.example.com"],
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization"],
        maxAge: 3600
    }
}
service /api on new http:Listener(8090) {
    // Resources inherit CORS configuration
}
```

## Interceptors and Middleware

Use request/response interceptors for cross-cutting concerns such as logging, authentication, and rate limiting.

```ballerina
service class LoggingInterceptor {
    *http:RequestInterceptor;

    resource function 'default [string... path](
        http:RequestContext ctx,
        http:Request req
    ) returns http:NextService|error? {
        log:printInfo("Request received", method = req.method, path = req.rawPath);
        return ctx.next();
    }
}

service class AuthInterceptor {
    *http:RequestInterceptor;

    resource function 'default [string... path](
        http:RequestContext ctx,
        @http:Header string authorization
    ) returns http:NextService|http:Unauthorized|error? {
        if !check validateToken(authorization) {
            return http:UNAUTHORIZED;
        }
        return ctx.next();
    }
}

listener http:Listener ep = new (8090);

// Apply interceptors to the service
@http:ServiceConfig {
    interceptors: [new LoggingInterceptor(), new AuthInterceptor()]
}
service /api on ep {
    resource function get secured\-data() returns json {
        return {message: "This is protected data"};
    }
}
```

## Error Responses and Status Codes

```ballerina
type ErrorResponse record {|
    string code;
    string message;
    string[] details?;
|};

resource function get orders/[string id]() returns Order|http:NotFound|http:InternalServerError {
    Order|error result = getOrder(id);
    if result is error {
        ErrorResponse errBody = {code: "NOT_FOUND", message: "Order not found"};
        http:NotFound notFound = {body: errBody};
        return notFound;
    }
    return result;
}
```

## Service Configuration Options

| Configuration | Description |
|---|---|
| `port` | Listener port number |
| `host` | Bind address (default: `0.0.0.0`) |
| `secureSocket` | TLS/SSL configuration |
| `timeout` | Request/connection timeout |
| `maxHeaderSize` | Maximum HTTP header size |
| `maxPayloadSize` | Maximum request body size |

```ballerina
listener http:Listener secureEp = new (8443, secureSocket = {
    key: {
        certFile: "/path/to/cert.pem",
        keyFile: "/path/to/key.pem"
    }
});
```
