# Versioning Strategy

Product name: Agent Governance OS Starter Kit

## Versioning Model
- Use semantic versioning: `MAJOR.MINOR.PATCH`.
- `MAJOR`: breaking governance structure, required file layout, or template contract changes.
- `MINOR`: additive governance surfaces, new package assets, new docs, stronger templates, new locale packs.
- `PATCH`: copy polish, typo fixes, non-breaking wording hardening, metadata updates.

## Release Rules
- Every release updates `VERSION` and `CHANGELOG.md` together.
- Every release must state which locale packs changed.
- Every release must specify whether donor, template, adapter, workflow, or skill contracts changed.
- Breaking changes must include migration notes for downstream repos.

## Compatibility Notes
- Locale packs should stay structurally parallel whenever possible.
- The Turkish donor may lead conceptually, but English must not lag structurally.
- Example repo and onboarding docs should be updated whenever startup flow changes.

## Current Release
- Current version: `0.1.0`
- Stability label: `Foundational beta`
