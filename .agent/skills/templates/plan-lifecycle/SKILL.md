---
name: plan-lifecycle-template
description: Base template for generated plan-lifecycle and integrity-lock skills.
---

# Plan Lifecycle Skill Template

## Use This Skill When
- the repo uses the master roadmap, child execution plans, and explicit plan-state governance

## Required Inputs
- active plan
- closure gates
- archive rules
- request/task/risk surfaces

## Responsibilities
- preserve active-plan integrity and atomic updates
- enforce honest closure and archive placement
- prevent plan/table/risk drift

## Expected Outputs
- plan-lifecycle rules
- integrity-lock checklist
- closure and archive guidance

## Gates/Validation Focus
- integrity-lock
- parity between plan surfaces
- archive and closure requirements

## Common Drift Risks
- partial plan updates
- stale discovered-work state
- completed plans left active

## Generation Placeholders
- `{{plan_filename_pattern}}`
- `{{gate_catalog}}`
- `{{archive_rule}}`
- `{{plan_gate_notes}}`