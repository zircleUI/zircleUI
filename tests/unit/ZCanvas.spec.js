import { shallowMount, createLocalVue } from '@vue/test-utils'
import zcanvas from '@/components/z-canvas.vue'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const wrapper = shallowMount(zcanvas, {
  localVue
})
describe('z-canvas.vue', () => {
  it('Renders class theme, color and AppMode', () => {
    expect(wrapper.find('#z-container').classes()).toContain('theme--dark')
    expect(wrapper.find('#z-container').classes()).toContain('color--blue')
    expect(wrapper.find('#z-container').classes()).toContain('full')
  })
  it('Has the expected html structure', () => {
    // Note: If props.imagesrc and or props.label are present, slots.imagesrc and slots.label wont be rendered
    expect(wrapper.element).toMatchSnapshot()
  })
})
