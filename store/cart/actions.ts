import { ActionTree } from 'vuex';
import { CartState } from '~/store/cart/state';

export const actions: ActionTree<CartState, CartState> = {
  initializeStore ({ commit }) {
    commit('INITIALIZE_STORE');
  },
  setStored ({ commit }) {
    commit('SET_STORED');
  },
  addItem ({ commit }, item: any) {
    commit('ADD_ITEM', item);
  },
  setItemQty ({ commit }, { itemId, qty }) {
    commit('SET_ITEM_QTY', { itemId, qty });
  },
  removeItem ({ commit }, itemId: string ) {
    commit('REMOVE_ITEM', itemId);
  }
};

export default actions;
