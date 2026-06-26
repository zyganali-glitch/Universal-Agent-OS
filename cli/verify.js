const fs = require('fs');
const path = require('path');

module.exports = function(args) {
  console.log('\n🔍 Universal Agent OS — Governance Gate Verification\n');

  let passed = 0;
  let failed = 0;

  function check(filePath, label) {
    if (fs.existsSync(path.join(process.cwd(), filePath))) {
      console.log(`  ✅ ${label}`);
      passed++;
    } else {
      console.error(`  ❌ ${label} — MISSING: ${filePath}`);
      failed++;
    }
  }

  // Core Governance
  console.log('📋 Core Governance Files:');
  check('AGENTS.md', 'Supreme Constitution (AGENTS.md)');
  check('AGENT_OS_PLAN_TEMPLATE.md', 'Global Plan Template');
  check('AGENT_OS_RULES.md', 'Governance Rules');

  // Collective Memory (4 Pillars)
  console.log('\n🧠 Collective Memory (4 Pillars):');
  check('AGENT_MEMORY_AND_LESSONS.md', 'Lessons & Known Issues');
  check('AGENT_ARCHITECTURE_AND_PATTERNS.md', 'Architecture & Patterns');
  check('AGENT_ENVIRONMENT_AND_API.md', 'Environment & API');
  check('AGENT_USER_PREFERENCES.md', 'User Preferences');

  // Agent Adapter Surfaces
  console.log('\n🔌 Agent Adapter Surfaces:');
  check('CLAUDE.md', 'Claude Adapter');
  check('GEMINI.md', 'Gemini Adapter');
  check('AIDER.md', 'Aider Adapter');

  // Native IDE Surfaces (optional but recommended)
  console.log('\n🛠️  Native IDE Surfaces (recommended):');
  const optionalFiles = [
    ['.cursor/rules/global-governance.mdc', 'Cursor Rules'],
    ['.codex/AGENTS.md', 'Codex Adapter'],
    ['.github/copilot-instructions.md', 'Copilot Instructions'],
    ['.agent/rules/global-governance.md', 'Agent Rules'],
    ['.agent/workflows/session-bootstrap.md', 'Session Bootstrap Workflow'],
    ['.agent/skills/global-governance/SKILL.md', 'Governance Skill'],
  ];
  let optionalPassed = 0;
  for (const [filePath, label] of optionalFiles) {
    if (fs.existsSync(path.join(process.cwd(), filePath))) {
      console.log(`  ✅ ${label}`);
      optionalPassed++;
    } else {
      console.log(`  ⚠️  ${label} — not found (optional): ${filePath}`);
    }
  }

  // Planning Directory
  console.log('\n📁 Planning Infrastructure:');
  check('plans', 'Plans directory');
  if (fs.existsSync(path.join(process.cwd(), 'plans', 'completed'))) {
    console.log('  ✅ Plans archive (plans/completed/)');
    passed++;
  } else {
    console.log('  ⚠️  Plans archive not found (plans/completed/) — will be created on first plan closure');
  }

  // Runtime Behavior & Memory Bus Tests
  console.log('\n⚙️  Runtime Behavior Tests:');
  try {
    const memoryPath = path.join(process.cwd(), 'agent_memory.json');
    if (fs.existsSync(memoryPath)) {
      const memoryContent = fs.readFileSync(memoryPath, 'utf8');
      JSON.parse(memoryContent); // Throws if corrupt
      console.log('  ✅ Memory Bus (agent_memory.json) structural integrity: PASS');
    } else {
      console.log('  ⚠️  Memory Bus not found, skipping structural test.');
    }
  } catch (err) {
    console.error(`  ❌ Memory Bus structural integrity: FAIL (${err.message})`);
    failed++;
  }

  try {
    const mcpPackagePath = path.join(process.cwd(), 'mcp-server', 'package.json');
    if (fs.existsSync(mcpPackagePath)) {
      const pkg = JSON.parse(fs.readFileSync(mcpPackagePath, 'utf8'));
      if (pkg.dependencies && pkg.dependencies['@modelcontextprotocol/sdk']) {
        console.log('  ✅ MCP Server runtime dependencies check: PASS');
      } else {
        console.error('  ❌ MCP Server runtime dependencies check: FAIL (Missing SDK)');
        failed++;
      }
    }
  } catch (err) {
    console.error(`  ❌ MCP Server check: FAIL (${err.message})`);
    failed++;
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`  Required: ${passed} passed, ${failed} failed`);
  console.log(`  Optional: ${optionalPassed}/${optionalFiles.length} present`);
  console.log('='.repeat(60));

  if (failed > 0) {
    console.error(`\n❌ GATE CHECK FAILED — ${failed} required governance surface(s) missing.`);
    console.error("   Run 'npx agent-os init' to install the governance framework.\n");
    process.exit(1);
  } else {
    console.log(`\n✅ GATE CHECK PASSED — All required governance surfaces verified.\n`);
    process.exit(0);
  }
};
