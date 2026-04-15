---
name: i18n-template
description: Base template for generated localization and language-parity skills.
---

# I18N Skill Template

## Use This Skill When
- the repo contains locale files, translation surfaces, or multilingual visible text

## Required Inputs
- active locales
- visible-text sources
- fallback policy
- parity requirements

## Responsibilities
- preserve locale completeness and visible-text parity
- prevent hardcoded operator-facing strings
- keep fallback and translation ownership explicit

## Expected Outputs
- locale-scope rules
- parity checklist
- visible-text and translation maintenance notes

## Gates/Validation Focus
- locale parity
- visible-text completeness
- hardcoded-string detection

## Common Drift Risks
- one-locale updates
- fallback-only pseudo-parity
- hidden text outside locale surfaces

## Generation Placeholders
- `{{locales}}`
- `{{fallback_policy}}`
- `{{visible_text_sources}}`
- `{{i18n_gate_notes}}`