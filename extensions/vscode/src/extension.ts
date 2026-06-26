import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Universal Agent OS is now active!');

    const collection = vscode.languages.createDiagnosticCollection('agentOS');
    context.subscriptions.push(collection);

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
            // Very basic check, in a real scenario we'd regex for lines.
            // Just add a generic info for now.
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
}

export function deactivate() {}
