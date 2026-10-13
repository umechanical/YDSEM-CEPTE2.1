# YDSEM CEPTE

Mobil öncelikli, çevrimdışı kullanılabilen kişisel YDS kelime uygulaması. İlk veri paketi, gönderilen **1. gün / Adjective Set 1** fotoğraflarındaki sıfatlara dayanır. 8 set, 40 açıklamalı soru, 5 mini oyun, tekrar ve ilerleme ekranları içerir.

## Çalıştırma

Bilgisayarda `index.html` dosyasına çift tıklayarak Chrome veya Edge ile açabilirsiniz. Bu modda ilerleme **yalnızca o tarayıcıda** saklanır. Hesap eşitlemesi için proje klasöründe `npm start` çalıştırıp `http://localhost:4173` adresini açın. Profil → **Hesap oluştur** ile kullanıcı adı ve en az 8 karakterli şifre belirleyin. Kaynak dosyaları değiştirdikten sonra `npm run build` ile `index.html` dosyasını yeniden üretin. `npm test` testleri çalıştırır.

## iPhone / iPad

**PC ve iPhone arasında otomatik eşitleme** için `server.mjs` dosyasını çalıştıran, kalıcı diskli bir Node.js sunucusu ve HTTPS adresi gerekir. Statik GitHub Pages yayını hesap API'sini çalıştırmaz; orada yalnızca cihaz bazlı yerel kayıt ve manuel yedek kullanılabilir. Sunucuya HTTPS üzerinden PC ve iPhone'da aynı adresten girin, iki cihazda da aynı kullanıcı adı/şifreyi kullanın. Safari'de Paylaş → **Ana Ekrana Ekle** seçin. İlk çevrimiçi açılıştan sonra uygulama dosyaları çevrimdışı önbelleğe alınır; çevrimdışı ilerleme bağlantı gelince gönderilir. Bu paket App Store uygulaması değildir.

Sunucu ayarları: `PORT` (varsayılan `4173`), `HOST` (varsayılan `127.0.0.1`), `YDSEM_DATA_DIR` (hesap verisinin kalıcı diskteki klasörü), `PUBLIC_HTTPS=true` (HTTPS ters vekili arkasında güvenli çerez). Yayında TLS/HTTPS, kalıcı disk ve düzenli `accounts.json` yedeği sağlayın. Kullanıcı verilerini tutan `server-data/` klasörünü web kökünden yayınlamayın; uygulama sunucusu bu klasöre erişimi kapatır.

Eski `file://` kullanımındaki ilerlemeyi hesaba taşımak için önce eski dosyada Profil → **Yedeği indir** seçin. Ardından sunucu adresini açıp Profil → **Yedek yükle** ile dosyayı içe aktarın ve hesap oluşturun. Sunucu henüz internete dağıtılmadıysa hesaplar yalnızca bilgisayarınızda çalışır; PC ve iPhone'un internet üzerinden aynı hesaba ulaşması için kalıcı HTTPS yayını tamamlanmalıdır.

## Veri ve yedek

Kelime içeriği `data/words.js` ve `data/simple-examples.js`, onaylı soru bankası `data/questions.js` dosyasındadır. İlerleme tarayıcının localStorage alanında `ydsem-progress-v1` anahtarıyla tutulur. Hesapla giriş yapıldığında ayrıca sunucudaki `accounts.json` dosyasına eşitlenir. Profil → **Yedeği indir** ile JSON yedek alın, **Yedek yükle** ile geri yükleyin. Hesap kullanılmıyorsa tarayıcı verisi silindiğinde ve yedek yoksa ilerleme kaybolur. Farklı hesaba girişte yerel kayıtlar birbirine karıştırılmaz. Hesaptan çıkış, cihazdaki yerel ilerlemeyi temizler; sunucu hesabındaki kayıt kalır.

## Haftalık içerik güncelleme

1. Yeni fotoğraflardaki kelimeleri ve yıldızları insan gözüyle doğrulayın. Emin olunmayan yıldızları öncelikli işaretlemeyin.
2. `data/words.js` içine benzersiz `id` ile yeni sözcük, tanım, IPA ve set bilgilerini; `data/simple-examples.js` içine üç ayrı cümle ve çevirisini ekleyin. Mevcut ID'leri değiştirmeyin.
3. `data/questions.js` içine yeni set başına en az beş **elle gözden geçirilmiş** soru ekleyin. Yanlış seçenekleri aynı anlam grubundan seçmeyin ve her şık için açıklama verin.
4. `service-worker.js` içindeki önbellek sürümünü artırın, `npm run build` ve `npm test` çalıştırın. Mevcut ilerleme kelime ID'sine bağlı olduğundan yeni içerik eklenince korunur.

## Algoritma

Tekrar basamakları 1, 3, 7, 14 ve 30 gündür. Yanlış yanıt aynı güne döner, art arda doğrular aralığı uzatır; yıldızlı kelimelerin aralığı biraz kısalır. Yıldızlı kelimeler tekrar kuyruğunda önce gelir, diğerleri de kuyrukta kalır. Soru ve kelime başına günlük XP sınırı vardır. Set geçiş eşiği %80'dir.

## İçerik sınırı ve doğrulama

İlk sürümde kitap fotoğrafındaki sıfatlar işlenmiştir. El yazısındaki ek fiiller ve edatlar profil sayfasında not olarak yer alır; doğrulanmış soru havuzuna henüz eklenmemiştir. Fotoğraftaki silik yıldız işaretleri kullanıcı onayı olmadan işlenmez. Kelime kökeni güvenilir biçimde doğrulanmadığı için boş bırakılmıştır. Telaffuz, cihazın İngilizce konuşma motorunu kullanır; ses kalitesi cihazdan cihaza değişebilir. Gerçek iOS Safari cihaz testi bu ortamda yapılmamıştır.

## Kısa cümleler ve karma set çalışması

53 kelimenin her biri için üç farklı kısa örnek vardır (toplam 159). Öğrenme örnekleri ve soru cümleleri en fazla 12 İngilizce kelimedir. Set değerlendirmeleri tanım eşleştirme, çoklu eş anlam seçimi, yazarak hatırlama, kısa cümle tamamlama, farklı kelimeyi bulma ve cümle–kelime eşleştirmeyi birleştirir. Yakın anlamlı kelimeleri ayırmak için ilk üç harf veya Türkçe anlam ipucu gösterilir. Her kontrolün ardından doğru kelime, anlamı ve kısa örneği gösterilir.

Karma etkinlikler `app/practice.js` içindedir. Yeni set eklerken `PRACTICE_GROUPS` içindeki eş anlam ve yanlış seçenek gruplarını da gözden geçirin. Mobilde Kontrol et / Devam düğmesi alt bölümde sabit kalır; içerik ayrı kaydırılır. Geçme eşiği %80 olarak korunmuştur.

Bu güncellemede içerik, karma etkinlik puanlama, tekrar puanını engelleme, set açılması ve paket testlerinin 13'ü geçti. Tarayıcıda 390×844 ve 375×667 görünümü, eşleştirme, çoklu seçim ve yazılı cevap akışı kontrol edildi. Gerçek iPhone klavyesi ve Safari cihaz testi yapılmadı.
