---
name: data-template
description: Base template for generated data, model, or pipeline domain skills.
---

# Data Skill Template

## Use This Skill When
- the repo contains datasets, models, migrations, notebooks, or transformation pipelines

## Required Inputs
- data sources and schema expectations
- reproducibility requirements
- lineage/versioning needs
- quality and validation rules

## Responsibilities
- preserve data lineage and reproducibility
- enforce schema awareness and explicit transformations
- prevent silent data-contract drift

## Expected Outputs
- pipeline or model governance notes
- schema and data-quality expectations
- reproducibility steps

## Gates/Validation Focus
- data quality checks
- reproducibility and dependency checks
- targeted pipeline validation

## Common Drift Risks
- hidden schema changes
- notebook-only logic
- undocumented transformations

## Generation Placeholders
- `{{data_stack}}`
- `{{schema_strategy}}`
- `{{repro_requirements}}`
- `{{data_gate_notes}}`