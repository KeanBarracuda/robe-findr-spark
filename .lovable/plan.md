## Tujuan
Bikin project bisa langsung di-deploy ke Vercel: tinggal upload (atau connect Git), klik Deploy, jadi. Tanpa setting tambahan.

## Kondisi sekarang
- Sudah ada `api/lookup.js` dan `api/scan.js` (Vercel Edge Functions, format yang Vercel auto-detect dari folder `/api`).
- Sudah ada `vercel.json` yang build pakai Vite, output ke `dist/client`, dan rewrite semua URL non-`/api/*` ke `index.html` (SPA fallback).
- Tapi project juga masih punya **TanStack server routes** (`src/routes/api.lookup.ts`, `src/routes/api.scan.ts`) yang dipakai untuk preview Lovable. File ini tidak jalan di Vercel dan kemungkinan bikin build gagal di Vercel karena butuh runtime TanStack Start (Cloudflare Worker), bukan static SPA.

## Rencana perubahan

### 1. Pisahkan jelas: Vercel = SPA + /api edge functions
Frontend di-build sebagai SPA murni. Semua call ke `/api/lookup` dan `/api/scan` di production akan di-handle oleh `api/lookup.js` dan `api/scan.js` (Vercel auto-deploy folder `/api`).

### 2. Hapus TanStack server routes yang nge-block build Vercel
- Hapus `src/routes/api.lookup.ts`
- Hapus `src/routes/api.scan.ts`

Frontend (`Scanner.tsx`, `Lookup.tsx`) tetap fetch ke `/api/lookup` dan `/api/scan` — di Vercel itu di-handle file `api/*.js`, di preview Lovable tetap jalan via Cloudflare Worker (kalau perlu kita bikin ulang, tapi prioritas user = Vercel).

### 3. Pastikan `vite.config.ts` bisa build SPA tanpa server entry
Config sekarang pakai `@lovable.dev/vite-tanstack-config` dengan `spa.enabled = true` — output `dist/client` sudah bisa langsung di-host. Tidak perlu diubah.

### 4. Pastikan `vercel.json` bener
Sudah bener:
```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist/client",
  "rewrites": [{ "source": "/((?!api/.*).*)", "destination": "/index.html" }]
}
```
Vercel auto-detect `api/*.js` sebagai Edge Functions (sudah ada `export const config = { runtime: "edge" }` di tiap file).

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