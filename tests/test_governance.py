"""
test_governance.py — Validates that all required governance files are present,
non-empty, and contain the expected content at the repository root and within
each locale pack.
"""
import pathlib
import re

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
