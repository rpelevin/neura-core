# Relay Action Card Example

This is the minimum public example for using Neura Relay as a decision gate before Agent execution.

## Run

```bash
npm run example:relay
```

Use a local Relay server:

```bash
RELAY_BASE_URL=http://localhost:3000 npm run example:relay
```

## Files

- `action-card.v0.1.json`: the proposed Agent action
- `decision-receipt.v0.1.json`: the response shape your app stores
- `resolve-action-card.mjs`: sends the Action Card to Relay

## Action Card

The Action Card is the request. It names the Agent, proposed action, affected object, evidence refs, rule refs, risk category, and requested outcome.

```json
{
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
```

## Decision Receipt

Relay returns the governed response before execution.

```json
{
  "input_model": "action_card_v0_1",
  "decision": "human_review",
  "trace_ref": "trace_ref_...",
  "next_step": "Route this proposed action to human review before execution.",
  "relay_boundary": "decision_gate_only_developer_keeps_execution"
}
```

The exact `trace_ref` changes on each run. The stable boundary is the point: Relay returns a governed decision, and your app keeps execution ownership.
