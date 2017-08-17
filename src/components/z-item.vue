<template>
   <section title="z-item">
    <div class="zui disc" :class="[classes]" :style="styles.main" @click.stop="move"> 
      <div class="contentbox flow" :style="styles.label">
        <div class="content flow" style="overflow: visible;">
          <slot></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import zmixin from '../mixins/zircle-mixin'
export default {
  name: 'z-item',
  mixins: [zmixin],
  props: ['total', 'index', 'layout', 'id'],
  data () {
    return {
      type: 'item'
    }
  },
  computed: {
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
          fontSize: '11px',
          top: zwidth / 2 + 10 + 'px',
          overflow: 'visible'
        }
      }
    }
  },
  methods: {
    move () {
      if (this.gotoview !== undefined) {
        var go = this.gotoview
        var id = this.id
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
        // this.state.position = position
        // console.log('go: ' + go)
        if (this.state.router === true) {
          this.state.shadowPosition = position
          // this.store.setAppPos(position)
          if (id !== undefined) {
            this.$router.push({name: go, params: {id: id}})
          } else {
            this.$router.push({name: go})
          }
        } else {
          this.store.setAppPos(position)
        }
      } else {
        console.error(' D NO HACE NADA')
      }
    }
  }
}
</script>

<style>

</style>
