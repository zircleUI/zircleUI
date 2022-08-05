<template>
  <div
    class="z-shape is-extension"
    :class="[componentType, shape, classes]"
    :role="button === true ? 'button' : ''"
    :style="responsive === true ? styles.main : zpos.main"
    @mouseover="spotin"
    @mouseout="spotout"
    @mousedown="pulse"
    @touchstart="pulse"
    @mouseup="move"
    @click="$emit('click', $event)">
      <div v-if="!button" ref="spot" class="z-outer-spot" :class="[shape]" :style="styles.plate"></div>
      <div class="z-pulse" :class="[shape]" ref="pulse"></div>
      <z-knob v-if="knobEnabled" :qty="computedQty" :unit="unit" :min="min" :max="max" />
      <z-slider v-if="sliderEnabled" :progress='progress' />
      <div class="z-label" :class="[shape,labelPos]" :style="$zircle.getThemeMode() === 'mode-light-filled' ? 'color: var(--accent-text-and-border-color);' : ''" v-if="label">
        <div class="inside">
        {{label}} <span v-if="pos === 'outside'"> {{progressLabel}}</span>
        </div>
      </div>
      <div class="z-content" :class="[shape]" >
        <img v-if="imagePath" :src="imagePath" width="100%" height="100%" alt="content custom image"/>
        <slot v-if="!imagePath" name="image"></slot>
      </div>
      <div class="z-content" :class="[shape]"  style="z-index: 10">
        <span class="overflow">
          <span v-if="pos === 'inside' || pos === undefined ">{{progressLabel}}</span>
          <slot></slot>
        </span>
      </div>
      <slot name="extension"></slot>
  </div>
</template>

<script>
import ZSlider from './child-components/z-slider'
import ZKnob from './child-components/z-knob'
export default {
  name: 'z-spot',
  props: {
    distance: {
      type: Number,
      default: 100
    },
    angle: {
      type: Number,
      default: 0
    },
    index: {
      type: Number
    },
    size: {
      type: String,
      default: 'medium'
    },
    circle: {
      type: [Boolean],
      default: false
    },
    square: {
      type: [Boolean],
      default: false
    },
    label: {
      type: [String, Number]
    },
    labelPos: {
      type: [String],
      default: 'bottom'
    },
    imagePath: {
      type: [String]
    },
    progress: {
      type: [Number, Object],
      default: 0
    },
    qty: {
      type: [Number],
      default: 0
    },
    unit: {
      type: [String]
    },
    min: {
      type: [Number],
      default: 0
    },
    max: {
      type: [Number],
      default: 100
    },
    pos: {
      type: [String]
    },
    slider: {
      type: [Boolean],
      default: false
    },
    button: {
      type: [Boolean],
      default: false
    },
    knob: {
      type: [Boolean],
      default: false
    },
    toView: {
      type: [String, Object]
    }
  },
  inject: ['view'],
  components: {
    ZSlider,
    ZKnob
  },
  data () {
    return {
      componentType: this.$options.name,
      zpos: {},
      innerpos: {},
      extrainfo: '',
      val: 0
    }
  },
  computed: {
    position () {
      const component = {
        componentType: this.componentType,
        distance: this.$parent.componentType === 'z-list' ? this.distanceItem : this.distance,
        angle: this.$parent.componentType === 'z-list' ? this.angleItem : this.angle,
        size: this.size,
        $parent: this.$parent,
        shape: this.$zircle.getThemeShape()
      }
      return this.$zircle.calcPosition(component)
    },
    angleItem () {
      return (360 / this.$zircle.getNumberOfItemsInCurrentPage() * this.index) - 90
    },
    distanceItem () {
      return this.$zircle.getNumberOfItemsInCurrentPage() === 1 ? 0 : this.distance
    },
    responsive () {
      if (this.view === this.$zircle.getCurrentViewName()) {
        // eslint-disable-next-line
        this.zpos = this.styles
        return true
      } else {
        return false
      }
    },
    shape () {
      if (this.circle) {
        return 'is-circle'
      } else if (this.square) {
        return 'is-square'
      } else {
        return 'is-circle'
      }
    },
    sliderEnabled () {
      return this.slider === true && this.shape === 'is-circle'
    },
    knobEnabled () {
      return this.knob === true && this.shape === 'is-circle'
    },
    styles () {
      const width = this.$zircle.getComponentWidth(this.size)
      return {
        main: {
          width: width + 'px',
          height: width + 'px',
          margin: -(width / 2) + 'px 0 0 ' + -(width / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        },
        plate: {
          width: width + 15 + 'px',
          height: width + 15 + 'px',
          margin: -((width + 15) / 2) + 'px 0 0 ' + -((width + 15) / 2) + 'px'
        }
      }
    },
    classes () {
      return {
        'z-zoom-in-cursor': this.componentType === 'z-spot' && this.toView !== undefined,
        primary: this.$parent.componentType !== 'z-list',
        accent: this.$parent.componentType === 'z-list'
      }
    },
    progressLabel () {
      if (this.computedQty) {
        let unit = ''
        unit = this.unit ? this.unit : ''
        return this.qty + '' + unit
      }
      return ''
    },
    computedQty: {
      get: function () {
        return this.qty
      },
      set: function (newValue) {
        // this.val = newValue
        this.$emit('update:qty', newValue)
      }
    }
  },
  methods: {
    pulse () {
      const pulse = this.$refs.pulse
      pulse.classList.add('pulse-animation')
      pulse.addEventListener('animationend', function () {
        pulse.classList.remove('pulse-animation')
      }, false)
    },
    spotin () {
      if (this.button === false && this.view === this.$zircle.getCurrentViewName() && this.toView) this.$refs.spot.classList.add('spot-animation')
    },
    spotout () {
      if (this.button === false && this.view === this.$zircle.getCurrentViewName() && this.toView) this.$refs.spot.classList.remove('spot-animation')
    },
    move () {
      if (this.toView) {
        this.$zircle.setView(this.toView, {
          position: {
            X: this.position.Xabs,
            Y: this.position.Yabs,
            scale: this.position.scale,
            Xi: this.position.Xi,
            Yi: this.position.Yi,
            scalei: this.position.scalei
          }
        })
      }
    }
  },
  mounted () {
    this.zpos = this.styles
  }
}
</script>
