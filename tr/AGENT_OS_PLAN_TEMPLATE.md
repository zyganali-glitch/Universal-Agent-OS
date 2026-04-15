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

### 0.1) Plan Bütünlük Kilidi (Integrity Lock — Pazarlık Edilemez)

Bu bölüm, Ajanların sonsuz döngüye düşmesini ve plan içi tutarsızlıkları ("leak") engellemek için evrensel zorunlu kuralları tanımlar. IL-01..IL-12 ve GFL-01 birlikte uygulanır; kural ihlali planı anında `BLOCKED` yapar.

**IL-01: Tek Gerçek Kaynağı (Single Source of Truth)**
- Görev Takip Çizelgesi (Bölüm 6) planın TEK resmi ilerleme kaynağıdır. Ajan, kafasına göre "hallettim" diyemez. Yalnızca çizelgedeki duruma göre hareket edebilir.
- Çizelge ile başka bir bölüm arasında durum çarpışması varsa, çizelge doğrudur.

**IL-02: Atomik Güncelleme Zorunluluğu**
- Herhangi bir durum değişikliği yapıldığında (Örn: DEVAM→TAMAMLANDI), Faz Planı, Header ve Mikro-Faz Backlog'u AYNI ANDA güncellenir. Kısmi güncelleme (sadece bir yeri değiştirip diğerini unutmak) = INTEGRITY VIOLATION.

**IL-03: Kademeli Kapatma Kilidi (Cascading Closure Lock)**
- Bir üst görevin TAMAMLANDI olabilmesi için, kendisine bağlı alt görevlerin TAMAMI kapatılmış olmalıdır.
- Tespit edilen hatalar/yeni ihtiyaçlar (Discovered Work) alt kalem olarak eklenir ve çözülmeden üst kalem kapatılmaz.

**IL-04: Tarih Bütünlüğü ve Reel Kayıt**
- Gelecek tarihe `TAMAMLANDI` yazılamaz. `tarih <= bugunun_tarihi` zorunludur.

**IL-05: Evrensel Gate Kapatma Kilidi (Gate Closure Lock)**
- Planda tanımlanan tüm test kapıları (Gate'ler) PASS veya özel İstisna Kaydı almadan plan tamamlanamaz. `NOT_RUN` gate'ler AÇIK BLOKAJ sayılır.

**IL-06: Keşfedilen İş Bloklama Kuralı (Anti-Scope Drift)**
- Yürütme sırasında ajan yeni bir hataya/eksikliğe rastlarsa; ana işi bölüp (spagetti kod üreterek) oraya dalamaz!
- Bu hata Görev Çizelgesine yeni satır olarak `[DISCOVERED]` ön ekiyle eklenir, mevcut iş bitene kadar bekletilir.

**IL-07: Canlı Çizelge İşlem Zorunluluğu (Real-Time Tracking)**
- Ajan bir koda dokunmadan ONCE ilgili satırı DEVAM olarak işaretlemekle yükümlüdür. Bittiğinde kanıtla beraber TAMAMLANDI'ya güncelleriz. Toplu güncelleme yapmak yasaktır.

**IL-08: Triple-Sync Kilidi (Local, Remote, Live)**
- Hedeflenen işin "bitti" denmesi için (istenmişse), kodun lokal makinede çalışması, uzak repoya (örn. GitHub/GitLab/Bitbucket) push edilmesi ve platform yayıncısında (Live Deploy) doğrulanmış olması gerekir. Sadece yerel çalışan kodu "bitirdim" diye raporlamak IL-08 ihlalidir.

**IL-09: Tablolar-Arası Parite Denetimi (Cross-Table Parity Audit)**
- Bir iş kaleminin durumu, kapsamı veya bağımlılığı bir yerde değiştiyse; aynı kalemi izleyen tüm bölümler (Header, Faz Planı, Mikro-Faz Backlog'u, Görev Çizelgesi, Gate'ler, Riskler ve Devir kaydı) aynı turda senkronize edilmek zorundadır.
- Plan içinde aynı işe dair çelişkili durum, bağımlılık veya kapsam beyanı kalırsa yürütme `BLOCKED` olur.

**IL-10: Otomatik Doğrulama ve Faz Geçiş Kilidi (Auto-Validation + Phase-Transition Lock)**
- Bir görev, faz veya plan yalnızca anlatısal beyanla ileri taşınamaz. Ajan eldeki en ucuz ilgili doğrulamayı çalıştırmalı, sonucu kaydetmeli ve kanıtı yazmalıdır.
- Bir önceki faz için kayıtlı doğrulama kanıtı yokken yeni faza geçmek yasaktır.

**IL-11: Durum Geri Çekme Yasağı (Status Rollback Prohibition)**
- `TAMAMLANDI` veya `BLOKE` olmuş bir kayıt sessizce temiz bir tarihe çevrilemez. Yeniden açma, geri alma veya düzeltme ihtiyacı varsa neden, zaman damgası ve bağımlı kalem etkisi açıkça kaydedilir.
- Eski kanıtı silmek, önceki sonucu yok saymak veya yeniden açılmış bir adımı hiç kapanmamış gibi göstermek yasaktır.

**IL-12: Kademeli Keşfedilen-İş Blokajı (Cascading Discovered-Work Block)**
- Keşfedilen yeni iş, mevcut adımın, üst kalemin veya bağımlı fazın kapanış kriterini etkiliyorsa; bu zincir, yeni iş açıkça kaydedilip planlanana kadar bloklanır.
- Gerekli takip işi yeni keşfedilmiş ama hâlâ kayıtsız ya da çözülmemiş durumdayken üst kalem `TAMAMLANDI` olarak kalamaz.

**GFL-01: Artefakt ve Dokümantasyon Tazelik Kilidi (Artifact and Documentation Freshness Lock)**
- Bir değişiklik yaşayan governance artefaktlarını (ör. README, mimari dökümanları, workflow'lar, template'ler, adapter dosyaları veya üretilmiş instruction'lar) etkiliyorsa, bu yüzeyler aynı istekte closure öncesi güncellenmek zorundadır.
- Bayat rehber, bayat mimari anlatı veya eski surface referansları bloklayıcı kusur sayılır.

### 0.2) Kesitler-Arası Atomik Güncelleme ve Arşive Taşıma Protokolü

- Her durum geçişi, tek edit turunda şu minimum senkron seti güncellemek zorundadır: Belge Kimliği, aktif Faz Planı satırı, etkilenen Mikro-Faz Backlog satırı, etkilenen Görev Çizelgesi satırı, etkilenen Gate satırları ve varsa güncel devir/checkpoint bloğu.
- Bu yüzeylerden biri belirli plan örneğinde uygulanmıyorsa `N/A` ile açıkça işaretlenir; eski fazdan taşınmış bayat durum bırakmak yasaktır.
- `TAMAMLANDI` kapanışı atomiktir: gate durumu doğrulanır, completion evidence kaydedilir, gerekirse aktif/arşiv yol referansları güncellenir ve finalize plan dosyası aynı kapanış işleminde `plans/` içinden `plans/completed/` içine taşınır.
- Tamamlanmış plan, yaşayan tek kaynak olarak aktif `plans/` dizininde bırakılamaz. BLOKE, beklemede veya devam eden planlar `plans/` içinde kalır; yalnızca bitmiş planlar arşive geçer.
- Arşivlenmiş bir iş yeniden başlatılacaksa açık bir aktif revizyon veya takip planı olarak geri alınır. Arşiv dosyasını sessizce yerinde diriltmek yasaktır.

## 1) Universal Mutabakat Çıktısı (Phase 0)

Ajan, proje başında Mentor olarak kullanıcıyla mülakat yapar ve aldığı sonuçları buraya kaydeder.
- **İletişim Tonu:** `{{Resmi / Mentor / Rehber}}`
- **Nihai Platform:** `{{Browser / App Store / Desktop / Embedded}}`
- **Mimari Strateji:** `{{Monolith / Microservices / Native / PWA / Engine-Specific}}`
- **Auth/Billing İhtiyacı:** `{{Erken Aşama Dahiliyeti / Yok}}`
- **QA Katılığı (Gates):** `{{Saf Askeri QA / Prototip Esnekliği}}`

---

## 2) Sifir-Kod-Kaybi ve Evrensel Güvenlik Protokolü (Zero-Leak Protocol)
1. **Additive-First (Önce Ekleme):** Eski sistemleri silip atmak yerine modüler yeni sistemlerle delegasyon kur. Dosyalar büyüyorsa monolith'i şişirme, Scope dışı özellik için yeni dosya yarat.
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
> **IL-07/GFL-01 CANLI ÇİZELGE VE README KİLİDİ:** Görev takip tablosundaki hiçbir adım, anlık olarak ajan tarafından `IN_PROGRESS` (Devam Ediyor) veya `DONE` (Bitti) durumuna getirilmeden (ve yanındaki kanıtlar yazılmadan) kod COMMIT edilemez veya diğer mikro faza geçilemez! Ajanın sadece kod üretmesi yetmez; her ufak değişikliği anlık (Live-State) olarak bu tabloya ve yaşattığı şablon belgelerine İŞLEMESİ ZORUNLUDUR!
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
| **Integrity-Lock**| IL-01..IL-12 + GFL-01 içi plan tutarlılığı ve tarih doğruluğu | Plan Parity Check | PASS | `{{...}}` | `{{...}}` |
| **Triple-Sync** | Local, Repo (örn. GitHub/GitLab/Bitbucket) ve Live Platform Deployment paritesi | `git/deploy logları` | PASS | `{{...}}` | `{{...}}` |
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
