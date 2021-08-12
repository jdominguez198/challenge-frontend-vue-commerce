import { shallowMount } from '@vue/test-utils'
import ItemCard from '~/components/ItemCard/ItemCard.vue';

describe('ItemCard', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(ItemCard, {
      propsData: {
        id: 'test',
        image: '',
        name: 'test',
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
