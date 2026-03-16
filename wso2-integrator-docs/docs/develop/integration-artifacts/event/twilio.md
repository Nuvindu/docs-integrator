---
title: Twilio
description: React to Twilio webhook events such as incoming SMS, call status changes, and voice events.
---

# Twilio

React to Twilio webhook events such as incoming SMS messages, call status changes, and voice events. Twilio delivers events as HTTP POST requests to your service, making this a webhook-based integration pattern.

```ballerina
import ballerina/http;

type TwilioSmsEvent record {|
    string MessageSid;
    string From;
    string To;
    string Body;
    string NumMedia;
|};

// Twilio sends webhooks as HTTP POST requests
service /twilio on new http:Listener(8090) {

    resource function post sms(TwilioSmsEvent event) returns xml {
        log:printInfo("SMS received", from = event.From, body = event.Body);

        // Process the incoming SMS
        string response = processIncomingSms(event.From, event.Body);

        // Return TwiML response
        return xml `<Response><Message>${response}</Message></Response>`;
    }

    resource function post call\-status(http:Request req) returns http:Ok {
        // Handle call status callback
        log:printInfo("Call status update received");
        return http:OK;
    }
}
```

## Webhook Event Types

| Endpoint | Event | Payload |
|---|---|---|
| `POST /twilio/sms` | Incoming SMS | `MessageSid`, `From`, `To`, `Body`, `NumMedia` |
| `POST /twilio/call-status` | Call status change | `CallSid`, `CallStatus`, `Direction`, `Duration` |
| `POST /twilio/voice` | Incoming voice call | `CallSid`, `From`, `To`, `CallStatus` |

## TwiML Responses

Twilio expects TwiML (XML) responses to control call and message behavior.

```ballerina
// Auto-reply based on message content
resource function post sms(TwilioSmsEvent event) returns xml {
    string body = event.Body.toLowerAscii();

    if body.includes("help") {
        return xml `<Response>
            <Message>Available commands: STATUS, HELP, CANCEL. Reply with a command.</Message>
        </Response>`;
    }

    if body.includes("status") {
        string status = checkOrderStatus(event.From);
        return xml `<Response><Message>${status}</Message></Response>`;
    }

    return xml `<Response>
        <Message>Thanks for your message. Reply HELP for options.</Message>
    </Response>`;
}
```

## Webhook Signature Validation

Validate incoming requests to ensure they originate from Twilio.

```ballerina
import ballerina/crypto;

configurable string twilioAuthToken = ?;

resource function post sms(
    @http:Header string x\-twilio\-signature,
    @http:Payload byte[] payload
) returns xml|http:Unauthorized|error {
    // Verify Twilio signature
    byte[] hmac = check crypto:hmacSha1(payload, twilioAuthToken.toBytes());
    string expectedSig = hmac.toBase64();
    if x\-twilio\-signature != expectedSig {
        return http:UNAUTHORIZED;
    }

    TwilioSmsEvent event = check (check string:fromBytes(payload)).fromJsonStringWithType();
    string response = processIncomingSms(event.From, event.Body);
    return xml `<Response><Message>${response}</Message></Response>`;
}
```
