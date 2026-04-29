# Neura Core

Core protocol types and public examples for Neura Agent Infrastructure.

## Public Relay Example

The May 4 developer path starts with one narrow flow:

1. A developer keeps their own agent and workflow.
2. The developer sends an Action Card v0.1 to Neura Relay.
3. Relay returns a Decision Receipt v0.1.
4. The developer stores the receipt next to the proposed action before deciding what to execute.

Start here:

```bash
node examples/relay-action-card/resolve-action-card.mjs
```

Use a local Relay server instead:

```bash
RELAY_BASE_URL=http://localhost:3000 node examples/relay-action-card/resolve-action-card.mjs
```

Relay is a decision gate. It does not host the developer's agent, replace the developer's product, or execute downstream actions.
