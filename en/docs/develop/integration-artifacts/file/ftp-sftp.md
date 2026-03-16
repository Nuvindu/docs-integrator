---
title: FTP / SFTP
description: Process files from FTP and SFTP servers with polling, pattern matching, and secure transfer.
---

# FTP / SFTP

Poll FTP and SFTP servers for new files and process them as they arrive. File handlers are essential for ETL pipelines, batch processing, and B2B integrations where partners exchange data as CSV, XML, JSON, or EDI files.

## FTP File Handler

Poll an FTP server for new files and process them as they arrive.

```ballerina
import ballerinax/ftp;
import ballerina/io;

configurable string ftpHost = "ftp.example.com";
configurable int ftpPort = 21;
configurable string ftpUser = ?;
configurable string ftpPassword = ?;

listener ftp:Listener ftpListener = new ({
    host: ftpHost,
    port: ftpPort,
    auth: {
        credentials: {
            username: ftpUser,
            password: ftpPassword
        }
    },
    path: "/incoming/orders",
    pollingInterval: 30,
    fileNamePattern: "*.csv"
});

service on ftpListener {

    remote function onFileChange(ftp:WatchEvent event, ftp:Caller caller) returns error? {
        foreach ftp:FileInfo file in event.addedFiles {
            log:printInfo("New file detected", name = file.name, size = file.size);

            // Download file content
            stream<io:Block, io:Error?> fileStream = check caller->get(file.pathDecoded);
            byte[] content = check readStream(fileStream);

            // Process the file
            check processOrderFile(file.name, content);

            // Move to processed directory
            check caller->rename(file.pathDecoded, "/processed/" + file.name);
        }
    }
}
```

### FTP Listener Configuration

| Parameter | Description | Default |
|---|---|---|
| `host` | FTP server hostname | Required |
| `port` | FTP server port | `21` |
| `path` | Directory to monitor | `/` |
| `pollingInterval` | Seconds between polls | `60` |
| `fileNamePattern` | Glob pattern for file matching | `*` |

## SFTP File Handler

Poll an SFTP server using SSH-based secure file transfer.

```ballerina
import ballerinax/ftp;
import ballerina/io;

configurable string sftpHost = "sftp.partner.com";
configurable int sftpPort = 22;
configurable string sftpUser = ?;
configurable string privateKeyPath = ?;

listener ftp:Listener sftpListener = new ({
    protocol: ftp:SFTP,
    host: sftpHost,
    port: sftpPort,
    auth: {
        privateKey: {
            path: privateKeyPath,
            password: ""
        },
        credentials: {
            username: sftpUser
        }
    },
    path: "/data/inbound",
    pollingInterval: 60,
    fileNamePattern: "*.xml"
});

service on sftpListener {

    remote function onFileChange(ftp:WatchEvent event, ftp:Caller caller) returns error? {
        foreach ftp:FileInfo file in event.addedFiles {
            log:printInfo("SFTP file received", name = file.name);

            stream<io:Block, io:Error?> fileStream = check caller->get(file.pathDecoded);
            byte[] content = check readStream(fileStream);

            // Parse and process XML content
            xml xmlContent = check xml:fromBytes(content);
            check processXmlData(xmlContent);

            // Archive after processing
            check caller->rename(file.pathDecoded, "/data/archive/" + file.name);
        }
    }
}
```

## Error Handling for File Operations

```ballerina
service on ftpListener {

    remote function onFileChange(ftp:WatchEvent event, ftp:Caller caller) returns error? {
        foreach ftp:FileInfo file in event.addedFiles {
            do {
                check processFile(file, caller);
                check caller->rename(file.pathDecoded, "/processed/" + file.name);
            } on fail error e {
                log:printError("File processing failed",
                              file = file.name, 'error = e);
                // Move to error directory instead
                check caller->rename(file.pathDecoded, "/errors/" + file.name);
                // Send alert notification
                check sendAlert("File processing failed: " + file.name);
            }
        }
    }
}
```

## Writing Output Files

After processing, write results to files on FTP/SFTP servers.

```ballerina
import ballerinax/ftp;
import ballerina/io;

final ftp:Client ftpClient = check new ({
    host: "ftp.partner.com",
    port: 21,
    auth: {credentials: {username: "user", password: "pass"}}
});

function writeOutputFile(OrderSummary[] summaries) returns error? {
    // Write to local CSV first
    check io:fileWriteCsv("/tmp/summary.csv", summaries);

    // Upload to FTP
    byte[] content = check io:fileReadBytes("/tmp/summary.csv");
    stream<io:Block, io:Error?> byteStream = new (content);
    check ftpClient->put("/outbound/summary.csv", byteStream);

    log:printInfo("Output file uploaded", records = summaries.length());
}
```
