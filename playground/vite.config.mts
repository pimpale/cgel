import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Import directly from source for live updates
      '@pimpale/cgel': path.resolve(__dirname, '../src'),
      // Allow importing test cases from the tests folder
      '@cgel-tests': path.resolve(__dirname, '../tests'),
    },
  },
  server: {
    fs: {
      // Allow serving files from parent directory (for test cases)
      allow: ['..'],
    },
  },
});
