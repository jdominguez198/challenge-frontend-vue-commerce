import { MutationTree } from 'vuex';
import { UiState } from '~/store/ui/state';

export const mutations: MutationTree<UiState> = {
  OPEN_SIDEBAR_CART: (state: UiState) => {
    state.sidebarCartOpen = true;
  },
  CLOSE_SIDEBAR_CART: (state: UiState) => {
    state.sidebarCartOpen = false;
  },
  TOGGLE_SIDEBAR_CART: (state: UiState) => {
    state.sidebarCartOpen = !state.sidebarCartOpen;
  }
};

export default mutations;
