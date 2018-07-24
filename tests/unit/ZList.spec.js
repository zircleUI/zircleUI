import { shallowMount, createLocalVue } from '@vue/test-utils'
import zlist from '@/components/z-list.vue'
import zlistpagination from '@/components/child-components/z-pagination.vue'
import zlistitem from '@/components/z-spot.vue'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const wrapper = shallowMount(zlist, {
  propsData: {
    items: [{name: 'Apple', color: 'red'}, {name: 'Apple1', color: 'green'}],
    perPage: 5
  },
  provide: function () {
    return {
      view: 'test'
    }
  },
  computed: {
    position: function () {
      return {X: 0, Y: 0, scale: 1, Xi: 0, Yi: 0, scalei: 1}
    }
  },
  // Currently vue-test-utils is working in the implementation of scopedSlots.
  // scopedSlots: {
  // props: '<z-item slot-scope="props" :index="props.index" :color="props.color" :to-view="/item/' + props.name + '"> <h1 slot="label"> {{props.index}}</h1></z-item>'
  // },
  stubs: {
    'z-pagination': zlistpagination,
    'z-spot': zlistitem
  },
  localVue
})
describe('z-list.vue', () => {
  it('Renders props when passed', () => {
    expect(wrapper.vm.items).toEqual([{name: 'Apple', color: 'red'}, {name: 'Apple1', color: 'green'}])
    expect(wrapper.vm.perPage).toEqual(5)
  })
  it('Has the expected html structure', () => {
    // Note: If props.imagesrc and or props.label are present, slots.imagesrc and slots.label wont be rendered
    expect(wrapper.element).toMatchSnapshot()
  })
})
