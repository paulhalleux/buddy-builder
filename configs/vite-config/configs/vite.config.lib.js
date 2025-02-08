import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import eslint from "vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    eslint({ exclude: [/virtual:/, /node_modules/] }),
    dts({
      insertTypesEntry: true,
      tsconfigPath: resolve(process.cwd(), "tsconfig.app.json"),
      rollupTypes: true,
    }),
    tailwindcss(),
  ],
  assetsInclude: ["/sb-preview/runtime.js"],
  build: {
    minify: true,
    sourcemap: true,
    lib: {
      entry: resolve(process.cwd(), "src/index.ts"),
      name: "index",
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-router-dom", "react-router"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
