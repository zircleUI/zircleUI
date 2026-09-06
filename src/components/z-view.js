import { ZSurface } from './surface.js'

/** A view is a real DOM surface; Zumly owns its position and navigation state. */
export class ZView extends ZSurface {
  get defaultSize () { return 'xxl' }
  get surfaceType () { return 'view' }
}
