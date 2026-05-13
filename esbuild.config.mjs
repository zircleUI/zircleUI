import { build } from 'esbuild'
import { copyFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

if (!existsSync('dist')) await mkdir('dist', { recursive: true })

await build({
  entryPoints: ['src/zircle.js'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/zircle.js',
  external: ['zumly', '@zumer/orbit'],
  sourcemap: true,
  target: ['es2022']
})

await build({
  entryPoints: ['src/zircle.js'],
  bundle: true,
  format: 'iife',
  globalName: 'Zircle',
  outfile: 'dist/zircle.iife.js',
  external: ['zumly', '@zumer/orbit'],
  sourcemap: true,
  minify: true,
  target: ['es2022']
})

await copyFile('src/styles/zircle.css', 'dist/zircle.css')

console.log('built → dist/zircle.{js,iife.js,css}')
