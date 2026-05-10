## Tujuan
Bikin project bisa langsung di-deploy ke Vercel: tinggal upload (atau connect Git), klik Deploy, jadi. Tanpa setting tambahan.

## Kondisi sekarang
- Sudah ada `api/lookup.js` dan `api/scan.js` sebagai Vercel Serverless Functions dari folder `/api`.
- `vercel.json` harus memakai config modern (`framework`, `buildCommand`, `outputDirectory`, `rewrites`), bukan legacy `builds/routes`.
- Penyebab 404 dari log Vercel: build sukses, tapi output client tidak menampilkan `dist/client/index.html`; `vite.config.ts` sebelumnya memakai `spa.prerender.outputPath: "/"`, yang TanStack tulis sebagai shell `/.html`, bukan `/index.html`.

## Rencana perubahan

### 1. Pisahkan jelas: Vercel = SPA + /api edge functions
Frontend di-build sebagai SPA murni. Semua call ke `/api/lookup` dan `/api/scan` di production akan di-handle oleh `api/lookup.js` dan `api/scan.js` (Vercel auto-deploy folder `/api`).

### 2. Hapus TanStack server routes yang nge-block build Vercel
- Hapus `src/routes/api.lookup.ts`
- Hapus `src/routes/api.scan.ts`

Frontend (`Scanner.tsx`, `Lookup.tsx`) tetap fetch ke `/api/lookup` dan `/api/scan` — di Vercel itu di-handle file `api/*.js`, di preview Lovable tetap jalan via Cloudflare Worker (kalau perlu kita bikin ulang, tapi prioritas user = Vercel).

### 3. Pastikan `vite.config.ts` bisa build SPA tanpa server entry
Config pakai `@lovable.dev/vite-tanstack-config` dengan `spa.enabled = true` dan `spa.prerender.outputPath = "/index"`, supaya hasil prerender menjadi `dist/client/index.html`.

### 4. Pastikan `vercel.json` bener
Config final:
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client",
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
}
```
Vercel auto-detect `api/*.js` sebagai functions selama tidak dipaksa oleh legacy `builds/routes`.

### 5. Verifikasi
Build lokal lalu cek `dist/client/index.html` ada, dan folder `api/` punya `lookup.js` + `scan.js` + `_shared.js`.

## Cara deploy (untuk user)
**Opsi A — Upload ZIP:**
1. Download project ini sebagai ZIP.
2. Di Vercel: New Project → Upload → drop ZIP → Deploy. Selesai.

**Opsi B — Git (rekomendasi):**
1. Push ke GitHub.
2. Di Vercel: New Project → Import dari GitHub → Deploy. Selesai.

Tidak perlu setting environment variable, framework preset, atau build command — semua sudah ada di `vercel.json`.

## Catatan
Setelah perubahan ini, di **preview Lovable** scanner/lookup mungkin tidak jalan (karena route TanStack-nya dihapus). Kalau mau jalan di dua-duanya, bilang aja, nanti aku bikinin shim. Tapi karena fokus user = Vercel, aku prioritaskan itu dulu.