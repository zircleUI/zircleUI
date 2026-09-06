import type {
  Zumly,
  GoToOptions,
  ZoomToOptions,
  TransitionOptions,
  InputsOptions,
  RouterOptions,
  ViewContext,
  ViewSource
} from 'zumly'

export { Zumly, ZumlyRouter } from 'zumly'
export type { ViewContext, ViewSource, TransitionOptions, InputsOptions, RouterOptions } from 'zumly'

export type ZircleTheme = 'white' | 'light-blue' | 'black' | 'purple' | 'orange' | 'yellow' | 'blue' | 'green' | 'red' | 'gray'
export type ZircleMode = 'light' | 'light-filled' | 'dark' | 'dark-filled'
export type ZircleShape = 'circle' | 'square'
export type ZircleSize = 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs' | 'extralarge' | 'large' | 'medium' | 'small' | 'extrasmall'
export type LabelPosition = 'top' | 'bottom' | 'left' | 'right'
export type ZircleSlot = 'content' | 'image' | 'media' | 'extension'
export type ViewMap = Record<string, ViewSource>
export type ViewFactory = (context: ViewContext) => string | HTMLElement | void | Promise<string | HTMLElement | void>
export interface ViewTarget { name: string; params?: Record<string, unknown> }

export interface ZircleOptions {
  /** A connected host in document light DOM, with a nonzero size. */
  mount: string | HTMLElement
  views: ViewMap
  /** Defaults to the first registered view. */
  initialView?: string
  theme?: ZircleTheme
  mode?: ZircleMode
  shape?: ZircleShape
  transitions?: TransitionOptions
  inputs?: InputsOptions
  /** Optional shared data passed to view factories. */
  context?: Map<string, unknown> | Record<string, unknown>
  preload?: string[]
  /** Enables Zumly's hash router. Use one routed canvas per page. */
  router?: boolean | RouterOptions
  backButton?: boolean
  backLabel?: string
  label?: string
  debug?: boolean
  /** Cancels pending initialization or destroys the initialized instance when aborted. */
  signal?: AbortSignal
}

/** Declarative canvases manage cancellation through their own connection lifecycle. */
export type ZCanvasOptions = Omit<ZircleOptions, 'mount' | 'views' | 'signal'>

export interface ZircleEventDetails {
  ready: { instance: ZircleInstance }
  viewmount: { view: string; node: HTMLElement }
  viewchange: { view: string | null; depth: number }
  stylechange: { theme: ZircleTheme; mode: ZircleMode; shape: ZircleShape }
  destroy: Record<string, never>
  error: { error: unknown }
}

export interface ZircleInstance {
  readonly app: Zumly
  readonly canvas: HTMLDivElement
  readonly mount: HTMLElement
  getCurrentViewName(): string | null
  getHistory(): string[]
  getHistoryLength(): number
  getTheme(): ZircleTheme
  getMode(): ZircleMode
  getShape(): ZircleShape
  setTheme(theme: ZircleTheme): this
  setMode(mode: ZircleMode): this
  setShape(shape: ZircleShape): this
  setView(target: string | ViewTarget, options?: GoToOptions): Promise<void>
  goTo(name: string, options?: GoToOptions): Promise<void>
  zoomTo(name: string, options?: ZoomToOptions): Promise<void>
  back(): Promise<void>
  goBack(): Promise<void>
  zoomOut(): Promise<void>
  refresh(): void
  /** Handlers receive a CustomEvent; read its detail property for the payload. */
  on<K extends keyof ZircleEventDetails>(type: K, handler: (event: CustomEvent<ZircleEventDetails[K]>) => void): () => void
  /** Idempotent. Disposes engine views, observers, and generated DOM. */
  destroy(): void
}

export function createZircle(options: ZircleOptions): Promise<ZircleInstance>
export default createZircle
/** Called automatically by browser imports; no-op without customElements. */
export function registerElements(): void
export const THEMES: readonly ZircleTheme[]
export const MODES: readonly ZircleMode[]
/** Orbit's runtime, also available directly from @zumer/orbit. */
export const Orbit: {
  refresh(root?: Document | ShadowRoot | Element): void
  resize(parent: string | HTMLElement): () => void
}

export class ZCanvas extends HTMLElement {
  /** Assign before connecting the canvas. Templates and these entries are merged. */
  views: ViewMap | undefined
  /** Assign before connecting the canvas. Attributes override matching options. */
  options: ZCanvasOptions | undefined
  /** Can resolve to null if disconnected while initialization was pending. */
  readonly ready: Promise<ZircleInstance | null>
  readonly instance: ZircleInstance | null
  init(): Promise<ZircleInstance | null>
  setView(target: string | ViewTarget, options?: GoToOptions): Promise<void>
  back(): Promise<void>
  destroy(): void
}

declare class ZSurface extends HTMLElement {
  size: ZircleSize
  distance: number
  angle: number
  circle: boolean
  square: boolean
  label: string
  labelPos: LabelPosition | ''
  imagePath: string
  toView: string
  button: boolean
  disabled: boolean
  slider: boolean
  progress: number
  knob: boolean
  qty: number
  unit: string
  min: number
  max: number
  step: number
  pos: 'inside' | 'outside' | ''
  readonly contentElement: HTMLElement | null
  refresh(): this
}

export class ZView extends ZSurface {}
export class ZSpot extends ZSurface {}

export interface PageChangeDetail { page: number; previousPage: number; pageCount: number }
export type ItemRenderer<T = unknown> = (item: T, index: number) => Node | string | number | null | undefined
export class ZList<T = unknown> extends HTMLElement {
  perPage: number
  /** One-based page index. */
  page: number
  readonly pageCount: number
  size: ZircleSize
  square: boolean
  items: T[]
  renderItem: ItemRenderer<T> | undefined
  next(): number
  previous(): number
}

export type DialogCloseReason = 'api' | 'button' | 'escape' | 'form' | 'backdrop' | 'attribute' | 'timeout' | (string & {})
export interface DialogCloseDetail { returnValue: string; reason: DialogCloseReason }
export class ZDialog extends HTMLElement {
  open: boolean
  visible: boolean
  /** Milliseconds; self-close defaults to 10,000. Zero disables the timer. */
  duration: number
  selfClose: boolean
  size: ZircleSize
  square: boolean
  circle: boolean
  imagePath: string
  readonly returnValue: string
  show(): this
  close(returnValue?: string, reason?: DialogCloseReason): this
}

export interface KnobDetail { value: number; qty: number }
export interface ScrollDetail { value: number; scrollVal: number }
export class ZKnob extends HTMLElement {
  qty: number
  value: number
  min: number
  max: number
  step: number
  unit: string
  disabled: boolean
}
/** Original name for a read-only progress ring. */
export class ZSlider extends HTMLElement {
  progress: number
  value: number
  unit: string
}
export class ZScroll extends HTMLElement {
  scrollVal: number
  value: number
  readonly min: number
  readonly max: number
  step: number
  unit: string
  disabled: boolean
}
export class ZPagination extends HTMLElement {
  /** Zero-based index for this individual point; ZList pages are one-based. */
  index: number
  active: number
  angle: number
  distance: number
  size: ZircleSize
  disabled: boolean
}

/** Attribute types for adapters. These do not add a dependency on any JSX runtime. */
export type BooleanAttribute = boolean | ''
export type NumericAttribute = number | `${number}`
export interface ZSurfaceAttributes {
  size?: ZircleSize
  distance?: NumericAttribute
  angle?: NumericAttribute
  circle?: BooleanAttribute
  square?: BooleanAttribute
  label?: string | number
  'label-pos'?: LabelPosition
  'image-path'?: string
  'to-view'?: string
  button?: BooleanAttribute
  disabled?: BooleanAttribute
  slider?: BooleanAttribute
  progress?: NumericAttribute
  knob?: BooleanAttribute
  qty?: NumericAttribute
  unit?: string
  min?: NumericAttribute
  max?: NumericAttribute
  step?: NumericAttribute
  pos?: 'inside' | 'outside'
  slot?: ZircleSlot
}
export interface ZCanvasAttributes {
  'initial-view'?: string
  theme?: ZircleTheme
  mode?: ZircleMode
  shape?: ZircleShape
  router?: BooleanAttribute
}
export interface ZListAttributes {
  'per-page'?: NumericAttribute
  page?: NumericAttribute
  size?: ZircleSize
  square?: BooleanAttribute
  slot?: ZircleSlot
}
export interface ZDialogAttributes {
  open?: BooleanAttribute
  visible?: BooleanAttribute
  'self-close'?: BooleanAttribute
  duration?: NumericAttribute
  size?: ZircleSize
  circle?: BooleanAttribute
  square?: BooleanAttribute
  'image-path'?: string
  slot?: ZircleSlot
}

declare global {
  interface HTMLElementTagNameMap {
    'z-canvas': ZCanvas
    'z-view': ZView
    'z-spot': ZSpot
    'z-list': ZList
    'z-dialog': ZDialog
    'z-knob': ZKnob
    'z-slider': ZSlider
    'z-scroll': ZScroll
    'z-pagination': ZPagination
  }
}
