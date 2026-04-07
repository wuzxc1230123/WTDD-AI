---
name: wtdd:list-workspaces
description: List active WTDD workspaces and their status
allowed-tools:
  - Bash
  - Read
---
<objective>
Scan `~/wtdd-workspaces/` for workspace directories containing `WORKSPACE.md` manifests. Display a summary table with name, path, repo count, strategy, and WTDD project status.
</objective>

<execution_context>
@~/.claude/what-the-dog-doing/workflows/list-workspaces.md
@~/.claude/what-the-dog-doing/references/ui-brand.md
</execution_context>

<process>
Execute the list-workspaces workflow from @~/.claude/what-the-dog-doing/workflows/list-workspaces.md end-to-end.
</process>
