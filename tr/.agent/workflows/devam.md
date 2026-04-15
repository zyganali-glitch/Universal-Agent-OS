---
description: Aktif plana guvenli sekilde geri don veya yeni bir plan olustur.
---

# /devam - Global Resume Protokolu

Bu workflow, kesintiye ugrayan bir oturumu yeniden yonetimli yurütme modeline geri tasir.
Amaci son promptun kaldigi yerden korlemesine devam etmek degil; plan durumunu, gate durumunu ve scope durumunu yeniden dogrulamaktir.

## 1) Yukleme Sirasi
Su dosyalari sirayla oku:
1. `AGENTS.md`
2. `AGENT_OS_RULES.md`
3. ilgili rule dosyasi
4. `session-bootstrap.md`
5. ilgili native adapter yuzeyi
6. kok `AGENT_OS_PLAN_TEMPLATE.md`

## 2) Plan Kaynagini Sec
Plan secimi siki bir sirayla yapilir:
1. Kullanici belirli bir plan adi verdiyse onu ac.
2. Aksi halde `plans/` altindaki aktif plani sec.
3. Aktif plan yoksa kok sablondan yeni plan uret.
4. `plans/completed/` sadece tarihsel referans icin kullanilir.

## 3) Aktif Adimi Bul
Secilen plan icinde su sirayla devam edilir:
1. `IN_PROGRESS`
2. yoksa ilk anlamli `PENDING`
3. durum adlari farkliysa tahmin etme; durumu durustce esle

## 4) Zorunlu Resume Kontrolleri
Uygulamaya geri donmeden once sunlari yeniden kontrol et:
- scope lock gecerli mi
- allowlist / denylist drift var mi
- selftest ve related-test etkisi buyudu mu
- gizli discovered work var mi
- canli davranis ile onceki PASS iddialari celisiyor mu

## 5) Talep Derleme ve Bagimlilik Sirasi
Resume, son kullanici mesajini korlemesine uygulamak degildir.
Onun yerine:
- yeni talebi mevcut backlog ile birlestir
- gorevleri bagimlilik ve riske gore sirala
- shared dosyalarda guvensiz coklu-writer genislemesini reddet
- gerceklik gorevi buyuttuysa yeni discovered-work satirlari ac

## 6) Ana Ajan ve Destek Rolleri
Resume aninda rol modelini yeniden teyit et:
- ana ajan = kullaniciyla sohbet eden ajan
- destek rolleri = bug-hunt, plan butunlugu, test/gate verifier ve opsiyonel alan gozden geciricileri
- platform gercek alt ajan calistiramiyorsa `fallback-to-sequential` yaz

## 7) Kullaniciya Donus Paketi
Yurutmeye geri girmeden once su bilgileri bildir:
- plan dosyasi
- aktif faz ve aktif adim
- `MODE`
- allowlist / denylist
- selftest + related-test etki haritasi
- ana ajan + destek rol veya fallback yapisi
- ilk guvenli mikro-faz

## 8) Bootstrap Disiplinine Geri Don
Resume, bootstrap mantigini atlamak degildir.
Uygulamadan once sunlari yeniden beyan et:
- kanit plani
- test ve gate plani
- one-request max-progress siniri
- single-writer kilidi
- sonraki closure proof hedefi

## 9) Handoff ve Checkpoint Gorevi
Her resume oturumu guncel handoff ve checkpoint alanlariyla kapanir.
Sadece task table guncellemek yetmez; header, faz plani, backlog, request, gate, risk ve handoff birlikte hareket eder.

## 10) Kapanis Kurallari
- `Plan -> Kanit -> Test` disinda kapanis yok.
- Zorunlu gate'lerden biri `FAIL` veya `NOT_RUN` ise `DONE` yok.
- Push/deploy/repo-sync kapsaminda Triple-Sync Gate zorunludur.
- Tek istekte en fazla guvenli mikro-faz tamamlanir.
- Ana ajan ayni anda en fazla 2-3 aktif mikro-faz tasir.

## 11) Anti-Pattern'ler
- sadece son kullanici mesajini okuyup resume yaptigini sanmak
- plan secmeden uygulamaya girmek
- discovered work'u izlenen yuzeylerin disinda birakmak
- selftest etkisini koddan sonraya birakmak
- canli davranis ile statik PASS satirlari arasindaki celiskileri gizlemek

## 12) Beklenen Sonuc
Bu workflow tamamlandiginda ajan su netligi saglayabilmelidir:
- hangi plan aktif
- hangi adim aktif
- hangi gate'ler etkilenecek
- hangi riskler hala acik

`/devam` komutunun amaci kestirme hiz degil; durum kaybi olmadan guvenli sekilde devam etmektir.