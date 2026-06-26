---
description: Aktif planı devam ettir veya yeniden kullanılabilir global plan şablonundan yenisini başlat.
---

# /continue - Global Devam Protokolü

Bu workflow (iş akışı), kesintiye uğramış bir oturumu yönetişim (governance) altındaki icra modeline geri yükler.
Amacı sadece son düzenlemenin nerede durduğunu hatırlamak değil; daha fazla iş yapılmadan önce plan, gate ve kapsam durumunu yeniden doğrulamaktır.

## 1) Yükleme Sırası
Bunları sırayla oku:
1. `AGENTS.md`
2. `AGENT_OS_RULES.md`
3. İlgili kural dosyası
4. `session-bootstrap.md`
5. İlgili native adaptör yüzeyi
6. Kök `AGENT_OS_PLAN_TEMPLATE.md`

## 2) Plan Kaynağını Seç
Plan seçimi kesin bir sıra izler:
1. Kullanıcı belirli bir plan adı verdiyse, onu aç.
2. Aksi takdirde `plans/` altındaki aktif planı seç.
3. Aktif bir plan yoksa, kök şablondan yeni bir tane oluştur.
4. `plans/completed/` dizinini sadece geçmiş referansı için kullan.

## 3) Aktif Adımı Bul
Seçilen plan içinde, şu sırayla devam et:
1. `IN_PROGRESS` (DEVAM EDİYOR)
2. Aksi takdirde ilk anlamlı `PENDING` (BEKLİYOR)
3. Durum isimlendirmesi farklıysa, tahmin etmek yerine dürüstçe eşleştir.

## 4) Zorunlu Devam Kontrolleri
Tekrar icraya (kodlamaya) başlamadan önce şunları yeniden kontrol et:
1. Kapsam kilidinin geçerliliği
2. Allowlist / denylist kayması
3. Selftest ve ilgili testlerin etki büyümesi
4. Gizli keşfedilmiş işler (Discovered work)
5. Canlı davranış ile önceki PASS iddiaları arasındaki çelişkiler

## 5) Talep Alımı ve Bağımlılık Sırası
Devam etmek hiçbir zaman son mesaja körü körüne uymak demek değildir.
Bunun yerine:
- Yeni talebi mevcut backlog'a (bekleyen işler listesine) birleştir.
- Görevleri bağımlılık ve riske göre sırala.
- Paylaşılan dosyalarda güvensiz çoklu yazarlı genişlemeyi reddet.
- Gerçeklik görevi genişlettiğinde yeni keşfedilmiş iş satırları aç.

## 6) Ana Ajan ve Destekleyici Roller
Devam ederken rol modelini yeniden onayla:
- Ana ajan = sohbet yüzündeki ajan
- Destekleyici roller = bug-hunt (hata avı), plan bütünlüğü, test/gate doğrulayıcı ve isteğe bağlı domain inceleyicileri
- Platform gerçek alt ajanları çalıştıramıyorsa, `fallback-to-sequential` kaydet.

## 7) Kullanıcı Dönüş Paketi
İcraya (çalışmaya) yeniden girmeden önce şunları raporla:
- Plan dosyası
- Aktif faz ve aktif adım
- `MODE`
- Allowlist / denylist
- Selftest + ilgili test etki haritası
- Ana ajan + destekleyici rol veya fallback (yedek) yapısı
- İlk güvenli mikro-faz

## 8) Bootstrap Disiplinine Yeniden Gir
Devam etmek (Resume) bootstrap (başlangıç) mantığını atlamaz.
İcradan önce şunları tekrar beyan et:
- Kanıt planı
- Test ve gate planı
- Tek istekte maksimum ilerleme (one-request max-progress) sınırı
- Tek yazar kilidi (single-writer lock)
- Sonraki kapanış kanıtı hedefi

## 9) Devir (Handoff) ve Checkpoint Görevi
Yeniden başlatılan her oturum güncellenmiş devir ve checkpoint alanlarıyla bitmelidir.
Sadece görev tablosunu güncellemek yetersizdir; header, faz planı, backlog, talep, gate, risk ve handoff yüzeyleri birlikte hareket eder.

## 10) Kapanış Kuralları
- `Plan -> Kanıt -> Test` dışında kapanış yoktur.
- Zorunlu gate'ler `FAIL` veya `NOT_RUN` iken `DONE` yoktur.
- Push/deploy/repo-sync kapsamında Triple-Sync Gate (Üçlü Senkron Kapısı) zorunludur.
- Tek bir istekte maksimum güvenli mikro-fazı tamamla.
- Ana ajan en fazla 2-3 aktif mikro-faz taşır.

## 11) Anti-Pattern'ler (Kaçınılması Gerekenler)
- Sadece en son kullanıcı mesajını okuduktan sonra devam ediyormuş gibi yapmak
- Bir plan seçmeden önce icraya (kodlamaya) girmek
- Keşfedilen işleri (discovered work) izlenen yüzeylerin dışında bırakmak
- Kodlama bitene kadar selftest etkisini görmezden gelmek
- Canlı davranış ile statik PASS satırları arasındaki çelişkileri gizlemek

## 12) Beklenen Çıktı
Bu iş akışından sonra ajan şunları açıkça belirtebilmelidir:
- Hangi plan aktif
- Hangi adım aktif
- Hangi gate'ler etkilenmek üzere
- Hangi riskler açık kalmaya devam ediyor

`/continue` komutunun amacı kısayolla hızlanmak değildir. Durum kaybı olmadan güvenli bir şekilde devam etmektir.
