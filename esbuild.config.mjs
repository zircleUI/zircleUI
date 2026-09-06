import { build } from 'esbuild'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))
await mkdir(new URL('./dist/', import.meta.url), { recursive: true })
const licenseSources = [
  ['Zircle', './LICENSE'],
  ['Orbit 1.5.0', './node_modules/@zumer/orbit/LICENSE'],
  ['Zumly 0.97.0', './node_modules/zumly/LICENSE']
]
const licenses = await Promise.all(licenseSources.map(async ([name, path]) =>
  `${name}\n${'='.repeat(name.length)}\n\n${await readFile(new URL(path, import.meta.url), 'utf8')}`
))
await writeFile(new URL('./dist/LICENSES.txt', import.meta.url), licenses.join('\n\n'))
const notice = '/*! Zircle, Orbit, and Zumly are MIT licensed. See LICENSES.txt for copyright and permission notices. */'

const shared = {
  absWorkingDir: root,
  bundle: true,
  sourcemap: true,
  target: ['es2022'],
  legalComments: 'linked',
  banner: { js: notice, css: notice },
  logLevel: 'warning'
}

await Promise.all([
  build({
    ...shared,
    entryPoints: ['src/zircle.js'],
    format: 'esm',
    external: ['@zumer/orbit', 'zumly'],
    outfile: 'dist/zircle.js'
  }),
  build({
    ...shared,
    entryPoints: ['src/zircle.js'],
    format: 'esm',
    outfile: 'dist/zircle.standalone.js'
  }),
  build({
    ...shared,
    entryPoints: ['src/zircle.js'],
    format: 'iife',
    globalName: 'Zircle',
    minify: true,
    outfile: 'dist/zircle.iife.js'
  }),
  build({
    ...shared,
    stdin: {
      contents: '@import "@zumer/orbit/style";\n@import "zumly/style.css";\n@import "./src/styles/zircle.css";',
      loader: 'css',
      resolveDir: root,
      sourcefile: 'zircle-combined.css'
    },
    outfile: 'dist/zircle.css'
  }),
  build({
    ...shared,
    entryPoints: ['src/styles/zircle.css'],
    outfile: 'dist/zircle.components.css'
  })
])

console.log('Built ESM, standalone ESM, browser global, and combined/component CSS in dist/.')
