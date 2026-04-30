import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import { connectorVersionedDocs } from './src/utils/sidebarUtils';

/**
 * WSO2 Integrator Documentation — Sidebar Configuration
 *
 * Structure follows the Documentation Blueprint (March 2026).
 * Seven top-level sections answering seven developer questions:
 *
 *   Get Started       — "I'm new — what is this and how do I begin?"
 *   Develop           — "How do I build, transform, and test X?"
 *   Connectors        — "Can I connect to Y?"
 *   GenAI             — "How do I build AI agents, RAG, or MCP?"
 *   Tutorials         — "Show me a complete, real example"
 *   Deploy & Operate  — "How do I ship, run, and secure this?"
 *   Reference         — "What's the exact syntax / config / API for Z?"
 */
const sidebars: SidebarsConfig = {
  mainSidebar: [
    // ─────────────────────────────────────────────
    // GET STARTED
    // "I'm new — what is this and how do I begin?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Get started',
      collapsed: true,
      link: { type: 'doc', id: 'get-started/overview-and-architecture' },
      items: [
        'get-started/overview-and-architecture',
        'get-started/why',
        'get-started/key-concepts',
        {
          type: 'category',
          label: 'Set up',
          items: [
            'get-started/system-requirements',
            'get-started/install',
            'get-started/create-project',
            'get-started/understand-ide',
          ],
        },
        {
          type: 'category',
          label: 'Quick starts',
          items: [
            'get-started/build-automation',
            'get-started/build-ai-agent',
            'get-started/build-api-integration',
            'get-started/build-event-driven-integration',
            'get-started/build-file-driven-integration',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DEVELOP
    // "How do I build, transform, and test X?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Develop',
      collapsed: true,
      link: { type: 'doc', id: 'develop/develop' },
      items: [
        // 6.1 Create Integrations
        {
          type: 'category',
          label: 'Create Integrations',
          items: [
            'develop/create-integrations/create-a-new-integration',
            'develop/create-integrations/open-existing-integration',
            'develop/create-integrations/explore-sample-integrations',
            'develop/create-integrations/create-a-library',
            'develop/create-integrations/create-a-project',
            'develop/create-integrations/open-a-project',
            'develop/create-integrations/migrate-third-party-integrations',
          ],
        },
        // 6.2 Project Views
        {
          type: 'category',
          label: 'Project Views',
          items: [
            'develop/project-views/project-view',
            'develop/project-views/integration-view',
            'develop/project-views/library-view',
          ],
        },
        // 6.3 Integration Artifacts
        {
          type: 'category',
          label: 'Integration artifacts',
          items: [
            'develop/integration-artifacts/automation',
            {
              type: 'category', label: 'Integration as API',
              collapsed: true,
              items: [
                'develop/integration-artifacts/service/http',
                'develop/integration-artifacts/service/graphql',
                'develop/integration-artifacts/service/tcp',
                'develop/integration-artifacts/service/websocket',
                'develop/integration-artifacts/service/websub-hub',
                'develop/integration-artifacts/service/grpc',
              ],
            },
            {
              type: 'category', label: 'Event-driven integration',
              collapsed: true,
              items: [
                'develop/integration-artifacts/event/kafka',
                'develop/integration-artifacts/event/rabbitmq',
                'develop/integration-artifacts/event/mqtt',
                'develop/integration-artifacts/event/azure-service-bus',
                'develop/integration-artifacts/event/pop3imap4',
                'develop/integration-artifacts/event/salesforce-events',
                'develop/integration-artifacts/event/twilio',
                'develop/integration-artifacts/event/github-webhooks',
                'develop/integration-artifacts/event/solace',
                'develop/integration-artifacts/event/cdc-mssql',
                'develop/integration-artifacts/event/cdc-postgresql',
              ],
            },
            {
              type: 'category', label: 'File-driven integration',
              collapsed: true,
              items: [
                {
                  type: 'category', label: 'Remote Servers (FTP/SFTP)',
                  collapsed: true,
                  link: { type: 'doc', id: 'develop/integration-artifacts/file/ftp-sftp' },
                  items: [
                    'develop/integration-artifacts/file/high-availability-and-coordination',
                    'develop/integration-artifacts/file/dependency-and-trigger-conditions',
                    'develop/integration-artifacts/file/streaming-large-files',
                    'develop/integration-artifacts/file/csv-fault-tolerance',
                  ],
                },
                'develop/integration-artifacts/file/local-files',
              ],
            },
            {
              type: 'category', label: 'Other artifacts',
              collapsed: true,
              items: [
                'develop/integration-artifacts/supporting/types',
                'develop/integration-artifacts/supporting/connections',
                'develop/integration-artifacts/supporting/configurations',
                'develop/integration-artifacts/supporting/functions',
                'develop/integration-artifacts/supporting/data-mapper',
              ],
            },
          ],
        },
        // 6.4 Design Integration Logic
        {
          type: 'category',
          label: 'Design integration logic',
          items: [
            'develop/design-logic/design-logic',
            'develop/design-logic/visual-flow-designer',
            'develop/design-logic/managing-connections',
            'develop/design-logic/control-flow',
            'develop/design-logic/error-handling',
            'develop/design-logic/expressions',
            'develop/design-logic/query-expressions',
            'develop/design-logic/configuration-management',
            'develop/design-logic/functions',
            'develop/design-logic/ballerina-pro-code',
            'develop/design-logic/java-interoperability',
          ],
        },
        // 6.5 Transform (per blueprint)
        {
          type: 'category',
          label: 'Transform',
          items: [
            'develop/transform/data-mapper',
            'develop/transform/json',
            'develop/transform/xml',
            'develop/transform/csv-flat-file',
            'develop/transform/edi',
            'develop/transform/pdf',
            'develop/transform/yaml-toml',
            'develop/transform/type-system',
            'develop/transform/query-expressions',
            'develop/transform/expressions-functions',
          ],
        },
        // 6.6 Try & Test
        {
          type: 'category',
          label: 'Try and test',
          items: [
            'develop/test/built-in-try-it-tool',
            'develop/test/unit-testing',
            'develop/test/services-clients',
            'develop/test/data-driven-tests',
            'develop/test/groups',
            'develop/test/mocking',
            'develop/test/execute-tests',
            'develop/test/code-coverage-and-reports',
          ],
        },
        // 6.7 Debugging & Troubleshooting
        {
          type: 'category',
          label: 'Debugging & Troubleshooting',
          items: [
            'develop/debugging/troubleshooting',
            'develop/debugging/errors-and-stack-traces',
            'develop/debugging/editor',
            'develop/debugging/remote',
            'develop/debugging/strand-dump-analysis',
            'develop/debugging/performance-profiling',
          ],
        },
        // 6.8 Organize Code
        {
          type: 'category',
          label: 'Organize code',
          items: [
            'develop/organize-code/packages-modules',
            'develop/organize-code/package-references-imports',
            'develop/organize-code/dependencies',
            'develop/organize-code/workspaces',
            {type: 'doc', id: 'develop/organize-code/style-guide', label: 'Code Style Guide & Formatting'},
            {type: 'doc', id: 'develop/organize-code/generate-documentation', label: 'Generating Code Documentation'},
          ],
        },
        // 6.9 Tools
        {
          type: 'category',
          label: 'Tools',
          link: { type: 'doc', id: 'develop/tools/tools' },
          items: [
            {
              type: 'category',
              label: 'Integration Tools',
              collapsed: true,
              items: [
                'develop/tools/integration-tools/openapi-tool',
                'develop/tools/integration-tools/graphql-tool',
                'develop/tools/integration-tools/asyncapi-tool',
                'develop/tools/integration-tools/grpc-tool',
                'develop/tools/integration-tools/health-tool',
                'develop/tools/integration-tools/edi-tool',
                'develop/tools/integration-tools/wsdl-tool',
                'develop/tools/integration-tools/xsd-tool',
              ],
            },
            {
              type: 'category',
              label: 'Migration Tools',
              link: { type: 'doc', id: 'develop/tools/migration-tools/migration-tools' },
              collapsed: true,
              items: [
                'develop/tools/migration-tools/migrate-from-mi',
                'develop/tools/migration-tools/migrate-from-mulesoft',
                'develop/tools/migration-tools/migrate-from-tibco-businessworks',
                'develop/tools/migration-tools/migrate-from-azure-logic-apps',
              ],
            },
            {
              type: 'category',
              label: 'Other',
              collapsed: true,
              items: [
                'develop/tools/other/scan-tool',
                'develop/tools/other/persist-tool',
              ],
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // CONNECTORS
    // "Can I connect to Y?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Connectors',
      collapsed: true,
      link: { type: 'doc', id: 'connectors/overview' },
      items: [
    // ── Connector Catalog ──
    {
      type: 'category',
      label: 'Connector catalog',
      collapsed: true,
      link: { type: 'doc', id: 'connectors/catalog/index' },
      items: [
        // ── Connector categories (alphabetical) ──
        {
          type: 'category',
          label: 'AI',
          link: { type: 'doc', id: 'connectors/catalog/built-in/ai/ai' },
          items: [
            'connectors/catalog/built-in/ai/action-reference',
            'connectors/catalog/built-in/ai/trigger-reference',
          ],
        },
        {
          type: 'category',

          label: 'Alfresco',
          link: { type: 'doc', id: 'connectors/catalog/storage-file/alfresco/connector-overview' },
          items: [
            'connectors/catalog/storage-file/alfresco/setup-guide',
            'connectors/catalog/storage-file/alfresco/actions',
            'connectors/catalog/storage-file/alfresco/example',
          ],
        },
        {
          type: 'category',
          label: 'AMP',
          link: { type: 'doc', id: 'connectors/catalog/developer-tools/amp/connector-overview' },
          items: [
            'connectors/catalog/developer-tools/amp/setup-guide',
            'connectors/catalog/developer-tools/amp/actions',
          ],
        },
        {
          type: 'category',

          label: 'Asana',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/asana/connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/asana/setup-guide',
            'connectors/catalog/productivity-collaboration/asana/actions',
            'connectors/catalog/productivity-collaboration/asana/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Marketplace MPE',
          link: { type: 'doc', id: 'connectors/catalog/cloud-infrastructure/aws.marketplace.mpe/aws-marketplace-mpe-connector-overview' },
          items: [
            'connectors/catalog/cloud-infrastructure/aws.marketplace.mpe/setup-guide',
            'connectors/catalog/cloud-infrastructure/aws.marketplace.mpe/actions',
            'connectors/catalog/cloud-infrastructure/aws.marketplace.mpe/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Marketplace MPM',
          link: { type: 'doc', id: 'connectors/catalog/cloud-infrastructure/aws.marketplace.mpm/aws-marketplace-mpm-connector-overview' },
          items: [
            'connectors/catalog/cloud-infrastructure/aws.marketplace.mpm/setup-guide',
            'connectors/catalog/cloud-infrastructure/aws.marketplace.mpm/actions',
            'connectors/catalog/cloud-infrastructure/aws.marketplace.mpm/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Redshift',
          link: { type: 'doc', id: 'connectors/catalog/database/aws.redshift/aws-redshift-connector-overview' },
          items: [
            'connectors/catalog/database/aws.redshift/setup-guide',
            'connectors/catalog/database/aws.redshift/actions',
            'connectors/catalog/database/aws.redshift/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Redshift Data',
          link: { type: 'doc', id: 'connectors/catalog/database/aws.redshiftdata/aws-redshift-data-connector-overview' },
          items: [
            'connectors/catalog/database/aws.redshiftdata/setup-guide',
            'connectors/catalog/database/aws.redshiftdata/actions',
            'connectors/catalog/database/aws.redshiftdata/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS S3',
          link: { type: 'doc', id: 'connectors/catalog/storage-file/aws.s3/aws-s3-connector-overview' },
          items: [
            'connectors/catalog/storage-file/aws.s3/setup-guide',
            'connectors/catalog/storage-file/aws.s3/actions',
            'connectors/catalog/storage-file/aws.s3/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Secrets Manager',
          link: { type: 'doc', id: 'connectors/catalog/security-identity/aws.secretmanager/aws-secrets-manager-connector-overview' },
          items: [
            'connectors/catalog/security-identity/aws.secretmanager/setup-guide',
            'connectors/catalog/security-identity/aws.secretmanager/actions',
            'connectors/catalog/security-identity/aws.secretmanager/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS SNS',
          link: { type: 'doc', id: 'connectors/catalog/communication/aws.sns/aws-sns-connector-overview' },
          items: [
            'connectors/catalog/communication/aws.sns/setup-guide',
            'connectors/catalog/communication/aws.sns/actions',
            'connectors/catalog/communication/aws.sns/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS SQS',
          link: { type: 'doc', id: 'connectors/catalog/messaging/aws.sqs/aws-sqs-connector-overview' },
          items: [
            'connectors/catalog/messaging/aws.sqs/setup-guide',
            'connectors/catalog/messaging/aws.sqs/actions',
            'connectors/catalog/messaging/aws.sqs/triggers',
            'connectors/catalog/messaging/aws.sqs/example',
          ],
        },
        {
          type: 'category',
          label: 'Azure AI Search',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/azure.ai.search/azure-ai-search-connector-overview' },
          items: [
            'connectors/catalog/ai-ml/azure.ai.search/setup-guide',
            'connectors/catalog/ai-ml/azure.ai.search/actions',
            'connectors/catalog/ai-ml/azure.ai.search/example',
          ],
        },
        {
          type: 'category',
          label: 'Azure AI Search Index',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/azure.ai.search.index/azure-ai-search-index-connector-overview' },
          items: [
            'connectors/catalog/ai-ml/azure.ai.search.index/setup-guide',
            'connectors/catalog/ai-ml/azure.ai.search.index/actions',
            'connectors/catalog/cloud-infrastructure/azure.ai.search.index/example',
          ],
        },
        {
          type: 'category',

          label: 'Azure Service Bus',
          link: { type: 'doc', id: 'connectors/catalog/messaging/asb/azure-service-bus-connector-overview' },
          items: [
            'connectors/catalog/messaging/asb/setup-guide',
            'connectors/catalog/messaging/asb/actions',
            'connectors/catalog/messaging/asb/triggers',
            'connectors/catalog/messaging/asb/example',
          ],
        },
        {
          type: 'category',
          label: 'Azure Storage Service',
          link: { type: 'doc', id: 'connectors/catalog/storage-file/azure_storage_service/overview' },
          items: [
            'connectors/catalog/storage-file/azure_storage_service/setup-guide',
            'connectors/catalog/storage-file/azure_storage_service/actions',
          ],
        },
        {
          type: 'category',
          label: 'Candid',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/candid/connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/candid/setup-guide',
            'connectors/catalog/productivity-collaboration/candid/actions',
          ],
        },
        {
          type: 'category',
          label: 'CDC',
          link: { type: 'doc', id: 'connectors/catalog/database/cdc/connector-overview' },
          items: [
            'connectors/catalog/database/cdc/setup-guide',
            'connectors/catalog/database/cdc/triggers',
          ],
        },
        {
          type: 'category',
          label: 'Confluent Avro SerDes',
          link: { type: 'doc', id: 'connectors/catalog/messaging/confluent.cavroserdes/confluent-avro-serdes-connector-overview' },
          items: [
            'connectors/catalog/messaging/confluent.cavroserdes/setup-guide',
            'connectors/catalog/messaging/confluent.cavroserdes/actions',
          ],
        },
        {
          type: 'category',
          label: 'Confluent Schema Registry',
          link: { type: 'doc', id: 'connectors/catalog/messaging/confluent.cregistry/confluent-schema-registry-connector-overview' },
          items: [
            'connectors/catalog/messaging/confluent.cregistry/setup-guide',
            'connectors/catalog/messaging/confluent.cregistry/actions',
            'connectors/catalog/messaging/confluent.cregistry/example',
          ],
        },
        {
          type: 'category',
          label: 'Copybook',
          link: { type: 'doc', id: 'connectors/catalog/developer-tools/copybook/connector-overview' },
          items: [
            'connectors/catalog/developer-tools/copybook/setup-guide',
            'connectors/catalog/developer-tools/copybook/actions',
          ],
        },
        {
          type: 'category',

          label: 'Discord',
          link: { type: 'doc', id: 'connectors/catalog/communication/discord/connector-overview' },
          items: [
            'connectors/catalog/communication/discord/setup-guide',
            'connectors/catalog/communication/discord/actions',
            'connectors/catalog/communication/discord/example',
          ],
        },
        {
          type: 'category',
          label: 'DocuSign Admin',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/docusign.dsadmin/docusign-admin-connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/docusign.dsadmin/setup-guide',
            'connectors/catalog/productivity-collaboration/docusign.dsadmin/actions',
            'connectors/catalog/productivity-collaboration/docusign.dsadmin/example',
          ],
        },
        {
          type: 'category',
          label: 'Elastic Cloud',
          link: { type: 'doc', id: 'connectors/catalog/cloud-infrastructure/elastic.elasticcloud/elastic-cloud-connector-overview' },
          items: [
            'connectors/catalog/cloud-infrastructure/elastic.elasticcloud/setup-guide',
            'connectors/catalog/cloud-infrastructure/elastic.elasticcloud/actions',
            'connectors/catalog/cloud-infrastructure/elastic.elasticcloud/example',
          ],
        },
        {
          type: 'category',
          label: 'Email',
          link: { type: 'doc', id: 'connectors/catalog/built-in/email/email' },
          items: [
            'connectors/catalog/built-in/email/setup-guide',
            'connectors/catalog/built-in/email/action-reference',
            'connectors/catalog/built-in/email/trigger-reference',
            'connectors/catalog/built-in/email/example',
          ],
        },
        {
          type: 'category',
          label: 'FTP',
          link: { type: 'doc', id: 'connectors/catalog/built-in/ftp/ftp' },
          items: [
            'connectors/catalog/built-in/ftp/action-reference',
            'connectors/catalog/built-in/ftp/trigger-reference',
            'connectors/catalog/built-in/ftp/example',
          ],
        },
        {
          type: 'category',
          label: 'Github',
          link: { type: 'doc', id: 'connectors/catalog/developer-tools/github/connector-overview' },
          items: [
            'connectors/catalog/developer-tools/github/setup-guide',
            'connectors/catalog/developer-tools/github/actions',
            'connectors/catalog/developer-tools/github/example',
          ],
        },
        {
          type: 'category',
          label: 'Gmail',
          link: { type: 'doc', id: 'connectors/catalog/communication/googleapis.gmail/gmail-connector-overview' },
          items: [
            'connectors/catalog/communication/googleapis.gmail/setup-guide',
            'connectors/catalog/communication/googleapis.gmail/actions',
            'connectors/catalog/communication/googleapis-gmail/example',
          ],
        },
        {
          type: 'category',
          label: 'Google Calendar',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/googleapis.calendar/google-calendar-connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/googleapis.calendar/setup-guide',
            'connectors/catalog/productivity-collaboration/googleapis.calendar/actions',
            'connectors/catalog/productivity-collaboration/googleapis.calendar/example',
          ],
        },
        {
          type: 'category',
          label: 'Google Cloud Pub/Sub',
          link: { type: 'doc', id: 'connectors/catalog/messaging/gcloud.pubsub/google-cloud-pubsub-connector-overview' },
          items: [
            'connectors/catalog/messaging/gcloud.pubsub/setup-guide',
            'connectors/catalog/messaging/gcloud.pubsub/actions',
            'connectors/catalog/messaging/gcloud.pubsub/triggers',
            'connectors/catalog/messaging/gcloud.pubsub/example',
          ],
        },
        {
          type: 'category',
          label: 'Google GCalendar',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/googleapis.gcalendar/google-calendar-connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/googleapis.gcalendar/setup-guide',
            'connectors/catalog/productivity-collaboration/googleapis.gcalendar/actions',
          ],
        },
        {
          type: 'category',
          label: 'Google Sheets',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/googleapis.sheets/google-sheets-connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/googleapis.sheets/setup-guide',
            'connectors/catalog/productivity-collaboration/googleapis.sheets/actions',
            'connectors/catalog/productivity-collaboration/googleapis.sheets/example',
          ],
        },
        {
          type: 'category',
          label: 'gRPC',
          link: { type: 'doc', id: 'connectors/catalog/built-in/grpc/grpc' },
          items: [
            'connectors/catalog/built-in/grpc/action-reference',
            'connectors/catalog/built-in/grpc/trigger-reference',
            'connectors/catalog/built-in/grpc/example',
          ],
        },
        {
          type: 'category',
          label: 'GraphQL',
          link: { type: 'doc', id: 'connectors/catalog/built-in/graphql/graphql' },
          items: [
            'connectors/catalog/built-in/graphql/action-reference',
            'connectors/catalog/built-in/graphql/trigger-reference',
            'connectors/catalog/built-in/graphql/example',
          ],
        },
        {
          type: 'category',
          label: 'Guidewire InsuranceNow',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/guidewire.insnow/guidewire-insurancenow-connector-overview' },
          items: [
            'connectors/catalog/erp-business/guidewire.insnow/setup-guide',
            'connectors/catalog/erp-business/guidewire.insnow/actions',
            'connectors/catalog/erp-business/guidewire.insnow/example',
          ],
        },
        {
          type: 'category',
          label: 'HTTP',
          link: { type: 'doc', id: 'connectors/catalog/built-in/http/overview' },
          items: [
            'connectors/catalog/built-in/http/action-reference',
            'connectors/catalog/built-in/http/trigger-reference',
            'connectors/catalog/built-in/http/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Automation Actions',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.automation.actions/hubspot-automation-actions-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.automation.actions/setup-guide',
            'connectors/catalog/crm-sales/hubspot.automation.actions/actions',
            'connectors/catalog/crm-sales/hubspot.automation.actions/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Associations',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.associations/hubspot-crm-associations' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.associations/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.associations/actions',
            'connectors/catalog/crm-sales/hubspot.crm.associations/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Associations Schema',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.associations.schema/hubspot-crm-associations-schema' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.associations.schema/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.associations.schema/actions',
            'connectors/catalog/crm-sales/hubspot.crm.associations.schema/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Carts',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.commerce.carts/hubspot-crm-commerce-carts' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.commerce.carts/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.carts/actions',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.carts/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Discounts',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/hubspot-crm-commerce-discounts' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/actions',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Orders',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.commerce.orders/hubspot-crm-commerce-orders' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.commerce.orders/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.orders/actions',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.orders/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Quotes',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot-crm-commerce-quotes' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/actions',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Taxes',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.commerce.taxes/hubspot-crm-commerce-taxes' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.commerce.taxes/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.taxes/actions',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.taxes/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Companies',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.companies/hubspot-crm-companies-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.companies/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.companies/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.companies/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Contacts',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.contacts/hubspot-crm-contacts-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.contacts/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.contacts/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.contacts/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Deals',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.deals/hubspot-crm-deals-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.deals/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.deals/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.deals/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagement Meeting',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.engagement.meeting/hubspot-crm-engagement-meeting-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.engagement.meeting/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.engagement.meeting/actions',
            'connectors/catalog/crm-sales/hubspot.crm.engagement.meeting/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagement Notes',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.engagement.notes/hubspot-crm-engagement-notes' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.engagement.notes/actions',
            'connectors/catalog/crm-sales/hubspot.crm.engagement.notes/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagements Calls',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.engagements.calls/hubspot-crm-engagements-calls' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.calls/actions',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.calls/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagements Communications',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.engagements.communications/hubspot-crm-engagements-communications' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.engagements.communications/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.communications/actions',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.communications/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagements Email',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.engagements.email/hubspot-crm-engagements-email' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.engagements.email/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.email/actions',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.email/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagements Tasks',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.engagements.tasks/hubspot-crm-engagements-tasks' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.engagements.tasks/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.tasks/actions',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.tasks/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Extensions Timelines',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.extensions.timelines/hubspot-crm-extensions-timelines' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.extensions.timelines/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.extensions.timelines/actions',
            'connectors/catalog/crm-sales/hubspot.crm.extensions.timelines/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Extensions Videoconferencing',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/hubspot-crm-extensions-videoconferencing' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/actions',
            'connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Feedback',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.feedback/hubspot-crm-feedback-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.feedback/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.feedback/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.feedback/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Import',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.import/hubspot-crm-import' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.import/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.import/actions',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Leads',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.leads/hubspot-crm-leads-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.leads/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.leads/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.leads/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Line Items',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.lineitems/hubspot-crm-line-items-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.lineitems/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.lineitems/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.lineitems/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Lists',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.lists/hubspot-crm-lists' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.lists/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.lists/actions',
            'connectors/catalog/crm-sales/hubspot.crm.lists/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Owners',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.owners/hubspot-crm-owners' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.owners/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.owners/actions',
            'connectors/catalog/crm-sales/hubspot.crm.owners/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Pipelines',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.pipelines/hubspot-crm-pipelines' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.pipelines/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.pipelines/actions',
            'connectors/catalog/crm-sales/hubspot.crm.pipelines/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Products',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.products/hubspot-crm-products' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.products/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.products/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.products/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Properties',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.properties/hubspot-crm-properties' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.properties/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.properties/actions',
            'connectors/catalog/crm-sales/hubspot.crm.properties/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Schemas',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.schemas/hubspot-crm-schemas' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.schemas/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.schemas/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.schemas/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Tickets',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.tickets/hubspot-crm-tickets-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.tickets/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.tickets/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.tickets/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Campaigns',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/hubspot.marketing.campaigns/hubspot-marketing-campaigns' },
          items: [
            'connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup-guide',
            'connectors/catalog/marketing-social/hubspot.marketing.campaigns/actions',
            'connectors/catalog/marketing-social/hubspot.marketing.campaigns/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Emails',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/hubspot.marketing.emails/hubspot-marketing-emails' },
          items: [
            'connectors/catalog/marketing-social/hubspot.marketing.emails/setup-guide',
            'connectors/catalog/marketing-social/hubspot.marketing.emails/actions',
            'connectors/catalog/marketing-social/hubspot.marketing.emails/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Events',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/hubspot.marketing.events/hubspot-marketing-events-connector-overview' },
          items: [
            'connectors/catalog/marketing-social/hubspot.marketing.events/setup-guide',
            'connectors/catalog/marketing-social/hubspot.marketing.events/actions',
            'connectors/catalog/marketing-social/hubspot.marketing.events/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Forms',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/hubspot.marketing.forms/hubspot-marketing-forms' },
          items: [
            'connectors/catalog/marketing-social/hubspot.marketing.forms/setup-guide',
            'connectors/catalog/marketing-social/hubspot.marketing.forms/actions',
            'connectors/catalog/marketing-social/hubspot.marketing.forms/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Subscriptions',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/hubspot.marketing.subscriptions/hubspot-marketing-subscriptions-connector-overview' },
          items: [
            'connectors/catalog/marketing-social/hubspot.marketing.subscriptions/setup-guide',
            'connectors/catalog/marketing-social/hubspot.marketing.subscriptions/actions',
            'connectors/catalog/marketing-social/hubspot.marketing.subscriptions/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Transactional',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/hubspot.marketing.transactional/hubspot-marketing-transactional-connector-overview' },
          items: [
            'connectors/catalog/marketing-social/hubspot.marketing.transactional/setup-guide',
            'connectors/catalog/marketing-social/hubspot.marketing.transactional/actions',
          ],
        },
        {
          type: 'category',
          label: 'IBM CTG',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/ibm.ctg/ibm-ctg-connector-overview' },
          items: [
            'connectors/catalog/erp-business/ibm.ctg/setup-guide',
            'connectors/catalog/erp-business/ibm.ctg/actions',
            'connectors/catalog/erp-business/ibm.ctg/example',
          ],
        },
        {
          type: 'category',
          label: 'IBM MQ',
          link: { type: 'doc', id: 'connectors/catalog/messaging/ibm.ibmmq/ibm-mq-connector-overview' },
          items: [
            'connectors/catalog/messaging/ibm.ibmmq/setup-guide',
            'connectors/catalog/messaging/ibm.ibmmq/actions',
            'connectors/catalog/messaging/ibm.ibmmq/triggers',
          ],
        },
        {
          type: 'category',
          label: 'Intercom',
          link: { type: 'doc', id: 'connectors/catalog/communication/intercom/connector-overview' },
          items: [
            'connectors/catalog/communication/intercom/setup-guide',
            'connectors/catalog/communication/intercom/action-reference',
            'connectors/catalog/communication/intercom/example',
          ],
        },
        {
          type: 'category',
          label: 'Java JDBC',
          link: { type: 'doc', id: 'connectors/catalog/database/java.jdbc/java-jdbc-connector-overview' },
          items: [
            'connectors/catalog/database/java.jdbc/setup-guide',
            'connectors/catalog/database/java.jdbc/actions',
            'connectors/catalog/database/java.jdbc/example',
          ],
        },
        {
          type: 'category',
          label: 'Jira',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/jira/connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/jira/setup-guide',
            'connectors/catalog/productivity-collaboration/jira/actions',
            'connectors/catalog/productivity-collaboration/jira/example',
          ],
        },
        {
          type: 'category',
          label: 'JMS',
          link: { type: 'doc', id: 'connectors/catalog/messaging/java.jms/jms-connector-overview' },
          items: [
            'connectors/catalog/messaging/java.jms/setup-guide',
            'connectors/catalog/messaging/java.jms/actions',
            'connectors/catalog/messaging/java.jms/triggers',
            'connectors/catalog/messaging/java.jms/example',
          ],
        },
        {
          type: 'category',
          label: 'Kafka',
          link: { type: 'doc', id: 'connectors/catalog/messaging/kafka/connector-overview' },
          items: [
            'connectors/catalog/messaging/kafka/setup-guide',
            'connectors/catalog/messaging/kafka/actions',
            'connectors/catalog/messaging/kafka/triggers',
            'connectors/catalog/messaging/kafka/example',
          ],
        },
        {
          type: 'category',
          label: 'Mailchimp Marketing',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/mailchimp.marketing/mailchimp-marketing-connector-overview' },
          items: [
            'connectors/catalog/marketing-social/mailchimp.marketing/setup-guide',
            'connectors/catalog/marketing-social/mailchimp.marketing/actions',
            'connectors/catalog/marketing-social/mailchimp.marketing/example',
          ],
        },
        {
          type: 'category',
          label: 'Mailchimp Transactional',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/mailchimp.transactional/mailchimp-transactional-connector-overview' },
          items: [
            'connectors/catalog/marketing-social/mailchimp.transactional/setup-guide',
            'connectors/catalog/marketing-social/mailchimp.transactional/actions',
          ],
        },
        {
          type: 'category',
          label: 'MCP',
          link: { type: 'doc', id: 'connectors/catalog/built-in/mcp/mcp' },
          items: [
            'connectors/catalog/built-in/mcp/action-reference',
            'connectors/catalog/built-in/mcp/trigger-reference',
          ],
        },
        {
          type: 'category',
          label: 'Microsoft OneDrive',
          link: { type: 'doc', id: 'connectors/catalog/storage-file/microsoft.onedrive/microsoft-onedrive-connector-overview' },
          items: [
            'connectors/catalog/storage-file/microsoft.onedrive/setup-guide',
            'connectors/catalog/storage-file/microsoft.onedrive/actions',
            'connectors/catalog/productivity-collaboration/microsoft.onedrive/example',
          ],
        },
        {
          type: 'category',
          label: 'Milvus',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/milvus/connector-overview' },
          items: [
            'connectors/catalog/ai-ml/milvus/setup-guide',
            'connectors/catalog/ai-ml/milvus/actions',
            'connectors/catalog/ai-ml/milvus/example',
          ],
        },
        {
          type: 'category',
          label: 'Mistral',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/mistral/connector-overview' },
          items: [
            'connectors/catalog/ai-ml/mistral/setup-guide',
            'connectors/catalog/ai-ml/mistral/actions',
            'connectors/catalog/ai-ml/mistral/example',
          ],
        },
        {
          type: 'category',

          label: 'MongoDB',
          link: { type: 'doc', id: 'connectors/catalog/database/mongodb/connector-overview' },
          items: [
            'connectors/catalog/database/mongodb/setup-guide',
            'connectors/catalog/database/mongodb/actions',
            'connectors/catalog/database/mongodb/example',
          ],
        },
        {
          type: 'category',
          label: 'MQTT',
          link: { type: 'doc', id: 'connectors/catalog/built-in/mqtt/mqtt' },
          items: [
            'connectors/catalog/built-in/mqtt/setup-guide',
            'connectors/catalog/built-in/mqtt/action-reference',
            'connectors/catalog/built-in/mqtt/trigger-reference',
            'connectors/catalog/built-in/mqtt/example',
          ],
        },
        {
          type: 'category',
          label: 'MSSQL',
          link: { type: 'doc', id: 'connectors/catalog/database/mssql/connector-overview' },
          items: [
            'connectors/catalog/database/mssql/setup-guide',
            'connectors/catalog/database/mssql/actions',
            'connectors/catalog/database/mssql/triggers',
            'connectors/catalog/database/mssql/example',
          ],
        },
        {
          type: 'category',
          label: 'MySQL',
          link: { type: 'doc', id: 'connectors/catalog/database/mysql/connector-overview' },
          items: [
            'connectors/catalog/database/mysql/setup-guide',
            'connectors/catalog/database/mysql/actions',
            'connectors/catalog/database/mysql/triggers',
            'connectors/catalog/database/mysql/example',
          ],
        },
        {
          type: 'category',
          label: 'NATS',
          link: { type: 'doc', id: 'connectors/catalog/messaging/nats/connector-overview' },
          items: [
            'connectors/catalog/messaging/nats/setup-guide',
            'connectors/catalog/messaging/nats/actions',
            'connectors/catalog/messaging/nats/example',
          ],
        },
        {
          type: 'category',

          label: 'OpenAI',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/openai/connector-overview' },
          items: [
            'connectors/catalog/ai-ml/openai/setup-guide',
            'connectors/catalog/ai-ml/openai/actions',
            'connectors/catalog/ai-ml/openai/example',
          ],
        },
        {
          type: 'category',

          label: 'OpenAI Audio',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/openai.audio/openai-audio-connector-overview' },
          items: [
            'connectors/catalog/ai-ml/openai.audio/setup-guide',
            'connectors/catalog/ai-ml/openai.audio/actions',
            'connectors/catalog/ai-ml/openai.audio/example',
          ],
        },
        {
          type: 'category',
          label: 'OpenAI Fine-Tunes',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/openai.finetunes/openai-fine-tunes-connector-overview' },
          items: [
            'connectors/catalog/ai-ml/openai.finetunes/setup-guide',
            'connectors/catalog/ai-ml/openai.finetunes/actions',
            'connectors/catalog/ai-ml/openai.finetunes/example',
          ],
        },
        {
          type: 'category',
          label: 'Oracle DB',
          link: { type: 'doc', id: 'connectors/catalog/database/oracledb/oracle-db-connector-overview' },
          items: [
            'connectors/catalog/database/oracledb/setup-guide',
            'connectors/catalog/database/oracledb/actions',
            'connectors/catalog/database/oracledb/example',
          ],
        },
        {
          type: 'category',
          label: 'PDF',
          link: { type: 'doc', id: 'connectors/catalog/built-in/pdf/pdf' },
          items: [
            'connectors/catalog/built-in/pdf/action-reference',
          ],
        },
        {
          type: 'category',
          label: 'PayPal Invoices',
          link: { type: 'doc', id: 'connectors/catalog/finance-accounting/paypal.invoices/paypal-invoices-connector-overview' },
          items: [
            'connectors/catalog/finance-accounting/paypal.invoices/setup-guide',
            'connectors/catalog/finance-accounting/paypal.invoices/actions',
            'connectors/catalog/finance-accounting/paypal.invoices/example',
          ],
        },
        {
          type: 'category',
          label: 'PayPal Orders',
          link: { type: 'doc', id: 'connectors/catalog/finance-accounting/paypal.orders/paypal-orders-connector-overview' },
          items: [
            'connectors/catalog/finance-accounting/paypal.orders/setup-guide',
            'connectors/catalog/finance-accounting/paypal.orders/actions',
            'connectors/catalog/finance-accounting/paypal.orders/example',
          ],
        },
        {
          type: 'category',
          label: 'PayPal Payments',
          link: { type: 'doc', id: 'connectors/catalog/finance-accounting/paypal.payments/paypal-payments-connector-overview' },
          items: [
            'connectors/catalog/finance-accounting/paypal.payments/setup-guide',
            'connectors/catalog/finance-accounting/paypal.payments/actions',
            'connectors/catalog/finance-accounting/paypal.payments/example',
          ],
        },
        {
          type: 'category',
          label: 'PayPal Subscriptions',
          link: { type: 'doc', id: 'connectors/catalog/finance-accounting/paypal.subscriptions/paypal-subscriptions-connector-overview' },
          items: [
            'connectors/catalog/finance-accounting/paypal.subscriptions/setup-guide',
            'connectors/catalog/finance-accounting/paypal.subscriptions/actions',
            'connectors/catalog/finance-accounting/paypal.subscriptions/example',
          ],
        },
        {
          type: 'category',
          label: 'People HR',
          link: { type: 'doc', id: 'connectors/catalog/hrms/peoplehr/people-hr-connector-overview' },
          items: [
            'connectors/catalog/hrms/peoplehr/setup-guide',
            'connectors/catalog/hrms/peoplehr/actions',
            'connectors/catalog/hrms/peoplehr/example',
          ],
        },
        {
          type: 'category',

          label: 'PostgreSQL',
          link: { type: 'doc', id: 'connectors/catalog/database/postgresql/connector-overview' },
          items: [
            'connectors/catalog/database/postgresql/setup-guide',
            'connectors/catalog/database/postgresql/actions',
            'connectors/catalog/database/postgresql/triggers',
            'connectors/catalog/database/postgresql/example',
          ],
        },
        {
          type: 'category',
          label: 'RabbitMQ',
          link: { type: 'doc', id: 'connectors/catalog/messaging/rabbitmq/connector-overview' },
          items: [
            'connectors/catalog/messaging/rabbitmq/setup-guide',
            'connectors/catalog/messaging/rabbitmq/actions',
            'connectors/catalog/messaging/rabbitmq/triggers',
            'connectors/catalog/messaging/rabbitmq/example',
          ],
        },
        {
          type: 'category',
          label: 'Redis',
          link: { type: 'doc', id: 'connectors/catalog/database/redis/connector-overview' },
          items: [
            'connectors/catalog/database/redis/setup-guide',
            'connectors/catalog/database/redis/actions',
            'connectors/catalog/database/redis/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap/connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap/setup-guide',
            'connectors/catalog/erp-business/sap/actions',
            'connectors/catalog/erp-business/sap/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Commerce',
          link: { type: 'doc', id: 'connectors/catalog/ecommerce/sap.commerce.webservices/sap-commerce-connector-overview' },
          items: [
            'connectors/catalog/ecommerce/sap.commerce.webservices/setup-guide',
            'connectors/catalog/ecommerce/sap.commerce.webservices/actions',
            'connectors/catalog/ecommerce/sap.commerce.webservices/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Area',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.salesarea_0001/sap-sales-area-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.salesarea_0001/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.salesarea_0001/actions',
            'connectors/catalog/erp-business/sap.s4hana.salesarea-0001/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales District',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_salesdistrict_srv/sap-sales-district-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_salesdistrict_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_salesdistrict_srv/actions',
            'connectors/catalog/erp-business/sap.s4hana.api-salesdistrict-srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Inquiry',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_sales_inquiry_srv/sap-sales-inquiry-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_sales_inquiry_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_sales_inquiry_srv/actions',
            'connectors/catalog/erp-business/sap.s4hana.api-sales-inquiry-srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Order',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_sales_order_srv/sap-sales-order-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_sales_order_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_sales_order_srv/actions',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Order Analytics',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.ce_salesorder_0001/sap-sales-order-analytics-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.ce_salesorder_0001/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.ce_salesorder_0001/actions',
            'connectors/catalog/erp-business/sap.s4hana.sales.order.analytics/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Order Simulation',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_sales_order_simulation_srv/sap-sales-order-simulation-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_sales_order_simulation_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_sales_order_simulation_srv/actions',
            'connectors/catalog/erp-business/sap.s4hana.api-sales-order-simulation-srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Organization',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_salesorganization_srv/sap-sales-organization-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_salesorganization_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_salesorganization_srv/actions',
            'connectors/catalog/erp-business/sap.s4hana.api-salesorganization-srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Quotation',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_sales_quotation_srv/sap-sales-quotation-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_sales_quotation_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_sales_quotation_srv/actions',
            'connectors/catalog/erp-business/sap.s4hana.api-sales-quotation-srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SD Incoterms',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_sd_incoterms_srv/sap-sd-incoterms-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_sd_incoterms_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_sd_incoterms_srv/actions',
            'connectors/catalog/erp-business/sap.s4hana.api-sd-incoterms-srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SD Sold-to-Party Determination',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_sd_sa_soldtopartydetn/sap-sd-sold-party-determination-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_sd_sa_soldtopartydetn/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_sd_sa_soldtopartydetn/actions',
            'connectors/catalog/erp-business/sap.s4hana.api-sd-sa-soldtopartydetn/example',
          ],
        },
        {
          type: 'category',
          label: 'Salesforce',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/salesforce/connector-overview' },
          items: [
            'connectors/catalog/crm-sales/salesforce/setup-guide',
            'connectors/catalog/crm-sales/salesforce/actions',
            'connectors/catalog/crm-sales/salesforce/triggers',
            'connectors/catalog/crm-sales/salesforce/example',
          ],
        },
        {
          type: 'category',
          label: 'Salesforce Marketing Cloud',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/salesforce.marketingcloud/salesforce-marketing-cloud-connector-overview' },
          items: [
            'connectors/catalog/marketing-social/salesforce.marketingcloud/setup-guide',
            'connectors/catalog/marketing-social/salesforce.marketingcloud/actions',
            'connectors/catalog/marketing-social/salesforce.marketingcloud/example',
          ],
        },
        {
          type: 'category',
          label: 'SCIM',
          link: { type: 'doc', id: 'connectors/catalog/security-identity/scim/connector-overview' },
          items: [
            'connectors/catalog/security-identity/scim/setup-guide',
            'connectors/catalog/security-identity/scim/actions',
            'connectors/catalog/security-identity/scim/example',
          ],
        },
        {
          type: 'category',
          label: 'Shopify Admin',
          link: { type: 'doc', id: 'connectors/catalog/ecommerce/shopify.admin/shopify-admin-connector-overview' },
          items: [
            'connectors/catalog/ecommerce/shopify.admin/setup-guide',
            'connectors/catalog/ecommerce/shopify.admin/actions',
            'connectors/catalog/ecommerce/shopify.admin/example',
          ],
        },
        {
          type: 'category',
          label: 'Slack',
          link: { type: 'doc', id: 'connectors/catalog/communication/slack/connector-overview' },
          items: [
            'connectors/catalog/communication/slack/setup-guide',
            'connectors/catalog/communication/slack/actions',
            'connectors/catalog/communication/slack/example',
          ],
        },
        {
          type: 'category',
          label: 'Smartsheet',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/smartsheet/connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/smartsheet/setup-guide',
            'connectors/catalog/productivity-collaboration/smartsheet/actions',
            'connectors/catalog/productivity-collaboration/smartsheet/example',
          ],
        },
        {
          type: 'category',
          label: 'Snowflake',
          link: { type: 'doc', id: 'connectors/catalog/database/snowflake/connector-overview' },
          items: [
            'connectors/catalog/database/snowflake/setup-guide',
            'connectors/catalog/database/snowflake/actions',
            'connectors/catalog/database/snowflake/example',
          ],
        },
        {
          type: 'category',
          label: 'Solace',
          link: { type: 'doc', id: 'connectors/catalog/messaging/solace/connector-overview' },
          items: [
            'connectors/catalog/messaging/solace/setup-guide',
            'connectors/catalog/messaging/solace/actions',
            'connectors/catalog/messaging/solace/triggers',
            'connectors/catalog/messaging/solace/example',
          ],
        },
        {
          type: 'category',
          label: 'Stripe',
          link: { type: 'doc', id: 'connectors/catalog/finance-accounting/stripe/connector-overview' },
          items: [
            'connectors/catalog/finance-accounting/stripe/setup-guide',
            'connectors/catalog/finance-accounting/stripe/actions',
            'connectors/catalog/finance-accounting/stripe/example',
          ],
        },
        {
          type: 'category',
          label: 'TCP',
          link: { type: 'doc', id: 'connectors/catalog/built-in/tcp/tcp' },
          items: [
            'connectors/catalog/built-in/tcp/action-reference',
            'connectors/catalog/built-in/tcp/trigger-reference',
            'connectors/catalog/built-in/tcp/example',
          ],
        },
        {
          type: 'category',
          label: 'Trello',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/trello/connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/trello/setup-guide',
            'connectors/catalog/productivity-collaboration/trello/actions',
            'connectors/catalog/productivity-collaboration/trello/example',
          ],
        },
        {
          type: 'category',
          label: 'Twilio',
          link: { type: 'doc', id: 'connectors/catalog/communication/twilio/overview' },
          items: [
            'connectors/catalog/communication/twilio/setup-guide',
            'connectors/catalog/communication/twilio/actions',
            ...connectorVersionedDocs('connectors/catalog/communication/twilio'),
            'connectors/catalog/communication/twilio/example',
          ],
        },
        {
          type: 'category',
          label: 'Twitter',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/twitter/connector-overview' },
          items: [
            'connectors/catalog/marketing-social/twitter/setup-guide',
            'connectors/catalog/marketing-social/twitter/actions',
            'connectors/catalog/marketing-social/twitter/example',
          ],
        },
        {
          type: 'category',

          label: 'UDP',
          link: { type: 'doc', id: 'connectors/catalog/built-in/udp/udp' },
          items: [
            'connectors/catalog/built-in/udp/action-reference',
            'connectors/catalog/built-in/udp/trigger-reference',
            'connectors/catalog/built-in/udp/example',
          ],
        },
        {
          type: 'category',
          label: 'WSO2 APIM Catalog',
          link: { type: 'doc', id: 'connectors/catalog/developer-tools/wso2.apim.catalog/apim-catalog-connector-overview' },
          items: [
            'connectors/catalog/developer-tools/wso2.apim.catalog/setup-guide',
            'connectors/catalog/developer-tools/wso2.apim.catalog/actions',
            'connectors/catalog/developer-tools/wso2.apim.catalog/example',
          ],
        },
        {
          type: 'category',
          label: 'WebSocket',
          link: { type: 'doc', id: 'connectors/catalog/built-in/websocket/websocket' },
          items: [
            'connectors/catalog/built-in/websocket/action-reference',
            'connectors/catalog/built-in/websocket/trigger-reference',
            'connectors/catalog/built-in/websocket/example',
          ],
        },
        {
          type: 'category',
          label: 'WebSub',
          link: { type: 'doc', id: 'connectors/catalog/built-in/websub/websub' },
          items: [
            'connectors/catalog/built-in/websub/setup-guide',
            'connectors/catalog/built-in/websub/action-reference',
            'connectors/catalog/built-in/websub/trigger-reference',
            'connectors/catalog/built-in/websub/example',
          ],
        },
        {
          type: 'category',
          label: 'Zoom Meetings',
          link: { type: 'doc', id: 'connectors/catalog/communication/zoom.meetings/zoom-meetings-connector-overview' },
          items: [
            'connectors/catalog/communication/zoom.meetings/setup-guide',
            'connectors/catalog/communication/zoom.meetings/actions',
            'connectors/catalog/communication/zoom.meetings/example',
          ],
        },
        {
          type: 'category',
          label: 'Zoom Scheduler',
          link: { type: 'doc', id: 'connectors/catalog/communication/zoom.scheduler/zoom-scheduler-connector-overview' },
          items: [
            'connectors/catalog/communication/zoom.scheduler/setup-guide',
            'connectors/catalog/communication/zoom.scheduler/actions',
            'connectors/catalog/communication/zoom.scheduler/example',
          ],
        },
      ],
    },
    // ── Build Your Own ──
    {
      type: 'category',
      label: 'Build your own',
      link: { type: 'doc', id: 'connectors/build-your-own/build-own' },
      items: [
        'connectors/build-your-own/create-from-openapi-spec',
        'connectors/build-your-own/custom-development',
      ],
    }
      ],
    },

    // ─────────────────────────────────────────────
    // GENAI
    // "How do I build AI agents, RAG, or MCP?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'GenAI',
      collapsed: true,
      link: { type: 'doc', id: 'genai/overview' },
      items: [
        // Getting Started
        {
          type: 'category',
          label: 'Getting started',
          items: [
            'genai/getting-started/setting-up-ai',
            {
              type: 'category',
              label: 'Building your first AI integration',
              items: [
                'genai/getting-started/build-a-smart-calculator-assistant',
                'genai/getting-started/build-a-sample-hotel-booking-agent',
              ],
            },
          ],
        },
        // Key Concepts
        {
          type: 'category',
          label: 'Key concepts',
          items: [
            'genai/key-concepts/what-is-llm',
            'genai/key-concepts/what-is-a-natural-function',
            'genai/key-concepts/what-is-ai-agent',
            'genai/key-concepts/what-are-tools',
            'genai/key-concepts/what-is-ai-agent-memory',
            'genai/key-concepts/what-is-mcp',
            'genai/key-concepts/what-is-rag',
          ],
        },
        // Develop AI Applications
        {
          type: 'category',
          label: 'Develop AI applications',
          items: [
            // Direct LLM Calls
            {
              type: 'category',
              label: 'Direct LLM Calls',
              items: [
                'genai/develop/direct-llm/configuring-llm-providers',
                'genai/develop/direct-llm/constructing-prompts',
                'genai/develop/direct-llm/handling-responses',
              ],
            },
            // Natural Functions
            {
              type: 'category',
              label: 'Natural Functions',
              items: [
                'genai/develop/natural-functions/defining-natural-functions',
                'genai/develop/natural-functions/constructing-prompts-natural-functions',
                'genai/develop/natural-functions/handling-natural-function-responses',
              ],
            },
            // RAG
            {
              type: 'category',
              label: 'RAG',
              items: [
                {
                  type: 'category',
                  label: 'RAG Ingestion',
                  items: [
                    'genai/develop/rag/chunking-documents',
                    'genai/develop/rag/generating-embeddings',
                    'genai/develop/rag/connecting-vector-databases',
                  ],
                },
                'genai/develop/rag/querying',
              ],
            },
            // AI Agents
            {
              type: 'category',
              label: 'AI Agents',
              items: [
                'genai/develop/agents/ai',
                'genai/develop/agents/adding-tools',
                'genai/develop/agents/adding-memory',
                'genai/develop/agents/advanced-ai-configurations',
                'genai/develop/agents/ai-observability',
                'genai/develop/agents/ai-evaluations',
              ],
            },
            // MCP Integration
            {
              type: 'category',
              label: 'MCP Integration',
              items: [
                'genai/develop/mcp/server',
                'genai/develop/mcp/building-ai-agents-servers',
              ],
            },
          ],
        },
        // Deep Dives — Agents
        {
          type: 'category',
          label: 'Agents',
          items: [
            'genai/agents/architecture-concepts',
            'genai/agents/build-chat',
            'genai/agents/expose-as-apis',
            'genai/agents/natural-functions',
            'genai/agents/tool-binding',
            'genai/agents/configure-memory',
            'genai/agents/multi-orchestration',
          ],
        },
        // Deep Dives — RAG
        {
          type: 'category',
          label: 'RAG',
          items: [
            'genai/rag/architecture-overview',
            'genai/rag/document-ingestion-pipelines',
            'genai/rag/chunking-embedding-strategies',
            'genai/rag/vector-database-connectivity',
            'genai/rag/build-a-service-end-end',
          ],
        },
        // Deep Dives — MCP
        {
          type: 'category',
          label: 'MCP',
          items: [
            'genai/mcp/model-context-protocol-overview',
            'genai/mcp/consuming-tools',
            'genai/mcp/exposing-servers',
            'genai/mcp/security',
          ],
        },
        // LLM Connectivity
        {
          type: 'category',
          label: 'LLM Connectivity',
          items: [
            'genai/llm-connectivity/model-selection',
            'genai/llm-connectivity/prompt-engineering',
            'genai/llm-connectivity/managing-context-windows',
            'genai/llm-connectivity/natural-expressions',
            'genai/llm-connectivity/streaming-responses',
          ],
        },
        // Guardrails
        {
          type: 'category',
          label: 'Guardrails',
          items: [
            'genai/guardrails/responsible-ai',
            'genai/guardrails/content-filtering',
            'genai/guardrails/inputoutput',
            'genai/guardrails/token-cost-management',
            'genai/guardrails/ai-usage-guidelines',
          ],
        },
        // Agent Observability
        {
          type: 'category',
          label: 'Agent Observability',
          items: [
            'genai/agent-observability/agent-tracing',
            'genai/agent-observability/conversation-logging',
            'genai/agent-observability/performance-metrics',
            'genai/agent-observability/debugging-agent-behavior',
          ],
        },
        // Quick Starts
        {
          type: 'category',
          label: 'Quick starts',
          items: [
            'genai/quick-starts/build-a-conversational-agent',
            'genai/quick-starts/build-a-rag-application',
            'genai/quick-starts/expose-integrations-as-mcp-server',
          ],
        },
        // Tutorials
        {
          type: 'category',
          label: 'Tutorials',
          items: [
            'genai/tutorials/building-hr-knowledge-base-agent-rag',
            'genai/tutorials/building-a-customer-care-agent-mcp',
            'genai/tutorials/building-it-helpdesk-chatbot-persistent-memory',
            'genai/tutorials/building-a-legal-document-qa-system-mcp-and-rag',
            'genai/tutorials/ai-customer-support-agent',
            'genai/tutorials/conversational-data-pipeline',
            'genai/tutorials/mcp-server-enterprise-data',
            'genai/tutorials/multi-agent-workflow',
            'genai/tutorials/rag-knowledge-base',
          ],
        },
        // Reference
        {
          type: 'category',
          label: 'Reference',
          items: [
            'genai/reference/ballerina-copilot-setup-and-usage-guide',
            'genai/reference/ai-governance-and-security',
            'genai/reference/troubleshooting-and-common-issues',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // TUTORIALS
    // "Show me a complete, real example"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Tutorials',
      collapsed: true,
      link: { type: 'doc', id: 'tutorials/tutorials' },
      items: [
        // Walkthroughs
        {
          type: 'category',
          label: 'Walkthroughs',
          items: [
            'tutorials/salesforce-database-sync',
            'tutorials/kafka-event-processing-pipeline',
            'tutorials/rest-api-aggregation-service',
            'tutorials/pdf-generation-service',
            'tutorials/walkthroughs/route-messages-based-content',
            'tutorials/walkthroughs/build-a-data-transformation-pipeline',
            'tutorials/file-batch-etl-pipeline',
            'tutorials/walkthroughs/build-email-notification-service',
            'tutorials/walkthroughs/build-a-change-data-capture-service',
            'tutorials/healthcare-hl7fhir-integration',
            'tutorials/walkthroughs/process-edi-documents-from-ftp',
            'tutorials/walkthroughs/process-csv-files-from-ftp-fail-safe-error-handling',
            'tutorials/walkthroughs/process-ftp-order-batches-age-filter-and-file-dependency',
            'tutorials/walkthroughs/watch-a-local-directory-csv-files',
            'tutorials/walkthroughs/stream-large-csv-files-from-sftp',
            'tutorials/multi-system-data-reconciliation',
          ],
        },
        // Enterprise Integration Patterns (EIP)
        {
          type: 'category',
          label: 'Enterprise integration patterns',
          items: [
            'tutorials/patterns/content-based-router',
            'tutorials/patterns/message-filter',
            'tutorials/patterns/scatter-gather',
            'tutorials/patterns/recipient-list',
            'tutorials/patterns/message-translator',
            'tutorials/patterns/circuit-breaker-retry',
            'tutorials/patterns/saga-compensation',
            'tutorials/patterns/publish-subscribe',
            'tutorials/patterns/guaranteed-delivery',
            'tutorials/patterns/idempotent-receiver',
            'tutorials/patterns/api-gateway-orchestration',
            'tutorials/patterns/agent-tool-orchestration',
            'tutorials/patterns/rag-pipeline',
          ],
        },
        // Pre-Built Integration Samples
        {
          type: 'category',
          label: 'Pre-built integration samples',
          items: [
            'tutorials/pre-built/integration-samples',
            'tutorials/pre-built/google-sheets-salesforce-contacts',
            'tutorials/pre-built/github-email-summary',
            'tutorials/pre-built/google-drive-onedrive-sync',
            'tutorials/pre-built/mysql-salesforce-products',
            'tutorials/pre-built/gmail-salesforce-leads-openai',
            'tutorials/pre-built/kafka-salesforce-price-book',
            'tutorials/pre-built/salesforce-twilio-sms',
            'tutorials/pre-built/hubspot-google-contacts',
            'tutorials/pre-built/ftp-edi-salesforce-opportunity',
            'tutorials/pre-built/shopify-outlook-welcome-email',
          ],
        },
        // Sample Projects
        {
          type: 'category',
          label: 'Sample projects',
          items: [
            'tutorials/samples/projects',
            'tutorials/samples/hospital-service',
            'tutorials/samples/e-commerce-order-service',
            'tutorials/samples/event-driven-microservices-kafka',
            'tutorials/samples/data-service-bal-persist',
            'tutorials/samples/restful-api-visual-data-mapper',
            'tutorials/samples/ai-personal-assistant',
          ],
        },
        // Migration Guides
        {
          type: 'category',
          label: 'Migration guides',
          items: [
            'tutorials/migration/coming-from-mi',
            'tutorials/migration/coming-from-mulesoft',
            'tutorials/migration/coming-from-tibco',
            'tutorials/migration/coming-from-boomi',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DEPLOY & OPERATE
    // "How do I ship, run, and secure this?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Deploy and operate',
      collapsed: true,
      link: { type: 'doc', id: 'deploy-operate/deploy-and-operate' },
      items: [
        // Deploy
        {
          type: 'category',
          label: 'Deploy',
          items: [
            'deploy-operate/deploy/run-locally',
            'deploy-operate/deploy/vm-based-deployment',
            'deploy-operate/deploy/docker-kubernetes',
            'deploy-operate/deploy/red-hat-openshift',
            'deploy-operate/deploy/serverless-deployment',
            'deploy-operate/deploy/devant-ipaas',
            'deploy-operate/deploy/aws-azure-gcp',
            'deploy-operate/deploy/graalvm-native-images',
            'deploy-operate/deploy/environments',
            'deploy-operate/deploy/managing-configurations',
            'deploy-operate/deploy/scaling-high-availability',
          ],
        },
        // CI/CD
        {
          type: 'category',
          label: 'CI/CD',
          items: [
            'deploy-operate/cicd/github-actions',
            'deploy-operate/cicd/jenkins',
            'deploy-operate/cicd/gitlab',
            'deploy-operate/cicd/azure-devops',
          ],
        },
        // Observe
        {
          type: 'category',
          label: 'Observe',
          items: [
            'deploy-operate/observe/observability-overview',
            'deploy-operate/observe/logging-structured-logs',
            'deploy-operate/observe/metrics-prometheus-grafana',
            'deploy-operate/observe/distributed-tracing',
            'deploy-operate/observe/integration-control-plane-icp',
            'deploy-operate/observe/observability-devant',
            'deploy-operate/observe/prometheus-metrics',
            'deploy-operate/observe/grafana-dashboards',
            'deploy-operate/observe/jaeger-distributed-tracing',
            'deploy-operate/observe/zipkin-tracing',
            'deploy-operate/observe/datadog-integration',
            'deploy-operate/observe/new-relic-integration',
            'deploy-operate/observe/elastic-stack-elk',
            'deploy-operate/observe/opensearch-integration',
            'deploy-operate/observe/moesif-api-analytics',
            'deploy-operate/observe/custom-metrics',
            'deploy-operate/observe/third-party-observability-tools',
          ],
        },
        // Secure
        {
          type: 'category',
          label: 'Secure',
          items: [
            'deploy-operate/secure/runtime-security',
            'deploy-operate/secure/authentication',
            'deploy-operate/secure/api-security-rate-limiting',
            'deploy-operate/secure/secrets-encryption',
            'deploy-operate/secure/ip-whitelisting',
            'deploy-operate/secure/compliance-considerations',
          ],
        },
        // Capacity Planning
        {
          type: 'category',
          label: 'Capacity planning',
          items: [
            'deploy-operate/capacity-planning/capacity-planning',
            'deploy-operate/capacity-planning/performance-reports',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // REFERENCE
    // "What's the exact syntax / config / API for Z?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      link: { type: 'doc', id: 'reference/reference' },
      items: [
        // Language
        {
          type: 'category',
          label: 'Language',
          items: [
            'reference/language/ballerina-syntax-quick-reference',
            'reference/language/type-system',
            'reference/language/standard-library-overview',
            'reference/language/query-expressions',
            'reference/language/concurrency',
            'reference/language/error-handling',
            'reference/language/integration-specific-features',
          ],
        },
        // Configuration
        {
          type: 'category',
          label: 'Configuration',
          items: [
            'reference/config/ballerinatoml-reference',
            'reference/config/configtoml-reference',
            'reference/config/cloudtoml-reference',
            'reference/config/dependenciestoml-reference',
            'reference/config/environment-variables',
          ],
        },
        // CLI
        {
          type: 'category',
          label: 'CLI',
          items: [
            'reference/cli/bal-command-reference',
            'reference/cli/bal-persist',
            'reference/cli/bal-openapi',
            'reference/cli/bal-graphql',
            'reference/cli/bal-grpc',
            'reference/cli/bal-edi',
            'reference/cli/bal-health',
            'reference/cli/ballerina-update-tool',
            'reference/cli/bal-scan',
          ],
        },
        // APIs
        {
          type: 'category',
          label: 'APIs',
          items: [
            'reference/api/management',
            'reference/api/icp',
            'reference/api/ballerina-documentation',
          ],
        },
        {
          type: 'category',
          label: 'Deploying ICP',
          link: { type: 'doc', id: 'reference/icp/integration-control-plane' },
          items: [
            'reference/icp/server-configuration',
            'reference/icp/database-configuration',
            'reference/icp/authentication',
            'reference/icp/connect-runtime',
            'reference/icp/connect-runtime-mi',
            'reference/icp/observability-setup',
            'reference/icp/observability-setup-mi',
            'reference/icp/manage-mi-artficats',
            'reference/icp/deployment',
          ],
        },
        'reference/supported-protocols',
        {
          type: 'category',
          label: 'Supported data formats',
          link: { type: 'doc', id: 'reference/data-formats/supported-data-formats' },
          items: [
            'reference/data-formats/avro',
            'reference/data-formats/csv',
            'reference/data-formats/edi',
            'reference/data-formats/fhir',
            'reference/data-formats/hl7',
            'reference/data-formats/json',
            'reference/data-formats/protocol-buffers',
            'reference/data-formats/toml',
            'reference/data-formats/xml',
            'reference/data-formats/yaml',
          ],
        },
        'reference/ballerina-by-example',
        'reference/ballerina-specifications',
        // Appendix
        {
          type: 'category',
          label: 'Appendix',
          items: [
            'reference/appendix/system-requirements',
            'reference/error-code',
            'reference/glossary',
            'reference/faq',
            'reference/appendix/troubleshooting',
            'reference/release-notes',
          ],
        },
      ],
    },
  ],
};


export default sidebars;
