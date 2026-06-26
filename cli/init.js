const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = function(args) {
  console.log("Initializing Universal Agent OS governance framework...");
  const locale = args.includes('--tr') ? 'tr' : 'en';

  try {
    // In a real published package, this would copy files from __dirname/../en or tr
    // For now, it simply invokes the bootstrap script
    const scriptPath = path.join(__dirname, '..', 'init-agent-os.ps1');
    if (process.platform === 'win32') {
      execSync(`powershell -ExecutionPolicy Bypass -File "${scriptPath}" -TargetDir . -Locale ${locale}`, { stdio: 'inherit' });
    } else {
      execSync(`bash "${path.join(__dirname, '..', 'init-agent-os.sh')} . ${locale}"`, { stdio: 'inherit' });
    }
    console.log("Initialization complete!");
  } catch (err) {
    console.error("Initialization failed:", err.message);
    process.exit(1);
  }
};
