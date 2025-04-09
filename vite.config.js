import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/top-coins": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/refresh-data": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/analyze": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
