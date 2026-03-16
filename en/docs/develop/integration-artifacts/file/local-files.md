---
title: Local Files
description: Watch local directories for new files and process them with file system event listeners.
---

# Local Files

Watch a local directory for new, modified, or deleted files using the file system listener. Local file handlers are ideal for on-premise integrations, local batch processing, and development workflows where files arrive in a watched directory.

```ballerina
import ballerina/file;
import ballerina/io;

configurable string watchDir = "/data/incoming";

listener file:Listener localListener = new ({
    path: watchDir,
    recursive: false
});

service "fileWatcher" on localListener {

    remote function onCreate(file:FileEvent event) returns error? {
        string filePath = event.name;
        log:printInfo("New file created", path = filePath);

        // Read the file
        string content = check io:fileReadString(filePath);

        // Process based on file extension
        if filePath.endsWith(".csv") {
            check processCsvFile(filePath, content);
        } else if filePath.endsWith(".json") {
            json jsonContent = check content.fromJsonString();
            check processJsonFile(filePath, jsonContent);
        }
    }

    remote function onModify(file:FileEvent event) returns error? {
        log:printInfo("File modified", path = event.name);
    }

    remote function onDelete(file:FileEvent event) returns error? {
        log:printInfo("File deleted", path = event.name);
    }
}
```

## Listener Configuration

| Parameter | Description | Default |
|---|---|---|
| `path` | Directory path to watch | Required |
| `recursive` | Watch subdirectories as well | `false` |

## Processing File Content

### CSV File Processing

```ballerina
import ballerina/io;

type OrderRecord record {|
    string orderId;
    string customerId;
    string product;
    int quantity;
    decimal unitPrice;
|};

function processCsvFile(string filePath, string content) returns error? {
    // Read CSV with typed records
    OrderRecord[] orders = check io:fileReadCsv(filePath);

    foreach OrderRecord order in orders {
        decimal total = order.unitPrice * <decimal>order.quantity;
        log:printInfo("Order processed",
                      orderId = order.orderId,
                      total = total);
        check insertOrder(order);
    }

    log:printInfo("CSV processing complete", records = orders.length());
}
```

### JSON File Processing

```ballerina
import ballerina/io;

type ProductCatalog record {|
    string catalogId;
    string updatedAt;
    Product[] products;
|};

function processJsonFile(string filePath, json content) returns error? {
    ProductCatalog catalog = check content.fromJsonWithType();

    log:printInfo("Processing catalog",
                  catalogId = catalog.catalogId,
                  products = catalog.products.length());

    foreach Product product in catalog.products {
        check upsertProduct(product);
    }
}
```

### Batch Processing with Chunking

For large files, process records in chunks to manage memory and enable partial recovery.

```ballerina
function processBatchFile(string filePath) returns error? {
    stream<OrderRecord, io:Error?> recordStream = check io:fileReadCsvAsStream(filePath);
    int batchSize = 100;
    OrderRecord[] batch = [];
    int totalProcessed = 0;

    check from OrderRecord rec in recordStream
        do {
            batch.push(rec);
            if batch.length() >= batchSize {
                check insertOrderBatch(batch);
                totalProcessed += batch.length();
                log:printInfo("Batch processed", count = totalProcessed);
                batch = [];
            }
        };

    // Process remaining records
    if batch.length() > 0 {
        check insertOrderBatch(batch);
        totalProcessed += batch.length();
    }

    log:printInfo("File processing complete", total = totalProcessed);
}
```
