import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // ─────────────────────────────────────────────
  // GET STARTED
  // ─────────────────────────────────────────────
  getStartedSidebar: [
    {
      type: 'category',
      label: 'What is WSO2 Integrator?',
      items: [
        'get-started/overview',
        'get-started/why-wso2-integrator',
        'get-started/key-concepts',
      ],
    },
    {
      type: 'category',
      label: 'Set Up',
      items: [
        'get-started/system-requirements',
        'get-started/install-ballerina',
        'get-started/install',
        'get-started/first-project',
        'get-started/understand-the-ide',
      ],
    },
    {
      type: 'category',
      label: 'Quick Starts',
      items: [
        'get-started/quick-start-api',
        'get-started/quick-start-event',
        'get-started/quick-start-file',
        'get-started/quick-start-automation',
        'get-started/quick-start-data-service',
        'get-started/quick-start-ai-agent',
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // DEVELOP
  // ─────────────────────────────────────────────
  developSidebar: [
    {
      type: 'category',
      label: 'Create Integrations',
      link: {type: 'doc', id: 'develop/create-integrations/index'},
      items: [
        'develop/create-integrations/create-new-integration',
        'develop/create-integrations/open-integration',
        'develop/create-integrations/explore-samples',
        'develop/create-integrations/create-library',
        'develop/create-integrations/import-external',
      ],
    },
    {
      type: 'category',
      label: 'Project Views',
      link: {type: 'doc', id: 'develop/project-views/index'},
      items: [
        'develop/project-views/workspace-view',
        'develop/project-views/integration-view',
        'develop/project-views/library-view',
      ],
    },
    {
      type: 'category',
      label: 'Integration Artifacts',
      link: {type: 'doc', id: 'develop/integration-artifacts/index'},
      items: [
        {
          type: 'category',
          label: 'Automation',
          items: [
            'develop/integration-artifacts/automation/automation',
          ],
        },
        {
          type: 'category',
          label: 'Integration as API',
          items: [
            'develop/integration-artifacts/service/http-service',
            'develop/integration-artifacts/service/graphql-service',
            'develop/integration-artifacts/service/tcp-service',
            'develop/integration-artifacts/service/websocket-service',
            'develop/integration-artifacts/service/grpc-service',
          ],
        },
        {
          type: 'category',
          label: 'Event Integration',
          items: [
            'develop/integration-artifacts/event/kafka',
            'develop/integration-artifacts/event/rabbitmq',
            'develop/integration-artifacts/event/mqtt',
            'develop/integration-artifacts/event/azure-service-bus',
            'develop/integration-artifacts/event/salesforce-events',
            'develop/integration-artifacts/event/twilio',
            'develop/integration-artifacts/event/github-webhooks',
            'develop/integration-artifacts/event/solace',
            'develop/integration-artifacts/event/cdc-mssql',
            'develop/integration-artifacts/event/cdc-postgresql',
          ],
        },
        {
          type: 'category',
          label: 'File Integration',
          items: [
            'develop/integration-artifacts/file/ftp-sftp',
            'develop/integration-artifacts/file/local-files',
          ],
        },
        {
          type: 'category',
          label: 'Supporting Artifacts',
          items: [
            'develop/integration-artifacts/supporting/functions',
            'develop/integration-artifacts/supporting/data-mapper',
            'develop/integration-artifacts/supporting/types',
            'develop/integration-artifacts/supporting/connections',
            'develop/integration-artifacts/supporting/configurations',
            'develop/integration-artifacts/supporting/data-persistence',
            'develop/integration-artifacts/supporting/email',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Design Integration Logic',
      link: {type: 'doc', id: 'develop/design-logic/index'},
      items: [
        'develop/design-logic/flow-designer',
        'develop/design-logic/connections',
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
    {
      type: 'category',
      label: 'Transform',
      items: [
        'develop/transform/data-mapper',
        'develop/transform/json',
        'develop/transform/xml',
        'develop/transform/csv-flat-file',
        'develop/transform/edi',
        'develop/transform/yaml-toml',
        'develop/transform/type-system',
        'develop/transform/query-expressions',
        'develop/transform/expressions-functions',
        'develop/transform/ai-assisted-mapping',
      ],
    },
    {
      type: 'category',
      label: 'Debugging & Troubleshooting',
      link: {type: 'doc', id: 'develop/debugging/index'},
      items: [
        'develop/debugging/editor-debugging',
        'develop/debugging/remote-debugging',
        'develop/debugging/strand-dumps',
        'develop/debugging/performance-profiling',
      ],
    },
    {
      type: 'category',
      label: 'Organize Code',
      link: {type: 'doc', id: 'develop/organize-code/index'},
      items: [
        'develop/organize-code/packages-modules',
        'develop/organize-code/package-references',
        'develop/organize-code/manage-dependencies',
        'develop/organize-code/workspaces',
        'develop/organize-code/style-guide',
        'develop/organize-code/generate-documentation',
        'develop/organize-code/static-code-analysis',
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // CONNECTORS
  // ─────────────────────────────────────────────
  connectorsSidebar: [
    {
      type: 'category',
      label: 'Connector Catalog',
      items: [
        'connectors/ai-llms',
        'connectors/cloud-services',
        'connectors/communication',
        'connectors/crm-sales',
        'connectors/databases',
        'connectors/developer-tools',
        'connectors/ecommerce',
        'connectors/erp-business',
        'connectors/finance-accounting',
        'connectors/healthcare',
        'connectors/hrms',
        'connectors/marketing-social',
        'connectors/messaging',
        'connectors/productivity-collaboration',
        'connectors/security-identity',
        'connectors/file-storage',
      ],
    },
    {
      type: 'category',
      label: 'Protocols & Data Formats',
      items: [
        'connectors/protocols',
        'connectors/data-formats-standards',
      ],
    },
    {
      type: 'category',
      label: 'Using Connectors',
      items: [
        'connectors/authentication',
        'connectors/configuration',
        'connectors/error-handling',
        'connectors/ballerina-libraries',
      ],
    },
    {
      type: 'category',
      label: 'Build Your Own',
      items: [
        'connectors/custom-development',
        'connectors/create-from-openapi',
        'connectors/publish-to-central',
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // GENAI
  // ─────────────────────────────────────────────
  genaiSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'genai/getting-started/setup',
        {
          type: 'category',
          label: 'Building Your First AI Integration',
          items: [
            'genai/getting-started/smart-calculator',
            'genai/getting-started/hotel-booking-agent',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Key Concepts',
      items: [
        'genai/key-concepts/what-is-llm',
        'genai/key-concepts/what-is-natural-function',
        'genai/key-concepts/what-is-ai-agent',
        'genai/key-concepts/what-are-tools',
        'genai/key-concepts/what-is-agent-memory',
        'genai/key-concepts/what-is-mcp',
        'genai/key-concepts/what-is-rag',
      ],
    },
    {
      type: 'category',
      label: 'Develop AI Applications',
      items: [
        {
          type: 'category',
          label: 'Direct LLM Calls',
          items: [
            'genai/develop/direct-llm/configuring-providers',
            'genai/develop/direct-llm/constructing-prompts',
            'genai/develop/direct-llm/handling-responses',
          ],
        },
        {
          type: 'category',
          label: 'Natural Functions',
          items: [
            'genai/develop/natural-functions/defining',
            'genai/develop/natural-functions/constructing-prompts',
            'genai/develop/natural-functions/handling-responses',
          ],
        },
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
                'genai/develop/rag/connecting-vector-dbs',
              ],
            },
            'genai/develop/rag/rag-querying',
          ],
        },
        {
          type: 'category',
          label: 'AI Agents',
          items: [
            'genai/develop/agents/creating-agent',
            'genai/develop/agents/adding-tools',
            'genai/develop/agents/adding-memory',
            'genai/develop/agents/advanced-config',
            'genai/develop/agents/agent-observability',
            'genai/develop/agents/agent-evaluations',
          ],
        },
        {
          type: 'category',
          label: 'MCP Integration',
          items: [
            'genai/develop/mcp/creating-mcp-server',
            'genai/develop/mcp/agents-with-mcp',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Agents',
      items: [
        'genai/agents/architecture-concepts',
        'genai/agents/chat-agents',
        'genai/agents/api-exposed-agents',
        'genai/agents/natural-functions',
        'genai/agents/tool-binding',
        'genai/agents/memory-configuration',
        'genai/agents/multi-agent-orchestration',
      ],
    },
    {
      type: 'category',
      label: 'RAG',
      items: [
        'genai/rag/architecture-overview',
        'genai/rag/document-ingestion',
        'genai/rag/chunking-embedding',
        'genai/rag/vector-databases',
        'genai/rag/building-rag-service',
      ],
    },
    {
      type: 'category',
      label: 'MCP',
      items: [
        'genai/mcp/overview',
        'genai/mcp/consuming-mcp-tools',
        'genai/mcp/exposing-mcp-servers',
        'genai/mcp/mcp-security',
      ],
    },
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
    {
      type: 'category',
      label: 'Guardrails',
      items: [
        'genai/guardrails/responsible-ai',
        'genai/guardrails/content-filtering',
        'genai/guardrails/input-output-guardrails',
        'genai/guardrails/token-cost-management',
        'genai/guardrails/ai-usage-guidelines',
      ],
    },
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
    {
      type: 'category',
      label: 'Quick Starts',
      items: [
        'genai/quick-starts/build-conversational-agent',
        'genai/quick-starts/build-rag-application',
        'genai/quick-starts/expose-mcp-server',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'genai/tutorials/hr-knowledge-base-rag',
        'genai/tutorials/customer-care-mcp',
        'genai/tutorials/it-helpdesk-chatbot',
        'genai/tutorials/legal-doc-qa',
        'genai/tutorials/ai-customer-support',
        'genai/tutorials/conversational-data-pipeline',
        'genai/tutorials/mcp-enterprise-data',
        'genai/tutorials/multi-agent-workflow',
        'genai/tutorials/rag-knowledge-base',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'genai/reference/copilot-guide',
        'genai/reference/ai-governance',
        'genai/reference/troubleshooting',
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // TUTORIALS
  // ─────────────────────────────────────────────
  tutorialsSidebar: [
    {
      type: 'category',
      label: 'Walkthroughs',
      items: [
        'tutorials/salesforce-db-sync',
        'tutorials/kafka-event-pipeline',
        'tutorials/rest-api-aggregation',
        'tutorials/walkthroughs/content-based-routing',
        'tutorials/walkthroughs/data-transformation-pipeline',
        'tutorials/file-batch-etl',
        'tutorials/walkthroughs/email-notification-service',
        'tutorials/walkthroughs/cdc-service',
        'tutorials/healthcare-hl7-fhir',
        'tutorials/walkthroughs/edi-ftp-processing',
        'tutorials/data-reconciliation',
      ],
    },
    {
      type: 'category',
      label: 'Enterprise Integration Patterns',
      items: [
        'tutorials/patterns/content-based-router',
        'tutorials/patterns/message-filter',
        'tutorials/patterns/scatter-gather',
        'tutorials/patterns/recipient-list',
        'tutorials/patterns/message-translator',
        'tutorials/patterns/circuit-breaker',
        'tutorials/patterns/saga-compensation',
        'tutorials/patterns/publish-subscribe',
        'tutorials/patterns/guaranteed-delivery',
        'tutorials/patterns/idempotent-receiver',
        'tutorials/patterns/api-gateway-orchestration',
        'tutorials/patterns/agent-tool-orchestration',
        'tutorials/patterns/rag-pipeline',
      ],
    },
    {
      type: 'category',
      label: 'Pre-Built Integration Samples',
      link: {type: 'doc', id: 'tutorials/pre-built/index'},
      items: [
        'tutorials/pre-built/google-sheets-salesforce',
        'tutorials/pre-built/github-email-summary',
        'tutorials/pre-built/google-drive-onedrive',
        'tutorials/pre-built/mysql-salesforce-products',
        'tutorials/pre-built/gmail-salesforce-leads',
        'tutorials/pre-built/kafka-salesforce-pricebook',
        'tutorials/pre-built/salesforce-twilio-sms',
        'tutorials/pre-built/hubspot-google-contacts',
        'tutorials/pre-built/ftp-edi-salesforce',
        'tutorials/pre-built/shopify-outlook-email',
      ],
    },
    {
      type: 'category',
      label: 'Sample Projects',
      link: {type: 'doc', id: 'tutorials/samples/index'},
      items: [
        'tutorials/samples/hospital-service',
        'tutorials/samples/ecommerce-order-service',
        'tutorials/samples/event-driven-microservices',
        'tutorials/samples/data-service-persist',
        'tutorials/samples/restful-api-data-mapper',
        'tutorials/samples/ai-personal-assistant',
      ],
    },
    {
      type: 'category',
      label: 'Migration Guides',
      items: [
        'tutorials/migration/from-wso2-mi',
        'tutorials/migration/from-mulesoft',
        'tutorials/migration/from-tibco',
        'tutorials/migration/from-boomi',
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // DEPLOY & OPERATE
  // ─────────────────────────────────────────────
  deployOperateSidebar: [
    {
      type: 'category',
      label: 'Deploy',
      items: [
        'deploy-operate/deploy/local',
        'deploy-operate/deploy/vm-based',
        'deploy-operate/deploy/docker-kubernetes',
        'deploy-operate/deploy/openshift',
        'deploy-operate/deploy/serverless',
        'deploy-operate/deploy/devant',
        'deploy-operate/deploy/cloud-providers',
        'deploy-operate/deploy/graalvm',
        'deploy-operate/deploy/environments',
        'deploy-operate/deploy/managing-configurations',
        'deploy-operate/deploy/scaling-ha',
      ],
    },
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
    {
      type: 'category',
      label: 'Observe',
      link: {type: 'doc', id: 'deploy-operate/observe/index'},
      items: [
        'deploy-operate/observe/logging',
        'deploy-operate/observe/metrics',
        'deploy-operate/observe/tracing',
        'deploy-operate/observe/icp',
        'deploy-operate/observe/devant',
        'deploy-operate/observe/prometheus',
        'deploy-operate/observe/grafana',
        'deploy-operate/observe/jaeger',
        'deploy-operate/observe/zipkin',
        'deploy-operate/observe/datadog',
        'deploy-operate/observe/new-relic',
        'deploy-operate/observe/elastic',
        'deploy-operate/observe/opensearch',
        'deploy-operate/observe/moesif',
        'deploy-operate/observe/third-party',
      ],
    },
    {
      type: 'category',
      label: 'Secure',
      items: [
        'deploy-operate/secure/runtime-security',
        'deploy-operate/secure/authentication',
        'deploy-operate/secure/api-security',
        'deploy-operate/secure/secrets-encryption',
        'deploy-operate/secure/ip-whitelisting',
        'deploy-operate/secure/compliance',
      ],
    },
    {
      type: 'category',
      label: 'Capacity Planning',
      link: {type: 'doc', id: 'deploy-operate/capacity-planning/index'},
      items: [
        'deploy-operate/capacity-planning/performance-reports',
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // REFERENCE
  // ─────────────────────────────────────────────
  referenceSidebar: [
    {
      type: 'category',
      label: 'Language',
      items: [
        'reference/language/syntax',
        'reference/language/type-system',
        'reference/language/stdlib',
        'reference/language/query-expressions',
        'reference/language/concurrency',
        'reference/language/error-handling',
        'reference/language/integration-features',
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'reference/config/ballerina-toml',
        'reference/config/config-toml',
        'reference/config/cloud-toml',
        'reference/config/dependencies-toml',
        'reference/config/environment-variables',
      ],
    },
    {
      type: 'category',
      label: 'CLI',
      items: [
        'reference/cli/bal-commands',
        'reference/cli/bal-persist',
        'reference/cli/bal-openapi',
        'reference/cli/bal-graphql',
        'reference/cli/bal-grpc',
        'reference/cli/bal-edi',
        'reference/cli/bal-health',
        'reference/cli/update-tool',
        'reference/cli/scan-tool',
      ],
    },
    {
      type: 'category',
      label: 'APIs',
      items: [
        'reference/api/management-api',
        'reference/api/icp-api',
        'reference/api/ballerina-api-docs',
      ],
    },
    'reference/protocols',
    'reference/data-formats',
    'reference/by-example',
    'reference/specifications',
    {
      type: 'category',
      label: 'Appendix',
      items: [
        'reference/appendix/system-requirements',
        'reference/error-codes',
        'reference/glossary',
        'reference/faq',
        'reference/appendix/troubleshooting',
        'reference/release-notes',
      ],
    },
  ],
};

export default sidebars;
