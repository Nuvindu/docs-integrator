---
title: MQTT
description: Subscribe to MQTT topics for IoT data collection and lightweight messaging.
---

# MQTT

Subscribe to MQTT topics for IoT data collection and lightweight messaging.

```ballerina
import ballerinax/mqtt;

configurable string mqttBroker = "tcp://localhost:1883";

type SensorReading record {|
    string sensorId;
    float temperature;
    float humidity;
    string timestamp;
|};

listener mqtt:Listener mqttListener = new (mqttBroker, "sensor-collector", {
    connectionConfig: {
        username: "device",
        password: "secret"
    }
});

@mqtt:ServiceConfig {
    topics: ["sensors/+/readings"],
    qualityOfService: mqtt:EXACTLY_ONCE
}
service on mqttListener {

    remote function onMessage(mqtt:Message message) returns error? {
        SensorReading reading = check (check message.content.ensureType(json)).fromJsonWithType();
        log:printInfo("Sensor reading", sensorId = reading.sensorId,
                      temperature = reading.temperature);
        check storeSensorReading(reading);
    }

    remote function onError(mqtt:Error err) {
        log:printError("MQTT subscriber error", 'error = err);
    }
}
```

## MQTT QoS Levels

| Level | Name | Guarantee |
|---|---|---|
| `0` | At most once | Fire and forget, no acknowledgment |
| `1` | At least once | Acknowledged delivery, possible duplicates |
| `2` | Exactly once | Four-step handshake, no duplicates |
