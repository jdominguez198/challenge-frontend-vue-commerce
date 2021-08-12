import { shallowMount } from '@vue/test-utils'
import CartItem from '~/components/CartItem/CartItem.vue';

describe('CartItem', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(CartItem, {
      propsData: {
        sku: 'test',
        name: 'test',
        image: 'test',
        price: 0,
        qty: 1
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
