# Skill Generation Prompt Template

## Use This Prompt When
- a target repo needs project-specific skills generated from the root skill library

## Required Context
- repo-root governance spine
- project structure and domain scan
- the skill template registry and matching instruction domains

## Prompt Template

Generate project-specific skills from the root template library.

1. Scan the target repo for domains, stack signals, and governance surfaces.
2. Select the matching instruction and skill domains from the registries.
3. Generate additive skill outputs without overwriting custom governance.
4. Record which assumptions justified the generated skill set.

Project placeholders:

- `{{TARGET_REPO_ANALYSIS}}`
- `{{DETECTED_DOMAINS}}`
- `{{GENERATION_ASSUMPTIONS}}`

## Closure Expectation
- generated skills must stay consistent with the instruction and role registries