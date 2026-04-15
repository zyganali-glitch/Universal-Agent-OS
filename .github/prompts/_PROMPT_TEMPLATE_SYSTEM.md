# Prompt Template System

This file defines the canonical root prompt-template system for Agent Governance OS v2.

It provides reusable `.prompt.md` workflow templates that later generators can specialize for a target repository.

## 1) Goal

Give the four-layer architecture a reusable workflow-prompt layer that:

1. stays aligned with the donor governance spine
2. routes to the correct roles and skills
3. remains stable enough for later tooling and package generation

## 2) Required Inputs

The prompt generator must read:

1. `.github/instructions/_ARCHITECTURE.md`
2. `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json`
3. `.agent/skills/_SKILL_TEMPLATE_REGISTRY.json`
4. `.github/agents/_AGENT_ROLE_REGISTRY.json`
5. the active plan and the target repo analysis

## 3) Output Contract

Every generated `.prompt.md` file must include:

1. the workflow goal
2. the minimum context required before execution
3. the default role and skill routing assumptions
4. a prompt body with placeholders for project-specific details
5. closure expectations that do not weaken plan or gate discipline

## 4) Prompt-System Rules

1. Prompt templates are workflow helpers, not substitutes for the constitutional donor files.
2. Prompt templates may specialize sequencing, but they may not bypass plan creation, gate checks, or scope discipline.
3. Prompt templates should reuse the same role IDs and skill IDs defined by the registries.
4. Prompt templates should stay short enough to be reused, but explicit enough to preserve governance intent.

## 5) Base Prompt Inventory

The root system must provide templates for at least:

- gate check
- deploy sequence
- plan closure
- new feature initiation
- skill generation

## 6) Registry Alignment

If a prompt template is added, removed, or renamed, update in the same request:

- `_PROMPT_TEMPLATE_SYSTEM.md`
- `_PROMPT_TEMPLATE_REGISTRY.json`
- prompt templates under `.github/prompts/templates/`
- docs or examples that reference the affected prompt

## 7) Done Criteria for P1.5

P1.5 is complete when:

1. a canonical prompt-template system exists
2. a machine-readable prompt registry exists
3. base `.prompt.md` templates exist for the common workflow inventory
4. later P1.6 and Phase 2 tooling can consume the same prompt IDs without inventing a second prompt layer