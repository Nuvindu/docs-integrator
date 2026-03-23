---
title: WebSub Service
description: Subscribe to content distribution hubs and receive real-time event notifications via WebSub.
---

# WebSub Service

Subscribe to content distribution hubs and receive real-time event notifications using the [WebSub](https://www.w3.org/TR/websub/) protocol.

WebSub enables a publish-subscribe pattern over HTTP, where your service registers as a subscriber with a hub and receives content updates as they happen — no polling required.

## When to Use WebSub

- Receiving webhook-style notifications from content hubs
- Subscribing to feed updates (Atom, RSS)
- Building event-driven integrations with WebSub-compliant publishers

## Quick Example

```ballerina
import ballerina/websub;
import ballerina/log;

@websub:SubscriberServiceConfig {
    target: [
        "https://hub.example.com",
        "https://example.com/topic"
    ],
    leaseSeconds: 36000
}
service /subscriber on new websub:Listener(9090) {

    remote function onSubscriptionValidationDenied(
            websub:SubscriptionDeniedError msg) returns error? {
        log:printError("Subscription denied", msg = msg.message());
    }

    remote function onSubscriptionVerification(
            websub:SubscriptionVerification msg)
            returns websub:SubscriptionVerificationSuccess|error? {
        log:printInfo("Subscription verified");
        return websub:SUBSCRIPTION_VERIFICATION_SUCCESS;
    }

    remote function onEventNotification(
            websub:ContentDistributionMessage event) returns error? {
        log:printInfo("Event received", payload = event.content.toString());
    }
}
```

## Key Concepts

| Concept | Description |
|---|---|
| **Hub** | The intermediary that accepts subscriptions and distributes content |
| **Topic** | The subject/resource being subscribed to |
| **Subscriber** | Your service that receives content updates |
| **Lease** | How long the subscription remains active (in seconds) |

## Configuration

### Subscriber Service Config

| Property | Type | Description |
|---|---|---|
| `target` | `[string, string]` | Hub URL and topic URL |
| `leaseSeconds` | `int` | Subscription lease duration |
| `secret` | `string?` | Shared secret for HMAC signature verification |
| `callback` | `string?` | Custom callback URL (auto-detected if not specified) |

### Listener Config

```ballerina
websub:ListenerConfiguration config = {
    gracefulShutdownPeriod: 15
};
listener websub:Listener wsListener = new (9090, config);
```

## Handling Events

### Content Distribution Message

The `onEventNotification` callback receives a `ContentDistributionMessage` with:

- `contentType` — MIME type of the payload
- `content` — The actual payload (JSON, XML, text, or bytes)
- `headers` — HTTP headers from the hub

```ballerina
remote function onEventNotification(
        websub:ContentDistributionMessage event) returns error? {
    // Access JSON content
    json payload = check event.content.ensureType();
    string action = check payload.action;

    match action {
        "created" => {
            log:printInfo("New item created");
        }
        "updated" => {
            log:printInfo("Item updated");
        }
        _ => {
            log:printInfo("Unknown action", action = action);
        }
    }
}
```

## Security

Enable HMAC signature verification by setting a shared secret:

```ballerina
@websub:SubscriberServiceConfig {
    target: ["https://hub.example.com", "https://example.com/topic"],
    secret: "my-shared-secret"
}
```

The listener automatically validates the `X-Hub-Signature` header on incoming notifications.

## What's Next

- [HTTP Service](./http-service) — Build REST APIs
- [Event Handlers](../event/kafka) — Process events from Kafka, RabbitMQ, and more
- [Error Handling](../../design-logic/error-handling) — Handle failures gracefully
