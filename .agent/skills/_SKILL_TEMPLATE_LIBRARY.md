# Skill Template Library

This file defines the canonical Phase 1 skill-template library for Agent Governance OS v2.

It gives the package a locale-neutral source for domain skill generation before executable tooling exists.

## 1) Goal

Provide reusable base skill templates that later generators can specialize for a target repository after Phase 0.

The library must stay aligned with:

- `.github/instructions/_ARCHITECTURE.md`
- `.github/instructions/_SCOPED_INSTRUCTION_GENERATOR.md`
- `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json`

## 2) Output Model

Each generated skill file should be derived from a base template and then specialized with:

- project stack
- platform family
- domain-specific gate expectations
- output surfaces owned by that domain
- likely drift risks for that repo

## 3) Base Template Contract

Every base skill template should contain:

1. frontmatter with a stable `name` and `description`
2. a concise purpose statement
3. clear entry conditions for when the skill should be used
4. required input/context checklist
5. domain responsibilities
6. expected outputs or artifacts
7. gate or validation emphasis
8. drift risks
9. generation placeholders that later automation or agents can fill

## 4) Auto-Generation Protocol

The skill generator must:

1. read the architecture anchor and instruction registry first
2. map detected domains to skill template IDs
3. select the matching base template from `templates/`
4. inject project-specific details additively
5. avoid deleting any donor protections during specialization

## 5) Domain Inventory

The root library currently provides templates for:

- frontend
- backend
- data
- game
- mobile
- deploy
- qa-testing
- i18n
- plan-lifecycle

`backend` is the default API-oriented server skill unless a future split explicitly introduces a separate `api` template.

## 6) Cascade Rules

If a new skill template ID is added or removed, review in the same request:

- `_ARCHITECTURE.md`
- `_SCOPED_INSTRUCTION_REGISTRY.json`
- `_SCOPED_INSTRUCTION_GENERATOR.md`
- later agent-role routing files
- docs or examples that describe generated domain surfaces

## 7) Done Criteria for P1.3

P1.3 is complete when:

1. a canonical root skill library exists
2. a machine-readable registry exists
3. base templates exist for the current domain inventory
4. later P1.4-P1.6 work can consume the same skill IDs without inventing a second library