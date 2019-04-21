import { shallowMount, createLocalVue } from '@vue/test-utils'
import zspot from '@/components/z-spot.vue'
import zslider from '@/components/child-components/z-slider.vue'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const wrapper = shallowMount(zspot, {
  propsData: {
    slider: true,
    progress: 80,
    imagePath: './images/test.png',
    label: 'Test label prop'
  },
  provide: function () {
    return {
      view: 'test'
    }
  },
  computed: {
    position: function () {
      return { X: 0, Y: 0, scale: 1, Xi: 0, Yi: 0, scalei: 1 }
    }
  },
  slots: {
    default: '<p> lorem text </p>',
    media: '<div>youtube video</div>',
    imagePath: './images/dummy.png',
    label: 'Test label slot',
    extension: '<div></div>'
  },
  stubs: {
    'z-slider': zslider
  },
  localVue
})
describe('z-spot.vue', () => {
  it('Renders props when passed', () => {
    expect(wrapper.vm.imagePath).toEqual('./images/test.png')
    expect(wrapper.vm.label).toEqual('Test label prop')
  })

  it('Has z-slider component and progress 80%', () => {
    expect(wrapper.vm.progress).toEqual(80)
    expect(wrapper.find(zslider).exists()).toBe(true)
  })
  it('Has the expected html structure', () => {
    // Note: If props.imagesrc and or props.label are present, slots.imagesrc and slots.label wont be rendered
    expect(wrapper.element).toMatchSnapshot()
  })
})
