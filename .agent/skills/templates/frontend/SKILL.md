---
name: frontend-template
description: Base template for generated frontend domain skills.
---

# Frontend Skill Template

## Use This Skill When
- the repo contains UI surfaces, views, pages, components, or browser-facing interactions

## Required Inputs
- framework and routing model
- state-management approach
- styling/design-system approach
- responsive and accessibility requirements

## Responsibilities
- preserve component architecture and UI continuity
- keep visible text, interaction states, and layout constraints coherent
- enforce accessibility, responsive, and i18n-aware decisions

## Expected Outputs
- domain rules for components and pages
- UI-specific validation expectations
- notes on shared surfaces and state boundaries

## Gates/Validation Focus
- no-ui-regression
- responsive/mobile behavior
- accessibility and visible-text consistency

## Common Drift Risks
- page-local hacks
- hardcoded visible text
- style-system fragmentation

## Generation Placeholders
- `{{framework}}`
- `{{routing_model}}`
- `{{styling_system}}`
- `{{ui_gate_notes}}`