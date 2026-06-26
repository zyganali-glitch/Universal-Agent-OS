# AGENTS.md - GLOBAL REUSABLE GOVERNANCE SOURCE

Amac: Yeni is, yeni teknik borc uretmesin. Kanit + Gate olmadan PASS yok.

Bu dosya, Universal Agent OS mimarisinin **En Üst Anayasasıdır (Supreme Constitution)**.
Repodaki en yüksek bağlayıcı otoritedir. Tüm ajanlar, adaptör dosyaları, çapraz atıflar, planlar ve görevler istisnasız olarak buradaki kurallara tabidir. Hiçbir ajan veya kullanıcı emri bu dosyayı ezemez.
Hedef repoya uyarlandiginda, repoya ozel kalite kontratlari korunur ve gerektiginde genisletilir, asla zayiflatilmaz.
Bu pakette okunmasi gereken ilk dosya `AGENT_OS_RULES.md`'dir.

> [!CAUTION]
> **KESİN SIZINTI KİLİDİ (ZERO-LEAK LOCK):**
> Bu dosyayı ve herhangi bir ajan yapılandırma dosyasını okuyan ajan; projede neyin, hangi platformda (Web, Mobil, Oyun vs.) çalışacağını anlamak için öncelikle **Kullanıcı Mutabakatı (İnteraktif Phase 0 Q&A)** adımını tamamlamak zorundadır! 
> - Kullanıcı ile mentor tonunda ortak bir dil oluşturmadan,
> - Sorular sorularak projenin ruhu (oyun mu, mobil mi, web mi?) anlaşılıp karara bağlanmadan,
> - **KRİTİK:** Bu Phase 0 sorularını KESİNLİKLE TEK TEK sormak zorundasınız. Bir sonraki soruyu sormadan önce mutlaka kullanıcının cevabını bekleyin.
> - Ve bu kararlar doğrultusunda kök dizindeki `AGENT_OS_PLAN_TEMPLATE.md` üretilmeden,
> **Hiçbir dosya düzenlenemez, kod oluşturulamaz ve komut çalıştırılamaz.** Kilit atlamak, planı esnetmek ve yanlış teknoloji eğilimine kapılmak (Örn: oyun isteyen kullanıcıya ısrarla HTML sormak) mimariye açık bir ihanettir.

---

## Yeni Baslayanlar Icin Kurulum (Beginner-Friendly Bootstrap)

Bu framework, yazilim gelistirme bilgisi olmayan kisiler icin de tasarlanmistir. Bir kullanici projeye su kadar basit bir cumleyle baslayabilmelidir:

> Bir fikrim var. Bunu bir projeye donusturmeme yardim et.

### Yeni Baslayanlar Icin Iletisim Kurallari
- Kullanicinin dilini taklit et. Eger Ingilizce yaziyorsa Ingilizce yanit ver. Turkce yaziyorsa Turkce yanit ver.
- Yazilim jargonu yerine gunluk kelimeleri tercih et.
- Teknik bir terim kacinilmazsa, onu tek bir cumleyle acikla.
- Bir seferde tek bir islem/eylem ver.
- Belirsizligi asla ayiplama; "Emin degilim" gecerli bir cevaptir.
- Guvenli bir varsayilan oner, ama karari kullaniciya birak.
- Phase-0'dan sonra kararlastirilanlari ozetle.

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
- Yeni proje baslangicinda ajan, kullaniciyla soru-cevapli mutabakat yapar ve **İLK İŞ OLARAK** repo kokunde proje-ozel `AGENT_OS_PLAN_TEMPLATE.md` yazar veya sertlestirir.
- **Master Roadmap Lock (Plan Oluşturma Planı):** Uçtan uca tüm alt planları listeleyen yaşayan bir master roadmap yazılmalıdır. Bu listedeki tüm planlar hazırlanmadan ve önceliklendirilmeden **KESİNLİKLE KODLAMAYA BAŞLANAMAZ.**
- **Continuous Sync Lock:** Ajan HER GÖREV BİTİMİNDE Memory, Mimari (Architecture), kullanıcı repo README'si ve ilgili tüm dokümanları eşzamanlı olarak güncellemek zorundadır.
- Uygulama oncesi master roadmap + child execution planlarindan olusan hiyerarsik plan portfoyu uretimi zorunludur.
- Ana ajan orkestrasyonu zorunludur: sohbet ajani ana ajandir, tek yazar/owner olarak varsayilir, en fazla 2-3 aktif mikro-faz tasir.
- Gercek alt ajan destegi yoksa ayni disiplin `fallback-to-sequential` ile korunur.
- Integrity Lock (IL-01 to IL-12), IL-13 (Live-Docs Sync), IL-14 (Adapter Lock), IL-15 (Roadmap Lock), IL-16 (Continuous Sync Lock) ve completed-plan archive kuralı zorunludur.
- **Phase-X (Brownfield Quarantine) Kilidi:** Eğer kök dizinde karantina damgalı bir `TECH_DEBT_AND_SECURITY.md` dosyası varsa, bu repo Legacy (Devam Eden) modda başlatılmıştır. Ajan, eski spagetti koda asla dokunmamalı ve Phase-0 mülakatını dayatmamalıdır. Tüm OS kuralları SADECE projeye yeni eklenecek kodlar için katı bir şekilde uygulanmalıdır.
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
- Gorev tablosu tek resmi ilerleme kaynagidir.
- Header + faz + backlog + talep + gorev + gate + risk + handoff/checkpoint atomik guncellenir.
- Yeni bulunan isler izlenen yeni maddeler olarak eklenir.
- Zorunlu gate `NOT_RUN` veya `FAIL` iken `DONE` yapilamaz.
- Tamamlanan planlar ayni kapanis editinde `plans/completed/` altina tasinir.
- **IL-14 (Adapter Currency Lock - Kendini Güncelleme Kilidi)**: Ajan bu repoya girdiğinde çalışmaya başlamadan önceki İLK işi; kendi platformuna ait kök adaptör dosyasını (örn: `.cursorrules`, `.github/copilot-instructions.md`, `.agents/AGENTS.md` vb.) kontrol etmektir. Eğer ajanın platformu (IDE/Model) o anki güncel tarihinde sistem komutlarını okumak için daha modern veya gelişmiş bir dosya formatı destekliyorsa, ajan kod yazmaya başlamadan önce **kendi adaptör dosyasını en güncel standarda göre güncellemek zorundadır**.
- **IL-15 (Master Roadmap & Coding Lock - Kodlama Kilidi)**: Phase-0 bittikten sonra ajanın yapacağı İLK İŞ projeye özel global plan şablonunu oluşturmak ve projenin uçtan uca bitmesi için gereken tüm planları listeleyen bir "Plan Oluşturma Planı" (Master Roadmap) yapmaktır. Bu plan yaşayan bir plandır. Master Roadmap içinde listelenen tüm planlar hazırlanmadan ve işe göre öncelik sırası belirlenmeden **KESİNLİKLE KODLAMAYA VEYA İCRAYA BAŞLANAMAZ.**
- **IL-16 (Continuous Sync Lock - Sürekli Senkronizasyon)**: Ajan tamamladığı **HER İŞTEN SONRA** (sadece faz kapanışında değil); projeye ait Hafıza (Memory), Mimari (Architecture), kullanıcı repo README'si ve ilgili tüm dokümanları eşzamanlı olarak güncellemek zorundadır. Yaşayan dokümantasyonu güncellemeden hiçbir görev DONE (Tamamlandı) yapılamaz.
- **Fast-Track Mode (Hızlı Mod İstisnası)**: Kullanıcı açıkça "Hızlı Mod", "Fast-Track", "Basit bir script istiyorum" diyerek bürokrasiyi atlamak isterse ajan IL-15 ve IL-16 kilitlerini esnetebilir. Ancak ajan, Phase-0 mülakatının en sonunda (işe başlamadan hemen önce) kullanıcıya şu bilgiyi vermek ZORUNDADIR: *"Hızlı denemeler ve basit scriptler için, mimari dokümantasyonu ve sıkı planlama kilitlerini atlamak isterseniz dilediğiniz zaman 'Hızlı Mod / Fast-Track' özelliğini tetikleyebilirsiniz."*

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
