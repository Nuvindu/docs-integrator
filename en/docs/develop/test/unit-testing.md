---
sidebar_position: 3
title: Unit Testing
description: Write and run Ballerina test functions for your integrations.
---

# Unit Testing

Write automated tests for your integrations using Ballerina's built-in test framework. The framework provides annotations, assertions, and lifecycle hooks to structure reliable, repeatable tests.

## Test Organization

Ballerina test files live in a `tests/` directory within your package. Any file inside this directory with the `.bal` extension is treated as a test source file and has access to all symbols in the parent module.

```
my-integration/
  Ballerina.toml
  main.bal
  tests/
    main_test.bal
    Config.toml         # test-specific configuration
    resources/          # test data files
```

Test functions are regular Ballerina functions annotated with `@test:Config`. They are never included in production builds.

## Writing Test Functions

Import the `ballerina/test` module and annotate each test function with `@test:Config`.

```ballerina
import ballerina/test;

// Function under test
function add(int a, int b) returns int {
    return a + b;
}

@test:Config {}
function testAdd() {
    test:assertEquals(add(2, 3), 5, msg = "Addition failed");
}

@test:Config {}
function testAddNegative() {
    test:assertEquals(add(-1, -4), -5);
}
```

The `@test:Config` annotation accepts several optional fields:

| Field          | Type       | Description                                      |
|----------------|------------|--------------------------------------------------|
| `enable`       | `boolean`  | Set to `false` to skip the test (default `true`) |
| `groups`       | `string[]` | Tag the test for selective execution              |
| `dataProvider` | `function` | Supply multiple data sets to the test function    |
| `before`       | `function` | Run a setup function before this test             |
| `after`        | `function` | Run a teardown function after this test           |
| `dependsOn`    | `function[]` | Run this test only after the listed tests pass  |

## Assertions

The `ballerina/test` module provides a set of assertion functions. Every assertion accepts an optional `msg` parameter for custom failure messages.

```ballerina
import ballerina/test;

@test:Config {}
function testAssertions() {
    // Exact value equality
    test:assertEquals(getStatus(200), "OK");

    // Boolean condition
    test:assertTrue(isValid("user@example.com"), msg = "Email should be valid");
    test:assertFalse(isValid(""), msg = "Empty string should be invalid");

    // Inequality check
    test:assertNotEquals(generateId(), "", msg = "ID must not be empty");
}

@test:Config {}
function testExpectedFailure() returns error? {
    // Assert that an error is returned
    var result = parsePayload("<<<invalid>>>");
    if result is error {
        test:assertEquals(result.message(), "Invalid payload format");
    } else {
        test:assertFail(msg = "Expected an error for invalid payload");
    }
}
```

| Assertion                  | Purpose                                        |
|----------------------------|------------------------------------------------|
| `test:assertEquals`        | Values are equal                               |
| `test:assertNotEquals`     | Values are not equal                           |
| `test:assertTrue`          | Condition is `true`                            |
| `test:assertFalse`         | Condition is `false`                           |
| `test:assertFail`          | Unconditionally fail with a message            |
| `test:assertExactEquals`   | Reference equality (same object)               |
| `test:assertNotExactEquals`| References are not the same object             |

## Lifecycle Hooks

Use lifecycle annotations to run setup and teardown logic at different scopes.

```ballerina
import ballerina/test;
import ballerina/log;

@test:BeforeSuite
function setupSuite() {
    log:printInfo("Starting test suite -- initializing resources");
}

@test:AfterSuite
function teardownSuite() {
    log:printInfo("Test suite complete -- cleaning up resources");
}

@test:BeforeEach
function beforeEachTest() {
    // Runs before every individual test function
    log:printInfo("Resetting state for next test");
}

@test:AfterEach
function afterEachTest() {
    // Runs after every individual test function
    log:printInfo("Post-test cleanup");
}
```

| Annotation           | Scope                                    |
|----------------------|------------------------------------------|
| `@test:BeforeSuite`  | Once before any test in the module runs  |
| `@test:AfterSuite`   | Once after all tests in the module run   |
| `@test:BeforeGroups` | Before the first test in specified groups |
| `@test:AfterGroups`  | After the last test in specified groups   |
| `@test:BeforeEach`   | Before every test function               |
| `@test:AfterEach`    | After every test function                |

## Running Tests

### From the visual designer

Open your project in WSO2 Integrator and use the **Run** (▷) button in the toolbar to build and execute your tests. Test results appear in the terminal panel.

### From the CLI

```bash
# Run all tests
bal test

# Run a specific test by name
bal test --tests testAdd

# Run tests in a specific group
bal test --groups unit
```

### From the code editor

1. Click the green **Run** icon that appears above any `@test:Config` function.
2. Use the **Testing** panel in the sidebar to run or debug all tests at once.

:::tip
You can also press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and search for **Ballerina: Run All Tests**.
:::

## Best Practices

- **One assertion per concern** -- keep test functions focused on a single behavior.
- **Use descriptive names** -- `testOrderTotalWithDiscount` is clearer than `testOrder3`.
- **Use `msg` parameters** -- custom messages make failures easier to diagnose.
- **Keep tests independent** -- avoid shared mutable state between test functions.
- **Use lifecycle hooks** to manage setup and teardown rather than duplicating code.

## What's Next

- [Mocking External Services](mocking.md) -- Isolate your tests from external dependencies
- [Data-Driven Tests](data-driven-tests.md) -- Run parameterized tests with data providers
- [Execute Tests](execute-tests.md) -- All the ways to run your test suite
