import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["gummatous-unfervidly-stephanie.ngrok-free.dev"],
    hmr: {
      host: "gummatous-unfervidly-stephanie.ngrok-free.dev",
      protocol: "wss",
      clientPort: 443,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
