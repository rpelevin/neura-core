#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const exampleDir = dirname(fileURLToPath(import.meta.url));
const actionCard = JSON.parse(
  await readFile(join(exampleDir, "action-card.v0.1.json"), "utf8"),
);

const RELAY_BASE_URL = process.env.RELAY_BASE_URL ?? "https://www.neurarelay.com";

const response = await fetch(new URL("/api/resolve", RELAY_BASE_URL), {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ action_card: actionCard }),
});

const payload = await response.json();

if (!response.ok || payload.ok !== true) {
  console.error(JSON.stringify(payload, null, 2));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      input_model: payload.input_model,
      decision: payload.decision_receipt?.decision,
      trace_ref: payload.decision_receipt?.trace_ref,
      next_step: payload.decision_receipt?.recommended_next_step,
      relay_boundary: payload.decision_receipt?.relay_boundary,
    },
    null,
    2,
  ),
);
