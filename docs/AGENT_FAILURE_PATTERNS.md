# Agent Failure Pattern Catalog

## 1. False Completion
Agent says done without running tests.

Prevention:
- Evidence Manifest
- closure-check
- gate status must be PASS/FAIL/NOT_RUN

## 2. Plan Drift
Agent edits files outside scope.

Prevention:
- Scope Lock
- Allowlist/Denylist
- active plan

## 3. Context Loss
Agent forgets prior decisions.

Prevention:
- Collective Memory
- session-bootstrap
- continue workflow

## 4. Zombie Code
Agent leaves old code, TODOs, duplicate paths.

Prevention:
- Zero-Zombie-Code policy
- VS Code diagnostics
- closure checklist

## 5. Over-Engineering
Agent adds heavy backend/tools without asking.

Prevention:
- Phase-0 consultation
- Heavy Infrastructure Consultation Lock

## 6. Documentation Drift
Agent changes behavior but docs stay old.

Prevention:
- IL-13 Live-Docs Sync
- README update check

## 7. Test Theater
Agent reports tests without reproducible commands.

Prevention:
- command evidence
- Evidence Manifest
- verify gates
