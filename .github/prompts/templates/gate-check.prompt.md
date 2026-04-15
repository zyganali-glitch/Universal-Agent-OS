# Gate Check Prompt Template

## Use This Prompt When
- a work slice needs explicit gate verification before closure

## Required Context
- active plan under `plans/`
- touched files and the relevant scoped instructions
- the matching skills and role files from the registries

## Prompt Template

Review the active plan and the touched slice before running any broad validation.

1. Load the relevant scoped instructions, skills, and role files.
2. Pick the narrowest credible validation first.
3. Report gate results as PASS, FAIL, or NOT_RUN with concrete evidence.
4. If validation contradicts the current plan state, reopen the plan honestly before proposing closure.

Project placeholders:

- `{{ACTIVE_PLAN_PATH}}`
- `{{TOUCHED_SURFACES}}`
- `{{RELEVANT_GATES}}`

## Closure Expectation
- no closure claim without explicit gate evidence