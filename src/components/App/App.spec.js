import { shallowMount } from '@vue/test-utils'
import App from '@/components/App/App.vue'

describe('App.vue', () => {
  it('Load stages and matter cards from the server', () => {
    const fetchData = jest.fn()
    const wrapper = shallowMount(App, {
      methods: {
          fetchData
      }
    })
    expect(fetchData).toBeCalled()
  })
})
