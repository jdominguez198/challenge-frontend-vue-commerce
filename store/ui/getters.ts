import { GetterTree } from 'vuex';
import { UiState } from '~/store/ui/state';

export const getters: GetterTree<UiState, UiState> = {
  sidebarCartOpen: (state: UiState) => state.sidebarCartOpen
};

export default getters;
