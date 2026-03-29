# UNIVERSAL AGENT OS - GLOBAL PLAN & TASK TRACKING TEMPLATE

This template is self-contained.
It MUST be initialized and configured as a task-specific plan for every new repository, platform (Web, Mobile, Game, Embedded, Data), or major feature request. Agents are comprehensively restricted from outputting code before this constitution is locked (Zero-Leak Lock).

---

## 0) Document Identity (Phase 0 Output)

- Plan filename: `{{PLAN_FILENAME}}`
- Active plan directory: `plans/{{PLAN_FILENAME}}`
- Archive directory: `plans/completed/{{PLAN_FILENAME}}`
- Plan ID: `{{PLAN_ID}}`
- Project Target Platform: `{{WEB | MOBILE (IOS/ANDROID) | GAME (UNITY/UNREAL) | API | DATA }}`
- Last updated: `{{YYYY-MM-DD HH:mm TZ}}`
- Plan owner: `{{OWNER_AGENT_OR_TEAM}}`
- Active status: `{{PLANNING|IN_PROGRESS|HARDENING|CLOSURE|DONE|BLOCKED}}`
- **Agent Context Load (MANDATORY TO READ BEFORE EXECUTING ANY CODE!):**
  1. Bug/Lessons Minefield: `AGENT_MEMORY_AND_LESSONS.md`
  2. Arch/Pattern Memory: `AGENT_ARCHITECTURE_AND_PATTERNS.md`
  3. API/Env Boundary Memory: `AGENT_ENVIRONMENT_AND_API.md`
  4. User Preferences: `AGENT_USER_PREFERENCES.md` (Do not violate the user's documented communication style, prompt rules, and tone!)

### 0.1) Integrity Lock (IL) — Non-Negotiable

This section establishes universal, ironclad rules to prevent agentic infinite loops and internal tracking leaks. Any protocol violation immediately triggers a `BLOCKED` status.

**IL-01: Single Source of Truth**
- The Task Tracking Ledger (Section 6) is the SOLE official arbiter of progress. An agent cannot simply state "I finished it." It must only execute and report based off the Ledger's coordinates.

**IL-02: Atomic Update Imperative**
- Whenever a state transitions (e.g., IN_PROGRESS → DONE), the Phase Plan, Header, and Micro-Phase Backlog MUST be updated SYNCHRONOUSLY. A partial update (modifying one section while abandoning another) is an INTEGRITY VIOLATION.

**IL-03: Cascading Closure Lock**
- A parent task cannot reach `DONE` status until ALL of its dependent sub-tasks are successfully closed.
- Any bugs or supplemental requirements uncovered (Discovered Work) must be appended as child items and resolved before the parent can be closed.

**IL-04: Date Fidelity and Concrete Records**
- Documenting `DONE` with a future date is prohibited. Absolute chronological enforcement is required: `date <= today`.

**IL-05: Universal Gate Closure System**
- No plan transitions to Completion unless ALL testing gates defined internally report a `PASS` or possess an official Exception Record. Remaining `NOT_RUN` gates signify absolute `BLOCKAGE`.

**IL-06: Discovered Work Anti-Scope Drift**
- If an agent stumbles upon an existing defect while executing a targeted mission; it cannot branch off and rewrite the architecture (spaghetti code).
- The anomaly MUST be registered as an isolated line item prefixed with `[DISCOVERED]` in the ledger and parked until the current task completes.

**IL-07: Real-Time Accounting**
- Prior to touching any file, the agent designates the line item as `IN_PROGRESS`. Immediately after execution, it amends it to `DONE` fortified with evidence. Batch-updating progress at the end of the session is banned.

**IL-08: Triple-Sync Lock (Local, Remote, Live)**
- If deployment is requested, declaring "mission accomplished" requires parity across Local functionality, Remote repository (e.g. GitHub) push success, and Live Platform verified deployment.

## 1) Universal Consensus Variables (Phase 0)

Acting as a Mentor, the agent conducts an initial interview and records decisions here.
- **Tone & Persona:** `{{Formal / Mentor / Guide}}`
- **Ultimate Platform:** `{{Browser / App Store / Desktop / Embedded}}`
- **Architectural Strategy:** `{{Monolith / Microservices / Native / PWA / Engine-Specific}}`
- **Auth/Billing Matrix:** `{{Early Implementation / None}}`
- **QA Rigor:** `{{Absolute Unit Testing / Loose Prototyping}}`

---

## 2) Zero-Leak & Universal Security Protocol
1. **Additive-First Evolution:** Rather than obliterating legacy logic, establish new, modular delegation patterns. If a feature breaches scope scale, spawn a new file rather than engorging a Monolith.
2. **Blind Execution Ban:** Generating filesystem assumptions without running validation tools (`ls`, `view_file`) is forbidden.
3. **Dynamic Role Parity (Multi-Role Audit):** Every code insertion MUST survive the hypothetical scrutiny of a Cybersecurity Engineer, Universal QA, and **5 Sector-Specific Personas** fiercely tailored by the Agent during Phase 0 based on the project nature (e.g., if it is a Medical App, the Agent enforces a 'Health Data Expert' role into the template).

---

## 3) Scope Lock, Allowlist, Denylist

### 3.1 Scope Lock boundaries
- Included: `{{definition}}`
- Excluded: `{{boundary definition - agents cannot breach this}}`

### 3.2 Allowlist (Sanctioned Files)
- `{{isolated_module_1.ts}}`
- `{{specific_ui_component_2.js}}`

---

## 4) Universal Selftest Topology

Every feature bows to self-testing compliant with its platform.
| Platform Node | Test Suite / Suite Area | Smoke Requirement | Status |
|---|---|---|---|
| `{{Web Frontend}}` | Component/DOM Test | i18n, responsive, a11y | `{{READY/NA}}` |
| `{{Platform Target Check}}` | Phase-0 Decision | Excellence on targeted platforms (e.g. overflow). N/A if unmatched | `{{READY/NA}}` |
| `{{Game Engine}}` | Collision/Entity | Memory Leak, Physics boundaries | `{{READY/NA}}` |
| `{{Backend/API}}` | Route/Controller | Auth/Token, Payload integrity | `{{READY/NA}}` |

---

## 5) Micro-Phase Operations Backlog

| Task ID | Objective (Surgical) | Status | Agent | Date | Evidence/Note |
|---|---|---|---|---|---|
| `{{W-01}}` | `{{code target}}` | `{{PENDING\|IN_PROGRESS\|DONE}}` | `{{name}}`| `{{date}}` | `{{...}}` |
| `{{W-D1}}` | `[DISCOVERED] {{new issue}}`| `{{PENDING\|...}}` | `{{name}}`| `{{date}}` | `{{...}}` |

---

## 6) The Task Tracking Ledger (SINGLE SOURCE OF TRUTH)

> [!CAUTION]
> **IL-08/13 LIVE TRACKING & README LOCK:** No code can be committed and no task can be closed unless the Agent INSTANTLY updates this tracking ledger to `IN_PROGRESS` and eventually `DONE`, detailing the evidence. The Agent's singular duty is not just writing code; they MUST reflect every micro-change LIVE onto this table and the corresponding living documents `(e.g., TECH_DEBT, USER_GUIDE)`!
> **ATTENTION:** Before closing any task, the Agent MUST ask: *"Does this new feature, dependency, or architecture change affect the master **`README.md`**?"*. If so, the task CANNOT be closed until the `README.md` is updated (Live-Sync)!

| Step | Description | Status | Parent ID | Agent | Started | Completed | Evidence/Notes |
|---|---|---|---|---|---|---|---|
| `1.1` | `{{Target detail}}` | `{{PENDING/IN_PROGRESS/DONE/BLOCKED}}` | `-` | `{{Bot}}` | `-` | `-` | `{{Evidence}}` |
| `1.D1`| `[DISCOVERED] {{Hotfix}}` | `{{PENDING}}` | `1.1` | `{{Bot}}` | `-` | `-` | `{{...}}` |

---

## 7) Universal Validation Gates Matrix

| Gate Designation | Scope | Assessment Vector | Expected | Result | Log / Artifact |
|---|---|---|---|---|---|
| **Platform Smoke**| Verifies Crash-Free Startup | `{{build/run_command}}` | PASS | `{{...}}` | `{{...}}` |
| **No-UI-Regression**| Theme (Dark/Light) / i18n (Based on Phase-0) | `{{Visual / linter}}` | PASS | `{{...}}` | `{{...}}` |
| **Integrity-Lock**| Date fidelity & IL-01..11 synchronization | Plan Parity Check | PASS | `{{...}}` | `{{...}}` |
| **Triple-Sync** | Local, Repo (GitHub), and Live State parity | `git/deploy logs` | PASS | `{{...}}` | `{{...}}` |
| **[{{Agent GENERATED Dynamic Gate 1}}]**| `{{Sector-Specific Goal}}` | `{{Sector-Specific Audit Command}}` | PASS | `{{...}}` | `{{...}}` |
| **[{{Agent GENERATED Dynamic Gate 2}}]**| `{{Sector-Specific Goal}}` | `{{Sector-Specific Audit Command}}` | PASS | `{{...}}` | `{{...}}` |

> **AGENT INITIATIVE:** The bracketed Dynamic Gates above are generated from scratch by the Agent based strictly on the project's native traits (Fintech vs Web-Game) when the template is first deployed.

---

## 8) Token Apex and Handoff Checkpoint
Should context memory approach limitations, the agent relinquishes execution by logging:

```markdown
## CHECKPOINT - HANDOFF
- Last Concluded Micro-Step: {{phase.step}}
- Status: {{DONE|IN_PROGRESS|BLOCKED}}
- Approaching Micro-Step: {{phase.step}}
- Critical Evidence/Gate Status: {{PASS/FAIL/NOT_RUN}}
```
