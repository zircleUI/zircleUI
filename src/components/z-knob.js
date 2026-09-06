import { RadialControl, numberAttribute, reflectNumber } from './control-utils.js';

/** Circular numeric input, starting at the east point as in original Zircle. */
export class ZKnob extends RadialControl {
  static observedAttributes = ['qty', 'min', 'max', 'step', 'unit', 'disabled'];
  get controlKind() { return 'knob'; }
  get min() { return numberAttribute(this, 'min', 0); }
  set min(value) { reflectNumber(this, 'min', value); }
  get max() { return Math.max(this.min, numberAttribute(this, 'max', 100)); }
  set max(value) { reflectNumber(this, 'max', value); }
  get qty() { return this.value; }
  set qty(value) { this.value = value; }
  get valueAttribute() { return 'qty'; }
  get startAngle() { return 0; }
  get angleRange() { return 360; }
  get defaultLabel() { return 'Value'; }
  get eventDetail() { return { value: this.value, qty: this.value }; }
  connectedCallback() {
    this.upgradeProperties(['qty', 'min', 'max', 'step', 'unit', 'value', 'disabled']);
    super.connectedCallback();
  }
}
