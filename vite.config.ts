import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
import path from "path";

export default defineConfig({
  base: "/Renato-Portfolio/",
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
