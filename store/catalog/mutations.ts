import { MutationTree } from 'vuex';
import { CatalogState } from '~/store/catalog/state';

export const mutations: MutationTree<CatalogState> = {
  SET_CATEGORIES: (state: CatalogState, categories: any) => {
    state.categories = [ ...categories ];
  },
  SET_ITEMS: (state: CatalogState, { items, category }: any) => {
    state.items = {
      ...state.items,
      [category]: items
    };
  }
};

export default mutations;
