---
name: wtdd:scan
description: Rapid codebase assessment — lightweight alternative to /wtdd-map-codebase
allowed-tools:
  - Read
  - Write
  - Bash
  - Grep
  - Glob
  - Agent
  - AskUserQuestion
---
<objective>
Run a focused codebase scan for a single area, producing targeted documents in `.planning/codebase/`.
Accepts an optional `--focus` flag: `tech`, `arch`, `quality`, `concerns`, or `tech+arch` (default).

Lightweight alternative to `/wtdd-map-codebase` — spawns one mapper agent instead of four parallel ones.
</objective>

<execution_context>
@~/.claude/what-the-dog-doing/workflows/scan.md
</execution_context>

<process>
Execute the scan workflow from @~/.claude/what-the-dog-doing/workflows/scan.md end-to-end.
</process>
