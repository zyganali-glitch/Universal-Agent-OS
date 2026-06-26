#!/usr/bin/env node

const [,, command, ...args] = process.argv;

if (command === 'init') {
  require('./init.js')(args);
} else if (command === 'verify') {
  require('./verify.js')(args);
} else {
  console.log(`
Universal Agent OS CLI (v1.1.0)

Usage:
  npx agent-os init           - Initialize the Agent OS governance framework in the current repo.
  npx agent-os init --legacy  - Initialize in Legacy/Brownfield mode (skips Phase-0, creates quarantine).
  npx agent-os verify         - Run the governance gate verification check.
`);
}
