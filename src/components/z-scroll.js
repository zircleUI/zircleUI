import { RadialControl } from './control-utils.js';

/** Original right-hand quarter-circle scrollbar, from -45 to +45 degrees. */
export class ZScroll extends RadialControl {
  static observedAttributes = ['scroll-val', 'step', 'unit', 'disabled'];
  get controlKind() { return 'scroll'; }
  get min() { return -45; }
  get max() { return 45; }
  get scrollVal() { return this.value; }
  set scrollVal(value) { this.value = value; }
  get valueAttribute() { return 'scroll-val'; }
  get startAngle() { return -45; }
  get angleRange() { return 90; }
  get defaultLabel() { return 'Scroll position'; }
  get eventDetail() { return { value: this.value, scrollVal: this.value }; }
  connectedCallback() {
    this.upgradeProperties(['scrollVal', 'step', 'unit', 'value', 'disabled']);
    super.connectedCallback();
  }
  valueFromPointer(event) {
    const bounds = this.getBoundingClientRect();
    return this.normalize(Math.atan2(event.clientY - bounds.top - bounds.height / 2,
      event.clientX - bounds.left - bounds.width / 2) * 180 / Math.PI);
  }
}
