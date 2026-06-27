# Universal Agent OS (VS Code Extension)

This is the official Enterprise IDE extension for the **Universal Agent OS**, a consultation-first governance framework for AI coding agents.

## What's New in v1.4.1 (The Adapter Fix) 🚀
- **Root Adapter Injection**: Fixed a silent bug where root IDE adapters (`.cursorrules`, `.windsurfrules`, `.devinrules`, etc.) were skipped during installation. The OS now correctly copies all platform-specific adapter dotfiles to the root of your workspace, ensuring zero-config discovery works flawlessly across all IDEs.

## What's New in v1.4.0 (The Unified Installer) 🚀
- **Unified Cloud Fetch**: `Agent OS: Init Workspace` now perfectly mirrors the CLI installer behavior. It asks for your preferred language pack (English/Turkish), securely fetches the latest architecture from GitHub, and installs it directly into your root folder ensuring 100% "Zero-Config Auto-Discovery" compatibility with all AI agents.
- **Legacy Quarantine Auto-Detect**: The extension automatically scans your folder. If it detects an existing codebase, it drops a strict `TECH_DEBT_AND_SECURITY.md` file to prevent AI from blindly rewriting your old spaghetti code.
- **Persistent Status Bar**: A dedicated `🛡️ Agent OS: Active` indicator lives in your VS Code status bar. Click it anytime to instantly verify your project's governance gate.

## Features

- **Init Workspace**: Use `Agent OS: Init Workspace` to download the core OS architecture into your project.
- **Start Phase-0 Interview**: Instantly trigger the Phase-0 onboarding interview directly from the Command Palette.
- **Verify Governance Gate**: Click the Status Bar icon or use the Command Palette to run verification checks inside VS Code.
- **Anti-Monolith Warning**: Monitors file sizes and warns you if your files exceed the configured line limit.
- **Zero-Zombie-Code Policy**: Highlights `// TODO` and `// FIXME` comments to ensure they are tracked.

## Usage

1. **Install & Init**: Open an empty project (or legacy project) and run `Agent OS: Init Workspace` from the Command Palette (`Ctrl+Shift+P`).
2. **Phase 0**: Run `Agent OS: Start Phase-0 Interview` to align your AI.
3. **Verify**: Click the `🛡️ Agent OS: Active` button in the bottom right corner before committing code.

## License

MIT License.
