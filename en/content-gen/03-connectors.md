# Section 7: Connectors

**Question this section answers:** "Can I connect to Y?"

**Audience:** Developer who needs to integrate with a specific external service. May be searching by service name (e.g., "Salesforce", "Kafka", "OpenAI").

**Tone:** Reference-oriented, searchable, consistent across all connectors. Every connector page follows the EXACT same structure.

---

## Connector Overview Page

**File:** `en/docs/connectors/overview.md`
**Status:** EXISTS — modernized with catalog tables and mermaid diagram

---

## Per-Connector Page Structure

Every connector gets 2–4 pages depending on complexity. The structure is:

```
connectors/catalog/<category>/<connector-name>/
├── overview.md           (REQUIRED)
├── setup-guide.md        (only if the external service requires setup steps)
├── action-reference.md   (REQUIRED — one per connector)
└── trigger-reference.md  (only if the connector exposes a Listener/Service)
```

### Template: Connector Overview Page

**Prompt for AI:**

```
Generate an overview page for the [CONNECTOR_NAME] Ballerina connector.

File: en/docs/connectors/catalog/<category>/<connector-slug>/overview.md

Frontmatter (required, exact format):
---
connector: true
connector_name: "<connector-slug>"
title: "<Connector Display Name>"
description: "Overview of the <package-name> connector for WSO2 Integrator."
---

Structure:
1. Opening paragraph (2–3 sentences): what the connector does and what external service it integrates with
2. "## Key Features" section: 4–8 bullet points, each a short feature phrase
3. "## Actions" section:
   - 1–2 sentence intro
   - Table: | Client | Actions | with one row per client type
   - Only include clients users instantiate directly — exclude Caller types
   - Link to action-reference.md
4. "## Triggers" section (ONLY if the connector has a Listener/Service):
   - 1–2 sentence intro
   - Table: | Event | Callback | Description |
   - Link to trigger-reference.md
5. "## Documentation" section: bullet links to setup-guide.md (if applicable),
   action-reference.md, trigger-reference.md (if applicable)
6. "## How to contribute" section: link to the GitHub repo

Rules:
- Source all client names and capability descriptions from the GitHub source code,
  not from Ballerina Central (Central descriptions may be inaccurate)
- Do NOT include code snippets in the overview
- Do NOT include Caller types in the clients table
```

### Template: Setup Guide Page

**Prompt for AI:**

```
Generate a setup guide for the [CONNECTOR_NAME] connector.

File: en/docs/connectors/catalog/<category>/<connector-slug>/setup-guide.md

Frontmatter (required, exact format):
---
connector: true
connector_name: "<connector-slug>"
title: "Setup Guide"
description: "How to set up and configure the <package-name> connector."
---

Structure:
1. Opening sentence: what the setup guide covers
2. "## Prerequisites" section: one bullet per external prerequisite (accounts, tools) — no Ballerina items
3. One ## section per setup step (no "Step N:" prefix in the heading):
   - Service-side steps only: create accounts, generate API keys, configure OAuth apps,
     set permissions, etc.
   - Use :::note, :::tip, or :::warning admonitions where helpful
4. "## Next steps" section: links to action-reference.md and trigger-reference.md (if applicable)

Rules:
- External service configuration ONLY — do NOT include any Ballerina steps
  (no `bal add`, no Config.toml, no client init code, no `bal run`)
- Prerequisites must be external accounts or tools only
- Step headings must not start with "Step N:"
```

### Template: Action Reference Page

**Prompt for AI:**

```
Generate an action reference for the [CONNECTOR_NAME] connector.

File: en/docs/connectors/catalog/<category>/<connector-slug>/action-reference.md

Frontmatter (required, exact format):
---
connector: true
connector_name: "<connector-slug>"
toc_max_heading_level: 4
---

Structure:
1. "# Actions" heading
2. Package intro: which package(s) expose clients (single or multiple)
3. Available clients table: | Client | Purpose | — one row per client, linked to its ## section
   - Exclude Caller types
4. For each client — a ## section:
   a. "### Configuration" — config record name + table:
      | Field | Type | Default | Description |
      - Required fields: Default = "Required" (plain text, no code wrapping)
      - Optional fields: Default = <code>value</code>
      - Type column: always <code>TypeName</code> (not backticks)
   b. "### Initializing the client" — import + init code block
   c. "### Operations" — grouped into #### subsections by entity/capability area:
      Each operation uses a <details><summary>name</summary><div>...</div></details> block containing:
      - Signature line (resource functions only): `METHOD /path/[param]` — omit for remote functions
      - One-paragraph description
      - Parameters table: | Name | Type | Required | Description |
      - Returns line: `ReturnType|error`
      - Sample code block (ballerina) — operation call and result assignment only, no io:println()
      - Sample response block (json) — required for any operation returning data; omit only for error?/()

Rules:
- Operation names: remote functions → exact function name; resource functions → short description
  from the source code doc comment (NOT from Ballerina Central)
- Each operation appears exactly once — do not duplicate across groups
- Every data-returning operation must have a sample response
- Type values in table cells: use <code>TypeName</code>, not backticks
- Pipe characters in cells: &#124;  Curly braces: &#123; &#125;
```

### Template: Trigger Reference Page

**Prompt for AI:**

```
Generate a trigger reference for the [CONNECTOR_NAME] connector.

File: en/docs/connectors/catalog/<category>/<connector-slug>/trigger-reference.md

Frontmatter (required, exact format):
---
connector: true
connector_name: "<connector-slug>"
---

Structure:
1. "# Triggers" heading
2. 1–2 sentence intro
3. Components table: | Component | Role | — rows for Listener, Service, and Caller (omit Caller row
   if the connector has no Caller type)
4. Link to action-reference.md
5. "## Listener" section:
   - Config types table: | Config Type | Description |
   - Config fields table per type: | Field | Type | Default | Description |
   - "### Initializing the listener" — code block with real examples from the repo's examples/ folder
6. "## Service" section:
   - "### Callbacks" table: | Callback | Signature | Description |
     (exact remote function signatures from the connector source)
   - "### Full example" — complete service block from the repo's examples/ folder
7. "## Supporting Types" section: field tables for key event payload record types

Rules:
- Use exact callback signatures from the source code
- Use real examples from the repo's examples/ folder, not invented ones
- Type values in table cells: use <code>TypeName</code>, not backticks
```

---

## Connector Categories

The 16 categories and the types of connectors in each:

| Category | Directory | Key connectors |
|---|---|---|
| AI & Machine Learning | `catalog/ai-ml/` | OpenAI, Claude, Vertex AI, Bedrock, Azure AI |
| Cloud & Infrastructure | `catalog/cloud-infrastructure/` | AWS Lambda, Azure Functions, Elastic Cloud |
| Communication | `catalog/communication/` | Gmail, Slack, Discord, AWS SNS |
| CRM & Sales | `catalog/crm-sales/` | Salesforce (many sub-connectors), HubSpot |
| Database | `catalog/database/` | JDBC, MSSQL, Redis, Redshift, CDC |
| Developer Tools | `catalog/developer-tools/` | GitHub, AMP, Copybook |
| E-Commerce | `catalog/ecommerce/` | Shopify, SAP Commerce |
| ERP & Business | `catalog/erp-business/` | SAP, SAP S/4HANA, Guidewire |
| Finance & Accounting | `catalog/finance-accounting/` | PayPal (orders, payments, invoices, subscriptions) |
| Healthcare | `catalog/healthcare/` | (FHIR connectors via Health Tool) |
| HRMS | `catalog/hrms/` | PeopleHR |
| Marketing & Social | `catalog/marketing-social/` | HubSpot Marketing (campaigns, emails, forms) |
| Messaging | `catalog/messaging/` | Azure Service Bus, AWS SQS, GCP Pub/Sub, Confluent |
| Productivity | `catalog/productivity-collaboration/` | Asana, DocuSign, Google Calendar |
| Security & Identity | `catalog/security-identity/` | SCIM, AWS Secrets Manager |
| Storage & File | `catalog/storage-file/` | AWS S3, Azure Storage, Alfresco, OneDrive |

---

## Build Your Own Pages

### Page: Create from OpenAPI Spec

**File:** `en/docs/connectors/build-your-own/create-from-openapi.md`

**What to cover:**
- Use `bal openapi` to generate connector from OpenAPI spec
- Input: OpenAPI 3.0 YAML/JSON file
- Output: Ballerina client module with typed operations
- Customizing generated code
- Complete example: generate connector from Petstore spec

### Page: Create from WSDL

**File:** `en/docs/connectors/build-your-own/create-from-wsdl.md`

**What to cover:**
- Generate connector from WSDL for SOAP services
- Input: WSDL file URL or local file
- Output: Ballerina client with SOAP operations
- Handling SOAP headers and faults

### Page: Custom Development

**File:** `en/docs/connectors/build-your-own/custom-development.md`

**What to cover:**
- When to build from scratch (no spec available)
- Creating a Ballerina client class
- Implementing operations as remote functions
- Connection management and pooling
- Error handling and retries
- Publishing to Ballerina Central
