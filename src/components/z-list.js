import { HTMLElementBase, emit, isViewDefinition, numberAttribute, reflectNumber, upgradeProperties } from './control-utils.js';
import { normaliseSize } from './sizes.js';

/** A local, paginated collection. Existing spots keep their identity and listeners. */
export class ZList extends HTMLElementBase {
  static observedAttributes = ['per-page', 'page', 'size', 'square'];
  get perPage() { return Math.max(1, Math.floor(numberAttribute(this, 'per-page', 5))); }
  set perPage(value) { reflectNumber(this, 'per-page', value); }
  get page() { return Math.max(1, Math.min(this.pageCount || 1, Math.floor(numberAttribute(this, 'page', 1)))); }
  set page(value) { reflectNumber(this, 'page', value); }
  get pageCount() { return Math.ceil(this._spots().length / this.perPage); }
  get size() { return normaliseSize(this.getAttribute('size'), 'xxl'); }
  set size(value) { this.setAttribute('size', value); }
  get square() { return this.hasAttribute('square'); }
  set square(value) { this.toggleAttribute('square', Boolean(value)); }
  get items() { return this._items?.slice() ?? []; }
  set items(value) {
    if (!Array.isArray(value)) throw new TypeError('z-list.items must be an array.');
    this._items = value.slice();
    this._itemsDirty = true;
    if (this.isConnected && this._pager) this._render();
  }
  get renderItem() { return this._renderItem; }
  set renderItem(value) {
    if (value != null && typeof value !== 'function') throw new TypeError('z-list.renderItem must be a function.');
    this._renderItem = value;
    this._itemsDirty = true;
    if (this.isConnected && this._pager) this._render();
  }

  connectedCallback() {
    if (isViewDefinition(this)) return;
    upgradeProperties(this, ['items', 'renderItem', 'page', 'perPage', 'size', 'square']);
    this.classList.add('z-list', 'gravity-spot');
    if (!this._orbit) {
      this._orbit = this.querySelector(':scope > .z-list-orbit') ?? this.ownerDocument.createElement('div');
      this._orbit.className = 'orbit-12 z-list-orbit';
      this._orbit.style.setProperty('--o-range', '0deg');
      this._pager = this.querySelector(':scope > .z-list-pagination') ?? this.ownerDocument.createElement('nav');
      this._pager.className = 'z-list-pagination orbit-12';
      this._pager.style.setProperty('--o-range', '0deg');
      this._pager.setAttribute('aria-label', 'List pages');
      this.append(this._orbit, this._pager);
    }
    if (!this._listeners) {
      this._listeners = new this.ownerDocument.defaultView.AbortController();
      this._pager.addEventListener('click', event => {
        const button = event.target.closest('button[data-page]');
        if (!button || button.disabled || !this._pager.contains(button)) return;
        event.stopPropagation();
        this.page = Number(button.dataset.page);
      }, { signal: this._listeners.signal });
    }
    this._observer ??= new this.ownerDocument.defaultView.MutationObserver(() => this._render());
    this._render();
  }
  disconnectedCallback() {
    this._observer?.disconnect();
    this._listeners?.abort();
    this._listeners = null;
  }
  attributeChangedCallback() { if (this.isConnected && this._pager) this._render(); }
  next() { this.page += 1; return this.page; }
  previous() { this.page -= 1; return this.page; }

  _spots() {
    const direct = Array.from(this.children).filter(child => child.localName === 'z-spot');
    return this._orbit ? [...this._orbit.children, ...direct].filter(child => child.localName === 'z-spot') : direct;
  }

  _renderItems() {
    if (!this._itemsDirty || !this._items) return;
    // Complete rendering before changing live DOM, so a renderer exception keeps the old collection.
    const nodes = this._items.map((item, index) => {
      const rendered = this._renderItem ? this._renderItem(item, index) :
        (typeof item === 'object' && item !== null ? item.label ?? item.name ?? String(item) : String(item));
      if (rendered?.nodeType === 1 && rendered.localName === 'z-spot') return rendered;
      const spot = this.ownerDocument.createElement('z-spot');
      if (rendered?.nodeType) spot.append(rendered);
      else spot.textContent = rendered == null ? '' : String(rendered);
      return spot;
    });
    for (const node of this._generated ?? []) if (!nodes.includes(node)) node.remove();
    this._generated = nodes;
    this._orbit.append(...nodes);
    this._itemsDirty = false;
  }

  _renderPager(count, page) {
    const first = count > 5 ? Math.max(1, Math.min(page - 2, count - 4)) : 1;
    const pages = Array.from({ length: Math.min(5, count) }, (_, index) => ({
      kind: 'page', page: first + index, text: String(first + index), label: `Page ${first + index}`,
    }));
    if (count > 5) {
      pages.unshift({ kind: 'previous', page: Math.max(1, page - 1), text: '‹', label: 'Previous page', disabled: page === 1 });
      pages.push({ kind: 'next', page: Math.min(count, page + 1), text: '›', label: 'Next page', disabled: page === count });
    }
    const signature = pages.map(item => item.kind === 'page' ? item.page : item.kind).join(',');
    let restoreFocus;
    if (signature !== this._pagerSignature) {
      const active = this.ownerDocument.activeElement;
      if (active?.parentElement === this._pager) restoreFocus = { kind: active.dataset.kind, page: active.dataset.page };
      const fragment = this.ownerDocument.createDocumentFragment();
      for (const item of pages) {
        const button = this.ownerDocument.createElement('button');
        button.className = `z-list-page satellite${item.kind === 'page' ? '' : ` z-list-${item.kind}`}`;
        button.type = 'button';
        fragment.append(button);
      }
      this._pager.replaceChildren(fragment);
      this._pagerSignature = signature;
    }
    this._pager.hidden = count < 2;
    [...this._pager.children].forEach((button, index) => {
      const item = pages[index];
      button.dataset.page = String(item.page);
      button.dataset.kind = item.kind;
      button.textContent = item.text;
      button.setAttribute('aria-label', item.label);
      button.disabled = Boolean(item.disabled);
      // The original page points follow the lower arc, numbered left to right.
      // Orbit owns the polar layout; 22 degrees keeps native hit areas separate.
      button.style.setProperty('--o-offset', `${90 + (pages.length - 1) * 11 - index * 22}deg`);
      button.style.setProperty('--o-from', '0deg');
      button.style.setProperty('--o-angle', '0deg');
      if (item.kind === 'page' && item.page === page) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    if (restoreFocus && count > 1) {
      const buttons = [...this._pager.children];
      const target = buttons.find(button => button.dataset.kind === restoreFocus.kind &&
        (restoreFocus.kind !== 'page' || button.dataset.page === restoreFocus.page)) ??
        buttons.find(button => button.getAttribute('aria-current') === 'page');
      target?.focus({ preventScroll: true });
    }
  }

  _render() {
    if (!this._pager || this._rendering) return;
    this._rendering = true;
    this._observer?.disconnect();
    try {
      this._renderItems();
      for (const child of Array.from(this.children)) if (child.localName === 'z-spot') this._orbit.append(child);
      const spots = this._spots();
      const page = this.page;
      const count = this.pageCount;
      const first = (page - 1) * this.perPage;
      const visible = spots.slice(first, first + this.perPage);
      this._originalDistances ??= new WeakMap();
      this._originalAlignments ??= new WeakMap();
      for (const spot of this._managedSpots ?? []) {
        if (spots.includes(spot)) continue;
        const alignment = this._originalAlignments.get(spot);
        if (alignment) spot.style.setProperty('--o-aligment', alignment);
        else spot.style.removeProperty('--o-aligment');
        spot.classList.remove('at-center');
        spot.hidden = false;
      }
      this._managedSpots = spots;
      spots.forEach(spot => {
        spot.hidden = !visible.includes(spot);
        if (!this._originalDistances.has(spot)) {
          const original = spot.hasAttribute('data-z-list-distance') ? spot.getAttribute('data-z-list-distance') || null : spot.getAttribute('distance');
          this._originalDistances.set(spot, original);
          spot.setAttribute('data-z-list-distance', original ?? '');
        }
        if (!this._originalAlignments.has(spot)) this._originalAlignments.set(spot, spot.style.getPropertyValue('--o-aligment'));
      });
      visible.forEach((spot, index) => {
        spot.setAttribute('angle', String(360 / visible.length * index - 90));
        spot.classList.toggle('at-center', visible.length === 1);
        const distance = visible.length === 1 ? '0' : this._originalDistances.get(spot) ?? '100';
        spot.setAttribute('distance', distance);
        spot.style.setProperty('--o-aligment', `calc(var(--o-radius) * ${1 - Math.max(0, numberAttribute(spot, 'distance', 100)) / 100})`);
      });
      this.style.setProperty('--z-list-size', `var(--z-size-${this.size}, var(--z-size-xxl))`);
      this.classList.toggle('is-square', this.hasAttribute('square'));
      this._renderPager(count, page);
      const previousPage = this._lastPage;
      this._lastPage = page;
      if (this.hasAttribute('page') && this.getAttribute('page') !== String(page)) this.setAttribute('page', String(page));
      if (previousPage !== undefined && previousPage !== page) emit(this, 'pagechange', { page, pageCount: count, previousPage });
    } finally {
      this._rendering = false;
      if (this.isConnected) {
        this._observer?.observe(this, { childList: true });
        this._observer?.observe(this._orbit, { childList: true });
      }
    }
  }
}
