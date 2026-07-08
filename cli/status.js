const fs = require('fs');
const path = require('path');

module.exports = function(args) {
  const targetDir = process.cwd();

  console.log(`\n========================================`);
  console.log(`   Universal Agent OS - Status Report`);
  console.log(`========================================`);
  console.log(`  Workspace: ${targetDir}\n`);

  const requiredFiles = [
    { path: 'AGENTS.md',                         label: 'Supreme Constitution' },
    { path: 'AGENT_OS_RULES.md',                 label: 'Governance Rules' },
    { path: 'AGENT_OS_PLAN_TEMPLATE.md',         label: 'Global Plan Template' },
    { path: 'AGENT_MEMORY_AND_LESSONS.md',       label: 'Lessons & Known Issues' },
    { path: 'AGENT_ARCHITECTURE_AND_PATTERNS.md', label: 'Architecture & Patterns' },
    { path: 'AGENT_ENVIRONMENT_AND_API.md',      label: 'Environment & API' },
    { path: 'AGENT_USER_PREFERENCES.md',         label: 'User Preferences' },
    { path: '.agent/workflows/session-bootstrap.md', label: 'Session Bootstrap Workflow' },
    { path: 'plans',                             label: 'Plans Directory' },
    { path: 'plans/completed',                   label: 'Completed Plans Archive' }
  ];

  const optionalFiles = [
    { path: 'TECH_DEBT_AND_SECURITY.md',         label: 'Legacy Quarantine' },
    { path: 'NEXT_STEPS.md',                     label: 'Next Steps Guide' },
    { path: 'BUSINESS_MODEL.md',                 label: 'Business Model' }
  ];

  let presentCount = 0;
  let missingCount = 0;

  console.log('  Required Surfaces:');
  for (const file of requiredFiles) {
    const fullPath = path.join(targetDir, file.path);
    if (fs.existsSync(fullPath)) {
      console.log(`    [√] ${file.label}`);
      presentCount++;
    } else {
      console.log(`    [✗] ${file.label} — MISSING: ${file.path}`);
      missingCount++;
    }
  }

  // Check for locale workflow (continue.md OR devam.md)
  const hasContinueWorkflow = ['continue.md', 'devam.md'].some(function(name) {
    return fs.existsSync(path.join(targetDir, '.agent', 'workflows', name));
  });
  if (hasContinueWorkflow) {
    console.log(`    [√] Continue Workflow`);
    presentCount++;
  } else {
    console.log(`    [✗] Continue Workflow — MISSING: .agent/workflows/continue.md`);
    missingCount++;
  }

  console.log('\n  Optional Surfaces:');
  for (const file of optionalFiles) {
    const fullPath = path.join(targetDir, file.path);
    if (fs.existsSync(fullPath)) {
      console.log(`    [√] ${file.label}`);
    } else {
      console.log(`    [ ] ${file.label} (not present)`);
    }
  }

  // Count plans
  const plansDir = path.join(targetDir, 'plans');
  const completedDir = path.join(plansDir, 'completed');
  let activePlans = 0;
  let completedPlans = 0;

  if (fs.existsSync(plansDir)) {
    try {
      activePlans = fs.readdirSync(plansDir).filter(function(f) {
        return f.endsWith('.md') && f !== 'completed';
      }).length;
    } catch (e) { /* ignore */ }
  }

  if (fs.existsSync(completedDir)) {
    try {
      completedPlans = fs.readdirSync(completedDir).filter(function(f) {
        return f.endsWith('.md');
      }).length;
    } catch (e) { /* ignore */ }
  }

  // Detect mode
  const isLegacy = fs.existsSync(path.join(targetDir, 'TECH_DEBT_AND_SECURITY.md'));

  console.log('\n  Workspace Summary:');
  console.log(`    Mode          : ${isLegacy ? 'Legacy/Brownfield' : 'Greenfield'}`);
  console.log(`    Active Plans  : ${activePlans}`);
  console.log(`    Completed     : ${completedPlans}`);

  console.log('\n========================================');
  if (missingCount === 0) {
    console.log(`  RESULT: All ${presentCount} required surfaces present.`);
  } else {
    console.log(`  RESULT: ${presentCount} present, ${missingCount} missing.`);
  }
  console.log('========================================\n');
};
