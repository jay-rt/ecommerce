import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      "/api": {
        target: "https://ecommerce-api-l9w0.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
