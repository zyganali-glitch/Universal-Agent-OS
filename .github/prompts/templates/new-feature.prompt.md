# New Feature Prompt Template

## Use This Prompt When
- a new feature or workstream is requested and governance must be established before implementation

## Required Context
- repo-root governance spine
- active plan inventory under `plans/`
- discovered domains, surfaces, and expected risks

## Prompt Template

Start from planning, not implementation.

1. Determine whether the request belongs to an existing plan or requires a new plan.
2. Lock scope, allowlist, and denylist before code changes.
3. Record domain discovery, surface impact, and likely gates.
4. Only after the plan exists should implementation routing begin.

Project placeholders:

- `{{REQUEST_SUMMARY}}`
- `{{SURFACE_IMPACT}}`
- `{{EXPECTED_GATES}}`

## Closure Expectation
- no implementation before plan discipline is satisfied