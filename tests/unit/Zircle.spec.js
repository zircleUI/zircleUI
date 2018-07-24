import { createLocalVue } from '@vue/test-utils'
import zircle from '@/index'
const localVue = createLocalVue()
localVue.use(zircle)
const componentList = Object.keys(localVue.options.components).length
const components = [
  'z-canvas',
  'z-view',
  'z-spot',
  'z-list',
  'z-dialog'
]
describe('zircle UI Plugin', () => {
  it('adds $zircle method to the Vue prototype', () => {
    expect(typeof localVue.prototype.$zircle).toBe('object')
  })
  it('zircle components length should be equal to a declarative component list (5)', () => {
    expect(componentList).toEqual(components.length)
  })
})
