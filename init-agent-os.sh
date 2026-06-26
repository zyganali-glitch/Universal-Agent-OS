#!/bin/bash
# ==============================================================================
# Universal Agent Governance OS - Zero-Leak Installer
# ==============================================================================
# This script installs the Agent Governance OS into any target project.
# Usage: ./init-agent-os.sh <target-dir> [locale]
# Example: ./init-agent-os.sh /path/to/project en
#          ./init-agent-os.sh . tr
# ==============================================================================

set -e

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="$1"
LOCALE="${2:-en}"

echo "=========================================================="
echo "🤖 Universal Agent Governance OS — Installation Starting..."
echo "=========================================================="

# Validate target directory
if [ -z "$TARGET_DIR" ]; then
    echo "❌ ERROR: Target directory not specified."
    echo "Usage: ./init-agent-os.sh <target-dir> [locale]"
    echo "Example: ./init-agent-os.sh . en"
    exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ ERROR: Target directory not found: $TARGET_DIR"
    exit 1
fi

# Validate locale
if [[ "$LOCALE" != "en" && "$LOCALE" != "tr" ]]; then
    echo "❌ ERROR: Only 'en' or 'tr' locales are supported."
    exit 1
fi

echo "🔹 Loading '$LOCALE' locale pack..."

# Source locale pack path
OS_SOURCE="$SOURCE_DIR/$LOCALE"

if [ ! -d "$OS_SOURCE" ]; then
    echo "❌ ERROR: Source locale directory not found: $OS_SOURCE"
    exit 1
fi

# 1. Copy locale pack files to target directory
echo "🔹 Copying core Agent-OS files..."
cp -r "$OS_SOURCE/." "$TARGET_DIR/"

# 2. Create plans directory structure
echo "🔹 Creating planning directory and archive..."
mkdir -p "$TARGET_DIR/plans/completed"

echo "=========================================================="
echo "✅ SUCCESS: Agent Governance OS installed!"
echo ""
echo "Next Steps (Mentor Recommendations):"
echo "1. Open your target project in an AI-enabled IDE."
echo "2. Start a new chat and type as the first message:"
echo "   'I have an idea. Help me turn it into a project.'"
echo "   (or 'Bir fikrim var.' in Turkish)"
echo "3. The agent will auto-discover the governance framework"
echo "   and begin the Interactive Phase-0 interview with you."
echo "=========================================================="
exit 0
