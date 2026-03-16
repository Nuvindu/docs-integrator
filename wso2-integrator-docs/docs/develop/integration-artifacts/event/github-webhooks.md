---
title: GitHub Webhooks
description: React to GitHub repository events such as push, pull request, and issue events.
---

# GitHub Webhooks

React to GitHub repository events such as pushes, pull requests, issues, and more. GitHub delivers webhook payloads as HTTP POST requests with HMAC signature verification for security.

```ballerina
import ballerina/http;
import ballerina/crypto;

configurable string githubWebhookSecret = ?;

type GitHubPushEvent record {|
    string ref;
    record {|string id; string message; string timestamp;|}[] commits;
    record {|string full_name;|} repository;
|};

service /github on new http:Listener(8090) {

    resource function post webhook(
        @http:Header string x\-hub\-signature\-256,
        @http:Payload byte[] payload
    ) returns http:Ok|http:Unauthorized|error {
        // Verify webhook signature
        byte[] hmac = check crypto:hmacSha256(payload, githubWebhookSecret.toBytes());
        string expectedSig = "sha256=" + hmac.toBase16();
        if x\-hub\-signature\-256 != expectedSig {
            return http:UNAUTHORIZED;
        }

        json jsonPayload = check (check string:fromBytes(payload)).fromJsonString();
        GitHubPushEvent event = check jsonPayload.fromJsonWithType();
        log:printInfo("Push to " + event.repository.full_name,
                      ref = event.ref,
                      commits = event.commits.length());
        check triggerCIPipeline(event);
        return http:OK;
    }
}
```

## Supported Event Types

| Event | Header Value | Payload Highlights |
|---|---|---|
| **Push** | `x-github-event: push` | `ref`, `commits[]`, `repository` |
| **Pull Request** | `x-github-event: pull_request` | `action`, `number`, `pull_request` |
| **Issues** | `x-github-event: issues` | `action`, `issue`, `repository` |
| **Release** | `x-github-event: release` | `action`, `release`, `repository` |
| **Workflow Run** | `x-github-event: workflow_run` | `action`, `workflow_run`, `repository` |

## Event-Specific Routing

Route different GitHub events to separate handlers using the `x-github-event` header.

```ballerina
service /github on new http:Listener(8090) {

    resource function post webhook(
        @http:Header string x\-hub\-signature\-256,
        @http:Header string x\-github\-event,
        @http:Payload byte[] payload
    ) returns http:Ok|http:Unauthorized|error {
        check verifySignature(x\-hub\-signature\-256, payload);
        json jsonPayload = check (check string:fromBytes(payload)).fromJsonString();

        match x\-github\-event {
            "push" => {
                GitHubPushEvent event = check jsonPayload.fromJsonWithType();
                check handlePush(event);
            }
            "pull_request" => {
                check handlePullRequest(jsonPayload);
            }
            "issues" => {
                check handleIssue(jsonPayload);
            }
            _ => {
                log:printInfo("Unhandled event type", eventType = x\-github\-event);
            }
        }
        return http:OK;
    }
}
```

## Webhook Signature Verification

Always verify the `x-hub-signature-256` header to confirm requests originate from GitHub.

```ballerina
function verifySignature(string signature, byte[] payload) returns error? {
    byte[] hmac = check crypto:hmacSha256(payload, githubWebhookSecret.toBytes());
    string expectedSig = "sha256=" + hmac.toBase16();
    if signature != expectedSig {
        return error("Invalid webhook signature");
    }
}
```
