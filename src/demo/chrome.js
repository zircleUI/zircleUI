/**
 * Demo chrome — title/subtitle update each time Zumly enters a new view.
 * The text is derived from the view name (e.g. "d-spot" → "z-spot").
 */
export function bindChrome (canvas) {
  const root = document.querySelector('.zircle-chrome')
  if (!root) return
  const elTitle = root.querySelector('.title')
  const elSub   = root.querySelector('.subtitle')
  const elFoot  = root.querySelector('.footer')
  const elVer   = root.querySelector('.version')

  fetch('/package.json').then(r => r.ok ? r.json() : null)
    .then(p => p && (elVer.textContent = `v${p.version}`))
    .catch(() => {})

  const TEXTS = {
    home:         { title: 'Component showcase', subtitle: 'click a satellite to inspect each &lt;z-*&gt; element', footer: 'zircle 2.x · built on Orbit + Zumly' },
    'd-spot':     { title: '&lt;z-spot&gt;',     subtitle: 'sizes · shapes · button · image', footer: 'click ◁ to go back' },
    'd-list':     { title: '&lt;z-list&gt;',     subtitle: 'paginated radial collection',     footer: 'click ◁ to go back' },
    'd-knob':     { title: '&lt;z-knob&gt;',     subtitle: 'click upper / lower · wheel · arrows', footer: 'click ◁ to go back' },
    'd-slider':   { title: '&lt;z-slider&gt;',   subtitle: 'circular progress bar', footer: 'click ◁ to go back' },
    'd-scroll':   { title: '&lt;z-scroll&gt;',   subtitle: 'long content with thin indicator', footer: 'click ◁ to go back' },
    'd-pagination':{title: '&lt;z-pagination&gt;', subtitle: 'standalone page dots', footer: 'click ◁ to go back' },
    'd-dialog':   { title: '&lt;z-dialog&gt;',   subtitle: 'modal overlay · plain or self-closing', footer: 'click ◁ to go back' },
    'd-menu':     { title: '&lt;z-menu&gt;',     subtitle: 'radial pie menu', footer: 'click ◁ to go back' },
    'd-gauge':    { title: '&lt;z-gauge&gt;',    subtitle: 'speedometer · click ± to change', footer: 'click ◁ to go back' },
    'd-compass':  { title: '&lt;z-compass&gt;',  subtitle: 'cardinal compass · ◀ ▶ to rotate', footer: 'click ◁ to go back' },
    'd-tabs':     { title: '&lt;z-tabs&gt;',     subtitle: 'lateral navigation between siblings', footer: 'click ◁ to go back' },
    'd-tabs-b':   { title: '&lt;z-tabs&gt;',     subtitle: 'lateral navigation between siblings', footer: 'click ◁ to go back' },
    'd-tabs-c':   { title: '&lt;z-tabs&gt;',     subtitle: 'lateral navigation between siblings', footer: 'click ◁ to go back' },
    'd-solar':    { title: 'Solar system',       subtitle: 'classic zircle 1.x demo · zoom into the planets', footer: 'click ◁ to go back' },
    'd-sun':      { title: 'Sun',                subtitle: '', footer: 'click ◁ to go back' },
    'd-earth':    { title: 'Earth',              subtitle: '', footer: 'click ◁ to go back' },
    'd-moon':     { title: 'Moon',               subtitle: '', footer: 'click ◁ to go back' }
  }

  function apply (name) {
    const t = TEXTS[name] || { title: name || '', subtitle: '', footer: '' }
    elTitle.innerHTML = t.title
    elSub.innerHTML   = t.subtitle
    elFoot.innerHTML  = t.footer
    elTitle.classList.toggle('home', name === 'home')
    elTitle.style.display = elTitle.textContent ? '' : 'none'
    elSub.style.display   = elSub.textContent   ? '' : 'none'
    elFoot.style.display  = elFoot.textContent  ? '' : 'none'
  }

  const refresh = () => apply(canvas.getCurrentViewName())
  canvas.app.on('afterZoomIn',  refresh)
  canvas.app.on('afterZoomOut', refresh)
  canvas.app.on('afterLateral', refresh)
  refresh()
}
