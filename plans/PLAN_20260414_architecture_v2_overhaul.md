# UNIVERSAL AGENT OS — v2.0 Architecture Overhaul & Productization Plan

---

## 0) Document Identity

- Plan filename: `PLAN_20260414_architecture_v2_overhaul.md`
- Active plan directory: `plans/PLAN_20260414_architecture_v2_overhaul.md`
- Archive directory: `plans/completed/PLAN_20260414_architecture_v2_overhaul.md`
- Plan ID: `ARCH-V2-001`
- Project Target Platform: `Framework/Library (Multi-IDE, Multi-Platform Agent Governance)`
- Last updated: `2026-04-16 00:11 UTC+03:00`
- Plan owner: `main-agent`
- Active status: `IN_PROGRESS`

All IL-01..IL-12 enforced. Plan updates are atomic (header + phase + backlog + task table + gates + risks + handoff).

---

## 1) Problem Statement

The current v0.1.0 package has a working governance spine (`AGENT_OS_RULES.md`, `AGENTS.md`, adapters, 1 skill, 1 workflow set) but is missing the **4-Layer Auto-Activation Architecture**, **domain-specific skill auto-generation**, **multi-gate enforcement tooling**, and **productization infrastructure** needed to become a self-sustaining, commercially viable framework.

It is still too close to a markdown-first starter kit. For the primary user in this plan, that is not enough. The framework must let a non-coding operator start from a single invocation, enter a guided Phase 0 interview, avoid technical architecture decisions they cannot make, and still drive a disciplined build that may grow into a very large codebase. The product target is therefore a **consultation-first governance compiler**: executable bootstrap + generated repo-specific governance surfaces + enforceable automation, not just donor markdown files.

### 1.1) Gap Analysis: Current v0.1.0 vs Target v2.0

| Capability | v0.1.0 Status | v2.0 Target |
|---|---|---|
| Product form | Markdown-first starter kit | Consultation-first governance compiler + executable bootstrap |
| Primary user model | Assumes a governance-savvy technical operator | Non-coder operator can safely govern agent-built projects |
| Technical decision policy | User may still be pushed toward architecture answers | Agent chooses safest maintainable defaults when user cannot answer |
| Scale governance | No mandatory size classification | Automatic size classification + master roadmap/child plan portfolio + shortcut bans for medium/large projects |
| Agent ecosystem freshness | Static adapter assumptions | Bootstrap agent scans current locally available agent ecosystems and generates adaptive agent files while preserving donor discipline |
| Constitutional governance (`AGENTS.md` + `AGENT_OS_RULES.md`) | ✅ EXISTS — strong | Harden + add missing protocols |
| Scoped instruction files (`.instructions.md` with `applyTo`) | ⚠️ 1 global file only | Full scoped instruction architecture (N files, domain-specific) |
| Agent role files (`.agent.md`) | ❌ MISSING | 6+ agent role definitions with skill routing |
| Quick-start prompt templates (`.prompt.md`) | ❌ MISSING | 5+ canonical prompt templates |
| Domain-specific skill files (`SKILL.md`) | ⚠️ 1 generic only | 7+ skill templates + auto-generation protocol |
| 4-Layer Auto-Activation (instruction→skill→agent→workflow) | ❌ MISSING | Full 4-layer chain with zero-manual-trigger |
| Skill auto-generation from project analysis | ❌ MISSING | Agent reads project → generates skills autonomously |
| Cascade Protocol (governance drift detection) | ❌ MISSING | Cross-file integrity verification + drift checklist |
| Gate Automation (CI/CD enforcement) | ⚠️ 1 GitHub Actions stub | Full CI pipeline + pre-commit hooks + gate runner |
| VS Code Extension | ❌ MISSING | Sidebar gate dashboard + auto-instruction loader |
| GitHub App / PR Integration | ❌ MISSING | Auto gate checklist on PR + review enforcement |
| CLI scaffold tool (`npx agent-os init`) | ❌ MISSING | Project init + skill generation + gate runner |
| npm/pip/cargo package distribution | ❌ MISSING | Published packages for major ecosystems |
| Commercial licensing + SaaS tier | ⚠️ LICENSE exists but basic | Dual-license (OSS + Commercial) + hosted dashboard |
| Documentation site | ⚠️ README only | Full docs site (Getting Started, Architecture, API Reference) |
| Example repos (multi-platform) | ⚠️ 1 minimal-saas only | 5+ examples (web, game, mobile, API, data-science) |

---

## 2) Architecture Vision: 4-Layer Auto-Activation

### 2.0) Product North Star

The v2.0 product is **not** a markdown-only kit. It is a consultation-first governance compiler for non-coders and low-code operators.

Primary operating model:
- User provides product goal, platform intent, constraints, and rough scale in plain language.
- Agent translates that into technical decisions, architecture, plan portfolio, gate matrix, and generated repo governance surfaces.
- A single entry invocation (`agent-os init`, or a platform-native wrapper) starts the interview and bootstrap flow.
- The system generates repo-specific files: `AGENTS.md`, `AGENT_OS_PLAN_TEMPLATE.md`, scoped instructions, skills, agent roles, prompt templates, workflows, and automation hooks.
- Donor markdown files remain the constitutional source, but they are not the only end-user surface of the finished product.
- If the user cannot answer a technical question, the agent must choose the safest maintainable default, explain the trade-off in plain language, and record the rationale.
- If the project is classified as medium/large or structurally complex, shortcut modes (`--minimal`, `--prototype`) cannot be used to justify weak architecture.

### 2.0A) Distribution Connection Model

The user's command must not depend on manually cloning or copying this repository as a folder of markdown files.

Required connection topology:

```
This repo (source of truth)
  -> versioned release artifact
  -> packaged distribution surface (npm/pip/PowerShell/native wrapper/standalone binary)
  -> user command (`agent-os init` or native equivalent)
  -> Phase 0 interview + project analysis
  -> generated repo-specific governance in the target project
```

Rules:
- This repository is the maintainer/source layer, not the primary runtime surface for end users.
- End users should be able to start from a single command or a native wrapper without manually copying donor files.
- The installed command resolves templates, generators, and workflows from a versioned packaged artifact, not from a live Git clone.
- Enterprise/offline environments must be able to mirror the packaged artifact internally and run bootstrap without external repo access.
- Native wrappers (VS Code command, PowerShell entry, Python launcher, package-manager scripts) may vary by platform, but they must delegate to one versioned core bootstrap path.
- Repo-specific files are generated into the target project additively; existing governance must be hardened or extended, never blindly overwritten.

### 2.0B) Living Governance Startup Model

The first successful bootstrap must start a **living governance model**, not just create a global template and stop.

Mandatory startup sequence after Phase 0:
1. Generate or harden the target repo's global governance and plan template.
2. Create a **Portfolio Genesis Plan** (living plan registry) for the project.
3. Estimate the total execution-plan count needed for project completion, including draft plan names, IDs, scopes, dependencies, priority waves, and plan-generation status.
4. Generate the required execution plans in planning mode before any implementation plan enters code-change mode.
5. If context limits prevent all detailed plan documents from being produced in one session, continue in planning-only waves across sessions until plan-generation coverage reaches 100 percent for the forecasted portfolio.
6. Implementation remains blocked until the living registry shows that all currently forecasted prerequisite plan files have been created.
7. If new discoveries or new user requests require separate workstreams, the registry must be updated first, a new plan must be created, and only then may that work begin.
8. Dependency and interaction links between plans must stay explicit and live; execution order follows dependency and risk, not message order.

### 2.0C) Agent Ecosystem Freshness Model

Agent-native files must be generated by the interviewing/bootstrap agent according to the current agent ecosystem snapshot available at generation time.

Rules:
- The bootstrap agent must scan which agent platforms are actually relevant for the target repo and operator flow.
- It must inspect the currently available agent-native surfaces and compatibility inputs before writing native agent files.
- If the current snapshot implies more agent files, more split roles, or additional adapter surfaces, those files are generated before implementation begins.
- Generated files must preserve this framework's governance discipline while adapting wording and structure to the current agent ecosystem.
- The freshness basis used for generation must be recorded so later sessions know what "current" meant at generation time.
- Freshness cannot become an excuse for unbounded network dependence; packaged compatibility and offline-safe operation remain mandatory.

### 2.1) Layer Architecture

```
Layer 1: PLATFORM-NATIVE AUTO-LOAD (zero config, file-scope triggered)
  └── .github/instructions/*.instructions.md (applyTo glob → agent touches file → rules load)
  └── Each instruction header carries: "Domain skill: .agent/skills/X/SKILL.md"

Layer 2: SKILL AUTO-READ (instruction header triggers skill load)
  └── .agent/skills/*/SKILL.md (deep domain capability — auto-generated per project)
  └── Agent reads skill → gains domain expertise for that project area

Layer 3: AGENT ROLE ACTIVATION (@agent-name or plan-domain detection)
  └── .github/agents/*.agent.md (persona + mandatory reading list including skills)
  └── Agent inherits: rules + skills + role-specific contracts

Layer 4: WORKFLOW ROUTING (session entry point → domain detection → skill chain)
  └── .agent/workflows/*.md (session-bootstrap, continue/resume)
  └── Workflow reads active plan → detects domain → loads matching skills
```

### 2.2) Auto-Generation Protocol

The key innovation: **skill files are NOT static.** They are generated by the agent after analyzing the target project.

```
User: "Initialize Agent OS in my project"
  │
  ▼
Agent: Reads AGENT_OS_RULES.md + AGENTS.md
  │
  ▼
Agent: Runs Phase 0 Interview (project type, stack, platform, etc.)
  │
  ▼
Agent: Scans project structure (files, folders, package.json/requirements.txt/Cargo.toml, etc.)
  │
  ▼
Agent: Auto-generates:
  ├── Scoped .instructions.md files (based on detected domains)
  ├── Domain-specific SKILL.md files (based on project areas)
  ├── Agent role .agent.md files (based on needed specializations)
  ├── Prompt templates (based on project workflow)
  └── _ARCHITECTURE.md (hierarchy + drift checklist for THIS project)
```

---

## 3) Scope Lock

### 3.1 Included
- All files in this repository
- New files to be created as defined in the modular file design table
- Documentation and example repos

### 3.2 Excluded
- External repositories (used as read-only reference for architecture patterns)
- Live deployment infrastructure
- Payment processing implementation

### 3.3 Allowlist (initial — expands per phase)
Phase 0: All locale packs, root governance files, `init-agent-os.sh`, `.github/workflows/`, `docs/`
Phase 1: Locale packs, root governance files, `.github/instructions/`, `.agent/skills/`, `.github/agents/`
Phase 2: `.github/prompts/`
Phase 3: `cli/`, `packages/`, `.github/workflows/`
Phase 4: `extensions/`, `apps/`
Phase 5: `docs-site/`, `examples/`

### 3.4 Denylist
- Activating paid services without explicit approval
- Adding telemetry or external network calls to the core framework
- Breaking backward compatibility of v0.1.0 governance surfaces without migration path

---

## 4) Request Intake Table

| Req ID | Request | Priority | Dependency | Phase |
|---|---|---|---|---|
| R-00 | Define product as a consultation-first governance compiler for non-coders | CRITICAL | — | P0 |
| R-00A | Guarantee single-command bootstrap (`agent-os init` or native wrapper) as the primary entry point | CRITICAL | R-00 | P0/P2 |
| R-00B | Force agent-owned technical decisions when the user cannot answer technical questions | CRITICAL | R-00 | P0/P1 |
| R-00C | Add scale classification + anti-shortcut doctrine for medium/large projects | CRITICAL | R-00 | P0/P1 |
| R-00D | Define packaged distribution topology between this repo and the user's command surface | CRITICAL | R-00A | P0/P2 |
| R-00E | Enforce Portfolio Genesis Plan + living plan registry before implementation | CRITICAL | R-00B, R-00C | P0/P1/P2 |
| R-00F | Enforce discovery-born/new-demand work only through new plan creation + registry update | CRITICAL | R-00E | P0/P1 |
| R-00G | Enforce agent ecosystem freshness: bootstrap agent scans current agent-native surfaces and generates adaptive agent files | CRITICAL | R-00A, R-00B | P0/P1/P2 |
| R-01 | Build 4-layer auto-activation architecture | CRITICAL | — | P1 |
| R-02 | Create scoped instruction template system | CRITICAL | R-01 | P1 |
| R-03 | Create skill auto-generation protocol | CRITICAL | R-01 | P1 |
| R-04 | Build agent role template system | HIGH | R-02 | P1 |
| R-05 | Build prompt template system | HIGH | R-02 | P1 |
| R-06 | Create _ARCHITECTURE.md with cascade protocol | CRITICAL | R-01..R-05 | P1 |
| R-07 | Create CLI tool (`agent-os init`) | HIGH | R-01..R-06 | P2 |
| R-08 | Build gate runner (local + CI) | HIGH | R-07 | P2 |
| R-09 | GitHub Actions: gate enforcement pipeline | HIGH | R-08 | P2 |
| R-10 | Pre-commit hook: governance drift check | MEDIUM | R-08 | P2 |
| R-11 | VS Code Extension: gate sidebar + instruction loader | HIGH | R-01..R-06 | P3 |
| R-12 | GitHub App: PR gate checklist auto-generation | HIGH | R-08 | P3 |
| R-13 | npm package: `@agent-os/core` | HIGH | R-07 | P3 |
| R-14 | pip package: `agent-os` | MEDIUM | R-07 | P3 |
| R-15 | Documentation site (Docusaurus/Astro) | HIGH | R-01..R-06 | P4 |
| R-16 | Example repos: web, game, mobile, API, data-science | HIGH | R-07 | P4 |
| R-17 | Commercial licensing model (dual-license) | MEDIUM | R-15 | P5 |
| R-18 | Hosted SaaS dashboard (gate analytics + team governance) | LOW | R-12 | P5 |

---

## 5) Phase Plan

### Phase 0: Universality Remediation (PRE-ARCHITECTURE — NEW)
**Goal:** Fix all CRITICAL/HIGH specificity issues and lock the non-coder-first governance compiler doctrine before the v2.0 architecture is built.
**Rationale:** 5 CRITICAL + 7 HIGH + 10 MEDIUM + 6 LOW issues already exist, and the product can still drift into a markdown-only starter kit. Building 4-layer architecture before locking user-protection, executable bootstrap, and scale-aware anti-shortcut rules would undermine the framework's main promise.
**Details:** Full findings and step-by-step remediation in Section 16.

| Step | Description | Status | Dependencies |
|---|---|---|---|
| P0.0 | Lock product identity: consultation-first governance compiler, not markdown-only starter kit | IN_PROGRESS | — |
| P0.0a | Define user-protection doctrine: agent translates technical choices; non-coder user is never forced to supply architecture answers | PENDING | P0.0 |
| P0.0b | Define single-command bootstrap contract (`agent-os init` + native wrappers) | PENDING | P0.0 |
| P0.0c | Define scale classification + anti-shortcut doctrine (`--minimal` / `--prototype` blocked for medium/large projects) | PENDING | P0.0 |
| P0.0d | Define packaged distribution topology: source repo → release artifact → installed command → target repo generation | PENDING | P0.0b |
| P0.0e | Define Portfolio Genesis Plan + living registry doctrine | PENDING | P0.0a, P0.0c |
| P0.0f | Define discovery/new-demand plan-birth protocol and implementation lock | PENDING | P0.0e |
| P0.0g | Define agent ecosystem freshness doctrine: bootstrap agent scans current native surfaces and generates adaptive agent files | COMPLETED | P0.0b |
| P0.1 | Remove "Opradox" from `en/` + `tr/` session-bootstrap.md | COMPLETED | — |
| P0.2 | Remove "Antigravity" from `en/` + `tr/` rules/global-governance.md | COMPLETED | — |
| P0.3 | Fix stale file references in `en/` + `tr/` `.cursor/rules/global-governance.mdc` | COMPLETED | — |
| P0.4 | Fix CI workflow filename/shape to validate packaged locale files | COMPLETED | — |
| P0.5 | Fix broken `devam.md` reference in TR rules by creating workflow | COMPLETED | — |
| P0.6 | Internationalize `init-agent-os.sh`: default EN, add locale auto-detect, bilingual prompts | COMPLETED | — |
| P0.7 | Create cross-platform installer alternative (`init-agent-os.ps1` or `.py`) | COMPLETED | P0.6 |
| P0.8 | Create `docs/en/SLASH_COMMANDS.md`, restructure docs by locale | COMPLETED | — |
| P0.9 | Rename "Silicon Valley" roles to neutral names in `AGENT_OS_RULES.md` (en+tr) | COMPLETED | — |
| P0.10 | Normalize GitHub references: always `(e.g., GitHub/GitLab/Bitbucket)` | COMPLETED | — |
| P0.11 | Add monorepo governance section to `AGENT_OS_RULES.md` (en+tr) | COMPLETED | — |
| P0.12 | Populate root-level adapter stubs (`.codex/`, `.agent/`) with redirect READMEs | COMPLETED | — |
| P0.13 | Fix self-referential quality wording → `enterprise-grade depth` | COMPLETED | — |
| P0.14 | Replace informal rapid-prototyping slang in formal contexts | COMPLETED | — |
| P0.15 | Fix Turkish mode name leak in EN session-bootstrap.md (`KOD-DEĞİŞİKLİĞİ` → `CODE-CHANGE`) | COMPLETED | — |
| P0.16 | Fix `VERSIONING.md` locale-lead bias note | COMPLETED | — |
| P0.17 | Expand Phase-0 platform list: add CLI, Library/SDK, ML Pipeline, IaC/DevOps, Firmware, Smart Contract | COMPLETED | — |
| P0.18 | Fix game engine examples → `e.g., Unity/Unreal/Godot` | COMPLETED | — |
| P0.19 | Fix package-manager example to be ecosystem-agnostic | COMPLETED | — |
| P0.20 | Create `CONTRIBUTING.md` — how to add new platform adapters + locale packs | COMPLETED | — |
| P0.21 | Restructure `docs/` by locale (`docs/en/`, `docs/tr/`) | COMPLETED | P0.8 |
| P0.22 | Add non-web example skeleton (`examples/minimal-cli/`) | COMPLETED | — |
| P0.23 | Locale parity verification: all P0 changes applied to both locale packs | COMPLETED | P0.1..P0.22 |

### Phase 1: Core Architecture Overhaul (v2.0-alpha)
**Goal:** Transform single-file governance into 4-layer auto-activation architecture.

| Step | Description | Status | Dependencies |
|---|---|---|---|
| P1.1 | Redesign `_ARCHITECTURE.md` — hierarchy, cascade protocol, drift checklist, automation spec | COMPLETED | — |
| P1.2 | Create scoped instruction **template generator** — agent analyzes project → produces `*.instructions.md` files with correct `applyTo` | COMPLETED | P1.1 |
| P1.3 | Create skill **template library** — base skill templates for common domains (frontend, backend, data, API, deploy, testing, i18n) + **auto-generation protocol** (agent scans project → generates project-specific skills) | COMPLETED | P1.1 |
| P1.4 | Create agent role **template system** — base `.agent.md` templates with mandatory skill routing in "Mandatory Reading" | COMPLETED | P1.2, P1.3 |
| P1.4a | Add adaptive agent-file generation protocol — current ecosystem scan, extra agent-file synthesis, freshness snapshot recording | COMPLETED | P1.3, P1.4 |
| P1.5 | Create prompt **template system** — reusable `.prompt.md` files for common workflows (gate-check, deploy, plan-closure, new-feature) | COMPLETED | P1.2 |
| P1.6 | Wire 4-layer auto-activation chain: instruction header → skill ref → agent mandatory reading → workflow domain detection | COMPLETED | P1.2..P1.5 |
| P1.7 | Update `AGENTS.md` (en + tr) — add skill routing table, auto-generation protocol, cascade sync rules | COMPLETED | P1.6 |
| P1.8 | Update `AGENT_OS_RULES.md` (en + tr) — add 4-layer architecture, skill generation, cascade protocol | COMPLETED | P1.6 |
| P1.9 | Update all adapter files (`.codex/`, `.github/copilot-instructions.md`, `.agent/rules/`, `.cursor/`) — skill routing tables | COMPLETED | P1.7 |
| P1.10a | Plan template: IL Expansion — add IL-09 (Cross-Table Parity), IL-10 (Auto-Validation + Phase Transition), IL-11 (Status Rollback Prohibition), IL-12 (Cascading Discovered-Work Block), GFL-01 (Artifact/Documentation Freshness Lock) | COMPLETED | P1.8 |
| P1.10b | Plan template: Cross-Section Atomic Update Protocol + Archive Cutover Procedure | COMPLETED | P1.10a |
| P1.10c | Plan template: Plan Lifecycle Protocols — New Plan Production, Portfolio Genesis Registry, Session Startup, Plan Usage Guide, Priority Queue | PENDING | P1.10a |
| P1.10d | Plan template: Non-Negotiable Protocols (universalized ~25-30 core items) + MODE Discipline section | PENDING | P1.10a |
| P1.10e | Plan template: Multi-Role Review Stack — expand 3-line mention into full structured section with 8+ universalized roles + Phase-0 customization slots | PENDING | P1.10d |
| P1.10f | Plan template: Engineering Discipline — Zero Code Loss Protocol, Modular File Design Table, Monolith Guardrails, Merge-Conflict Prevention | PENDING | P1.10a |
| P1.10g | Plan template: Tracking Infrastructure — Request Compilation Table, Ledger Column Descriptions + Integrity Rules, REQ→Phase→Test Traceability, Change Budget | PENDING | P1.10a |
| P1.10h | Plan template: Multi-Agent Orchestration — single-writer rule, role assignment, concurrent micro-phase limit, fallback-to-sequential, orchestration role table | PENDING | P1.10a |
| P1.10i | Plan template: Quality & Testing — Evidence Standard (structured), NFR Closure Control Checklist, Flaky Test Policy, Performance/NFR Budget Table | PENDING | P1.10a |
| P1.10j | Plan template: Risk + Handoff + Closure — Risk Registry, Handoff Package (IL-parity aware), Closure Certificate (~15 items), Success Criteria, Delivery Format | PENDING | P1.10a |
| P1.10k | Plan template: Gate Infrastructure — Domain Discovery Table (gate applicability matrix), Gate Automation Status Table, Feature/Surface Impact Declaration (universalized), Exception Protocol | PENDING | P1.10a |
| P1.10l | Plan template: DoR + DoD — Definition of Ready (~17 universalized items) + Definition of Done (~17 universalized items) | PENDING | P1.10a |
| P1.10m | Plan template: Session Memory + Cache — Agent Post-Session Memory Checkpoint, Build Artifact/Cache Freshness Rule (universalized from project-specific cache rules) | PENDING | P1.10a |
| P1.11 | Update `copilot-instructions.md` + `global-agent.instructions.md` — Required Workflow step for domain skill loading | COMPLETED | P1.9 |
| P1.12 | Smoke test: simulate new project init → verify 4-layer chain fires correctly | PENDING | P1.11, P1.10m |
| P1.13 | Locale parity verification — all files in both locales | PENDING | P1.12 |

### Phase 2: Tooling & Automation (v2.0-beta)
**Goal:** Move governance from donor markdown into a runnable single-command bootstrap plus CI-enforced execution.

| Step | Description | Status | Dependencies |
|---|---|---|---|
| P2.1 | Design CLI/distribution architecture: packaged artifact + one-command bootstrap + native wrappers + `agent-os check` + `agent-os generate-skills` + `agent-os gate-run` | PENDING | P1 |
| P2.2 | Implement `agent-os init` — single-command Phase 0 interview → scale classification → portfolio registry → scaffold governance files + auto-generate skills/plans | PENDING | P2.1 |
| P2.3 | Implement `agent-os check` — governance drift detection (cascade protocol verification) | PENDING | P2.1 |
| P2.4 | Implement `agent-os generate-skills` — project analysis → skill file generation | PENDING | P2.2 |
| P2.5 | Implement `agent-os gate-run` — local gate runner (IL checks, i18n parity, parity verification) | PENDING | P2.3 |
| P2.6 | GitHub Actions workflow: `agent-compliance-check.yml` — full gate pipeline on PR | PENDING | P2.5 |
| P2.7 | Pre-commit hook: governance drift + IL basic verification | PENDING | P2.5 |
| P2.8 | Gate automation matrix: define which gates are automatable vs manual | PENDING | P2.6 |
| P2.9 | Integration test: full CI pipeline on example repo | PENDING | P2.6 |

### Phase 3: IDE Integration & Distribution (v2.0-rc)
**Goal:** Make governance visible and enforceable inside the IDE.

| Step | Description | Status | Dependencies |
|---|---|---|---|
| P3.1 | VS Code Extension: design — sidebar panel showing active gates, plan status, skill coverage | PENDING | P2 |
| P3.2 | VS Code Extension: implement — instruction auto-loader + gate status viewer + plan navigator | PENDING | P3.1 |
| P3.3 | VS Code Extension: publish to VS Code Marketplace | PENDING | P3.2 |
| P3.4 | GitHub App: design — auto-create gate checklist comment on PR open | PENDING | P2.6 |
| P3.5 | GitHub App: implement — PR gate enforcement + review request on FAIL | PENDING | P3.4 |
| P3.6 | GitHub App: publish to GitHub Marketplace | PENDING | P3.5 |
| P3.7 | npm package: `@agent-os/core` — governance files + CLI + gate runner | PENDING | P2.5 |
| P3.8 | npm package: `@agent-os/vscode` — extension package | PENDING | P3.3 |
| P3.9 | pip package: `agent-os` — Python CLI + gate runner | PENDING | P2.5 |
| P3.10 | Cargo crate (optional): `agent-os` for Rust ecosystem | PENDING | P2.5 |

### Phase 4: Documentation & Examples (v2.0-stable)
**Goal:** Make adoption frictionless.

| Step | Description | Status | Dependencies |
|---|---|---|---|
| P4.1 | Documentation site: architecture (Docusaurus or Astro Starlight) | PENDING | P1 |
| P4.2 | Getting Started guide: 5-minute quickstart | PENDING | P4.1 |
| P4.3 | Architecture deep-dive: 4-layer explanation + cascade protocol | PENDING | P4.1 |
| P4.4 | API Reference: CLI commands, gate runner, skill generation | PENDING | P4.1 |
| P4.5 | Example: Web SaaS (React/Next.js + Stripe) | PENDING | P2.2 |
| P4.6 | Example: Mobile Game (Unity + C#) | PENDING | P2.2 |
| P4.7 | Example: Mobile App (React Native or Flutter) | PENDING | P2.2 |
| P4.8 | Example: REST API (FastAPI or Express) | PENDING | P2.2 |
| P4.9 | Example: Data Science Pipeline (Python + Jupyter) | PENDING | P2.2 |
| P4.10 | Each example includes: auto-generated skills, scoped instructions, customized gates | PENDING | P4.5..P4.9 |

### Phase 5: Productization & Monetization (v2.1+)
**Goal:** Turn framework into sustainable business.

| Step | Description | Status | Dependencies |
|---|---|---|---|
| P5.1 | Dual-license model: MIT (core) + Commercial (enterprise features) | PENDING | P4 |
| P5.2 | Define enterprise features: team governance dashboard, audit logs, custom gate plugins | PENDING | P5.1 |
| P5.3 | Hosted SaaS: gate analytics dashboard (team-level governance visibility) | PENDING | P3.5, P5.2 |
| P5.4 | Hosted SaaS: governance-as-a-service API (CI integration without self-hosting) | PENDING | P5.3 |
| P5.5 | Pricing model: Free (OSS core) / Pro ($X/dev/mo: dashboard + analytics) / Enterprise ($X/org/mo: custom gates + SSO + audit) | PENDING | P5.3 |
| P5.6 | Consulting offering: "Agent Governance Setup" service package | PENDING | P4 |
| P5.7 | Partner integrations: Cursor, Windsurf, JetBrains AI, Amazon Q | PENDING | P3 |

---

## 6) Task Tracking Ledger

| Phase | Step | Description | Status | Parent | Agent | Start | Completion | Parity | Notes |
|---|---|---|---|---|---|---|---|---|---|
| P0 | P0.0 | Lock product identity: consultation-first governance compiler | IN_PROGRESS | — | main | 2026-04-15 | — | — | User selected non-coder-first + single-command bootstrap direction; root README now presents the repo as an honest source-package alpha with explicit current-state vs roadmap boundaries |
| P0 | P0.0a | User-protection doctrine: agent owns technical choices when user cannot answer | PENDING | P0.0 | main | — | — | — | CRITICAL |
| P0 | P0.0b | Single-command bootstrap contract (`agent-os init` + native wrappers) | PENDING | P0.0 | main | — | — | — | CRITICAL |
| P0 | P0.0c | Scale classification + anti-shortcut doctrine | PENDING | P0.0 | main | — | — | — | CRITICAL |
| P0 | P0.0d | Distribution topology: source repo → packaged artifact → installed command → target repo | PENDING | P0.0 | main | — | — | — | CRITICAL |
| P0 | P0.0e | Portfolio Genesis Plan + living registry doctrine | PENDING | P0.0 | main | — | — | — | CRITICAL |
| P0 | P0.0f | Discovery/new-demand plan-birth protocol + implementation lock | PENDING | P0.0 | main | — | — | — | CRITICAL |
| P0 | P0.0g | Agent ecosystem freshness doctrine | COMPLETED | P0.0 | main | 2026-04-15 | 2026-04-15 | EN↔TR | Added global protocol requiring current ecosystem scan and adaptive agent-file generation before native files are emitted |
| P0 | P0.1 | Remove "Opradox" from session-bootstrap (en+tr) | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | EN↔TR | Replaced donor brand with governance-grade wording in both locale workflows |
| P0 | P0.2 | Remove "Antigravity" from rules files (en+tr) | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | EN↔TR | Replaced platform-specific brand with agent-ecosystem wording |
| P0 | P0.3 | Fix stale file refs in Cursor rules (en+tr) | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | EN↔TR | Cursor rules now point to `AGENT_OS_RULES.md` and `AGENT_OS_PLAN_TEMPLATE.md` |
| P0 | P0.4 | Fix CI workflow filename | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | — | Workflow now validates packaged locale-pack core files instead of nonexistent root files |
| P0 | P0.5 | Fix broken devam.md reference in TR rules | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | — | Added `tr/.agent/workflows/devam.md` as the TR resume workflow |
| P0 | P0.6 | Internationalize `init-agent-os.sh` | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | — | Default locale is now EN when available; locale packs are auto-detected and prompts are bilingual |
| P0 | P0.7 | Cross-platform installer (ps1/py) | COMPLETED | P0.6 | main | 2026-04-15 | 2026-04-15 | — | Added `init-agent-os.ps1`; validated bootstrap by installing the EN locale pack into a probe directory |
| P0 | P0.8 | Create EN SLASH_COMMANDS + docs restructure | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | — | Added localized slash-command docs and locale-index stubs in the root docs folder |
| P0 | P0.9 | Rename Silicon Valley roles | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | EN↔TR | Replaced culturally specific role names with neutral review roles in both donor rule files |
| P0 | P0.10 | Normalize GitHub refs → (e.g., GitHub/GitLab/Bitbucket) | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | ALL | Normalized repo-sync wording in donor rules, plan template, and adapter contracts |
| P0 | P0.11 | Add monorepo governance section | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | EN↔TR | Added monorepo and multi-package governance rules to donor files in both locales |
| P0 | P0.12 | Populate root adapter stubs | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | — | Added redirect stubs under root `.codex/` and `.agent/` so the package no longer exposes misleading empty surfaces |
| P0 | P0.13 | Normalize self-referential quality wording | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | EN↔TR | Replaced self-referential quality language with enterprise-grade wording across donor rule and adapter surfaces |
| P0 | P0.14 | Replace informal rapid-prototyping slang in formal contexts | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | EN↔TR | Replaced formal-surface `vibecoder` wording with clearer builder/prototyper terminology across donor and workflow files |
| P0 | P0.16 | Fix VERSIONING locale-lead bias note | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | — | Replaced locale hierarchy wording with explicit structural-parity requirement in `VERSIONING.md` |
| P0 | P0.17 | Expand Phase-0 platform list | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | EN↔TR | Added CLI, library/SDK, ML pipeline, IaC/DevOps, firmware, and smart-contract targets to donor/workflow startup questions |
| P0 | P0.18 | Normalize game engine examples | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | EN↔TR | Replaced narrow engine examples with `Unity/Unreal/Godot` wording in startup and Aider surfaces |
| P0 | P0.19 | Normalize package-manager example | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | TR | Replaced the donor README sync example with ecosystem-agnostic package-manager/runtime wording |
| P0 | P0.20 | Create contributing guide | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | — | Added root `CONTRIBUTING.md` documenting locale-pack, adapter, and example-skeleton contribution rules |
| P0 | P0.22 | Add minimal CLI example skeleton | COMPLETED | — | main | 2026-04-15 | 2026-04-15 | — | Added `examples/minimal-cli/` with README, AGENTS, root template placeholder, and initial bootstrap plan placeholder |
| P0 | P0.23 | Locale parity verification (all P0 changes) | COMPLETED | P0.1..P0.22 | main | 2026-04-15 | 2026-04-15 | FULL | Root locale files, `.agent` workflow/rule/skill surfaces, `.github` instructions, `.cursor` rules, and `docs/en|tr` onboarding/slash guides were re-listed and confirmed aligned |
| P1 | P1.1 | _ARCHITECTURE.md redesign | COMPLETED | P0 | main | 2026-04-15 | 2026-04-15 | — | Added root `.github/instructions/_ARCHITECTURE.md` defining the v2 hierarchy, four-layer activation chain, cascade protocol, drift checklist, and gate automation specification |
| P1 | P1.2 | Scoped instruction template generator | COMPLETED | P1.1 | main | 2026-04-15 | 2026-04-15 | — | Added root `.github/instructions/_SCOPED_INSTRUCTION_GENERATOR.md` plus `_SCOPED_INSTRUCTION_REGISTRY.json` to define domain IDs, output filenames, `applyTo` globs, template sections, and downstream skill/agent hooks |
| P1 | P1.3 | Skill template library + auto-gen protocol | COMPLETED | P1.1 | main | 2026-04-15 | 2026-04-15 | — | Added root `.agent/skills/_SKILL_TEMPLATE_LIBRARY.md`, `_SKILL_TEMPLATE_REGISTRY.json`, and domain templates under `.agent/skills/templates/` aligned to the instruction registry |
| P1 | P1.4 | Agent role template system | COMPLETED | P1.2,P1.3 | main | 2026-04-15 | 2026-04-15 | — | Added root `.github/agents/_AGENT_ROLE_TEMPLATE_SYSTEM.md`, `_AGENT_ROLE_REGISTRY.json`, and nine base role templates under `.github/agents/templates/` aligned to the instruction and skill registries |
| P1 | P1.4a | Adaptive agent-file generation protocol | COMPLETED | P1.3,P1.4 | main | 2026-04-15 | 2026-04-15 | — | Added root `.github/agents/_ADAPTIVE_AGENT_FILE_GENERATION.md` and extended `_AGENT_ROLE_REGISTRY.json` with adaptive synthesis rules, activation signals, and freshness snapshot metadata |
| P1 | P1.5 | Prompt template system | COMPLETED | P1.2 | main | 2026-04-15 | 2026-04-15 | — | Added root `.github/prompts/_PROMPT_TEMPLATE_SYSTEM.md`, `_PROMPT_TEMPLATE_REGISTRY.json`, and five base templates under `.github/prompts/templates/` aligned to the role and skill registries |
| P1 | P1.6 | Wire 4-layer auto-activation chain | COMPLETED | P1.2..P1.5 | main | 2026-04-15 | 2026-04-15 | — | Added root `.agent/workflows/_WORKFLOW_DOMAIN_ROUTING.json`, canonical root `session-bootstrap.md` and `continue.md`, and updated root package docs to route instruction domains into skills, roles, prompts, and workflow entry points |
| P1 | P1.7 | Update AGENTS.md (en+tr) | COMPLETED | P1.6 | main | 2026-04-15 | 2026-04-15 | EN↔TR | Added the Phase-1 auto-activation chain, domain skill-routing table, auto-generation notes, and cascade-sync rules to `en/AGENTS.md` and `tr/AGENTS.md` |
| P1 | P1.8 | Update AGENT_OS_RULES.md (en+tr) | COMPLETED | P1.6 | main | 2026-04-15 | 2026-04-15 | EN↔TR | Added the root-first Phase-1 auto-activation architecture, shared registry load order, skill auto-generation routing, and routing cascade protocol to `en/AGENT_OS_RULES.md` and `tr/AGENT_OS_RULES.md` |
| P1 | P1.9 | Update all adapter files | COMPLETED | P1.7 | main | 2026-04-15 | 2026-04-15 | EN↔TR | Updated the actual adapter surfaces present in the package: root `.codex/AGENTS.md`, locale Copilot instructions, locale global instruction files, locale agent-rule files, and locale Cursor rules to reuse the shared routing registries |
| P1 | P1.10a | IL Expansion: IL-09..IL-12 + GFL-01 | COMPLETED | P1.8 | main | 2026-04-16 | 2026-04-16 | EN↔TR | Extended both locale `AGENT_OS_PLAN_TEMPLATE.md` files with IL-09..IL-12 + GFL-01, corrected stale IL references (`IL-08/13` -> `IL-07/GFL-01`), fixed the TR Section-6 ledger reference, and widened the Integrity-Lock gate wording to the new lock set |
| P1 | P1.10b | Atomic Update Protocol + Archive Cutover | COMPLETED | P1.10a | main | 2026-04-16 | 2026-04-16 | EN↔TR | Added a new `0.2` protocol block to both locale `AGENT_OS_PLAN_TEMPLATE.md` files requiring single-pass cross-section sync, explicit `N/A` handling, atomic `DONE` closure, and same-operation move from `plans/` to `plans/completed/` |
| P1 | P1.10c | Plan Lifecycle: boot → portfolio genesis → use → close protocols | PENDING | P1.10a | main | — | — | EN↔TR | New Plan, Portfolio Registry, Session Start, Usage Guide, Priority Queue |
| P1 | P1.10d | Non-Negotiable Protocols + MODE Discipline | PENDING | P1.10a | main | — | — | EN↔TR | ~25-30 universalized core items |
| P1 | P1.10e | Multi-Role Review Stack (full 8+ roles) | PENDING | P1.10d | main | — | — | EN↔TR | Expand from 3-line mention |
| P1 | P1.10f | Engineering: Zero Code Loss, Modular File Design, Monolith Guardrails, Merge-Conflict | PENDING | P1.10a | main | — | — | EN↔TR | |
| P1 | P1.10g | Tracking: Request Compilation, Ledger Column Desc, REQ→Test Traceability, Change Budget | PENDING | P1.10a | main | — | — | EN↔TR | |
| P1 | P1.10h | Multi-Agent Orchestration Protocol | PENDING | P1.10a | main | — | — | EN↔TR | Single-writer, role table, fallback |
| P1 | P1.10i | Quality: Evidence Standard, NFR Checklist, Flaky Test Policy, Perf/NFR Budget | PENDING | P1.10a | main | — | — | EN↔TR | |
| P1 | P1.10j | Closure: Risk Registry, Handoff Package, Closure Certificate, Success Criteria, Delivery Format | PENDING | P1.10a | main | — | — | EN↔TR | |
| P1 | P1.10k | Gate Infra: Domain Discovery, Gate Automation Status, Impact Declaration, Exception Protocol | PENDING | P1.10a | main | — | — | EN↔TR | |
| P1 | P1.10l | DoR (~17 items) + DoD (~17 items) | PENDING | P1.10a | main | — | — | EN↔TR | Universalized from OPRADOX |
| P1 | P1.10m | Session Memory + Build Artifact/Cache Freshness | PENDING | P1.10a | main | — | — | EN↔TR | |
| P1 | P1.11 | Update copilot/instruction files | COMPLETED | P1.9 | main | 2026-04-15 | 2026-04-15 | EN↔TR | Locale `copilot-instructions.md` and `global-agent.instructions.md` surfaces now load the shared routing chain and require domain -> skill -> role -> prompt resolution before implementation |
| P1 | P1.12 | Smoke test: 4-layer chain | PENDING | P1.11,P1.10m | main | — | — | — | |
| P1 | P1.13 | Locale parity final check | PENDING | P1.12 | main | — | — | Locale↔Locale | |
| P2 | P2.1 | CLI/distribution architecture design (single-command bootstrap first) | PENDING | P1 | main | — | — | — | Source repo to packaged artifact to installed command topology |
| P2 | P2.2 | `agent-os init` implementation: interview → scale classification → portfolio registry → scaffold | PENDING | P2.1 | main | — | — | — | Includes plan-generation lock before implementation |
| P2 | P2.3 | `agent-os check` implementation | PENDING | P2.1 | main | — | — | — | |
| P2 | P2.4 | `agent-os generate-skills` implementation | PENDING | P2.2 | main | — | — | — | |
| P2 | P2.5 | `agent-os gate-run` implementation | PENDING | P2.3 | main | — | — | — | |
| P2 | P2.6 | GitHub Actions CI pipeline | PENDING | P2.5 | main | — | — | — | |
| P2 | P2.7 | Pre-commit hook | PENDING | P2.5 | main | — | — | — | |
| P2 | P2.8 | Gate automation matrix | PENDING | P2.6 | main | — | — | — | |
| P2 | P2.9 | CI integration test | PENDING | P2.6 | main | — | — | — | |
| P3 | P3.1 | VS Code Extension design | PENDING | P2 | main | — | — | — | |
| P3 | P3.2 | VS Code Extension implement | PENDING | P3.1 | main | — | — | — | |
| P3 | P3.3 | VS Code Marketplace publish | PENDING | P3.2 | main | — | — | — | |
| P3 | P3.4 | GitHub App design | PENDING | P2.6 | main | — | — | — | |
| P3.5 | P3.5 | GitHub App implement | PENDING | P3.4 | main | — | — | — | |
| P3 | P3.6 | GitHub App Marketplace publish | PENDING | P3.5 | main | — | — | — | |
| P3 | P3.7 | npm `@agent-os/core` | PENDING | P2.5 | main | — | — | — | |
| P3 | P3.8 | npm `@agent-os/vscode` | PENDING | P3.3 | main | — | — | — | |
| P3 | P3.9 | pip `agent-os` | PENDING | P2.5 | main | — | — | — | |
| P4 | P4.1..P4.10 | Docs + 5 example repos | PENDING | P1,P2 | main | — | — | — | |
| P5 | P5.1..P5.7 | Productization + SaaS | PENDING | P3,P4 | main | — | — | — | |

---

## 7) Modular File Design Table

### Phase 1 — New/Modified Files

| File | Action | Purpose |
|---|---|---|
| `.github/instructions/_ARCHITECTURE.md` | CREATE | Canonical root architecture anchor for the four-layer chain, cascade protocol, drift checklist, and automation spec |
| `.github/instructions/_SCOPED_INSTRUCTION_GENERATOR.md` | CREATE | Canonical generator contract for scoped instruction files |
| `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json` | CREATE | Machine-readable domain registry mapping instruction domains to skill and role IDs |
| `.agent/skills/_SKILL_TEMPLATE_LIBRARY.md` | CREATE | Canonical root skill-template library and generation protocol |
| `.agent/skills/_SKILL_TEMPLATE_REGISTRY.json` | CREATE | Machine-readable registry for root skill templates |
| `.agent/skills/templates/*/SKILL.md` | CREATE | Base domain skill templates consumed by later project-specific generators |
| `.github/agents/_AGENT_ROLE_TEMPLATE_SYSTEM.md` | CREATE | Canonical root agent-role template system for role routing and mandatory reading rules |
| `.github/agents/_AGENT_ROLE_REGISTRY.json` | CREATE | Machine-readable registry mapping role IDs to domains and primary skills |
| `.github/agents/_ADAPTIVE_AGENT_FILE_GENERATION.md` | CREATE | Canonical adaptive role-generation protocol for ecosystem scan, extra role synthesis, and freshness capture |
| `.github/agents/_AGENT_FILE_FRESHNESS_SNAPSHOT.json` | GENERATE later | Recorded local ecosystem basis used when agent files are generated in a target repo |
| `.github/agents/templates/*.agent.md` | CREATE | Base role templates aligned to the instruction and skill registries |
| `.github/prompts/_PROMPT_TEMPLATE_SYSTEM.md` | CREATE | Canonical root prompt-template system for reusable workflow prompts |
| `.github/prompts/_PROMPT_TEMPLATE_REGISTRY.json` | CREATE | Machine-readable registry mapping prompt IDs to required roles and skills |
| `.github/prompts/templates/*.prompt.md` | CREATE | Base prompt templates for gate check, deploy, plan closure, new feature, and skill generation workflows |
| `.agent/workflows/_WORKFLOW_DOMAIN_ROUTING.json` | CREATE | Machine-readable bridge from instruction domains to skills, roles, prompts, and workflow entry points |
| `.agent/workflows/session-bootstrap.md` | CREATE | Canonical root bootstrap workflow entry that loads architecture and routing registries |
| `.agent/workflows/continue.md` | CREATE | Canonical root resume workflow entry that re-selects routed domains, roles, and prompts |
| `.agent/workflows/README.md` | MODIFY | Root workflow index now describes the canonical routing layer instead of a redirect-only stub |
| `.agent/README.md` | MODIFY | Root agent index now reflects canonical template and routing responsibilities |
| `en/AGENTS.md`, `tr/AGENTS.md` | MODIFY | Add the Phase-1 auto-activation chain, skill routing table, auto-generation protocol, and cascade-sync rules to the locale donor spines |
| `en/AGENT_OS_RULES.md`, `tr/AGENT_OS_RULES.md` | MODIFY | Add the Phase-1 auto-activation architecture, registry load order, skill auto-generation routing, and cascade protocol to the locale donor rules |
| `AGENT_OS_PLAN_TEMPLATE.md` | MODIFY | Later Phase 1 wiring: add skill discovery, domain discovery, and automation-aware planning |
| `.codex/AGENTS.md` | MODIFY | Root Codex surface now advertises the shared Phase-1 registry chain instead of a redirect-only stub |
| `en/.github/copilot-instructions.md`, `tr/.github/copilot-instructions.md` | MODIFY | Add shared registry load order and explicit domain -> skill -> role -> prompt routing discipline for Copilot surfaces |
| `en/.github/instructions/global-agent.instructions.md`, `tr/.github/instructions/global-agent.instructions.md` | MODIFY | Require the shared registry chain before implementation routing and forbid local routing drift |
| `en/.agent/rules/global-governance.md`, `tr/.agent/rules/global-governance.md` | MODIFY | Bind locale agent-rule surfaces to the shared registry chain before implementation |
| `en/.cursor/rules/global-governance.mdc`, `tr/.cursor/rules/global-governance.mdc` | MODIFY | Bind Cursor-native fast-edit flows to the shared registry chain and routing discipline |
| `.github/instructions/_ARCHITECTURE.md` | MODIFY | Extend the architecture anchor with workflow routing registry ownership and cascade obligations |
| `README.md` | MODIFY | Reflect the new root workflow entry and registry-based auto-activation chain |
| locale packs and adapters | MODIFY later | Mirror and adapt root systems into packaged locale surfaces after the root architecture stabilizes |

### Phase 2 — CLI & Automation

| File | Action | Purpose |
|---|---|---|
| `cli/package.json` | CREATE | CLI package config |
| `cli/src/index.ts` | CREATE | CLI entry point |
| `cli/src/commands/init.ts` | CREATE | `agent-os init` — Phase 0 + scaffold |
| `cli/src/commands/check.ts` | CREATE | `agent-os check` — drift detection |
| `cli/src/commands/generate-skills.ts` | CREATE | `agent-os generate-skills` — project analysis → skills |
| `cli/src/commands/gate-run.ts` | CREATE | `agent-os gate-run` — local gate runner |
| `cli/src/analyzers/project-scanner.ts` | CREATE | Detect project type, stack, domains |
| `cli/src/generators/instruction-generator.ts` | CREATE | Generate scoped .instructions.md files |
| `cli/src/generators/skill-generator.ts` | CREATE | Generate SKILL.md files from templates |
| `cli/src/generators/agent-generator.ts` | CREATE | Generate .agent.md files from templates |
| `cli/src/gates/il-checker.ts` | CREATE | IL-01..IL-12 automated verification |
| `cli/src/gates/drift-checker.ts` | CREATE | Cross-file governance drift detection |
| `cli/src/gates/parity-checker.ts` | CREATE | Locale parity (en↔tr or custom) verification |
| `.github/workflows/agent-compliance-check.yml` | MODIFY | Full CI gate pipeline |
| `.husky/pre-commit` | CREATE | Pre-commit governance check |

### Phase 3 — IDE & Distribution

| File | Action | Purpose |
|---|---|---|
| `extensions/vscode/package.json` | CREATE | VS Code extension config |
| `extensions/vscode/src/extension.ts` | CREATE | Extension entry + sidebar provider |
| `extensions/vscode/src/panels/gatePanel.ts` | CREATE | Gate status sidebar |
| `extensions/vscode/src/panels/planPanel.ts` | CREATE | Active plan navigator |
| `apps/github-app/` | CREATE | GitHub App for PR gate enforcement |
| `packages/core/` | CREATE | `@agent-os/core` npm package |
| `packages/python/` | CREATE | `agent-os` pip package |

---

## 8) Skill Auto-Generation Protocol (Key Innovation)

This is the centerpiece of v2.0. The agent does NOT rely on static skill files. Instead:

### 8.1) Project Analysis Phase

When `agent-os init` or an agent session starts in a new project:

1. **Detect project type**: Scan `package.json`, `requirements.txt`, `Cargo.toml`, `build.gradle`, `*.csproj`, `Makefile`, etc.
2. **Detect domains**: Map directory structure to domain categories:
   - `src/components/`, `pages/`, `views/` → Frontend domain
   - `src/api/`, `routes/`, `controllers/` → Backend/API domain
   - `src/models/`, `migrations/` → Data domain
   - `scripts/`, `deploy/`, `infra/` → Deploy/Ops domain
   - `tests/`, `__tests__/`, `spec/` → Testing domain
   - `locales/`, `i18n/`, `translations/` → i18n domain
3. **Detect stack**: Framework, language, build tool, test runner
4. **Detect existing governance**: Any `.instructions.md`, `AGENTS.md`, skill files already present?

### 8.2) Generation Phase

Based on analysis, generate:

| Detected Domain | Generated Skill | Generated Instruction | Generated Agent |
|---|---|---|---|
| Frontend (React/Vue/Vanilla) | `frontend/SKILL.md` — component architecture, state management, routing, styling contracts | `frontend.instructions.md` — UI/UX standards, i18n, responsive, a11y | `ui-developer.agent.md` |
| Backend (FastAPI/Express/Rails) | `backend/SKILL.md` — API contracts, auth, validation, error handling | `backend.instructions.md` — security, modularity, migration rules | `api-developer.agent.md` |
| Data (Pandas/Spark/SQL) | `data/SKILL.md` — pipeline contracts, schema validation, quality gates | `data.instructions.md` — reproducibility, versioning, lineage | `data-engineer.agent.md` |
| Game (Unity/Unreal/Godot) | `game/SKILL.md` — entity system, physics, save/load, performance | `game.instructions.md` — frame budget, memory, input | `game-developer.agent.md` |
| Mobile (React Native/Flutter/Swift) | `mobile/SKILL.md` — platform API, lifecycle, permissions, offline | `mobile.instructions.md` — responsive, touch, navigation | `mobile-developer.agent.md` |
| Deploy (Docker/K8s/Serverless) | `deploy/SKILL.md` — pipeline topology, rollback, health checks | `deploy.instructions.md` — parity, cache, sync lock | `deploy-operator.agent.md` |
| Always | `qa-testing/SKILL.md` — test topology, gate matrix | `testing.instructions.md` — selftest, related tests | `qa-tester.agent.md` |
| Always | `plan-lifecycle/SKILL.md` — IL locks, closure, archive | `plans.instructions.md` — plan discipline | `plan-reviewer.agent.md` |

### 8.3) Customization Rules

- Generated files include `{{PLACEHOLDER}}` sections for project-specific details
- Agent fills placeholders after Phase 0 interview
- Existing governance files are NEVER overwritten — only hardened/extended
- User can override any generated content
- Re-running `agent-os generate-skills` updates without destroying customizations (additive-only)

### 8.4) Portfolio Genesis and Plan-Generation Lock

After Phase 0 and before code implementation, the system must generate planning infrastructure in this order:

1. Generate/harden the target repo's global template and root governance.
2. Create a **Portfolio Genesis Plan** that acts as the living project-plan registry.
3. Write the predicted plan inventory with at least these fields:
  - plan ID
  - plan filename
  - objective/scope
  - parent/child relation
  - dependency predecessors
  - interaction surfaces
  - priority wave
  - generation status (`NOT_CREATED`, `DRAFTED`, `READY`)
  - execution status (`LOCKED`, `PLANNING`, `IN_PROGRESS`, `DONE`, `BLOCKED`)
4. Generate all forecasted execution plan files before any execution plan is allowed to begin implementation.
5. If the portfolio is too large to fully author in one pass, the agent must continue producing plan files in planning-only sessions or waves. Code implementation remains blocked until the registry shows full plan-generation coverage for the current forecast.
6. Execution ordering is driven by dependency and risk edges recorded in the registry, not by the order of user chat messages.
7. New findings or new user demands that form a distinct workstream must first update the registry and spawn a new plan. Directly jumping into implementation without a plan is prohibited.
8. The registry itself is a living artifact and remains open until every tracked plan is closed or explicitly retired.

---

## 9) Gate Architecture

### 9.1) Universal Gates (always active)

| Gate | Automatable | Tool |
|---|---|---|
| Smoke Gate | ✅ | `agent-os gate-run smoke` |
| Selftest Gate | ✅ | `agent-os gate-run selftest` |
| Related-Tests Gate | ✅ | `agent-os gate-run related` |
| Parity Gate | ✅ | `agent-os gate-run parity` |
| Integrity-Lock Gate (IL-01..IL-12) | ✅ | `agent-os gate-run il-check` |
| Dependency-Reproducibility Gate | ✅ | `agent-os gate-run deps` |
| Governance-Drift Gate | ✅ | `agent-os gate-run drift` |
| Release/NFR Gate | Manual | Checklist |

### 9.2) Conditional Gates (activated by Phase 0 decisions)

| Gate | Activated When | Tool |
|---|---|---|
| I18N-Completeness Gate | Project is multilingual | `agent-os gate-run i18n` |
| No-UI-Regression Gate | Project has UI | Manual + screenshot |
| Responsive/Mobile Gate | Platform includes mobile | Manual |
| Dark/Light Mode Gate | Multi-theme enabled | Manual |
| Browser-Cache Gate | PWA/web deploy | `agent-os gate-run cache` |
| Triple-Sync Gate | Deploy/push requested | `agent-os gate-run sync` |
| Billing Continuity Gate | Auth/billing enabled | Manual |
| Performance/Memory Gate | Game/real-time | Manual + profiler |

### 9.3) Project-Specific Gates (auto-generated)

Agent creates `[PROJECT]` gates during Phase 0 based on project type. Examples:
- `[GAME] Frame Budget Gate` — FPS never drops below target
- `[MEDICAL] HIPAA Compliance Gate` — data handling audit
- `[FINTECH] Transaction Integrity Gate` — double-spend prevention

---

## 10) Risks

| Risk ID | Description | Impact | Mitigation |
|---|---|---|---|
| RISK-01 | 4-layer architecture too complex for simple projects | User abandonment | Provide scale-classified modes. `--minimal` is allowed only if the project is genuinely small/simple after the interview; it is never the default |
| RISK-02 | Skill auto-generation produces incorrect domain mapping | Wrong contracts enforced | Always require user confirmation of generated skills |
| RISK-03 | CLI tool maintenance burden across multiple ecosystems | Stale packages | Start npm-first, add pip/cargo only when demand proves |
| RISK-04 | VS Code extension review/approval delays | Slow distribution | Publish as sideload-first, marketplace second |
| RISK-05 | Over-engineering governance for prototyping/MVP users | Friction | `--prototype` relaxations require explicit architecture-risk disclosure and are forbidden for medium/large projects |
| RISK-06 | Locale parity across growing file count | Drift | Automated parity check in CI |
| RISK-07 | Commercial model deters open-source adoption | Low adoption → no revenue | Core always MIT, enterprise features clearly separated |
| RISK-08 | Product remains perceived as a markdown-only starter kit | Low trust from target users | Make single-command bootstrap the primary entry point and keep donor markdown as source, not the only runtime surface |
| RISK-09 | Non-technical users are forced into technical architecture decisions | Poor choices, abandonment, fragile repos | Agent must translate technical questions into user-language goals and choose safest defaults when answers are unavailable |
| RISK-10 | Shortcut modes become an excuse for weak architecture on large projects | Long-term instability and expensive rewrites | Mandatory size classification blocks shortcut modes for medium/large projects and forces roadmap/child-plan orchestration |
| RISK-11 | User command has an unclear connection to this source repo | Git-clone confusion, version drift, broken bootstrap expectations | Package and publish versioned distribution artifacts; wrappers call the installed package, not the raw repo |
| RISK-12 | Large projects require hundreds of plans that exceed one-session context limits | Incomplete planning or premature coding | Use a living Portfolio Genesis Plan, generate execution plans in planning-only waves, and block implementation until forecasted plan coverage reaches 100 percent |
| RISK-13 | New discoveries and user demands bypass governance and enter code directly | Scope chaos, dependency collisions, hidden work | Discovery/new-demand work must update the plan registry first and create a dedicated plan before execution |
| RISK-14 | Agent-native files go stale against current platform conventions | Generated adapters become outdated or incomplete | Bootstrap agent scans the current locally available ecosystem snapshot, records freshness basis, and generates/adds files adaptively rather than copying a frozen set |
| RISK-15 | Legacy example surfaces can lag behind the current landing shape | Demo confusion and mixed naming conventions | Align older example placeholders like `minimal-saas` with `AGENT_OS_PLAN_TEMPLATE.md` before wider example rollout |

---

## 11) Gate Plan

| Gate | Status | Automation | Notes |
|---|---|---|---|
| Smoke Gate | NOT_RUN | Manual until P2.5 | |
| Integrity-Lock Gate | NOT_RUN | Manual until P2.5 | IL-01..IL-12 |
| Parity Gate (EN↔TR) | PASS | Manual until P2.5 | Root locale files plus `.agent/`, `.github/`, `.cursor/`, and `docs/en|tr` onboarding/slash surfaces were rechecked and aligned |
| Governance-Drift Gate | NOT_RUN | Manual until P2.3 | Cascade protocol |
| Selftest Gate | NOT_RUN | N/A (framework, not app) | |
| Release/NFR Gate | NOT_RUN | Manual | |

---

## 12) Evidence Standard

- File path + symbol/function + why it matters
- Diff summary (which lines changed)
- Test/gate logs
- Manual verification steps (if applicable)
- No "probably" or "should be fine" language

---

## 13) Handoff / Checkpoint Protocol

After each micro-phase:
- Update this plan atomically (header + phase + backlog + task table + gates + risks)
- If token budget low → write checkpoint with: last step, next step, file states, test status
- Never start a big step knowing tokens are insufficient

---

## 14) Output Format

1. Summary
2. Evidence / Findings
3. Risks
4. Actions (surgical)
5. Smoke test steps
6. Gate results (PASS/FAIL + evidence)
7. Score: Risk/Performance/Quality (0-10 + 1 sentence)

---

## 15) Universality Audit — Pre-Implementation Findings

This section documents all specificity issues found in existing repo files and in this plan itself.
All findings are categorized by severity. Phase 0 (new) addresses remediation before architecture work begins.

### 15.1) CRITICAL — Breaks Universality

| ID | File | Issue | Detail | Fix |
|---|---|---|---|---|
| C-01 | `en/.agent/workflows/session-bootstrap.md` | Donor project name leak: "Opradox" | Line references "Opradox-depth contract rules" — direct donor brand in universal framework | Replace with "governance-grade" or "Agent-OS-depth" |
| C-02 | `en/.agent/rules/global-governance.md`, `tr/.agent/rules/global-governance.md` | Brand leak: "Antigravity" | References "Antigravity-native behavior lock", "Antigravity rule surface", "Antigravity Role Modeli" — platform-specific brand in universal framework | Replace with "target agent ecosystem" or remove |
| C-03 | `en/.cursor/rules/global-governance.mdc`, `tr/.cursor/rules/global-governance.mdc` | Stale file references | References `GLOBAL_AGENT_OPERATING_RULES.md` and `GLOBAL_PLAN_TASK_TRACKING_TEMPLATE.md` which don't exist. TR version leaks raw repo-folder name as filename | Correct to `AGENT_OS_RULES.md` and `AGENT_OS_PLAN_TEMPLATE.md` |
| C-04 | `.github/workflows/agent-compliance-check.yml` | CI checks wrong filename | `if [ ! -f "GLOBAL_PLAN_TASK_TRACKING_TEMPLATE.md" ]` — file doesn't exist, CI always fails | Update to `AGENT_OS_PLAN_TEMPLATE.md` |
| C-05 | `tr/AGENT_OS_RULES.md` | Broken workflow reference | References `.agent/workflows/devam.md` but file doesn't exist in TR locale | Create `tr/.agent/workflows/devam.md` or align reference to `continue.md` |

### 15.2) HIGH — Limits Adoption

| ID | File | Issue | Detail | Fix |
|---|---|---|---|---|
| H-01 | `init-agent-os.sh` | Turkish-default bash-only installer | Defaults to `tr`, all prompts in Turkish, no Windows support | Default to `en`, translate prompts, add PowerShell/Python cross-platform alternative |
| H-02 | `docs/SLASH_COMMANDS.md` | Entirely Turkish, no EN version | Universal framework docs must be bilingual or EN-first | Create `docs/en/SLASH_COMMANDS.md`, move existing to `docs/tr/` |
| H-03 | `.github/workflows/agent-compliance-check.yml` | Hardcoded English i18n assumption | Scans only for hardcoded English strings; stub implementation (does nothing) | Make language-configurable, implement real scan |
| H-04 | `en/AGENT_OS_RULES.md` §5.1 | Culturally specific role names | "Silicon Valley Developer", "Silicon Valley Investor" — US tech-scene bias | Rename to neutral: "Software Architect", "Business Analyst" |
| H-05 | Multiple files | GitHub assumed as only remote platform | Some places drop `(e.g.)` and assume GitHub directly | Always use `(e.g., GitHub/GitLab/Bitbucket)` phrasing |
| H-06 | All files | No monorepo governance model | Framework assumes single-repo single-project model | Add monorepo section in `AGENT_OS_RULES.md` |
| H-07 | Root `.codex/AGENTS.md` | Empty root-level adapter files | Copying root structure gives empty governance | Populate with redirect/stub explaining locale selection |

### 15.3) MEDIUM — Could Be Better

| ID | File | Issue | Fix |
|---|---|---|---|
| M-01 | Multiple RULES files | "Universal OS" self-reference as quality benchmark | Replace with "enterprise-grade depth" |
| M-02 | Multiple files | "vibecoder" terminology may alienate enterprise clients | Replace with "developer" / "AI-assisted developer" in formal contexts; add definition if kept |
| M-03 | `.github/workflows/` | No non-GitHub CI/CD templates | Add generic `ci-check.sh` + GitLab CI stub |
| M-04 | `VERSIONING.md` | "Turkish donor may lead conceptually" | Replace with "All locale packs maintain structural parity" |
| M-05 | Adapter files | Missing Windsurf, JetBrains AI, Amazon Q adapters | Add CONTRIBUTING.md for new adapters; add major stubs |
| M-06 | Phase-0 questions | Missing non-web/game domains | Add CLI, Library/SDK, ML Pipeline, IaC/DevOps, Firmware, Smart Contract to platform list |
| M-07 | Plan template | `{{UNITY/UNREAL}}` as only game engine examples | Change to `GAME (e.g., Unity/Unreal/Godot)` |
| M-08 | Rules §5 item 28 | "npm to yarn" as only package manager example | Use ecosystem-agnostic phrasing |
| M-09 | Root `.agent/` dirs | Empty root-level skill/rules/workflow dirs | Add README stubs explaining locale selection |
| M-10 | `en/session-bootstrap.md` §4.3 | Turkish mode name in English file | `KOD-DEĞİŞİKLİĞİ` example → replace with `CODE-CHANGE` |

### 15.4) LOW — Minor Polish

| ID | File | Issue | Fix |
|---|---|---|---|
| L-01 | `CHANGELOG.md` | "Turkish" / "English" as literal terms | Use `"tr/ locale pack"` / `"en/ locale pack"` |
| L-02 | Root `.agent/skills/global-governance/` | Empty directory | Add README stub |
| L-03 | `examples/` | Only `minimal-saas` — no non-web example | Add `minimal-cli` or `minimal-game` skeleton |
| L-04 | `docs/` folder | Mixed-language files without locale separation | Move to `docs/en/` and `docs/tr/` subdirs |
| L-05 | `init-agent-os.sh` | Only supports `tr` and `en` hardcoded | Auto-detect available locale folders |
| L-06 | `LICENSING.md` | "premium example repo" undefined | Create premium content or remove tier distinction |

### 15.5) MISSING Items — Should Exist in Universal Framework

| Missing Item | Impact | Target Location |
|---|---|---|
| Monorepo governance model | HIGH | New section in `AGENT_OS_RULES.md` |
| Non-GitHub CI templates (GitLab, Bitbucket, Azure DevOps) | HIGH | `.gitlab-ci.yml`, `bitbucket-pipelines.yml` stubs |
| Cross-platform installer (PowerShell/Python) | HIGH | `init-agent-os.ps1` or `init-agent-os.py` |
| `CONTRIBUTING.md` — how to create new platform adapters | MEDIUM | Root `CONTRIBUTING.md` |
| Non-web example project (CLI, game, library) | MEDIUM | `examples/minimal-cli/` |
| Locale extensibility guide (how to add `es/`, `de/`, `ja/`) | MEDIUM | `docs/ADDING_LOCALES.md` |
| Agent platform comparison matrix | LOW | `docs/PLATFORM_MATRIX.md` |

### 15.6) Plan Self-Audit (This Document)

| ID | Section | Issue | Fix Applied |
|---|---|---|---|
| PS-01 | §3.3 Allowlist | `en/`, `tr/` hardcoded as folder names | Changed to "Locale packs" |
| PS-02 | §10 RISK-06 | "TR/EN locale parity" — hardcoded locale pair | Changed to "Locale parity" |
| PS-03 | P1.13 | "TR/EN parity verification" — hardcoded | Changed to "Locale parity verification" |
| PS-04 | §9.2 | I18N-Completeness Gate says "project is multilingual" — correct, already generic | No change needed |
| PS-05 | §8.2 | Generation table only lists 8 domains | Addressed below as new Phase 0 + expanded domain list |

---

## 16) Phase 0: Universality Remediation (NEW — Pre-Architecture)

**Goal:** Fix all CRITICAL and HIGH specificity issues BEFORE architecture work begins.
**Rationale:** Building 4-layer architecture on a foundation that leaks donor DNA undermines credibility.

| Step | Description | Status | Severity | Dependencies |
|---|---|---|---|---|
| P0.1 | Remove "Opradox" from `en/` + `tr/` session-bootstrap.md | COMPLETED | CRITICAL | — |
| P0.2 | Remove "Antigravity" from `en/` + `tr/` rules/global-governance.md | COMPLETED | CRITICAL | — |
| P0.3 | Fix stale file references in `en/` + `tr/` `.cursor/rules/global-governance.mdc` | COMPLETED | CRITICAL | — |
| P0.4 | Fix CI workflow filename/shape to validate packaged locale files | COMPLETED | CRITICAL | — |
| P0.5 | Fix broken `devam.md` reference in TR rules by creating workflow | COMPLETED | CRITICAL | — |
| P0.6 | Internationalize `init-agent-os.sh`: default EN, add locale auto-detect, bilingual prompts | COMPLETED | HIGH | — |
| P0.7 | Create cross-platform installer alternative (`init-agent-os.ps1` or `.py`) | COMPLETED | HIGH | P0.6 |
| P0.8 | Create `docs/en/SLASH_COMMANDS.md`, restructure docs by locale | COMPLETED | HIGH | — |
| P0.9 | Rename "Silicon Valley" roles to neutral names in `AGENT_OS_RULES.md` (en+tr) | COMPLETED | HIGH | — |
| P0.10 | Normalize GitHub references: always `(e.g., GitHub/GitLab/Bitbucket)` | COMPLETED | HIGH | — |
| P0.11 | Add monorepo governance section to `AGENT_OS_RULES.md` (en+tr) | COMPLETED | HIGH | — |
| P0.12 | Populate root-level adapter stubs (`.codex/`, `.agent/`) with redirect READMEs | COMPLETED | HIGH | — |
| P0.13 | Fix self-referential quality wording → `enterprise-grade depth` | COMPLETED | MEDIUM | — |
| P0.14 | Replace informal rapid-prototyping slang in formal contexts | COMPLETED | MEDIUM | — |
| P0.15 | Fix Turkish mode name leak in EN session-bootstrap.md (`KOD-DEĞİŞİKLİĞİ` → `CODE-CHANGE`) | COMPLETED | MEDIUM | — |
| P0.16 | Fix `VERSIONING.md` locale-lead bias note | COMPLETED | MEDIUM | — |
| P0.17 | Expand Phase-0 platform list: add CLI, Library/SDK, ML Pipeline, IaC/DevOps, Firmware, Smart Contract | COMPLETED | MEDIUM | — |
| P0.18 | Fix game engine examples → `e.g., Unity/Unreal/Godot` | COMPLETED | MEDIUM | — |
| P0.19 | Fix package-manager example to be ecosystem-agnostic | COMPLETED | MEDIUM | — |
| P0.20 | Create `CONTRIBUTING.md` — how to add new platform adapters + locale packs | COMPLETED | MEDIUM | — |
| P0.21 | Restructure `docs/` by locale (`docs/en/`, `docs/tr/`) | COMPLETED | LOW | P0.8 |
| P0.22 | Add non-web example skeleton (`examples/minimal-cli/`) | COMPLETED | LOW | — |
| P0.23 | Locale parity verification: all P0 changes applied to both locale packs | COMPLETED | CRITICAL | P0.1..P0.22 |

---

## 17) Plan Template Gap Analysis — OPRADOX Donor vs Target v0.1.0

**Methodology:** Line-by-line comparison of OPRADOX `GLOBAL_PLAN_TASK_TRACKING_TEMPLATE.md` (~1050 lines, 37 sections, 42 protocols) against target `AGENT_OS_PLAN_TEMPLATE.md` (~150 lines, 8 sections). All gaps identified, grouped by remediation work item, and added to Phase 1 as P1.10a..P1.10m.

### 17.1) Sections Already Present (with gaps)

| OPRADOX Section | Target Section | Coverage | Gap Description |
|---|---|---|---|
| §0 Doc Identity (IL-01..IL-12 + GFL-01) | §0 Doc Identity (IL-01..IL-08) | **Partial** | Missing IL-09 (Cross-Table Parity), IL-10 (Auto-Validation + Phase Transition), IL-11 (Status Rollback Prohibition), IL-12 (Cascading Discovered-Work Block), GFL-01 (Artifact Freshness Lock) |
| §7 Scope Lock (Allowlist/Denylist) | §3 Scope Lock | **Full** | — |
| §8 Selftest Topology | §4 Selftest Topology | **Full** | — |
| §10 Micro-Phase Backlog | §5 Backlog | **Partial** | Missing Request Compilation sub-table (§10.1) |
| §11 Task Tracking Ledger | §6 Ledger | **Partial** | Missing Column Descriptions (§11.1) + Integrity Rules (§11.2) |
| §16 Gate Plan (27 gates) | §7 Gates Matrix (~4 static + 2 dynamic) | **Partial** | Target has dynamic gate concept (good) but lacks Domain Discovery linkage and structured 27-gate taxonomy |
| §20 Token/Checkpoint | §8 Token/Handoff | **Partial** | Missing dual-format (in-doc + external), IL parity verification step |
| §5.1 Multi-Role Review Stack (8 roles) | §2 item 3 (3 lines) | **Minimal** | Target has 3-role mention; OPRADOX has full 8-role structured section with closure rules |
| §6 Zero Code Loss | §2 Zero-Leak (item 1) | **Partial** | "Additive-first" present but full protocol (archive, migration, fallback) missing |
| §4 MODE Discipline | §1 Consensus Variables | **Partial** | MODE concept referenced but full discipline rules (QA/Code-Change/Prompt-Gen) missing |

### 17.2) Sections Completely Missing from Target

| # | OPRADOX Section | Universal Relevance | Remediation Task | Notes |
|---|---|---|---|---|
| 1 | §0.2 Cross-Section Atomic Update + Archive Cutover | **CRITICAL** — prevents partial plan corruption | P1.10b | Every plan system needs atomic multi-section updates |
| 2 | §0.3 Triple-Sync Implementation Note | HIGH — detail for IL-08/TSL-01 | P1.10a | Target has IL-08 (TSL) but no implementation guidance |
| 3 | §0.4 Localhost Freshness Lock | MEDIUM — relevant for web/PWA projects | P1.10m | Universalize as "Build Artifact/Cache Freshness" |
| 4 | §1 New Plan Production Protocol | **CRITICAL** — how to instantiate from template | P1.10c | Without this, agents guess how to use the template |
| 5 | §2 New Agent/Session Startup Protocol | HIGH — agent boot sequence | P1.10c | Defines what agent reads/loads before first action |
| 5A | Portfolio Genesis / Living Plan Registry | **CRITICAL** — large projects need plan portfolio before implementation | P1.10c | Requires a living registry, dependency ordering, and plan-generation lock before coding |
| 6 | §3 Governance Stack Summary | MEDIUM — overview of governance layers | P1.10d | Quick-reference for agent orientation |
| 7 | §5 Non-Negotiable Protocols (~42 items) | **CRITICAL** — enforceable rules within plan context | P1.10d | ~25-30 items universalize; rest become project-conditional |
| 8 | §9.1 Modular File Design Table | HIGH — tracks new file creation decisions | P1.10f | Prevents ad-hoc file creation outside plan |
| 9 | §10.1 Request Compilation Table | HIGH — multi-request intake tracking | P1.10g | When user gives 5 requests, agent must track all |
| 10 | §11.1 Ledger Column Descriptions | MEDIUM — defines column semantics | P1.10g | Prevents misinterpretation of ledger columns |
| 11 | §11.2 Ledger Integrity Rules | HIGH — rules governing ledger updates | P1.10g | "Batch-update at session end = violation" etc. |
| 12 | §12 Multi-Agent Orchestration Protocol | **CRITICAL** — how agents coordinate | P1.10h | Single-writer rule, role table, concurrent limits |
| 13 | §13 Merge-Conflict Prevention | HIGH — prevents agent file conflicts | P1.10f | Essential when multiple agents or sessions touch same repo |
| 14 | §14 SW Cache / Build Artifact Rule | MEDIUM — varies by platform | P1.10m | Universalize: covers SW cache (web), build cache (native), artifact cache (CI) |
| 15 | §15 Evidence Standard | **CRITICAL** — what counts as proof | P1.10i | "File path + symbol + diff + test log + manual steps" |
| 16 | §17 NFR Closure Control (26 items) | HIGH — structured NFR checklist | P1.10i | Responsive, modularity, security, i18n, selftest, etc. |
| 17 | §18 Risk Registry | HIGH — structured risk tracking | P1.10j | Template for impact/mitigation/owner/status |
| 18 | §19 Handoff Package | HIGH — structured handoff with IL parity | P1.10j | What the next agent/session receives |
| 19 | §21 Priority Queue | MEDIUM — task ordering protocol | P1.10c | Dependency-first > risk-first > user-order |
| 20 | §22 Delivery Format | MEDIUM — standard output format | P1.10j | Summary → Evidence → Risks → Actions → Gates → Score |
| 21 | §23 Success Criteria | HIGH — measurable plan success metrics | P1.10j | How to know the plan achieved its goal |
| 22 | §24 Closure Certificate (~15 items) | **CRITICAL** — prevents premature plan closure | P1.10j | "All gates PASS, all EX closed, all discovered work done..." |
| 23 | §25 Plan Usage Guide | MEDIUM — template navigation | P1.10c | Quick-start for agents unfamiliar with template |
| 24 | §26 Definition of Ready (~17 items) | **CRITICAL** — prevents premature implementation start | P1.10l | "Plan exists, allowlist locked, gates defined..." |
| 25 | §27 Definition of Done (~17 items) | **CRITICAL** — prevents premature completion claims | P1.10l | "All gates PASS, no FAIL/NOT_RUN, archive moved..." |
| 26 | §28 Change Budget | HIGH — scope change tracking | P1.10g | Tracks scope additions/removals with justification |
| 27 | §29 Monolith Guardrails | HIGH — anti-monolith rules | P1.10f | "New feature = new file, max lines per file" etc. |
| 28 | §30 REQ→Phase→Test Traceability | HIGH — end-to-end request tracking | P1.10g | Matrix: REQ → Phase → Code change → Test → Result |
| 29 | §31 Flaky Test Policy | MEDIUM — test reliability | P1.10i | "2 consecutive PASS required, FLAKY tag, risk entry" |
| 30 | §32 Exception Protocol | HIGH — rule exception tracking | P1.10k | "EX-ID, violated rule, justification, closure action" |
| 31 | §33 Performance/NFR Budget | MEDIUM — performance metrics | P1.10i | Bundle size, load time, memory, API latency budgets |
| 32 | §34 Domain Discovery Table | **CRITICAL** — gate applicability per plan | P1.10k | "Which gates apply? Which N/A? Ad-hoc gates?" |
| 33 | §35 Surface Impact Declaration | HIGH — feature interaction analysis | P1.10k | Universalized: "which existing surfaces does this feature affect?" |
| 34 | §36 Gate Automation Status | HIGH — automation tracking per gate | P1.10k | "EXISTS/PLANNED/MANUAL per gate + script output" |
| 35 | §37 Agent Post-Session Memory | HIGH — knowledge retention | P1.10m | "Record concrete lesson per session to repo memory" |

### 17.3) Quantitative Summary

| Metric | Target v0.1.0 | OPRADOX Donor | Gap |
|---|---|---|---|
| Total sections | 8 | 37 | **+29** |
| Integrity Locks | 8 (IL-01..IL-08) | 13 (IL-01..IL-12 + GFL-01) | **+5** |
| Template lines (approx) | ~150 | ~1050 | **+900** |
| Gate taxonomy | 4 static + 2 dynamic | 27 structured (10 core + 17 domain) + ad-hoc | **+21+** |
| Non-negotiable protocols | 0 (in-plan) | 42 (25-30 universal) | **+25-30** |
| Multi-Role Review roles | 3 (brief mention) | 8 (full structured section) | **+5 roles** |
| DoR items | 0 | 17 | **+17** |
| DoD items | 0 | 17 | **+17** |
| Closure certificate items | 0 | 15 | **+15** |
| NFR checklist items | 0 | 26 | **+26** |
| Traceability matrices | 0 | 2 (REQ→Test + Domain Discovery) | **+2** |

### 17.4) Universalization Rules

When migrating sections from OPRADOX to the universal template:

1. **Remove project-specific gates**: Stats Deep-Audit, Widget Param-Consistency, Widget Edu-Guidance, Surface Continuity, New Card Continuity, Narrative Completeness, Billing Continuity, Admin Panel Impact, Browser-Cache, Localhost Freshness, Dist-Release Parity, Post-Deploy Parity, Deploy-Tooling → these become **conditional gates** activated by Phase-0 project analysis or **auto-generated gates** per §9.3
2. **Keep universal gates**: Smoke, Selftest, Related-Tests, Parity, Integrity-Lock, Dependency-Reproducibility, Governance-Drift, I18N-Completeness (conditional on multilingual), No-UI-Regression (conditional on UI), Triple-Sync (conditional on deploy), Release/NFR, Plan Archive Placement, Governance-Sync + Exception Protocol tracking
3. **Generalize terminology**: "SW Cache" → "Build Artifact/Cache Freshness", "dist_release mirror" → "Release Artifact Parity", "widget" → "component/module", "DOCX/APA export" → "Document/Report Surface"
4. **Keep placeholders for project customization**: Phase-0 fills project-specific details into `{{PLACEHOLDER}}` slots
5. **Multi-Role Review**: Keep all 8 roles as universal defaults; Phase-0 adds domain-specific roles (e.g., "HIPAA Compliance Officer" for medical, "Frame Budget Analyst" for game)
6. **Non-Negotiables**: Filter ~42 → ~25-30 universal items; project-specific items (Stats contracts, Excel scenarios, Billing/Membership locks) become generated non-negotiables from Phase-0 analysis

### 17.5) Remediation Work Item Summary

| Task ID | Title | Sections Covered | Estimated Template Lines |
|---|---|---|---|
| P1.10a | IL Expansion (IL-09..12 + GFL-01) | §0 enhancement | ~40 |
| P1.10b | Atomic Update + Archive Cutover | §0.2 equivalent | ~30 |
| P1.10c | Plan Lifecycle Protocols + Portfolio Genesis Registry | §1, §2, Portfolio Genesis, §25, §21 equivalents | ~100 |
| P1.10d | Non-Negotiables + MODE | §5, §4 equivalents | ~80 |
| P1.10e | Multi-Role Review Stack | §5.1 equivalent | ~40 |
| P1.10f | Engineering Discipline | §6, §9.1, §29, §13 equivalents | ~60 |
| P1.10g | Tracking Infrastructure | §10.1, §11.1, §11.2, §30, §28 equivalents | ~80 |
| P1.10h | Multi-Agent Orchestration | §12 equivalent | ~50 |
| P1.10i | Quality & Testing | §15, §17, §31, §33 equivalents | ~80 |
| P1.10j | Closure Block | §18, §19, §24, §23, §22 equivalents | ~80 |
| P1.10k | Gate Infrastructure | §34, §36, §35, §32 equivalents | ~80 |
| P1.10l | DoR + DoD | §26, §27 equivalents | ~60 |
| P1.10m | Session Memory + Cache | §37, §14, §0.4 equivalents | ~30 |
| **TOTAL** | | **35 missing sections covered** | **~770 lines** |

Post-enhancement target: ~920 lines, 37+ sections — full governance parity with OPRADOX donor, universalized for any platform/domain.
