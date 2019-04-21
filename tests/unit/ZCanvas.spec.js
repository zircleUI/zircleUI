import { shallowMount, createLocalVue } from '@vue/test-utils'
import zcanvas from '@/components/z-canvas.vue'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const wrapper = shallowMount(zcanvas, {
  localVue,
  propsData: {
    views: {
      0: { component: 'one' },
      1: { component: 'two' },
      2: { component: 'three' },
      3: { component: 'four' }
    }
  }
})
describe('z-canvas.vue', () => {
  it('Renders css classes: theme, themeMode and AppMode', () => {
    expect(wrapper.find('#z-container').classes()).toContain('theme-black')
    expect(wrapper.find('#z-container').classes()).toContain('mode-dark')
    expect(wrapper.find('#z-container').classes()).toContain('is-full-mode')
    expect(wrapper.find('#z-container').classes()).toContain('circle')
  })
  it('Has the expected html structure', () => {
    // Note: If props.imagesrc and or props.label are present, slots.imagesrc and slots.label wont be rendered
    expect(wrapper.element).toMatchSnapshot()
  })
  it('Defaults theme shape to circle', () => {
    expect(localVue.prototype.$zircle.getThemeShape()).toEqual('circle')
  })
  it('Changes theme shape to square', () => {
    localVue.prototype.$zircle.setThemeShapeToSquare()
    expect(localVue.prototype.$zircle.getThemeShape()).toEqual('square')
  })
  it('Changes theme shape to circle', () => {
    localVue.prototype.$zircle.setThemeShapeToCircle()
    expect(localVue.prototype.$zircle.getThemeShape()).toEqual('circle')
  })
})
