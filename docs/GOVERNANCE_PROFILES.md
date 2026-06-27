# Governance Profiles

## Purpose

Governance profiles help users choose the right operating mode without changing the Universal Agent OS spine.

Every profile keeps the honesty boundary:

- no `PASS` without evidence
- no hidden scope expansion
- no undocumented behavior change
- no brownfield rewrite without explicit user approval
- memory and architecture updates when behavior changes

The profile changes the amount of planning, review, and evidence required for the user's context. It does not weaken truthfulness.

---

## Profile Matrix

| Profile | Best For | Planning Depth | Required Evidence | Typical Gates |
|---|---|---|---|---|
| `solo` | individual experts, tiny tools, personal prototypes | short scope note plus task list | changed files, one relevant check, Tech-Debt Delta | smoke or syntax check |
| `startup` | founders, small teams, MVPs, agencies moving quickly | Phase-0 when scope is unclear, master roadmap, first child plans | tests, status check, docs sync | smoke, related tests, target verify |
| `enterprise` | companies, agencies with client obligations, internal platforms | full Phase-0, roadmap portfolio, ownership and handoff notes | evidence manifest, CI/PR proof, risk notes | CI, package/target verify, PR review |
| `regulated` | finance, healthcare, education data, legal, safety-sensitive work | full Phase-0, strict risk register, explicit approval points | evidence manifest, NOT_RUN list, security/privacy proof | CI, security/privacy review, data-handling review |

---

## Solo Profile

Use when a capable individual wants speed without losing the evidence habit.

Required:

- state the narrow scope
- list changed files
- run the smallest relevant check
- report Tech-Debt Delta

Do not use for auth, billing, payments, data deletion, security, migrations, or unclear multi-file features.

---

## Startup Profile

Use when the project needs momentum but must stay understandable.

Required:

- Phase-0 when the user request is vague
- master roadmap for product-level work
- child execution plan before implementation
- Collective Memory update when a decision or lesson changes
- README or user-facing docs update when behavior changes

This is the recommended default for serious solo and small-team projects.

---

## Enterprise Profile

Use when multiple people, clients, or teams depend on the repository.

Required:

- full Phase-0 for new initiatives
- roadmap portfolio with owners and handoff notes
- PR or issue templates for tracked work
- reproducible verification output
- architecture update when integration or ownership changes
- visible `NOT_RUN` gates

Enterprise mode should make agent work auditable by another developer later.

---

## Regulated Profile

Use when mistakes can create legal, financial, privacy, safety, or compliance risk.

Required:

- explicit risk register
- security/privacy review where applicable
- data-handling notes in `AGENT_ENVIRONMENT_AND_API.md`
- no simulated evidence unless marked `Simulated`
- no unapproved heavy infrastructure
- explicit `NOT_RUN` list for every skipped gate
- no auto-refactor of legacy code

Regulated mode should be slower. That is intentional.

---

## CLI Status

Future CLI idea:

```bash
agent-os init --profile solo|startup|enterprise|regulated
```

Status: Planned for a future release.

Until then, agents and users can apply these profiles manually through `AGENTS.md`, `AGENT_OS_PLAN_TEMPLATE.md`, and the active plan.
