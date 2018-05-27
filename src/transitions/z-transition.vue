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
        leave (el, done) {
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
            done()
          } else {
            var point = document.getElementById('z-point')
            point.style.transform = 'scale(' + context.parent.$zircle.getCurrentPosition().scale + ') translate3d(' + context.parent.$zircle.getCurrentPosition().Xi + 'px, ' + context.parent.$zircle.getCurrentPosition().Yi + 'px, 0px)'
            point.style.transition = 'transform 900ms ease-in'
            el.classList.add('disappear')
            setTimeout(function () {
              done()
            }, 800)
          }
        }
      }
    }
    return createElement('transition-group', data, context.children)
  }
}
</script>
