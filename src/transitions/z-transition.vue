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
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
            var point = document.getElementById('z-point')
            point.style.transform = 'scale(' + context.parent.$zircle.getCurrentPosition().scale + ') translate3d(' + context.parent.$zircle.getCurrentPosition().Xi + 'px, ' + context.parent.$zircle.getCurrentPosition().Yi + 'px, 0px)'
            point.style.transition = 'transform 900ms ease-in'
            el.style.animation = 'appear 800ms linear forwards'
            done()
          } else {
            done()
          }
        },
        afterEnter (el) {
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
            context.parent.$zircle.setNavigationMode('')
          } else {
          }
        },
        beforeLeave (el) {
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
          } else {
            var point = document.getElementById('z-point')
            point.style.transform = 'scale(' + context.parent.$zircle.getCurrentPosition().scale + ') translate3d(' + context.parent.$zircle.getCurrentPosition().Xi + 'px, ' + context.parent.$zircle.getCurrentPosition().Yi + 'px, 0px)'
            point.style.transition = 'transform 900ms ease-in'
          }
        },
        leave (el, done) {
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
            done()
          } else {
            el.style.animation = 'disappear 900ms 200ms linear forwards'
            setTimeout(function () {
              context.parent.$zircle.setLog('end')
              done()
            }, 1100)
          }
        }
      }
    }
    return createElement('transition-group', data, context.children)
  }
}
</script>
