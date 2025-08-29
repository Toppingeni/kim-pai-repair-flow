import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  optimizeDeps: {
    include: [
      "@mui/x-date-pickers/DatePicker",
      "@mui/x-date-pickers/DateTimePicker",
      "@mui/x-date-pickers/TimePicker",
    ],
  },
  server: {
    host: "::",
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
