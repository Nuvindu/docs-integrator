---
title: CDC - PostgreSQL
description: Capture real-time database changes from PostgreSQL using logical replication and Change Data Capture.
---

# CDC - PostgreSQL

Capture database changes in real time from PostgreSQL using logical replication. React to INSERT, UPDATE, and DELETE events without polling, enabling real-time data synchronization and event-driven architectures.

```ballerina
import ballerinax/postgresql.cdc;

configurable string dbHost = "localhost";
configurable int dbPort = 5432;

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
    slotName: "customer_slot"
});

@cdc:ServiceConfig {
    tables: ["public.customers"]
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

PostgreSQL must be configured for logical replication.

```sql
-- In postgresql.conf
-- wal_level = logical
-- max_replication_slots = 4

-- Create a replication slot
SELECT * FROM pg_create_logical_replication_slot('customer_slot', 'pgoutput');

-- Ensure the table has a replica identity
ALTER TABLE customers REPLICA IDENTITY FULL;
```

## Listener Configuration

| Parameter | Description | Default |
|---|---|---|
| `host` | PostgreSQL hostname | Required |
| `port` | PostgreSQL port | `5432` |
| `user` | Database user with replication permissions | Required |
| `password` | Database password | Required |
| `database` | Database name | Required |
| `slotName` | Logical replication slot name | Required |

## Common Patterns

### Multi-Table Tracking

Track changes across multiple related tables for consistent data synchronization.

```ballerina
@cdc:ServiceConfig {
    tables: ["public.customers", "public.orders", "public.order_items"]
}
service on cdcListener {

    remote function onCreate(cdc:ChangeRecord change) returns error? {
        match change.table {
            "public.customers" => { check syncCustomer(change.data); }
            "public.orders" => { check syncOrder(change.data); }
            "public.order_items" => { check syncOrderItem(change.data); }
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
