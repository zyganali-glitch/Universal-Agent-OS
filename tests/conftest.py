"""
Shared fixtures for the Universal Agent OS test suite.

Provides path references, locale lists, and governance file
inventories used across all test modules.
"""
import pathlib
import pytest


@pytest.fixture(scope="session")
def root_dir() -> pathlib.Path:
    """Return the absolute path of the repository root."""
    return pathlib.Path(__file__).resolve().parent.parent


@pytest.fixture(scope="session")
def locale_dirs():
    """Return the list of supported locale directory names."""
    return ["en", "tr"]


@pytest.fixture(scope="session")
def required_governance_files():
    """Return governance files that must exist inside every locale pack."""
    return [
        "AGENTS.md",
        "AGENT_OS_RULES.md",
        "AGENT_OS_PLAN_TEMPLATE.md",
    ]


@pytest.fixture(scope="session")
def root_governance_files():
    """Return governance files that must exist at the repo root."""
    return [
        "AGENTS.md",
        "README.md",
        "VERSION",
        "CHANGELOG.md",
        "LICENSING.md",
        "LICENSE",
    ]


@pytest.fixture(scope="session")
def collective_memory_files():
    """Return Collective Memory files that must exist inside every locale pack."""
    return [
        "AGENT_MEMORY_AND_LESSONS.md",
        "AGENT_ARCHITECTURE_AND_PATTERNS.md",
        "AGENT_ENVIRONMENT_AND_API.md",
        "AGENT_USER_PREFERENCES.md",
    ]
