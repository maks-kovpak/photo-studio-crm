import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const httpsTarget =
    env.VITE_ASPNETCORE_HTTPS_PORT && `https://localhost:${env.VITE_ASPNETCORE_HTTPS_PORT}`;
  const urlTarget = env.VITE_ASPNETCORE_URLS && env.VITE_ASPNETCORE_URLS.split(';')[0];
  const target = httpsTarget ?? urlTarget ?? 'http://localhost:34239';

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT),
      proxy: {
        '/api': {
          target: target,
          secure: false,
          headers: {
            Connection: 'Keep-Alive',
          },
        },
      },
    },
  };
});
