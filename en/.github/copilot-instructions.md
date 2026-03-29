# Global Reusable Copilot Instructions

This is the richer GitHub Copilot surface for the English locale pack.
Its job is to keep Copilot from collapsing a strong governance system into shallow suggestions or partial plan updates.

## Authority Order
1. `/AGENT_OS_RULES.md`
2. `/AGENTS.md`
3. `/.github/instructions/global-agent.instructions.md`
4. `/AGENT_OS_PLAN_TEMPLATE.md`
5. the active plan
6. this file

## Mandatory
- Read `/AGENT_OS_RULES.md` first as the package-local canonical donor source.
- Read `/AGENTS.md` before editing.
- Treat `/AGENTS.md` as the single source of truth.
- Use `/AGENT_OS_PLAN_TEMPLATE.md` as the canonical plan template.

## Required workflow
1. Start from `/AGENTS.md`, the root plan template, and the active plan in `/plans/`.
2. Do not implement before the plan exists.
3. Update header + phase plan + backlog + request table + task table + gates + risks + handoff/checkpoint atomically.
4. Stay inside the explicit allowlist.
5. Record discovered work honestly.
6. Archive completed plans into `/plans/completed/` in the same closure edit.
7. If the request includes push/deploy/repo-sync, enforce Triple-Sync Lock.
8. Define the main-agent/subagent role matrix in the plan; if no real subagents exist, record `fallback-to-sequential`.

## Copilot execution discipline
- State `MODE`, scope lock, allowlist/denylist, active micro-phase, and test/gate strategy up front.
- In a new repo, align with the user before freezing the roadmap portfolio.
- Write or harden the repo-root planning template before implementation.
- Preserve the single-writer default on shared governance surfaces.

## Non-negotiables
- No-New-Debt
- Plan -> Evidence -> Test
- modular additive changes over monolith growth
- no placeholder or fake completion
- preserve accessibility, responsive behavior, i18n, security, offline/PWA, billing/admin continuity, and repo-specific quality contracts

## Required gates
- Smoke Gate
- Binding Gate
- Selftest Gate
- Related-Tests Gate
- Parity Gate
- No-UI-Regression Gate
- I18N-Completeness Gate
- Dependency-Reproducibility Gate
- Integrity-Lock Gate
- Triple-Sync Gate
- Billing Continuity Gate
- Admin Panel Impact Gate
- Release/NFR Gate

Add stats/export/narrative/card continuity gates when the target repo requires them.
