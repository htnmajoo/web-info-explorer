
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Local server configuration for Puppeteer usage
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Allow external connections for local network access
    port: 3000,
    cors: true,
    proxy: {
      // Proxy API calls to avoid CORS issues
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    // Optimize for local server deployment
    target: 'node14',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configure for Node.js environment
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['puppeteer-extra', 'puppeteer-extra-plugin-stealth']
  }
}));
