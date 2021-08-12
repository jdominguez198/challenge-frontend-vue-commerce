import { GetterTree } from 'vuex';
import { CatalogState } from '~/store/catalog/state'

export const getters: GetterTree<CatalogState, CatalogState> = {
  categories: (state: CatalogState) => state.categories,
  pagesInCategory: (state: CatalogState) => (categoryId: string) =>
    state.categories[categoryId] && state.categories[categoryId].totalPages,
  items: (state: CatalogState) => state.items,
  lastSearchItems: (state: CatalogState) => state.lastSearch.items,
  pagesInLastSearch: (state: CatalogState) => state.lastSearch.totalPages
};

export default getters;
