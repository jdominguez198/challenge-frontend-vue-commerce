import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Pagination from '~/components/Pagination/Pagination.vue';

describe('Pagination', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        firstPage: '',
        nextPage: '',
        previousPage: '',
        lastPage: ''
      },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
