import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'
// import { VitePWA } from 'vite-plugin-pwa'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({ svgrOptions: { icon: true } }),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   devOptions: {
    //     enabled: true, // 开发环境也能看到效果
    //   },
    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         urlPattern:
    //           /^http:\/\/2f7d4220\.r39\.cpolar\.top\/resume\/templates\/getAll\/.*$/,
    //         handler: 'CacheFirst', // CacheFirst 优先使用缓存; StaleWhileRevalidate 每次匹配到接口都会更新缓存，只不过先返回旧的缓存内容，下一次才返回新内容
    //         options: {
    //           cacheName: 'template-cache-v1',
    //           expiration: {
    //             maxEntries: 20,
    //             maxAgeSeconds: 24 * 60 * 60, // 1天
    //           },
    //           cacheableResponse: {
    //             statuses: [200],
    //           },
    //         },
    //       },
    //     ],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
