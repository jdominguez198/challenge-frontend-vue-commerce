import { MutationTree } from 'vuex';
import { CatalogState } from '~/store/catalog/state';
import { ICatalogCategory } from '~/models/ICatalogCategory';
import { ICatalogItem } from '~/models/ICatalogItem';

export const mutations: MutationTree<CatalogState> = {
  SET_CATEGORIES: (state: CatalogState, categories: ICatalogCategory[]) => {
    state.categories = categories.reduce((output: any, item: any) => ({
      ...output,
      [item.id]: {
        ...item,
        pages: {}
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
  SET_ITEM: (state: CatalogState, item: ICatalogItem) => {
    state.items = {
      ...state.items,
      [item.id]: item
    };
  },
  SET_LAST_SEARCH: (state: CatalogState, lastSearch: any) => {
    state.lastSearch = lastSearch;
  }
};

export default mutations;
