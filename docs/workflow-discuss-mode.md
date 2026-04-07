# Workflow Discuss Mode

## Overview

Discuss mode is a configuration option that controls how much the AI explains its reasoning before taking action.

## Configuration

Set discuss mode using:

```
/wtdd-config-set workflow.discuss_mode <level>
```

## Levels

### `assumptions` (Default)

The AI will:
- State key assumptions before proceeding
- Ask clarifying questions when requirements are ambiguous
- Confirm understanding of complex tasks

### `discuss`

The AI will:
- Provide detailed reasoning before actions
- Explain trade-offs and alternatives
- Engage in collaborative problem-solving

## When to Use

Use `assumptions` mode when:
- You want quick execution with minimal back-and-forth
- Requirements are clear and well-defined
- You're in a flow state

Use `discuss` mode when:
- Exploring complex design decisions
- Learning about a new codebase
- Requirements are unclear or conflicting

## Examples

```
# Set to assumptions mode for quick execution
/wtdd-config-set workflow.discuss_mode assumptions

# Set to discuss mode for collaborative exploration
/wtdd-config-set workflow.discuss_mode discuss
```
