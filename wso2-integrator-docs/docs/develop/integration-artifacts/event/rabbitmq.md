---
title: RabbitMQ
description: Consume messages from RabbitMQ with exchange binding, queue configuration, and acknowledgment control.
---

# RabbitMQ

Consume messages from RabbitMQ with exchange binding, queue configuration, and acknowledgment control.

```ballerina
import ballerinax/rabbitmq;

configurable string rmqHost = "localhost";
configurable int rmqPort = 5672;

type NotificationEvent record {|
    string userId;
    string 'type;
    string message;
|};

listener rabbitmq:Listener rmqListener = new (rmqHost, rmqPort);

@rabbitmq:ServiceConfig {
    queueName: "notifications",
    autoAck: false
}
service on rmqListener {

    remote function onMessage(rabbitmq:AnydataMessage message,
                              rabbitmq:Caller caller) returns error? {
        NotificationEvent event = check message.content.ensureType();
        log:printInfo("Notification received", userId = event.userId, type = event.'type);

        check sendNotification(event);
        check caller->basicAck();
    }

    remote function onError(rabbitmq:AnydataMessage message,
                            rabbitmq:Error err) returns error? {
        log:printError("RabbitMQ processing error", 'error = err);
        // Message will be redelivered or sent to DLQ
    }
}
```
