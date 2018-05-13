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
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
            point.style.willChange = 'transform'
            point.style.transform = 'scale(' + context.parent.$zircle.getCurrentPosition().scale + ') translate3d(' + context.parent.$zircle.getCurrentPosition().Xi + 'px, ' + context.parent.$zircle.getCurrentPosition().Yi + 'px, 0px)'
            point.style.transition = 'transform 800ms ease-in-out'
            context.parent.$zircle.setNavigationMode('backward')
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
        },
        leave (el, done) {
          var point = document.getElementById('z-point')
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
            done()
          } else {
            point.style.willChange = 'transform'
            point.style.transform = 'scale(' + context.parent.$zircle.getCurrentPosition().scale + ') translate3d(' + context.parent.$zircle.getCurrentPosition().Xi + 'px, ' + context.parent.$zircle.getCurrentPosition().Yi + 'px, 0px)'
            point.style.transition = 'transform 800ms ease-in-out'
            el.classList.add('lastclass')
            setTimeout(function () {
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
