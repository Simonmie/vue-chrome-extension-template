import { fileURLToPath, URL, pathToFileURL } from 'node:url'
import { mkdirSync, existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import http from 'node:http'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { r, isDev, port } from './src/utils/config'

const loadManifest = async () => {
  const url = pathToFileURL(r('src/manifest.js')).href + `?t=${Date.now()}`
  const mod = await import(url)
  return mod.getManifest || mod.default
}

const generateManifestPlugin = () => {
  return {
    name: 'generate-manifest',
    apply: 'build',
    async buildStart() {
      this.addWatchFile(r('src/manifest.js'))
      const dir = r('extension')
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
      const getM = await loadManifest()
      const m = getM()
      await fs.writeFile(r('extension/manifest.json'), JSON.stringify(m, null, 2))
    },
    async writeBundle() {
      const getM = await loadManifest()
      const m = getM()
      await fs.writeFile(r('extension/manifest.json'), JSON.stringify(m, null, 2))
    },
  }
}

const extensionHmrPlugin = () => {
  let clients = []
  let server
  return {
    name: 'extension-hmr',
    apply: 'build',
    async buildStart() {
      if (!isDev) return
      server = http.createServer((req, res) => {
        if (req.url === '/extension-hmr') {
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          })
          clients.push(res)
          req.on('close', () => {
            clients = clients.filter((c) => c !== res)
          })
          res.write(`data: connected\n\n`)
        } else {
          res.statusCode = 404
          res.end()
        }
      })
      await new Promise((resolve) => server.listen(port, resolve))
    },
    async writeBundle() {
      if (!isDev) return
      clients.forEach((c) => {
        try {
          c.write(`data: reload\n\n`)
        } catch (e) {
          void e
        }
      })
    },
    async closeBundle() {
      if (server) {
        try {
          server.close()
        } catch (e) {
          void e
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [vue(), generateManifestPlugin(), extensionHmrPlugin()],
  base: '/dist/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port,
  },
  define: {
    'globalThis.__EXT_HMR__': JSON.stringify(`http://localhost:${port}/extension-hmr`),
  },
  build: {
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        options: r('src/options/index.html'),
        popup: r('src/popup/index.html'),
        sidepanel: r('src/sidepanel/index.html'),
        ...(isDev
          ? { 'src/background/dev-hmr': r('src/background/dev-hmr.js') }
          : { 'src/background/main': r('src/background/main.js') }),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === 'src/background/dev-hmr') return 'script/dev-hmr.js'
          if (chunk.name === 'src/background/main') return 'script/background.js'
          return 'script/[name]-[hash].js'
        },
        chunkFileNames: 'script/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
