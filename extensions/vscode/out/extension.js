"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const child_process_1 = require("child_process");
const fs = require("fs");
const path = require("path");
const REPOSITORY_URL = 'https://github.com/zyganali-glitch/Universal-Agent-OS.git';
const SHARED_DIRECTORIES = [
    '.agent',
    '.github',
    '.gitlab',
    'agents',
    'docs',
    'examples',
    'mcp-server',
    'skills'
];
const SHARED_FILES = [
    'CHANGELOG.md',
    'LICENSE',
    'LICENSING.md',
    'VERSION',
    'VERSIONING.md',
    'agent_memory.json',
    'init-agent-os.ps1',
    'init-agent-os.sh',
    'requirements-dev.txt',
    'sweep.yaml',
    'walkthrough.md'
];
const TARGET_REQUIRED_FILES = [
    'AGENTS.md',
    'AGENT_OS_RULES.md',
    'AGENT_OS_PLAN_TEMPLATE.md',
    'AGENT_MEMORY_AND_LESSONS.md',
    'AGENT_ARCHITECTURE_AND_PATTERNS.md',
    'AGENT_ENVIRONMENT_AND_API.md',
    'AGENT_USER_PREFERENCES.md',
    '.agent/workflows/session-bootstrap.md',
    'plans',
    'plans/completed'
];
const CLEAN_FOLDER_IGNORES = new Set([
    '.git',
    '.vscode',
    '.idea',
    '.DS_Store',
    'Thumbs.db',
    'node_modules',
    '.agentos-temp',
    '.agentos-backups'
]);
function safeTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
}
function isLegacyWorkspace(rootPath) {
    try {
        return fs.readdirSync(rootPath).some((entry) => !CLEAN_FOLDER_IGNORES.has(entry));
    }
    catch {
        return false;
    }
}
function ensureDirectoryForFile(filePath) {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}
function backupExistingFile(rootPath, dest, backupRoot) {
    if (!backupRoot || !fs.existsSync(dest) || !fs.statSync(dest).isFile()) {
        return;
    }
    const relativePath = path.relative(rootPath, dest);
    const backupPath = path.join(backupRoot, relativePath);
    ensureDirectoryForFile(backupPath);
    fs.copyFileSync(dest, backupPath);
}
function resolveCollisionDestination(rootPath, dest, isLegacy) {
    if (!isLegacy || !fs.existsSync(dest)) {
        return dest;
    }
    const relativePath = path.relative(rootPath, dest).replace(/\\/g, '/');
    if (relativePath === 'README.md') {
        return path.join(rootPath, 'AGENT_OS_README.md');
    }
    return dest;
}
function copyRecursiveSync(src, dest, rootPath, isLegacy, backupRoot) {
    if (!fs.existsSync(src)) {
        return;
    }
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName), rootPath, isLegacy, backupRoot);
        });
        return;
    }
    const finalDest = resolveCollisionDestination(rootPath, dest, isLegacy);
    ensureDirectoryForFile(finalDest);
    backupExistingFile(rootPath, finalDest, backupRoot);
    fs.copyFileSync(src, finalDest);
}
function installAgentOSPayload(tempDir, rootPath, locale, isLegacy) {
    const backupRoot = isLegacy
        ? path.join(rootPath, '.agentos-backups', safeTimestamp())
        : undefined;
    SHARED_DIRECTORIES.forEach((folder) => {
        copyRecursiveSync(path.join(tempDir, folder), path.join(rootPath, folder), rootPath, isLegacy, backupRoot);
    });
    SHARED_FILES.forEach((fileName) => {
        copyRecursiveSync(path.join(tempDir, fileName), path.join(rootPath, fileName), rootPath, isLegacy, backupRoot);
    });
    const localeDir = path.join(tempDir, locale);
    if (!fs.existsSync(localeDir)) {
        throw new Error(`Locale directory '${locale}' not found in the repository.`);
    }
    copyRecursiveSync(localeDir, rootPath, rootPath, isLegacy, backupRoot);
    const completedPlansDir = path.join(rootPath, 'plans', 'completed');
    if (!fs.existsSync(completedPlansDir)) {
        fs.mkdirSync(completedPlansDir, { recursive: true });
    }
    if (isLegacy) {
        const techDebtFile = path.join(rootPath, 'TECH_DEBT_AND_SECURITY.md');
        if (!fs.existsSync(techDebtFile)) {
            const legacyContent = `# Legacy Quarantine & Tech Debt

> [!WARNING]
> This project was onboarded as a Brownfield project via Phase-X.
> The existing codebase is quarantined. Do not refactor existing code unless explicitly requested.
> ALL NEW code must adhere strictly to Universal Agent OS rules.

## Existing Project Snapshot
- Onboarded by VS Code extension.
- Existing files were detected before Agent OS installation.
- Any overwritten governance/adapter file collisions were backed up under \`.agentos-backups/\`.

## Known Legacy Systems
(Agent: Run a full project scan to populate this section with existing architectural patterns and debt.)
`;
            fs.writeFileSync(techDebtFile, legacyContent, 'utf8');
        }
    }
}
function verifyTargetWorkspace(rootPath) {
    const missing = TARGET_REQUIRED_FILES.filter((relativePath) => {
        return !fs.existsSync(path.join(rootPath, relativePath));
    });
    const localeWorkflow = ['.agent/workflows/continue.md', '.agent/workflows/devam.md'].some((relativePath) => {
        return fs.existsSync(path.join(rootPath, relativePath));
    });
    if (!localeWorkflow) {
        missing.push('.agent/workflows/continue.md or .agent/workflows/devam.md');
    }
    return missing;
}
function activate(context) {
    console.log('Universal Agent OS is now active!');
    // Status Bar Item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(shield) Agent OS: Active';
    statusBarItem.tooltip = 'Verify Governance Gate';
    statusBarItem.command = 'agent-os.verifyGovernance';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
    // Unified Init Workspace (Cloud Fetch to Root)
    let initWorkspace = vscode.commands.registerCommand('agent-os.initWorkspace', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder open. Please open a folder first.');
            return;
        }
        const rootPath = workspaceFolders[0].uri.fsPath;
        // Ask for locale
        const localeSelection = await vscode.window.showQuickPick([{ label: 'English', id: 'en' }, { label: 'Turkish', id: 'tr' }], { placeHolder: 'Select your preferred Agent OS language pack' });
        if (!localeSelection) {
            return; // User cancelled
        }
        const locale = localeSelection.id;
        const isLegacy = isLegacyWorkspace(rootPath);
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Universal Agent OS",
            cancellable: false
        }, async (progress) => {
            return new Promise((resolve, reject) => {
                progress.report({ message: "Downloading Universal Agent OS from GitHub..." });
                const tempDir = path.join(rootPath, '.agentos-temp');
                fs.rmSync(tempDir, { recursive: true, force: true });
                // Fetch the repo securely
                const gitCommand = `git clone --depth 1 ${REPOSITORY_URL} "${tempDir}"`;
                (0, child_process_1.exec)(gitCommand, { cwd: rootPath }, (error) => {
                    if (error) {
                        vscode.window.showErrorMessage(`Failed to fetch Agent OS: ${error.message}`);
                        reject();
                        return;
                    }
                    try {
                        progress.report({ message: `Configuring workspace (${locale})...` });
                        installAgentOSPayload(tempDir, rootPath, locale, isLegacy);
                        // Clean up temporary clone
                        fs.rmSync(tempDir, { recursive: true, force: true });
                        const legacyNote = isLegacy ? ' Existing project mode enabled; collisions were backed up.' : '';
                        vscode.window.showInformationMessage(`Universal Agent OS (${locale}) initialized in this workspace.${legacyNote}`, 'Start Phase-0', 'Verify').then((action) => {
                            if (action === 'Start Phase-0') {
                                vscode.commands.executeCommand('agent-os.startPhase0');
                            }
                            if (action === 'Verify') {
                                vscode.commands.executeCommand('agent-os.verifyGovernance');
                            }
                        });
                        resolve();
                    }
                    catch (e) {
                        vscode.window.showErrorMessage(`Error configuring workspace: ${e.message}`);
                        reject();
                    }
                });
            });
        });
    });
    let startInterview = vscode.commands.registerCommand('agent-os.startPhase0', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        let scriptPath = '';
        let scriptExists = false;
        if (workspaceFolders) {
            const rootPath = workspaceFolders[0].uri.fsPath;
            // The script is now natively at the root's examples/ folder
            scriptPath = path.join(rootPath, 'examples', 'phase0-interview', 'phase0_interview.py');
            scriptExists = fs.existsSync(scriptPath);
        }
        if (!scriptExists) {
            const action = await vscode.window.showWarningMessage('Phase-0 Interview script not found. Initialize Agent OS in this workspace?', 'Initialize Workspace', 'Cancel');
            if (action === 'Initialize Workspace') {
                vscode.commands.executeCommand('agent-os.initWorkspace');
            }
            return;
        }
        vscode.window.showInformationMessage('Starting Phase-0 Interview...');
        const terminal = vscode.window.createTerminal('Agent OS');
        terminal.show();
        terminal.sendText(`python "${scriptPath}" start`);
    });
    let verifyGate = vscode.commands.registerCommand('agent-os.verifyGovernance', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }
        const cwd = workspaceFolders[0].uri.fsPath;
        const missing = verifyTargetWorkspace(cwd);
        if (missing.length > 0) {
            vscode.window.showErrorMessage(`Agent OS governance check failed. Missing: ${missing.join(', ')}`);
            return;
        }
        vscode.window.showInformationMessage('Agent OS governance check passed. Required workspace files are present.');
    });
    const collection = vscode.languages.createDiagnosticCollection('agentOS');
    vscode.workspace.onDidSaveTextDocument(document => {
        if (document.languageId === 'Log' || document.fileName.endsWith('.md')) {
            return;
        }
        const config = vscode.workspace.getConfiguration('agentOS');
        const limit = config.get('antiMonolithLimit', 400);
        const diagnostics = [];
        if (document.lineCount > limit) {
            const range = new vscode.Range(0, 0, 0, 100);
            const diagnostic = new vscode.Diagnostic(range, `[Agent OS IL-06] Anti-Monolith Violation: File exceeds ${limit} lines. Consider spawning a new module.`, vscode.DiagnosticSeverity.Warning);
            diagnostics.push(diagnostic);
        }
        const text = document.getText();
        if (text.includes('// TODO:') || text.includes('// FIXME:')) {
            const firstTodo = text.indexOf('// TODO:') !== -1 ? text.indexOf('// TODO:') : text.indexOf('// FIXME:');
            const position = document.positionAt(firstTodo);
            const range = new vscode.Range(position, position);
            const diagnostic = new vscode.Diagnostic(range, `[Agent OS] Zero-Zombie-Code Policy: Make sure this TODO is tracked in the Task Ledger.`, vscode.DiagnosticSeverity.Information);
            diagnostics.push(diagnostic);
        }
        collection.set(document.uri, diagnostics);
    });
    context.subscriptions.push(startInterview, verifyGate, collection, initWorkspace);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map