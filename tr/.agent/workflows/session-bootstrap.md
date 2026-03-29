# /session-bootstrap - Oturum Başlatma ve Güvenli Devam Protokolü

Bu workflow, "Yeni Oturum Başlatma" ve "Yarım Kalan Oturuma Devam Etme (Resume)" süreçlerinin tek ve zorunlu omurgasıdır. Kodlama dünyasına yeni giren bir vibecoder'dan uzman bir yazılımcıya kadar her kullanıcı profili için güvenli ve yönlendirici bir **Mentor** dili kullanılarak tasarlanmıştır. Tüm ajan platformları bu disipline sadık kalarak, her projeye özel ve sızıntısız entegrasyon kurar.

## 1) Kanonik Yükleme Sırası
Bir oturum açıldığında ajan, sızıntısız entegrasyon için aşağıdaki dosyaları sırayla okumak zorundadır:
1. `AGENT_OS_RULES.md` (ve ilgili root yönetişim dosyaları)
2. `AGENTS.md`
3. Kök dizindeki `AGENT_OS_PLAN_TEMPLATE.md` (varsa)
4. Aktif görev planı (`plans/*.md`)

## 2) Oturum Tespiti: YENİ mi RESUME mi?
Ajan okumaları bitirdikten sonra duruma göre iki farklı yola girer:
- **Yeni Proje:** Kök dizinde plan şablonu veya `plans` klasörü yoksa, veya köklü bir yeniden yapılandırma isteniyorsa **Bölüm 3'e (İnteraktif Mutabakat)** geçer.
- **Mevcut Proje:** Yürüyen (`IN_PROGRESS` veya `PENDING`) bir plan varsa, **Bölüm 4'e (Resume Protokolü)** geçer.

---

## 3) YENİ OTURUM: İnteraktif Mutabakat (Phase 0)
Hiçbir ajan kod yazmadan önce "Ben en iyisini bilirim" diyerek dayatmada bulunamaz. Ajan, projenin doğasını anlamak için bir **Mentor** gibi davranıp; sabırlı, çok yönlü ve esnek sorular sorar. Çıktı sadece Web tabanlı olmak zorunda değildir; projenin yapısı bir **Oyun Geliştirme (Unity/Unreal vb.), Mobil (APK/iOS), Veri Bilimi Pipelayeni veya Gömülü(IoT) Sistem** olabilir. Ajan sorularını buna göre adapte edebilme inisiyatifine sahiptir.

### 3.1) Evrensel ve Esnek Soru-Cevap Mülakatı
Ajan aşağıdakilere benzer, birbiriyle tutarlı olacak şekilde mantıklı soruları sırayla (veya mantıklı paketler halinde) yöneltmeli, **mutlaka kendi gerekçeli önerisini sunmalı, fakat nihai kararı her zaman kullanıcıya bırakmalıdır.**

1. **İletişim ve Karar Dili:** "Projenize başlarken benim size nasıl hitap etmemi istersiniz? Resmi bir dille sadece kod mu yazayım, yoksa size yön gösteren ama son sözü size bırakan bir mentor gibi mi olayım?"
2. **Proje Tipi ve Nihai Çıktı (Platform):** "Hayal ettiğimiz bu ürün günün sonunda tam olarak nerede çalışacak? Bir web tarayıcısında mı, cep telefonunda bir uygulama (APK/iOS) olarak mı, masaüstünde oynanacak bir oyun mu, yoksa arka planda çalışan bir veri motoru mu? *(Önerim: Eğer mobil de hedefleniyorsa baştan WebView temelli karma veya PWA odaklı düşünmek yatırımı korur, ama bir oyun yapıyorsak doğrudan yerel (native) motor yeteneklerine odaklanalım).* "
3. **Kullanıcı Etkileşimi ve Hassasiyeti:** "Uygulamanızı kimler kullanacak ve verileri ne kadar gizli? Tamamen çevrimdışı (offline-first) bir yapıda kullanıcının cihazında mı tutalım, yoksa herkesin etkileşimde olduğu devasa bir bulut altyapısı (Cloud) mu kuralım?"
4. **Altyapı (Framework) Stratejisi:** "Nasıl bir iskelet seçelim? Hızlı, pürüzsüz ve sade bir Vanilla JS/HTML veya temel oyun motoru betiği mi kullanalım; yoksa çok fazla sayfa ve veri içeren büyük bir yapı mı kuruyoruz? *(Sade ve az bağımlılığı olan projelerde temel teknolojileri öneririm, ama karmaşıksa React/Flutter tarzı ekosistemler şarttır).* "

> **Ajan İnisiyafi (Önemli):** Ajan, projenin temel tipini anladıktan sonra inisiyatif almalı ve zihninde projenin global şablonu için belirlediği "Gizli / Ekstra Karar Noktaları"nı (Örn. Oyun ise: "Hangi Fizik veya Save/Load yönetimi?", Mobil ise: "Yerel bildirimlere ihtiyaç var mı?") kullanıcıya sormalıdır. Soruların ardışık veya çelişkili olmamasına (Örn; Hem sadece tek sayfa oyun diyip hem REST microservis mimarisi tartışmaya girmemek gibi) özen gösterilir. Sorular asla "Hardcore" (Aşırı spesifik ve dışlayıcı) seviyeye çıkarılarak kullanıcıyı soğutmamalıdır.

### 3.2) Şablon ve Portföy Üretimi
Kullanıcı mutabakatı onaylandıktan sonra ajanın teknik yapacağı işlem:
1. Yanıtları derleyip kök dizindeki `AGENT_OS_PLAN_TEMPLATE.md` içine evrensel dil ve Opradox düzeyindeki detaycılıkla sözleşme kuralları olarak yazar.
2. Sadece bir devasa dosya değil, bağlam pencerelerine saygılı bir `master roadmap` ve duruma göre alt bileşenler (child execution) planlarından oluşan bir **plan portföyü** yaratır. 
Üretime ancak bu plan haritası tamamlanıp kullanıcının onayından geçince başlanabilir.

---

## 4) YARIM KALAN OTURUM (RESUME PROTOKOLÜ)
Bir plan zaten var ancak sohbet yarım kaldıysa, ajanın hızla son yazılan promta göre "işe dalması" kesinlikle bir anti-patterndir. Bu durum "Resume Protokolü" ile çözülür:

### 4.1) Aktif Adımın Tespiti ve Safety Check
1. Planlar içindeki ilk `DEVAM` (In Progress) adımını bul (yoksa ilk `BEKLEMEDE` veya `PENDING` adımını seç).
2. Teyit Et (Safety Check): Scope (Kapsam kilidi) hâlâ kilitli ve geçerli mi? Allowlist değişmiş mi? Son canlı test sonuçları planın `PASS` yazan kısmıyla örtüşüyor mu? Discovered Work (Çalışırken yeni keşfedilen hata ve bağımlılıklar) backlog'da gizli mi kaldı, yansıtıldı mı?

### 4.2) Çoklu Taleplerin Analizi
Kullanıcı yeni/beklenmedik bir taleple geri döndüyse:
- Eski iş listesiyle (backlog) yeni isteği harmanla. Bağımlılık ve risk analizini en baştan yap. 
- Eğer yeni talep mevcut dosya mimarisini bozuyorsa veya tek-yazar (Single-writer) ilkesini eziyorsa, kullanıcıya mentor sıfatıyla yaklaş: *"Bu işlem ciddi bir mimari sızıntı riski barındırıyor, öncesinde yarım kalan riskleri aşalım ve ardından istediğiniz noktaya evrilelim"* gibi açıklama yapıp onay bekle.

### 4.3) Kullanıcıya Durum Dönüşü ve Onay (Hand-shake)
Kodu veya dosyayı fiziksel olarak değiştirmeden önceki ilk adımda ajanın verdiği yanıt paketi aşağıdakileri içermelidir:
- **MODE:** Hangi operasyonel modda çalışıldığı (örneğin KOD-DEĞİŞİKLİĞİ).
- **Aktif Plan ve Faz:** "Şu ana plandan devam ediyoruz, X fazındayız."
- **Etki Alanı ve Kilit:** "Dosyalama ve değişiklik yetkim plan gereği şu kısıtlı alanda (Allowlist)."
- **Mentor Görüşü:** (Sadece gerekiyorsa) "Planımıza baktığımda önce mevcut modül testlerini düzeltmemiz gerektiğini görüyorum."

---

## 5) Zorunlu Mimariler ve Çıkış
- Hangi oturum formatı olursa olsun, kod kapanışı yapılırken Multi-Role Review (Acemi, Uzman Vibecoder, Mimari Danışman, Yazılımcı vb.) perspektifinden çoklu inceleme simülasyonu çalıştırılır. Dosyalardaki potansiyel riskler anında bertaraf edilir.
- `Plan -> Kanıt -> Test` zinciri bozulmadan hiçbir zorunlu test gate'i eksik bırakılmaz.

Bu workflow sözleşmesi, projesi ve gereksinimleri ne olursa olsun her ajanın şefkatli bir yardımcı pilot gibi kullanıcıyı yönlendirmesini, fakat altyapı inşasında ise muazzam bir askeri disipline sadık kalmasını tek garantiye bağlar. Dosyalar arası sonsuz döngü engelleriyle (Loop prevention) sızıntısız bir uyum taşır.
