---
name: wtdd:import
description: Ingest external plans with conflict detection against project decisions before writing anything.
argument-hint: "--from <filepath>"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - Task
---

<objective>
Import external plan files into the WTDD planning system with conflict detection against PROJECT.md decisions.

- **--from**: Import an external plan file, detect conflicts, write as WTDD PLAN.md, validate via wtdd-plan-checker.

Future: `--prd` mode for PRD extraction is planned for a follow-up PR.
</objective>

<execution_context>
@~/.claude/what-the-dog-doing/workflows/import.md
@~/.claude/what-the-dog-doing/references/ui-brand.md
@~/.claude/what-the-dog-doing/references/gate-prompts.md
</execution_context>

<context>
$ARGUMENTS
</context>

<process>
Execute the import workflow end-to-end.
</process>
