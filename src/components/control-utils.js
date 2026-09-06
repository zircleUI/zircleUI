export const HTMLElementBase = globalThis.HTMLElement ?? class {};

// Orbit 1.5 draws a full stroke circle as one SVG arc at 359.999999deg.
// Browsers round those nearly identical endpoints together and can shift the
// circle by a radius. A .01deg gap keeps the endpoints distinct; rounded
// strokes close the imperceptible gap. Partial arcs retain their exact range.
export const FULL_RING_RANGE = '359.99deg';

export function isViewDefinition(element) {
  const view = element.closest('z-view');
  return view?.hasAttribute('name') && !view.hasAttribute('data-view-name') && view.parentElement?.localName === 'z-canvas';
}

export function numberAttribute(element, name, fallback) {
  const raw = element.getAttribute(name);
  const value = raw === null || raw.trim() === '' ? NaN : Number(raw);
  return Number.isFinite(value) ? value : fallback;
}

export function reflectNumber(element, name, value) {
  if (value === null || value === undefined) element.removeAttribute(name);
  else if (Number.isFinite(Number(value))) element.setAttribute(name, String(value));
}

export function emit(element, type, detail, options = {}) {
  return element.dispatchEvent(new element.ownerDocument.defaultView.CustomEvent(type,
    { bubbles: true, composed: true, detail, ...options }));
}

export function upgradeProperties(element, names) {
  for (const name of names) {
    if (!Object.prototype.hasOwnProperty.call(element, name)) continue;
    const value = element[name];
    delete element[name];
    element[name] = value;
  }
}

export function createRing(element, withHandle = false) {
  const document = element.ownerDocument;
  element.classList.add('gravity-spot');
  const orbit = Array.from(element.children).find(node => node.classList.contains('z-control-orbit')) ?? document.createElement('div');
  orbit.className = 'orbit-12 z-control-orbit';
  orbit.setAttribute('aria-hidden', 'true');
  const progress = orbit.querySelector('o-progress') ?? document.createElement('o-progress');
  progress.className = 'z-control-progress';
  progress.setAttribute('variant', 'stroke');
  progress.setAttribute('max', '100');
  orbit.append(progress);
  let handle;
  if (withHandle) {
    handle = orbit.querySelector('.z-control-handle') ?? document.createElement('span');
    handle.className = 'satellite z-control-handle';
    handle.style.setProperty('--o-from', '0deg');
    handle.style.setProperty('--o-angle', '0deg');
    orbit.append(handle);
  }
  element.append(orbit);
  return { orbit, progress, handle };
}

/** Shared input behavior; Orbit owns the radial drawing and handle layout. */
export class RadialControl extends HTMLElementBase {
  get step() { const value = numberAttribute(this, 'step', 1); return value > 0 ? value : 1; }
  set step(value) { reflectNumber(this, 'step', value); }
  get unit() { return this.getAttribute('unit') ?? ''; }
  set unit(value) { this.setAttribute('unit', value ?? ''); }
  get disabled() { return this.hasAttribute('disabled'); }
  set disabled(value) { this.toggleAttribute('disabled', Boolean(value)); }
  get value() { return this.normalize(numberAttribute(this, this.valueAttribute, this.min)); }
  set value(value) { reflectNumber(this, this.valueAttribute, this.normalize(Number(value))); }

  normalize(value) {
    if (!Number.isFinite(value)) return this.min;
    const bounded = Math.min(this.max, Math.max(this.min, value));
    const stepped = this.min + Math.round((bounded - this.min) / this.step) * this.step;
    return Math.min(this.max, Math.max(this.min, Number(stepped.toFixed(10))));
  }

  upgradeProperties(names) { upgradeProperties(this, names); }

  connectedCallback() {
    if (isViewDefinition(this)) return;
    if (this._listeners) return;
    this._ring ??= createRing(this, true);
    this._ring.progress.toggleAttribute('interactive', this.controlKind === 'scroll');
    if (this.controlKind === 'knob' && !this._valueLabel) {
      this._valueLabel = this.querySelector(':scope > .z-knob-value') ?? this.ownerDocument.createElement('span');
      this._valueLabel.className = 'z-knob-value';
      this._valueLabel.setAttribute('aria-hidden', 'true');
      this._numberLabel = this._valueLabel.querySelector('.z-knob-number') ?? this.ownerDocument.createElement('span');
      this._numberLabel.className = 'z-knob-number';
      this._unitLabel = this._valueLabel.querySelector('.z-knob-unit') ?? this.ownerDocument.createElement('span');
      this._unitLabel.className = 'z-knob-unit';
      this._valueLabel.append(this._numberLabel, this._unitLabel);
      this.append(this._valueLabel);
    }
    this.classList.add(`z-${this.controlKind}`);
    this.setAttribute('role', 'slider');
    if (!this.hasAttribute('aria-label') && !this.hasAttribute('aria-labelledby')) this.setAttribute('aria-label', this.defaultLabel);
    this._listeners = new this.ownerDocument.defaultView.AbortController();
    const options = { signal: this._listeners.signal };
    this.addEventListener('keydown', event => this._onKey(event), options);
    this.addEventListener('pointerdown', event => this._onPointerDown(event), options);
    this.ownerDocument.addEventListener('pointermove', event => this._onPointerMove(event), options);
    this.ownerDocument.addEventListener('pointerup', event => this._onPointerEnd(event), options);
    this.ownerDocument.addEventListener('pointercancel', event => this._onPointerEnd(event), options);
    this.addEventListener('click', event => event.stopPropagation(), options);
    this._render();
  }

  disconnectedCallback() {
    this._releasePointer();
    this._listeners?.abort();
    this._listeners = null;
  }

  attributeChangedCallback() { this._render(); }

  _render() {
    if (!this._ring) return;
    const span = this.max - this.min;
    const progress = span ? (this.value - this.min) / span * 100 : 0;
    const angle = this.startAngle + progress / 100 * this.angleRange;
    this.style.setProperty(`--z-${this.controlKind}-angle`, `${angle}deg`);
    this._ring.progress.setAttribute('value', String(this.controlKind === 'scroll' ? 100 : progress));
    this._ring.progress.style.setProperty('--o-range', this.angleRange === 360 ? FULL_RING_RANGE : `${this.angleRange}deg`);
    this._ring.progress.style.setProperty('--o-from', `${this.startAngle + 90}deg`);
    this._ring.handle.style.setProperty('--o-offset', `${angle}deg`);
    if (this._valueLabel) {
      this._numberLabel.textContent = String(this.value);
      this._unitLabel.textContent = this.unit;
      this._unitLabel.hidden = !this.unit;
    }
    this.setAttribute('aria-valuemin', String(this.min));
    this.setAttribute('aria-valuemax', String(this.max));
    this.setAttribute('aria-valuenow', String(this.value));
    this.setAttribute('aria-valuetext', `${this.value}${this.unit ? ` ${this.unit}` : ''}`);
    this.setAttribute('aria-disabled', String(this.disabled));
    if (this.disabled) {
      if (this.tabIndex >= 0) this._enabledTabIndex = this.tabIndex;
      this.tabIndex = -1;
      this._releasePointer();
    } else if (!this.hasAttribute('tabindex') || this.tabIndex === -1) this.tabIndex = this._enabledTabIndex ?? 0;
  }

  valueFromPointer(event) {
    const bounds = this.getBoundingClientRect();
    const angle = (Math.atan2(event.clientY - bounds.top - bounds.height / 2,
      event.clientX - bounds.left - bounds.width / 2) * 180 / Math.PI + 360) % 360;
    return this.min + angle / 360 * (this.max - this.min);
  }

  _input(value) {
    const previous = this.value;
    this.value = value;
    if (this.value === previous) return false;
    emit(this, 'input', this.eventDetail);
    return true;
  }

  _onKey(event) {
    if (this.disabled || event.altKey || event.ctrlKey || event.metaKey) return;
    const values = {
      ArrowUp: this.value + this.step, ArrowRight: this.value + this.step,
      ArrowDown: this.value - this.step, ArrowLeft: this.value - this.step,
      PageUp: this.value + this.step * 10, PageDown: this.value - this.step * 10,
      Home: this.min, End: this.max,
    };
    if (!(event.key in values)) return;
    event.preventDefault();
    event.stopPropagation();
    if (this._input(values[event.key])) emit(this, 'change', this.eventDetail);
  }

  _onPointerDown(event) {
    if (this.disabled || event.button !== 0 || this._pointerId !== undefined) return;
    event.preventDefault();
    event.stopPropagation();
    this.focus({ preventScroll: true });
    this._pointerId = event.pointerId;
    this._pointerStart = this.value;
    try { this.setPointerCapture(event.pointerId); } catch { /* Synthetic pointers have no capture. */ }
    this._input(this.valueFromPointer(event));
  }

  _onPointerMove(event) {
    if (this._pointerId === undefined || event.pointerId !== this._pointerId) return;
    event.preventDefault();
    this._input(this.valueFromPointer(event));
  }

  _onPointerEnd(event) {
    if (this._pointerId === undefined || event.pointerId !== this._pointerId) return;
    const changed = this.value !== this._pointerStart;
    this._releasePointer();
    if (changed) emit(this, 'change', this.eventDetail);
  }

  _releasePointer() {
    if (this._pointerId === undefined) return;
    try { this.releasePointerCapture(this._pointerId); } catch { /* Already released or synthetic. */ }
    this._pointerId = undefined;
  }
}
