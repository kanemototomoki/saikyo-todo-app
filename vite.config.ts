import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'
import { VitePluginFonts } from 'vite-plugin-fonts'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`
      }
    },
    {}
  )

  return {
    define: envWithProcessPrefix,
    build: {
      minify: true,
      outDir: './pages'
    },
    plugins: [
      tsconfigPaths(),
      react(),
      svgr(),
      VitePluginFonts({
        google: {
          families: ['Fjalla One']
        }
      })
    ]
  }
})
