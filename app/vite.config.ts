import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    base: "/chess",
    build: { outDir: "../docs", emptyOutDir: true, target: "esnext", chunkSizeWarningLimit: 16_384 },
    server: { fs: { strict: false } },
});
