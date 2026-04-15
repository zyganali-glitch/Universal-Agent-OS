# Adaptive Agent-File Generation

This file defines the canonical P1.4a protocol for generating agent-role files adaptively from the current local ecosystem snapshot.

It extends the base role-template system. It does not replace it.

## 1) Goal

Ensure the generator can:

1. emit the base role files required by detected domains
2. synthesize extra role files when project complexity or ecosystem shape requires them
3. record the freshness basis used for that decision

## 2) Required Inputs

The adaptive role generator must read:

1. `.github/instructions/_ARCHITECTURE.md`
2. `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json`
3. `.agent/skills/_SKILL_TEMPLATE_REGISTRY.json`
4. `.github/agents/_AGENT_ROLE_TEMPLATE_SYSTEM.md`
5. `.github/agents/_AGENT_ROLE_REGISTRY.json`
6. the active plan and the target repo analysis

## 3) Ecosystem Scan Contract

The generator must scan the locally available agent ecosystem before deciding which agent files to emit.

At minimum, it checks for:

- agent-native directories already present in the target repo
- workflow surfaces already used by the target repo
- domain folders and package/workspace topology
- the compatibility surfaces the package already knows how to generate

This scan is local-first and offline-safe. Freshness is derived from the current local snapshot, not from mandatory network calls.

## 4) Base Output Rules

1. Generate one base role file for each detected primary domain.
2. Generate `qa-tester` whenever the target repo has an explicit validation surface.
3. Generate `plan-reviewer` whenever the target repo uses the plan-portfolio model.
4. Generate `i18n-reviewer` only when multilingual or locale-managed surfaces are present.

## 5) Adaptive Synthesis Rules

The generator may synthesize additional role files when the scan reveals cross-cutting complexity that the base role set cannot represent clearly.

Examples:

- `security-reviewer` when auth, billing, secret-management, or compliance-sensitive surfaces appear
- `monorepo-coordinator` when the repo contains multiple apps, packages, or services
- `docs-steward` when operator-facing docs or onboarding complexity become a first-class surface
- `release-manager` when versioned release channels and distribution packaging become material work

Adaptive roles should compose from the nearest base roles instead of inventing a second governance stack.

## 6) Freshness Snapshot Recording

Every adaptive generation run should record a freshness snapshot at:

- `.github/agents/_AGENT_FILE_FRESHNESS_SNAPSHOT.json`

Minimum snapshot fields:

1. `generatedAt`
2. `generatorVersion`
3. `roleRegistryVersion`
4. `detectedAgentSurfaces`
5. `detectedDomainIds`
6. `generatedBaseRoleIds`
7. `generatedAdaptiveRoleIds`
8. `compatibilityNotes`
9. `offlineSafe`

## 7) Drift Rules

Rerun or review adaptive role generation when:

1. the role registry changes
2. the domain inventory changes
3. the target repo gains a new workspace/package/app surface
4. new agent-native compatibility surfaces are added to the package

## 8) Done Criteria for P1.4a

P1.4a is complete when:

1. adaptive generation rules are defined
2. extra role synthesis rules are defined
3. freshness snapshot recording is defined
4. later P1.6 and Phase 2 tooling can consume the same protocol without inventing a second adaptive role model