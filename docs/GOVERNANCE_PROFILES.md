# Governance Profiles

## Purpose

Governance profiles help users choose the right amount of ceremony without changing the Universal Agent OS spine.

Every profile keeps the honesty boundary:

- no `PASS` without evidence
- no hidden scope expansion
- no undocumented behavior change
- no brownfield rewrite without explicit user approval
- memory and architecture updates when behavior changes

The profile only changes how much evidence, planning, and review is required for the risk level.

---

## Profile Matrix

| Profile | Best For | Planning Depth | Required Evidence | Typical Gates |
|---|---|---|---|---|
| `light` | solo developers, tiny scripts, prototypes | short scope note plus task list | changed files, one relevant check, Tech-Debt Delta | smoke or syntax check |
| `standard` | serious personal projects, startups, small teams | Phase-0, master roadmap, child plans | tests, verification command, docs sync | smoke, related tests, target verify |
| `strict` | agencies, corporate teams, regulated domains | full Phase-0, roadmap portfolio, explicit risk register | evidence manifest, CI/PR proof, NOT_RUN list | CI, package/target verify, security/privacy review |

---

## Light Profile

Use for small, low-risk work where heavy process would slow the user down.

Required:

- state the narrow scope
- list changed files
- run the smallest relevant check
- report Tech-Debt Delta

Do not use for:

- architecture changes
- auth, billing, payments, data deletion, security, or migration work
- multi-file feature work with unclear requirements

---

## Standard Profile

Use for normal product work.

Required:

- Phase-0 for unclear or new work
- `plans/master-roadmap.md`
- child execution plans before implementation
- Collective Memory update when a decision or lesson changes
- Architecture update when structure or integration changes
- README or user-facing docs update when behavior changes

This is the recommended default.

---

## Strict Profile

Use when failures are expensive.

Required:

- full evidence manifest
- explicit risk section
- CI or reproducible local gate output
- PR/issue template usage
- security/privacy review where applicable
- documented `NOT_RUN` gates
- no auto-refactor of legacy code

Strict mode should feel slower. That is intentional for high-risk work.

---

## CLI Status

Future CLI idea:

```bash
agent-os init --profile light|standard|strict
```

Status: Planned for a future release.

Until then, agents and users can apply these profiles manually through `AGENTS.md`, `AGENT_OS_PLAN_TEMPLATE.md`, and the active plan.
