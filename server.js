const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Cache-Control Middleware für statische Assets
app.use((req, res, next) => {
  // Unveränderliche Assets (mit Hash) - 1 Jahr Cache
  if (/\.(js|css|woff2|ttf|eot|otf)$/.test(req.url)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // Bilder - 1 Jahr Cache (sollten selten ändern)
  else if (/\.(jpg|jpeg|png|gif|svg|webp|avif)$/.test(req.url)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // HTML - kurz cachen (1 Stunde)
  else if (/\.html$/.test(req.url) || req.url === '/') {
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  }
  next();
});

// Gzip-Kompression ermöglichen
app.use(express.static(path.join(__dirname), {
  maxAge: '31536000',
  etag: false
}));

// Für alle anderen Pfade die index.html zurückgeben (Single-Page-Sites / statische Seiten)
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
