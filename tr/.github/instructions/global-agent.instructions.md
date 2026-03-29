---
applyTo: "**"
---

# Global Reusable All-Files Instructions

Bu instruction dosyasi Copilot'un tum dosyalara yayilan davranis kilididir.
Kisa checklist degil; donor omurganin her dosyada hangi disiplinle korunacagini tanimlar.

## Mandatory
- Paket-ici kanonik donor kaynak olarak once `/AGENT_OS_RULES.md` dosyasini oku.
- Kod onermeden veya patch yazmadan once `/AGENTS.md` ve `/.github/copilot-instructions.md` dosyalarini oku.
- `/AGENTS.md` tek kaynak otoritedir.
- Root `/AGENT_OS_PLAN_TEMPLATE.md` tek kanonik plan sablonudur.

## Do not continue if any of the following is missing
- `/plans/` altinda aktif veya yeni olusturulmus plan
- degisecek dosyalari kapsayan explicit allowlist
- closure icin acik evidence ve gate yolu

## Repository rules that must be preserved or expanded, never narrowed
- `Tech-Debt Delta = 0`
- placeholder/stub/demo completion yok
- allowlist disina scope drift yok
- varsayilan billing/auth/telemetry aktivasyonu yok
- offline/PWA regresyonu yok
- parity gerekiyorsa tek dilli gorunen UI yok
- partial plan update yok
- completed plan `plans/` icinde birakilmaz
- main-agent orchestration, single-writer default ve gerekirse `fallback-to-sequential` korunur

## Copilot-specific execution discipline
- Ilk cevapta `MODE`, scope lock, allowlist/denylist, aktif plan ve ilk mikro-fazi bildir.
- Yeni repo bootstrap'inda kullanici mutabakati tamamlanmadan roadmap portfoyu dondurma.
- Uygulama oncesi master roadmap + child plan hiyerarsisini kur.
- Her discovered work satirini planda izle.
- Shared plan/config/template dosyalarinda ikinci writer yaratma.

## When live behavior contradicts a static PASS
- gorevi durustce geri ac
- discovered work'u plan icine kaydet
- task table, gates, risks ve handoff yuzeylerini atomik guncelle

## Closure lock
- Zorunlu gate'lerden biri `FAIL` veya `NOT_RUN` ise kapanis yoktur.
- Push/deploy/repo-sync isteginde Triple-Sync Lock zorunludur.
- Tamamlanan plan ayni closure adiminda arsive tasinir.
