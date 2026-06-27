#!/bin/bash
# ==============================================================================
# Universal Agent OS - Zero-Leak Installer
# ==============================================================================
# Installs the runtime Agent OS governance payload into a target project.
# Usage: ./init-agent-os.sh <target-dir> [locale] [--legacy]
# Example: ./init-agent-os.sh /path/to/project en
#          ./init-agent-os.sh . tr --legacy
# ==============================================================================

set -e

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="$1"
LANG_CHOICE="${2:-en}"
LEGACY_FLAG="${3:-}"
LOCALE="$LANG_CHOICE"

CLEAN_FOLDER_IGNORES=" .git .vscode .idea .DS_Store Thumbs.db node_modules .agentos-backups "
SHARED_DIRECTORIES=( ".agent" ".github" ".gitlab" "agents" "docs" "examples" "mcp-server" "skills" )
SHARED_FILES=(
  "CHANGELOG.md"
  "LICENSE"
  "LICENSING.md"
  "VERSION"
  "VERSIONING.md"
  "agent_memory.json"
  "requirements-dev.txt"
  "sweep.yaml"
  "walkthrough.md"
)

echo "=========================================================="
echo "Universal Agent OS - Native Bootstrap Installer"
echo "=========================================================="

if [ -z "$TARGET_DIR" ]; then
    echo "ERROR: Target directory not specified."
    echo "Usage: ./init-agent-os.sh <target-dir> [locale] [--legacy]"
    echo "Example: ./init-agent-os.sh . en"
    exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
    echo "ERROR: Target directory not found: $TARGET_DIR"
    exit 1
fi

if [[ "$LOCALE" != "en" && "$LOCALE" != "tr" ]]; then
    echo "ERROR: Only 'en' or 'tr' locales are supported."
    exit 1
fi

echo "Loading '$LOCALE' locale pack..."

OS_SOURCE="$SOURCE_DIR/$LOCALE"
if [ ! -d "$OS_SOURCE" ]; then
    echo "ERROR: Source locale directory not found: $OS_SOURCE"
    exit 1
fi

is_legacy_target() {
    local found=1
    while IFS= read -r -d '' entry; do
        local base
        base="$(basename "$entry")"
        if [[ "$CLEAN_FOLDER_IGNORES" != *" $base "* ]]; then
            found=0
            break
        fi
    done < <(find "$TARGET_DIR" -mindepth 1 -maxdepth 1 -print0)
    return "$found"
}

LEGACY_MODE=0
if [ "$LEGACY_FLAG" = "--legacy" ] || is_legacy_target; then
    LEGACY_MODE=1
fi

BACKUP_ROOT=""
if [ "$LEGACY_MODE" -eq 1 ]; then
    BACKUP_ROOT="$TARGET_DIR/.agentos-backups/$(date +%Y%m%d-%H%M%S)"
fi

resolve_destination() {
    local dest="$1"
    if [ "$LEGACY_MODE" -eq 1 ] && [ -e "$dest" ]; then
        local relative="${dest#"$TARGET_DIR"/}"
        if [ "$relative" = "README.md" ]; then
            echo "$TARGET_DIR/AGENT_OS_README.md"
            return
        fi
    fi
    echo "$dest"
}

backup_collision() {
    local dest="$1"
    if [ "$LEGACY_MODE" -ne 1 ] || [ -z "$BACKUP_ROOT" ] || [ ! -f "$dest" ]; then
        return
    fi

    local relative="${dest#"$TARGET_DIR"/}"
    local backup_path="$BACKUP_ROOT/$relative"
    mkdir -p "$(dirname "$backup_path")"
    cp -f "$dest" "$backup_path"
}

copy_file() {
    local src="$1"
    local dest="$2"
    local final_dest
    final_dest="$(resolve_destination "$dest")"
    mkdir -p "$(dirname "$final_dest")"
    backup_collision "$final_dest"
    cp -f "$src" "$final_dest"
}

copy_tree() {
    local src="$1"
    local dest="$2"

    if [ ! -e "$src" ]; then
        return
    fi

    if [ -f "$src" ]; then
        copy_file "$src" "$dest"
        return
    fi

    mkdir -p "$dest"
    while IFS= read -r -d '' item; do
        local relative="${item#"$src"/}"
        local target="$dest/$relative"
        if [ -d "$item" ]; then
            mkdir -p "$target"
        else
            copy_file "$item" "$target"
        fi
    done < <(find "$src" -mindepth 1 -print0)
}

echo "Copying shared Agent OS runtime files..."
for folder in "${SHARED_DIRECTORIES[@]}"; do
    copy_tree "$SOURCE_DIR/$folder" "$TARGET_DIR/$folder"
done

for file in "${SHARED_FILES[@]}"; do
    copy_tree "$SOURCE_DIR/$file" "$TARGET_DIR/$file"
done

echo "Copying localized Agent OS files..."
copy_tree "$OS_SOURCE" "$TARGET_DIR"

echo "Creating planning directory and archive..."
mkdir -p "$TARGET_DIR/plans/completed"

if [ "$LEGACY_MODE" -eq 1 ]; then
    echo "Applying Legacy/Brownfield Quarantine..."
    TECH_DEBT_FILE="$TARGET_DIR/TECH_DEBT_AND_SECURITY.md"
    if [ ! -f "$TECH_DEBT_FILE" ]; then
        cat << 'EOF' > "$TECH_DEBT_FILE"
# Legacy Quarantine & Tech Debt

> [!WARNING]
> This project was onboarded as a Brownfield project via Phase-X.
> The existing codebase is quarantined. Do not refactor existing code unless explicitly requested.
> ALL NEW code must adhere strictly to Universal Agent OS rules.

## Existing Project Snapshot
- Onboarded by Bash bootstrap.
- Existing files were detected before Agent OS installation.
- Any overwritten governance/adapter file collisions were backed up under `.agentos-backups/`.

## Known Legacy Systems
(Agent: Run a full project scan to populate this section with existing architectural patterns and debt.)
EOF
    fi
    echo "   -> Legacy quarantine is active."
fi

echo "=========================================================="
echo "SUCCESS: Universal Agent OS installed!"
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
