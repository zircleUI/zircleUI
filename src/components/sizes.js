/**
 * Size scale shared by every zircle component.
 *
 * RADIUS  → used by z-view (how big the shape is, in vmin)
 * DIAMETER→ used by z-spot (how big each spot is, in vmin)
 *
 * Numbers are in vmin so the UI scales naturally with the viewport.
 */
export const VIEW_RADIUS_VMIN = {
  xxl: 45, xl: 35, l: 27, m: 20, s: 14, xs: 9, xxs: 5
}
export const SPOT_DIAMETER_VMIN = {
  xxl: 32, xl: 24, l: 18, m: 12, s: 9, xs: 6, xxs: 4
}

const aliases = {
  extralarge: 'xl', large: 'l',
  medium: 'm', small: 's', extrasmall: 'xs'
}

export function normaliseSize (raw, fallback = 'm') {
  if (!raw) return fallback
  const k = String(raw).toLowerCase()
  return aliases[k] || k
}

export function viewRadius (size) {
  return VIEW_RADIUS_VMIN[normaliseSize(size, 'xxl')] ?? VIEW_RADIUS_VMIN.xxl
}

export function spotDiameter (size) {
  return SPOT_DIAMETER_VMIN[normaliseSize(size, 'm')] ?? SPOT_DIAMETER_VMIN.m
}

/**
 * Compute polar offset (in vmin) from `orbit` (1-12) and `angle` (deg).
 * The orbit number is interpreted as a ring index relative to the parent radius:
 * orbit 6 → exactly on the parent's perimeter, orbit < 6 inside, orbit > 6 outside.
 */
export function polarOffset ({ parentRadiusVmin, orbit = 0, angle = 0 }) {
  const r = (Number(orbit) / 6) * parentRadiusVmin
  const a = (Number(angle) * Math.PI) / 180
  return { x: Math.cos(a) * r, y: Math.sin(a) * r }
}

export const SIZES = Object.keys(VIEW_RADIUS_VMIN)
