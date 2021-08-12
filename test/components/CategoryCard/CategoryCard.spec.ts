import { shallowMount } from '@vue/test-utils'
import CategoryCard from '~/components/CategoryCard/CategoryCard.vue';

describe('CategoryCard', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(CategoryCard, {
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
