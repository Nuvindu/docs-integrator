---
sidebar_position: 7
title: Mocking External Services
description: Create mock services and test doubles for isolated testing.
---

# Mocking External Services

Isolate your integration tests by replacing external dependencies with mock implementations. Ballerina's test framework provides built-in support for mocking client objects and functions so your tests run reliably without calling real services.

## Why Mock External Services

Integration code typically depends on HTTP endpoints, databases, and third-party APIs. Calling these during tests introduces problems:

- **Flakiness** -- network issues or service downtime cause test failures unrelated to your code.
- **Slow execution** -- real HTTP calls add latency to every test run.
- **Side effects** -- tests may create real orders, send emails, or modify production data.
- **Cost** -- pay-per-call APIs accumulate charges during development.

Mocking removes these variables so tests verify your logic in isolation.

## Object Mocking with Stubbing

Use `test:prepare()` to stub specific methods on a client object. This approach lets you control return values without replacing the entire client.

```ballerina
import ballerina/http;
import ballerina/test;

http:Client backendClient = check new ("http://localhost:9090");

@test:Config {}
function testGetOrder() returns error? {
    // Stub the get method to return a mock response
    http:Response mockResponse = new;
    mockResponse.statusCode = 200;
    mockResponse.setJsonPayload({orderId: "ORD-001", status: "completed"});

    test:prepare(backendClient).when("get").thenReturn(mockResponse);

    // Call your integration logic that uses backendClient
    http:Response result = check backendClient->get("/orders/ORD-001");
    json payload = check result.getJsonPayload();
    test:assertEquals(payload.orderId, "ORD-001");
}
```

### Stubbing with Argument Matching

Provide specific arguments to return different values based on input.

```ballerina
@test:Config {}
function testGetOrderByPath() returns error? {
    http:Response foundResponse = new;
    foundResponse.statusCode = 200;

    http:Response notFoundResponse = new;
    notFoundResponse.statusCode = 404;

    test:prepare(backendClient)
        .when("get").withArguments("/orders/ORD-001").thenReturn(foundResponse);
    test:prepare(backendClient)
        .when("get").withArguments("/orders/INVALID").thenReturn(notFoundResponse);

    http:Response result = check backendClient->get("/orders/INVALID");
    test:assertEquals(result.statusCode, 404);
}
```

### Returning a Sequence of Values

Use `thenReturnSequence()` to return different values on successive calls -- useful for testing retry logic.

```ballerina
@test:Config {}
function testRetryBehavior() returns error? {
    http:Response errorResponse = new;
    errorResponse.statusCode = 503;

    http:Response successResponse = new;
    successResponse.statusCode = 200;

    // First call returns 503, second call returns 200
    test:prepare(backendClient).when("get")
        .thenReturnSequence(errorResponse, successResponse);

    // Your retry logic should eventually succeed
    http:Response result = check callWithRetry(backendClient, "/api/data");
    test:assertEquals(result.statusCode, 200);
}
```

## Object Mocking with Test Doubles

For full control, create a mock class that replaces the real client. Pass it to `test:mock()` to substitute the original.

```ballerina
import ballerina/http;
import ballerina/test;

http:Client orderClient = check new ("http://localhost:9090");

// Mock class implementing the methods your code calls
client class MockOrderClient {
    resource function get orders/[string id]() returns json|error {
        return {orderId: id, status: "pending", total: 49.99};
    }

    resource function post orders(json payload) returns json|error {
        return {orderId: "ORD-NEW", status: "created"};
    }
}

@test:Config {}
function testWithMockClient() returns error? {
    // Replace the real client with the mock
    orderClient = test:mock(http:Client, new MockOrderClient());

    json result = check orderClient->/orders/["ORD-001"];
    test:assertEquals(result.status, "pending");
}
```

## Function Mocking

Mock standalone functions using the `@test:Mock` annotation. This is useful for replacing utility functions or imported module functions.

```ballerina
import ballerina/test;
import ballerina/time;

// Mock a function in the current module
@test:Mock {functionName: "getCurrentTimestamp"}
test:MockFunction getCurrentTimestampMock = new ();

@test:Config {}
function testTimeSensitiveLogic() {
    // Return a fixed timestamp for deterministic testing
    test:when(getCurrentTimestampMock).thenReturn("2025-01-15T10:00:00Z");

    string result = formatEventTime();
    test:assertEquals(result, "Event scheduled at 2025-01-15T10:00:00Z");
}
```

### Mocking Imported Functions

Specify the `moduleName` to mock functions from external modules.

```ballerina
import ballerina/test;
import ballerina/io;

@test:Mock {moduleName: "ballerina/io", functionName: "println"}
test:MockFunction printlnMock = new ();

@test:Config {}
function testWithMockedPrintln() {
    test:when(printlnMock).doNothing();
    // Calls to io:println will now do nothing during this test
    processAndLog("test data");
}
```

### Calling an Alternate Function

Redirect a mocked function to a different implementation.

```ballerina
@test:Mock {functionName: "sendNotification"}
test:MockFunction sendNotificationMock = new ();

function mockSendNotification(string to, string message) returns error? {
    // Log instead of sending a real notification
    return;
}

@test:Config {}
function testNotificationFlow() returns error? {
    test:when(sendNotificationMock).call("mockSendNotification");

    // sendNotification() now calls mockSendNotification()
    check processOrder("ORD-001");
}
```

## Test-Specific Configuration

Provide mock URLs and settings in a `tests/Config.toml` file so your integration connects to local stubs instead of real services.

```toml
# tests/Config.toml
backendUrl = "http://localhost:9095/mock"
apiKey = "test-key-not-real"
maxRetries = 1
```

```ballerina
configurable string backendUrl = ?;
configurable string apiKey = ?;

// These values come from tests/Config.toml during test execution
```

## Best Practices

- **Prefer stubbing over test doubles** when you only need to control a few methods -- it requires less boilerplate.
- **Use test doubles** when mock logic is complex or when you need to track call counts.
- **Mock at the boundary** -- mock HTTP clients and connectors, not your own business logic functions.
- **Keep mocks simple** -- a mock that reimplements real logic defeats the purpose of isolation.
- **Use `tests/Config.toml`** to swap connection URLs and credentials for testing.

## What's Next

- [AI-Generated Test Cases](ai-test-generation.md) -- Auto-generate tests for your integrations
- [Test Services & Clients](test-services-clients.md) -- End-to-end service testing patterns
- [Unit Testing](unit-testing.md) -- Test framework fundamentals and assertions
