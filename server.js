const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Statische Dateien aus dem Projektverzeichnis bereitstellen
app.use(express.static(path.join(__dirname)));

// Für alle anderen Pfade die index.html zurückgeben (Single-Page-Sites / statische Seiten)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
