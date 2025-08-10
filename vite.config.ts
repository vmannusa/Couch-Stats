import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// NOTE: base path set for GitHub Pages; if you rename the repo, change this.
export default defineConfig({
  base: '/Couch-Stats/',
  plugins: [react()],
});
