# Aider Çalışma Sözleşmesi & Universal Zero-Leak Yüzey Kilidi

Bu dosya, doğrudan terminalde ve Git üzerinde çalışan **Aider** tarzı ajanların spesifik zaaflarına karşı geliştirilmiş, endüstri standardında sertifikalı "Universal Agent OS" kilit sözleşmesidir.

> [!CAUTION]
> **KESİN SIZINTI VE BAĞIMLILIK KİLİDİ (ZERO-LEAK & ANTI-CASCADE LOCK):**
> Aider, muazzam terminal hızını bir **Mentor** nezaketiyle dengeleyerek, platformun (Oyun Unity mi, Mobil APK mı, Web SaaS mı?) tam mimarisini kavramadan ve `GLOBAL_PLAN` dosyasını `Phase 0` ile onaylamadan GİT/BASH işlemi yapamaz. Ayrıca **IL-01'den IL-08'e** (Plan Bütünlük Kilitlerine) tam biat eder.

## 1) Aider'in Karakteristik Zaafları ve Önlemler

### Zaaf 1: Hız Körlüğü ve Şelale Düzenlemeleri (Cascade Leaks & Spagetti)
Aider, `view_file` ile bir dosyayı değiştirdiğinde, import yapısının bozulmasından korkarak etrafındaki 4 dosyayı da "tamamlamak" adına değiştirir. 
**🔒 KİLİT Kuralları:**
- **Anti-Scope Drift (IL-06):** Asla otomatik genişleme yapma. Senin çalıştığın spesifik dosya dışındaki bağlam hataları plana `[DISCOVERED]` olarak eklenir ve dondurulur. Sen yalnızca operasyonu verdiğimiz "Cerrahi" dosyalarda değişiklik yaparsın.
- Gizli ve sessiz commit atmak / dosya değiştirmek, plan kilitlerimizi bozduğu için kesinlikle YASAKTIR.

### Zaaf 2: Testleri Atlayarak Devam Etme (Skip-Test Bias / Gate Atlaması)
Aider hızlıca kodu commit edip, "Kod çalışıyor gibi görünüyor, iş bitti" diyerek sıradaki plana geçer. Pratikte o platformdaki (Mobil / Embedded) test koşulunu hiç okumaz.
**🔒 KİLİT Kuralları:**
- **IL-05 (Evrensel Gate) Zorunluluğu:** Değişiklik sonrası framework'e ait (Örn: Web ise browser test, Mobil ise lint/build test) ilgili komutu çalıştırmak ZORUNLUDUR.
- Terminal çıktısında somut bir `PASS` veya başarılı log görmeden commit satırına geçemezsin.

### Zaaf 3: Platform Bağımsızlığı Konusunda Kalıpçılık
Aider, genel internet verisi sebebiyle her sorunu bir Web Backend sorunuymuş gibi çözmeye eğilimlidir.
**🔒 KİLİT Kuralları:**
- `Phase 0` sürecinde donanımı (Unity, React Native, C++) kabul et. Git işlemlerini buna göre modüler (Additive-First) olarak, "Multi-Role" (Birden fazla kullanıcının işin içine gireceği) varsayımıyla yönet. Parçalama; yeni modül yarat.

## 2) Terminal Komut Rejimi & Risk Yönetimi (Triple-Sync)
- **IL-08 Triple Sync:** Kodun local'da çalışması yetmez. Git'e atılması, derlenmesi isteniyorsa bu izni kullanıcıdan mutlaka istersin. Yıkıcı komutlar (`git reset --hard` vb) Mentor dili ile uyarılmadan asla atılmaz.
- **Canlı Plan (IL-07):** Aider `git commit` veya terminal değişikliği yaptıktan sonra ZORUNLU olarak plan tablosundaki durumu `TAMAMLANDI` yaparak senkronizasyonu sürdürür.