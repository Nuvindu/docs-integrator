import os
import re

# Comprehensive list of proper nouns and acronyms to preserve
PRESERVED_TERMS = {
    "WSO2", "Integrator", "Docusaurus", "Microsoft", "Azure", "OpenAI",
    "Ballerina", "ballerinax", "MySQL", "MSSQL", "PostgreSQL", "SQLite",
    "Redis", "Google Sheets", "CLI", "API", "REST", "HTTP", "SSL",
    "OAuth", "OAuth2", "DDL", "SQL", "CRUD", "CI/CD", "ETL", "HL7",
    "FHIR", "ERP", "Ballerina.toml", "Config.toml", "README.md",
    "package-lock.json", "UUID", "JSON", "XML", "YAML", "IDE",
    "VS Code", "GitHub", "Docker", "Kubernetes", "Harbor", "Vite",
    "Node.js", "npm", "Linux", "Windows", "MacOS", "JavaScript",
    "TypeScript", "Python", "Go", "Java", "C#", "C++", "PHP", "Ruby",
    "Rust", "Swift", "Kotlin", "Scala", "Markdown", "HTML", "CSS",
    "TailwindCSS", "Next.js", "Algolia", "OpenSearch", "Elasticsearch",
    "Logstash", "Kibana", "Grafana", "Prometheus", "Zipkin", "Jaeger",
    "OpenTelemetry", "AI", "GenAI", "MI", "BI", "RAG", "LLM", "NLP", "ML",
    "ICP", "Micro", "Alfresco", "Asana", "Candid",
    "CDC", "Confluent", "Discord", "DocuSign", "Elastic", "Gmail",
    "Google", "GraphQL", "gRPC", "Guidewire", "HubSpot", "IBM",
    "Intercom", "JDBC", "Jira", "JMS", "Kafka", "Mailchimp", "MCP",
    "Milvus", "Mistral", "MongoDB", "NATS", "NP", "Ollama", "Oracle",
    "PayPal", "People HR", "pgvector", "Pinecone", "RabbitMQ",
    "Salesforce", "SAP", "SCIM", "Shopify", "Slack", "Smartsheet",
    "Snowflake", "Solace", "Stripe", "TCP", "Trello", "Twilio",
    "Twitter", "UDP", "Weaviate", "WebSocket", "WebSub", "Zoom",
    "Devant", "Claude", "Swan Lake", "Anthropic", "DeepSeek", "MuleSoft",
    "TIBCO", "Bitbucket", "GitLab", "Zendesk"
}

# Mapping for specific case-sensitive technical terms
SPECIFIC_MAPPING = {
    "googlesheets": "Google Sheets",
    "mysql": "MySQL",
    "mssql": "MSSQL",
    "postgresql": "PostgreSQL",
    "sqlite": "SQLite",
    "redis": "Redis",
    "i": "I", # Pronoun I
    "mi": "MI",
    "ai": "AI",
    "bi": "BI",
}

def to_sentence_case(text):
    words = text.split()
    if not words:
        return text
    
    new_words = []
    after_colon = False
    
    for i, word in enumerate(words):
        # Clean word from surrounding symbols for checking
        cleaned_match = re.search(r'([a-zA-Z0-9\.]+)', word)
        
        word_ends_with_colon = word.endswith(':')
        
        if not cleaned_match:
            new_words.append(word)
            if word_ends_with_colon:
                after_colon = True
            continue
            
        cleaned_word = cleaned_match.group(1)
        
        # Check if it's a preserved term
        found_preserved = False
        for term in PRESERVED_TERMS:
            if cleaned_word.lower() == term.lower():
                new_words.append(word.replace(cleaned_word, term))
                found_preserved = True
                break
        
        if found_preserved:
            if word_ends_with_colon:
                after_colon = True
            else:
                after_colon = False
            continue
            
        # Check specific mappings
        if cleaned_word.lower() in SPECIFIC_MAPPING:
            new_words.append(word.replace(cleaned_word, SPECIFIC_MAPPING[cleaned_word.lower()]))
            if word_ends_with_colon:
                after_colon = True
            else:
                after_colon = False
            continue

        if i == 0 or after_colon:
            # First word or word after colon: capitalize
            if any(c.isupper() for c in word[1:]):
                 new_words.append(word)
            else:
                 new_words.append(word[0].upper() + word[1:].lower())
            after_colon = False
        else:
            # Subsequent words: lowercase unless it's mixed case
            if any(c.isupper() for c in word[1:]):
                new_words.append(word)
            else:
                new_words.append(word.lower())
        
        if word_ends_with_colon:
            after_colon = True

    return " ".join(new_words)

def process_file(filepath, dry_run=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = []
    in_frontmatter = False
    changed = False
    
    for i, line in enumerate(lines):
        if i == 0 and line.strip() == '---':
            in_frontmatter = True
            new_lines.append(line)
            continue
        if in_frontmatter:
            if line.strip() == '---':
                in_frontmatter = False
            new_lines.append(line)
            continue
            
        header_match = re.match(r'^(##+)\s+(.+)$', line)
        if header_match:
            level = header_match.group(1)
            title = header_match.group(2)
            new_title = to_sentence_case(title)
            
            if new_title != title:
                new_line = f"{level} {new_title}\n"
                new_lines.append(new_line)
                changed = True
                # print(f"FILE: {filepath}\n  OLD: {line.strip()}\n  NEW: {new_line.strip()}")
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)
            
    if changed and not dry_run:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
    
    return changed

def main():
    docs_dir = 'en/docs'
    dry_run = False # Set to False to apply changes
    count = 0
    changed_count = 0
    
    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                count += 1
                if process_file(filepath, dry_run=dry_run):
                    changed_count += 1
                    
    print(f"Total files checked: {count}")
    print(f"Total files modified: {changed_count}")

if __name__ == "__main__":
    main()
