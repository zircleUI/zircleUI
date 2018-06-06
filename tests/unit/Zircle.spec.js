import { createLocalVue } from '@vue/test-utils'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const componentList = Object.keys(localVue.options.components).length - 1
const components = [
  'z-alert',
  'z-button',
  'z-canvas',
  'z-list-pagination',
  'z-list-item',
  'z-list',
  'z-panel',
  'z-range',
  'z-range-bar',
  'z-scale',
  'z-scroll',
  'z-slider',
  'z-view-manager'
]
describe('Zircle UI Plugin', () => {
  it('adds $zircle method to the Vue prototype', () => {
    expect(typeof localVue.prototype.$zircle).toBe('object')
  })
  it('zircle components length should be equal to a declarative component list', () => {
    expect(componentList).toEqual(components.length)
  })
})
