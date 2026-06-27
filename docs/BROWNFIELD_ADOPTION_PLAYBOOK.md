# Brownfield Adoption Playbook

## Purpose
How to adopt Universal Agent OS inside an existing messy repository without pretending the old code is clean.

## When To Use
- existing `src/` or app code already exists
- no previous Agent OS plan exists
- technical debt is unknown
- the user wants governance for new work without rewriting everything

## Principles
- quarantine old code honestly
- govern all new code strictly
- do not refactor legacy code unless explicitly requested
- record known risks in `TECH_DEBT_AND_SECURITY.md`
- create a first safe plan before touching code

## First 30 Minutes
1. Run repository scan.
2. Identify existing architecture.
3. Create or update `TECH_DEBT_AND_SECURITY.md`.
4. Initialize Collective Memory.
5. Create `plans/master-roadmap.md`.
6. Create first small child plan.
7. Run `agent-os verify --target`.

## Evidence Requirements
- files inspected
- risks discovered
- commands run
- gate status
- Tech-Debt Delta

## Suggested First Agent Prompt

```
You are entering a brownfield repository. Do not rewrite existing code. First inspect the structure, create or update TECH_DEBT_AND_SECURITY.md, initialize memory files, then propose the smallest safe first plan. Do not code until the plan is accepted.
```
