# Scoped Instruction Template Generator

This file defines how the package generates domain-scoped `*.instructions.md` files for a target repository.

It is the canonical generator contract for P1.2. It does not replace executable tooling planned for Phase 2. Instead, it gives the generator a stable, repeatable architecture so later CLI automation and agent flows can produce the same outputs.

## 1) Goal

Convert project analysis into a set of scoped instruction files with:

- correct filenames
- correct `applyTo` globs
- correct domain sections
- correct downstream links to skills and agent roles

## 2) Generator Inputs

The generator reads these inputs in order:

1. Repo-root governance spine
   - `AGENTS.md`
   - `AGENT_OS_PLAN_TEMPLATE.md`
   - active plan under `plans/`
2. Project structure
   - top-level folders
   - domain folders
   - config files and build files
3. Stack signals
   - framework
   - language
   - test runner
   - deployment surface
4. Registry data
   - `_SCOPED_INSTRUCTION_REGISTRY.json`

## 3) Generator Outputs

For each detected domain, the generator emits one instruction file:

- filename: `<domain>.instructions.md`
- location: `.github/instructions/`
- frontmatter with `applyTo`
- domain skill reference
- domain-specific rule blocks
- closure and gate notes that remain consistent with the donor spine

## 4) Output Contract

Every generated instruction file must contain:

1. YAML frontmatter with `applyTo`
2. short title naming the domain
3. domain purpose paragraph
4. mandatory reading or skill reference
5. domain-specific non-negotiables
6. closure discipline that does not weaken the donor hierarchy

The generator may specialize language, but it may not remove the donor package protections.

## 5) Detection Rules

### 5.1 Project Scan

Scan for:

- folder names such as `src`, `app`, `frontend`, `backend`, `api`, `tests`, `locales`, `i18n`, `infra`, `deploy`, `scripts`
- build/config files such as `package.json`, `requirements.txt`, `pyproject.toml`, `Cargo.toml`, `build.gradle`, `Dockerfile`
- stack clues inside example directories or nested packages when the repo is a monorepo

### 5.2 Domain Selection

Select one or more instruction domains from the registry based on the scan.

Rules:

1. `testing` is added whenever the repo contains an explicit test surface.
2. `i18n` is added whenever multilingual surfaces or locale files are present.
3. `plans` is added whenever the repo uses the governance portfolio model.
4. `deploy` is added when deployment or infrastructure folders exist.
5. Multiple domains may coexist; overlapping `applyTo` globs are allowed only if their responsibilities are non-contradictory.

## 6) applyTo Construction Rules

The generator must build `applyTo` globs that are:

- narrow enough to route domain-specific behavior correctly
- broad enough to catch the entire domain surface
- written relative to the target repo root

Guidelines:

1. Prefer a small list of explicit glob families over one huge catch-all.
2. Include both canonical folders and realistic alternates from the registry.
3. If one domain owns multiple path families, keep them in one file unless the active plan explicitly calls for a split.
4. Avoid globs that swallow unrelated governance or example folders.

## 7) Template Sections

Each emitted instruction template should use these section headings when relevant:

- Purpose
- Mandatory Reading
- Domain Rules
- Architecture Constraints
- Testing/Gates
- Common Drift Risks

The exact wording may differ per locale or per generated repo, but the section intent should remain stable.

## 8) Cascade Requirements

If the registry changes, the following must be reviewed in the same request:

- `_ARCHITECTURE.md`
- generator registry JSON
- later skill templates if domain inventory changes
- later agent role routing if domain inventory changes
- examples or docs that describe generated instruction outputs

## 9) Done Criteria for P1.2

P1.2 is complete when:

1. a canonical generator contract exists
2. a machine-readable domain registry exists
3. filenames, `applyTo`, skill hooks, and role hooks are defined per domain
4. later Phase-1 work can consume the registry without inventing a second instruction architecture

## 10) Relationship to P1.3-P1.6

- P1.3 reads this generator's domain inventory and creates the matching skill templates.
- P1.4 uses the same domain IDs when defining agent roles.
- P1.5 may emit prompt templates that refer to the same domain map.
- P1.6 wires instruction metadata, skills, roles, and workflows into one chain.