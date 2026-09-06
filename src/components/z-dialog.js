import { HTMLElementBase, emit, isViewDefinition, numberAttribute, reflectNumber, upgradeProperties } from './control-utils.js';
import { normaliseSize } from './sizes.js';

/** Circular modal content with native focus management and optional self close. */
export class ZDialog extends HTMLElementBase {
  static observedAttributes = ['open', 'visible', 'duration', 'self-close', 'size', 'square', 'circle', 'image-path', 'aria-label', 'aria-labelledby', 'aria-describedby'];
  get open() { return this.hasAttribute('open') || this.hasAttribute('visible'); }
  set open(value) { if (value) this.show(); else this.close(); }
  get visible() { return this.open; }
  set visible(value) { this.open = value; }
  get duration() { return Math.max(0, numberAttribute(this, 'duration', this.selfClose ? 10000 : 0)); }
  set duration(value) { reflectNumber(this, 'duration', value); }
  get selfClose() { return this.hasAttribute('self-close'); }
  set selfClose(value) { this.toggleAttribute('self-close', Boolean(value)); }
  get size() { return normaliseSize(this.getAttribute('size'), 'xxl'); }
  set size(value) { this.setAttribute('size', value); }
  get square() { return this.hasAttribute('square'); }
  set square(value) { this.toggleAttribute('square', Boolean(value)); }
  get circle() { return this.hasAttribute('circle'); }
  set circle(value) { this.toggleAttribute('circle', Boolean(value)); }
  get imagePath() { return this.getAttribute('image-path') ?? ''; }
  set imagePath(value) { if (value) this.setAttribute('image-path', value); else this.removeAttribute('image-path'); }
  get returnValue() { return this._panel?.returnValue ?? ''; }

  connectedCallback() {
    if (isViewDefinition(this)) return;
    upgradeProperties(this, ['open', 'visible', 'duration', 'selfClose', 'size', 'imagePath', 'square', 'circle']);
    this.classList.add('z-dialog');
    if (!this._panel) this._build();
    if (!this._listeners) {
      this._listeners = new this.ownerDocument.defaultView.AbortController();
      const options = { signal: this._listeners.signal };
      this._closeButton.addEventListener('click', () => this.close('', 'button'), options);
      this._panel.addEventListener('cancel', event => {
        event.preventDefault();
        if (emit(this, 'cancel', {}, { cancelable: true })) this.close('', 'escape');
      }, options);
      this._panel.addEventListener('close', () => {
        if (this._visible && !this._panel.open) this.close(this._panel.returnValue, 'form');
      }, options);
      this._panel.addEventListener('click', event => {
        event.stopPropagation();
        if (event.target !== this._panel) return;
        const rect = this._panel.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) this.close('', 'backdrop');
      }, options);
      this._panel.addEventListener('keydown', event => this._fallbackKeys(event), options);
      this._content.addEventListener('scroll', () => this._measureScroll(), { ...options, passive: true });
      this._scroll.addEventListener('input', event => {
        event.stopPropagation();
        const span = this._content.scrollHeight - this._content.clientHeight;
        if (span > 0) this._content.scrollTop = (event.detail.scrollVal + 45) / 90 * span;
      }, options);
    }
    this._observer ??= new this.ownerDocument.defaultView.MutationObserver(() => this._adoptContent());
    const Resize = this.ownerDocument.defaultView.ResizeObserver;
    if (Resize) this._resize ??= new Resize(() => this._measureScroll());
    this._adoptContent();
    this._observer.observe(this, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['slot'] });
    this._render();
  }

  disconnectedCallback() {
    this._stopTimer();
    this._observer?.disconnect();
    this._resize?.disconnect();
    this._listeners?.abort();
    this._listeners = null;
    if (this._panel?.open) this._panel.close?.();
    this._panel?.removeAttribute('open');
    this._visible = false;
    this._restoreFocus();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this._panel || this._syncing) return;
    this._render();
    if (this._visible && (name === 'duration' || name === 'self-close')) this._startTimer();
  }

  show() {
    this.hidden = false;
    this.setAttribute('open', '');
    if (this.isConnected) this._render();
    return this;
  }

  close(returnValue = '', reason = 'api') {
    const wasOpen = this._visible;
    this._syncing = true;
    this.removeAttribute('open');
    this.removeAttribute('visible');
    this._syncing = false;
    this._stopTimer();
    this._visible = false;
    if (this._panel) {
      this._panel.returnValue = String(returnValue);
      if (this._panel.open && typeof this._panel.close === 'function') this._panel.close(String(returnValue));
      this._panel.removeAttribute('open');
    }
    this._restoreFocus();
    if (wasOpen) emit(this, 'close', { returnValue: String(returnValue), reason });
    return this;
  }

  _build() {
    const document = this.ownerDocument;
    this._panel = this.querySelector(':scope > .z-dialog-panel') ?? document.createElement('dialog');
    this._panel.className = 'z-dialog-panel';
    this._image = this._panel.querySelector(':scope > img.z-dialog-image');
    this._closeButton = this._panel.querySelector(':scope > .z-dialog-close') ?? document.createElement('button');
    this._closeButton.type = 'button';
    this._closeButton.className = 'z-dialog-close';
    this._closeButton.setAttribute('aria-label', 'Close dialog');
    this._closeButton.textContent = '×';
    this._content = this._panel.querySelector(':scope > .z-dialog-content') ?? document.createElement('div');
    this._content.className = 'z-dialog-content';
    this._progress = this._panel.querySelector(':scope > .z-dialog-progress') ?? document.createElement('z-slider');
    this._progress.className = 'z-dialog-progress';
    this._progress.setAttribute('aria-label', 'Time until dialog closes');
    this._progress.setAttribute('aria-hidden', 'true');
    this._scroll = this._panel.querySelector(':scope > .z-dialog-scroll') ?? document.createElement('z-scroll');
    this._scroll.className = 'z-dialog-scroll';
    this._scroll.setAttribute('aria-label', 'Scroll dialog content');
    this._scroll.hidden = true;
    this._imageSlot = this._panel.querySelector(':scope > .z-dialog-image-slot') ?? document.createElement('div');
    this._imageSlot.className = 'z-dialog-image-slot';
    this._media = this._panel.querySelector(':scope > .z-dialog-media') ?? document.createElement('div');
    this._media.className = 'z-dialog-media';
    this._extensions = this._panel.querySelector(':scope > .z-dialog-extensions') ?? document.createElement('div');
    this._extensions.className = 'z-dialog-extensions';
    this._panel.append(this._imageSlot, this._content, this._media, this._extensions, this._progress, this._scroll, this._closeButton);
    this.append(this._panel);
  }

  _adoptContent() {
    const nodes = [...this.childNodes, ...this._content.childNodes, ...this._imageSlot.childNodes, ...this._media.childNodes, ...this._extensions.childNodes];
    for (const child of nodes) {
      if (child === this._panel) continue;
      const slot = child.nodeType === 1 ? child.getAttribute('slot') : null;
      const target = slot === 'image' ? this._imageSlot : slot === 'media' ? this._media : slot === 'extension' ? this._extensions : this._content;
      if (child.parentNode !== target) target.append(child);
    }
    this._imageSlot.hidden = !this._imageSlot.childNodes.length || Boolean(this.imagePath);
    this._media.hidden = !this._media.childNodes.length;
    this._extensions.hidden = !this._extensions.childNodes.length;
    this._resize?.disconnect();
    if (this.isConnected) {
      this._resize?.observe(this._content);
      for (const child of this._content.children) this._resize?.observe(child);
    }
    this._measureScroll();
  }

  _render() {
    if (!this._panel) return;
    this.style.setProperty('--z-dialog-size', `var(--z-size-${this.size}, var(--z-size-xxl))`);
    this._panel.classList.toggle('is-square', this.hasAttribute('square'));
    this._panel.classList.toggle('is-circle', !this.hasAttribute('square'));
    for (const name of ['aria-label', 'aria-labelledby', 'aria-describedby']) {
      if (this.hasAttribute(name)) this._panel.setAttribute(name, this.getAttribute(name));
      else this._panel.removeAttribute(name);
    }
    if (!this._panel.hasAttribute('aria-label') && !this._panel.hasAttribute('aria-labelledby')) this._panel.setAttribute('aria-label', 'Dialog');
    if (this.imagePath) {
      if (!this._image) {
        this._image = this.ownerDocument.createElement('img');
        this._image.className = 'z-dialog-image';
        this._image.alt = '';
        this._panel.prepend(this._image);
      }
      this._image.src = this.imagePath;
    } else if (this._image) { this._image.remove(); this._image = null; }
    this._imageSlot.hidden = !this._imageSlot.childNodes.length || Boolean(this.imagePath);
    this._progress.hidden = this.duration === 0;
    if (!this.isConnected) return;
    if (this.open && !this._visible) {
      this._returnFocus = this.ownerDocument.activeElement;
      this.hidden = false;
      this._visible = true;
      this._panel.returnValue = '';
      if (typeof this._panel.showModal === 'function') {
        this._panel.removeAttribute('open');
        this._panel.showModal();
      }
      else {
        this._panel.setAttribute('open', '');
        this._panel.setAttribute('role', 'dialog');
        this._panel.setAttribute('aria-modal', 'true');
        this._closeButton.focus();
      }
      this._startTimer();
      this._measureScroll();
      emit(this, 'open', {});
    } else if (!this.open && this._visible) this.close('', 'attribute');
  }

  _measureScroll() {
    if (!this._scroll) return;
    const span = this._content.scrollHeight - this._content.clientHeight;
    this._scroll.hidden = !this._visible || span < 2 || this.hasAttribute('square');
    this._scroll.scrollVal = span > 0 ? -45 + this._content.scrollTop / span * 90 : -45;
  }

  _startTimer() {
    this._stopTimer();
    if (!this.duration || !this._visible) return;
    const window = this.ownerDocument.defaultView;
    const duration = this.duration;
    const start = window.performance.now();
    this._progress.progress = 0;
    const tick = () => {
      const elapsed = window.performance.now() - start;
      this._progress.progress = Math.min(100, elapsed / duration * 100);
      if (this._visible && elapsed < duration) this._timerFrame = window.requestAnimationFrame(tick);
    };
    this._timerFrame = window.requestAnimationFrame(tick);
    this._timer = window.setTimeout(() => {
      this._progress.progress = 100;
      this.close('', 'timeout');
      emit(this, 'done', { reason: 'timeout' });
    }, duration);
  }

  _stopTimer() {
    const window = this.ownerDocument.defaultView;
    window.clearTimeout(this._timer);
    window.cancelAnimationFrame(this._timerFrame);
    this._timer = this._timerFrame = null;
  }

  _restoreFocus() {
    if (this._returnFocus?.isConnected && typeof this._returnFocus.focus === 'function') this._returnFocus.focus({ preventScroll: true });
    this._returnFocus = null;
  }

  _fallbackKeys(event) {
    if (typeof this._panel.showModal === 'function') return;
    if (event.key === 'Escape') {
      event.preventDefault();
      if (emit(this, 'cancel', {}, { cancelable: true })) this.close('', 'escape');
    }
    if (event.key !== 'Tab') return;
    const focusable = [...this._panel.querySelectorAll('a[href],button,input,select,textarea,[tabindex]')]
      .filter(element => !element.disabled && element.tabIndex >= 0 && !element.hidden && element.getClientRects().length);
    const first = focusable[0] ?? this._closeButton;
    const last = focusable.at(-1) ?? this._closeButton;
    if (event.shiftKey && this.ownerDocument.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && this.ownerDocument.activeElement === last) { event.preventDefault(); first.focus(); }
  }
}
