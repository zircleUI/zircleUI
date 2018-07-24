<template>
  <div
    class="z-shape is-extension"
    :class="[componentType, classes]"
    :role="button === true ? 'button' : ''"
    :style="responsive === true ? styles.main : zpos.main"
    @mouseover="spotin"
    @mouseout="spotout"
    @mousedown="pulse"
    @touchstart="pulse"
    @mouseup="move">
      <div v-if="!button" ref="spot" class="z-outer-spot" :style="styles.plate"></div>
      <div class="z-pulse" ref="pulse"></div>
      <z-knob v-if="knob" v-on:rangeVal="extraInfo" :progress='progress' />
      <z-slider v-if="slider === true" :progress='progress'>
      </z-slider>
      <section class="z-label" :class="labelPos" style="" :style="$zircle.getThemeMode() === 'mode-light-filled' ? 'color: var(--accent-text-and-border-color);' : ''" v-if="label || $slots['label']">
        {{label}} <span v-if="progress.pos === 'outside'"> {{progressLabel}}</span>
      </section>
      <div class="z-content">
        <img v-if="imageSrc" :src="imageSrc" width="100%" height="100%" />
        <slot v-if="!imageSrc" name="image"></slot>
      </div>
      <div class="z-content" style="z-index: 10">
        <span class="overflow">
          <span v-if="progress.pos === 'inside' || progress.pos === undefined ">{{progressLabel}}</span>
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
    label: {
      type: [String]
    },
    labelPos: {
      type: [String],
      default: 'bottom'
    },
    imageSrc: {
      type: [String]
    },
    progress: {
      type: [Number, Object],
      default: 0
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
      extrainfo: ''
    }
  },
  computed: {
    position () {
      let component = {
        componentType: this.componentType,
        distance: this.$parent.componentType === 'z-list' ? this.distanceItem : this.distance,
        angle: this.$parent.componentType === 'z-list' ? this.angleItem : this.angle,
        size: this.size,
        $parent: this.$parent
      }
      return this.$zircle.calcPosition(component)
    },
    angleItem () {
      return (360 / this.$zircle.getNumberOfItemsInCurrentPage() * this.index) - 90
    },
    distanceItem () {
      return this.$zircle.getNumberOfItemsInCurrentPage() === 1 ? 0 : 60
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
    styles () {
      var width = this.$zircle.getComponentWidth(this.size)
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
      if (typeof this.progress === 'object' && this.extrainfo !== '') {
        return this.extrainfo + '' + this.progress.unit
      } else {
        return this.extrainfo
      }
    }
  },
  methods: {
    pulse () {
      let pulse = this.$refs.pulse
      pulse.classList.add('pulse-animation')
      pulse.addEventListener('animationend', function () {
        pulse.classList.remove('pulse-animation')
      }, false)
    },
    spotin () {
       if (this.button === false && this.view === this.$zircle.getCurrentViewName() && this.toView) this.$refs.spot.classList.add('spot-animation')
    },
    spotout () {
      if (this.button === false &&  this.view === this.$zircle.getCurrentViewName() && this.toView) this.$refs.spot.classList.remove('spot-animation')
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
    },
    extraInfo (data) {
      this.extrainfo = data
    }
  },
  mounted () {
    this.zpos = this.styles
  }
}
</script>
