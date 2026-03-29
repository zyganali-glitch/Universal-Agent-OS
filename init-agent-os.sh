#!/bin/bash
# ==============================================================================
# Universal Agent Governance OS - Zero-Leak Installer
# ==============================================================================
# Bu script, Agent Governance OS'i herhangi bir yeni projeye "sızıntısız"
# ve "Universal-OS derinliğinde" kurmak için tasarlanmıştır.
# Kullanım: ./init-agent-os.sh /hedef/proje/yolu
# ==============================================================================

set -e

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="$1"

echo "=========================================================="
echo "🤖 Universal Agent Governance OS Kurulumu Başlıyor..."
echo "=========================================================="

# Hedef dizin kontrolü
if [ -z "$TARGET_DIR" ]; then
    echo "❌ HATA: Hedef dizin belirtilmedi!"
    echo "Kullanım: ./init-agent-os.sh /hedef/proje/yolu"
    exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ HATA: Hedef dizin bulunamadı: $TARGET_DIR"
    exit 1
fi

# Dil Seçimi
read -p "Dil seçimi (tr/en) [varsayılan: tr]: " LANG_CHOICE
LANG_CHOICE=${LANG_CHOICE:-tr}

if [[ "$LANG_CHOICE" != "tr" && "$LANG_CHOICE" != "en" ]]; then
    echo "❌ HATA: Yalnızca 'tr' veya 'en' desteklenmektedir."
    exit 1
fi

echo "🔹 '$LANG_CHOICE' dil paketi yükleniyor..."

# Kaynak klasör yolu
OS_SOURCE="$SOURCE_DIR/$LANG_CHOICE"

if [ ! -d "$OS_SOURCE" ]; then
    echo "❌ HATA: Kaynak klasör bulunamadı: $OS_SOURCE"
    exit 1
fi

# 1. Kopyalama işlemi
echo "🔹 Temel Agent-OS dosyaları kopyalanıyor..."
cp -r "$OS_SOURCE/." "$TARGET_DIR/"

# 2. Plan klasörünü oluştur
echo "🔹 Planlama dizini ve arşiv oluşturuluyor..."
mkdir -p "$TARGET_DIR/plans/completed"

echo "=========================================================="
echo "✅ BAŞARILI: Agent Governance OS kuruldu!"
echo ""
echo "Sonraki Adımlar (Mentor Tavsiyeleri):"
echo "1. Hedef projenizde bir AI aracını açın."
echo "2. Yeni sohbet başlatın ve ilk mesaj olarak şunu yazın:"
echo "   'Lütfen kök dizindeki AGENTS.md ve .agent/workflows/session-bootstrap.md dosyasını oku.'"
echo "3. Ajan sizinle İnteraktif Phase 0 mülakatına başlayacaktır."
echo "=========================================================="
exit 0
