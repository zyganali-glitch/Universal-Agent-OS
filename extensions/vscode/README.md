# Universal Agent OS (VS Code Extension)

This is the official Enterprise IDE extension for the **Universal Agent OS**, a consultation-first governance framework for AI coding agents.

## What's New in v1.4.6 (Status Intelligence)
- **Conditional Status Bar**: Status bar now shows `Agent OS: Active`, `Not Initialized`, or `No Workspace` based on your project's governance state, and updates dynamically via file watchers.
- **Git Error Guidance**: Improved error messaging when Git is not installed or network fails during initialization — now suggests Git install link and ZIP fallback.
- **Changelog Cleanup**: Fixed changelog ordering and added NPM publishing badges to main README.

## What's New in v1.4.4 (Guided Workflows)
- **Next Steps File**: Init now creates and opens `NEXT_STEPS.md` so beginners immediately know what to do after installation.
- **Brownfield Snapshot**: Existing projects receive an initial top-level folder summary inside `TECH_DEBT_AND_SECURITY.md`.
- **Command Palette Shortcuts**: Added Fast-Track, Status, and Closure Check commands for common governance workflows.

## What's New in v1.4.3 (Install Integrity)
- **Full Runtime Payload**: `Agent OS: Init Workspace` now installs the selected locale pack plus shared docs, skills, registries, workflows, examples, MCP server, and CI templates.
- **Clean vs Existing Project Detection**: Existing project detection now runs before files are copied, so empty folders are not mistakenly marked as legacy projects.
- **Brownfield Safety**: Existing projects receive `TECH_DEBT_AND_SECURITY.md`, collision backups under `.agentos-backups/`, and user `README.md` preservation via `AGENT_OS_README.md`.
- **Local Verification**: `Agent OS: Verify Governance Gate` now checks required workspace files inside VS Code instead of relying on a public npm CLI.

## What's New in v1.4.2 (True IDE Parity) 🚀
- **Target Project Adapters**: Fixed an architectural issue where root IDE adapters (`.cursorrules`, `.windsurfrules`, etc.) were copied directly instead of utilizing the target-specific adapters inside the `en/` and `tr/` locale packs. All major IDEs (Cursor, Devin, Windsurf, Roo, Cline, OpenHands) now successfully receive their localized, zero-config Agent OS adapters out of the box.

## What's New in v1.4.1 (The Adapter Fix) 🚀
- **Unified Cloud Fetch**: `Agent OS: Init Workspace` now perfectly mirrors the CLI installer behavior. It asks for your preferred language pack (English/Turkish), securely fetches the latest architecture from GitHub, and installs it directly into your root folder ensuring 100% "Zero-Config Auto-Discovery" compatibility with all AI agents.
- **Legacy Quarantine Auto-Detect**: The extension automatically scans your folder. If it detects an existing codebase, it drops a strict `TECH_DEBT_AND_SECURITY.md` file to prevent AI from blindly rewriting your old spaghetti code.
- **Persistent Status Bar**: A dedicated `🛡️ Agent OS` indicator lives in your VS Code status bar, showing `Active`, `Not Initialized`, or `No Workspace` based on your project state.

## Features

- **Init Workspace**: Use `Agent OS: Init Workspace` to download the runtime Agent OS architecture into your project.
- **Start Phase-0 Interview**: Instantly trigger the Phase-0 onboarding interview directly from the Command Palette.
- **Verify Governance Gate**: Click the Status Bar icon or use the Command Palette to run verification checks inside VS Code.
- **Fast-Track Prompt**: Copy the Fast-Track chat prompt from the Command Palette.
- **Show Status**: Create and open `AGENT_OS_STATUS.md` with required surface checks.
- **Closure Check Prompt**: Copy the closure checklist prompt before calling work done.
- **Anti-Monolith Warning**: Monitors file sizes and warns you if your files exceed the configured line limit.
- **Zero-Zombie-Code Policy**: Highlights `// TODO` and `// FIXME` comments to ensure they are tracked.

## Usage

1. **Install & Init**: Open an empty project (or legacy project) and run `Agent OS: Init Workspace` from the Command Palette (`Ctrl+Shift+P`).
2. **Phase 0**: Run `Agent OS: Start Phase-0 Interview` to align your AI.
3. **Payload**: For the exact file payload, see `docs/INSTALLATION_MANIFEST.md` in the main repository.
4. **Verify**: Use `Agent OS: Verify Governance Gate` from the Command Palette or the status bar before committing code.

## License

MIT License.
