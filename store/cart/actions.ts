import { ActionTree } from 'vuex';
import { CartState } from '~/store/cart/state';

export const actions: ActionTree<CartState, CartState> = {
  addItem ({ commit }, item: any) {
    commit('ADD_ITEM', item);
  }
};

export default actions;
