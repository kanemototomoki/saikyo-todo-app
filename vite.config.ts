import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
    outDir: './pages'
  },
  plugins: [
    tsconfigPaths(),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, './functions') + '/[!.]*',
          dest: './functions/'
        }
      ]
    })
  ]
})
