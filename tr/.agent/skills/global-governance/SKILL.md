---
name: global-governance
description: Reusable governance skill. Use this when creating, adapting, reviewing, or hardening AGENTS/instructions/workflows/skills/global plan templates across repositories without narrowing repo-specific contracts.
---

# Global Governance Skill

Bu skill governance propagation ve governance hardening islerinde ana ajan icin operasyon ceklisti sunar.
Canli repoda `AGENTS.md`, ilgili rule dosyalari, aktif plan ve kok `AGENT_OS_PLAN_TEMPLATE.md` daha ust otoritedir.
Bu pakette ilk referans `AGENT_OS_RULES.md` donor kaynagidir; skill onu daraltmaz, faal is akisina cevirir.

## 1) Ne Icin Kullanilir
- yeni repo bootstrap'i
- governance propagation
- agent instruction paketi kurma veya sertlestirme
- reusable starter-kit olusturma
- aktif governance yuzeylerini review edip zenginlestirme

## 2) Ilk Adimlar
1. `AGENTS.md` oku.
2. `AGENT_OS_RULES.md` donor kaynagini oku.
3. Ilgili rule/workflow dosyalarini oku.
4. Kok global plan sablonunu oku.
5. Aktif plani bul veya yeni plan ac.
6. Scope lock, allowlist ve denylist yaz.
7. Ana ajan / alt ajan rol matrisini belirle.
8. `Plan -> Kanit -> Test` kapanis kilidini acik yaz.

## 3) Skill Kapsami
- Bu skill tek basina resmi governance otoritesi degildir.
- Asil kaynak `AGENTS.md`'dir.
- Adapter dosyalari ince delegasyon yuzeyleri olabilir ama fakir ozet haline indirgenemez.
- Reusable donor paket uretirken tek markdown dosyasiyla yetinmek yasaktir; agent adapter, workflow, skill ve plan template yuzeyleri birlikte dusunulur.

## 4) Alt Ajan Orkestrasyon Protokolu
- Ana ajan = sohbet ajani.
- Tek yazar varsayilandir.
- Maksimum 2-3 aktif mikro-faz.
- Varsayilan roller: canli sorun avi, plan challenger, test/gate verifier.
- Opsiyonel roller: i18n, accessibility, security, performance, docs, release, domain.
- Gercek alt ajan yoksa sequential fallback notu zorunludur.

## 5) Skill Ciktisi Ne Uretmeli
- repo-koku `AGENTS.md`
- repo-koku `AGENT_OS_PLAN_TEMPLATE.md`
- gerekirse locale/agent-native adapter yuzeyleri
- master roadmap + child execution plan portfoyu
- role matrix, gate matrix ve evidence standardi

## 6) Pazarlik Edilemezler
- No-New-Debt
- fake completion yasagi
- modulerlik zorunlulugu
- mobile/accessibility/i18n/security/offline continuity
- completed-plan archive kurali
- Triple-Sync Lock
- role parity zorunlulugu

## 7) Kanit Standardi
- dosya + sembol + neden onemli
- diff ozeti
- test/gate sonucu
- manuel adimlar

## 8) Cikis Formati
1. Ozet
2. Kanit/Bulgu
3. Riskler
4. Aksiyonlar
5. Smoke test adimlari
6. Gate sonuclari
7. Skor
