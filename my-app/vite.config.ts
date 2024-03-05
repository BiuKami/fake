/*
 * @Date: 2024-01-29 16:43:25
 * @LastEditors: BiuKami lijiayong369@gmail.com
 * @LastEditTime: 2024-03-05 14:30:56
 * @FilePath: \new-per\my-app\vite.config.ts
 */
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src') //配置@别名
        }
    },
    server: {
        port: 5001,
        host: 'localhost',
        open: true,
        proxy: {
            '/api': {
                target: 'https://test.beyondedgellc.com', //目标url
                changeOrigin: true, //支持跨域
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
});
