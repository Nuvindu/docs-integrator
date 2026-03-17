---
sidebar_position: 3
---

# Open integration

This page explains how to open an existing WSO2 Integrator (Ballerina-based) project in VS Code, whether it's stored locally, in version control, or was recently opened.

## Opening a local project

You can open an existing integration project using the VS Code file browser or the command line.

**From the VS Code UI:**

1. Select **File** > **Open Folder** (or press **Ctrl+K Ctrl+O** on Windows/Linux, **Cmd+K Cmd+O** on macOS).
2. Navigate to the directory that contains the `Ballerina.toml` file for your integration project.
3. Select the folder and click **Open**.

When VS Code detects a `Ballerina.toml` file, WSO2 Integrator activates and enables:

- The visual flow designer for building and viewing integration logic
- IntelliSense and code completion for Ballerina
- The WSO2 Integrator sidebar showing project artifacts (services, connectors, configurations)
- The Try-It tool for testing endpoints directly from VS Code

<!-- TODO: add screenshot — VS Code with an opened integration project showing the explorer panel and visual flow designer -->

**From the command line:**

To open a project folder directly in VS Code, run:

```bash
code /path/to/my-integration
```

Alternatively, navigate to the project directory first, then open it:

```bash
cd /path/to/my-integration
code .
```

## Cloning from version control

To clone a Git repository and open it as a WSO2 Integrator project:

1. Open the Command Palette by pressing **Ctrl+Shift+P** (Windows/Linux) or **Cmd+Shift+P** (macOS).
2. Type `Git: Clone` and select it from the list.
3. Paste the repository URL and press **Enter**.
4. Select a local directory where the repository will be cloned.
5. When prompted, click **Open** to open the cloned project in VS Code.

<!-- TODO: add screenshot — Command Palette showing Git: Clone command with a repository URL entered -->

**From the command line:**

You can also clone and open a repository using the terminal:

```bash
git clone <repo-url>
code <directory>
```

## Opening recent projects

To reopen a project you worked on previously:

- Select **File** > **Open Recent** (or press **Ctrl+R** / **Cmd+R**) and choose from the list of recently opened folders.
- Alternatively, open the WSO2 Integrator **Welcome** tab, which displays recently opened projects for quick access.

## Project detection and validation

When you open a folder, WSO2 Integrator performs the following checks:

- **Ballerina.toml presence** — the folder must contain a `Ballerina.toml` file at the root for WSO2 Integrator to recognize it as an integration project.
- **Distribution version compatibility** — the installed Ballerina distribution version is checked against the version declared in `Ballerina.toml`.
- **Dependency resolution** — all packages imported in the project are verified to be available.
- **Syntax checking** — Ballerina source files are validated for syntax errors.

Any issues found during these checks appear in the **Problems** panel (**Ctrl+Shift+M** / **Cmd+Shift+M**) as errors or warnings, often with quick-fix suggestions.

## Resolving dependencies

When you open a project, WSO2 Integrator automatically pulls all dependencies listed in `Ballerina.toml` from Ballerina Central.

To pull dependencies manually, run the following command from your project directory:

```bash
bal pull <package-name>
```

**If dependencies fail to resolve:**

1. Check your network connectivity and confirm you can reach Ballerina Central.
2. Verify that the package name and version in `Ballerina.toml` are correct.
3. Clear the local package cache and retry:

   ```bash
   bal clean
   ```

## Working with multi-module projects

Multi-module Ballerina projects appear in the WSO2 Integrator sidebar with each module displayed as a collapsible section, letting you navigate between modules easily.

A typical multi-module project structure looks like this:

```
my-integration/
├── Ballerina.toml
├── main.bal
└── modules/
    ├── auth/
    │   └── auth.bal
    └── data/
        └── data.bal
```

Each subdirectory under `modules/` is treated as a separate module. The WSO2 Integrator sidebar reflects this structure, grouping artifacts (services, functions, types) under their respective modules.

## Troubleshooting

**Project not detected:**

- Confirm that a `Ballerina.toml` file exists in the root of the opened folder. Without it, WSO2 Integrator does not activate.
- Check that the WSO2 Integrator extension is enabled. Open the Extensions view (**Ctrl+Shift+X** / **Cmd+Shift+X**), search for WSO2 Integrator, and ensure it is enabled.

**Incompatible distribution version:**

If the Ballerina distribution version declared in `Ballerina.toml` doesn't match the installed version, update your distribution:

- List available distributions:

  ```bash
  bal dist list
  ```

- Update to the latest compatible version:

  ```bash
  bal dist update
  ```

## What's next

- [Explore sample integrations](explore-samples.md) — browse and import pre-built integration samples to get started quickly.
- [Import an external project](import-external.md) — bring in projects from other tools and formats into WSO2 Integrator.
