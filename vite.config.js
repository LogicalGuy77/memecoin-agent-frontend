import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/top-coins": {
        target: "https://memecoin-agent-api.onrender.com",
        changeOrigin: true,
      },
      "/refresh-data": {
        target: "https://memecoin-agent-api.onrender.com",
        changeOrigin: true,
      },
      "/analyze": {
        target: "https://memecoin-agent-api.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
