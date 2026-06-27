import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Universal Agent OS is now active!');

    // Status Bar Item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(shield) Agent OS: Active';
    statusBarItem.tooltip = 'Verify Governance Gate';
    statusBarItem.command = 'agent-os.verifyGovernance';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Init Workspace
    let initWorkspace = vscode.commands.registerCommand('agent-os.initWorkspace', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder open. Please open a folder first.');
            return;
        }
        const rootPath = workspaceFolders[0].uri.fsPath;
        const agentsPath = path.join(rootPath, 'AGENTS.md');
        
        if (!fs.existsSync(agentsPath)) {
            const content = `# Universal Agent OS (Workspace Rules)\n\nYou are operating within the Universal Agent OS framework.\n\n## ZERO-CONFIG & SUPREME CONSTITUTION\n1. Always enforce No-New-Debt.\n2. Phase-0 Interview is mandatory.\n3. Do not run destructive commands.\n4. Wait for test evidence before marking tasks as Done.\n`;
            fs.writeFileSync(agentsPath, content);
            vscode.window.showInformationMessage('Universal Agent OS initialized! AGENTS.md created.');
        } else {
            vscode.window.showInformationMessage('Universal Agent OS is already initialized in this workspace.');
        }

        // Also create a boilerplate phase0 script if missing
        const examplesDir = path.join(rootPath, 'examples', 'phase0-interview');
        if (!fs.existsSync(examplesDir)) {
            fs.mkdirSync(examplesDir, { recursive: true });
        }
        const scriptPath = path.join(examplesDir, 'phase0_interview.py');
        if (!fs.existsSync(scriptPath)) {
            const scriptContent = `print("Starting Phase-0 Interview...")\nprint("Please answer the following questions to align the AI agent with your requirements.")\n`;
            fs.writeFileSync(scriptPath, scriptContent);
        }
    });

    let startInterview = vscode.commands.registerCommand('agent-os.startPhase0', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        let scriptPath = '';
        let scriptExists = false;

        if (workspaceFolders) {
            const rootPath = workspaceFolders[0].uri.fsPath;
            scriptPath = path.join(rootPath, 'examples', 'phase0-interview', 'phase0_interview.py');
            scriptExists = fs.existsSync(scriptPath);
        }

        if (!scriptExists) {
            const action = await vscode.window.showWarningMessage(
                'Phase-0 Interview script not found. Initialize Agent OS in this workspace?',
                'Initialize Workspace', 'Cancel'
            );
            if (action === 'Initialize Workspace') {
                vscode.commands.executeCommand('agent-os.initWorkspace');
            }
            return;
        }

        vscode.window.showInformationMessage('Starting Phase-0 Interview...');
        const terminal = vscode.window.createTerminal('Agent OS');
        terminal.show();
        // Use exact path to prevent CWD issues
        terminal.sendText(`python "${scriptPath}" start`);
    });

    let verifyGate = vscode.commands.registerCommand('agent-os.verifyGovernance', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }
        const cwd = workspaceFolders[0].uri.fsPath;
        exec('npx agent-os verify --target', { cwd }, (error, stdout, stderr) => {
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
        const limit = config.get<number>('antiMonolithLimit', 400);

        const diagnostics: vscode.Diagnostic[] = [];

        // Rule 1: Anti-Monolith
        if (document.lineCount > limit) {
            const range = new vscode.Range(0, 0, 0, 100);
            const diagnostic = new vscode.Diagnostic(
                range,
                `[Agent OS IL-06] Anti-Monolith Violation: File exceeds ${limit} lines. Consider spawning a new module.`,
                vscode.DiagnosticSeverity.Warning
            );
            diagnostics.push(diagnostic);
        }

        // Rule 2: Zero-Zombie-Code
        const text = document.getText();
        if (text.includes('// TODO:') || text.includes('// FIXME:')) {
             const firstTodo = text.indexOf('// TODO:') !== -1 ? text.indexOf('// TODO:') : text.indexOf('// FIXME:');
             const position = document.positionAt(firstTodo);
             const range = new vscode.Range(position, position);
             
             const diagnostic = new vscode.Diagnostic(
                range,
                `[Agent OS] Zero-Zombie-Code Policy: Make sure this TODO is tracked in the Task Ledger.`,
                vscode.DiagnosticSeverity.Information
            );
            diagnostics.push(diagnostic);
        }

        collection.set(document.uri, diagnostics);
    });

    context.subscriptions.push(startInterview, verifyGate, collection, initWorkspace);
}

export function deactivate() {}
