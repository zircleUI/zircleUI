import { shallowMount, createLocalVue } from '@vue/test-utils'
import zalert from '@/components/z-alert.vue'
import zslider from '@/components/z-slider.vue'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const wrapper = shallowMount(zalert, {
  propsData: {
    slider: true,
    color: 'success'
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
describe('z-alert.vue', () => {
  it('Renders props when passed', () => {
    expect(wrapper.vm.color).toEqual('success')
  })

  it('Has z-slider component', () => {
    expect(wrapper.find(zslider).exists()).toBe(true)
  })
  it('Has the expected html structure', () => {
    // Note: If props.imagesrc and or props.label are present, slots.imagesrc and slots.label wont be rendered
    expect(wrapper.element).toMatchSnapshot()
  })
})
