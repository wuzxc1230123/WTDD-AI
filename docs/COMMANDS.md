# WTDD Commands Reference

## Overview

WTDD (What The Dog Doing) provides a set of commands for AI-assisted project planning and execution.

## Available Commands

### Core Workflow Commands

- `/wtdd-quick` - Quick start workflow for rapid iteration
- `/wtdd-plan-phase <phase>` - Plan a specific phase of work
- `/wtdd-execute-phase <phase> [--wave N]` - Execute a phase, optionally targeting a specific wave
- `/wtdd-debug` - Debug workflow for troubleshooting
- `/wtdd-analyze-dependencies` - Analyze dependencies between phases and detect conflicts

### Planning Commands

- `/wtdd-new-project` - Initialize a new project with planning structure
- `/wtdd-generate-slug <name>` - Generate a URL-friendly slug from a name

### Utility Commands

- `/wtdd-help` - Show help information
- `/wtdd-version` - Show version information

## Command Details

### `/wtdd-execute-phase <phase> [--wave N]`

Execute a specific phase from the roadmap.

**Arguments:**
- `phase` - The phase number to execute (e.g., `1`, `2.1`, `3A`)

**Options:**
- `--wave N` - Execute only Wave `N` of the phase (e.g., `--wave 2`)

**Examples:**
```
/wtdd-execute-phase 1
/wtdd-execute-phase 1 --wave 2
/wtdd-execute-phase 5 --wave 2
```

The `--wave` flag allows you to run a specific wave within a phase. This is useful when:
- A phase has multiple waves of work
- You want to retry a specific wave
- You're debugging issues in a particular wave

### `/wtdd-plan-phase <phase>`

Create or update the plan for a specific phase.

**Arguments:**
- `phase` - The phase number to plan

## Configuration

See `CLAUDE.md` for project-specific configuration and workflow enforcement rules.
