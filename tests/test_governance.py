"""
test_governance.py — Validates that all required governance files are present,
non-empty, and contain the expected content at the repository root and within
each locale pack.
"""
import pathlib
import re
import json

import pytest


class TestRootGovernanceFiles:
    """Tests for governance files that must exist at the repo root."""

    def test_agents_md_exists(self, root_dir: pathlib.Path):
        """AGENTS.md must exist at the repository root."""
        assert (root_dir / "AGENTS.md").is_file(), "AGENTS.md is missing from the repo root"

    def test_readme_exists_and_is_non_empty(self, root_dir: pathlib.Path):
        """README.md must exist and contain meaningful content."""
        readme = root_dir / "README.md"
        assert readme.is_file(), "README.md is missing from the repo root"
        content = readme.read_text(encoding="utf-8")
        assert len(content.strip()) > 0, "README.md is empty"

    def test_version_file_matches_semver(self, root_dir: pathlib.Path):
        """VERSION file must exist and match a semver pattern (MAJOR.MINOR.PATCH)."""
        version_file = root_dir / "VERSION"
        assert version_file.is_file(), "VERSION file is missing"
        version_text = version_file.read_text(encoding="utf-8").strip()
        semver_pattern = r"^\d+\.\d+\.\d+$"
        assert re.match(semver_pattern, version_text), (
            f"VERSION content '{version_text}' does not match semver pattern"
        )

    def test_changelog_exists(self, root_dir: pathlib.Path):
        """CHANGELOG.md must exist at the repo root."""
        assert (root_dir / "CHANGELOG.md").is_file(), "CHANGELOG.md is missing"

    def test_licensing_md_exists(self, root_dir: pathlib.Path):
        """LICENSING.md must exist at the repo root."""
        assert (root_dir / "LICENSING.md").is_file(), "LICENSING.md is missing"

    def test_licensing_md_contains_licensing_model(self, root_dir: pathlib.Path):
        """LICENSING.md must describe the project's licensing model."""
        content = (root_dir / "LICENSING.md").read_text(encoding="utf-8")
        assert "Licensing Model" in content or "license" in content.lower(), (
            "LICENSING.md does not mention any licensing model"
        )

    def test_license_file_exists(self, root_dir: pathlib.Path):
        """LICENSE file must exist at the repo root."""
        assert (root_dir / "LICENSE").is_file(), "LICENSE file is missing"

    def test_init_script_bash_exists(self, root_dir: pathlib.Path):
        """init-agent-os.sh must exist at the repo root."""
        assert (root_dir / "init-agent-os.sh").is_file(), "init-agent-os.sh is missing"

    def test_init_script_powershell_exists(self, root_dir: pathlib.Path):
        """init-agent-os.ps1 must exist at the repo root."""
        assert (root_dir / "init-agent-os.ps1").is_file(), "init-agent-os.ps1 is missing"


class TestLocaleGovernanceFiles:
    """Tests for required governance files inside each locale pack."""

    @pytest.mark.parametrize("filename", [
        "AGENTS.md",
        "AGENT_OS_RULES.md",
        "AGENT_OS_PLAN_TEMPLATE.md",
    ])
    def test_en_locale_has_required_file(self, root_dir: pathlib.Path, filename: str):
        """EN locale pack must contain each required governance file."""
        path = root_dir / "en" / filename
        assert path.is_file(), f"en/{filename} is missing"

    @pytest.mark.parametrize("filename", [
        "AGENTS.md",
        "AGENT_OS_RULES.md",
        "AGENT_OS_PLAN_TEMPLATE.md",
    ])
    def test_tr_locale_has_required_file(self, root_dir: pathlib.Path, filename: str):
        """TR locale pack must contain each required governance file."""
        path = root_dir / "tr" / filename
        assert path.is_file(), f"tr/{filename} is missing"


class TestCollectiveMemoryFiles:
    """Tests for Collective Memory template files inside each locale pack."""

    @pytest.mark.parametrize("filename", [
        "AGENT_MEMORY_AND_LESSONS.md",
        "AGENT_ARCHITECTURE_AND_PATTERNS.md",
        "AGENT_ENVIRONMENT_AND_API.md",
        "AGENT_USER_PREFERENCES.md",
    ])
    def test_en_locale_has_collective_memory_file(self, root_dir: pathlib.Path, filename: str):
        """EN locale pack must contain each Collective Memory template file."""
        path = root_dir / "en" / filename
        assert path.is_file(), f"en/{filename} is missing"

    @pytest.mark.parametrize("filename", [
        "AGENT_MEMORY_AND_LESSONS.md",
        "AGENT_ARCHITECTURE_AND_PATTERNS.md",
        "AGENT_ENVIRONMENT_AND_API.md",
        "AGENT_USER_PREFERENCES.md",
    ])
    def test_tr_locale_has_collective_memory_file(self, root_dir: pathlib.Path, filename: str):
        """TR locale pack must contain each Collective Memory template file."""
        path = root_dir / "tr" / filename
        assert path.is_file(), f"tr/{filename} is missing"


class TestEvidenceManifestTemplate:
    """Tests for the Evidence Manifest Template."""

    def test_evidence_manifest_exists(self, root_dir: pathlib.Path):
        """EVIDENCE_MANIFEST_TEMPLATE.md must exist in docs/."""
        assert (root_dir / "docs" / "EVIDENCE_MANIFEST_TEMPLATE.md").is_file(), "EVIDENCE_MANIFEST_TEMPLATE.md is missing"

    def test_evidence_manifest_contains_debt_delta(self, root_dir: pathlib.Path):
        """EVIDENCE_MANIFEST_TEMPLATE.md must contain Tech-Debt Delta requirement."""
        content = (root_dir / "docs" / "EVIDENCE_MANIFEST_TEMPLATE.md").read_text(encoding="utf-8")
        assert "Tech-Debt Delta" in content, "Tech-Debt Delta is missing from EVIDENCE_MANIFEST_TEMPLATE.md"


class TestRootAdapters:
    """Tests for root AI adapter files."""

    @pytest.mark.parametrize("filename", [
        "CLAUDE.md",
        "GEMINI.md",
        "AIDER.md",
        ".cursorrules",
        ".agentrules",
        ".devinrules",
        ".clinerules",
        ".windsurfrules",
        ".roorules",
        ".openhands_instructions",
        ".github/copilot-instructions.md"
    ])
    def test_adapter_contains_locale_routing(self, root_dir: pathlib.Path, filename: str):
        """Root adapters must contain strict locale routing text."""
        path = root_dir / filename
        if path.is_file():
            content = path.read_text(encoding="utf-8")
            assert "tr/AGENTS.md" in content, f"{filename} is missing TR locale routing"
            assert "en/AGENTS.md" in content, f"{filename} is missing EN locale routing"


class TestHardeningV120:
    """Additional strict checks for v1.2.0 hardening."""

    def test_version_sync(self, root_dir: pathlib.Path):
        """VERSION must match package.json version."""
        version_text = (root_dir / "VERSION").read_text(encoding="utf-8").strip()
        pkg_json = json.loads((root_dir / "package.json").read_text(encoding="utf-8"))
        assert version_text == pkg_json.get("version"), "VERSION does not match package.json version"

    def test_package_license(self, root_dir: pathlib.Path):
        """package.json license must be MIT."""
        pkg_json = json.loads((root_dir / "package.json").read_text(encoding="utf-8"))
        assert pkg_json.get("license") == "MIT", "package.json license is not MIT"

    def test_licensing_md_no_commercial_restrictions(self, root_dir: pathlib.Path):
        """LICENSING.md must not contain commercial restriction phrases."""
        content = (root_dir / "LICENSING.md").read_text(encoding="utf-8").lower()
        forbidden = [
            "no redistribution",
            "no resale",
            "internal use only",
            "commercial license required",
            "evaluation license"
        ]
        for phrase in forbidden:
            assert phrase not in content, f"Forbidden phrase '{phrase}' found in LICENSING.md"

    @pytest.mark.parametrize("filename", [
        "CLAUDE.md", "GEMINI.md", "AIDER.md", ".cursorrules", ".agentrules",
        ".devinrules", ".clinerules", ".windsurfrules", ".roorules",
        ".openhands_instructions", ".github/copilot-instructions.md"
    ])
    def test_root_adapters_no_typos(self, root_dir: pathlib.Path, filename: str):
        """Root adapters must not contain formatting typos for locale routing."""
        path = root_dir / filename
        if path.is_file():
            content = path.read_text(encoding="utf-8")
            assert "r/AGENTS.md" not in content.replace("tr/AGENTS.md", ""), f"Typo r/AGENTS.md found in {filename}"
            assert "\\tr/AGENTS.md" not in content, f"Typo \\tr/AGENTS.md found in {filename}"
            assert "\tr/AGENTS.md" not in content, f"Typo tabbed \\tr/AGENTS.md found in {filename}"

    def test_cli_init_locale_parse(self, root_dir: pathlib.Path):
        """cli/init.js must parse --locale properly."""
        content = (root_dir / "cli" / "init.js").read_text(encoding="utf-8")
        assert "--locale" in content, "cli/init.js missing --locale parse logic"
        assert "args.indexOf('--locale')" in content, "cli/init.js missing indexOf('--locale')"

    def test_demo_repo_bootstrap_plan(self, root_dir: pathlib.Path):
        """examples/minimal-saas must have 001-bootstrap.md."""
        assert (root_dir / "examples" / "minimal-saas" / "plans" / "001-bootstrap.md").is_file()

    def test_demo_repo_evidence_manifest(self, root_dir: pathlib.Path):
        """examples/minimal-saas EVIDENCE_MANIFEST.md must contain Tech-Debt Delta."""
        path = root_dir / "examples" / "minimal-saas" / "docs" / "EVIDENCE_MANIFEST.md"
        assert path.is_file()
        assert "Tech-Debt Delta" in path.read_text(encoding="utf-8")

    def test_vscode_extension_phase0_start(self, root_dir: pathlib.Path):
        """VS Code extension must call phase0_interview.py with 'start' argument."""
        path = root_dir / "extensions" / "vscode" / "src" / "extension.ts"
        assert path.is_file()
        content = path.read_text(encoding="utf-8")
        assert "phase0_interview.py start" in content, "VS Code missing 'start' argument for Phase-0"

    def test_cli_verify_package_mode_coverage(self, root_dir: pathlib.Path):
        """cli/verify.js package mode must check required files."""
        path = root_dir / "cli" / "verify.js"
        assert path.is_file()
        content = path.read_text(encoding="utf-8")
        required_checks = [
            "requirements-dev.txt",
            "skills/agent-os-memory/SKILL.md",
            ".github/workflows/agent-compliance-check.yml"
        ]
        for rc in required_checks:
            assert f"check('{rc}'" in content, f"verify.js package mode missing check for {rc}"

