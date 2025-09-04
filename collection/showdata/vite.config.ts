import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // أي طلب يبدأ بـ /api يروح للسيرفر الحقيقي
      '/api': {
        target: 'https://phonician.online', // الدومين فقط
        changeOrigin: true,
        secure: true,
        // إزالة /api من بداية المسار قبل إرساله للسيرفر
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
