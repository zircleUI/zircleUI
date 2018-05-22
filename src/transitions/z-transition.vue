<script>
export default {
  functional: true,
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'zuit',
        css: false,
        tag: 'section',
        type: 'animation'
      },
      on: {
        beforeEnter (el) {
          // console.log(document.styleSheets[0])
          // document.styleSheets[0].insertRule('.have-border { border: 1px solid black;}', 0)
          // document.styleSheets[0].deleteRule(0)
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
          } else {
          }
        },
        enter (el, done) {
          var point = document.getElementById('z-point')
          // var container = document.getElementById('z-p')
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
            // container.style.transformOrigin = context.parent.$zircle.getCurrentPosition().X + 'px ' + context.parent.$zircle.getCurrentPosition().Y + 'px'
            // point.style.transformOrigin = context.parent.$zircle.getCurrentPosition().X + 'px ' + context.parent.$zircle.getCurrentPosition().Y + 'px'
            // container.style.transform = ''
            point.style.transform = 'scale(' + context.parent.$zircle.getCurrentPosition().scale + ') translate3d(' + context.parent.$zircle.getCurrentPosition().Xi + 'px, ' + context.parent.$zircle.getCurrentPosition().Yi + 'px, 0px)'
            // container.style.transition = 'transform 800ms linear'
            point.style.transition = 'transform 900ms ease-in'
            done()
          } else {
            done()
          }
        },
        afterEnter (el) {
          // var container = document.getElementById('z-p')
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
            context.parent.$zircle.setNavigationMode('')
          } else {
          }
        },
        beforeLeave (el) {
        },
        leave (el, done) {
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
            done()
          } else {
            var point = document.getElementById('z-point')
            // var container = document.getElementById('z-p')
            // container.style.transformOrigin = context.parent.$zircle.getLastPosition().X + 'px ' + context.parent.$zircle.getLastPosition().Y + 'px'
            // container.style.transform = 'scale(' + context.parent.$zircle.getCurrentPosition().scale + ')'
            point.style.transform = 'scale(' + context.parent.$zircle.getCurrentPosition().scale + ') translate3d(' + context.parent.$zircle.getCurrentPosition().Xi + 'px, ' + context.parent.$zircle.getCurrentPosition().Yi + 'px, 0px)'
            // container.style.transition = 'transform 800ms linear'
            point.style.transition = 'transform 1000ms ease-in'
            el.classList.add('disappear')
            setTimeout(function () {
              done()
            }, 800)
          }
        },
        afterLeave (el) {
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
          } else {
          }
        }
      }
    }
    return createElement('transition-group', data, context.children)
  }
}
</script>
