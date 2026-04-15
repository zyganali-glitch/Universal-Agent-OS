---
name: game-template
description: Base template for generated game-domain skills.
---

# Game Skill Template

## Use This Skill When
- the repo contains game assets, scenes, engine settings, or gameplay systems

## Required Inputs
- engine family
- platform targets
- performance budget
- save/load or physics expectations

## Responsibilities
- preserve engine-specific boundaries
- keep gameplay, asset, and scene ownership clear
- enforce performance and player-surface continuity

## Expected Outputs
- engine-aware gameplay guidance
- asset/scene ownership notes
- performance and input validation emphasis

## Gates/Validation Focus
- frame/performance budget
- input and scene stability
- save/load or state continuity

## Common Drift Risks
- engine-agnostic guesses
- scene-local hacks
- performance regressions hidden by editor-only testing

## Generation Placeholders
- `{{engine}}`
- `{{target_platforms}}`
- `{{performance_budget}}`
- `{{game_gate_notes}}`