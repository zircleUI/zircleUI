import { createServer } from 'node:http'
import { readFile, realpath, stat } from 'node:fs/promises'
import { extname, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

// A read-only development server. No uploads, capture endpoints, or mutations.
const root = await realpath(fileURLToPath(new URL('../', import.meta.url)))
const args = process.argv.slice(2)
const portFlag = args.find(arg => arg.startsWith('--port='))?.slice(7)
const portIndex = args.indexOf('--port')
const requestedPort = portFlag ?? (portIndex >= 0 ? args[portIndex + 1] : undefined) ?? process.env.PORT ?? 8080
const port = Number(requestedPort)
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('PORT must be an integer from 0 to 65535.')
const host = process.env.HOST || '127.0.0.1'
const publicDirectories = new Set(['public', 'src', 'dist', 'tests', 'examples', 'assets'])
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
}

function isInsideRoot(path) {
  const offset = relative(root, path)
  return offset !== '..' && !offset.startsWith(`..${sep}`) && !offset.startsWith(sep)
}

async function resolveFile(path) {
  try {
    const canonical = await realpath(path)
    if (!isInsideRoot(canonical)) return null
    const parts = relative(root, canonical).split(sep)
    if (parts.some(part => part.startsWith('.')) || !publicDirectories.has(parts[0])) return null
    const info = await stat(canonical)
    return info.isFile() ? { path: canonical, size: info.size } : null
  } catch (error) {
    if (['ENOENT', 'ENOTDIR', 'EACCES', 'ELOOP'].includes(error.code)) return null
    throw error
  }
}

const server = createServer(async (request, response) => {
  const send = (status, message, headers = {}) => {
    response.writeHead(status, {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      ...headers
    })
    response.end(request.method === 'HEAD' ? undefined : message)
  }

  if (!['GET', 'HEAD'].includes(request.method)) {
    send(405, 'Method not allowed', { allow: 'GET, HEAD' })
    return
  }

  let pathname
  try {
    pathname = decodeURIComponent((request.url || '/').split('?')[0])
  } catch {
    send(400, 'Malformed URL')
    return
  }

  if (!pathname.startsWith('/') || /[\\\0]/.test(pathname) || pathname.split('/').some(part => part.startsWith('.'))) {
    send(403, 'Forbidden')
    return
  }

  try {
    const entry = pathname === '/' ? 'public/index.html' : pathname.slice(1)
    const segments = entry.split('/')
    let file = publicDirectories.has(segments[0]) ? await resolveFile(resolve(root, entry)) : null
    // Original demo assets can also be addressed as /sun.png, /earth.png, etc.
    if (!file) file = await resolveFile(resolve(root, 'public', entry))
    if (!file) {
      send(404, 'Not found')
      return
    }

    const body = request.method === 'HEAD' ? undefined : await readFile(file.path)
    response.writeHead(200, {
      'content-type': mime[extname(file.path).toLowerCase()] || 'application/octet-stream',
      'content-length': file.size,
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    })
    response.end(body)
  } catch (error) {
    console.error('[zircle dev]', error)
    send(500, 'Internal server error')
  }
})

server.on('error', error => {
  console.error(`[zircle dev] ${error.message}`)
  process.exitCode = 1
})
server.listen(port, host, () => {
  if (process.env.QUIET !== '1') console.log(`Zircle demo: http://${host}:${server.address().port}`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => server.close(() => process.exit(0)))
}
