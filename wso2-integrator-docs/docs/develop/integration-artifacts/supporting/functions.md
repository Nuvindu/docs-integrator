---
title: Functions
description: Encapsulate reusable logic in function artifacts for validation, transformation, and shared operations.
---

# Functions

Function artifacts encapsulate reusable logic that can be called from any integration artifact. Keep functions in separate `.bal` files organized by domain to maintain clean separation of concerns.

## Validation Functions

```ballerina
// functions/validation.bal

function validateEmail(string email) returns boolean {
    // Simple email validation
    return email.includes("@") && email.includes(".");
}

function validateOrderRequest(OrderRequest request) returns string[] {
    string[] errors = [];

    if request.items.length() == 0 {
        errors.push("Order must have at least one item");
    }

    foreach LineItem item in request.items {
        if item.quantity <= 0 {
            errors.push("Invalid quantity for product: " + item.productId);
        }
        if item.unitPrice < 0d {
            errors.push("Invalid price for product: " + item.productId);
        }
    }

    if request.shippingAddress.zipCode.length() != 5 {
        errors.push("ZIP code must be 5 digits");
    }

    return errors;
}
```

## Transformation Functions

```ballerina
// functions/transforms.bal

function calculateOrderTotal(LineItem[] items, string? couponCode) returns decimal {
    decimal subtotal = 0;
    foreach LineItem item in items {
        subtotal += item.unitPrice * <decimal>item.quantity;
    }

    // Apply discount
    decimal discount = getDiscount(couponCode);
    return subtotal * (1 - discount);
}

function getDiscount(string? couponCode) returns decimal {
    match couponCode {
        "SAVE10" => { return 0.10d; }
        "SAVE20" => { return 0.20d; }
        _ => { return 0d; }
    }
}
```

## Project Organization

Group functions by their domain to keep the codebase organized.

```
my-integration/
├── functions/
│   ├── validation.bal         # Input validation functions
│   ├── transforms.bal         # Data transformation functions
│   ├── notifications.bal      # Notification helper functions
│   └── formatting.bal         # String/date formatting utilities
├── types.bal
├── connections.bal
└── main.bal
```

## Best Practices

| Practice | Description |
|---|---|
| **Single responsibility** | Each function should do one thing well |
| **Typed parameters** | Use specific record types instead of `json` or `anydata` |
| **Error returns** | Return `error?` for operations that can fail |
| **Isolated functions** | Mark pure functions as `isolated` for thread safety |
| **Descriptive names** | Use verb-based names like `validateOrder`, `calculateTotal` |
