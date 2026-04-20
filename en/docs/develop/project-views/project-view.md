---
sidebar_position: 1
title: Project View
description: Manage multi-package integration workspaces in WSO2 Integrator.
---

# Project View

The Workspace View lets you organize multiple integration packages into a single workspace, enabling cross-project navigation, dependency management, and visual organization.

## When to use workspaces

| Scenario | Single Integration | Workspace |
|---|---|---|
| Quick one-off integration | ✅ | |
| Independent service or POC | ✅ | |
| Multiple related integrations | | ✅ |
| Shared types across services | | ✅ |
| Microservice-style architecture | | ✅ |

## Creating a workspace

### From a new integration

1. Open the WSO2 Integrator sidebar.
2. Click **Create New Integration**.
3. Fill in the integration name, package name, and file path.
4. Expand **Optional Configurations**.
5. Enable **Create Workspace** and set a workspace name.
6. Click **Create Integration**.

### Converting an existing integration

To convert a standalone integration into a workspace:

1. Open the integration in WSO2 Integrator.
2. Click the **+** button in the integration panel.
3. Enter the details for the new integration package.
4. Both integrations are now part of a workspace.

## Workspace features

### Cross-Project navigation

In a workspace, **Go to Definition** works across packages. Click on a type or function reference to jump to its definition in any package within the workspace.

### Dependency management

Workspace packages can depend on each other. Add a dependency in `Ballerina.toml`:

```toml
[[dependency]]
org = "myorg"
name = "shared-types"
version = "1.0.0"
repository = "local"
```

### Visual organization

The workspace sidebar groups integrations visually, showing their entry points, connections, and types in a unified tree view.

## Managing workspace integrations

### Adding an integration

Click the **+** button in the workspace panel to add a new package.

### Removing an integration

Hover over an integration name in the workspace panel and click the **delete** icon.

## What's next

- [Integration View](integration-view.md) -- The primary development interface
- [Manage Dependencies](/docs/develop/organize-code/manage-dependencies) -- Handle package dependencies
- [Workspaces](/docs/develop/organize-code/workspaces) -- Advanced workspace configuration
