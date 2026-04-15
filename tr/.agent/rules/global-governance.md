# Global Workspace Rule: Governance / No-New-Debt

Bu rule dosyasi bu ajan ekosistemindeki ajanlar icin hizli rehber degil, davranis kilididir.
Canli repodaki `AGENTS.md` ile cakisirsa `AGENTS.md` kazanir.
Bu paketteki kanonik donor kaynak `AGENT_OS_RULES.md` dosyasidir; bu rule onu bu ajan ekosisteminin rule surface'ine tercume eder.

## 1) Yukleme Sirasi
1. `AGENT_OS_RULES.md`
2. `AGENTS.md`
3. aktif plan
4. bu rule

## 1.1) Routing Zinciri
Implementasyon routing'inden once ortak paket registry'lerini su sirayla kullan:
1. `.github/instructions/_ARCHITECTURE.md`
2. `.github/instructions/_SCOPED_INSTRUCTION_REGISTRY.json`
3. `.agent/skills/_SKILL_TEMPLATE_REGISTRY.json`
4. `.github/agents/_AGENT_ROLE_REGISTRY.json`
5. `.github/prompts/_PROMPT_TEMPLATE_REGISTRY.json`
6. `.agent/workflows/_WORKFLOW_DOMAIN_ROUTING.json`

## 2) Non-Negotiables
- Plan -> Kanit -> Test
- No-New-Debt
- Scope lock + allowlist + denylist
- Modulerlik varsayilanidir
- Mobil/Responsive + accessibility + i18n + security + offline/PWA kapanis kriteridir
- Selftest-by-page + related tests zorunludur
- Header + faz + backlog + request + task + gate + risk + handoff/checkpoint atomik guncellenir
- Completed plans `plans/completed/` altina tasinir
- Push/deploy/repo-sync taleplerinde Triple-Sync Lock uygulanir
- Sohbet ajani ana ajandir; tek yazar/owner varsayimidir
- Gercek alt ajan yoksa `fallback-to-sequential` yazilir

## 3) Bootstrap Davranisi
- Yeni repo veya zayif governance durumunda kullaniciyla soru-cevapli mutabakat yap.
- Repo kokunde `AGENT_OS_PLAN_TEMPLATE.md` dosyasini donor omurgaya gore yaz veya sertlestir.
- Uygulamadan once master roadmap + child execution plan portfoyu kur.
- Aktif domain'i ortak registry zinciri uzerinden eslesen skill, role ve workflow prompt'larina cozumlemeden implementasyona gecme.

## 4) Plan ve Closure Disiplini
- Her yeni is once `/AGENT_OS_PLAN_TEMPLATE.md` baz alinarak planlanir.
- Aktif plan yoksa yeni plan acilir.
- Tamamlanmis planlar tarihsel fallback olarak `plans/completed/` altinda tutulur.
- `FAIL` veya `NOT_RUN` gate varken `DONE` yoktur.
- Shared governance/template/config dosyalarinda paralel writer yoktur.

## 5) Ajan Ekosistemi Rol Modeli
- Rule dosyasi tek basina yetmez; skill ve workflow yuzeyleriyle birlikte calisir.
- Varsayilan roller: canli sorun avi, plan challenger, test/gate verifier.
- Opsiyonel roller: i18n, accessibility, security, performance, docs, release, domain.

## 6) Cikis Formati
- Ozet
- Kanit/Bulgu
- Riskler
- Aksiyonlar
- Smoke test adimlari
- Gate sonuclari
- Skor
