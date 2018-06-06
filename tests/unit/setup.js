// Mock window properties not handled by JSDOM
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => { return { matches: false, addListener: jest.fn(), removeListener: jest.fn() } })
})
