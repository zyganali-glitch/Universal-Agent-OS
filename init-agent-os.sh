#!/bin/bash
# ==============================================================================
# Agent Governance OS - Locale Pack Installer
# ==============================================================================
# Installs one locale pack into a target project directory.
# Kullanim / Usage: ./init-agent-os.sh /target/project/path
# ==============================================================================

set -e

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="$1"

get_available_locales() {
    local locales=()
    local dir
    for dir in "$SOURCE_DIR"/*; do
        if [ -d "$dir" ] && [ -f "$dir/AGENTS.md" ] && [ -f "$dir/AGENT_OS_RULES.md" ] && [ -f "$dir/AGENT_OS_PLAN_TEMPLATE.md" ]; then
            locales+=("$(basename "$dir")")
        fi
    done
    printf '%s\n' "${locales[@]}"
}

mapfile -t AVAILABLE_LOCALES < <(get_available_locales)

if [ ${#AVAILABLE_LOCALES[@]} -eq 0 ]; then
    echo "ERROR: No locale packs were found under $SOURCE_DIR"
    exit 1
fi

DEFAULT_LOCALE="en"
if [[ ! " ${AVAILABLE_LOCALES[*]} " =~ " ${DEFAULT_LOCALE} " ]]; then
    DEFAULT_LOCALE="${AVAILABLE_LOCALES[0]}"
fi

echo "=========================================================="
echo "Starting Agent Governance OS install..."
echo "=========================================================="

if [ -z "$TARGET_DIR" ]; then
    echo "ERROR: Target directory is required."
    echo "Usage / Kullanim: ./init-agent-os.sh /target/project/path"
    exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
    echo "ERROR: Target directory was not found: $TARGET_DIR"
    exit 1
fi

AVAILABLE_DISPLAY=$(printf '%s, ' "${AVAILABLE_LOCALES[@]}")
AVAILABLE_DISPLAY=${AVAILABLE_DISPLAY%, }

read -r -p "Locale / Dil secimi [${AVAILABLE_DISPLAY}] [default: ${DEFAULT_LOCALE}]: " LANG_CHOICE
LANG_CHOICE=${LANG_CHOICE:-$DEFAULT_LOCALE}

if [[ ! " ${AVAILABLE_LOCALES[*]} " =~ " ${LANG_CHOICE} " ]]; then
    echo "ERROR: Unsupported locale '${LANG_CHOICE}'. Available locales: ${AVAILABLE_DISPLAY}"
    exit 1
fi

echo "Installing locale pack: ${LANG_CHOICE}"

OS_SOURCE="$SOURCE_DIR/$LANG_CHOICE"

if [ ! -d "$OS_SOURCE" ]; then
    echo "ERROR: Locale source directory was not found: $OS_SOURCE"
    exit 1
fi

echo "Copying locale-pack files into target repo..."
cp -R "$OS_SOURCE/." "$TARGET_DIR/"

echo "Creating planning directories..."
mkdir -p "$TARGET_DIR/plans/completed"

echo "=========================================================="
echo "SUCCESS: Agent Governance OS locale pack installed."
echo ""
echo "Next Steps / Sonraki Adimlar:"
echo "1. Open your target repo in the AI-enabled IDE or agent runtime of your choice."
echo "2. Start a new session and ask the agent to read AGENTS.md and .agent/workflows/session-bootstrap.md."
echo "3. Complete the Phase 0 interview before any implementation begins."
echo "=========================================================="
exit 0
