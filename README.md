# 🌌 Turkcell Code Night 2025 | SkillHub Dijital Beceri Gelişim Platformu

**Takım:** Geleceği Yazamayanlar 😅  
**Etkinlik:** Turkcell Code Night 2025 - Trabzon  
**Tarih:** 20-21 Kasım 2025

Bu depo, Trabzon'da düzenlenen Turkcell Code Night maratonunda, birbirini daha önce hiç tanımayan üç kişilik rastgele bir ekibin kısıtlı sürede geliştirmeye çalıştığı **SkillHub** projesinin kaynak kodlarını, tasarım konseptlerini ve veritabanı çalışmalarını içerir.

> ⚠️ **Durum:** Bu proje bir Hackathon ürünüdür. Teknik kısıtlamalar ve zaman baskısı altında geliştirilmiş olup, tamamlanmış bir ürün değil; takım ruhunun ve öğrenme sürecinin dijital bir hatırasıdır.

---

## ℹ️ Takım ve Proje Hakkında

Proje geliştirme sürecinde, özellikle **kurumsal ağ güvenlik politikaları** nedeniyle MSSQL sunucusunun yerel ağ üzerinden React uygulamasıyla haberleşmesinde kritik erişim sorunları yaşanmıştır. Ayrıca, kısıtlı süre içerisinde karşılaşılan farklı platform entegrasyon problemleri (React - MSSQL) projenin fonksiyonel olarak tamamlanmasını engellemiştir.

Yaşanan bu teknik aksaklıklar ve projenin kod tarafında tamamlanamaması sebebiyle, "Geleceği Yazanlar" mottosuna esprili bir gönderme yapılarak takım adı **"Geleceği Yazamayanlar"** olarak belirlenmiştir. Bu repo, karşılaşılan zorluklara rağmen ortaya konan teknik eforu ve takım çalışmasını belgelemektedir.

---

## 📂 Depo İçeriği (Repository Structure)

Proje dosyaları aşağıdaki gibi yapılandırılmıştır:

| Klasör / Dosya | Açıklama |
| :--- | :--- |
| **📄 SkillHub...pdf** | Yarışma kapsamında bize verilen Case (Vaka) analizi ve proje gereksinimleri. |
| **🎨 /Consept Frontend** | Projenin vizyonunu yansıtan, AI destekli oluşturulmuş işlevsel konsept arayüz tasarımları. |
| **⚛️ /React Frontend** | `t-learn-master` dizini altında, React ve TypeScript ile geliştirilen arayüz kodları. |
| **📊 /Upgraded Data** | Proje için tarafımızca işlenmiş, zenginleştirilmiş ve optimize edilmiş ham veriler. |
| **🗄️ tlearnDBBackup.bak** | Microsoft SQL Server (MSSQL) veritabanı yedeği. Restore edilerek incelenebilir. |

---

## 🛠️ Teknoloji Yığını (Tech Stack)

Projede aşağıdaki teknolojiler ve araçlar kullanılmıştır:

* **Frontend:** React.js, TypeScript, SCSS, HTML5
* **Backend:** JavaScript (Veritabanı bağlantısı ve entegrasyon)
* **Veritabanı:** Microsoft SQL Server (MSSQL)
* **Veri İşleme:** Excel & Custom Scripts (Veri zenginleştirme için)
* **Tasarım:** AI Generated Concept UI
  
---

## ⚙️ Kurulum ve İnceleme

Bu proje bir Hackathon çıktısı olduğu için "tak-çalıştır" (plug-and-play) yapıda olmayabilir. Frontend tarafını yerel ortamınızda incelemek isterseniz aşağıdaki adımları izleyebilirsiniz:

### Frontend (Arayüz)

```bash
# 1. Projeyi klonlayın
git clone [https://github.com/farukiskender/Turkcell_CodeNight_SkillHub_Dijital_Beceri_Gelisim_Platformu.git](https://github.com/farukiskender/Turkcell_CodeNight_SkillHub_Dijital_Beceri_Gelisim_Platformu.git)

# 2. Ana proje dizinine girin
cd Turkcell_CodeNight_SkillHub_Dijital_Beceri_Gelisim_Platformu

# 3. Frontend klasörüne geçiş yapın (Klasör ismindeki boşluklara dikkat)
cd "React Frontend/t-learn-master"

# 4. Gerekli paketleri yükleyin ve projeyi başlatın
npm install
npm start
