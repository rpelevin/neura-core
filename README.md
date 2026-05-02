# Neura Core

Send an Action Card to Relay. Get a Decision Receipt before execution.

This repository is the public developer starting point for Neura Agent Infrastructure. It keeps the first interaction simple: your Agent proposes an action, Relay reviews it, and your app receives a governed receipt before deciding what to execute.

## Run the Relay example

```bash
git clone https://github.com/rpelevin/neura-core.git
cd neura-core
npm run example:relay
```

The example calls production Relay by default:

```txt
Neura Relay returned a Decision Receipt

Relay: https://www.neurarelay.com
Input: action_card_v0_1
Decision: human_review
Reason: ...
Next step: Route this proposed action to human review before execution.
Trace: trace_ref_...
Boundary: decision_gate_only_developer_keeps_execution
```

Use a local Relay server instead:

```bash
RELAY_BASE_URL=http://localhost:3000 npm run example:relay
```

Machine-readable output:

```bash
npm run example:relay -- --json
```

## What just happened

1. The example loads `examples/relay-action-card/action-card.v0.1.json`.
2. It sends the Action Card to `POST /api/resolve`.
3. Relay returns a Decision Receipt v0.1.
4. Your app stores the receipt next to the proposed action.
5. Your app keeps execution ownership.

Relay is a decision gate. It does not host your Agent, replace your product, store private payloads, or execute downstream actions.

## Repository map

- `examples/relay-action-card/action-card.v0.1.json`: request shape
- `examples/relay-action-card/decision-receipt.v0.1.json`: example response shape to store
- `examples/relay-action-card/resolve-action-card.mjs`: runnable production example
- `scripts/verify-relay-action-card-example.mjs`: production example verifier
- `src/`: minimal shared protocol and type exports

## Verify

```bash
npm run build
npm run verify:relay-example
```

## Ecosystem fit

- Relay reviews proposed Agent actions before execution
- Registry is where Agents are registered
- Protocol defines the message and reference language
- Your app owns the Agent, data, workflow, and final execution

## Launch boundary

This is a source repo and runnable example. Do not treat `@neura/core` as a published npm package until it is actually published.
