---
name: wtdd:next
description: Automatically advance to the next logical step in the WTDD workflow
allowed-tools:
  - Read
  - Bash
  - Grep
  - Glob
  - SlashCommand
---
<objective>
Detect the current project state and automatically invoke the next logical WTDD workflow step.
No arguments needed — reads STATE.md, ROADMAP.md, and phase directories to determine what comes next.

Designed for rapid multi-project workflows where remembering which phase/step you're on is overhead.

Supports `--force` flag to bypass safety gates (checkpoint, error state, verification failures).
</objective>

<execution_context>
@~/.claude/what-the-dog-doing/workflows/next.md
</execution_context>

<process>
Execute the next workflow from @~/.claude/what-the-dog-doing/workflows/next.md end-to-end.
</process>
