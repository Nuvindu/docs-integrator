---
title: CDC - MSSQL
description: Capture real-time database changes from Microsoft SQL Server using Change Data Capture.
---

# CDC - MSSQL

Capture database changes in real time from Microsoft SQL Server using Change Data Capture (CDC). React to INSERT, UPDATE, and DELETE events without polling, enabling real-time data synchronization and event-driven architectures.

```ballerina
import ballerinax/mssql.cdc;

configurable string dbHost = "localhost";
configurable int dbPort = 1433;

type CustomerChange record {|
    int id;
    string name;
    string email;
    string phone;
|};

listener cdc:Listener cdcListener = new ({
    host: dbHost,
    port: dbPort,
    user: "cdc_user",
    password: "cdc_password",
    database: "customers_db",
    serverId: 2001
});

@cdc:ServiceConfig {
    tables: ["dbo.customers"]
}
service on cdcListener {

    remote function onCreate(cdc:ChangeRecord change) returns error? {
        log:printInfo("Customer created", data = change.data.toString());
        check syncToExternalCRM("CREATE", change.data);
    }

    remote function onUpdate(cdc:ChangeRecord change) returns error? {
        log:printInfo("Customer updated",
                      before = change.dataBefore.toString(),
                      after = change.data.toString());
        check syncToExternalCRM("UPDATE", change.data);
    }

    remote function onDelete(cdc:ChangeRecord change) returns error? {
        log:printInfo("Customer deleted", data = change.dataBefore.toString());
        check syncToExternalCRM("DELETE", change.dataBefore);
    }
}
```

## Prerequisites

CDC must be enabled on the SQL Server database and the specific tables you want to track.

```sql
-- Enable CDC on the database
EXEC sys.sp_cdc_enable_db;

-- Enable CDC on a table
EXEC sys.sp_cdc_enable_table
    @source_schema = N'dbo',
    @source_name = N'customers',
    @role_name = NULL;
```

## Listener Configuration

| Parameter | Description | Default |
|---|---|---|
| `host` | SQL Server hostname | Required |
| `port` | SQL Server port | `1433` |
| `user` | Database user with CDC read permissions | Required |
| `password` | Database password | Required |
| `database` | Database name with CDC enabled | Required |
| `serverId` | Unique server identifier for the CDC connector | Required |

## Common Patterns

### Multi-Table Tracking

Track changes across multiple related tables for consistent data synchronization.

```ballerina
@cdc:ServiceConfig {
    tables: ["dbo.customers", "dbo.orders", "dbo.order_items"]
}
service on cdcListener {

    remote function onCreate(cdc:ChangeRecord change) returns error? {
        match change.table {
            "dbo.customers" => { check syncCustomer(change.data); }
            "dbo.orders" => { check syncOrder(change.data); }
            "dbo.order_items" => { check syncOrderItem(change.data); }
        }
    }

    remote function onUpdate(cdc:ChangeRecord change) returns error? {
        check syncToExternalSystem(change.table, "UPDATE", change.data);
    }

    remote function onDelete(cdc:ChangeRecord change) returns error? {
        check syncToExternalSystem(change.table, "DELETE", change.dataBefore);
    }
}
```

### Error Handling with Retry

```ballerina
remote function onCreate(cdc:ChangeRecord change) returns error? {
    do {
        check syncToExternalCRM("CREATE", change.data);
    } on fail error e {
        log:printError("CDC sync failed, sending to DLQ",
                      table = change.table, 'error = e);
        check sendToDLQ(change, e.message());
    }
}
```
