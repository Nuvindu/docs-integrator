---
title: Data Mapper
description: Transform data between formats using the visual data mapper or code-based mapping functions.
---

# Data Mapper

Data mapper artifacts define transformations between data structures. Use the visual data mapper for drag-and-drop field mapping or write code-based mapping functions for complex transformations.

<!-- TODO: Screenshot of the visual data mapper showing source-to-target field mapping -->

## Visual Data Mapper

The visual data mapper lets you draw connections between source and target fields:

1. Right-click in the project explorer and select **New > Data Mapper**.
2. Define the source and target types.
3. Draw field mappings in the visual canvas.
4. Add transformation expressions for fields that need conversion.

## Code-Based Mapping

For complex transformations, write mapping functions directly in Ballerina.

```ballerina
// mappers/order_mapper.bal

type ExternalOrder record {|
    string order_id;
    string customer_ref;
    ExternalLineItem[] line_items;
    string ship_to_address;
    string order_date;
|};

type ExternalLineItem record {|
    string sku;
    string description;
    int qty;
    string unit_price;
|};

function mapToInternalOrder(ExternalOrder ext) returns OrderRequest => {
    customerId: ext.customer_ref,
    items: from ExternalLineItem item in ext.line_items
        select {
            productId: item.sku,
            productName: item.description,
            quantity: item.qty,
            unitPrice: check decimal:fromString(item.unit_price)
        },
    shippingAddress: parseAddress(ext.ship_to_address),
    couponCode: ()
};

function parseAddress(string addressStr) returns Address {
    string[] parts = re `,`.split(addressStr);
    return {
        street: parts.length() > 0 ? parts[0].trim() : "",
        city: parts.length() > 1 ? parts[1].trim() : "",
        state: parts.length() > 2 ? parts[2].trim() : "",
        zipCode: parts.length() > 3 ? parts[3].trim() : "",
        country: parts.length() > 4 ? parts[4].trim() : "US"
    };
}
```

## When to Use Each Approach

| Approach | Best For |
|---|---|
| **Visual Data Mapper** | Simple field-to-field mappings, non-technical users, quick prototyping |
| **Code-Based Mapping** | Complex transformations, conditional logic, aggregations, multi-step processing |

## Best Practices

| Practice | Description |
|---|---|
| **Dedicated files** | Keep mapping functions in a `mappers/` directory |
| **Typed input/output** | Use specific record types for source and target |
| **Expression mappings** | Use Ballerina expressions for inline transformations (e.g., type conversion, string formatting) |
| **Reusable helpers** | Extract common transformations (e.g., `parseAddress`) into shared functions |
