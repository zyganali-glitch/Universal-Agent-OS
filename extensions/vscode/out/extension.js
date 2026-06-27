"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const child_process_1 = require("child_process");
const fs = require("fs");
const path = require("path");
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
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Universal Agent OS",
            cancellable: false
        }, async (progress) => {
            return new Promise((resolve, reject) => {
                progress.report({ message: "Downloading brain from GitHub..." });
                const tempDir = path.join(rootPath, '.agentos-temp');
                // Fetch the repo securely
                const gitCommand = `git clone --depth 1 https://github.com/zyganali-glitch/Universal-Agent-OS.git "${tempDir}"`;
                (0, child_process_1.exec)(gitCommand, { cwd: rootPath }, (error) => {
                    if (error) {
                        vscode.window.showErrorMessage(`Failed to fetch Agent OS: ${error.message}`);
                        reject();
                        return;
                    }
                    try {
                        progress.report({ message: `Configuring workspace (${locale})...` });
                        const copyRecursiveSync = (src, dest) => {
                            const exists = fs.existsSync(src);
                            const stats = exists && fs.statSync(src);
                            const isDirectory = exists && stats && stats.isDirectory();
                            if (isDirectory) {
                                if (!fs.existsSync(dest))
                                    fs.mkdirSync(dest, { recursive: true });
                                fs.readdirSync(src).forEach((childItemName) => {
                                    copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
                                });
                            }
                            else if (exists) {
                                fs.copyFileSync(src, dest);
                            }
                        };
                        // 1. Copy the selected locale pack directly to the root
                        const localeDir = path.join(tempDir, locale);
                        if (fs.existsSync(localeDir)) {
                            copyRecursiveSync(localeDir, rootPath);
                        }
                        else {
                            throw new Error(`Locale directory '${locale}' not found in the repository.`);
                        }
                        // 2. Copy essential template directories to root
                        ['examples', 'plans'].forEach(folder => {
                            const srcPath = path.join(tempDir, folder);
                            if (fs.existsSync(srcPath)) {
                                copyRecursiveSync(srcPath, path.join(rootPath, folder));
                            }
                        });
                        // Ensure plans/completed exists
                        const completedPlansDir = path.join(rootPath, 'plans', 'completed');
                        if (!fs.existsSync(completedPlansDir)) {
                            fs.mkdirSync(completedPlansDir, { recursive: true });
                        }
                        // 3. Check if project is legacy (has files other than .git, .vscode, etc.)
                        const checkIsLegacy = (dir) => {
                            try {
                                const files = fs.readdirSync(dir);
                                const meaningfulFiles = files.filter(f => !['.git', '.vscode', 'node_modules', '.agentos-temp', 'AGENTS.md'].includes(f));
                                // Consider legacy if there are existing structural files before this installation
                                return meaningfulFiles.length > 0;
                            }
                            catch (e) {
                                return false;
                            }
                        };
                        const isLegacy = checkIsLegacy(rootPath);
                        // 4. Apply Legacy Quarantine if needed
                        if (isLegacy) {
                            const techDebtFile = path.join(rootPath, 'TECH_DEBT_AND_SECURITY.md');
                            if (!fs.existsSync(techDebtFile)) {
                                const legacyContent = `# Legacy Quarantine & Tech Debt\n\n> [!WARNING]\n> This project was onboarded as a Brownfield project via Phase-X.\n> The existing codebase is quarantined. Do not refactor existing spaghetti code unless explicitly requested.\n> ALL NEW code must adhere strictly to Universal Agent OS IL-01 to IL-16 rules.\n\n## Known Legacy Systems\n(Agent: Run a full project scan to populate this section with existing architectural patterns and debt)\n`;
                                fs.writeFileSync(techDebtFile, legacyContent);
                            }
                        }
                        // 5. Clean up temporary clone
                        fs.rmSync(tempDir, { recursive: true, force: true });
                        vscode.window.showInformationMessage(`Universal Agent OS (${locale}) initialized! Core brain is directly in your root folder.`);
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
        (0, child_process_1.exec)('npx agent-os verify --target', { cwd }, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Governance Gate Failed: ${stderr}`);
                return;
            }
            vscode.window.showInformationMessage(`Governance Gate Passed: ${stdout}`);
        });
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