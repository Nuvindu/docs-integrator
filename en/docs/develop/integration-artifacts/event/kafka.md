---
title: Kafka
description: Consume messages from Apache Kafka topics with consumer group management and offset control.
---

# Kafka

Consume messages from Apache Kafka topics with consumer group management, offset control, and schema-aware deserialization.

```ballerina
import ballerinax/kafka;

configurable string bootstrapServers = "localhost:9092";
configurable string groupId = "order-processor";

type OrderEvent record {|
    string orderId;
    string customerId;
    decimal amount;
    string timestamp;
|};

listener kafka:Listener orderListener = new ({
    bootstrapServers: bootstrapServers,
    groupId: groupId,
    topics: ["orders"],
    pollingInterval: 1,
    autoCommit: false
});

service on orderListener {

    remote function onConsumerRecord(kafka:Caller caller, OrderEvent[] orders) returns error? {
        foreach OrderEvent order in orders {
            log:printInfo("Processing order", orderId = order.orderId, amount = order.amount);
            check processOrder(order);
        }
        // Manual commit after successful processing
        check caller->commit();
    }

    remote function onError(kafka:Error err) {
        log:printError("Kafka consumer error", 'error = err);
    }
}
```

## Offset Management Strategies

| Strategy | Configuration | Behavior |
|---|---|---|
| **Auto-commit** | `autoCommit: true` | Offsets committed automatically at the polling interval |
| **Manual commit** | `autoCommit: false` | Call `caller->commit()` after processing |
| **Seek to beginning** | `autoOffsetReset: "earliest"` | Reprocess from the beginning of the topic |
| **Seek to end** | `autoOffsetReset: "latest"` | Skip to the latest messages only |

## Common Patterns

### Dead Letter Queue (DLQ)

Route failed messages to a dead letter queue for manual inspection or retry.

```ballerina
function processWithDLQ(kafka:Caller caller, OrderEvent order) returns error? {
    do {
        check processOrder(order);
        check caller->commit();
    } on fail error e {
        log:printError("Processing failed, sending to DLQ", orderId = order.orderId);
        check sendToDLQ(order, e.message());
        check caller->commit(); // Acknowledge so it does not reprocess
    }
}
```

### Acknowledgment Strategies

| Strategy | Guarantee | Use Case |
|---|---|---|
| Auto-acknowledge | At most once | Low-value events, metrics |
| Manual acknowledge | At least once | Business-critical events |
| Transactional | Exactly once | Financial transactions |
