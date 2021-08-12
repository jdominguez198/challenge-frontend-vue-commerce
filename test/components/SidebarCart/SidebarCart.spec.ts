import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import SidebarCart from '~/components/SidebarCart/SidebarCart.vue';

describe('SidebarCart', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(SidebarCart, {
      propsData: {
        closeHandler: () => null
      },
      stubs: {
        NuxtLink: RouterLinkStub,
        'client-only': {
          template: '<div><slot /></div>'
        }
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
