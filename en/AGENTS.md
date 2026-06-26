# AGENTS.md - AGENT GOVERNANCE OS STARTER KIT

Purpose: new work must not create new debt. There is no PASS without evidence and gates.

This file is the **Supreme Constitution** and operational governance spine of the Agent Governance OS.
It is the highest binding authority in the repository. All agents, cross-references, child plans, and tasks are strictly subordinate to the rules defined here.
When adapted into a target repo, repo-specific quality contracts are preserved and expanded when needed, never weakened.
The first file to read in this package is `AGENT_OS_RULES.md`.

> [!CAUTION]
> **ZERO-LEAK LOCK:**
> An agent reading this file or any agent configuration file MUST first complete the **Interactive Mutual Agreement (Phase 0 Q&A)** to fully understand what will be built and for which platform (Web, Mobile, Game, etc.)!
> - Without establishing a common language with the user in a **Mentor** tone,
> - Without asking questions to comprehend the spirit of the project (Is it a game? Is it a mobile app?) and locking down those decisions,
> - **CRITICAL:** You MUST ask these Phase 0 questions STRICTLY ONE BY ONE. Wait for the user's answer before asking the next question.
> - And without populating the root `AGENT_OS_PLAN_TEMPLATE.md` based on those decisions,
> **Absolutely no files can be modified, no code generated, and no commands executed.** Bypassing this lock, bending the plan, or falsely pushing the wrong technological stack (e.g., insisting on HTML when the user wants a native game) is an open betrayal to the architecture.

---

## Beginner-Friendly Bootstrap

This framework is designed for people who may have no software-development knowledge. A user should be able to begin with a sentence as simple as:

> I have an idea. Please help me turn it into a project.

### Communication Rules for Beginners
- Mirror the user's language. If they write in English, respond in English. If they write in Turkish, respond in Turkish.
- Prefer everyday words over software jargon.
- If a technical term is unavoidable, explain it in one sentence.
- Give one action at a time.
- Never shame uncertainty; "I'm not sure" is a valid answer.
- Recommend a safe default, but let the user decide.
- Summarize what was decided after Phase-0.

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
- For new projects, the agent must align with the user, then write or harden the repo-root `AGENT_OS_PLAN_TEMPLATE.md` as its FIRST action.
- **Master Roadmap Lock**: A "Plan Creation Plan" (Master Roadmap) must be written containing all end-to-end child plans. **NO CODING CAN START** until all child plans are drafted and prioritized. The Master Roadmap is a living document.
- **Continuous Sync Lock**: After EVERY task, the agent MUST synchronously update the project Memory, Architecture, user repo README, and any relevant guides.
- Before implementation, the agent must create a hierarchical portfolio made of a master roadmap plus child execution plans.
- The chat-facing agent is the main agent and default single writer, with at most 2-3 active micro-phases.
- If real subagents do not exist, preserve the same discipline with `fallback-to-sequential`.
- Integrity Lock (IL-01 to IL-12), IL-13 (Live-Docs Sync), IL-14 (Adapter Lock), IL-15 (Roadmap Lock), IL-16 (Continuous Sync Lock), and completed-plan archive are mandatory.
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
- **IL-14 (Adapter Currency Lock)**: As the very first action upon entering this repository, the agent MUST inspect its own native root adapter file (e.g. `.cursorrules`, `CLAUDE.md`, `.agents/AGENTS.md`). If the agent's platform has evolved to support a more modern or advanced instruction-loading format than what is currently in the adapter, the agent MUST self-update the adapter file to the latest native standard before executing any code changes.
- **IL-15 (Master Roadmap & Coding Lock)**: After Phase-0, the agent MUST create a project-specific global plan template and a "Plan Creation Plan" (Master Roadmap). The Master Roadmap is a living document tracking all end-to-end child plans. **NO CODING OR EXECUTION CAN START** until all child plans listed in the Master Roadmap are drafted and prioritized.
- **IL-16 (Continuous Sync Lock)**: At the end of EVERY executed task, the agent MUST synchronously update the project's Memory, Architecture documents, the user repository's README, and any other relevant documentation. Keeping the living documentation updated is a hard requirement for marking a task as DONE.

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
