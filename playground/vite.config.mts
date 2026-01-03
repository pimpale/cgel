import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Import directly from source for live updates
      '@pimpale/cgel': path.resolve(__dirname, '../src'),
    },
  }
});
