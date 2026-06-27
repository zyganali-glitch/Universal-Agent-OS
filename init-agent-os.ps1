# ==============================================================================
# Universal Agent OS - Zero-Leak Installer (PowerShell)
# ==============================================================================
# Installs the runtime Agent OS governance payload into a target project.
# Usage: ./init-agent-os.ps1 -TargetDir <your-project-path> [-Locale en|tr] [-Legacy]
# ==============================================================================

[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, HelpMessage = "Target project directory path")]
    [string]$TargetDir,

    [Parameter(Mandatory = $false, HelpMessage = "Locale pack to install (en or tr)")]
    [ValidateSet("en", "tr")]
    [string]$Locale = "en",

    [Parameter(Mandatory = $false)]
    [switch]$Legacy
)

$ErrorActionPreference = "Stop"

$SourceDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$CleanFolderIgnores = @(".git", ".vscode", ".idea", ".DS_Store", "Thumbs.db", "node_modules", ".agentos-backups")
$SharedDirectories = @(".agent", ".github", ".gitlab", "agents", "docs", "examples", "mcp-server", "skills")
$SharedFiles = @(
    "CHANGELOG.md",
    "LICENSE",
    "LICENSING.md",
    "VERSION",
    "VERSIONING.md",
    "agent_memory.json",
    "requirements-dev.txt",
    "sweep.yaml",
    "walkthrough.md"
)

function Test-LegacyTarget {
    param([string]$Path)

    $entries = Get-ChildItem -LiteralPath $Path -Force
    foreach ($entry in $entries) {
        if ($CleanFolderIgnores -notcontains $entry.Name) {
            return $true
        }
    }
    return $false
}

function Get-AgentOsWorkspaceSnapshot {
    param([string]$Path)

    $entries = Get-ChildItem -LiteralPath $Path -Force | Where-Object { $CleanFolderIgnores -notcontains $_.Name }
    $markers = @(
        "package.json",
        "pyproject.toml",
        "requirements.txt",
        "Cargo.toml",
        "go.mod",
        "pom.xml",
        "build.gradle",
        "composer.json",
        "Gemfile",
        "src",
        "app",
        "pages",
        "public",
        "README.md"
    ) | Where-Object { Test-Path -LiteralPath (Join-Path $Path $_) }

    $fileCount = 0
    $directoryCount = 0
    try {
        $scan = Get-ChildItem -LiteralPath $Path -Force -Recurse -ErrorAction SilentlyContinue |
            Where-Object { $CleanFolderIgnores -notcontains $_.Name } |
            Select-Object -First 2000
        $fileCount = @($scan | Where-Object { -not $_.PSIsContainer }).Count
        $directoryCount = @($scan | Where-Object { $_.PSIsContainer }).Count
    }
    catch {
        $fileCount = 0
        $directoryCount = 0
    }

    return [pscustomobject]@{
        Entries = @($entries | ForEach-Object { $_.Name } | Sort-Object)
        Markers = @($markers)
        FileCount = $fileCount
        DirectoryCount = $directoryCount
    }
}

function Format-AgentOsWorkspaceSnapshot {
    param($Snapshot)

    $topLevel = if ($Snapshot.Entries.Count -gt 0) {
        ($Snapshot.Entries | Select-Object -First 30 | ForEach-Object { "- $_" }) -join "`n"
    } else {
        "- No existing project files detected."
    }

    $markers = if ($Snapshot.Markers.Count -gt 0) {
        ($Snapshot.Markers | ForEach-Object { "- $_" }) -join "`n"
    } else {
        "- No common project markers detected."
    }

    return @"
## Existing Project Snapshot
- Existing top-level entries: $($Snapshot.Entries.Count)
- Estimated files scanned: $($Snapshot.FileCount)
- Estimated directories scanned: $($Snapshot.DirectoryCount)

### Top-Level Entries
$topLevel

### Detected Project Markers
$markers
"@
}

function New-AgentOsNextSteps {
    param(
        [string]$RootPath,
        [string]$Locale,
        [bool]$IsLegacy
    )

    $nextStepsPath = Join-Path $RootPath "NEXT_STEPS.md"
    if (Test-Path -LiteralPath $nextStepsPath) {
        return
    }

    $modeLine = if ($IsLegacy) {
        "Existing files were detected, so Legacy/Brownfield mode is active."
    } else {
        "This folder was treated as a clean greenfield install."
    }

    $content = @"
# Agent OS Next Steps

Universal Agent OS has been installed in this workspace.

## 1. Start with your agent

Send this to your AI assistant:

I have an idea. Help me turn it into a project.

## 2. Know the install mode

- $modeLine
- The agent should run Phase-0 first.
- The agent should create or update plans before implementation.
- Completion claims should include evidence and gate status.

## 3. Helpful commands

- Fast-Track: lighter process for tiny, well-scoped changes
- Status: check whether Agent OS files are present
- Closure Check: evidence checklist before calling work done

Open the VS Code Command Palette and type "Agent OS:" to use these commands when the extension is installed.
"@

    Set-Content -Path $nextStepsPath -Value $content -Encoding UTF8
}

function Get-AgentOsRelativePath {
    param(
        [string]$RootPath,
        [string]$Destination
    )

    $rootFull = [System.IO.Path]::GetFullPath($RootPath).TrimEnd([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar)
    $destFull = [System.IO.Path]::GetFullPath($Destination)
    $rootPrefix = $rootFull + [System.IO.Path]::DirectorySeparatorChar

    if ($destFull.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
        return $destFull.Substring($rootPrefix.Length)
    }

    return Split-Path -Leaf $Destination
}

function Get-AgentOsDestination {
    param(
        [string]$RootPath,
        [string]$Destination,
        [bool]$IsLegacy
    )

    if (-not $IsLegacy -or -not (Test-Path -LiteralPath $Destination)) {
        return $Destination
    }

    $relative = (Get-AgentOsRelativePath -RootPath $RootPath -Destination $Destination).Replace("\", "/")
    if ($relative -eq "README.md") {
        return (Join-Path $RootPath "AGENT_OS_README.md")
    }

    return $Destination
}

function Backup-AgentOsCollision {
    param(
        [string]$RootPath,
        [string]$Destination,
        [string]$BackupRoot
    )

    if ([string]::IsNullOrWhiteSpace($BackupRoot) -or -not (Test-Path -LiteralPath $Destination -PathType Leaf)) {
        return
    }

    $relative = Get-AgentOsRelativePath -RootPath $RootPath -Destination $Destination
    $backupPath = Join-Path $BackupRoot $relative
    $backupDir = Split-Path -Parent $backupPath
    if (-not (Test-Path -LiteralPath $backupDir)) {
        New-Item -Path $backupDir -ItemType Directory -Force | Out-Null
    }
    Copy-Item -LiteralPath $Destination -Destination $backupPath -Force
}

function Copy-AgentOsItem {
    param(
        [string]$Source,
        [string]$Destination,
        [string]$RootPath,
        [bool]$IsLegacy,
        [string]$BackupRoot
    )

    if (-not (Test-Path -LiteralPath $Source)) {
        return
    }

    if (Test-Path -LiteralPath $Source -PathType Container) {
        if (-not (Test-Path -LiteralPath $Destination)) {
            New-Item -Path $Destination -ItemType Directory -Force | Out-Null
        }

        Get-ChildItem -LiteralPath $Source -Force | ForEach-Object {
            Copy-AgentOsItem `
                -Source $_.FullName `
                -Destination (Join-Path $Destination $_.Name) `
                -RootPath $RootPath `
                -IsLegacy $IsLegacy `
                -BackupRoot $BackupRoot
        }
        return
    }

    $finalDestination = Get-AgentOsDestination -RootPath $RootPath -Destination $Destination -IsLegacy $IsLegacy
    $destinationDir = Split-Path -Parent $finalDestination
    if (-not (Test-Path -LiteralPath $destinationDir)) {
        New-Item -Path $destinationDir -ItemType Directory -Force | Out-Null
    }

    Backup-AgentOsCollision -RootPath $RootPath -Destination $finalDestination -BackupRoot $BackupRoot
    Copy-Item -LiteralPath $Source -Destination $finalDestination -Force
}

Write-Host "=========================================================="
Write-Host "Universal Agent OS - Native Bootstrap Installer" -ForegroundColor Cyan
Write-Host "=========================================================="

if (-not (Test-Path -Path $TargetDir -PathType Container)) {
    Write-Error "ERROR: Target directory not found: $TargetDir"
    exit 1
}

Write-Host "Loading '$Locale' locale pack..."

$OsSource = Join-Path $SourceDir $Locale
if (-not (Test-Path -Path $OsSource -PathType Container)) {
    Write-Error "ERROR: Source locale directory not found: $OsSource"
    exit 1
}

$IsLegacy = $Legacy -or (Test-LegacyTarget -Path $TargetDir)
$WorkspaceSnapshot = Get-AgentOsWorkspaceSnapshot -Path $TargetDir
$BackupRoot = ""
if ($IsLegacy) {
    $BackupRoot = Join-Path $TargetDir (Join-Path ".agentos-backups" (Get-Date -Format "yyyyMMdd-HHmmss"))
}

Write-Host "Copying shared Agent OS runtime files..."
try {
    foreach ($folder in $SharedDirectories) {
        Copy-AgentOsItem -Source (Join-Path $SourceDir $folder) -Destination (Join-Path $TargetDir $folder) -RootPath $TargetDir -IsLegacy $IsLegacy -BackupRoot $BackupRoot
    }

    foreach ($file in $SharedFiles) {
        Copy-AgentOsItem -Source (Join-Path $SourceDir $file) -Destination (Join-Path $TargetDir $file) -RootPath $TargetDir -IsLegacy $IsLegacy -BackupRoot $BackupRoot
    }
}
catch {
    Write-Error "ERROR: Failed to copy shared Agent OS files: $_"
    exit 1
}

Write-Host "Copying localized Agent OS files..."
try {
    Copy-AgentOsItem -Source $OsSource -Destination $TargetDir -RootPath $TargetDir -IsLegacy $IsLegacy -BackupRoot $BackupRoot
}
catch {
    Write-Error "ERROR: Failed to copy locale pack files: $_"
    exit 1
}

Write-Host "Creating planning directory and archive..."
$PlansDir = Join-Path $TargetDir "plans"
$CompletedDir = Join-Path $PlansDir "completed"

try {
    if (-not (Test-Path -Path $CompletedDir)) {
        New-Item -Path $CompletedDir -ItemType Directory -Force | Out-Null
    }
}
catch {
    Write-Error "ERROR: Failed to create plans directory: $_"
    exit 1
}

if ($IsLegacy) {
    Write-Host "Applying Legacy/Brownfield Quarantine..."
    $TechDebtFile = Join-Path $TargetDir "TECH_DEBT_AND_SECURITY.md"
    $LegacyContent = @"
# Legacy Quarantine & Tech Debt

> [!WARNING]
> This project was onboarded as a Brownfield project via Phase-X.
> The existing codebase is quarantined. Do not refactor existing code unless explicitly requested.
> ALL NEW code must adhere strictly to Universal Agent OS rules.

$(Format-AgentOsWorkspaceSnapshot -Snapshot $WorkspaceSnapshot)

## Onboarding Notes
- Onboarded by PowerShell bootstrap.
- Existing files were detected before Agent OS installation.
- Any overwritten governance/adapter file collisions were backed up under .agentos-backups/.

## Known Legacy Systems
(Agent: Run a full project scan to populate this section with existing architectural patterns and debt.)
"@

    if (-not (Test-Path -LiteralPath $TechDebtFile)) {
        Set-Content -Path $TechDebtFile -Value $LegacyContent -Encoding UTF8
    }
    Write-Host "   -> Legacy quarantine is active."
}

New-AgentOsNextSteps -RootPath $TargetDir -Locale $Locale -IsLegacy $IsLegacy

Write-Host "=========================================================="
Write-Host "SUCCESS: Universal Agent OS installed!"
Write-Host ""
Write-Host "Next Steps (Mentor Recommendations):"
Write-Host "1. Open your target project in an AI-enabled IDE."
Write-Host "2. Start a new chat and type as the first message:"
Write-Host "   'I have an idea. Help me turn it into a project.'"
Write-Host "   (or 'Bir fikrim var.' in Turkish)"
Write-Host "3. The agent will begin the Interactive Phase-0 interview with you."
Write-Host "=========================================================="
exit 0
