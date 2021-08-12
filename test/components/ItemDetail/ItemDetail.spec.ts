import { shallowMount } from '@vue/test-utils'
import ItemDetail from '~/components/ItemDetail/ItemDetail.vue';

describe('ItemDetail', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(ItemDetail, {
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
