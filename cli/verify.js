const fs = require('fs');
const path = require('path');

module.exports = function(args) {
  console.log("Verifying Universal Agent OS Governance...");

  let hasErrors = false;

  // Check 1: AGENTS.md exists
  if (!fs.existsSync(path.join(process.cwd(), 'AGENTS.md'))) {
    console.error("❌ AGENTS.md is missing. Run 'npx agent-os init' first.");
    hasErrors = true;
  } else {
    console.log("✅ AGENTS.md found.");
  }

  // Check 2: Active Plan exists
  const hasPlan = fs.existsSync(path.join(process.cwd(), 'AGENT_OS_PLAN_TEMPLATE.md'));
  if (!hasPlan) {
    console.error("❌ Root Plan Template missing.");
    hasErrors = true;
  } else {
    console.log("✅ Root Plan Template found.");
  }

  if (hasErrors) {
    console.error("\nGate Check FAILED. The repository does not meet the Universal Agent OS standards.");
    process.exit(1);
  } else {
    console.log("\nGate Check PASSED. Governance framework is intact.");
    process.exit(0);
  }
};
