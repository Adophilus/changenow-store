import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': 'http://localhost:5000'
      }
    }
  })
}
