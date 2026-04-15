# Root Codex Surface

This root package does not use `.codex/AGENTS.md` as the final generated governance surface for a target repository, but it now carries the canonical Phase-1 routing bridge for Codex-facing workflows.

## Root-first routing contract

Before locale specialization or target-repo generation, Codex-facing sessions should understand this registry chain:

1. `.github/instructions/_ARCHITECTURE.md`
2. `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json`
3. `.agent/skills/_SKILL_TEMPLATE_REGISTRY.json`
4. `.github/agents/_AGENT_ROLE_REGISTRY.json`
5. `.github/prompts/_PROMPT_TEMPLATE_REGISTRY.json`
6. `.agent/workflows/_WORKFLOW_DOMAIN_ROUTING.json`

Use one of these operational paths after bootstrap:
- install a locale pack into the target repository with `init-agent-os.ps1` or `init-agent-os.sh`
- or copy a locale pack (`en/` or `tr/`) into the target repository root as a manual fallback

After installation, the active Codex-facing governance surface lives inside the installed target repository, but it should inherit the same routing chain additively.

Purpose of this file:
- preserve a non-empty root `.codex/` surface
- explain the package-level routing model before locale specialization
- keep Codex-facing bootstrap behavior aligned with the same instruction -> skill -> role -> prompt -> workflow chain