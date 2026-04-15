---
name: backend-template
description: Base template for generated backend or API-oriented domain skills.
---

# Backend Skill Template

## Use This Skill When
- the repo contains backend services, API routes, controllers, or server-side business logic

## Required Inputs
- server framework
- request/response model
- validation and auth expectations
- persistence and migration constraints

## Responsibilities
- preserve modular server architecture
- enforce input validation, error handling, and contract continuity
- avoid unsafe default activation of auth, billing, or telemetry

## Expected Outputs
- backend domain rules
- API contract notes
- server-side validation checklist

## Gates/Validation Focus
- smoke for service startup
- related tests for routes and validation
- dependency and reproducibility checks

## Common Drift Risks
- route sprawl
- hidden contract changes
- unsafe server defaults

## Generation Placeholders
- `{{server_framework}}`
- `{{api_contract_style}}`
- `{{validation_strategy}}`
- `{{backend_gate_notes}}`