---
description: Root workflow entry for resume-time domain routing across instruction, skill, role, and prompt registries.
---

# Root Continue Workflow

This is the canonical root resume entry for Phase 1+ routing.

Its job is to restore the active plan and then re-select the required instruction, skill, role, and prompt surfaces for the next safe micro-phase.

## 1) Canonical Resume Order

Read these sources in order:

1. `.github/instructions/_ARCHITECTURE.md`
2. the active plan under `plans/`
3. `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json`
4. `.agent/skills/_SKILL_TEMPLATE_REGISTRY.json`
5. `.github/agents/_AGENT_ROLE_REGISTRY.json`
6. `.github/prompts/_PROMPT_TEMPLATE_REGISTRY.json`
7. `.agent/workflows/_WORKFLOW_DOMAIN_ROUTING.json`

## 2) Resume Routing Contract

Before implementation resumes, the workflow must:

1. determine the active step and affected domains from the plan
2. re-map those domains to the required skills and roles
3. select the narrowest prompt template for the next action
4. confirm that validation and closure expectations still match the plan

## 3) Preferred Prompt Selection

Use the routing registry to prefer:

- `gate-check` when the next step is validation-heavy
- `plan-closure` when the next step is closure-heavy
- `deploy-sequence` when deploy or sync work is active
- `new-feature` when discovered work forces a new planning branch

## 4) Resume Output Expectation

Before re-entering implementation, the workflow should be able to state:

- active plan and step
- routed domains
- required skills and roles
- chosen prompt template
- next proof target

## 5) Closure Rule

Resume routing is not permission to skip previously required checks. Any contradiction between live state and plan state must reopen the plan honestly.