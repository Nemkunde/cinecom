import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
});
