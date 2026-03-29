---
name: global-governance
description: Reusable governance skill. Use this when creating, adapting, reviewing, or hardening AGENTS/instructions/workflows/skills/global plan templates across repositories without narrowing repo-specific contracts.
---

# Global Governance Skill

This skill is the operating checklist for governance propagation and governance hardening work.
In a live repo, `AGENTS.md`, relevant rule files, the active plan, and the root `AGENT_OS_PLAN_TEMPLATE.md` are higher authority.
In this package, the first reference is `AGENT_OS_RULES.md`; the skill applies it without narrowing it.

## Use Cases
- bootstrapping a new governed repo
- hardening existing agent instruction surfaces
- adapting the starter kit to a new ecosystem
- reviewing whether governance files are too shallow or contradictory

## First Steps
1. Read `AGENTS.md`.
2. Read `AGENT_OS_RULES.md`.
3. Read the relevant rule/workflow files.
4. Read the root global plan template.
5. Find the active plan or open a new one.
6. Write the scope lock, allowlist, and denylist.
7. Define the main-agent / supporting-role matrix.
8. State the `Plan -> Evidence -> Test` closure lock explicitly.

## Scope of the Skill
- This skill is not the formal governance authority on its own.
- `AGENTS.md` remains the main source.
- Adapter files may be concise, but not empty shells.
- A reusable donor package is incomplete if it stops at one markdown file and ignores adapter, workflow, skill, and planning-template surfaces.

## Orchestration Protocol
- Main agent = chat-facing agent.
- Single writer by default.
- Maximum 2-3 active micro-phases.
- Default roles: live bug hunter, plan challenger, test/gate verifier.
- Optional roles: i18n, accessibility, security, performance, docs, release, domain.
- If real subagents do not exist, the sequential fallback note is mandatory.

## Non-Negotiables
- No-New-Debt
- no fake completion
- modularity
- mobile/accessibility/i18n/security/offline continuity
- completed-plan archive
- Triple-Sync Lock
- role parity

## Evidence Standard
- file + symbol + why it matters
- diff summary
- test/gate result
- manual steps

## Output Format
1. Summary
2. Evidence / Findings
3. Risks
4. Actions
5. Smoke test steps
6. Gate results
7. Score
