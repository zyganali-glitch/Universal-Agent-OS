# AGENTS.md - AGENT GOVERNANCE OS STARTER KIT

Purpose: new work must not create new debt. There is no PASS without evidence and gates.

This file is the operational governance spine of the Agent Governance OS Starter Kit.
When adapted into a target repo, repo-specific quality contracts are preserved and expanded when needed, never weakened.
The first file to read in this package is `AGENT_OS_RULES.md`.

> [!CAUTION]
> **ZERO-LEAK LOCK:**
> An agent reading this file or any agent configuration file MUST first complete the **Interactive Mutual Agreement (Phase 0 Q&A)** to fully understand what will be built and for which platform (Web, Mobile, Game, etc.)!
> - Without establishing a common language with the user in a **Mentor** tone,
> - Without asking questions to comprehend the spirit of the project (Is it a game? Is it a mobile app?) and locking down those decisions,
> - And without populating the root `AGENT_OS_PLAN_TEMPLATE.md` based on those decisions,
> **Absolutely no files can be modified, no code generated, and no commands executed.** Bypassing this lock, bending the plan, or falsely pushing the wrong technological stack (e.g., insisting on HTML when the user wants a native game) is an open betrayal to the architecture.

---

## 0) TL;DR
- No-New-Debt: `Tech-Debt Delta = 0` for every task.
- No delivery outside `Plan -> Evidence -> Test`.
- Reproducible dependency and test/gate runs are mandatory.
- Scope lock is mandatory.
- Modular change is the default.
- Phase-0 Contracts (Platform requirements, Theme, i18n Strategy) are strict closure criteria (e.g., No mobile testing forced on a desktop game).
- Billing/Membership defaults (Open/Closed) are determined by the project nature; they are NOT forced to be "DISABLED".
- Online/Offline vision is dictated by Phase-0; surprise telemetry or conflicting dependencies are fiercely rejected.
- Single-language (Monolingual) projects MUST NOT be bloated with fake i18n scaffolding or translation files.
- Selftest-by-page plus related tests are mandatory whenever applicable to the stack.
- Domain-specific continuities (Dashboard Cards, Export, Admin Panel) are preserved if they exist, but never enforced if absent.
- Multi-role review parity is mandatory.
- For new projects, the agent must align with the user, then write or harden the repo-root `AGENT_OS_PLAN_TEMPLATE.md`.
- Before implementation, the agent must create a hierarchical portfolio made of a master roadmap plus child execution plans.
- Phase-1 auto-activation routing is root-first: instruction registry -> skill registry -> role registry -> prompt registry -> workflow routing registry.
- Skill, role, and prompt routing must stay aligned by shared domain IDs; no second routing taxonomy may be invented locally.
- If one routing registry changes, the affected registries, workflow entries, and docs/examples must be updated in the same request.
- The chat-facing agent is the main agent and default single writer, with at most 2-3 active micro-phases.
- If real subagents do not exist, preserve the same discipline with `fallback-to-sequential`.
- Integrity Lock (IL-01 to IL-12), IL-13 (Live-Docs Sync), and completed-plan archive are mandatory.
- Triple-Sync Lock is mandatory for push/deploy/repo-sync work.

---

## 1) Mode Discipline
- `MODE = QA/REVIEW`
- `MODE = PROMPT-BUILDER`
- `MODE = CODE-CHANGE`

Default is review mode.

## 1.1) Canonical Package Source
- `AGENT_OS_RULES.md` carries the donor rules in this package.
- This file turns that donor into an operational governance spine.
- Adapter, workflow, and skill files may not weaken the donor.

## 1.2) Phase-1 Auto-Activation Chain
- Root registry load order:
	1. `.github/instructions/_ARCHITECTURE.md`
	2. `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json`
	3. `.agent/skills/_SKILL_TEMPLATE_REGISTRY.json`
	4. `.github/agents/_AGENT_ROLE_REGISTRY.json`
	5. `.github/prompts/_PROMPT_TEMPLATE_REGISTRY.json`
	6. `.agent/workflows/_WORKFLOW_DOMAIN_ROUTING.json`
- The workflow layer consumes these registries through `.agent/workflows/session-bootstrap.md` and `.agent/workflows/continue.md`.
- Generated target repositories inherit the same chain additively; locale packs and adapters may specialize wording, but not the routing logic.

## 1.3) Skill Routing Table

| Instruction Domain | Skill ID | Primary Role ID | Default Prompt IDs |
|---|---|---|---|
| `frontend` | `frontend` | `ui-developer` | `new-feature`, `gate-check` |
| `backend` | `backend` | `api-developer` | `new-feature`, `gate-check` |
| `data` | `data` | `data-engineer` | `new-feature`, `skill-generation` |
| `game` | `game` | `game-developer` | `new-feature`, `gate-check` |
| `mobile` | `mobile` | `mobile-developer` | `new-feature`, `gate-check` |
| `deploy` | `deploy` | `deploy-operator` | `deploy-sequence`, `gate-check` |
| `testing` | `qa-testing` | `qa-tester` | `gate-check`, `plan-closure` |
| `i18n` | `i18n` | `i18n-reviewer` | `new-feature`, `gate-check` |
| `plans` | `plan-lifecycle` | `plan-reviewer` | `new-feature`, `plan-closure` |

## 1.4) Auto-Generation and Cascade Sync
- Project analysis selects domains from the instruction registry, then resolves the matching skills, roles, and prompts through the shared registries.
- Target-repo generation must stay additive; existing governance is hardened or extended, never blindly overwritten.
- When any domain map changes, update the affected registry files, workflow routing entries, and any docs/examples that describe the old chain in the same request.

## 2) Main-Agent and Supporting-Role Orchestration
- The main agent is the one chatting with the user.
- The main agent writes the plan, locks the allowlist, and decides closure.
- The main agent also owns the consultation-first project bootstrap.
- The main agent carries at most 2-3 active micro-phases.
- Default supporting roles: live bug hunter, plan challenger, test/gate verifier.
- Optional roles: i18n, accessibility, security, performance, docs, release, domain reviewers.
- Shared plan/config/governance/template files stay single-writer.
- If real subagents do not exist, sequential fallback is mandatory.

## 2.1) Hierarchy and Dependency
- The target repo root `AGENTS.md` becomes the highest live working rule.
- The target repo root `AGENT_OS_PLAN_TEMPLATE.md` is repo-specific but aligned to the donor package.
- The master roadmap governs child execution plans.
- Child plans outrank workflow/skill/adapter surfaces.

## 3) NFR / No-New-Debt Gate
Minimum PASS families:
1. mobile/responsive
2. modularity / anti-monolith
3. security / privacy
4. Domain / Data / Billing Continuity (If dictated by Phase-0)
5. IL-13: Live-Docs (PROJECT_STRUCTURE & FAQ) Sync
6. i18n Completeness (Only if Multilingual)
7. Accessibility (Within the bounds of the target platform)
8. selftest + related tests
9. dependency reproducibility
10. release/NFR parity

## 4) Integrity Lock
- The task table is the single official progress source.
- Header + phase + backlog + request + task + gate + risk + handoff/checkpoint are updated atomically.
- Discovered work is logged as new tracked items.
- No `DONE` while any mandatory gate is `NOT_RUN` or `FAIL`.
- Completed plans move to `plans/completed/` in the same closure edit.

## 5) Required Gate Families
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

Add Sector-Specific / Domain dynamic gates synthesized natively by the Agent based on the unique repo mechanics.

## 6) Output Format
1. Summary
2. Evidence / Findings
3. Risks
4. Actions
5. Smoke test steps
6. Gate results
7. Score
