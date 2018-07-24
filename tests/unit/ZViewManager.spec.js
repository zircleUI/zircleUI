import { shallowMount, createLocalVue } from '@vue/test-utils'
import zviewmanager from '@/components/child-components/z-view-manager.vue'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const wrapper = shallowMount(zviewmanager, {
  computed: {
    views: function () {
      return [{
        name: 'four--0',
        component: {
          template: `<div></div>`
        }
      }]
    }
  },
  beforeCreate () {
    this.$zircle.setView('four')
  },
  localVue
})
describe('z-view-manager.vue', () => {
  it('Has the expected html structure', () => {
    // Note: If props.imagesrc and or props.label are present, slots.imagesrc and slots.label wont be rendered
    expect(wrapper.element).toMatchSnapshot()
  })
})
