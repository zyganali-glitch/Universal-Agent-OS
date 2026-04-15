# Root .agent/workflows Index

Root `.agent/workflows/` now provides the canonical Phase-1 routing layer for the package.

It contains:

1. root workflow entry files for `session-bootstrap` and `continue`
2. the machine-readable routing bridge that maps instruction domains to skills, roles, prompts, and workflow entry points

These root files do not replace locale-pack onboarding copy. They define the neutral wiring contract that later locale packs and generated target repositories should inherit.

Current workflow sources:

- root workflow routing surfaces in this folder
- `en/.agent/workflows/`
- `tr/.agent/workflows/`

Use the root files when working on package architecture. Use locale-pack or generated target-repo workflow files when validating operator-facing copy.