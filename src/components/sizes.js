/** The seven original sizes, using the original desktop proportions. */
export const SIZE_RATIOS = Object.freeze({
  xxl: 1, xl: 260 / 420, l: 160 / 420, m: 100 / 420,
  s: 62 / 420, xs: 38 / 420, xxs: 16 / 420
})
export const SIZES = Object.freeze(Object.keys(SIZE_RATIOS))
const aliases = Object.freeze({
  extralarge: 'xl', large: 'l', medium: 'm', small: 's', extrasmall: 'xs'
})

export function normaliseSize (value, fallback = 'm') {
  const key = String(value ?? '').trim().toLowerCase()
  const size = aliases[key] || key
  return SIZES.includes(size) ? size : (SIZES.includes(fallback) ? fallback : 'm')
}

export function sizeVariable (value, fallback = 'm') {
  return `var(--z-size-${normaliseSize(value, fallback)})`
}
