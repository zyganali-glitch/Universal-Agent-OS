# Installation Manifest

This manifest defines what a first-time install must place in the user's workspace.

## VS Code Extension And Bootstrap Installs

`Agent OS: Init Workspace`, `init-agent-os.ps1`, and `init-agent-os.sh` install the same runtime governance payload:

- the selected locale pack (`en/` or `tr/`) into the workspace root
- root governance files such as `AGENTS.md`, `AGENT_OS_RULES.md`, `AGENT_OS_PLAN_TEMPLATE.md`
- Collective Memory files:
  - `AGENT_MEMORY_AND_LESSONS.md`
  - `AGENT_ARCHITECTURE_AND_PATTERNS.md`
  - `AGENT_ENVIRONMENT_AND_API.md`
  - `AGENT_USER_PREFERENCES.md`
- agent adapter files such as `CLAUDE.md`, `GEMINI.md`, `AIDER.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.codex/AGENTS.md`
- shared Agent OS directories:
  - `.agent/`
  - `.github/`
  - `.gitlab/`
  - `agents/`
  - `docs/`
  - `examples/`
  - `mcp-server/`
  - `skills/`
- shared project files:
  - `CHANGELOG.md`
  - `LICENSE`
  - `LICENSING.md`
  - `VERSION`
  - `VERSIONING.md`
  - `agent_memory.json`
  - `init-agent-os.ps1`
  - `init-agent-os.sh`
  - `requirements-dev.txt`
  - `sweep.yaml`
  - `walkthrough.md`
- planning folders:
  - `plans/`
  - `plans/completed/`

The installed `docs/` directory includes the real-world adoption guides, including `REAL_WORLD_SCENARIOS.md`, `GOVERNANCE_PROFILES.md`, and the brownfield playbook.

## Existing Project Behavior

If the workspace already contains real project files, the VS Code extension and bootstrap scripts treat it as a legacy/brownfield project. The scripts also accept an explicit legacy flag for compatibility with automated workflows.

In that mode:

- `TECH_DEBT_AND_SECURITY.md` is created when missing.
- overwritten file collisions are backed up under `.agentos-backups/`.
- an existing user `README.md` is preserved; the Agent OS readme is installed as `AGENT_OS_README.md`.
- old code is quarantined conceptually; new work must follow Agent OS governance.

## What Is Not Installed Into Target Projects

The installer does not copy source-package development surfaces that are only needed to maintain this repository:

- `extensions/vscode/`
- `tests/`
- local build caches
- `.git/`
- `node_modules/`

This keeps user workspaces usable while still installing the complete runtime governance system.
