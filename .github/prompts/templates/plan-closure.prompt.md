# Plan Closure Prompt Template

## Use This Prompt When
- a plan or major micro-phase is approaching closure

## Required Context
- active plan under `plans/`
- current gate state
- the touched files and final validation evidence

## Prompt Template

Evaluate whether the active plan can close without violating integrity or gate discipline.

1. Verify that the active plan reflects the real repo state.
2. Check for remaining FAIL or NOT_RUN gates.
3. Confirm that discovered work, risks, and archive rules are satisfied.
4. If any blocker remains, keep the plan open and state the blocker directly.

Project placeholders:

- `{{ACTIVE_PLAN_PATH}}`
- `{{OPEN_GATES}}`
- `{{FINAL_EVIDENCE}}`

## Closure Expectation
- do not close or archive a plan while blockers remain