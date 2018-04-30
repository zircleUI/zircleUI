<template>
    <div 
      title="z-item"
      class="zui disc"
      :class="[classes, colors]"
      :style="resize === false ? styles.main : zpos.main"
      @click.stop="move"> 
      <section 
        class="z-content label"
        :style="resize === false ? styles.label : zpos.label"
        style="overflow: visible;">
        <slot name="item-label">
          {{label}} 
        </slot>
      </section>
      <div class="z-content">
        <slot name="item-img">
          <img :src="image" width="100%" height="100%" />
        </slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'z-list-item',
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    index: {
      type: Number,
      required: true
    },
    color: {
      default: 'accent'
    },
    label: {
      type: [String, Number]
    },
    image: {
      type: [String, Number]
    },
    item: {
      default: ''
    },
    id: {
      type: [String, Number],
      default: ''
    },
    gotoview: {
      type: [String, Number],
      default: 'item'
    }
  },
  data () {
    return {
      type: 'item',
      resize: false,
      zpos: {}
    }
  },
  computed: {
    angle () {
      return (360 / this.$zircle.getNumberOfItemsInCurrentPage() * this.index) - 90
    },
    distance () {
      return this.$zircle.getNumberOfItemsInCurrentPage() === 1 ? 0 : 60
    },
    position () {
      return this.$zircle.calcPosition(this)
    },
    classes () {
      return {
        zoom: this.type === 'scale' && this.gotoview !== undefined
      }
    },
    colors () {
      return this.color
    },
    gotoviewName () {
      if (this.gotoview !== undefined) {
        return this.gotoview.split('/')[0]
      }
    },
    gotoId () {
      if (this.gotoview !== undefined) {
        return this.gotoview.split('/')[1]
      }
    },
    styles () {
      var zwidth = this.$zircle.getComponentWidth(this.size)
      return {
        main: {
          width: zwidth + 'px',
          height: zwidth + 'px',
          margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        },
        label: {
          top: zwidth / 2 + 10 + 'px'
        }
      }
    }
  },
  methods: {
    move () {
      if (this.gotoview !== undefined) {
        var go = this.gotoviewName
        console.log(go, this.gotoId)
        var position = {
          X: this.position.Xabs,
          Y: this.position.Yabs,
          scale: this.position.scale,
          Xi: this.position.Xi,
          Yi: this.position.Yi,
          scalei: this.position.scalei,
          go: go,
          itemID: this.id,
          item: this.item
        }
        if (this.$zircle.getHistoryLength() < 6) {
          this.$zircle.setNavigationMode('forward')
          this.$zircle.setAppPos(position)
        } else {
          console.log('Max level of deep reached')
        }
      }
    }
  },
  mounted () {
    var zwidth = this.$zircle.getComponentWidth(this.size)
    this.zpos = {
      main: {
        width: zwidth + 'px',
        height: zwidth + 'px',
        margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
        transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
      },
      label: {
        top: zwidth / 2 + 10 + 'px'
      }
    }
  },
  beforeUpdate () {
    if (this.$parent.$parent.view.toLowerCase() === this.$zircle.getCurrentViewName()) {
      this.zpos = this.styles
    }
  },
  updated () {
    var vm = this
    this.$nextTick(function () {
      if (vm.$parent.$parent.view.toLowerCase() === vm.$zircle.getCurrentViewName()) {
        vm.resize = false
      } else {
        vm.resize = true
      }
    })
  }
}
</script>

