<template>
  
    <div title="z-item" class="zui disc" :class="[classes, colors]" :style="styles.main" @click.stop="move"> 
      
      <section class="z-content label" :style="styles.label" style="overflow: visible;" >
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
import store from '../store/store'
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
      state: store.state,
      store: store
    }
  },
  computed: {
    position () {
      return this.store.point(this)
    },
    classes () {
      // var colorp = this.color
      return {
        // currclass: this.viewName === this.state.currentView,
        // lastclass: this.viewName === this.state.lastView,
        pastclass: this.type === 'panel' && this.viewName === this.state.pastView,
        prevclass: this.type === 'panel' && this.viewName === this.state.previousView,
        hidden: this.$parent.viewName === this.state.previousView,
        zoom: this.type === 'scale' && this.gotoview !== undefined
      }
    },
    colors () {
      return this.color
    },
    distance () {
      return this.state.pages[this.state.currentPage].length === 1 ? 0 : 60
    },
    gotoviewName () {
      if (this.gotoview !== undefined) {
        return this.gotoview.toLowerCase()
      }
    },
    styles () {
      switch (this.size) {
        case 'large':
          var zwidth = this.state.zircleWidth.l
          break
        case 'medium':
          zwidth = this.state.zircleWidth.m
          break
        case 'small':
          zwidth = this.state.zircleWidth.s
          break
        case 'extrasmall':
          zwidth = this.state.zircleWidth.xs
          break
        case 'xxs':
          zwidth = this.state.zircleWidth.xxs
          break
      }
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
        var item = this.item
        if (item !== undefined) {
          this.state.selectedItem = item
        }
        var position = {
          X: this.position.Xabs,
          Y: this.position.Yabs,
          scale: this.position.scale,
          Xi: this.position.Xi,
          Yi: this.position.Yi,
          scalei: this.position.scalei,
          go: go,
          next: true
        }
        if (this.state.router === true) {
          this.state.shadowPosition = position
          if (item !== undefined) {
            this.$router.push({name: go, params: {id: item}})
          } else {
            this.$router.push({name: go})
          }
        } else {
          this.store.state.mode = 'forward'
          this.store.setAppPos(position)
        }
      } else {
        // no action
      }
    }
  }
}
</script>

