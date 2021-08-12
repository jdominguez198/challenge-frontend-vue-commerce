import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs.vue';

describe('Breadcrumbs', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Breadcrumbs, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
