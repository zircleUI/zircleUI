import { ZSurface } from './surface.js'

/** A spot is an Orbit satellite, with optional Zumly navigation. */
export class ZSpot extends ZSurface {
  get defaultSize () { return 'm' }
  get surfaceType () { return 'spot' }
}
