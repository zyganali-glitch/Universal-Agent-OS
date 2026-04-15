# Agent Governance OS v2 Architecture

This document defines the canonical architecture for the v2 package and for the generated governance surfaces that the package produces in target repositories.

It is not an operator tutorial. Its job is to explain the structural hierarchy, change-cascade rules, drift checks, and gate automation expectations that later generators and adapters must follow.

## 1) Architectural Intent

The v2 package is a consultation-first governance compiler, not a markdown-only starter kit.

That means the package must support two layers of reality at the same time:

1. Source package reality: the reusable donor package maintained in this repository.
2. Generated target-repo reality: the repo-specific governance surfaces created after Phase 0 in a user's project.

The source package remains the constitutional source. The generated target repo is the operational runtime surface.

## 2) Canonical Hierarchy

### 2.1 Source Package Hierarchy

The package is organized in the following order of authority:

1. Locale donor files
   - `en/AGENT_OS_RULES.md`
   - `tr/AGENT_OS_RULES.md`
2. Locale `AGENTS.md`
3. Locale `AGENT_OS_PLAN_TEMPLATE.md`
4. Locale adapter surfaces
   - `.github/copilot-instructions.md`
   - `.github/instructions/*.instructions.md`
   - `.codex/AGENTS.md`
   - `.cursor/rules/*.mdc`
   - `.agent/workflows/*`
   - `.agent/rules/*`
   - agent-specific contracts like `AIDER.md`, `CLAUDE.md`, `GEMINI.md`
5. Bootstrap and packaging surfaces
   - `init-agent-os.sh`
   - `init-agent-os.ps1`
   - compliance workflow
   - examples
   - onboarding docs

Lower layers may enrich, route, or specialize behavior. They may not weaken the donor spine above them.

### 2.2 Generated Target-Repo Hierarchy

Once `agent-os init` or an equivalent bootstrap flow runs in a target repository, the generated governance stack follows this order:

1. Repo-root `AGENTS.md`
2. Repo-root `AGENT_OS_PLAN_TEMPLATE.md`
3. Active plans under `plans/`
4. Scoped instruction files under `.github/instructions/`
5. Domain skills under `.agent/skills/`
6. Agent role files under `.github/agents/`
7. Workflow prompts under `.agent/workflows/` and `.github/prompts/`

The active plan is the live execution source of truth. Generated lower layers must remain consistent with that plan and with the repo-root constitutional files.

## 3) Four-Layer Auto-Activation Model

The v2 runtime contract is the four-layer chain below.

| Layer | Trigger | Primary Surface | Responsibility |
|---|---|---|---|
| Platform-native auto-load | file scope / IDE trigger | `.github/instructions/*.instructions.md` | load domain rules with zero manual routing |
| Skill auto-read | instruction metadata / required reading | `.agent/skills/*/SKILL.md` | provide deep domain capability for the touched area |
| Agent role activation | agent selection or domain routing | `.github/agents/*.agent.md` | apply persona, ownership, and mandatory reading |
| Workflow routing | session bootstrap / resume | `.agent/workflows/*` + `.agent/workflows/_WORKFLOW_DOMAIN_ROUTING.json` | connect active plan, detected domain, required skills, role ownership, and workflow prompts |

Expected flow:

1. The operator or agent touches a file or starts a task.
2. Matching scoped instructions load first.
3. Instructions point at the required skill surfaces.
4. Agent role files define specialization and mandatory reading.
5. Workflow files and the workflow routing registry route the session through plan-aware execution.

## 4) Generation Pipeline

The generation pipeline for target repositories is:

1. Run Phase 0 interview.
2. Classify project type, scale, and domains.
3. Harden or generate the repo-root governance spine.
4. Generate the plan portfolio before implementation.
5. Generate scoped instructions for detected domains.
6. Generate domain skills.
7. Generate agent role files.
8. Generate prompt/workflow helpers and workflow-domain routing data.
9. Record the architecture snapshot that justified those outputs.

The architecture snapshot must capture at least:

- project type and platform family
- detected languages and build tools
- detected domain folders
- chosen gate families
- any freshness assumptions about the agent ecosystem

## 5) Cascade Protocol

Any architecture-affecting change must be propagated through the affected surfaces in the same request.

### 5.1 Change Trigger Matrix

| Trigger | Minimum Cascade |
|---|---|
| Donor rule change | locale donor file + matching locale adapters/workflows + plan template if contract changed |
| Plan-template contract change | donor file + locale plan templates + docs/examples that show landing shape |
| New instruction domain | `_ARCHITECTURE.md` + instruction template + skill template + agent role routing |
| Role/prompt/workflow routing change | `_ARCHITECTURE.md` + workflow routing registry + affected role or prompt registries + workflow entry files |
| New agent ecosystem support | compatibility logic + adapter surfaces + docs + contribution guidance |
| New bootstrap/package shape | installers + compliance workflow + onboarding docs + examples |
| New example type | example skeleton + onboarding/demo docs + contribution guidance |

### 5.2 Cascade Rules

1. Do not update a donor rule without checking whether adapters, workflows, or examples encode the old assumption.
2. Do not change package shape without updating installer and compliance surfaces.
3. Do not add a new domain abstraction without specifying where it loads in the four-layer chain.
4. Do not claim parity unless locale-pack structural checks were rerun after the change.

## 6) Drift Checklist

Before closing an architecture-affecting change, verify:

1. Is the donor spine still the highest authority?
2. Does every new surface have a clear owner in the hierarchy?
3. Did package shape changes update installers, CI, and examples?
4. Did locale-pack structural parity remain intact?
5. Did docs reflect the current operator flow rather than a legacy flow?
6. Did the active plan record the change and its evidence?
7. Did any new trigger require follow-on generator work in P1.2-P1.9?

## 7) Gate Automation Specification

Automation is phased.

### 7.1 Manual-First Until Tooling Exists

Until `agent-os gate-run` exists, the following checks are manual or script-light:

- locale parity checks
- governance drift checks
- landing-shape verification for examples
- installer/compliance sync checks

### 7.2 Intended Automated Gates

| Gate Family | Intended Command | Purpose |
|---|---|---|
| Integrity lock | `agent-os gate-run il-check` | validate plan-state discipline |
| Locale parity | `agent-os gate-run parity` | verify locale-pack structure and required surfaces |
| Governance drift | `agent-os gate-run drift` | detect changed contracts that did not cascade |
| Bootstrap/package shape | `agent-os gate-run package-shape` | validate installers, required files, and examples |

Automation should never hide missing evidence. A failed or unimplemented automated gate stays visible as a blocker.

## 8) Design Constraints

- No blind overwrite of existing target-repo governance.
- No network dependence merely to discover architecture freshness.
- No one-file collapse of the generated governance stack.
- No adapter may bypass the plan portfolio or single-writer discipline.

## 9) Relationship to Later Phase-1 Work

This file is the anchor for:

- P1.2 scoped instruction template generation
- P1.3 skill library and skill auto-generation
- P1.4 agent role template system
- P1.5 prompt template system
- P1.6 four-layer wiring
- P1.7-P1.9 cascade sync across donors and adapters

If one of those later tasks changes the hierarchy, loading order, or cascade rules, this file must be updated in the same request.