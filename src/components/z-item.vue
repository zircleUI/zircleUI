<template>
  
    <div title="z-item" class="zui disc" :class="[classes, colors]" :style="resize === false ? styles.main : zpos.main" @click.stop="move"> 
      
      <section class="z-content label" :style="resize === false ? styles.label : zpos.label" style="overflow: visible;" >
        <span>{{label}}</span>
      </section>
      
      <div class="z-content">
        <img :src="image" width="100%" height="100%" />
        <section>
          
        </section>
      </div>

    </div>
  
</template>

<script>
export default {
  name: 'z-item',
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    color: {
      default: 'accent'
    },
    label: {
      default: ''
    },
    image: {
      default: ''
    },
    item: {
      default: ''
    },
    id: {
      default: ''
    },
    gotoview: {
      default: 'item'
    },
    angle: {
      type: Number,
      required: true
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
    distance () {
      return this.$zircle.getNumberOfItemsInCurrentPage() === 1 ? 0 : 60
    },
    gotoviewName () {
      if (this.gotoview !== undefined) {
        return this.gotoview.toLowerCase()
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
    if (this.$parent.$parent.$el.classList.contains('prevclass') || this.$parent.$parent.$el.classList.contains('pastclass')) {
    } else {
      this.zpos = this.styles
    }
  },
  updated () {
    this.$nextTick(function () {
      if (this.$parent.$parent.$el.classList.contains('prevclass') || this.$parent.$parent.$el.classList.contains('pastclass')) {
        this.resize = false
      } else {
        this.resize = true
      }
    })
  }
}
</script>

