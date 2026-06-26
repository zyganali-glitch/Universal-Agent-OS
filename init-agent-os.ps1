# ==============================================================================
# Universal Agent Governance OS - Zero-Leak Installer (PowerShell)
# ==============================================================================
# This script installs the Agent Governance OS into any new project with
# zero-leak depth and Universal-OS compliance.
# Usage: ./init-agent-os.ps1 -TargetDir <your-project-path> [-Locale en|tr]
# ==============================================================================

[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, HelpMessage = "Target project directory path")]
    [string]$TargetDir,

    [Parameter(Mandatory = $false, HelpMessage = "Locale pack to install (en or tr)")]
    [ValidateSet("en", "tr")]
    [string]$Locale = "en"
)

$ErrorActionPreference = "Stop"

$SourceDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

Write-Host "=========================================================="
Write-Host "🤖 Universal Agent Governance OS Installation Starting..."
Write-Host "=========================================================="

# Validate target directory
if (-not (Test-Path -Path $TargetDir -PathType Container)) {
    Write-Error "ERROR: Target directory not found: $TargetDir"
    exit 1
}

Write-Host "🔹 Loading '$Locale' locale pack..."

# Source locale pack path
$OsSource = Join-Path $SourceDir $Locale

if (-not (Test-Path -Path $OsSource -PathType Container)) {
    Write-Error "ERROR: Source locale directory not found: $OsSource"
    exit 1
}

# 1. Copy locale pack files to target directory
Write-Host "🔹 Copying core Agent-OS files..."
try {
    Copy-Item -Path (Join-Path $OsSource "*") -Destination $TargetDir -Recurse -Force
}
catch {
    Write-Error "ERROR: Failed to copy locale pack files: $_"
    exit 1
}

# 2. Create plans directory structure
Write-Host "🔹 Creating planning directory and archive..."
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

Write-Host "=========================================================="
Write-Host "✅ SUCCESS: Agent Governance OS installed!"
Write-Host ""
Write-Host "Next Steps (Mentor Recommendations):"
Write-Host "1. Open your target project in an AI-enabled IDE."
Write-Host "2. Start a new chat and type as the first message:"
Write-Host "   'Please read AGENTS.md and .agent/workflows/session-bootstrap.md in the root directory.'"
Write-Host "3. The agent will begin the Interactive Phase 0 interview with you."
Write-Host "=========================================================="
exit 0
