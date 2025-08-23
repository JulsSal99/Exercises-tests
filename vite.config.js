import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

const pagesDir = resolve(__dirname, "pages");
const pageFiles = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith(".html"))
  .reduce((obj, f) => {
    const name = f.replace(".html", "");
    obj[name] = resolve(pagesDir, f);
    return obj;
  }, {});

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ...pageFiles
      }
    }
  }
});
