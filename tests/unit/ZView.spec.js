import { shallowMount, createLocalVue } from '@vue/test-utils'
import zview from '@/components/z-view.vue'
import zscroll from '@/components/child-components/z-scroll.vue'
import zslider from '@/components/child-components/z-slider.vue'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const wrapper = shallowMount(zview, {
  propsData: {
    slider: true,
    progress: 80,
    imagePath: './images/test.png',
    label: 'Test label prop'
  },
  beforeCreate () {
    this.$zircle.setView('search')
  },
  computed: {
    position: function () {
      return { X: 0, Y: 0, scale: 1, Xi: 0, Yi: 0, scalei: 1 }
    },
    scrollBar: function () {
      return true
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
    'z-scroll': zscroll,
    'z-slider': zslider
  },
  localVue
})
describe('z-view.vue', () => {
  it('Renders remaining props when passed', () => {
    expect(wrapper.vm.imagePath).toEqual('./images/test.png')
    expect(wrapper.vm.label).toEqual('Test label prop')
  })
  it('Expected to be responsive', () => {
    expect(wrapper.vm.responsive).toEqual(true)
  })
  it('Has z-scroll component activated because of scrollBar true', () => {
    expect(wrapper.findComponent(zscroll).exists()).toBe(true)
  })
  it('Has z-slider component and progress 80%', () => {
    expect(wrapper.vm.progress).toEqual(80)
    expect(wrapper.findComponent(zslider).exists()).toBe(true)
  })
  it('Has the expected html structure (slots, z-scroll, z-slider)', () => {
    // Note: If props.imagePath and or props.label are present, slots.imagesrc and slots.label wont be rendered
    expect(wrapper.element).toMatchSnapshot()
  })
})
