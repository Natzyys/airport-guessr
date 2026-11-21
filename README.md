# Around the World

Tebak lokasi bandara di peta!

## Cara menjalankan

```bash
npm install
npm run dev
```

Lalu buka URL yang muncul di terminal (biasanya `http://localhost:5173`).

## Struktur project

- `index.html` — entry HTML, memuat Leaflet lewat CDN
- `src/main.jsx` — entry React (dulu bernama `index.jsx`)
- `src/App.jsx` — komponen utama
- `src/AirportMap.jsx` — komponen peta
- `src/distance.js` — perhitungan jarak (haversine)
- `src/App.css` — styling
