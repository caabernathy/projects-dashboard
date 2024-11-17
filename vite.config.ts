import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/projects-dashboard/',
  esbuild: {
    loader: 'tsx',
    tsconfigRaw: require('./tsconfig.app.json'),
  },
});
