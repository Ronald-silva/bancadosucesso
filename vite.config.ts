import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync, existsSync } from "fs";

// Plugin para copiar .htaccess automaticamente após o build
const copyHtaccessPlugin = () => {
  return {
    name: "copy-htaccess",
    closeBundle() {
      const htaccessPath = path.resolve(__dirname, ".htaccess");
      const distPath = path.resolve(__dirname, "dist", ".htaccess");
      
      if (existsSync(htaccessPath)) {
        copyFileSync(htaccessPath, distPath);
        console.log("✅ .htaccess copiado para dist/");
      } else {
        console.warn("⚠️  Arquivo .htaccess não encontrado na raiz do projeto");
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), copyHtaccessPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          supabase: ["@supabase/supabase-js"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"],
        },
      },
    },
  },
}));
