import { ActionTree } from 'vuex';
import { CatalogState } from '~/store/catalog/state';
import { itemFormat } from '~/utils/itemFormat';
import { categoryFormat } from '~/utils/categoryFormat';
import { getTotalPages } from '~/utils/paginator';

export const actions: ActionTree<CatalogState, CatalogState> = {
  async fetchCategories ({ commit }) {
    const pageSize = 40;
    const url = `${this.app.$config.apiBaseUrl}/sets?pageSize=${pageSize}`;
    const result = await this.$axios.$get(url);
    const categories = result.data.map((item: any) => categoryFormat(item)) || [];

    commit('SET_CATEGORIES', categories);
  },
  async fetchCategoryItems ({ state, commit }, { categoryId, page = 1}) {
    const pageSize = state.itemsPerPage;
    const url = `${this.app.$config.apiBaseUrl}/cards?pageSize=${pageSize}&page=${page}&q=set.id:${categoryId}`;
    const result = await this.$axios.$get(url);
    const items = result.data.map((item: any) => itemFormat(item));
    const { page: currentPage, totalCount } = result;

    commit('SET_CATEGORY_ITEMS', { items, categoryId, page: currentPage, totalCount });
  },
  async fetchItemDetails ({ commit }, itemId: string) {
    const url = `${this.app.$config.apiBaseUrl}/cards/${itemId}`;
    const result = await this.$axios.$get(url);
    const item = itemFormat(result.data);

    commit('SET_ITEM', item);
  },
  async searchItemsByTerm ({ commit, state }, { term, page = 1}: any) {
    const pageSize = state.itemsPerPage;
    const url = `${this.app.$config.apiBaseUrl}/cards?pageSize=${pageSize}&page=${page}&q=name:${term}`;
    const result = await this.$axios.$get(url);

    const { totalCount } = result;

    commit('SET_LAST_SEARCH', {
      items: result.data.map((item: any) => itemFormat(item)),
      page,
      pageSize,
      totalCount,
      totalPages: getTotalPages(totalCount, pageSize)
    });
  }
};

export default actions;
