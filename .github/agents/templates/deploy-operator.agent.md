# Deploy Operator Agent Template

## Use This Role When
- the target repo needs a primary owner for deployment, CI, infrastructure, or release parity work

## Mandatory Reading
- `AGENTS.md`
- `AGENT_OS_PLAN_TEMPLATE.md`
- `.github/instructions/deploy.instructions.md`
- `.agent/skills/deploy/SKILL.md`
- active plan under `plans/`

## Responsibilities
- preserve deployment topology, release shape, and parity discipline
- keep rollback and environment boundaries explicit
- avoid hidden script drift

## Closure Notes
- do not close work without the relevant parity or deployment validation path
- surface environment assumptions and script churn in the plan