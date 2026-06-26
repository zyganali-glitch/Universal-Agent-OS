const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = function(args) {
  console.log("Initializing Universal Agent OS governance framework...");
  const locale = args.includes('--tr') ? 'tr' : 'en';
  const legacyFlag = args.includes('--legacy') ? '-Legacy' : '';
  const bashLegacyFlag = args.includes('--legacy') ? '--legacy' : '';

  try {
    const scriptPath = path.join(__dirname, '..', 'init-agent-os.ps1');
    if (process.platform === 'win32') {
      execSync(`powershell -ExecutionPolicy Bypass -File "${scriptPath}" -TargetDir . -Locale ${locale} ${legacyFlag}`, { stdio: 'inherit' });
    } else {
      execSync(`bash "${path.join(__dirname, '..', 'init-agent-os.sh')}" . ${locale} ${bashLegacyFlag}`, { stdio: 'inherit' });
    }
    console.log("Initialization complete!");
  } catch (err) {
    console.error("Initialization failed:", err.message);
    process.exit(1);
  }
};
