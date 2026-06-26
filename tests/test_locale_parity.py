"""
test_locale_parity.py — Validates that EN and TR locale packs maintain
structural parity: same file names, same directory layout.
"""
import pytest
from pathlib import Path


def test_locale_directories_exist(root_dir):
    """Ensure both locale directories exist."""
    assert (root_dir / "en").is_dir()
    assert (root_dir / "tr").is_dir()


def test_locale_parity_agents(root_dir):
    """Ensure both locales have AGENTS.md."""
    assert (root_dir / "en" / "AGENTS.md").is_file()
    assert (root_dir / "tr" / "AGENTS.md").is_file()


def test_locale_parity_rules(root_dir):
    """Ensure both locales have AGENT_OS_RULES.md."""
    assert (root_dir / "en" / "AGENT_OS_RULES.md").is_file()
    assert (root_dir / "tr" / "AGENT_OS_RULES.md").is_file()


def test_locale_parity_plan_template(root_dir):
    """Ensure both locales have AGENT_OS_PLAN_TEMPLATE.md."""
    assert (root_dir / "en" / "AGENT_OS_PLAN_TEMPLATE.md").is_file()
    assert (root_dir / "tr" / "AGENT_OS_PLAN_TEMPLATE.md").is_file()


def test_locale_parity_adapters(root_dir):
    """Ensure both locales have the core agent adapter files."""
    adapters = ["CLAUDE.md", "GEMINI.md", "AIDER.md"]
    for adapter in adapters:
        assert (root_dir / "en" / adapter).is_file(), f"en/{adapter} missing"
        assert (root_dir / "tr" / adapter).is_file(), f"tr/{adapter} missing"


def test_locale_parity_collective_memory(root_dir):
    """Ensure both locales have the Collective Memory template files."""
    memory_files = [
        "AGENT_MEMORY_AND_LESSONS.md",
        "AGENT_ARCHITECTURE_AND_PATTERNS.md",
        "AGENT_ENVIRONMENT_AND_API.md",
        "AGENT_USER_PREFERENCES.md",
    ]
    for mf in memory_files:
        assert (root_dir / "en" / mf).is_file(), f"en/{mf} missing"
        assert (root_dir / "tr" / mf).is_file(), f"tr/{mf} missing"


def test_locale_parity_readme(root_dir):
    """Ensure both locales have a README.md."""
    assert (root_dir / "en" / "README.md").is_file()
    assert (root_dir / "tr" / "README.md").is_file()
