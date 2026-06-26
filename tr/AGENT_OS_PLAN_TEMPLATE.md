# UNIVERSAL AGENT OS - GLOBAL PLAN VE GOREV TAKIP CIZELGESI (SABLON)

Bu şablon self-contained'dir.
Her yeni platformda (Web, Mobil, Oyun, Gömülü vb.) ve her yeni özellik talebinde is-özel (task-specific) plan dosyası üretmek için mecburi olarak kullanılır. Ajanların plan dışında kod üretmesi kesinlikle kilitlenmiştir (Zero-Leak Lock).

---

## 0) Belge Kimliği (Phase 0 Sonucu)

- Plan dosya adı: `{{PLAN_FILENAME}}`
- Aktif plan yolu: `plans/{{PLAN_FILENAME}}`
- Tamamlanan plan arşiv yolu: `plans/completed/{{PLAN_FILENAME}}`
- Plan ID: `{{PLAN_ID}}`
- Proje Hedef Platformu: `{{WEB | MOBILE (IOS/ANDROID) | GAME (UNITY/UNREAL) | API | DATA }}`
- Son güncelleme: `{{YYYY-MM-DD HH:mm TZ}}`
- Plan sahibi (owner): `{{OWNER_AGENT_OR_TEAM}}`
- Aktif durum: `{{PLANNING|IN_PROGRESS|HARDENING|CLOSURE|DONE|BLOCKED}}`
- **Ajan Başlangıç Hafızaları (BU DOSYALARLA CONTEXT YÜKLEMEDEN KODA BAŞLAMAK YASAKTIR!):**
  1. Hata/Ders Mayın Tarlası: `AGENT_MEMORY_AND_LESSONS.md`
  2. Mimari Karakter: `AGENT_ARCHITECTURE_AND_PATTERNS.md`
  3. Dış API ve Env Bağlantıları: `AGENT_ENVIRONMENT_AND_API.md`
  4. Kullanıcı Tarzı (Preferences): `AGENT_USER_PREFERENCES.md` (Kullanıcının sana emrettiği ve alıştığı iletişim/kod üslubunu ASLA bozma!)

### 0.1) Master Integrity Lock (IL) Registry — Pazarlık Edilemez

Bu bölüm, Ajanların sonsuz döngüye düşmesini ve plan içi tutarsızlıkları ("leak") engellemek için evrensel zorunlu kuralları tanımlar. Kural ihlali planı anında `BLOCKED` yapar.

- **IL-01** Tek Gerçek Kaynağı (Görev Tablosu)
- **IL-02** Atomik güncellemeler
- **IL-03** Kademeli kapatma kilidi
- **IL-04** Tarih bütünlüğü
- **IL-05** Gate kapatma kilidi
- **IL-06** Header/görev senkronizasyonu
- **IL-07** Keşfedilen iş bloklama
- **IL-08** Canlı görev tablosu işlemi
- **IL-09** Durum geri alma protokolü
- **IL-10** Çapraz tablo tutarlılık denetimi
- **IL-11** Otomatik doğrulama ve sonraki aşama bildirimi
- **IL-12** Triple-Sync Lock
- **IL-13** Canlı Dokümantasyon Kilidi (Live-Docs Sync)
- **IL-14** Adaptör Güncellik Kilidi
- **IL-15** Ana Yol Haritası ve Kodlama Kilidi
- **IL-16** Sürekli Senkronizasyon ve Kolektif Hafıza Kilidi

## 1) Universal Mutabakat Çıktısı (Phase 0)

Ajan, proje başında Mentor olarak kullanıcıyla mülakat yapar ve aldığı sonuçları buraya kaydeder.
- **İletişim Tonu:** `{{Resmi / Mentor / Rehber}}`
- **Nihai Platform:** `{{Browser / App Store / Desktop / Embedded}}`
- **Mimari Strateji:** `{{Monolith / Microservices / Native / PWA / Engine-Specific}}`
- **Auth/Billing İhtiyacı:** `{{Erken Aşama Dahiliyeti / Yok}}`
- **QA Katılığı (Gates):** `{{Saf Askeri QA / Prototip Esnekliği}}`

---

## 2) Sifir-Kod-Kaybi ve Evrensel Güvenlik Protokolü (Zero-Leak Protocol)
1. **Additive-First (Önce Ekleme) ve Ayırt Edici İsimlendirme:** Eski sistemleri silip atmak yerine modüler yeni sistemlerle delegasyon kur. Dosyalar büyüyorsa monolith'i şişirme, yeni dosya yarat. Yeni açılan dosyalar spesifik ve benzersiz isimlere sahip olmalıdır (Örn: `auth_token_validator.ts` — `utils.js` veya `helpers.ts` gibi tembel isimlendirmeler yasaktır).
4. **Zombi Kod Yasağı (Zero-Zombie-Code):** Refactoring (yeniden yazım) işlemleri tertemiz olmalıdır. Yeni fonksiyon yazıldığında, eski ölü kodlar ve kullanılmayan importlar aynı commit içinde MUTLAKA silinmelidir. Arkada yetim/zombi kod bırakılamaz.
5. **Kesinti-Korumalı Düzenleme (Truncation-Safe):** Büyük dosyalarda çalışırken, çıktı limitine takılıp dosyanın yarısının silinmesine (truncation) sebep olunursa, işlem anında geri alınmalı (revert) ve bölgesel (chunked) değişiklik araçları kullanılmalıdır.
2. **Kör İşlem Yasağı:** Projenin dosya yapısını `ls` veya `view_file` gibi okuma toolları ile fiziken görmeden "Böyle bir dosya olmalı" felsefesiyle kod önermek ajana yasaklanmıştır.
3. **Dinamik Rol Paritesi (Multi-Role Audit):** Her kod önerisi sadece bir Back-End geliştirici gözüyle değil; Siber Güvenlikçi, Evrensel QA ve Ajanın projenin doğasına göre (Phase-0'da) *bizzat kendi zekasıyla ürettiği* **Sektör-Özel 5 Farklı Profil** penceresinden geçirilmek ZORUNDADIR (Örn: Proje Medikal Uygulama ise Sağlık Verisi Uzmanı; Oyun ise 10 Yaş Çocuk rolü şablona Ajan tarafından eklenir).

---

## 3) Scope Lock, Allowlist, Denylist

### 3.1 Scope Lock (Kapsam Kilidi)
- Kapsam içi: `{{tanım}}`
- Kapsam dışı: `{{tanım - ajan bu sınıra dokunamaz}}`

### 3.2 Allowlist (Gözetimli Dosyalar)
- `{{izole_modul_1.ts}}`
- `{{spesifik_ui_component_2.js}}`

---

## 4) Evrensel Selftest Topolojisi

Her özellik, bulunduğu platforma uygun olarak self-teste tabidir.
| Platform Modülü | Test Paketi / Alanı | Zorunlu Minimum (Smoke) | Durum |
|---|---|---|---|
| `{{Web Frontend}}` | Component/DOM Test | i18n, responsive, a11y | `{{READY/NA}}` |
| `{{Platform Hedefi Kontrolü}}` | Phase-0 Kararı | Hedeflenen platformlarda kusursuzluk (Örn: Mobil oyunda taşma testi). Değilse N/A | `{{READY/NA}}` |
| `{{Game Engine}}` | Collision/Entity | Memory Leak, Physics | `{{READY/NA}}` |
| `{{Backend/API}}` | Route/Controller | Auth/Token, Payload | `{{READY/NA}}` |

---

## 5) Mikro-Faz İş Backlogu (Universal Registry)

| İş ID | Görev (Cerrahi) | Durum | Ajan | Tarih | Kanıt/Not |
|---|---|---|---|---|---|
| `{{W-01}}` | `{{kod hedefi}}` | `{{PENDING|IN_PROGRESS|DONE}}` | `{{name}}`| `{{date}}` | `{{...}}` |
| `{{W-D1}}` | `[DISCOVERED] {{yeni sorun}}` | `{{PENDING|...}}` | `{{name}}`| `{{date}}` | `{{...}}` |

---

## 6) Görev Takip Çizelgesi (TEK RESMİ KAYNAK)

> [!CAUTION]
> **IL-08/13 CANLI ÇİZELGE VE README KİLİDİ:** Görev takip tablosundaki hiçbir adım, anlık olarak ajan tarafından `IN_PROGRESS` (Devam Ediyor) veya `DONE` (Bitti) durumuna getirilmeden (ve yanındaki kanıtlar yazılmadan) kod COMMIT edilemez veya diğer mikro faza geçilemez! Ajanın sadece kod üretmesi yetmez; her ufak değişikliği anlık (Live-State) olarak bu tabloya ve yaşattığı şablon belgelerine İŞLEMESİ ZORUNLUDUR!
> **DİKKAT:** Görev kapatırken "Bu yaptığım mimari, kurulum veya özellik değişikliği projenin ana vitrini olan **`README.md`** dosyasını etkiliyor mu?" diye KONTROL EDİLECEK. Etkiliyorsa `README.md` de o an güncellenmeden o görev asla KAPANAMAZ!

| Adım | Açıklama | Durum | Üst ID | Ajan | Başlangıç | Tamamlanma | Notlar(Kanıt) |
|---|---|---|---|---|---|---|---|
| `1.1` | `{{Adım adımı detay}}` | `{{BEKLEMEDE/DEVAM/TAMAMLANDI/BLOKE}}` | `-` | `{{Bot}}` | `-` | `-` | `{{Kanıt}}` |
| `1.D1`| `[DISCOVERED] {{Sorun Fix}}` | `{{BEKLEMEDE}}` | `1.1` | `{{Bot}}` | `-` | `-` | `{{...}}` |

---

## 7) Evrensel Gate (Kapı) Doğrulama Matrisi

| Gate Tipi | Kapsam | Komut / Manuel Denetim | Beklenen | Sonuç | Kanıt (Log) |
|---|---|---|---|---|---|
| **Platform Smoke**| Uygulamanın veya Oyunun çökmeden açılması | `{{run_command / build vb}}` | PASS | `{{...}}` | `{{...}}` |
| **No-UI-Regression**| Karanlık/Aydınlık mod, Mobil ekran taşması, i18n dilleri | `{{Görsel test veya lint}}` | PASS | `{{...}}` | `{{...}}` |
| **Integrity-Lock**| IL-01..11 İçi Plan Tutarlılığı ve Tarih doğruluğu | Plan Parity Check | PASS | `{{...}}` | `{{...}}` |
| **Triple-Sync** | Local, Repo (GitHub vb.) ve Live Platform Deployment paritesi | `git/deploy logları` | PASS | `{{...}}` | `{{...}}` |
| **[{{Ajanın Projeye Göre Üreteceği Dinamik Gate 1}}]**| `{{Sektöre Özel Gate Amacı}}` | `{{Sektöre Özel Denetim Komutu}}` | PASS | `{{...}}` | `{{...}}` |
| **[{{Ajanın Projeye Göre Üreteceği Dinamik Gate 2}}]**| `{{Sektöre Özel Gate Amacı}}` | `{{Sektöre Özel Denetim Komutu}}` | PASS | `{{...}}` | `{{...}}` |

> **AJAN İNİSİYATİFİ:** Yukarıdaki köşeli parantezli boş Gate'ler, Ajan tarafından projenin doğasına (Oyun mu, Fintek mi?) tam uyumlu olacak şekilde, şablon ilk projeye kurulurken baştan yaratılır. Hiçbir ekstra güvenlik Gate'i atlanamaz.

---

## 8) Token Limiti ve Checkpoint Devir (Handoff)
Eğer Ajan token sınırına yaklaşırsa veya görevi başkasına/yarına bırakacaksa şu bloğu yazar:

```markdown
## CHECKPOINT - DEVİR
- Son Tamamlanan Mikro-Adım: {{phase.step}}
- Durum: {{TAMAMLANDI|DEVAM|BLOKE}}
- Sonraki Mikro-Adım: {{phase.step}}
- Kritik Kanıt/Gate Sonucu: {{PASS/FAIL/NOT_RUN}}
```
