# Instructions for WTDD

- Use the what-the-dog-doing skill when the user asks for WTDD or uses a `wtdd-*` command.
- Treat `/wtdd-...` or `wtdd-...` as command invocations and load the matching file from `.github/skills/wtdd-*`.
- When a command says to spawn a subagent, prefer a matching custom agent from `.github/agents`.
- Do not apply WTDD workflows unless the user explicitly asks for them.
- After completing any `wtdd-*` command (or any deliverable it triggers: feature, bug fix, tests, docs, etc.), ALWAYS: (1) offer the user the next step by prompting via `ask_user`; repeat this feedback loop until the user explicitly indicates they are done.
