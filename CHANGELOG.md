# Changelog

## 1.2.0 - 2026-06-27
- **Open Source Transition**: Converted completely to MIT License, removing all commercial tier restrictions and terminology.
- **Plan Standardization**: Standardized `AGENT_OS_PLAN_TEMPLATE.md` usage across all root AI adapters.
- **Verification Modes**: CLI `verify` now supports `--package` (self-check) and `--target <dir>` (target repo check).
- **CI/CD Consolidation**: GitHub Actions and GitLab pipelines now test against the strict `--package` mode.
- **VS Code Extension Fixed**: Integrated `phase0_interview.py` and active IDE diagnostics (Anti-Monolith, Zero-Zombie-Code).
- **Target Repo Demo**: Added fully compliant `examples/minimal-saas` target repo for end-to-end verification.
- **Honesty Boundary**: Added `Tech-Debt Delta` requirement to the Evidence Manifest, enforced by `pytest`.

## 1.1.0 - 2026-06-26
- **Root AGENTS.md strengthened**: Added IL-14/15/16 references, locale detection hint, Multi-Role Review Stack, Fast-Track Mode.
- **All 10 root adapter files differentiated**: Each agent-specific adapter now includes tailored directives for its known strengths/weaknesses (Cursor, Claude, Gemini, Aider, Copilot, Devin, Windsurf, Cline, Roo, OpenHands).
- **CLI `verify.js` expanded**: From 2-file check to comprehensive governance verification covering core files, 4 Collective Memory pillars, agent adapters, IDE surfaces, and planning infrastructure.
- **`package.json` fixed**: Test script now invokes pytest correctly. Added `verify` shortcut script. Added keywords.
- **`init-agent-os.sh` rewritten**: Removed interactive prompts, made parametric (consistent with PS1), default locale `en`, bilingual output, CI/CD compatible.
- **GitHub Actions enforcer expanded**: Comprehensive PR enforcement with locale parity checks, Collective Memory validation, core content verification.
- **`LICENSING.md` clarified**: Resolved MIT LICENSE vs. commercial model contradiction. Commercial tiers are now clearly marked as future recommendations.
- **`README.md` overhauled**: Honesty Boundary moved to top, adapter coverage table added, beginner UX improved, repository layout tree added, licensing section aligned.

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
