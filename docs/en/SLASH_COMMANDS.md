# Agent Governance OS - Slash Commands

This guide helps operators and AI-assisted developers talk to the agent stack quickly, safely, and predictably. When you send one of these commands as a chat message, the agent should activate the relevant workflow instead of improvising.

## Ready-to-Use Commands

### `/bootstrap` or `/phase-0`
- **Purpose:** Start the Phase 0 interview before any code is written.
- **Use it when:** You are opening a new project or beginning a major new workstream.
- **Expected agent behavior:** The agent asks consultation-first questions to understand platform, scale, architecture risk, and quality expectations.

### `/resume` or `/continue`
- **Purpose:** Force the governed resume flow from the active plan.
- **Use it when:** A session was interrupted or the agent lost context.
- **Expected agent behavior:** The agent reloads governance files, finds the active plan, checks scope/gates/discovered work, and only then resumes execution.

### `/verify-gates`
- **Purpose:** Force the agent to rerun the relevant verification and gate checks.
- **Use it when:** You need proof that the current slice is actually validated.
- **Expected agent behavior:** The agent runs or restates the required checks, reports evidence, and does not claim closure without gate status.

### `/multi-role`
- **Purpose:** Trigger a multi-perspective review pass.
- **Use it when:** You want the agent to inspect the current solution as a novice user, maintainer, domain expert, or QA/security reviewer.
- **Expected agent behavior:** The agent highlights risks, clarity gaps, maintainability issues, and missed edge cases.

## Mentor Tip

These commands are useful because they reduce two common failure modes:
- analysis paralysis
- fast but ungoverned edits

Use `/resume` when you want the agent to prove where it is in the plan before touching code.