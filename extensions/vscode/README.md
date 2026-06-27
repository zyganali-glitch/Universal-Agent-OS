# Universal Agent OS (VS Code Extension)

This is the official Enterprise IDE extension for the **Universal Agent OS**, a consultation-first governance framework for AI coding agents.

## What's New in v1.1.0 🚀
- **Day-0 Setup (Init Workspace)**: One-click initialization! Automatically generates a boilerplate `AGENTS.md` and Phase-0 interview script for any new project.
- **Smart Dependency Management**: No more ugly terminal errors. Graceful toast notifications guide you to initialize the workspace if required scripts are missing.
- **Persistent Status Bar**: A dedicated `🛡️ Agent OS: Active` indicator lives in your VS Code status bar. Click it anytime to instantly verify your project's governance gate.

## Features

- **Init Workspace**: Use `Agent OS: Init Workspace` to prepare your environment.
- **Start Phase-0 Interview**: Instantly trigger the Phase-0 onboarding interview for your AI agent (Cursor, GitHub Copilot, Claude, etc.) directly from the Command Palette.
- **Verify Governance Gate**: Click the Status Bar icon or use the Command Palette to run verification checks (`agent-os verify`) inside VS Code.
- **Anti-Monolith Warning**: Monitors file sizes and warns you if your files exceed the configured line limit.
- **Zero-Zombie-Code Policy**: Highlights `// TODO` and `// FIXME` comments to ensure they are tracked.

## Usage

1. **Install & Init**: Open a project and run `Agent OS: Init Workspace` from the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. **Phase 0**: Run `Agent OS: Start Phase-0 Interview` to align your AI.
3. **Verify**: Click the `🛡️ Agent OS: Active` button in the bottom right corner before committing code.

## License

MIT License.
