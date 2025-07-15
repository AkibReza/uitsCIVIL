import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/uitsCIVIL/', // Match your GitHub repo name exactly
});