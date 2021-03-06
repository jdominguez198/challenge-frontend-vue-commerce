import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Header from '~/components/Header/Header.vue';

describe('Header', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Header, {
      propsData: {
        title: 'Test',
        cartTotalItems: 0
      },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
