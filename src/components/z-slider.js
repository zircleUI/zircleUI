import { HTMLElementBase, FULL_RING_RANGE, createRing, isViewDefinition, numberAttribute, reflectNumber, upgradeProperties } from './control-utils.js';

/** Read-only progress ring, matching original z-slider (not a numeric input). */
export class ZSlider extends HTMLElementBase {
  static observedAttributes = ['progress', 'unit'];
  get progress() { return Math.max(0, Math.min(100, numberAttribute(this, 'progress', 0))); }
  set progress(value) { reflectNumber(this, 'progress', value); }
  get value() { return this.progress; }
  set value(value) { this.progress = value; }
  get unit() { return this.getAttribute('unit') ?? '%'; }
  set unit(value) { this.setAttribute('unit', value ?? ''); }
  connectedCallback() {
    if (isViewDefinition(this)) return;
    upgradeProperties(this, ['progress', 'value', 'unit']);
    this._ring ??= createRing(this);
    this.classList.add('z-slider');
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', '100');
    if (!this.hasAttribute('aria-label') && !this.hasAttribute('aria-labelledby')) this.setAttribute('aria-label', 'Progress');
    this._render();
  }
  attributeChangedCallback() { this._render(); }
  _render() {
    if (!this._ring) return;
    this._ring.progress.setAttribute('value', String(this.progress));
    this._ring.progress.style.setProperty('--o-range', FULL_RING_RANGE);
    this._ring.progress.style.setProperty('--o-from', '0deg');
    this.setAttribute('aria-valuenow', String(this.progress));
    this.setAttribute('aria-valuetext', `${this.progress}${this.unit}`);
  }
}
