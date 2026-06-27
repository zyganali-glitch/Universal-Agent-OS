# Master Roadmap: Minimal SaaS Demo

## Phase-0 Decision Summary
- **Project Type**: Web SaaS
- **Stack**: Next.js, Node.js, PostgreSQL
- **Languages**: English, Turkish
- **Legacy Mode**: False

## Core Rules & Governance
1. **No Coding Before Plan**: No implementation occurs until the master roadmap and the active child plan are verified.
2. **Evidence-First Closure**: No task is closed as "Verified" without concrete evidence (e.g. test logs, file links) logged in the Evidence Manifest.
3. **Verification Command**: `agent-os verify --target examples/minimal-saas` must pass at all times.

## Validation Gates
- Supreme Constitution Gate
- Anti-Monolith Gate
- Zero-Zombie-Code Gate
- Locales & Routing Gate

## Child Execution Plans
- [x] `001-bootstrap.md` - Core repo initialization and Agent OS install.
- [ ] `002-database-schema.md` - Setup PostgreSQL schemas and migrations.
- [ ] `003-frontend-layout.md` - Next.js routing and UI shell.
