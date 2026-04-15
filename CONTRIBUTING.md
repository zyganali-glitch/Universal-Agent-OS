# Contributing Guide

This package is not a generic starter repo. Contributions must preserve the donor spine, locale-pack parity, and consultation-first governance model.

## Core Rules
- Do not weaken the authority order: donor file -> `AGENTS.md` -> repo-root `AGENT_OS_PLAN_TEMPLATE.md` -> active plans.
- Keep changes additive. Harden or extend existing governance; do not silently replace working surfaces.
- If you add or change an operator-facing rule, update the matching adapter, workflow, skill, and plan surfaces in the same request.
- Locale packs should remain structurally parallel unless the same request documents and closes the parity gap.

## Adding a New Locale Pack
1. Create a new locale folder beside `en/` and `tr/`.
2. Add the minimum required files:
   - `AGENT_OS_RULES.md`
   - `AGENTS.md`
   - `AGENT_OS_PLAN_TEMPLATE.md`
   - `README.md`
3. Add the required agent-native surfaces for that locale:
   - `.agent/rules/global-governance.md`
   - `.agent/skills/global-governance/SKILL.md`
   - `.agent/workflows/session-bootstrap.md`
   - locale-appropriate resume workflow
   - `.codex/AGENTS.md`
   - `.github/copilot-instructions.md`
   - `.github/instructions/global-agent.instructions.md`
   - `.cursor/rules/global-governance.mdc`
   - `CLAUDE.md`
   - `GEMINI.md`
   - `AIDER.md`
4. Add locale-specific docs under `docs/<locale>/`.
5. Update bootstrap/install surfaces if locale selection or detection changes.
6. Update compliance automation if new required files must be checked.

## Adding a New Adapter or Agent Surface
1. Decide whether the surface is locale-specific, root-level, or both.
2. Keep the donor spine intact; adapters may enrich workflow but may not narrow the governance contract.
3. Add matching references in locale READMEs or onboarding docs when discoverability changes.
4. If the new surface changes package shape, update `.github/workflows/agent-compliance-check.yml`.

## Adding a New Example Skeleton
1. Put examples under `examples/`.
2. Every example should show the expected landing shape at minimum:
   - `README.md`
   - `AGENTS.md`
   - `AGENT_OS_PLAN_TEMPLATE.md`
   - `plans/`
3. Prefer one focused scenario per example instead of one overloaded demo repo.
4. If a new example demonstrates a new operator flow, update onboarding docs in the same request.

## Validation Checklist
- Required files exist for each locale pack.
- New copy is repo-agnostic and does not leak donor/project-specific branding.
- EN/TR structural parity is preserved or explicitly documented.
- Active plan is updated atomically with evidence and status changes.
- New examples and docs reflect the current package shape, not a legacy filename or layout.