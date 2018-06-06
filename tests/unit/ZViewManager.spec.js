import { shallowMount, createLocalVue } from '@vue/test-utils'
import zviewmanager from '@/components/z-view-manager.vue'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const wrapper = shallowMount(zviewmanager, {
  propsData: {
    list: {
      0: {component: 'one'},
      1: {component: 'two'},
      2: {component: 'three'},
      3: {component: 'four'}
    }
  },
  beforeCreate () {
    this.$zircle.setView('four')
  },
  localVue
})
describe('z-view-manager.vue', () => {
  it('Computed views expected to show view named "four"', () => {
    expect(wrapper.vm.views).toEqual([{'component': undefined, 'position': {'X': 0, 'Xi': 0, 'Y': 0, 'Yi': 0, 'scale': 1, 'scalei': 1}, 'viewName': 'four--0'}])
  })
  it('Has the expected html structure', () => {
    // Note: If props.imagesrc and or props.label are present, slots.imagesrc and slots.label wont be rendered
    expect(wrapper.element).toMatchSnapshot()
  })
})
