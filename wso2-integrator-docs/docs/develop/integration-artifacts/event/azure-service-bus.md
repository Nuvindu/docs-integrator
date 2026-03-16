---
title: Azure Service Bus
description: Consume messages from Azure Service Bus queues and topic subscriptions.
---

# Azure Service Bus

Consume messages from Azure Service Bus queues and topic subscriptions.

```ballerina
import ballerinax/asb;

configurable string connectionString = ?;

type InvoiceMessage record {|
    string invoiceId;
    string vendorId;
    decimal amount;
    string currency;
|};

listener asb:Listener asbListener = new ({
    connectionString: connectionString,
    entityConfig: {
        queueName: "invoices"
    },
    receiveMode: asb:PEEK_LOCK,
    maxConcurrency: 5
});

service on asbListener {

    remote function onMessage(asb:Message message,
                              asb:Caller caller) returns error? {
        InvoiceMessage invoice = check message.body.ensureType();
        log:printInfo("Invoice received", invoiceId = invoice.invoiceId);

        check processInvoice(invoice);
        check caller->complete(message);
    }

    remote function onError(asb:MessageRetrievalError err) {
        log:printError("Azure Service Bus error", 'error = err);
    }
}
```
