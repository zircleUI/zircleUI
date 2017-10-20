<script>
export default {
  functional: true,
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'zuit',
        css: false
      },
      on: {
        beforeEnter (el) {
          el.style.opacity = 0
        },
        enter (el, done) {
          var point = document.querySelector('#z-point')
          if (context.parent.$zircleStore.state.mode === 'forward') {
            el.style.animation = 'appear .5s forwards'
            // point.style.transformStyle = 'preserve-3d'
            point.style.transform = 'scale(' + context.parent.$zircleStore.state.position.scale + ') translate3d(' + context.parent.$zircleStore.state.position.Xi + 'px, ' + context.parent.$zircleStore.state.position.Yi + 'px, 0px)'
            point.style.transition = 'transform .5s cubic-bezier(1, .04, .94, .93)'
            done()
            //  PREVIOUS VIEW ==>
          } else {
            el.style.opacity = 1
            done()
          }
        },
        leave (el, done) {
          var point = document.querySelector('#z-point')
          if (context.parent.$zircleStore.state.mode === 'forward') {
            done()
          } else {
            // point.style.transformStyle = 'preserve-3d'
            point.style.transform = 'scale(' + context.parent.$zircleStore.state.position.scale + ') translate3d(' + context.parent.$zircleStore.state.position.Xi + 'px, ' + context.parent.$zircleStore.state.position.Yi + 'px, 0px)'
            point.style.transition = 'transform .5s ease-in-out'
            done()
          }
        }
      }
    }
    return createElement('transition', data, context.children)
  }
}
</script> 
<style>
@keyframes appear {
  0% {opacity: 0;}
  80% {opacity: 0;}
  100% {opacity: 1;}
}

</style>

