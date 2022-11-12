import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default () => {
  console.log(process.env)
  return defineConfig({
    plugins: [react()],
    base: process.env.BASE_URL,
    build: {
      outDir: 'build/frontend'
    },
    server: {
      proxy: {
        '/api': 'http://localhost:5000'
      }
    }
  })
}
