import { HTMLElementBase, emit, isViewDefinition, numberAttribute, reflectNumber, upgradeProperties } from './control-utils.js';
import { normaliseSize } from './sizes.js';

/** One original radial pagination point, now a keyboard-accessible button. */
export class ZPagination extends HTMLElementBase {
  static observedAttributes = ['index', 'active', 'angle', 'distance', 'size', 'disabled'];
  get index() { return Math.max(0, Math.floor(numberAttribute(this, 'index', 0))); }
  set index(value) { reflectNumber(this, 'index', value); }
  get active() { return Math.max(0, Math.floor(numberAttribute(this, 'active', 0))); }
  set active(value) { reflectNumber(this, 'active', value); }
  get angle() { return numberAttribute(this, 'angle', 0); }
  set angle(value) { reflectNumber(this, 'angle', value); }
  get distance() { return Math.max(0, numberAttribute(this, 'distance', 100)); }
  set distance(value) { reflectNumber(this, 'distance', value); }
  get size() { return normaliseSize(this.getAttribute('size'), 'xs'); }
  set size(value) { this.setAttribute('size', value); }
  get disabled() { return this.hasAttribute('disabled'); }
  set disabled(value) { this.toggleAttribute('disabled', Boolean(value)); }

  connectedCallback() {
    if (isViewDefinition(this)) return;
    upgradeProperties(this, ['index', 'active', 'angle', 'distance', 'size', 'disabled']);
    if (!this._button) {
      this._button = this.querySelector(':scope > .z-pagination-button') ?? this.ownerDocument.createElement('button');
      this._button.type = 'button';
      this._button.className = 'z-pagination-button';
      this.append(this._button);
    }
    this.classList.add('z-pagination', 'satellite');
    if (!this._listeners) {
      this._listeners = new this.ownerDocument.defaultView.AbortController();
      this._button.addEventListener('click', event => {
        event.stopPropagation();
        if (!this.disabled) emit(this, 'change', { index: this.index, page: this.index + 1 });
      }, { signal: this._listeners.signal });
    }
    this._render();
  }
  disconnectedCallback() { this._listeners?.abort(); this._listeners = null; }
  attributeChangedCallback() { this._render(); }
  _render() {
    if (!this._button) return;
    this._button.textContent = String(this.index + 1);
    this._button.setAttribute('aria-label', `Page ${this.index + 1}`);
    this._button.disabled = this.disabled;
    this._button.toggleAttribute('data-active', this.index === this.active);
    if (this.index === this.active) this._button.setAttribute('aria-current', 'page');
    else this._button.removeAttribute('aria-current');
    this.classList.toggle('active', this.index === this.active);
    this.classList.toggle('deactive', this.index !== this.active);
    this.style.setProperty('--o-from', `${this.angle}deg`);
    this.style.setProperty('--o-offset', '0deg');
    this.style.setProperty('--o-angle', '0deg');
    this.style.setProperty('--z-pagination-distance', String(this.distance / 100));
    this.style.setProperty('--o-aligment', `calc(var(--o-radius) * ${1 - this.distance / 100})`);
    this.style.setProperty('--z-pagination-size', `var(--z-size-${this.size}, var(--z-size-xs))`);
  }
}
