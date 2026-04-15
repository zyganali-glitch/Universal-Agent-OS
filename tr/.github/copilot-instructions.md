# Global Reusable Copilot Instructions

Bu dosya GitHub Copilot ekosistemi icin yazilmis zengin instruction yuzeyidir.
Copilot hizli suggestion uretebildigi icin bu yuzeyin ana gorevi hizli ama plansiz kisayollari bloklamak ve donor omurgayi Copilot'un repo-geneli instruction modeline uygun sekilde tasimaktir.

## Otorite Sirasi
1. `/AGENT_OS_RULES.md`
2. `/AGENTS.md`
3. `/.github/instructions/global-agent.instructions.md`
4. `/AGENT_OS_PLAN_TEMPLATE.md`
5. aktif plan
6. bu dosya

## Mandatory
- Paket-ici kanonik donor kaynak olarak once `/AGENT_OS_RULES.md` dosyasini oku.
- Kod onermeden, patch yazmadan veya review yapmadan once `/AGENTS.md` dosyasini oku.
- `/AGENTS.md` tek kaynak otoritedir.
- `/AGENT_OS_PLAN_TEMPLATE.md` plan omurgasinin tek kanonik sablonudur.

## Required Workflow
1. `/AGENTS.md`, root plan template ve aktif planla basla.
2. Ortak routing zincirini su sirayla yukle: `/.github/instructions/_ARCHITECTURE.md`, `/_SCOPED_INSTRUCTION_REGISTRY.json`, `/.agent/skills/_SKILL_TEMPLATE_REGISTRY.json`, `/.github/agents/_AGENT_ROLE_REGISTRY.json`, `/.github/prompts/_PROMPT_TEMPLATE_REGISTRY.json`, `/.agent/workflows/_WORKFLOW_DOMAIN_ROUTING.json`.
3. Dokunulan domain'i ortak registry zinciri uzerinden skill, role ve prompt'lara cozumlemeden implementasyona gecme.
4. Plan yoksa implementasyona gecme.
5. Header + faz plani + backlog + talep tablosu + gorev tablosu + gates + risks + handoff/checkpoint yuzeylerini atomik guncelle.
6. Explicit allowlist disina cikma.
7. Discovered work'u durustce planla.
8. Tamamlanan planlari ayni closure editinde `/plans/completed/` altina tasi.
9. Push/deploy/repo-sync isteginde Triple-Sync Lock uygula.
10. Plan icinde ana ajan / yardimci rol matrisini yaz; gercek alt ajan yoksa `fallback-to-sequential` notunu zorunlu tut.

## Copilot Baslangic Davranisi
- Ilk donuste `MODE` bildir.
- Scope lock, allowlist, denylist, test/gate stratejisi ve aktif mikro-fazi yaz.
- Yeni proje bootstrap'inda kullaniciyla soru-cevapli mutabakat yapmadan roadmap portfoyunu dondurma.
- Tek plan yerine master roadmap + child execution plan modelini kullan.
- Copilot mesajlarinda veya prompt'larinda ikinci bir domain-routing modeli icat etme; ortak registry zincirini kullan.

## Non-Negotiables
- No-New-Debt
- Plan -> Evidence -> Test
- monolit buyutmek yerine moduler/additive degisim
- placeholder, stub, fake completion, hardcoded demo yasagi
- accessibility, responsive davranis, i18n, security, offline/PWA, billing/admin continuity ve repo-ozel kalite kontratlarini koru
- tek-yazar varsayimini bozma

## Required Gates
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

Hedef repo gerektiriyorsa stats/export/narrative/card continuity gate'leri de eklenir.

## Copilot Icin Yasak Kisa Yollar
- plan yerine tek mesajlik serbest TODO listesiyle ilerlemek
- sadece dosya olusturup gate dusunmemek
- instruction dosyasini donor yerine gecirmek
- birden fazla shared file writer'i yaratmak
- selftest veya related test etkisini yok saymak
