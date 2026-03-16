---
title: Types
description: Define shared data structures with record types, enums, union types, and table types for type-safe integrations.
---

# Types

Type artifacts define the data structures used throughout your integration. They ensure type safety across services, event handlers, and transformations. Define types in dedicated `.bal` files and reuse them across all artifacts in your project.

## Defining Record Types

```ballerina
// types.bal

// Request/response types
type OrderRequest record {|
    string customerId;
    LineItem[] items;
    Address shippingAddress;
    string? couponCode;
|};

type LineItem record {|
    string productId;
    string productName;
    int quantity;
    decimal unitPrice;
|};

type Address record {|
    string street;
    string city;
    string state;
    string zipCode;
    string country;
|};
```

## Enum Types

Use enums for fixed value sets that represent a known list of options.

```ballerina
enum OrderStatus {
    PENDING,
    CONFIRMED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}
```

## Union Types

Union types allow a field to accept one of several distinct shapes, providing flexibility with type safety.

```ballerina
type PaymentMethod CreditCard|BankTransfer|DigitalWallet;

type CreditCard record {|
    string cardNumber;
    string expiryDate;
    string cvv;
|};

type BankTransfer record {|
    string bankName;
    string accountNumber;
    string routingNumber;
|};

type DigitalWallet record {|
    string provider;
    string walletId;
|};
```

## Table Types

Use table types for in-memory collections with key-based lookup.

```ballerina
type ProductTable table<Product> key(id);

type Product record {|
    readonly string id;
    string name;
    decimal price;
    int stock;
|};

// Usage
ProductTable products = table [
    {id: "P001", name: "Widget", price: 9.99, stock: 100},
    {id: "P002", name: "Gadget", price: 24.99, stock: 50}
];

Product? widget = products["P001"];
```

## Best Practices

| Practice | Description |
|---|---|
| **Closed records** | Use `record {\| ... \|}` to restrict fields to only those defined |
| **Dedicated files** | Keep type definitions in separate `types.bal` files |
| **Descriptive names** | Name types after their domain concept (e.g., `OrderRequest`, not `Data`) |
| **Reuse across artifacts** | Define types once and import them in services, event handlers, and functions |
