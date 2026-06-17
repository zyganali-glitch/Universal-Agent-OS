---
name: agentos_memory
description: Reads, parses, and enforces the Universal Agent OS Collective Memory files before executing any task.
---

# AgentOS Memory Manager Skill

This skill enforces the fundamental rule of Universal Agent OS: The Collective Memory must be consulted and updated.

## Usage
When triggered via `/agentos_memory`, the agent must:
1. Attempt to locate and read the 4 Pillars of Collective Memory in the repository:
   - `AGENT_MEMORY_AND_LESSONS.md` (Minefield History)
   - `AGENT_ARCHITECTURE_AND_PATTERNS.md` (Code Soul)
   - `AGENT_ENVIRONMENT_AND_API.md` (State Memory)
   - `AGENT_USER_PREFERENCES.md` (Your Persona)
2. If the files exist, parse their contents and add them to the active context window.
3. If they do not exist, initialize them using the default AgentOS templates.
4. After completing a task, you must prompt the user or automatically update `AGENT_MEMORY_AND_LESSONS.md` with any new bugs encountered and solved.

## Constraints
- You are forbidden from overriding architectures defined in `AGENT_ARCHITECTURE_AND_PATTERNS.md`.
- You must adapt your communication style based on `AGENT_USER_PREFERENCES.md`.
