---
title: Solace
description: Consume messages from Solace PubSub+ event broker for real-time event streaming.
---

# Solace

Consume messages from Solace PubSub+ event broker. Solace provides high-performance event streaming with topic-based routing, making it suitable for financial services, IoT, and real-time analytics use cases.

```ballerina
import ballerinax/solace;

configurable string solaceUrl = "tcp://localhost:55555";
configurable string vpnName = "default";

type TradeEvent record {|
    string tradeId;
    string symbol;
    decimal price;
    int quantity;
    string side;
|};

listener solace:Listener solaceListener = new ({
    url: solaceUrl,
    msgVpn: vpnName,
    clientName: "trade-processor",
    auth: {
        username: "admin",
        password: "admin"
    }
});

@solace:ServiceConfig {
    topics: ["trades/>"]
}
service on solaceListener {

    remote function onMessage(solace:Message message) returns error? {
        TradeEvent trade = check message.content.ensureType();
        log:printInfo("Trade event", tradeId = trade.tradeId, symbol = trade.symbol);
        check executeTrade(trade);
    }
}
```

## Listener Configuration

| Parameter | Description | Default |
|---|---|---|
| `url` | Solace broker URL | Required |
| `msgVpn` | Message VPN name | `"default"` |
| `clientName` | Client identifier | Required |
| `auth.username` | Authentication username | Required |
| `auth.password` | Authentication password | Required |

## Topic Subscriptions

Solace supports hierarchical topic subscriptions with wildcards.

| Pattern | Matches | Example |
|---|---|---|
| `trades/>` | All topics under `trades/` at any depth | `trades/us/equity`, `trades/eu/fx/spot` |
| `trades/*/equity` | Single-level wildcard | `trades/us/equity`, `trades/eu/equity` |
| `trades/us/equity` | Exact match only | `trades/us/equity` |

## Common Patterns

### Multi-Topic Processing

```ballerina
@solace:ServiceConfig {
    topics: ["trades/>", "orders/>", "risk/>"]
}
service on solaceListener {

    remote function onMessage(solace:Message message) returns error? {
        string topic = message.topic;

        if topic.startsWith("trades/") {
            check processTrade(message);
        } else if topic.startsWith("orders/") {
            check processOrder(message);
        } else if topic.startsWith("risk/") {
            check processRiskAlert(message);
        }
    }
}
```

### Error Handling

```ballerina
@solace:ServiceConfig {
    topics: ["trades/>"]
}
service on solaceListener {

    remote function onMessage(solace:Message message) returns error? {
        do {
            TradeEvent trade = check message.content.ensureType();
            check executeTrade(trade);
        } on fail error e {
            log:printError("Trade processing failed", 'error = e);
            check sendToDLQ(message, e.message());
        }
    }
}
```
