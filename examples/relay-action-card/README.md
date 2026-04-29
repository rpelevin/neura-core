# Relay Action Card Example

This is the minimum public example for using Neura Relay as an approval layer for agent actions.

Developers keep their own agents, workflows, products, data, and execution systems. Before a proposed agent action becomes real, the developer sends Relay an Action Card. Relay returns a Decision Receipt that the developer can store with the proposed action.

## Run

```bash
node examples/relay-action-card/resolve-action-card.mjs
```

Use a local Relay server:

```bash
RELAY_BASE_URL=http://localhost:3000 node examples/relay-action-card/resolve-action-card.mjs
```

## Files

- `action-card.v0.1.json` is the request shape.
- `decision-receipt.v0.1.json` is the response shape to store.
- `resolve-action-card.mjs` calls `POST /api/resolve`.

## Request

```json
{
  "action_card": {
    "version": "0.1",
    "agent": {
      "id": "agent_support_reply_001",
      "owner": "acme_support",
      "capability": "customer_message_draft",
      "capabilityVersion": "0.1.0"
    },
    "proposedAction": {
      "type": "send_message",
      "summary": "Send a customer reply confirming that the document was received and will be reviewed today.",
      "target": "customer_thread_123"
    },
    "affectedObject": "customer_thread_123",
    "context": {
      "evidenceRefs": ["ticket_123", "uploaded_document_456"],
      "ruleRefs": ["customer_reply_policy"],
      "riskCategory": "customer_communication",
      "requestedOutcome": "proceed_or_review"
    }
  }
}
```

## Response

Relay returns `decision_receipt`:

```json
{
  "decision": "proceed | revise | stop | human_review",
  "trace_ref": "trace_ref_run_123",
  "relay_boundary": "decision_gate_only_developer_keeps_execution"
}
```

## Boundary

Relay returns a governed decision before execution. The developer still owns the agent, workflow, business logic, data, and final execution decision.
