<script>
export default {
  functional: true,
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'zuit',
        css: false,
        tag: 'section'
      },
      on: {
        enter (el, done) {
          var point = document.getElementById('z-point')
          if (context.parent.$zircleStore.state.mode === 'forward') {
            point.style.willChange = 'transform'
            point.style.transform = 'scale(' + context.parent.$zircleStore.state.position.scale + ') translate3d(' + context.parent.$zircleStore.state.position.Xi + 'px, ' + context.parent.$zircleStore.state.position.Yi + 'px, 0px)'
            point.style.transition = 'transform 800ms ease-in-out'
            el.classList.add('currclass')
            // console.log(el)
            done()
          } else {
            el.style.opacity = 1
            done()
          }
        },
        afterEnter (el) {
          var point = document.getElementById('z-point')
          point.style.willChange = ''
        },
        beforeLeave (el) {
          el.classList.remove('currclass')
        },
        leave (el, done) {
          var point = document.getElementById('z-point')
          if (context.parent.$zircleStore.state.mode === 'forward') {
            done()
          } else {
            point.style.willChange = 'transform'
            point.style.transform = 'scale(' + context.parent.$zircleStore.state.position.scale + ') translate3d(' + context.parent.$zircleStore.state.position.Xi + 'px, ' + context.parent.$zircleStore.state.position.Yi + 'px, 0px)'
            point.style.transition = 'transform 800ms ease-in-out'
            el.classList.add('lastclass')
            setTimeout(function () {
              context.parent.$zircleStore.state.lastView = ''
              context.parent.$zircleStore.state.lastViewCache = {}
              done()
            }, 600)
          }
        },
        afterLeave (el) {
          var point = document.getElementById('z-point')
          point.style.willChange = ''
        }
      }
    }
    return createElement('transition-group', data, context.children)
  }
}
</script>
