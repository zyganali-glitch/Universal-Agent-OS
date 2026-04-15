# Deploy Sequence Prompt Template

## Use This Prompt When
- a task includes deploy, release, parity, or environment synchronization work

## Required Context
- active plan under `plans/`
- current deployment topology and release scripts
- the relevant deploy role and skill surfaces

## Prompt Template

Use the active plan and deployment surfaces to produce the narrowest safe deploy sequence.

1. Read the deployment topology and current plan constraints first.
2. Identify the minimal pre-deploy validation required.
3. Record parity, rollback, and post-deploy verification expectations.
4. Do not mark sync complete unless the required parity proof exists.

Project placeholders:

- `{{ACTIVE_PLAN_PATH}}`
- `{{DEPLOYMENT_SURFACES}}`
- `{{PARITY_REQUIREMENTS}}`

## Closure Expectation
- deployment claims require explicit verification evidence