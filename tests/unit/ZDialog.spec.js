import { shallowMount, createLocalVue } from '@vue/test-utils'
import zdialog from '@/components/z-dialog.vue'
import zslider from '@/components/child-components/z-slider.vue'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const wrapper = shallowMount(zdialog, {
  propsData: {
    selfClose: true
  },
  slots: {
    default: '<p> lorem text </p>',
    extension: '<div></div>'
  },
  stubs: {
    'z-slider': zslider
  },
  localVue
})
describe('z-dialog.vue', () => {
  it('Renders props when passed', () => {
    expect(wrapper.vm.selfClose).toBe(true)
  })

  it('Has z-slider child-component', () => {
    expect(wrapper.find(zslider).exists()).toBe(true)
  })
  it('Has the expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
