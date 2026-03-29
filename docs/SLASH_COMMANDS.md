# Agent Governance OS - Vibecoder Slash Commands (/Komutlar)

Bu rehber, vibecoder'ların ajan mimarisiyle en hızlı, sıfır hatalı ve en güvenli şekilde iletişim kurabilmesi için tasarlanmıştır. Bu komutları bir chat mesajı olarak ajana yazdığınızda, ajan **Yazılım Mentoru** rolünü üstlenerek bu sözleşmedeki kilitleri otomatik açar.

## Kullanıma Hazır Hızlı Komutlar (Slash Commands)

### `/bootstrap` veya `/phase-0`
- **Ne İşe Yarar?** Ajanı, projeye dair hiçbir satır kod yazmadan hemen bir Mutabakat Mülakatına sokar.
- **Kullanım Yeri:** Projeyi ilk kez açtığınızda veya yepyeni bir özellik setine geçiş yaptığınızda.
- **Ajanın Beklenen Tepkisi:** "Merhaba! Projenizin niteliğini (Oyun mu, Mobil mi) anlamak için size Universal OS derinliğinde 5 stratejik sorum var..."

### `/resume` veya `/kaldigimiz-yerden`
- **Ne İşe Yarar?** `session-bootstrap.md` protokolündeki "Yarım Kalan Oturum" akışını zorla çağırır. 
- **Kullanım Yeri:** Eskiden bırakılmış bir plana dönüldüğünde veya ajan hafızasını sıfırladığında.
- **Ajanın Beklenen Tepkisi:** Dosya okumalarını yapar, aktif planı bulur, en son nerede `PASS` verdiğimizi söyler ve Scope alanının güvenli olduğunu onaylamadan koda girmez.

### `/verify-gates`
- **Ne İşe Yarar?** `AGENTS.md` içerisindeki zorunlu kapıları (Selftest, Mobile, A11y) ajanın tekrar koşmasını emreder.
- **Ajanın Beklenen Tepkisi:** Test/Lint komutlarını çalıştırır, terminal diffini sunar ve planı `[x]` olarak kapatmak için sizden izin ister.

### `/multi-role` veya `/farkli-gozle-bak`
- **Ne İşe Yarar?** Ajanı anında bir mentor, bir çaylak kullanıcı veya uzman bir yazılımcı gözüyle yazılmış kodları test etmeye zorlar. Zaafları tespit edip sızmayı önler.

> **Mentor İpucu:** Bu komutları doğrudan GitHub Copilot Chat, Cursor Chat veya Claude arayüzüne `/resume` olarak göndermeniz, ajanlardaki "Eylemsizlik (Analysis Paralysis)" ve "Aşırı Konuşkanlık" kusurlarını anında bypass eder.
