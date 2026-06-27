# Real-World Agent Scenarios

## Purpose

This document maps Universal Agent OS to common real-life AI coding workflows without changing the core governance model.

The same spine applies everywhere:

1. understand intent
2. install the governance surfaces
3. preserve or create Collective Memory
4. create or update the plan hierarchy
5. implement only inside the agreed scope
6. close with evidence, tests, and documentation sync

Different users need different levels of ceremony, but no scenario should weaken the honesty boundary: `PASS` requires evidence, `NOT_RUN` stays explicit, and existing code is not silently rewritten.

---

## Scenario Matrix

| Scenario | User Problem | Agent OS Behavior | Primary Surfaces |
|---|---|---|---|
| New idea, empty folder | The user has an idea but no project structure. | Run Phase-0, create the plan spine, then build from the agreed platform and constraints. | `AGENTS.md`, `AGENT_OS_PLAN_TEMPLATE.md`, `plans/`, Collective Memory |
| Existing messy project | The user wants help without the agent rewriting old code. | Activate brownfield quarantine, create `TECH_DEBT_AND_SECURITY.md`, govern new work only. | `TECH_DEBT_AND_SECURITY.md`, `docs/BROWNFIELD_ADOPTION_PLAYBOOK.md`, Collective Memory |
| Solo expert | The user wants speed but not chaos. | Use Fast-Track for small tasks while still listing scope, evidence, and tests. | `docs/SLASH_COMMANDS.md`, `AGENT_OS_PLAN_TEMPLATE.md` |
| Beginner in VS Code | The user does not know CLI workflows. | Install through the VS Code command, then let the agent guide one action at a time. | VS Code extension, `README.md`, `docs/INSTALLATION_MANIFEST.md` |
| Agency client project | Multiple client requests can drift into hidden scope. | Lock scope, log discovered work, keep handoff notes and evidence current. | `plans/`, `docs/EVIDENCE_MANIFEST_TEMPLATE.md`, `.github/PULL_REQUEST_TEMPLATE.md` |
| Corporate engineering team | The team needs repeatable agent behavior across projects. | Use enterprise or regulated governance profile guidance, require CI/PR evidence, preserve architecture decisions. | `docs/GOVERNANCE_PROFILES.md`, `.github/workflows/`, `.github/ISSUE_TEMPLATE/` |
| Regulated or sensitive domain | False claims and unsafe data handling are costly. | Keep gates explicit, document NOT_RUN items, consult before heavy infrastructure or sensitive integrations. | `docs/AGENT_FAILURE_PATTERNS.md`, `docs/EVIDENCE_MANIFEST_TEMPLATE.md`, `AGENT_ENVIRONMENT_AND_API.md` |
| Open-source maintainer | Contributors and agents need a shared definition of done. | Use issue/PR templates, visible roadmap items, and verification gates before merge. | `.github/ISSUE_TEMPLATE/`, `.github/PULL_REQUEST_TEMPLATE.md`, `cli/verify.js` |
| Multi-agent handoff | A new agent session loses context. | Bootstrap from memory and workflow files before editing. | `.agent/workflows/`, `AGENT_MEMORY_AND_LESSONS.md`, `AGENT_ARCHITECTURE_AND_PATTERNS.md` |

---

## Recommended Operational Patterns

### 1. Greenfield Starter

Use when the user opens an empty folder and says something vague like "I have an idea."

Expected flow:

1. install Agent OS
2. run Phase-0 one question at a time
3. write the project-specific plan template
4. create `plans/master-roadmap.md`
5. draft first child plan
6. implement only after plan acceptance

Avoid:

- choosing a stack before the user confirms the target platform
- creating fake enterprise scaffolding for a tiny project
- claiming tests passed before running them

### 2. Brownfield Quarantine

Use when the folder already contains real code.

Expected flow:

1. preserve existing user files
2. create or keep `TECH_DEBT_AND_SECURITY.md`
3. inspect structure before proposing changes
4. record known risks
5. enforce Agent OS rules on new work

Avoid:

- forcing a greenfield interview that ignores the existing product
- refactoring legacy code without explicit permission
- overwriting `README.md` or project-specific docs without backup

### 3. Fast-Track With Evidence

Use for small, low-risk work.

Expected flow:

1. state the limited scope
2. edit only the allowed file(s)
3. run the smallest relevant check
4. report evidence and Tech-Debt Delta

Avoid:

- using Fast-Track for architecture changes
- skipping documentation when behavior changes
- hiding failures behind confident summaries

### 4. Corporate Governance

Use when the repo belongs to a team, client, or company.

Expected flow:

1. choose a governance profile from `docs/GOVERNANCE_PROFILES.md`
2. keep PR and issue templates active
3. require CI/package verification where applicable
4. update memory and architecture docs after each task
5. keep NOT_RUN items visible

Avoid:

- letting agents merge undocumented changes
- treating generated code as trusted without review
- mixing product decisions, security decisions, and implementation in one untracked task

---

## Future Product Opportunities

These ideas fit the current architecture but are not required for the open-source core to work.

| Opportunity | Status | Why It Fits |
|---|---|---|
| `NEXT_STEPS.md` generated after install | Implemented in VS Code and bootstrap installers | Helps beginners immediately know what to do next. |
| Initial folder summary in `TECH_DEBT_AND_SECURITY.md` | Implemented in VS Code and bootstrap installers | Gives brownfield projects an immediate baseline before the agent scans deeper. |
| VS Code commands for Fast-Track, Status, and Closure Check | Implemented in VS Code extension | Makes common chat-level governance actions discoverable from the Command Palette. |
| `agent-os health` report | Planned | Turns governance status into a readable scorecard. |
| `agent-os init --profile solo|startup|enterprise|regulated` | Planned | Lets solo, startup, enterprise, and regulated users choose ceremony level without changing core rules. |
| VS Code walkthrough for empty vs existing projects | Planned | Makes the extension more novice-friendly. |
| Team dashboard or GitHub App | Optional commercial layer | Keeps the open-source core free while supporting paid team visibility. |
| Sector packs for SaaS, finance, healthcare, games, and agencies | Optional ecosystem layer | Adds domain-specific gates without weakening the universal spine. |

The open-source promise should stay simple: the core governance files, installer behavior, adapters, memory templates, and verification gates remain open.

Revenue can come from services around the core: audits, onboarding, enterprise profiles, hosted dashboards, custom adapters, and training.
