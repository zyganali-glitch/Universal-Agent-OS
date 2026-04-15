param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$TargetDir,

    [Parameter(Mandatory = $false)]
    [string]$Locale
)

$ErrorActionPreference = 'Stop'

function Get-AvailableLocales {
    param([string]$Root)

    Get-ChildItem -Path $Root -Directory | Where-Object {
        (Test-Path (Join-Path $_.FullName 'AGENTS.md')) -and
        (Test-Path (Join-Path $_.FullName 'AGENT_OS_RULES.md')) -and
        (Test-Path (Join-Path $_.FullName 'AGENT_OS_PLAN_TEMPLATE.md'))
    } | Select-Object -ExpandProperty Name
}

$sourceDir = $PSScriptRoot
$availableLocales = @(Get-AvailableLocales -Root $sourceDir)

if ($availableLocales.Count -eq 0) {
    throw "No locale packs were found under $sourceDir"
}

if (-not (Test-Path $TargetDir -PathType Container)) {
    throw "Target directory was not found: $TargetDir"
}

$defaultLocale = if ($availableLocales -contains 'en') { 'en' } else { $availableLocales[0] }
if (-not $Locale) {
    $Locale = $defaultLocale
}

if ($Locale -notin $availableLocales) {
    throw "Unsupported locale '$Locale'. Available locales: $($availableLocales -join ', ')"
}

$osSource = Join-Path $sourceDir $Locale

Write-Output '=========================================================='
Write-Output 'Starting Agent Governance OS install...'
Write-Output '=========================================================='
Write-Output "Installing locale pack: $Locale"

Get-ChildItem -Path $osSource -Force | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $TargetDir -Recurse -Force
}

$plansArchive = Join-Path $TargetDir 'plans\completed'
New-Item -Path $plansArchive -ItemType Directory -Force | Out-Null

Write-Output '=========================================================='
Write-Output 'SUCCESS: Agent Governance OS locale pack installed.'
Write-Output ''
Write-Output 'Next Steps / Sonraki Adimlar:'
Write-Output '1. Open your target repo in the AI-enabled IDE or agent runtime of your choice.'
Write-Output '2. Start a new session and ask the agent to read AGENTS.md and .agent/workflows/session-bootstrap.md.'
Write-Output '3. Complete the Phase 0 interview before any implementation begins.'
Write-Output '=========================================================='