<template>
  
    <div title="z-item" class="zui disc" :class="[classes, colors]" :style="styles.main" @click.stop="move"> 
      <div class="z-contentbox label" :style="styles.label" style="overflow: visible;">
        <div class="z-content" style="overflow: visible;">
          <slot></slot>
        </div>
      </div>
    </div>
  
</template>

<script>
import zmixin from '../mixins/zircle-mixin'
export default {
  name: 'z-item',
  mixins: [zmixin],
  props: ['total', 'index', 'layout', 'item'],
  data () {
    return {
      type: 'item'
    }
  },
  computed: {
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
          if (this.layout === 'lineal' && this.index === 1) {
            zwidth = this.state.zircleWidth.l * 2
          } else {
            zwidth = this.state.zircleWidth.s
          }
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
      // se debe pasar el item seleccionado en el campo item
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
          this.store.setAppPos(position)
        }
      } else {
        // no action
      }
    }
  }
}
</script>

