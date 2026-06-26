# Universal Agent OS

[![Demo Video](https://img.youtube.com/vi/5NhIS0996zI/0.jpg)](https://www.youtube.com/watch?v=5NhIS0996zI)

Universal Agent OS is a consultation-first governance framework for AI coding agents.

This repository is the source package for that framework. Its job is to turn loose agent sessions into a governed delivery model: interview first, plan before code, track evidence, force explicit validation, and keep cross-session memory and routing surfaces aligned.

You can think of it as a governance compiler: the package helps an agent turn Phase 0 answers into repo-specific rules, plans, roles, prompts, and workflows.

## Honest Status

This repository is already usable, but it is not finished in every dimension.

What is real today:
- installable locale packs in English and Turkish
- PowerShell and Bash bootstrap scripts
- donor governance files for rules, plans, adapters, and workflows
- a root registry chain for instruction -> skill -> role -> prompt -> workflow routing
- a compliance workflow that checks required package surfaces
- an example non-web skeleton under `examples/minimal-cli/`

What is now fully packaged (Enterprise-Ready v1.0.0):
- a published `agent-os` CLI tool (`npx agent-os init`, `verify`)
- an automated `gate-run` toolchain (via CLI and GitHub Actions)
- a VS Code extension framework for IDE-native Phase-0 interviews
- a closed v1 productization roadmap with pre-commit and CI enforcement
So the honest framing is this:

This repo is already a serious source package and bootstrapable alpha for agent governance. It is not yet the fully packaged end-state product described by the long-term roadmap.

## Why This Exists

Most agent-driven repos fail in predictable ways:
- no stable startup interview
- no durable planning surface
- no shared definition of done
- no record of discovered work
- no honest distinction between "edited" and "validated"
- no reliable handoff between sessions or tools

Universal Agent OS exists to add that missing discipline without forcing every team to reinvent it from scratch.

## Why It Feels Bureaucratic

Yes, this package is intentionally bureaucratic.

It adds friction early so that agent-built repos are less chaotic later. The goal is not ceremony for its own sake. The goal is to stop the common failure mode where an agent writes a lot of code quickly, leaves no trustworthy plan behind, and creates a repo that becomes expensive to change after a week.

## What The Bureaucracy Buys You

- a required Phase 0 interview before implementation
- a repo-root planning template instead of improvised task tracking
- a single active-plan source of truth
- explicit discovered-work tracking instead of hidden scope drift
- evidence-first closure instead of narrative-only "done" claims
- add-only governance hardening instead of blind overwrite
- clearer multi-agent ownership and safer handoffs
- a path toward generated domain-specific instructions, skills, roles, and prompts

If you want a zero-ceremony prompt pack, this repo is probably too heavy.

If you want a long-lived agent-built repo to stay legible, testable, and governable, the overhead is intentional.

## What Ships In This Repository

Core package surfaces:
- `en/AGENT_OS_RULES.md` and `tr/AGENT_OS_RULES.md`
- `en/AGENTS.md` and `tr/AGENTS.md`
- `en/AGENT_OS_PLAN_TEMPLATE.md` and `tr/AGENT_OS_PLAN_TEMPLATE.md`
- locale adapter surfaces under `en/` and `tr/`

Bootstrap surfaces:
- `init-agent-os.ps1`
- `init-agent-os.sh`

Phase 1 root architecture surfaces:
- `.github/instructions/_ARCHITECTURE.md`
- `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json`
- `.agent/skills/_SKILL_TEMPLATE_REGISTRY.json`
- `.github/agents/_AGENT_ROLE_REGISTRY.json`
- `.github/prompts/_PROMPT_TEMPLATE_REGISTRY.json`
- `.agent/workflows/_WORKFLOW_DOMAIN_ROUTING.json`

Together, these root registries define the package-level auto-activation chain before locale-pack specialization or target-repo generation.

## Product Shape

Today, this repository is best understood as:

1. a maintained source-of-truth package
2. a locale-pack installer
3. a donor governance library
4. a Phase 1 routing architecture for future generation and tooling

It is rapidly maturing into:

1. a polished one-command consumer product (via `agent-os` CLI)
2. a finished automation platform (via GitHub Actions & pre-commit hooks)
3. an extensible IDE ecosystem (via VS Code scaffold)

## How It Works

1. Install a locale pack into a target repository.
2. Start an agent session and force the governance bootstrap flow.
3. Run a Phase 0 interview to capture platform, scale, risk, and quality expectations.
4. Harden or generate the repo-root governance spine.
5. Create the roadmap and execution plans before implementation.
6. Route work through scoped instructions, skills, roles, prompts, and workflows.

## Getting Started

Windows / PowerShell:

```powershell
./init-agent-os.ps1 -TargetDir <your-project-path> -Locale en
```

macOS/Linux / bash:

```bash
./init-agent-os.sh <your-project-path>
```

Manual fallback:

1. Copy one locale pack (`en/` or `tr/`) into the target repository root.
2. Open the target repository in your AI-enabled IDE or agent runtime.
3. Ask the agent to read `AGENTS.md` and `.agent/workflows/session-bootstrap.md`.
4. Complete the Phase 0 interview before implementation begins.

## Who This Is For

- teams building serious internal agent workflows
- agencies standardizing repo bootstrap discipline
- founders who want an agent to do more than just autocomplete
- platform teams that need repeatable governance across multiple repos

## Who This Is Not For

- teams that want agents to improvise without planning overhead
- single-file prototype workflows where no lasting governance is desired

## Roadmap Honesty

The repo has evolved from a markdown-first starter kit into a productized governance system (v1.0.0 Enterprise Ready).

That transition is visible in the package shape, bootstrap scripts, locale packs, CLI tools, VS Code scaffolding, and automated CI/CD enforcer actions.

That is why the README makes this claim:
- this repository is a fully productized governance package, complete with CLI, IDE extension framework, and strict CI/CD enforcement.

## Repository Layout

- `en/`, `tr/`: locale packs and operator-facing adapter surfaces
- `tests/`: test suite validating structural parity and governance presence
- `docs/`: architecture diagrams, onboarding, and evidence manifest templates
- `examples/`: reference implementations (Phase-0 scripts, Docker, .env)
- `.github/instructions/`: architecture and scoped-instruction registries
- `.github/agents/`: role-template system and registries
- `.github/prompts/`: prompt-template system and registries
- `.agent/skills/`: root skill-template library and registries
- `.agent/workflows/`: root workflow routing surfaces
- `plans/`: active roadmap and architecture/productization work

## Bottom Line

Universal Agent OS is a governance-heavy package on purpose.

It will feel slower than unstructured prompting at the beginning of a project. The trade-off is that it gives agent-built repos a better chance of staying coherent after the first burst of code generation.

If that trade-off matters to you, this repository is already useful today.

If you want the completely packaged end-state, the roadmap is honest about the fact that part of that work is still ahead.