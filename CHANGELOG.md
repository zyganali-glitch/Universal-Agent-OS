# Changelog

## 1.0.0 - 2026-06-26
- Promoted Universal Agent OS to full Enterprise release.
- Added `agent-os` CLI (`npx agent-os init`, `verify`) for programmatic interactions.
- Added `.github/workflows/agent-os-enforcer.yml` for automated CI/CD PR enforcement.
- Created VS Code extension scaffold (`extensions/vscode/`) for IDE-native Phase-0 workflows.
- Updated `LICENSE` ownership context to Mehmet Aydoğan.
- Updated `README.md` to reflect the transition from Starter Kit to Enterprise product.

## 0.2.0 - 2026-06-26
- Harvested and merged cross-platform best practices from derived repositories.
- Added `init-agent-os.ps1` for Windows bootstrap support.
- Added standard `LICENSE` (MIT) and expanded `.gitignore`.
- Replaced missing Collective Memory templates across all locale packs.
- Introduced `tests/` directory with pytest-based governance checks.
- Added `docs/EVIDENCE_MANIFEST_TEMPLATE.md` to formalize the Honesty Boundary.
- Added `docs/ARCHITECTURE.md` with Mermaid architecture diagrams.
- Cleaned root `AGENTS.md` of all platform-specific references.
- Added Beginner-Friendly Bootstrap contract to `AGENT_OS_RULES.md`.
- Added platform-agnostic Phase-0 interview script example.
- Enhanced CI pipeline with `validate-governance` job.

## 0.1.0 - 2026-03-29
- Reframed the package as the Agent Governance OS Starter Kit.
- Split the package into self-contained `tr/` and `en/` locale packs.
- Removed the duplicate root donor file and converted the root into a locale index.
- Hardened the Turkish global plan template with a full heading/subheading backbone.
- Added the English donor, template, adapters, workflows, and skills.
- Added versioning, licensing, onboarding/demo documentation, and an example repo skeleton.
