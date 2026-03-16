---
title: GraphQL Service
description: Build GraphQL APIs with queries, mutations, and subscriptions. (Beta)
---

# GraphQL Service

Build GraphQL APIs with queries, mutations, and subscriptions.

```ballerina
import ballerina/graphql;

service /graphql on new graphql:Listener(9090) {

    // Query: { products(category: "electronics") { id name price } }
    resource function get products(string? category) returns Product[]|error {
        return getProducts(category);
    }

    // Query: { product(id: "123") { id name price } }
    resource function get product(string id) returns Product|error {
        return getProduct(id);
    }

    // Mutation: mutation { addProduct(input: {...}) { id name } }
    remote function addProduct(ProductInput input) returns Product|error {
        return createProduct(input);
    }

    // Subscription: subscription { onProductCreated { id name } }
    resource function subscribe onProductCreated() returns stream<Product, error?> {
        return getProductStream();
    }
}
```

GraphQL services automatically generate the schema from Ballerina types. Use the built-in GraphQL Playground for interactive testing.
