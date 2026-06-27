#!/usr/bin/env node

const [,, command, ...args] = process.argv;

if (command === 'init') {
  require('./init.js')(args);
} else if (command === 'verify') {
  require('./verify.js')(args);
} else if (command === 'status') {
  require('./status.js')(args);
} else {
  console.log(`
Universal Agent OS CLI

Usage:
  agent-os init [--en|--tr|--locale en|tr]
  agent-os verify [--package|--target [dir]]
  agent-os status

Commands:
  init       Install selected locale pack into the current directory (default: tr)
  verify     Verify package source or installed target repo governance surfaces
  status     Display the current governance and Master Roadmap status
`);
}
