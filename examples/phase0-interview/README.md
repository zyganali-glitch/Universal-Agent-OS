# Phase-0 Interview Reference Implementation

This directory contains a platform-agnostic reference implementation of the Universal Agent OS Phase-0 consultation interview.

## What It Does

The Phase-0 interview captures 8 governance decisions before any code is written:

1. **Project Idea** — What problem does this solve?
2. **Target Users** — Who will use it?
3. **Usage Platform** — Web, mobile, desktop?
4. **Accounts & Privacy** — Is authentication needed?
5. **Business Model** — Free, paid, undecided?
6. **Language** — Monolingual or multilingual?
7. **Visual Style** — Clean, fun, corporate?
8. **First Success** — What is the MVP completion criterion?

## Usage

```bash
# Start the interview
python phase0_interview.py start

# Answer the current question
python phase0_interview.py answer --value "A marketplace for local artisans"

# Check progress
python phase0_interview.py status
```

## Integration

This script is a reference implementation. To integrate with a specific platform:

- **Gate mechanism**: Add a pre-interview approval gate (e.g., Action Center, Slack approval, GitHub issue).
- **Storage**: Replace the JSON file persistence with your preferred storage backend.
- **Questions**: Extend or customize the question set for your domain.

The core contract: **no code until Phase-0 is complete**.

## Files

- `phase0_interview.py` — The interview engine
- `run_artifacts/` — Created at runtime to store interview state (gitignored)
