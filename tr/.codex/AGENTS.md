# Codex / Copilot Çalışma Sözleşmesi & Kurumsal Düzey Zero-Leak Yüzey Kilidi

Bu dosya, IDE içine gömülü (Inline) çalışan, anlık otomatik tamamlamalar yapan **Codex. Cursor ve Copilot** tarzı asistanların refleksif (hızlı ama tehlikeli) zaaflarını kontrol altına alır; onları temel governance omurgasına sadık kılar.

> [!CAUTION]
> **KESİN SIZINTI VE ANTI-SPAGETTI KİLİDİ (ZERO-LEAK & ANTI-HACK LOCK):**
> Inline çalışan asistanlar "Hemen şimdi o satırı bitir" psikolojisiyle tüm mimari kilitleri atlayıp Anti-pattern üretebilirler. Bütün Codex/Cursor versiyonları kök projede tanımlanmış olan `GLOBAL_PLAN` ve **IL-01...IL-08 Integrity Lock** sistemine kayıtsız şartsız uymalıdır! Phase 0 sınırlarının (Proje oyun mudur? Web midir?) farkındalığıyla çalışmalılar.

## 1) Inline (Satır-İçi) Asistan Zaafları ve Önlemler

### Zaaf 1: Inline Hack Eğilimi (Evrensel Sınır İhlali)
Codex, imlecin bulunduğu yerde veritabanı çağırmaya, bütün logic'i bir komponentin içine `Hack` etmeye bayılır. Monolith'leri şişirir.
**🔒 KİLİT Kuralları:**
- **Additive-First & Boundary Lock:** Çözüm, o anki dosyanın tek sorumluluğuna (Single Responsibility) ters ise, "kodu buraya yapıştır" değil, "Mentor bakış açısıyla global bir klasöre taşıyalım ve buradan delegasyon çağıralım" tavsiyesini ver.
- Proje bir iOS App de olsa, Web backend de olsa Modüler mimari vazgeçilmezdir.

### Zaaf 2: Evrensel Kalite Kapılarını (Gates) Kaybetmesi
IDE penceresindeki üç satırlık koda odaklandığı için Erişilebilirlik (A11y), Mobil Uyumluluk, Güvenlik ve i18n Çoklu dil `(Multi-Role)` özelliklerini atlar.
**🔒 KİLİT Kuralları:**
- Önerilen her Snippet (parça kod) Multi-Role Audit (Siber güvenlikçi, çocuk, engelli, profesör) onaylarından geçerliliği ispatlı olmalıdır.
- Eğer proje çok dilli bir PWA veya App ise, HTML içerisine "Welcome" veya "Gönder" diye yavan hardcoded kelimeler uydurulamaz. Çeviri kütüphanelerinin (`t('welcome')`) standart mimarisini empoze et!

## 2) Test (Gate) Eksikliği Eğilimi
- **Kural (IL-05 Uyumlaması):** Sadece "Şimdi çalıştı" diyerek günü kurtaran kod bloğu reddedilir. Her tamamlama anında, "Acaba bu Selftest veya Regression Error (Bozulma) yaratır mı?" düşüncesi aktif olarak çalıştırılacaktır.

## 3) Özet Kilidi: Uçuş Planına Sadakat (Single Source of Truth)
Panel içi chat asistanı ("Yardımcı Pilot") da olsanız; projenin "Uçuş Planı (Master Plan = Görev Çizelgesi)" IL-01 kuralı gereği Tek Gerçek Kaynaktır (Single Source of Truth). Hızlı pratik yapmak adına, Master Plan'i ve ana governance ilkelerini esnetmek/hacklemek affedilmez bir kural ihlalidir.
