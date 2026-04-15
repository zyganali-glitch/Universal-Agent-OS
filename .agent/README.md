# Root .agent Index

The root `.agent/` directory is now a canonical package layer for Phase 1+ architecture work.

It is not the final generated runtime surface for a target repository, but it is no longer a redirect-only stub.

Current role of the root `.agent/` tree:

1. provide locale-neutral template libraries and routing contracts
2. define the root workflow bridge across instruction, skill, role, and prompt registries
3. remain compatible with later locale-pack mirroring and target-repo generation

Current intended flow:

- use the root template and routing surfaces while Phase 1 architecture is being built
- let the bootstrap/interviewing agent generate the target repo's final `.agent/` files from those root contracts
- mirror or specialize those contracts in locale packs only after the root package shape is stable

See also:

- `.agent/skills/`
- `.agent/workflows/`
- `en/.agent/`
- `tr/.agent/`
- `init-agent-os.ps1`
- `init-agent-os.sh`