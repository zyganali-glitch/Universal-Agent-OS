---
name: corporate-intranet-access
description: Ajanın kurumsal ağlarda, VPN veya intranet ortamlarında harici telemetri ve güvenilmez API çağrılarını kısıtlayan davranış şablonu.
---

# Corporate Intranet Access Skill

Bu şablon, projenin kurumsal (enterprise) intranet veya kapalı ağ (VPN) ortamında çalışacağı tespit edildiğinde ajana uygulanacak ek kısıtlamaları içerir.

## Yönergeler
1. **Dış Çağrı Kısıtı:** Kod içerisinde analitik, telemetri (Google Analytics, Sentry vb.) veya CDN üzerinden script/css dahil etme işlemleri yapmayın. Tüm kaynaklar (assets) lokal olarak barındırılmalıdır.
2. **Güvenli Ortam İletişimi:** Kurum içi API veya veritabanı bağlantılarında self-signed sertifikalara karşı veya VPN içi IP yönlendirmelerine karşı hazırlıklı yapılandırmalar sunun.
3. **Loglama Kuralları:** Hata mesajlarını veya logları hiçbir harici bulut servisine göndermeyecek şekilde lokal dosyalara veya intranet log sunucularına yazacak mekanizmalar kurgulayın.
