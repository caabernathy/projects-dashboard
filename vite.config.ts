import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  esbuild: {
    loader: 'tsx',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    tsconfigRaw: require('./tsconfig.app.json'),
  },
});
