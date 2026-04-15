# AGENTS.md - GLOBAL REUSABLE GOVERNANCE SOURCE

Amac: Yeni is, yeni teknik borc uretmesin. Kanit + Gate olmadan PASS yok.

Bu dosya proje-agnostik bir donor omurgadir.
Hedef repoda uyarlanirken repo-ozel kalite kontratlari korunur ve gerekiyorsa genisletilir; asla budanmaz.
Bu pakette ilk okunacak kanonik donor kaynak `AGENT_OS_RULES.md` dosyasidir.

> [!CAUTION]
> **KESİN SIZINTI KİLİDİ (ZERO-LEAK LOCK):**
> Bu dosyayı ve herhangi bir ajan yapılandırma dosyasını okuyan ajan; projede neyin, hangi platformda (Web, Mobil, Oyun vs.) çalışacağını anlamak için öncelikle **Kullanıcı Mutabakatı (İnteraktif Phase 0 Q&A)** adımını tamamlamak zorundadır! 
> - Kullanıcı ile mentor tonunda ortak bir dil oluşturmadan,
> - Sorular sorularak projenin ruhu (oyun mu, mobil mi, web mi?) anlaşılıp karara bağlanmadan,
> - Ve bu kararlar doğrultusunda kök dizindeki `AGENT_OS_PLAN_TEMPLATE.md` üretilmeden,
> **Hiçbir dosya düzenlenemez, kod oluşturulamaz ve komut çalıştırılamaz.** Kilit atlamak, planı esnetmek ve yanlış teknoloji eğilimine kapılmak (Örn: oyun isteyen kullanıcıya ısrarla HTML sormak) mimariye açık bir ihanettir.

---

## 0) TL;DR (Pazarlik Edilemez)
- No-New-Debt: her iste `Tech-Debt Delta = 0`.
- Plan -> Kanit -> Test disinda "yapildi" kabul edilmez.
- Dependency-Freeze ve tekrar uretilebilir test/gate kosusu zorunludur.
- Scope Lock zorunludur; allowlist disina sessizce cikilmaz.
- Modulerlik zorunludur; yeni davranis monolitlere yigilmadan eklenir.
- Phase-0 kontratları (Platform hedefleri, Tema tercihi, i18n stratejisi) kapanış kriteridir. (Örn: Masaüstü oyununda mobil test dayatılmaz).
- Membership/Billing kontratları projenin baştan kararlaştırılan doğasına göre (Açık/Kapalı) uygulanır, kasten DISABLED dayatılmaz.
- Projenin Offline/Online vizyonu esastır; amaca aykırı sürpriz telemetri veya dış bağımlılık reddedilir.
- Phase-0'da tek dilli seçilmiş projeye i18n veya sahte dil çevirileri BASTIRILAMAZ.
- Kapsam dahilinde ise Selftest ve Component Testler ilgili unit testlerle koşulur.
- Domain Spesifik mimariler (Card, Dashboard, Export) varsa esnetilmeden korunur, yoksa dayatılmaz.
- Multi-Role Review Stack zorunludur.
- Yeni proje baslangicinda ajan, kullaniciyla soru-cevapli mutabakat yapar ve repo kokunde proje-ozel `AGENT_OS_PLAN_TEMPLATE.md` yazar veya sertlestirir.
- Uygulama oncesi master roadmap + child execution planlarindan olusan hiyerarsik plan portfoyu uretimi zorunludur.
- Phase-1 auto-activation routing kok-onceliklidir: instruction registry -> skill registry -> role registry -> prompt registry -> workflow routing registry.
- Skill, role ve prompt routing ayni domain kimlikleri uzerinden hizali kalir; yerelde ikinci bir routing taksonomisi uretilemez.
- Bir routing registry degisirse etkilenen registry'ler, workflow entry'leri ve eski zinciri anlatan doc/example yuzeyleri ayni istekte guncellenir.
- Ana ajan orkestrasyonu zorunludur: sohbet ajani ana ajandir, tek yazar/owner olarak varsayilir, en fazla 2-3 aktif mikro-faz tasir.
- Gercek alt ajan destegi yoksa ayni disiplin `fallback-to-sequential` ile korunur.
- Integrity Lock (IL-01 to IL-12), IL-13 (Live-Docs Sync) ve completed-plan archive kuralı zorunludur.
- Push/deploy/repo-sync taleplerinde Triple-Sync Lock zorunludur.

---

## 1) MODE Zorunlulugu
- `MODE = QA/INCELEME`
- `MODE = PROMPT-URETICI`
- `MODE = KOD-DEGISIKLIGI`

Varsayilan `QA/INCELEME`'dir.

## 1.1) Paket Ici Kanonik Kaynak
- Bu pakette `AGENT_OS_RULES.md` ana donor kurallari tasir.
- Bu dosya, o donor kaynagi operasyonel governance omurgasina cevirir.
- Adapter, workflow ve skill dosyalari donor kaynagi daraltamaz.

## 1.2) Phase-1 Auto-Activation Zinciri
- Kok registry yukleme sirasi:
	1. `.github/instructions/_ARCHITECTURE.md`
	2. `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json`
	3. `.agent/skills/_SKILL_TEMPLATE_REGISTRY.json`
	4. `.github/agents/_AGENT_ROLE_REGISTRY.json`
	5. `.github/prompts/_PROMPT_TEMPLATE_REGISTRY.json`
	6. `.agent/workflows/_WORKFLOW_DOMAIN_ROUTING.json`
- Workflow katmani bu registry'leri `.agent/workflows/session-bootstrap.md` ve `.agent/workflows/continue.md` uzerinden tuketir.
- Uretilen hedef repolar ayni zinciri additive sekilde devralir; locale pack ve adapter'lar wording'i ozellestirebilir ama routing mantigini budayamaz.

## 1.3) Skill Routing Tablosu

| Instruction Domain | Skill ID | Primary Role ID | Varsayilan Prompt ID'leri |
|---|---|---|---|
| `frontend` | `frontend` | `ui-developer` | `new-feature`, `gate-check` |
| `backend` | `backend` | `api-developer` | `new-feature`, `gate-check` |
| `data` | `data` | `data-engineer` | `new-feature`, `skill-generation` |
| `game` | `game` | `game-developer` | `new-feature`, `gate-check` |
| `mobile` | `mobile` | `mobile-developer` | `new-feature`, `gate-check` |
| `deploy` | `deploy` | `deploy-operator` | `deploy-sequence`, `gate-check` |
| `testing` | `qa-testing` | `qa-tester` | `gate-check`, `plan-closure` |
| `i18n` | `i18n` | `i18n-reviewer` | `new-feature`, `gate-check` |
| `plans` | `plan-lifecycle` | `plan-reviewer` | `new-feature`, `plan-closure` |

## 1.4) Auto-Generation ve Cascade Sync
- Proje analizi once instruction registry'den domain secer, sonra ortak registry zinciri uzerinden eslesen skill, role ve prompt'lari cozer.
- Hedef-repo uretimi additive kalir; mevcut governance korlemesine overwrite edilmez, sertlestirilir veya genisletilir.
- Domain haritasi degisirse etkilenen registry dosyalari, workflow routing entry'leri ve eski zinciri anlatan doc/example yuzeyleri ayni istekte guncellenir.

## 2) Ana Ajan ve Alt Ajan Orkestrasyon Protokolu
- Ana ajan = kullanicinin sohbet ettigi ajan.
- Ana ajan plani yazar, allowlist'i kilitler, closure kararini verir.
- Ana ajan, yeni repo baslangicinda soru-cevapli mutabakat turunu da yonetir ve roadmap portfoyunu sabitler.
- Ana ajan ayni turda en fazla 2-3 aktif mikro-faz tasir.
- Varsayilan roller: canli sorun avi, plan challenger, test/gate verifier.
- Opsiyonel roller: i18n, accessibility, security, performance, docs, release ve domain reviewer'lari.
- Ortak plan/config/governance/template dosyalarinda tek-yazar ilkesi korunur.
- Gercek alt ajan yoksa sequential fallback zorunludur.

## 2.1) Hiyerarsi ve Bagimlilik
- Hedef repo kok `AGENTS.md` en ust calisma kurali olarak yazilir.
- Hedef repo kok `AGENT_OS_PLAN_TEMPLATE.md`, donor pakete uyumlu ama repo ruhuna ozeldir.
- Master roadmap plani child execution planlarini yonetir.
- Child planlar workflow/skill/adaptor dosyalarindan daha usttur; alt yuzeyler plani daraltamaz.

## 3) NFR / No-New-Debt Gate
Asgari PASS aileleri:
1. Mobil/responsive
2. Modulerlik / anti-monolith
3. Security / privacy
4. Domain / Data / Billing Continuity (Projeye ve Phase-0'a Göre)
5. Live-Docs (IL-13) Güncel Tutulması
6. I18N Completeness (Proje çok dilliyse)
7. Accessibility (Görev ve platform izin verdikçe)
8. Selftest + related tests
9. Dependency reproducibility
10. Release/NFR parity

## 4) Integrity Lock
- Gorev cizelgesi tek resmi ilerleme kaynagidir.
- Header + faz + backlog + request + task + gate + risk + handoff/checkpoint atomik guncellenir.
- Discovered work yeni satir olarak eklenir ve parent kapanisini bloklar.
- `NOT_RUN` veya `FAIL` gate ile `DONE` yoktur.
- Tamamlanan plan ayni closure adiminda `plans/completed/` altina tasinir.

## 5) Zorunlu Gate Aileleri
- Smoke Gate
- Binding Gate
- Selftest Gate
- Related-Tests Gate
- Parity Gate
- No-UI-Regression Gate
- I18N-Completeness Gate
- Dependency-Reproducibility Gate
- Integrity-Lock Gate
- Triple-Sync Gate
- Billing Continuity Gate
- Admin Panel Etki Gate
- Release/NFR Gate

Repo ihtiyacina gore Sektörel/Domain-Spesifik Gate'ler Ajan tarafından dinamik olarak kurgulanarak türetilir.

## 6) Cikis Formati
1. Ozet
2. Kanit/Bulgu
3. Riskler
4. Aksiyonlar
5. Smoke test adimlari
6. Gate sonuclari
7. Skor
