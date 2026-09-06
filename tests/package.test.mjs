import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'

test('package imports without browser globals and exports original component family', async () => {
  for (const entry of ['../dist/zircle.js', '../dist/zircle.standalone.js']) {
    const module = await import(entry)
    for (const name of ['createZircle', 'registerElements', 'ZCanvas', 'ZView', 'ZSpot', 'ZList', 'ZDialog', 'ZKnob', 'ZSlider', 'ZScroll', 'ZPagination']) assert.equal(typeof module[name], 'function', name)
    await assert.rejects(module.createZircle(), /browser/)
  }
})

test('package contains complete browser artifacts, types and only the two runtime engines', async () => {
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url)))
  assert.deepEqual(Object.keys(pkg.dependencies).sort(), ['@zumer/orbit', 'zumly'])
  const pack = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { encoding: 'utf8' }))[0]
  const files = new Set(pack.files.map(file => file.path))
  for (const path of ['dist/zircle.js', 'dist/zircle.standalone.js', 'dist/zircle.iife.js', 'dist/zircle.css', 'index.d.ts', 'LICENSE']) assert.ok(files.has(path), path)
  const css = await readFile(new URL('../dist/zircle.css', import.meta.url), 'utf8')
  assert.ok(css.includes('.satellite') && css.includes('.zumly-canvas') && css.includes('.z-surface'))
  assert.ok(!css.includes('fonts.googleapis.com'))
})
