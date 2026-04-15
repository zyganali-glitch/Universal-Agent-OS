# Global Workspace Rule: Governance / No-New-Debt

This rule is the behavior lock for the English locale pack.
If it conflicts with the live repo `AGENTS.md`, `AGENTS.md` wins.
The canonical donor source in this package is `AGENT_OS_RULES.md`; this rule translates that donor into this agent ecosystem's rule surface.

## Load Order
1. `AGENT_OS_RULES.md`
2. `AGENTS.md`
3. the active plan
4. this rule

## Routing Chain
Before implementation routing, use the shared package registries in this order:
1. `.github/instructions/_ARCHITECTURE.md`
2. `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json`
3. `.agent/skills/_SKILL_TEMPLATE_REGISTRY.json`
4. `.github/agents/_AGENT_ROLE_REGISTRY.json`
5. `.github/prompts/_PROMPT_TEMPLATE_REGISTRY.json`
6. `.agent/workflows/_WORKFLOW_DOMAIN_ROUTING.json`

## Non-Negotiables
- Plan -> Evidence -> Test
- No-New-Debt
- Scope lock + allowlist + denylist
- Modularity is the default
- Mobile/responsive + accessibility + i18n + security + offline/PWA are closure criteria
- Selftest-by-page + related tests are mandatory
- Header + phase + backlog + request + task + gate + risk + handoff/checkpoint are updated atomically
- Completed plans move to `plans/completed/`
- Triple-Sync Lock applies to push/deploy/repo-sync work
- The chat-facing agent is the main agent and default single writer
- If no real subagent support exists, write `fallback-to-sequential`

## Bootstrap Behavior
- In a new or weak-governance repo, align with the user first.
- Write or harden the repo-root planning template before implementation.
- Create a master roadmap plus child execution plans before isolated coding.
- Resolve the active domain into matching skills, roles, and workflow prompts through the shared registries before implementation.

## Global Plan Requirement
- Every new task is planned from `/AGENT_OS_PLAN_TEMPLATE.md` first.
- If there is no active plan, open one.
- Completed plans remain available under `plans/completed/` as historical fallback.
- No `DONE` while mandatory gates remain open.

## Output Format
- Summary
- Evidence / Findings
- Risks
- Actions
- Smoke test steps
- Gate results
- Score
