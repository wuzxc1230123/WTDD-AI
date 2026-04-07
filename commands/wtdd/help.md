---
name: wtdd:help
description: Show available WTDD commands and usage guide
allowed-tools:
  - Read
---
<objective>
Display the complete WTDD command reference.

Output ONLY the reference content below. Do NOT add:
- Project-specific analysis
- Git status or file context
- Next-step suggestions
- Any commentary beyond the reference
</objective>

<execution_context>
@~/.claude/what-the-dog-doing/workflows/help.md
</execution_context>

<process>
Output the complete WTDD command reference from @~/.claude/what-the-dog-doing/workflows/help.md.
Display the reference content directly — no additions or modifications.
</process>
