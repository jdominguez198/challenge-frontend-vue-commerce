import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ItemsGrid from '~/components/ItemsGrid/ItemsGrid.vue';

describe('ItemsGrid', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(ItemsGrid, {
      propsData: {
        items: [],
        totalPages: 1,
        route: { query: { p: 1 } },
        routeResolver: (_: any) => ({ href: '' })
      },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.vm).toBeTruthy()
  });

  test('should render items in the grid', () => {
    const wrapper = shallowMount(ItemsGrid, {
      propsData: {
        items: [
          {
            id: 'test',
            image: '',
            name: 'test',
          }
        ],
        totalPages: 1,
        route: { query: { p: 1 } },
        routeResolver: (_: any) => ({ href: '' })
      },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.vm).toBeTruthy();
  });
})
