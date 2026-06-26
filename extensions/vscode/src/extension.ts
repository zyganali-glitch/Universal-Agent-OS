import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    console.log('Universal Agent OS extension is now active.');

    let startInterview = vscode.commands.registerCommand('agent-os.startPhase0', () => {
        vscode.window.showInformationMessage('Starting Phase-0 Interview...');
        // Future integration: launch terminal and run interactive python script
        const terminal = vscode.window.createTerminal('Agent OS');
        terminal.show();
        terminal.sendText('python examples/phase0-interview/phase0_interview.py');
    });

    let verifyGate = vscode.commands.registerCommand('agent-os.verifyGovernance', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }

        const cwd = workspaceFolders[0].uri.fsPath;
        exec('npx agent-os verify', { cwd }, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Governance Gate Failed: ${stderr}`);
                return;
            }
            vscode.window.showInformationMessage(`Governance Gate Passed: ${stdout}`);
        });
    });

    context.subscriptions.push(startInterview, verifyGate);
}

export function deactivate() {}
