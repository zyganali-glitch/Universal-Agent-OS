const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function parseLocale(args) {
  if (args.includes('--tr')) return 'tr';
  if (args.includes('--en')) return 'en';

  const localeIndex = args.indexOf('--locale');
  if (localeIndex !== -1) {
    const value = args[localeIndex + 1];
    if (value !== 'en' && value !== 'tr') {
      console.error("Invalid locale. Use 'en' or 'tr'.");
      process.exit(1);
    }
    return value;
  }

  return 'en';
}

module.exports = function(args) {
  console.log("Initializing Universal Agent OS governance framework...");
  const locale = parseLocale(args);
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
