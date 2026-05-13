/**
 * Minimal static dev server for the zircle demo.
 * Serves the repo root so /public/index.html can reach /src/* via relative URLs.
 */
import { createServer } from 'node:http'
import { readFile, stat, writeFile, mkdir } from 'node:fs/promises'
import { extname, join, resolve, relative, sep, dirname } from 'node:path'

const PORT = Number(process.env.PORT) || 8080
const ROOT = resolve(process.cwd())
const ENTRY = '/public/index.html'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico':  'image/x-icon',
  '.map':  'application/json'
}

const LOG = process.env.QUIET !== '1'

createServer(async (req, res) => {
  const t0 = Date.now()
  let status = 200
  try {
    let urlPath = decodeURIComponent(req.url.split('?')[0])
    if (urlPath === '/') urlPath = ENTRY

    // Endpoint for the in-page error overlay to forward client errors.
    if (req.method === 'POST' && urlPath === '/__client_log__') {
      let body = ''
      for await (const chunk of req) body += chunk
      console.error('[browser]', body)
      res.writeHead(204); res.end(); return
    }

    // Save raw DOM HTML for an element. Headers x-snap-name = filename.
    if (req.method === 'POST' && urlPath === '/__dom__') {
      const name = (req.headers['x-snap-name'] || `dom-${Date.now()}`)
        .toString().replace(/[^a-z0-9._-]/gi, '_')
      const out = resolve(ROOT, 'snapshots', `${name}.html`)
      await mkdir(dirname(out), { recursive: true })
      const chunks = []
      for await (const chunk of req) chunks.push(chunk)
      await writeFile(out, Buffer.concat(chunks))
      console.log(`  📄 saved snapshots/${name}.html`)
      res.writeHead(204); res.end(); return
    }

    // Endpoint for snapDOM captures. POST a PNG blob, get it stored on disk.
    // Header `x-snap-name` (or query ?name=…) sets the filename.
    if (req.method === 'POST' && urlPath === '/__snap__') {
      const name = (req.headers['x-snap-name'] || new URL(req.url, 'http://x').searchParams.get('name') || `snap-${Date.now()}`)
        .toString().replace(/[^a-z0-9._-]/gi, '_')
      const out = resolve(ROOT, 'snapshots', `${name}.png`)
      await mkdir(dirname(out), { recursive: true })
      const chunks = []
      for await (const chunk of req) chunks.push(chunk)
      await writeFile(out, Buffer.concat(chunks))
      console.log(`  📸 saved snapshots/${name}.png (${Buffer.concat(chunks).length} bytes)`)
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ ok: true, name, path: `snapshots/${name}.png` }))
      return
    }

    let filePath = resolve(join(ROOT, urlPath))
    if (relative(ROOT, filePath).startsWith('..' + sep)) {
      status = 403; res.writeHead(403); return res.end('forbidden')
    }
    let s = await stat(filePath).catch(() => null)
    // Fallback: try /public/<urlPath> so demo assets like /sun.png also work.
    if (!s || !s.isFile()) {
      const fallback = resolve(join(ROOT, 'public', urlPath))
      if (!relative(ROOT, fallback).startsWith('..' + sep)) {
        const s2 = await stat(fallback).catch(() => null)
        if (s2 && s2.isFile()) { filePath = fallback; s = s2 }
      }
    }
    if (!s || !s.isFile()) {
      status = 404
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      return res.end(`404 ${urlPath}`)
    }
    const body = await readFile(filePath)
    res.writeHead(200, {
      'content-type': MIME[extname(filePath).toLowerCase()] || 'application/octet-stream',
      'cache-control': 'no-store'
    })
    res.end(body)
  } catch (err) {
    status = 500
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
    res.end(String(err))
  } finally {
    if (LOG) {
      const dt = Date.now() - t0
      const mark = status >= 400 ? '✗' : '·'
      console.log(`${mark} ${status} ${req.method} ${req.url} ${dt}ms`)
    }
  }
}).listen(PORT, () => {
  console.log(`zircle demo → http://localhost:${PORT}${ENTRY}`)
})
