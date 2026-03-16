---
title: Configurations
description: Externalize environment-specific settings using configurable variables and Config.toml.
---

# Configurations

Configuration artifacts externalize values that change between environments using Ballerina's `configurable` keyword. This separates environment-specific settings (URLs, credentials, feature flags) from your integration logic.

```ballerina
// config.bal

// Required configuration (must be provided in Config.toml)
configurable string apiEndpoint = ?;
configurable string apiKey = ?;

// Optional with defaults
configurable int maxRetries = 3;
configurable decimal timeoutSeconds = 30.0;
configurable boolean enableCache = true;
configurable int cacheMaxSize = 1000;

// Complex configuration using records
configurable NotificationConfig notificationConfig = {
    emailEnabled: true,
    slackEnabled: false,
    slackWebhookUrl: ""
};

type NotificationConfig record {|
    boolean emailEnabled;
    boolean slackEnabled;
    string slackWebhookUrl;
|};
```

## Config.toml

Provide values for configurable variables in a `Config.toml` file at the project root.

```toml
apiEndpoint = "https://api.example.com/v2"
apiKey = "sk-abc123"
maxRetries = 5
timeoutSeconds = 60.0
enableCache = true
cacheMaxSize = 5000

[notificationConfig]
emailEnabled = true
slackEnabled = true
slackWebhookUrl = "https://hooks.slack.com/services/..."
```

## Configuration Types

| Type | Example | Notes |
|---|---|---|
| **Required** | `configurable string apiKey = ?;` | Must be provided; build fails otherwise |
| **With default** | `configurable int maxRetries = 3;` | Uses default if not specified |
| **Boolean flag** | `configurable boolean enableCache = true;` | Feature toggles |
| **Record** | `configurable DbConfig db = {...};` | Grouped settings for a subsystem |
| **Array** | `configurable string[] allowedOrigins = [];` | Lists of values |

## Environment-Specific Overrides

Use different `Config.toml` files for each environment.

```
my-integration/
├── Config.toml              # Development defaults
├── Config-staging.toml      # Staging overrides
├── Config-production.toml   # Production overrides
└── ...
```

## Best Practices

| Practice | Description |
|---|---|
| **Dedicated file** | Keep all configurable declarations in a `config.bal` file |
| **Use `?` for secrets** | Mark sensitive values as required so they are never hardcoded |
| **Group related settings** | Use record types to group related configuration values |
| **Document defaults** | Add comments explaining the purpose and valid range of each setting |
