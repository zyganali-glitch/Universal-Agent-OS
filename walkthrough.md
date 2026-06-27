# Universal Agent OS — Repo Hardening Walkthrough

This walkthrough outlines all the changes and governance enforcements applied to the repository to meet the Open Source and Consultation-First requirements.

## 1. Open Source & Licensing

- **Removed Commercial Limitations:** Rewrote LICENSING.md and README.md to definitively remove all references to commercial tier restrictions. The project is strictly and exclusively distributed under the MIT License.
- **Version Bump:** Upgraded from `1.1.0` to `1.2.0` across the repo (including CHANGELOG.md and VERSION) to mark this stability release.

## 2. Global Plan Standardization

- Found instances where older `.codex`, `CLAUDE.md`, and other root adapters referred to `GLOBAL_PLAN`. Standardized all of these to point exactly to `AGENT_OS_PLAN_TEMPLATE.md` to ensure single-source-of-truth governance.

## 3. CLI Dual-Mode (`--package` and `--target`)

- Upgraded the CLI verification script in verify.js.
- `npx agent-os verify --package` performs a self-check of the `universal-agent-os` repository itself.
- `npx agent-os verify --target <dir>` correctly tests an initialized destination directory.

## 4. Test Dependency & CI Pipeline Consolidation

- The GitHub Actions (`agent-os-enforcer.yml` & `agent-compliance-check.yml`) and GitLab CI pipelines now properly invoke the CLI via `npx agent-os verify --package`.
- Updated `package.json` with correct testing scripts and added a `requirements-dev.txt` for Python testing parity.

## 5. Shell Installer Interactive Fixes

- Rewrote the locale discovery step in init-agent-os.sh. It will no longer block CI runners or IDE setups by asking interactive questions. If the locale parameter is missing, it cleanly sets `en` as the default.

## 6. VS Code Extension Hardening

- The VS Code Extension in extension.ts was failing to invoke the Python interactive script.
- Re-architected `extension.ts` to both launch the Phase-0 interview terminal (`python examples/phase0-interview/phase0_interview.py start`) AND maintain active language-server diagnostics (Anti-Monolith sizing and Zero-Zombie-Code alerts).

## 7. AI Adapter Locale Routing

- All 11 root AI instruction files (`CLAUDE.md`, `.cursorrules`, `.agentrules`, etc.) were missing robust bilingual routing. Applied standard, unambiguous instructions:
  > *If the user writes Turkish, read `tr/AGENTS.md`. If the user writes English or the language is unclear, read `en/AGENTS.md`.*

## 8. Demo Architecture and Target Testing

- Scaffolded a complete demo target in `examples/minimal-saas` populated with functional template files.
- Running `agent-os verify --target examples/minimal-saas` passes successfully with zero errors.

## 9. Test Suite Verification & The Honesty Boundary

- Added the `Tech-Debt Delta` rule into the EVIDENCE_MANIFEST_TEMPLATE.md for both EN and TR contexts.
- Strengthened the pytest suite in test_governance.py to check for these manifest additions and validate standard locale routing in the root adapters.
