---
title: Configurations
description: Externalize environment-specific settings with configurable variables, Config.toml, and environment variables.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configurations

Configuration artifacts externalize values that change between environments using Ballerina's `configurable` keyword. This separates environment-specific settings (URLs, credentials, feature flags) from your integration logic. At runtime, the integration resolves each variable from `Config.toml`, environment variables, or command-line arguments.

For the underlying configuration model, the full list of supported sources, and resolution priority, see [Configuration management](../../design-logic/configuration-management.md).

## Adding a configuration

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open your integration project in **WSO2 Integrator**.

   ![WSO2 Integrator sidebar showing the project structure with Configurations listed](/img/develop/integration-artifacts/supporting/configurations/step-1.png)

2. Click **+** next to **Configurations** in the sidebar.

3. In the **Add Configurable Variable** panel, fill in the following fields:

   ![Add Configurable Variable form showing Variable Name, Variable Type, Default Value, and Documentation fields](/img/develop/integration-artifacts/supporting/configurations/step-2.png)

   | Field | Description |
   |---|---|
   | **Variable Name** | The identifier used to reference the variable in code (for example, `apiEndpoint`). Required. |
   | **Variable Type** | The Ballerina type of the variable (for example, `string`, `int`, `boolean`, or a record type). Required. |
   | **Default Value** | An optional default value. Leave empty to make the variable required — the integration fails to start unless a value is supplied through `Config.toml`, an environment variable, or a CLI argument. |
   | **Documentation** | Optional Markdown description rendered as inline documentation. |

4. Click **Save**. The variable is added to your project's configurable declarations.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Declare configurable variables at the module level using the `configurable` keyword:

```ballerina
// config.bal

// Required configuration (must be provided in Config.toml)
configurable string apiEndpoint = ?;
configurable string apiKey = ?;

// Optional configuration with defaults
configurable int maxRetries = 3;
configurable decimal timeoutSeconds = 30.0d;
configurable boolean enableCache = true;
configurable int cacheMaxSize = 1000;

// Grouped configuration using a record type
type NotificationConfig record {|
    boolean emailEnabled;
    boolean slackEnabled;
    string slackWebhookUrl;
|};

configurable NotificationConfig notificationConfig = {
    emailEnabled: true,
    slackEnabled: false,
    slackWebhookUrl: ""
};
```

Variables initialized with `?` have no default and must be supplied at runtime; otherwise, the integration fails to start.

</TabItem>
</Tabs>

## Viewing configurations

Click the configurations icon next to **Configurations** in the sidebar to open the **Configurable Variables** panel.

![Configurable Variables panel showing variables grouped by Integration and Imported libraries](/img/develop/integration-artifacts/supporting/configurations/step-3.png)

The panel organizes variables into two groups:

- **Integration** — variables declared in your integration project. Each entry shows the variable name, type, and default value.
- **Imported libraries** — configurable variables exposed by libraries your integration depends on (for example, `ballerina/http` or `ballerina/log`).

Use the **Search Configurables** box to filter by name. Click a variable to edit or delete it.

## Providing values

Place a `Config.toml` file at the project root (alongside `Ballerina.toml`) to supply values for configurable variables. The runtime reads it automatically at startup.

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

Values can also be supplied through environment variables (`BAL_CONFIG_VAR_*`), inline TOML (`BAL_CONFIG_DATA`), or command-line arguments (`-C`). When a variable is defined in more than one source, the runtime applies a fixed priority order. See [Configuration management](../../design-logic/configuration-management.md#environment-variables) for the full source list and priority.

## Configuration types

Configurable variables support primitive types, arrays, maps, records, and tables.

| Type | Example |
|---|---|
| `int` | `configurable int port = 8080;` |
| `float` | `configurable float threshold = 0.75;` |
| `decimal` | `configurable decimal taxRate = 0.08d;` |
| `string` | `configurable string apiKey = ?;` |
| `boolean` | `configurable boolean debug = false;` |
| Arrays | `configurable string[] allowedOrigins = ["*"];` |
| `map<string>` | `configurable map<string> headers = {};` |
| Records | `configurable DatabaseConfig dbConfig = ?;` |
| Tables | `configurable table<Employee> key(id) employees = table [];` |

Use `?` to declare a variable as required (no default) and a literal value for optional variables.

## Per-environment configuration

Maintain a separate configuration file for each environment and select the active file at startup with the `BAL_CONFIG_FILES` environment variable.

```
my-integration/
├── Ballerina.toml
├── Config.toml              # Local development defaults
├── config/
│   ├── dev.toml
│   ├── staging.toml
│   └── prod.toml
└── main.bal
```

```bash
BAL_CONFIG_FILES=config/staging.toml bal run
BAL_CONFIG_FILES=config/prod.toml bal run
```

## Best practices

| Practice | Description |
|---|---|
| **Dedicated file** | Keep configurable declarations in a dedicated `config.bal` file so all settings are easy to locate. |
| **Mark required values explicitly** | Use `?` for values that must come from the environment (endpoints, credentials) so misconfiguration fails fast at startup. |
| **Group related settings** | Use record types to group settings that belong to the same subsystem (for example, database, CRM, notifications). |
| **Never commit secrets** | Keep secrets out of `Config.toml` files in version control. Supply them through environment variables or a gitignored secrets file. See [Secrets and encryption](../../../deploy-operate/secure/secrets-encryption.md). |
| **Document defaults** | Use the **Documentation** field (or code comments) to explain the purpose and valid range of each setting. |

## What's next

- [Configuration management](../../design-logic/configuration-management.md) — Deeper reference for configuration sources, priority order, and module-qualified keys.
- [Secrets and encryption](../../../deploy-operate/secure/secrets-encryption.md) — Securely manage credentials and other sensitive values.
- [Connections](connections.md) — Use configurable variables to parameterize connections.
