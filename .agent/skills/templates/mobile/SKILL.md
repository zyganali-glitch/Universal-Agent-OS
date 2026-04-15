---
name: mobile-template
description: Base template for generated mobile-domain skills.
---

# Mobile Skill Template

## Use This Skill When
- the repo contains Android, iOS, Flutter, React Native, or device-specific mobile surfaces

## Required Inputs
- mobile stack
- navigation and lifecycle model
- permission/offline expectations
- device/API constraints

## Responsibilities
- preserve lifecycle correctness
- enforce touch, navigation, and device-permission discipline
- keep offline and platform-specific behavior explicit

## Expected Outputs
- mobile architecture notes
- permission and lifecycle constraints
- navigation and runtime validation emphasis

## Gates/Validation Focus
- lifecycle and navigation checks
- responsive/touch behavior
- permission and offline continuity

## Common Drift Risks
- web-only assumptions in native flows
- silent permission expansion
- lifecycle regressions

## Generation Placeholders
- `{{mobile_stack}}`
- `{{navigation_model}}`
- `{{permission_profile}}`
- `{{mobile_gate_notes}}`