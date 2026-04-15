# Agent Governance OS - Slash Commands (/Komutlar)

Bu rehber, operatorlerin ve AI destekli gelistiricilerin ajan mimarisiyle en hizli, en guvenli ve en izlenebilir sekilde iletisim kurmasi icin tasarlanmistir. Bu komutlari bir chat mesaji olarak ajana yazdiginizda, ajan ilgili workflow'u dogrudan calistirmalidir.

## Kullanima Hazir Hizli Komutlar

### `/bootstrap` veya `/phase-0`
- **Ne ise yarar?** Ajanı, projeye dair hicbir satir kod yazmadan hemen bir Mutabakat Mulakatina sokar.
- **Kullanim yeri:** Projeyi ilk kez actiginizda veya buyuk bir yeni is akisi baslatirken.
- **Ajanin beklenen tepkisi:** Platformu, olcegi, mimari riski ve kalite beklentilerini anlamak icin consultation-first sorular sorar.

### `/resume` veya `/devam`
- **Ne ise yarar?** Aktif plan uzerinden yonetimli resume akisini zorla cagirir.
- **Kullanim yeri:** Oturum yarim kaldiginda veya ajan baglam kaybettiginde.
- **Ajanin beklenen tepkisi:** Governance dosyalarini yeniden okur, aktif plani bulur, scope/gate/discovered work kontrolu yapar ve ancak sonra yurutmeye doner.

### `/verify-gates`
- **Ne ise yarar?** Ajanin ilgili gate ve dogrulama kontrollerini yeniden kosmasini saglar.
- **Kullanim yeri:** Mevcut slice'in gercekten dogrulandigina dair kanit istediginizde.
- **Ajanin beklenen tepkisi:** Gerekli kontrolleri kosar veya tekrarlar, kaniti raporlar ve gate durumu olmadan closure iddia etmez.

### `/multi-role` veya `/farkli-gozle-bak`
- **Ne ise yarar?** Coklu-perspektifli inceleme turu baslatir.
- **Kullanim yeri:** Cozumu acemi kullanici, bakimci, alan uzmani veya QA/guvenlik gozuyle yeniden tarttirmak istediginizde.
- **Ajanin beklenen tepkisi:** Riskleri, anlasilabilirlik bosluklarini, bakim problemlerini ve atlanan kenar durumlarini listeler.

## Mentor Ipucu

Bu komutlar iki yaygin arizayi bastirmakta ozellikle faydalidir:
- analysis paralysis
- hizli ama plansiz edit

Ajanin koda dokunmadan once plandaki konumunu kanitlamasini istediginizde `/resume` veya `/devam` kullanin.