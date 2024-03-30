import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import browserslist from "browserslist";
import { Features, browserslistToTargets } from "lightningcss";
import { fileURLToPath } from "node:url";

export default defineConfig({
  build: {
    cssMinify: "lightningcss",
  },
  plugins: [react()],
  css: {
    lightningcss: {
      drafts: {
        customMedia: true,
      },
      include: Features.MediaQueries,
      targets: browserslistToTargets(
        browserslist(["last 2 version", "not dead"])
      ),
    },
    transformer: "lightningcss",
  },
  resolve: {
    alias: [
      {
        find: "~",
        replacement: fileURLToPath(new URL("src", import.meta.url)),
      },
    ],
  },
});
