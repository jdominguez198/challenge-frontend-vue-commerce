import { MutationTree } from 'vuex';
import { CatalogState } from '~/store/catalog/state';

export const mutations: MutationTree<CatalogState> = {
  SET_CATEGORIES: (state: CatalogState, categories: any) => {
    state.categories = categories.reduce((output: any, item: any) => ({
      ...output,
      [item.id]: {
        ...item,
        children: {}
      }
    }), {});
  },
  SET_CATEGORY_ITEMS: (state: CatalogState, { items, categoryId, page, totalCount }: any) => {
    state.categories[categoryId] = {
      ...(state.categories[categoryId] || {}),
      page,
      totalCount,
      totalPages: Math.ceil(totalCount / state.itemsPerPage),
      pages: {
        ...(state.categories[categoryId] && state.categories[categoryId].pages || {}),
        [parseInt(page)]: items.reduce((output: any, item: any) => ({
          ...output,
          [item.id]: item
        }), {})
      }
    };
  },
  SET_ITEM: (state: CatalogState, item: any) => {
    state.items = {
      ...state.items,
      [item.id]: item
    };
  }
};

export default mutations;
