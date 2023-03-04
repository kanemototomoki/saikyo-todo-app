import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
    outDir: './pages'
  },
  plugins: [tsconfigPaths(), react()]
})
