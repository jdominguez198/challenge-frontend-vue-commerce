import { MutationTree } from 'vuex';
import { CartState } from '~/store/cart/state'

export const mutations: MutationTree<CartState> = {
  INITIALIZE_STORE: (state: CartState) => {
    if (!process.client || !localStorage || state.stored) {
      return;
    }

    const rawState = localStorage.getItem('cart_state');
    if (rawState) {
      const parsedState = JSON.parse(rawState);
      Object.keys(parsedState).forEach((key: string) => {
        // @ts-ignore
        state[key] = parsedState[key];
      });
    }
  },
  SET_STORED: (state: CartState) => {
    state.stored = true;
  },
  ADD_ITEM: (state: CartState, item: any) => {
    const itemInCart = state.items.find((cartItem: any) => cartItem.id === item.sku);
    if (itemInCart) {
      itemInCart.qty += item.qty;
      return;
    }

    state.items.push({
      id: item.sku,
      name: item.name,
      image: item.image,
      qty: item.qty,
      price: item.price
    });
  },
  SET_ITEM_QTY: (state: CartState, { itemId, qty }) => {
    const itemInCart = state.items.find((cartItem: any) => cartItem.id === itemId);
    if (!itemInCart) {
      return;
    }

    itemInCart.qty = qty;
  },
  REMOVE_ITEM: (state: CartState, itemId: string) => {
    const itemInCart = state.items.findIndex((cartItem: any) => cartItem.id === itemId);
    if (itemInCart < 0) {
      return;
    }

    state.items.splice(itemInCart, 1);
  }
};

export default mutations;
