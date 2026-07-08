import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

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

const CHAT_COMMANDS = {
    fastTrack: `/fast-track

Use Fast-Track Mode for this small, well-scoped change. Confirm the exact scope, list affected files, run the smallest relevant gate, report evidence, and do not start a full Phase-0 unless the scope expands.`,
    closureCheck: `/closure-check

Before calling this done, report: changed files, evidence, commands run, gate status, Tech-Debt Delta, docs updated, remaining risks, and any NOT_RUN checks.`
};

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

function collectWorkspaceSnapshot(rootPath: string) {
    const topLevelEntries = fs.readdirSync(rootPath)
        .filter((entry) => !CLEAN_FOLDER_IGNORES.has(entry))
        .sort();

    const markers = [
        'package.json',
        'pyproject.toml',
        'requirements.txt',
        'Cargo.toml',
        'go.mod',
        'pom.xml',
        'build.gradle',
        'composer.json',
        'Gemfile',
        'src',
        'app',
        'pages',
        'public',
        'README.md'
    ].filter((marker) => fs.existsSync(path.join(rootPath, marker)));

    let fileCount = 0;
    let directoryCount = 0;
    const visitLimit = 2000;

    const visit = (dirPath: string) => {
        if ((fileCount + directoryCount) >= visitLimit) {
            return;
        }

        for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
            if (CLEAN_FOLDER_IGNORES.has(entry.name)) {
                continue;
            }

            const entryPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                directoryCount++;
                visit(entryPath);
            } else {
                fileCount++;
            }

            if ((fileCount + directoryCount) >= visitLimit) {
                return;
            }
        }
    };

    visit(rootPath);

    return {
        topLevelEntries,
        markers,
        fileCount,
        directoryCount,
        truncated: (fileCount + directoryCount) >= visitLimit
    };
}

function formatWorkspaceSnapshot(snapshot: ReturnType<typeof collectWorkspaceSnapshot>) {
    const topLevel = snapshot.topLevelEntries.length > 0
        ? snapshot.topLevelEntries.slice(0, 30).map((entry) => `- ${entry}`).join('\n')
        : '- No existing project files detected.';

    const markers = snapshot.markers.length > 0
        ? snapshot.markers.map((entry) => `- ${entry}`).join('\n')
        : '- No common project markers detected.';

    const truncatedNote = snapshot.truncated
        ? '\n- Scan note: large repository; counts were capped for install-time safety.'
        : '';

    return `## Existing Project Snapshot
- Existing top-level entries: ${snapshot.topLevelEntries.length}
- Estimated files scanned: ${snapshot.fileCount}
- Estimated directories scanned: ${snapshot.directoryCount}${truncatedNote}

### Top-Level Entries
${topLevel}

### Detected Project Markers
${markers}
`;
}

function isLegacyWorkspace(rootPath: string) {
    try {
        return fs.readdirSync(rootPath).some((entry) => !CLEAN_FOLDER_IGNORES.has(entry));
    } catch {
        return false;
    }
}

function createNextSteps(rootPath: string, locale: string, isLegacy: boolean) {
    const nextStepsPath = path.join(rootPath, 'NEXT_STEPS.md');
    if (fs.existsSync(nextStepsPath)) {
        return nextStepsPath;
    }

    const isTurkish = locale === 'tr';
    const content = isTurkish ? `# Agent OS Next Steps

Universal Agent OS bu klasore kuruldu.

## 1. Ajanla basla

AI asistanina sunu yaz:

\`\`\`text
Bir fikrim var. Bunu bir projeye donusturmeme yardim et.
\`\`\`

## 2. Kurulum tipini bil

${isLegacy ? '- Bu klasorde mevcut dosyalar bulundugu icin Legacy/Brownfield mod aktif.' : '- Bu klasor temiz kurulum olarak algilandi.'}
- Ajan once Phase-0 gorusmesi yapmali.
- Kod yazmadan once plan ve kanit disiplinini kurmali.

## 3. Hizli komutlar

- Fast-Track: kucuk ve net islerde daha hafif surec
- Status: Agent OS dosyalarinin kurulu olup olmadigini kontrol
- Closure Check: "bitti" demeden once kanit ve gate kontrolu

VS Code komut paletinde \`Agent OS:\` yazarak bu komutlara ulasabilirsin.
` : `# Agent OS Next Steps

Universal Agent OS has been installed in this workspace.

## 1. Start with your agent

Send this to your AI assistant:

\`\`\`text
I have an idea. Help me turn it into a project.
\`\`\`

## 2. Know the install mode

${isLegacy ? '- Existing files were detected, so Legacy/Brownfield mode is active.' : '- This folder was treated as a clean greenfield install.'}
- The agent should run Phase-0 first.
- The agent should create or update plans before implementation.
- Completion claims should include evidence and gate status.

## 3. Helpful commands

- Fast-Track: lighter process for tiny, well-scoped changes
- Status: check whether Agent OS files are present
- Closure Check: evidence checklist before calling work done

Open the VS Code Command Palette and type \`Agent OS:\` to use these commands.
`;

    fs.writeFileSync(nextStepsPath, content, 'utf8');
    return nextStepsPath;
}

async function openMarkdownFile(filePath: string) {
    const document = await vscode.workspace.openTextDocument(vscode.Uri.file(filePath));
    await vscode.window.showTextDocument(document, { preview: false });
}

function ensureDirectoryForFile(filePath: string) {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function backupExistingFile(rootPath: string, dest: string, backupRoot: string | undefined) {
    if (!backupRoot || !fs.existsSync(dest) || !fs.statSync(dest).isFile()) {
        return;
    }

    const relativePath = path.relative(rootPath, dest);
    const backupPath = path.join(backupRoot, relativePath);
    ensureDirectoryForFile(backupPath);
    fs.copyFileSync(dest, backupPath);
}

function resolveCollisionDestination(rootPath: string, dest: string, isLegacy: boolean) {
    if (!isLegacy || !fs.existsSync(dest)) {
        return dest;
    }

    const relativePath = path.relative(rootPath, dest).replace(/\\/g, '/');
    if (relativePath === 'README.md') {
        return path.join(rootPath, 'AGENT_OS_README.md');
    }

    return dest;
}

function copyRecursiveSync(src: string, dest: string, rootPath: string, isLegacy: boolean, backupRoot?: string) {
    if (!fs.existsSync(src)) {
        return;
    }

    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        fs.readdirSync(src).forEach((childItemName: string) => {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName),
                rootPath,
                isLegacy,
                backupRoot
            );
        });
        return;
    }

    const finalDest = resolveCollisionDestination(rootPath, dest, isLegacy);
    ensureDirectoryForFile(finalDest);
    backupExistingFile(rootPath, finalDest, backupRoot);
    fs.copyFileSync(src, finalDest);
}

function createLegacyQuarantine(rootPath: string, onboardedBy: string, snapshot: ReturnType<typeof collectWorkspaceSnapshot>) {
    const techDebtFile = path.join(rootPath, 'TECH_DEBT_AND_SECURITY.md');
    if (fs.existsSync(techDebtFile)) {
        return;
    }

    const legacyContent = `# Legacy Quarantine & Tech Debt

> [!WARNING]
> This project was onboarded as a Brownfield project via Phase-X.
> The existing codebase is quarantined. Do not refactor existing code unless explicitly requested.
> ALL NEW code must adhere strictly to Universal Agent OS rules.

${formatWorkspaceSnapshot(snapshot)}

## Onboarding Notes
- Onboarded by ${onboardedBy}.
- Existing files were detected before Agent OS installation.
- Any overwritten governance/adapter file collisions were backed up under \`.agentos-backups/\`.

## Known Legacy Systems
(Agent: Run a full project scan to populate this section with existing architectural patterns and debt.)
`;
    fs.writeFileSync(techDebtFile, legacyContent, 'utf8');
}

function installAgentOSPayload(tempDir: string, rootPath: string, locale: string, isLegacy: boolean, snapshot: ReturnType<typeof collectWorkspaceSnapshot>) {
    const backupRoot = isLegacy
        ? path.join(rootPath, '.agentos-backups', safeTimestamp())
        : undefined;

    SHARED_DIRECTORIES.forEach((folder) => {
        copyRecursiveSync(
            path.join(tempDir, folder),
            path.join(rootPath, folder),
            rootPath,
            isLegacy,
            backupRoot
        );
    });

    SHARED_FILES.forEach((fileName) => {
        copyRecursiveSync(
            path.join(tempDir, fileName),
            path.join(rootPath, fileName),
            rootPath,
            isLegacy,
            backupRoot
        );
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
        createLegacyQuarantine(rootPath, 'VS Code extension', snapshot);
    }
}

function verifyTargetWorkspace(rootPath: string) {
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

function buildStatusReport(rootPath: string, missing: string[]) {
    const requiredStatus = TARGET_REQUIRED_FILES
        .map((relativePath) => {
            const exists = fs.existsSync(path.join(rootPath, relativePath));
            return `- ${exists ? '[x]' : '[ ]'} ${relativePath}`;
        })
        .join('\n');

    const optionalStatus = [
        'NEXT_STEPS.md',
        'TECH_DEBT_AND_SECURITY.md',
        'docs/REAL_WORLD_SCENARIOS.md',
        'docs/GOVERNANCE_PROFILES.md',
        'docs/SLASH_COMMANDS.md'
    ].map((relativePath) => {
        const exists = fs.existsSync(path.join(rootPath, relativePath));
        return `- ${exists ? '[x]' : '[ ]'} ${relativePath}`;
    }).join('\n');

    const gateStatus = missing.length === 0
        ? 'PASS - required Agent OS workspace files are present.'
        : `FAIL - missing: ${missing.join(', ')}`;

    return `# Agent OS Status

## Gate

${gateStatus}

## Required Surfaces

${requiredStatus}

## Helpful Optional Surfaces

${optionalStatus}
`;
}

async function copyChatCommand(commandText: string, label: string) {
    await vscode.env.clipboard.writeText(commandText);
    vscode.window.showInformationMessage(`${label} prompt copied. Paste it into your AI chat.`);
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Universal Agent OS is now active!');

    // Status Bar Item (conditional on workspace state)
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

    function updateStatusBar() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            statusBarItem.text = '$(shield) Agent OS: No Workspace';
            statusBarItem.tooltip = 'Open a folder to use Agent OS';
            statusBarItem.command = 'agent-os.initWorkspace';
            return;
        }
        const rootPath = workspaceFolders[0].uri.fsPath;
        const agentsExists = fs.existsSync(path.join(rootPath, 'AGENTS.md'));
        if (agentsExists) {
            const missing = verifyTargetWorkspace(rootPath);
            if (missing.length > 0) {
                statusBarItem.text = '$(shield) Agent OS: Incomplete';
                statusBarItem.tooltip = 'Missing required surfaces. Click to view status.';
                statusBarItem.command = 'agent-os.showStatus';
            } else {
                statusBarItem.text = '$(shield) Agent OS: Active';
                statusBarItem.tooltip = 'Verify Governance Gate';
                statusBarItem.command = 'agent-os.verifyGovernance';
            }
        } else {
            statusBarItem.text = '$(shield) Agent OS: Not Initialized';
            statusBarItem.tooltip = 'Initialize Agent OS in this workspace';
            statusBarItem.command = 'agent-os.initWorkspace';
        }
    }

    updateStatusBar();
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Watch for AGENTS.md creation/deletion to update status bar
    const agentsWatcher = vscode.workspace.createFileSystemWatcher('**/AGENTS.md');
    agentsWatcher.onDidCreate(() => updateStatusBar());
    agentsWatcher.onDidDelete(() => updateStatusBar());
    context.subscriptions.push(agentsWatcher);

    // Unified Init Workspace (Cloud Fetch to Root)
    let initWorkspace = vscode.commands.registerCommand('agent-os.initWorkspace', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder open. Please open a folder first.');
            return;
        }
        
        const rootPath = workspaceFolders[0].uri.fsPath;

        // Ask for locale
        const localeSelection = await vscode.window.showQuickPick(
            [{ label: 'English', id: 'en' }, { label: 'Turkish', id: 'tr' }],
            { placeHolder: 'Select your preferred Agent OS language pack' }
        );

        if (!localeSelection) {
            return; // User cancelled
        }
        const locale = localeSelection.id;

        const isLegacy = isLegacyWorkspace(rootPath);
        const workspaceSnapshot = collectWorkspaceSnapshot(rootPath);

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Universal Agent OS",
            cancellable: false
        }, async (progress) => {
            return new Promise<void>((resolve, reject) => {
                progress.report({ message: "Downloading Universal Agent OS from GitHub..." });
                const tempDir = path.join(rootPath, '.agentos-temp');
                fs.rmSync(tempDir, { recursive: true, force: true });
                
                // Fetch the repo securely
                const gitCommand = `git clone --depth 1 ${REPOSITORY_URL} "${tempDir}"`;
                
                exec(gitCommand, { cwd: rootPath }, (error) => {
                    if (error) {
                        const gitHelp = error.message.includes('not recognized') || error.message.includes('not found')
                            ? ' Git does not appear to be installed. Please install Git from https://git-scm.com and try again, or download the ZIP from https://github.com/zyganali-glitch/Universal-Agent-OS and extract it manually.'
                            : ' Please check your internet connection and try again, or download the ZIP from https://github.com/zyganali-glitch/Universal-Agent-OS and extract it manually.';
                        vscode.window.showErrorMessage(`Failed to fetch Agent OS: ${error.message}.${gitHelp}`);
                        reject();
                        return;
                    }
                    
                    try {
                        progress.report({ message: `Configuring workspace (${locale})...` });
                        installAgentOSPayload(tempDir, rootPath, locale, isLegacy, workspaceSnapshot);
                        const nextStepsPath = createNextSteps(rootPath, locale, isLegacy);

                        // Clean up temporary clone
                        fs.rmSync(tempDir, { recursive: true, force: true });
                        
                        const legacyNote = isLegacy ? ' Existing project mode enabled; collisions were backed up.' : '';
                        vscode.window.showInformationMessage(
                            `Universal Agent OS (${locale}) initialized in this workspace.${legacyNote}`,
                            'Start Phase-0',
                            'Verify'
                        ).then((action) => {
                            if (action === 'Start Phase-0') {
                                vscode.commands.executeCommand('agent-os.startPhase0');
                            }
                            if (action === 'Verify') {
                                vscode.commands.executeCommand('agent-os.verifyGovernance');
                            }
                        });
                        openMarkdownFile(nextStepsPath);
                        resolve();
                    } catch (e: any) {
                        vscode.window.showErrorMessage(`Error configuring workspace: ${e.message}`);
                        reject();
                    }
                });
            });
        });
    });

    let fastTrack = vscode.commands.registerCommand('agent-os.fastTrack', async () => {
        await copyChatCommand(CHAT_COMMANDS.fastTrack, 'Fast-Track');
    });

    let showStatus = vscode.commands.registerCommand('agent-os.showStatus', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }

        const cwd = workspaceFolders[0].uri.fsPath;
        const missing = verifyTargetWorkspace(cwd);
        const statusPath = path.join(cwd, 'AGENT_OS_STATUS.md');
        fs.writeFileSync(statusPath, buildStatusReport(cwd, missing), 'utf8');
        await openMarkdownFile(statusPath);
    });

    let closureCheck = vscode.commands.registerCommand('agent-os.closureCheck', async () => {
        await copyChatCommand(CHAT_COMMANDS.closureCheck, 'Closure Check');
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
        const limit = config.get<number>('antiMonolithLimit', 400);

        const diagnostics: vscode.Diagnostic[] = [];

        if (document.lineCount > limit) {
            const range = new vscode.Range(0, 0, 0, 100);
            const diagnostic = new vscode.Diagnostic(
                range,
                `[Agent OS IL-06] Anti-Monolith Violation: File exceeds ${limit} lines. Consider spawning a new module.`,
                vscode.DiagnosticSeverity.Warning
            );
            diagnostics.push(diagnostic);
        }

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

    context.subscriptions.push(startInterview, verifyGate, fastTrack, showStatus, closureCheck, collection, initWorkspace);
}

export function deactivate() {}
