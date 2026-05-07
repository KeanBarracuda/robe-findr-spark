import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Deploying to Vercel: disable Cloudflare plugin and target Vercel for TanStack Start build.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    target: "vercel",
  },
});
