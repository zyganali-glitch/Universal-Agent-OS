# Changelog

## VS Code Extension 1.4.3 - 2026-06-27

- Fixed VS Code initialization so it installs the full runtime governance payload instead of only the selected locale pack and examples.
- Fixed clean-folder vs brownfield detection by checking the workspace before copying Agent OS files.
- Added collision backups under `.agentos-backups/` and preserved existing user `README.md` files as `AGENT_OS_README.md` in brownfield installs.
- Replaced VS Code governance verification's unpublished npm dependency with local workspace file checks.
- Added `docs/INSTALLATION_MANIFEST.md` as the canonical install payload contract.
- Aligned PowerShell and Bash bootstrap installers with the same runtime payload and brownfield behavior.
- Packaged `universal-agent-os-vscode-1.4.3.vsix` with a minimal VSIX payload and extension-local MIT license.

## Real-World Adoption Guidance - 2026-06-28

- Added `docs/REAL_WORLD_SCENARIOS.md` with a scenario matrix for empty projects, brownfield repositories, solo experts, beginners, agencies, corporate teams, regulated domains, open-source maintainers, and multi-agent handoffs.
- Expanded `docs/GOVERNANCE_PROFILES.md` from a future CLI note into practical light, standard, and strict profile guidance while keeping profile flags marked as Planned.
- Linked the real-world adoption layer from README, Architecture, Installation Manifest, CLI verification, and governance tests.

## 1.2.0 - 2026-06-27

- Added Phase-1 registry surfaces for scoped instructions, skills, roles, prompts, and workflow routing.
- Added real-world adoption surfaces: Brownfield Adoption Playbook, Agent Failure Pattern Catalog, Governance Profiles, and Governance Health Report notes.
- Added GitHub issue and pull request templates for Agent OS governed tasks.
- Clarified MIT open-source licensing and removed commercial restriction language.
- Split CLI verification into package and target modes.
- Added semantic package checks for version sync, MIT license, README v1.2.0 status, Tech-Debt Delta, and licensing restrictions.
- Standardized `AGENT_OS_PLAN_TEMPLATE.md` references.
- Improved Fast-Track Mode documentation.
- Strengthened pytest governance checks for registry files, documentation surfaces, adapter routing, licensing, and demo repo evidence.
- Expanded `examples/minimal-saas` into a verifiable target-repo example.

## 1.1.0 - 2026-06-26

- Strengthened root `AGENTS.md` with locale detection, IL-14/15/16 references, Multi-Role Review Stack, and Fast-Track Mode.
- Differentiated root adapter files for supported AI agents and IDEs.
- Expanded CLI verification coverage beyond the initial two-file check.
- Updated package scripts for pytest and verification shortcuts.
- Reworked Bash bootstrap behavior for non-interactive usage.
- Improved GitHub Actions governance checks.
- Improved README structure, beginner guidance, adapter coverage, and repository layout.

## 1.0.0 - 2026-06-26

- Introduced the local `agent-os` CLI with `init` and `verify` commands.
- Added GitHub Actions enforcement workflow.
- Added VS Code extension scaffold for IDE-native Phase-0 workflows.
- Added package metadata and release baseline files.

## 0.2.0 - 2026-06-26

- Added Windows PowerShell bootstrap support.
- Added MIT license.
- Added Collective Memory templates for English and Turkish locale packs.
- Added pytest-based governance tests.
- Added Evidence Manifest template.
- Added architecture documentation and Phase-0 interview example.
- Added GitLab CI governance pipeline.

## 0.1.0 - 2026-03-29

- Initial Universal Agent OS concept and locale-pack structure.
- Added English and Turkish governance foundations.
- Added initial `AGENTS.md`, rules, and plan template surfaces.
