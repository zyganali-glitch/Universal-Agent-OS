---
name: deploy-template
description: Base template for generated deploy and operations domain skills.
---

# Deploy Skill Template

## Use This Skill When
- the repo contains deployment scripts, CI workflows, infrastructure config, or release automation

## Required Inputs
- deployment topology
- release artifact flow
- environment boundaries
- rollback/parity expectations

## Responsibilities
- preserve safe deployment topology
- keep release and parity checks explicit
- avoid hidden environment assumptions

## Expected Outputs
- deployment surface rules
- release artifact guidance
- parity and rollback checklist

## Gates/Validation Focus
- smoke after deploy when applicable
- parity/drift checks
- packaging and release-shape verification

## Common Drift Risks
- stale deployment scripts
- environment-specific hardcoding
- skipped parity validation

## Generation Placeholders
- `{{deployment_topology}}`
- `{{artifact_strategy}}`
- `{{rollback_strategy}}`
- `{{deploy_gate_notes}}`