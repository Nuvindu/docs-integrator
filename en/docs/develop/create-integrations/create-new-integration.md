---
sidebar_position: 2
---

# Create a new integration

WSO2 Integrator provides a guided wizard to create a new integration project from scratch. Use this approach when you want to initialize a new project without starting from a sample.

## Starting the wizard

In the WSO2 Integrator panel, click **Create**.

<!-- TODO: add screenshot — initial view -->

The **Create Integration** form opens.

## Configuring the project

Fill in the following fields to configure your project:

- **Project name** — enter a name for your integration. This is used as the display name and as the default Ballerina package name.
- **Location** — select the directory where the project folder will be created.
- **Ballerina package name** — automatically set to match the project name. The package name determines the directory name and must use lowercase letters, digits, and underscores. You can change it if needed.

The following fields are optional and are useful when creating a project as part of a workspace:

- **Organization** — the Ballerina organization that owns this package. Required if you plan to publish the package to Ballerina Central.
- **Package version** — the initial version of the package (for example, `1.0.0`).

After filling in the required fields, click **Create Integration**.

<!-- TODO: add screenshot — initialization view -->

WSO2 Integrator generates the project files and opens the new project in VS Code.

## What gets generated

The wizard creates a Ballerina project with the following structure:

```
<project-name>/
├── Ballerina.toml     # Package metadata, organization, and version
├── main.bal           # Entry point for your integration logic
└── tests/
    └── main_test.bal  # Starter test file
```

## Learn more

- [Ballerina packages and modules](../organize-code/packages-modules.md) — understand how Ballerina packages and modules are structured
- [Workspaces](../organize-code/workspaces.md) — organize multiple related packages together in a single VS Code workspace

## What's next

- [Open an existing integration](open-integration.md) — open a project you already have on disk or in version control
- [Explore sample integrations](explore-samples.md) — browse built-in samples to see common integration patterns
