# Turkce Locale Paketi

Bu klasor, Agent Governance OS Starter Kit'in Turkce self-contained paketidir.

Zorunlu baslangic omurgasi:
- `AGENT_OS_RULES.md`
- `AGENTS.md`
- `AGENT_OS_PLAN_TEMPLATE.md`

Agent-native yuzeyler:
- `.agent/rules/global-governance.md`
- `.agent/skills/global-governance/SKILL.md`
- `.agent/workflows/session-bootstrap.md`
- `.agent/workflows/devam.md`
- `.codex/AGENTS.md`
- `.github/copilot-instructions.md`
- `.github/instructions/global-agent.instructions.md`
- `CLAUDE.md`
- `GEMINI.md`
- `.cursor/rules/global-governance.mdc`
- `AIDER.md`

Kullanim:
1. Donor dosyayi oku.
2. `AGENTS.md` ve template dosyasini oku.
3. Hedef ajanin bekledigi native surface'i sec.
4. Paketi hedef repo kokune uyarlayarak uygula.
5. Proje-ozel kok template'i yaz veya sertlestir.
6. Master roadmap + child execution plan portfoyu uret.

Kural:
- Agent-native dosyalar kopru notu degil, kendi ekosistemine uygun operasyon yuzeyidir.
- Hicbir agent surface donor omurgayi, `AGENTS.md` otoritesini veya plan-template disiplinini daraltamaz.
