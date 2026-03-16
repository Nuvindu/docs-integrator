---
title: Salesforce Events
description: Listen to Salesforce platform events, Change Data Capture events, and PushTopic events in real time.
---

# Salesforce Events

Listen to Salesforce platform events, Change Data Capture (CDC) events, and PushTopic events in real time. Salesforce event listeners enable reactive integrations that respond instantly when records change in your Salesforce org.

```ballerina
import ballerinax/salesforce;

configurable string sfBaseUrl = ?;
configurable string sfToken = ?;

type OpportunityChangeEvent record {|
    string Id;
    string Name;
    string StageName;
    decimal Amount;
    string CloseDate;
|};

listener salesforce:Listener sfListener = new ({
    baseUrl: sfBaseUrl,
    auth: {token: sfToken}
});

@salesforce:ServiceConfig {
    channelName: "/data/OpportunityChangeEvent"
}
service on sfListener {

    remote function onEvent(OpportunityChangeEvent event) returns error? {
        log:printInfo("Opportunity changed",
                      name = event.Name,
                      stage = event.StageName,
                      amount = event.Amount);
        check syncOpportunityToCRM(event);
    }
}
```

## Supported Event Channels

| Channel Type | Channel Pattern | Use Case |
|---|---|---|
| **Change Data Capture** | `/data/<ObjectName>ChangeEvent` | React to record creates, updates, deletes, and undeletes |
| **Platform Events** | `/event/<EventName>__e` | Custom event-driven messaging between systems |
| **PushTopics** | `/topic/<TopicName>` | Query-based notifications when records match criteria |

## Listener Configuration

| Parameter | Description | Required |
|---|---|---|
| `baseUrl` | Salesforce instance URL (e.g., `https://myorg.my.salesforce.com`) | Yes |
| `auth.token` | OAuth access token or session token | Yes |
| `channelName` | The event channel to subscribe to | Yes |

## Common Patterns

### Multi-Object Change Tracking

Subscribe to multiple Salesforce objects by deploying separate listeners.

```ballerina
@salesforce:ServiceConfig {
    channelName: "/data/AccountChangeEvent"
}
service on sfListener {

    remote function onEvent(AccountChangeEvent event) returns error? {
        check syncAccount(event);
    }
}

@salesforce:ServiceConfig {
    channelName: "/data/ContactChangeEvent"
}
service on sfListener {

    remote function onEvent(ContactChangeEvent event) returns error? {
        check syncContact(event);
    }
}
```

### Error Handling

```ballerina
@salesforce:ServiceConfig {
    channelName: "/data/OpportunityChangeEvent"
}
service on sfListener {

    remote function onEvent(OpportunityChangeEvent event) returns error? {
        do {
            check syncOpportunityToCRM(event);
        } on fail error e {
            log:printError("Failed to sync opportunity",
                          name = event.Name, 'error = e);
            check sendToDLQ(event, e.message());
        }
    }
}
```
