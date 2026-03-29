# English Locale Pack

This folder is the self-contained English pack of the Agent Governance OS Starter Kit.

Required starting spine:
- `AGENT_OS_RULES.md`
- `AGENTS.md`
- `AGENT_OS_PLAN_TEMPLATE.md`

Agent-native surfaces:
- `.agent/rules/global-governance.md`
- `.agent/skills/global-governance/SKILL.md`
- `.agent/workflows/session-bootstrap.md`
- `.agent/workflows/continue.md`
- `.codex/AGENTS.md`
- `.github/copilot-instructions.md`
- `.github/instructions/global-agent.instructions.md`
- `CLAUDE.md`
- `GEMINI.md`
- `.cursor/rules/global-governance.mdc`
- `AIDER.md`

Suggested flow:
1. Read the donor file first.
2. Read `AGENTS.md` and the planning template.
3. Select the native surface that matches the target agent ecosystem.
4. Adapt the pack to the target repo root.
5. Write or harden the repo-specific root template.
6. Create a master roadmap plus child execution plans before implementation.

Rule:
- Agent-native files are not thin bridge notes. They are richer operational surfaces for each ecosystem.
- None of them may weaken the donor, `AGENTS.md`, or the planning-template hierarchy.
