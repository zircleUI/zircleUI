import { shallowMount, createLocalVue } from '@vue/test-utils'
import zbutton from '@/components/z-button.vue'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const wrapper = shallowMount(zbutton, {
  propsData: {
    color: 'success',
    imagesrc: './images/test.png',
    label: 'Test label prop'
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
  slots: {
    default: '<p> lorem text </p>',
    imagesrc: './images/dummy.png',
    label: 'Test label slot',
    extension: '<div></div>'
  },
  localVue
})
describe('z-button.vue', () => {
  it('Renders props when passed', () => {
    expect(wrapper.vm.color).toEqual('success')
    expect(wrapper.vm.imagesrc).toEqual('./images/test.png')
    expect(wrapper.vm.label).toEqual('Test label prop')
  })
  it('Has the expected html structure', () => {
    // Note: If props.imagesrc and or props.label are present, slots.imagesrc and slots.label wont be rendered
    expect(wrapper.element).toMatchSnapshot()
  })
})
