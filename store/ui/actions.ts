import { ActionTree } from 'vuex';
import { UiState } from '~/store/ui/state';

export const actions: ActionTree<UiState, UiState> = {
  toggleSidebarCart ({ commit }) {
    commit('TOGGLE_SIDEBAR_CART');
  },
  closeSidebarCart ({ commit }) {
    commit('CLOSE_SIDEBAR_CART');
  },
  openSidebarCart ({ commit }) {
    commit('OPEN_SIDEBAR_CART');
  }
};

export default actions;
