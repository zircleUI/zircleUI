import { shallowMount, createLocalVue } from '@vue/test-utils'
import zpanel from '@/components/z-panel.vue'
import zscroll from '@/components/z-scroll.vue'
import zslider from '@/components/z-slider.vue'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const wrapper = shallowMount(zpanel, {
  propsData: {
    viewName: 'search',
    slider: true,
    progress: 80,
    color: 'success',
    imagesrc: './images/test.png',
    label: 'Test label prop'
  },
  beforeCreate () {
    this.$zircle.setView('search')
  },
  computed: {
    position: function () {
      return {X: 0, Y: 0, scale: 1, Xi: 0, Yi: 0, scalei: 1}
    },
    scrollBar: function () {
      return true
    }
  },
  slots: {
    default: '<p> lorem text </p>',
    media: '<div>youtube video</div>',
    imagesrc: './images/dummy.png',
    label: 'Test label slot',
    extension: '<z-button></z-button>'
  },
  stubs: {
    'z-scroll': zscroll,
    'z-slider': zslider
  },
  localVue
})
describe('z-panel.vue', () => {
  it('Renders required props.viewName when passed', () => {
    expect(wrapper.vm.viewName).toEqual('search')
  })
  it('Renders remaining props when passed', () => {
    expect(wrapper.vm.color).toEqual('success')
    expect(wrapper.vm.imagesrc).toEqual('./images/test.png')
    expect(wrapper.vm.label).toEqual('Test label prop')
  })
  it('Expected data.fullView processed viewName', () => {
    expect(wrapper.vm.fullView).toEqual('search--0')
  })
  it('Expected to be responsive', () => {
    expect(wrapper.vm.responsive).toEqual(true)
  })
  it('Has z-scroll component and longtext class activated because of scrollBar true', () => {
    expect(wrapper.find('.maindisc').classes()).toContain('longtext')
    expect(wrapper.find(zscroll).exists()).toBe(true)
  })
  it('Has z-slider component and progress 80%', () => {
    expect(wrapper.vm.progress).toEqual(80)
    expect(wrapper.find(zslider).exists()).toBe(true)
  })
  it('Has the expected html structure (slots, z-scroll, z-slider)', () => {
    // Note: If props.imagesrc and or props.label are present, slots.imagesrc and slots.label wont be rendered
    expect(wrapper.element).toMatchSnapshot()
  })
})
