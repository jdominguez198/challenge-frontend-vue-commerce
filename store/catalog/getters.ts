import { GetterTree } from 'vuex';
import { CatalogState } from '~/store/catalog/state'

export const getters: GetterTree<CatalogState, CatalogState> = {
  categories: state => state.categories,
  items: state => state.items
};

export default getters;
