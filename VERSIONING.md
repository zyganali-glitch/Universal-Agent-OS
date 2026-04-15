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
- No locale pack may drift structurally without the same release explicitly documenting and closing the parity gap.
- Example repo and onboarding docs should be updated whenever startup flow changes.

## Current Release
- Current version: `0.1.0`
- Stability label: `Foundational beta`
