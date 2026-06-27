"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const child_process_1 = require("child_process");
function activate(context) {
    console.log('Universal Agent OS is now active!');
    let startInterview = vscode.commands.registerCommand('agent-os.startPhase0', () => {
        vscode.window.showInformationMessage('Starting Phase-0 Interview...');
        const terminal = vscode.window.createTerminal('Agent OS');
        terminal.show();
        terminal.sendText('python examples/phase0-interview/phase0_interview.py start');
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
        // Rule 1: Anti-Monolith
        if (document.lineCount > limit) {
            const range = new vscode.Range(0, 0, 0, 100);
            const diagnostic = new vscode.Diagnostic(range, `[Agent OS IL-06] Anti-Monolith Violation: File exceeds ${limit} lines. Consider spawning a new module.`, vscode.DiagnosticSeverity.Warning);
            diagnostics.push(diagnostic);
        }
        // Rule 2: Zero-Zombie-Code
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
    context.subscriptions.push(startInterview, verifyGate, collection);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map