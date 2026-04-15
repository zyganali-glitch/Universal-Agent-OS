# Agent Role Template System

This file defines the canonical root agent-role template system for Agent Governance OS v2.

It translates domain and skill routing into reusable `.agent.md` role templates that later generators can specialize for a target repository.

## 1) Goal

Provide a stable role-template layer between:

- scoped instructions
- domain skills
- workflow routing

The role layer gives the generator an explicit place to declare ownership, mandatory reading, and role-specific constraints.

## 2) Required Inputs

The role generator must read:

1. `.github/instructions/_ARCHITECTURE.md`
2. `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json`
3. `.agent/skills/_SKILL_TEMPLATE_REGISTRY.json`
4. the active plan and the target repo analysis

## 3) Output Contract

Every generated `.agent.md` file must include:

1. role name and purpose
2. when the role should be activated
3. mandatory reading list
4. primary responsibilities
5. closure and escalation notes

## 4) Mandatory Reading Rules

At minimum, every role template should point to:

- repo-root `AGENTS.md`
- repo-root `AGENT_OS_PLAN_TEMPLATE.md`
- the matching scoped instruction file
- the matching domain skill file
- the active plan

## 5) Role-System Rules

1. A role template may specialize behavior, but it may not weaken the donor spine.
2. Role files should map one primary domain to one primary skill by default.
3. Multi-domain roles are allowed only when the active plan explicitly needs them.
4. Role files must remain compatible with single-writer execution and fallback-to-sequential orchestration.

## 6) Registry Alignment

The agent-role registry must stay aligned with the instruction and skill registries.

If a role ID changes, update in the same request:

- `_SCOPED_INSTRUCTION_REGISTRY.json`
- `_SKILL_TEMPLATE_REGISTRY.json`
- role templates under `.github/agents/templates/`
- any generated docs or examples that name the role

## 7) Done Criteria for P1.4

P1.4 is complete when:

1. a canonical role-template system exists
2. a machine-readable role registry exists
3. base `.agent.md` templates exist for the current domain inventory
4. later P1.4a and P1.6 work can consume the same role IDs without inventing a second role layer

## 8) Adaptive Generation Bridge

P1.4a extends this role layer with adaptive generation rules.

That protocol must define:

1. how the generator scans the current locally available agent ecosystem
2. when extra role files should be synthesized beyond the base registry
3. how the freshness basis is recorded for later sessions

The canonical protocol for that work lives in `.github/agents/_ADAPTIVE_AGENT_FILE_GENERATION.md`.