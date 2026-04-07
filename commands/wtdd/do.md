---
name: wtdd:do
description: Route freeform text to the right WTDD command automatically
argument-hint: "<description of what you want to do>"
allowed-tools:
  - Read
  - Bash
  - AskUserQuestion
---
<objective>
Analyze freeform natural language input and dispatch to the most appropriate WTDD command.

Acts as a smart dispatcher — never does the work itself. Matches intent to the best WTDD command using routing rules, confirms the match, then hands off.

Use when you know what you want but don't know which `/wtdd-*` command to run.
</objective>

<execution_context>
@~/.claude/what-the-dog-doing/workflows/do.md
@~/.claude/what-the-dog-doing/references/ui-brand.md
</execution_context>

<context>
$ARGUMENTS
</context>

<process>
Execute the do workflow from @~/.claude/what-the-dog-doing/workflows/do.md end-to-end.
Route user intent to the best WTDD command and invoke it.
</process>
