import { MutationTree } from 'vuex';
import { CartState } from '~/store/cart/state'

export const mutations: MutationTree<CartState> = {
  ADD_ITEM: (state: CartState, item: any) => {
    const itemInCart = state.items.find((item: any) => item.id === item.itemId);
    if (itemInCart) {
      itemInCart.qty += item.qty;
      return;
    }

    state.items.push({
      id: item.itemId,
      name: item.name,
      image: item.image,
      qty: item.qty,
      price: item.price
    });
  }
};

export default mutations;
