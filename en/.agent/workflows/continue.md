---
description: Resume the active plan or start a new one from the reusable global plan template.
---

# /continue - Global Resume Protocol

This workflow restores an interrupted session back into the governed execution model.
Its job is not just to remember where the last edit stopped, but to revalidate plan state, gate state, and scope state before more work happens.

## 1) Load Order
Read these in order:
1. `AGENTS.md`
2. `AGENT_OS_RULES.md`
3. the relevant rule file
4. `session-bootstrap.md`
5. the relevant native adapter surface
6. the root `AGENT_OS_PLAN_TEMPLATE.md`

## 2) Select the Planning Source
Plan selection follows a strict order:
1. If the user named a specific plan, open it.
2. Otherwise select the active plan under `plans/`.
3. If no active plan exists, create one from the root template.
4. Use `plans/completed/` only for historical reference.

## 3) Find the Active Step
Inside the chosen plan, resume in this order:
1. `IN_PROGRESS`
2. otherwise the first meaningful `PENDING`
3. if status naming differs, map it honestly instead of guessing

## 4) Mandatory Resume Checks
Before doing implementation again, re-check:
- scope lock validity
- allowlist / denylist drift
- selftest and related-test impact growth
- hidden discovered work
- conflicts between live behavior and previous PASS claims

## 5) Request Intake and Dependency Order
Resume never means following the last message blindly.
Instead:
- merge the new request into the existing backlog
- rank tasks by dependency and risk
- reject unsafe multi-writer expansion on shared files
- open new discovered-work rows when reality widened the task

## 6) Main-Agent and Supporting Roles
Reconfirm the role model on resume:
- main agent = the chat-facing agent
- supporting roles = bug-hunt, plan integrity, test/gate verifier, and optional domain reviewers
- if the platform cannot run true subagents, record `fallback-to-sequential`

## 7) User Return Packet
Before re-entering execution, report:
- plan file
- active phase and active step
- `MODE`
- allowlist / denylist
- selftest + related-test impact map
- main-agent + supporting-role or fallback structure
- first safe micro-phase

## 8) Re-Enter Bootstrap Discipline
Resume does not skip bootstrap logic.
Before implementation, restate:
- evidence plan
- test and gate plan
- one-request max-progress limit
- single-writer lock
- next closure proof target

## 9) Handoff and Checkpoint Duty
Every resumed session must end with updated handoff and checkpoint fields.
Updating only the task table is insufficient; header, phase plan, backlog, request, gate, risk, and handoff surfaces move together.

## 10) Closure Rules
- No closure outside `Plan -> Evidence -> Test`.
- No `DONE` while mandatory gates are `FAIL` or `NOT_RUN`.
- Triple-Sync Gate is mandatory for push/deploy/repo-sync scope.
- Complete the maximum safe micro-phase in one request.
- The main agent carries at most 2-3 active micro-phases.

## 11) Anti-Patterns
- pretending to resume after reading only the latest user message
- entering implementation before selecting a plan
- leaving discovered work outside the tracked surfaces
- ignoring selftest impact until after coding
- hiding contradictions between live behavior and static PASS rows

## 12) Expected Outcome
After this workflow, the agent should be able to state clearly:
- which plan is active
- which step is active
- which gates are about to be affected
- which risks remain open

The purpose of `/continue` is not speed by shortcut. It is safe resumption without state loss.
