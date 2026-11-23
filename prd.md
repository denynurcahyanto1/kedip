# PRD: Kedip

**Versi:** 0.1 (draft) · **Tanggal:** 23 November 2026 · **Pemilik:** Deny Nurcahyanto
**Tagline:** *Kedip sebentar, kita ketemu.*

> **Catatan sumber & asumsi.** PRD ini disusun dari hasil Firecrawl terhadap kompetitor/referensi **Momoto** (momotoldr.com). Halaman prototipe Kedip tidak bisa saya buka (diblokir login), jadi bagian yang bertanda **[Asumsi]** perlu Anda konfirmasi. Harga clean copy dan syarat promo Buy 1 Get 1 Momoto tidak tersedia di hasil crawl, jadi tidak dipakai sebagai angka.

---

## 1. Ringkasan

Kedip adalah studio foto online berbasis browser untuk pasangan LDR dan teman jarak jauh. Dua orang masuk ke satu "bilik" virtual, berfoto bersama secara sinkron, mendekorasi strip foto, lalu menyimpannya sebagai kenangan bersama. Nama "Kedip" diambil dari kedipan kamera dan kedipan mata (wink): momen kecil yang manis.

## 2. Latar Belakang & Masalah

Pasangan LDR rindu pada **kebersamaan fisik** (ketemu, jalan, kulineran), sedangkan video call biasa hanya memberi obrolan tanpa artefak yang bisa disimpan. Akibatnya:

- Tidak ada "bukti" momen bersama selain screenshot VC yang berantakan.
- Aktivitas bareng saat VC terbatas, sehingga cepat bosan.
- Foto berdua nyaris mustahil karena beda lokasi.

## 3. Analisis Referensi: Momoto

| Aspek | Temuan dari hasil crawl |
|---|---|
| Positioning | Online photobooth untuk pasangan LDR dan teman; join booth live, styling strip, simpan di scrapbook bersama |
| Mode | Solo, Couple, Group (Virtual Photobooth); Scrapbook hanya Solo |
| Inti fitur | 4 foto tersinkron per strip, filter, stiker, background kustom; scrapbook digital yang bisa disimpan sebagai PDF |
| Platform | Berjalan di browser, tanpa instal; butuh kamera dan browser modern (Chrome, Safari, Edge, Firefox) |
| Couple session | Kode room dibagikan; video/audio peer-to-peer dan tidak direkam |
| Monetisasi | Membuat dan membagikan strip gratis (ada watermark); copy bersih beresolusi tinggi berbayar; pembayaran lewat Midtrans; promo "Buy 1 Get 1" |
| Akun | Email + password atau Google; link pasangan lewat invite code dan bersifat permanen; akun dihapus bila tidak login 90 hari |
| Status | **Closed beta** (sign-up ditutup untuk umum) |
| Aktivitas | Hanya 2 aktif; bagian "Coming Soon" tanpa nama aktivitas |
| Dukungan | Help Center dengan form kontak (tanpa email publik); link Instagram mengarah ke 404 |
| Usia | Minimal 13 tahun |

### Celah yang bisa dimanfaatkan Kedip

1. Momoto masih closed beta, sehingga ada peluang membuka akses publik lebih cepat.
2. Scrapbook-nya hanya Solo; Kedip bisa membuat scrapbook **kolaboratif** (disusun berdua).
3. Aktivitas sedikit; Kedip bisa menambah ritual harian ringan.
4. Link pasangan permanen dan tidak bisa dibatalkan; Kedip bisa menawarkan **putus-sambung yang jelas** (unlink dengan persetujuan).
5. Kanal dukungan lemah (tanpa email, sosial media rusak); Kedip bisa unggul di respons dan kepercayaan.

## 4. Tujuan & Metrik

| Tujuan | Metrik | Target [Asumsi] |
|---|---|---|
| Orang mau mencoba | Sesi Couple selesai / pengguna baru | ≥ 50% |
| Orang kembali | Pasangan aktif mingguan (WAU) | ≥ 35% dari pasangan terdaftar |
| Nilai tersimpan | Strip tersimpan per pasangan per bulan | ≥ 3 |
| Monetisasi | Konversi ke unduhan bersih | 5–10% dari strip tersimpan |
| Kualitas teknis | Sesi dengan koneksi video stabil | ≥ 90% |

## 5. Target Pengguna

- **Utama:** pasangan LDR usia 17–30 tahun di Indonesia, terbiasa VC malam hari (sekitar 20.00–24.00).
- **Sekunder:** sahabat/keluarga jarak jauh, serta mode Solo dan Group untuk acara kecil.

**Persona singkat:** *Dina & Raka*, beda kota, VC tiap malam, ingin punya foto berdua tanpa harus ketemu.

## 6. Ruang Lingkup

### MVP (v1.0)

| # | Fitur | Prioritas |
|---|---|---|
| 1 | Daftar/masuk (email, Google) | P0 |
| 2 | Hubungkan pasangan lewat kode undangan | P0 |
| 3 | **Kedip Booth (Couple):** room code, video P2P WebRTC, countdown sinkron, 4 foto per strip | P0 |
| 4 | Editor strip: filter, stiker, background, bingkai | P0 |
| 5 | Galeri pasangan: strip tersimpan bersama | P0 |
| 6 | Unduh versi gratis (watermark) dan versi bersih (berbayar) | P0 |
| 7 | Mode Solo | P1 |
| 8 | Bahasa Indonesia sebagai default, Inggris menyusul | P1 |
| 9 | Help Center + form dukungan + email kontak publik | P1 |

### Pasca-MVP

- **Scrapbook bersama:** halaman dikurasi berdua, ekspor PDF.
- **Stiker pasangan** dan koleksi stiker musiman.
- **Foto bergerak:** strip animasi (GIF/MP4 pendek).
- **Pertanyaan harian** yang terbuka setelah keduanya menjawab, dan **countdown ketemu**.
- **Aktivitas bareng saat VC** (game ringan, gambar bareng).
- Mode Group.

### Di luar lingkup v1

Aplikasi native, perekaman video panggilan, marketplace stiker pihak ketiga, cetak fisik.

## 7. Alur Pengguna Utama

1. Masuk, lalu hubungkan pasangan lewat kode undangan.
2. Pilih **Kedip Booth**, lalu bagikan kode room (atau otomatis masuk jika sudah terhubung).
3. Kedua kamera menyala, countdown 3-2-1, **kedip!** 4 foto diambil sinkron.
4. Dekorasi bareng: filter, stiker, background.
5. Simpan ke galeri, lalu bagikan atau unduh.
6. (Opsional) Beli copy bersih tanpa watermark.

## 8. Kebutuhan Fungsional (ringkas)

- **FR-1** Foto dikomposisi di browser; yang diunggah hanya strip final yang dipilih pengguna.
- **FR-2** Video/audio Couple lewat WebRTC P2P, **tidak direkam**; server hanya signaling (dan relay TURN bila perlu).
- **FR-3** Countdown dan jepretan tersinkron antar dua perangkat (toleransi ≤ 300 ms).
- **FR-4** Strip gratis berwatermark; pembelian membuka berkas bersih resolusi tinggi.
- **FR-5** Pembayaran lewat Midtrans (QRIS, e-wallet, VA); harga ditampilkan sebelum konfirmasi.
- **FR-6** Unlink pasangan memerlukan persetujuan kedua pihak; hapus akun dan data atas permintaan.
- **FR-7** Penghapusan akun otomatis setelah tidak aktif dalam jangka tertentu, dengan email peringatan lebih dulu [Asumsi: 180 hari].

## 9. Kebutuhan Non-Fungsional

- **Performa:** halaman utama LCP < 2,5 detik pada 4G; booth dimuat < 4 detik.
- **Kompatibilitas:** Chrome, Safari (iOS), Edge, Firefox terbaru; mobile-first.
- **Privasi:** tanpa cookie iklan atau pelacak pihak ketiga; data tidak dijual; usia minimal 13 tahun; persetujuan orang yang tampil di foto.
- **Keamanan:** password di-hash, HTTPS wajib, kode room kedaluwarsa singkat.
- **Aksesibilitas:** kontras sesuai WCAG AA; animasi menghormati `prefers-reduced-motion`.

## 10. Monetisasi [Asumsi]

| Item | Hipotesis |
|---|---|
| Buat, simpan, bagikan strip berwatermark | Gratis |
| Copy bersih per strip | Harga mikro (tetapkan setelah uji kesediaan bayar) |
| Paket bundel / "Kedip Plus" | Stiker eksklusif, scrapbook tak terbatas, tanpa watermark |
| Promo peluncuran | Mis. beli 1 gratis 1 untuk pasangan (definisikan syarat sendiri) |

## 11. Identitas Brand

- **Warna:** Coral `#FF5A6E`, Plum `#2A1A33`, Cream `#FFF4EA`, Butter `#FFC857`.
- **Logo:** ikon dua "mata" (satu terbuka, satu berkedip) dengan percikan; wordmark huruf kecil geometris, titik pada "i" berwarna coral.
- **Nada suara:** hangat, jenaka, dekat (bahasa sehari-hari, bukan korporat).
- **Aset:** `logo-icon.svg`, `logo-wordmark.svg`, `logo-lockup.svg`, dan versi animasi untuk web.

## 12. Arsitektur yang Disarankan [Asumsi]

- **Frontend:** Next.js atau Vite + React, Canvas API untuk komposisi strip.
- **Real-time:** WebRTC + signaling WebSocket (mis. Supabase Realtime / Socket.io), TURN (coturn atau layanan terkelola).
- **Backend & data:** Supabase (Auth, Postgres, Storage) atau setara.
- **Pembayaran:** Midtrans Snap.
- **Hosting:** Vercel/Cloudflare untuk web.

## 13. Rencana Rilis

| Fase | Durasi | Hasil |
|---|---|---|
| 0. Validasi | 1–2 minggu | Wawancara 5–10 pasangan LDR, uji prototipe |
| 1. MVP | 4–6 minggu | Booth Couple, editor, galeri, watermark |
| 2. Beta tertutup | 3–4 minggu | 10–20 pasangan, perbaikan stabilitas WebRTC |
| 3. Monetisasi | 2–3 minggu | Midtrans, copy bersih |
| 4. Rilis publik | — | Buka pendaftaran, mulai kanal sosial |

## 14. Risiko

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Koneksi P2P gagal di jaringan seluler | Sesi putus | TURN relay, deteksi kualitas, mode "ambil foto bergantian" |
| Sinkronisasi jepretan meleset | Strip terasa janggal | Timestamp server + kompensasi latensi |
| Privasi foto pasangan | Hilang kepercayaan | Proses di browser, kebijakan jelas, hapus kapan saja |
| Kompetitor sudah ada | Diferensiasi lemah | Fokus scrapbook bersama + ritual harian + respons dukungan |
| Biaya TURN/storage | Margin tipis | Kompres strip, batasi retensi gratis |

## 15. Pertanyaan Terbuka

1. Apakah Kedip murni photobooth, atau bagian dari aplikasi LDR yang lebih luas?
2. Platform utama: web saja dulu, atau PWA/Play Store?
3. Model harga final dan kuota gratis.
4. Berapa lama strip gratis disimpan?

---

*Sumber analisis kompetitor: hasil Firecrawl terhadap momotoldr.com (beranda, aktivitas, help, privacy, terms).*
