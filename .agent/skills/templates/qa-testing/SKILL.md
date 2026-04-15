---
name: qa-testing-template
description: Base template for generated testing and gate-verification skills.
---

# QA Testing Skill Template

## Use This Skill When
- the repo contains explicit test surfaces or when a change needs focused gate verification

## Required Inputs
- available test suites
- smoke path
- related-test mapping
- gate expectations

## Responsibilities
- choose the smallest credible validation set first
- preserve the plan -> evidence -> test closure chain
- surface uncovered or flaky validation honestly

## Expected Outputs
- validation matrix
- test-routing notes
- gate evidence checklist

## Gates/Validation Focus
- smoke
- selftest/related tests
- parity and integrity checks when relevant

## Common Drift Risks
- test skipping
- broad reruns before local diagnosis
- false PASS claims without evidence

## Generation Placeholders
- `{{test_runner}}`
- `{{smoke_command}}`
- `{{related_test_map}}`
- `{{qa_gate_notes}}`