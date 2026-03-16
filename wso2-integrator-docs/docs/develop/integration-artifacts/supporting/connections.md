---
title: Connections
description: Centralize and reuse connection configurations for databases, HTTP clients, and message brokers.
---

# Connections

Connection artifacts centralize the configuration for external systems. Define connections once and reuse them across multiple services, event handlers, and functions in your project.

```ballerina
// connections.bal
import ballerinax/mysql;
import ballerina/http;
import ballerinax/kafka;

// Database connection
configurable string dbHost = ?;
configurable int dbPort = 3306;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;

final mysql:Client orderDb = check new (
    host = dbHost,
    port = dbPort,
    user = dbUser,
    password = dbPassword,
    database = dbName
);

// HTTP client connection
configurable string crmBaseUrl = ?;
configurable string crmApiKey = ?;

final http:Client crmClient = check new (crmBaseUrl, {
    auth: {token: crmApiKey},
    timeout: 30,
    retryConfig: {
        count: 3,
        interval: 2,
        backOffFactor: 2.0
    }
});

// Kafka producer connection
configurable string kafkaBrokers = "localhost:9092";

final kafka:Producer kafkaProducer = check new ({
    bootstrapServers: kafkaBrokers,
    acks: kafka:ACKS_ALL,
    retryCount: 3
});
```

## Connection Types

| Connection Type | Module | Use Case |
|---|---|---|
| **MySQL** | `ballerinax/mysql` | Relational database queries and persistence |
| **PostgreSQL** | `ballerinax/postgresql` | Relational database queries and persistence |
| **MSSQL** | `ballerinax/mssql` | SQL Server database access |
| **HTTP Client** | `ballerina/http` | REST API calls to external services |
| **Kafka Producer** | `ballerinax/kafka` | Publishing messages to Kafka topics |
| **RabbitMQ Client** | `ballerinax/rabbitmq` | Publishing messages to RabbitMQ |
| **FTP Client** | `ballerinax/ftp` | File transfer operations |

## Connection Management in the Visual Designer

<!-- TODO: Screenshot of the connection management panel in the visual designer -->

The visual designer provides a dedicated panel for managing connections:

1. Click **Connections** in the WSO2 Integrator sidebar.
2. Click **+ Add Connection** and select the connector type.
3. Fill in the connection details (host, credentials, options).
4. Test the connection using the built-in **Test Connection** button.

## Best Practices

| Practice | Description |
|---|---|
| **Dedicated file** | Keep all connections in a `connections.bal` file |
| **Use `configurable`** | Externalize host, port, and credentials so they vary by environment |
| **Use `final`** | Declare connections as `final` to initialize them once at startup |
| **Retry configuration** | Add retry and timeout settings for resilient connections |
| **Connection pooling** | Database clients manage connection pools automatically |
