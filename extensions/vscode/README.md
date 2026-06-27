# Universal Agent OS (VS Code Extension)

This is the official Enterprise IDE extension for the **Universal Agent OS**, a consultation-first governance framework for AI coding agents.

## What's New in v1.2.0 (Super Init) 🚀
- **Cloud Fetch Initialization**: `Agent OS: Init Workspace` now acts as an intelligent cloud installer. Instead of generating generic boilerplates, it securely fetches the latest `AGENT_MEMORY_AND_LESSONS`, global plans, and the `Phase-0` interview scripts directly from the official Universal Agent OS GitHub repository and configures them into a dedicated `.agentos` folder inside your workspace. You always get the absolute latest brain!
- **Persistent Status Bar**: A dedicated `🛡️ Agent OS: Active` indicator lives in your VS Code status bar. Click it anytime to instantly verify your project's governance gate.

## Features

- **Init Workspace**: Use `Agent OS: Init Workspace` to download the core OS architecture into any empty project.
- **Start Phase-0 Interview**: Instantly trigger the Phase-0 onboarding interview for your AI agent (Cursor, GitHub Copilot, Claude, etc.) directly from the Command Palette.
- **Verify Governance Gate**: Click the Status Bar icon or use the Command Palette to run verification checks inside VS Code.
- **Anti-Monolith Warning**: Monitors file sizes and warns you if your files exceed the configured line limit.
- **Zero-Zombie-Code Policy**: Highlights `// TODO` and `// FIXME` comments to ensure they are tracked.

## Usage

1. **Install & Init**: Open a project and run `Agent OS: Init Workspace` from the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. **Phase 0**: Run `Agent OS: Start Phase-0 Interview` to align your AI.
3. **Verify**: Click the `🛡️ Agent OS: Active` button in the bottom right corner before committing code.

## License

MIT License.
