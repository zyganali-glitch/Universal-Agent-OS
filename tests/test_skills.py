"""
test_skills.py — Validates that every skill directory under skills/ contains
a well-formed SKILL.md with valid YAML frontmatter.
"""
import pathlib
import re

import pytest
import yaml


def _discover_skill_dirs(root: pathlib.Path):
    """Return a list of immediate child directories under skills/."""
    skills_root = root / "skills"
    if not skills_root.is_dir():
        return []
    return [d for d in skills_root.iterdir() if d.is_dir()]


def _parse_frontmatter(text: str) -> dict | None:
    """Extract YAML frontmatter from a markdown file.

    Returns the parsed dict or None if no frontmatter is found.
    """
    match = re.match(r"^---\s*\n(.*?)\n---", text, re.DOTALL)
    if not match:
        return None
    return yaml.safe_load(match.group(1))


class TestSkillDirectories:
    """Tests for skill directory structure and SKILL.md content."""

    def test_skills_directory_exists(self, root_dir: pathlib.Path):
        """The skills/ directory must exist at the repo root."""
        assert (root_dir / "skills").is_dir(), "skills/ directory is missing"

    def test_at_least_one_skill_exists(self, root_dir: pathlib.Path):
        """There must be at least one skill directory under skills/."""
        skill_dirs = _discover_skill_dirs(root_dir)
        assert len(skill_dirs) > 0, "No skill directories found under skills/"

    def test_all_skill_dirs_have_skill_md(self, root_dir: pathlib.Path):
        """Every skill directory must contain a SKILL.md file."""
        skill_dirs = _discover_skill_dirs(root_dir)
        for skill_dir in skill_dirs:
            skill_md = skill_dir / "SKILL.md"
            assert skill_md.is_file(), f"{skill_dir.name}/SKILL.md is missing"

    def test_skill_md_has_valid_frontmatter(self, root_dir: pathlib.Path):
        """SKILL.md files must have YAML frontmatter with 'name' and 'description'."""
        skill_dirs = _discover_skill_dirs(root_dir)
        for skill_dir in skill_dirs:
            skill_md = skill_dir / "SKILL.md"
            if not skill_md.is_file():
                pytest.skip(f"{skill_dir.name}/SKILL.md does not exist")
            content = skill_md.read_text(encoding="utf-8")
            fm = _parse_frontmatter(content)
            assert fm is not None, f"{skill_dir.name}/SKILL.md has no YAML frontmatter"
            assert "name" in fm, f"{skill_dir.name}/SKILL.md frontmatter missing 'name'"
            assert "description" in fm, f"{skill_dir.name}/SKILL.md frontmatter missing 'description'"

    def test_skill_frontmatter_name_matches_directory(self, root_dir: pathlib.Path):
        """The 'name' in SKILL.md frontmatter should correspond to the directory name."""
        skill_dirs = _discover_skill_dirs(root_dir)
        for skill_dir in skill_dirs:
            skill_md = skill_dir / "SKILL.md"
            if not skill_md.is_file():
                continue
            content = skill_md.read_text(encoding="utf-8")
            fm = _parse_frontmatter(content)
            if fm is None or "name" not in fm:
                continue
            # Normalise: remove hyphens/underscores and lowercase
            dir_normalised = skill_dir.name.replace("-", "").replace("_", "").lower()
            if dir_normalised.endswith("skill"):
                dir_normalised = dir_normalised[:-5]
            name_normalised = fm["name"].replace("-", "").replace("_", "").lower()
            assert name_normalised == dir_normalised, (
                f"Skill name '{fm['name']}' does not match directory '{skill_dir.name}'"
            )
