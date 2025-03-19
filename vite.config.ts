import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cinephiliac-react/',
  plugins: [react(), viteTsconfigPaths()],
  server: {
    port: 3000,
  },
});
