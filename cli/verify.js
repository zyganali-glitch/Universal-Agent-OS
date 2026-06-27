const fs = require('fs');
const path = require('path');

module.exports = function(args) {
  console.log('\n🔍 Universal Agent OS — Governance Gate Verification\n');

  let mode = null;
  let targetDir = process.cwd();

  if (args.includes('--package')) {
    mode = 'package';
  } else if (args.includes('--target')) {
    mode = 'target';
    const targetIndex = args.indexOf('--target');
    if (args[targetIndex + 1] && !args[targetIndex + 1].startsWith('--')) {
      targetDir = path.resolve(process.cwd(), args[targetIndex + 1]);
    }
  } else {
    // Auto-detect
    const pkgPath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        if (pkg.name === 'universal-agent-os') {
          mode = 'package';
        } else {
          mode = 'target';
        }
      } catch (e) {
        mode = 'target';
      }
    } else {
      mode = 'target';
    }
  }

  console.log(`🚀 Running in ${mode.toUpperCase()} mode...`);
  if (mode === 'target') {
    console.log(`📂 Target directory: ${targetDir}`);
  }
  console.log('');

  let passed = 0;
  let failed = 0;

  function check(filePath, label) {
    const fullPath = mode === 'package' ? path.join(process.cwd(), filePath) : path.join(targetDir, filePath);
    if (fs.existsSync(fullPath)) {
      console.log(`  ✅ ${label}`);
      passed++;
    } else {
      console.error(`  ❌ ${label} — MISSING: ${filePath}`);
      failed++;
    }
  }

  function checkContains(filePath, needle, label) {
    const fullPath = mode === 'package' ? path.join(process.cwd(), filePath) : path.join(targetDir, filePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(needle)) {
        console.log(`  ✅ ${label} (contains '${needle}')`);
        passed++;
      } else {
        console.error(`  ❌ ${label} — MISSING CONTENT: '${needle}' in ${filePath}`);
        failed++;
      }
    } else {
      console.error(`  ❌ ${label} — MISSING FILE: ${filePath}`);
      failed++;
    }
  }

  function checkNotContains(filePath, forbidden, label) {
    const fullPath = mode === 'package' ? path.join(process.cwd(), filePath) : path.join(targetDir, filePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8').toLowerCase();
      if (!content.includes(forbidden.toLowerCase())) {
        console.log(`  ✅ ${label} (clean of '${forbidden}')`);
        passed++;
      } else {
        console.error(`  ❌ ${label} — FORBIDDEN CONTENT: '${forbidden}' found in ${filePath}`);
        failed++;
      }
    } else {
      console.error(`  ❌ ${label} — MISSING FILE: ${filePath}`);
      failed++;
    }
  }

  function checkVersionSync() {
    if (mode === 'package') {
      const vPath = path.join(process.cwd(), 'VERSION');
      const pPath = path.join(process.cwd(), 'package.json');
      if (fs.existsSync(vPath) && fs.existsSync(pPath)) {
        const vText = fs.readFileSync(vPath, 'utf8').trim();
        const pkg = JSON.parse(fs.readFileSync(pPath, 'utf8'));
        if (vText === pkg.version) {
          console.log(`  ✅ VERSION matches package.json (${vText})`);
          passed++;
        } else {
          console.error(`  ❌ VERSION mismatch: ${vText} vs ${pkg.version}`);
          failed++;
        }
      }
    }
  }

  if (mode === 'package') {
    console.log('📦 Verifying Source Package:');
    check('README.md', 'README.md');
    check('LICENSE', 'LICENSE');
    check('LICENSING.md', 'LICENSING.md');
    check('VERSION', 'VERSION');
    check('CHANGELOG.md', 'CHANGELOG.md');
    check('package.json', 'package.json');
    check('init-agent-os.sh', 'init-agent-os.sh');
    check('init-agent-os.ps1', 'init-agent-os.ps1');
    check('cli/index.js', 'cli/index.js');
    check('cli/init.js', 'cli/init.js');
    check('cli/verify.js', 'cli/verify.js');
    check('en/AGENTS.md', 'en/AGENTS.md');
    check('tr/AGENTS.md', 'tr/AGENTS.md');
    check('en/AGENT_OS_RULES.md', 'en/AGENT_OS_RULES.md');
    check('tr/AGENT_OS_RULES.md', 'tr/AGENT_OS_RULES.md');
    check('en/AGENT_OS_PLAN_TEMPLATE.md', 'en/AGENT_OS_PLAN_TEMPLATE.md');
    check('tr/AGENT_OS_PLAN_TEMPLATE.md', 'tr/AGENT_OS_PLAN_TEMPLATE.md');
    check('en/AGENT_MEMORY_AND_LESSONS.md', 'en/AGENT_MEMORY_AND_LESSONS.md');
    check('tr/AGENT_MEMORY_AND_LESSONS.md', 'tr/AGENT_MEMORY_AND_LESSONS.md');
    check('en/AGENT_ARCHITECTURE_AND_PATTERNS.md', 'en/AGENT_ARCHITECTURE_AND_PATTERNS.md');
    check('tr/AGENT_ARCHITECTURE_AND_PATTERNS.md', 'tr/AGENT_ARCHITECTURE_AND_PATTERNS.md');
    check('en/AGENT_ENVIRONMENT_AND_API.md', 'en/AGENT_ENVIRONMENT_AND_API.md');
    check('tr/AGENT_ENVIRONMENT_AND_API.md', 'tr/AGENT_ENVIRONMENT_AND_API.md');
    check('en/AGENT_USER_PREFERENCES.md', 'en/AGENT_USER_PREFERENCES.md');
    check('tr/AGENT_USER_PREFERENCES.md', 'tr/AGENT_USER_PREFERENCES.md');
    check('tests', 'tests/');
    check('.github/workflows/agent-os-enforcer.yml', '.github/workflows/agent-os-enforcer.yml');
    check('extensions/vscode/package.json', 'extensions/vscode/package.json');
    check('extensions/vscode/src/extension.ts', 'extensions/vscode/src/extension.ts');
    check('requirements-dev.txt', 'requirements-dev.txt');
    check('skills/agent-os-memory/SKILL.md', 'skills/agent-os-memory/SKILL.md');
    check('.github/workflows/agent-compliance-check.yml', '.github/workflows/agent-compliance-check.yml');
    check('.gitlab-ci.yml', '.gitlab-ci.yml');
    check('walkthrough.md', 'walkthrough.md');
    check('docs/INSTALLATION_MANIFEST.md', 'docs/INSTALLATION_MANIFEST.md');
    checkVersionSync();
    checkContains('package.json', '"license": "MIT"', 'package.json MIT License');
    checkNotContains('LICENSING.md', 'no redistribution', 'LICENSING.md clean restriction');
    checkNotContains('LICENSING.md', 'commercial license required', 'LICENSING.md clean restriction');
    checkContains('README.md', 'v1.2.0', 'README.md v1.2.0 mentioned');
    checkContains('docs/EVIDENCE_MANIFEST_TEMPLATE.md', 'Tech-Debt Delta', 'EVIDENCE_MANIFEST_TEMPLATE.md Tech-Debt Delta');
    checkContains('docs/INSTALLATION_MANIFEST.md', 'VS Code Extension And Bootstrap Installs', 'INSTALLATION_MANIFEST.md install contract');
  } else {
    console.log('📋 Verifying Target Repository:');
    check('AGENTS.md', 'Supreme Constitution (AGENTS.md)');
    check('AGENT_OS_RULES.md', 'Governance Rules');
    check('AGENT_OS_PLAN_TEMPLATE.md', 'Global Plan Template');
    check('AGENT_MEMORY_AND_LESSONS.md', 'Lessons & Known Issues');
    check('AGENT_ARCHITECTURE_AND_PATTERNS.md', 'Architecture & Patterns');
    check('AGENT_ENVIRONMENT_AND_API.md', 'Environment & API');
    check('AGENT_USER_PREFERENCES.md', 'User Preferences');
    check('.agent/workflows/session-bootstrap.md', 'Session Bootstrap Workflow');
    check('.agent/workflows/continue.md', 'Continue Workflow');
    check('plans', 'Plans directory');
    check('plans/completed', 'Plans completed directory');
  }

  console.log('\n' + '='.repeat(60));
  console.log(`  Required: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(60));

  if (failed > 0) {
    console.error(`\n❌ GATE CHECK FAILED — ${failed} required surface(s) missing.\n`);
    process.exit(1);
  } else {
    console.log(`\n✅ GATE CHECK PASSED — All required surfaces verified.\n`);
    process.exit(0);
  }
};
