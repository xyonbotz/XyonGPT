🚀 XYONGPT - AI WhatsApp Assistant
XYONGPT adalah AI WhatsApp Assistant cerdas dengan context memory per user. Bot otomatis membalas private chat, sementara di grup hanya merespon jika di-mention. Dilengkapi smart filter & anti-ban basic, multi-device pairing, dan koneksi stabil. Dirancang untuk automation, AI response, dan modular system.
Not affiliated with WhatsApp. Developed by Xyon Community / Shanove.
⚡ Fitur Utama
Private chat auto-reply
Group mention only (hanya merespon jika di-mention)
Memory per user (menyimpan history percakapan sementara)
Smart filter & anti-ban basic
Multi-device pairing
Modular & easy to extend
Stable websocket connection
📁 Struktur Project
project/
├── index.js           → File utama bot
├── package.json       → Dependencies & scripts
├── sessions/          → Tempat session WA tersimpan
└── lib/
  ├── ai.js           → Integrasi XyonGPT API
  ├── memory.js       → Penyimpanan history user
  ├── group.js        → Logic group mention only
  └── filter.js       → Anti-ban & smart filter
⚙️ Instalasi & Jalankan
Clone repository:
git clone https://github.com/xyonbotz/XyonGPT.git
cd XyonGPT
Install dependencies:
npm install
Jalankan bot:
npm start
Saat pertama kali dijalankan, bot akan meminta nomor WA untuk pairing code.
Scan kode di WhatsApp Web / Business.
Session akan otomatis tersimpan di folder sessions/.
💡 Cara Penggunaan
Private Chat: Bot akan otomatis membalas
Group Chat: Bot hanya merespon jika di-mention
Memory: History percakapan user disimpan di lib/memory.js (default max 10 pesan)
Filter & Anti-ban: Spam, flood, dan kata terlarang otomatis di-skip
Custom AI: Endpoint default: https://xyongpt.my.id/api (dapat diganti)
🔗 GitHub & Link
Repo & Dokumentasi: https://github.com/xyonbotz/XyonGPT
📌 Catatan Tambahan
Node.js >= 18.x direkomendasikan
NODE_TLS_REJECT_UNAUTHORIZED diset ke 0 agar request API berjalan
Hosting / VPS harus support WebSocket
Jangan hapus folder sessions/ kecuali ingin reset bot
🛠 Kontribusi
Fork repo & buat plugin/modul di lib/
Pull request diterima untuk fitur baru atau perbaikan
📝 Lisensi
MIT License © Xyon Community / Shanove
Script ini open-source, siap dikembangkan siapa saja. Gunakan bot ini dengan bijak, jangan spam, dan patuhi aturan WhatsApp.
