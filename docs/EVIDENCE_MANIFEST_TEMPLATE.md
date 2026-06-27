# Evidence Manifest Template

This document is a template for tracking claims, evidence, and honest status.
Every governance framework should distinguish between what is implemented, what is planned, and what is simulated.

## How To Use

Copy this template into your project's `docs/` directory. Fill each row as features are implemented.

| Claim | Evidence File / Link | Status | Notes |
|---|---|---|---|
| _Feature description_ | _File path or link_ | `Verified` / `Planned` / `Simulated` / `Not Started` | _Additional context_ |

### Status Definitions

- **Verified**: Feature is fully implemented, tested, and working in production or staging.
- **Planned**: Feature is designed and scheduled but not yet implemented.
- **Simulated**: Feature is demonstrated with mock data or a placeholder implementation.
- **Not Started**: Feature is acknowledged but has no implementation or design work yet.

### Rules

1. Never claim a feature is "Verified" without linking to evidence (test results, file paths, screenshots, or demo URLs).
2. Never claim a gate "PASSED" if it was not actually run — mark it `NOT_RUN`.
3. Update this manifest atomically with the feature implementation.
4. This document is a companion to the plan and changelog — all three must stay in sync.

## No-New-Debt Declaration

Every completed task must record whether it changed technical debt.

Required field:
- `Tech-Debt Delta`: `0`, positive, negative, or `N/A`

A task cannot be marked `Verified` if debt impact is unknown.

---

# Kanit Manifestosu Sablonu

Bu dokuman, iddialari, kanitlari ve durumun durust takibini yapmak icin bir sablondur.
Her governance framework'u, neyin uygulandigini, neyin planlandigini ve neyin simulasyonla gosterildigini ayirt etmelidir.

## Nasil Kullanilir

Bu sablonu projenizin `docs/` dizinine kopyalayin. Ozellikler gelistirildikce her satiri doldurun.

| Iddia | Kanit Dosyasi / Baglanti | Durum | Notlar |
|---|---|---|---|
| _Ozellik aciklamasi_ | _Dosya yolu veya link_ | `Dogrulanmis` / `Planlanmis` / `Simulasyon` / `Baslanmamis` | _Ek baglam_ |

### Durum Tanimlari

- **Dogrulanmis**: Ozellik tamamen uygulanmis, test edilmis ve uretim veya staging'de calisiyor.
- **Planlanmis**: Ozellik tasarlanmis ve programlanmis ama henuz uygulanmamis.
- **Simulasyon**: Ozellik sahte veri veya gecici uygulama ile gosterilmis.
- **Baslanmamis**: Ozellik kabul edilmis ama henuz uygulama veya tasarim calismasi yok.

### Kurallar

1. Kanita (test sonuclari, dosya yollari, ekran goruntuleri veya demo URL'leri) baglanti vermeden bir ozelligi asla "Dogrulanmis" olarak iddia etme.
2. Gercekten calistirilmamissa bir gate'i "PASSED" olarak iddia etme — `NOT_RUN` olarak isaretle.
3. Bu manifestoyu ozellik uygulamasiyla atomik olarak guncelle.
4. Bu dokuman plan ve changelog'un yol arkadasidir — ucu de senkron kalmalidir.

## Yeni Borc Yok Beyani (No-New-Debt)

Tamamlanan her gorev teknik borcu degistirip degistirmedigini kaydetmelidir.

Zorunlu alan:
- `Tech-Debt Delta`: `0`, pozitif, negatif veya `N/A`

Borc etkisi bilinmiyorsa bir gorev `Dogrulanmis` olarak isaretlenemez.
