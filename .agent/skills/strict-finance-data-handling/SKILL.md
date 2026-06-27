---
name: strict-finance-data-handling
description: Finansal projelerde hassas veri, kart numarası, TCKN ve bakiye gibi bilgilerin güvenli işlenmesi için ajan kuralları.
---

# Strict Finance Data Handling Skill

Bu şablon, proje içerisinde bankacılık, fintech veya ödeme sistemleri kodlandığı tespit edildiğinde ajana uygulanacak katı veri güvenlik yönergeleridir.

## Yönergeler
1. **Veri Maskeleme:** Kredi kartı numarası, TCKN, SSN gibi PII (Personal Identifiable Information) verilerini loglarken, test ederken ve arayüzde gösterirken KESİNLİKLE maskeleyin (Örn: `**** **** **** 1234`).
2. **Mock Data:** Test verisi (dummy/mock data) üretirken gerçek insanlara veya kurumlara ait gerçek veriler kullanmayın. Standart test kart numaralarını ve kurgusal kimlik numaralarını tercih edin.
3. **Güvenlik Çevresi:** Ödeme verilerinin in-memory tutulma süresini en aza indirecek mimari yaklaşımlar (örneğin bellek temizleme mekanizmaları, sıfırlama vb.) önerin ve uygulayın.
4. **Şifreleme:** Hassas verilerin disk üzerine yazılırken encrypt edildiğinden emin olun (ör. LocalStorage yerine güvenli token cookie/HTTPOnly kullanımı).
