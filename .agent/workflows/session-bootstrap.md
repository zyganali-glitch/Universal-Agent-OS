---
description: Root workflow entry for new-session routing across instruction, skill, role, and prompt registries.
---

# Root Session Bootstrap Workflow

This is the canonical root workflow entry for Phase 1+ routing.

It does not replace locale-pack onboarding content. It defines how the package wires the four-layer auto-activation chain before locale-specific or target-repo-specific specialization happens.

## 1) Canonical Load Order

Read these sources in order:

1. `.github/instructions/_ARCHITECTURE.md`
2. `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json`
3. `.agent/skills/_SKILL_TEMPLATE_REGISTRY.json`
4. `.github/agents/_AGENT_ROLE_REGISTRY.json`
5. `.github/prompts/_PROMPT_TEMPLATE_REGISTRY.json`
6. `.agent/workflows/_WORKFLOW_DOMAIN_ROUTING.json`
7. the active plan under `plans/`

## 2) Domain Routing Contract

Before implementation, the workflow must determine:

1. which instruction domains match the target repo or request
2. which skill IDs those domains require
3. which role IDs should own or review the slice
4. which prompt IDs should guide the first workflow step

The workflow routing registry is the canonical bridge for that decision.

## 3) New Session Sequence

For a new session or new target repo:

1. detect project type, scale, and domain folders
2. select instruction domains from `_SCOPED_INSTRUCTION_REGISTRY.json`
3. map those domains to skills, roles, and prompts through `_WORKFLOW_DOMAIN_ROUTING.json`
4. generate or harden the target repo governance spine
5. keep implementation blocked until planning and routing surfaces exist

## 4) Output Expectation

Before code changes, the workflow should be able to state:

- active or expected domains
- required skills
- primary role ownership
- first prompt template to use
- first safe planning or validation step

## 5) Closure Rule

The workflow may route work, but it may not bypass plan-first governance or gate discipline.