import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@deno-monorepo-poc/domain": path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "../../shared/domain/lib.ts"
      ),
    },
  },
  server: {
    fs: {
      allow: [
        path.resolve(
          path.dirname(new URL(import.meta.url).pathname),
          "../../shared/domain"
        ),
        path.resolve(path.dirname(new URL(import.meta.url).pathname)),
      ],
    },
  },
});
