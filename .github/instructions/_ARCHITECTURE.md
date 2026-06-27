# Registry Architecture

This directory defines the Phase-1 instruction and routing registries for the Universal Agent OS.

## Registry Chain
The universal behavior is constructed through a deterministic loading chain:
`instruction -> skill -> role -> prompt -> workflow`

1. **Scoped Instructions** (`_SCOPED_INSTRUCTION_REGISTRY.json`) define domain boundaries.
2. **Skills** (`_SKILL_TEMPLATE_REGISTRY.json`) declare tools the agent is permitted to use.
3. **Roles** (`_AGENT_ROLE_REGISTRY.json`) map skills to specific agent personas.
4. **Prompts** (`_PROMPT_TEMPLATE_REGISTRY.json`) contain exact system prompts for roles.
5. **Workflows** (`_WORKFLOW_DOMAIN_ROUTING.json`) orchestrate roles and prompts into domain flows.

## Update Rules
When a downstream registry changes, any upstream dependent configurations must be updated in the same change to prevent broken links.

## Honesty Boundary Alignment
These registries represent real, enforced routing paths. If a feature or role is not yet implemented, it MUST be tagged as "planned" and cannot be mapped to an active workflow.
